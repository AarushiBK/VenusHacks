"""
Remote photoplethysmography (rPPG) face scan
Uses MediaPipe Face Mesh ROIs (forehead + cheeks), green-channel averaging,
bandpass filtering, and FFT peak detection for heart rate (BPM).
"""

from __future__ import annotations

import argparse
import json
import time
from collections import deque
from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np
from scipy import signal

from face_landmarks import FaceLandmarkDetector

# MediaPipe Face Mesh landmark indices (stable pulse ROIs)
FOREHEAD_IDX = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365,
    379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93,
    234, 127, 162, 21, 54, 103, 67, 109,
]
LEFT_CHEEK_IDX = [234, 227, 116, 117, 118, 119, 120, 121, 126, 142]
RIGHT_CHEEK_IDX = [454, 447, 345, 346, 347, 348, 349, 350, 355, 371]

MIN_SCAN_SECONDS = 10
BPM_MIN, BPM_MAX = 45, 180
MIN_FPS_FOR_HRV = 20.0
HRV_RMSSD_MAX_MS = 200.0


@dataclass
class ScanResult:
    bpm: float
    confidence: float
    scan_seconds: float
    fps: float
    hrv_rmssd_ms: float | None = None  # needs ~30s+ stable trace
    respiratory_rate_bpm: float | None = None  # rough; needs ~45s+


def _landmarks_to_pixels(landmarks, w: int, h: int) -> np.ndarray:
    pts = np.array([(int(lm.x * w), int(lm.y * h)) for lm in landmarks], dtype=np.int32)
    return pts


def _roi_mean_green(frame: np.ndarray, landmarks, indices: list[int]) -> float | None:
    h, w = frame.shape[:2]
    pts = _landmarks_to_pixels([landmarks[i] for i in indices], w, h)
    if len(pts) < 3:
        return None
    mask = np.zeros((h, w), dtype=np.uint8)
    hull = cv2.convexHull(pts)
    cv2.fillConvexPoly(mask, hull, 255)
    green = frame[:, :, 1]
    region = green[mask > 0]
    if region.size < 50:
        return None
    return float(np.mean(region))


def extract_pulse_sample(frame: np.ndarray, landmarks) -> float | None:
    """Average green channel across forehead + both cheeks."""
    samples = []
    for idx in (FOREHEAD_IDX, LEFT_CHEEK_IDX, RIGHT_CHEEK_IDX):
        v = _roi_mean_green(frame, landmarks, idx)
        if v is not None:
            samples.append(v)
    if not samples:
        return None
    return float(np.mean(samples))


def bandpass_pulse(trace: np.ndarray, fps: float, low_hz: float = 0.75, high_hz: float = 3.5) -> np.ndarray:
    if len(trace) < int(fps * 3):
        return trace - np.mean(trace)
    nyq = 0.5 * fps
    low = max(low_hz / nyq, 0.01)
    high = min(high_hz / nyq, 0.99)
    if low >= high:
        return trace - np.mean(trace)
    b, a = signal.butter(3, [low, high], btype="band")
    return signal.filtfilt(b, a, trace)


def _pulse_spectrum(trace: np.ndarray, fps: float) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    detrended = trace - np.mean(trace)
    filtered = bandpass_pulse(detrended, fps)
    n = len(filtered)
    freqs = np.fft.rfftfreq(n, d=1.0 / fps)
    spectrum = np.abs(np.fft.rfft(filtered * np.hanning(n)))
    valid = (freqs >= BPM_MIN / 60.0) & (freqs <= BPM_MAX / 60.0)
    return filtered, freqs[valid], spectrum[valid]


def _magnitude_at_bpm(band_freqs: np.ndarray, band_mag: np.ndarray, bpm: float) -> float:
    hz = bpm / 60.0
    if len(band_freqs) == 0:
        return 0.0
    idx = int(np.argmin(np.abs(band_freqs - hz)))
    return float(band_mag[idx])


def estimate_bpm(trace: np.ndarray, fps: float) -> tuple[float, float, float]:
    """
    Returns (bpm, snr_confidence, harmonic_ratio).
    Picks strongest among f, 2f, f/2 to reduce common half/double-rate FFT errors.
    """
    if len(trace) < int(fps * MIN_SCAN_SECONDS):
        return 0.0, 0.0, 0.0

    _, band_freqs, band_mag = _pulse_spectrum(trace, fps)
    if len(band_freqs) == 0:
        return 0.0, 0.0, 0.0

    peak_i = int(np.argmax(band_mag))
    bpm = float(band_freqs[peak_i] * 60.0)

    candidates = [bpm]
    if bpm * 2 <= BPM_MAX:
        candidates.append(bpm * 2)
    if bpm / 2 >= BPM_MIN:
        candidates.append(bpm / 2)

    mags = [_magnitude_at_bpm(band_freqs, band_mag, c) for c in candidates]
    best_i = int(np.argmax(mags))
    bpm = float(candidates[best_i])
    peak_mag = mags[best_i]

    median_mag = float(np.median(band_mag)) + 1e-9
    snr_conf = float(np.clip(peak_mag / (peak_mag + 4 * median_mag), 0, 1))
    harmonic_ratio = float(peak_mag / (mags[0] + 1e-9)) if len(mags) > 1 else 1.0
    return bpm, snr_conf, harmonic_ratio


def compute_confidence(
    snr_conf: float,
    fps: float,
    face_coverage: float,
    harmonic_ratio: float,
) -> float:
    """Blend signal clarity, frame rate, and face stability into one 0–1 score."""
    fps_factor = float(np.clip((fps - 8.0) / 22.0, 0, 1))  # 8 fps = bad, 30 fps = great
    face_factor = float(np.clip(face_coverage, 0, 1))
    harmonic_factor = float(np.clip(harmonic_ratio, 0.5, 1.0))
    blended = 0.45 * snr_conf + 0.25 * fps_factor + 0.2 * face_factor + 0.1 * harmonic_factor
    return float(np.clip(blended, 0, 1))


def estimate_hrv_rmssd(trace: np.ndarray, fps: float, bpm: float = 0.0) -> float | None:
    """RMSSD (ms) from beat peaks; uses BPM to space peaks when fps is low."""
    if fps < MIN_FPS_FOR_HRV or len(trace) < int(fps * 25):
        return None
    filtered = bandpass_pulse(trace - np.mean(trace), fps)
    if bpm > 0:
        min_distance = max(int(fps * 60.0 / bpm * 0.55), 2)
    else:
        min_distance = max(int(fps * 0.4), 2)
    prominence = max(np.std(filtered) * 0.35, 1e-6)
    peaks, _ = signal.find_peaks(filtered, distance=min_distance, prominence=prominence)
    if len(peaks) < 8:
        return None
    rr_sec = np.diff(peaks) / fps
    expected = 60.0 / bpm if bpm > 0 else np.median(rr_sec)
    valid = np.abs(rr_sec - expected) < expected * 0.45
    rr_sec = rr_sec[valid] if np.count_nonzero(valid) >= 5 else rr_sec
    if len(rr_sec) < 5:
        return None
    diff_rr = np.diff(rr_sec)
    rmssd = float(np.sqrt(np.mean(diff_rr**2)) * 1000.0)
    if rmssd < 5 or rmssd > HRV_RMSSD_MAX_MS:
        return None
    return rmssd


def scan_phase_label(scan_seconds: float, bpm: float, conf: float) -> str:
    if conf < 0.35 or bpm <= 0:
        if scan_seconds < MIN_SCAN_SECONDS:
            return f"Phase 1: Finding pulse ({MIN_SCAN_SECONDS - scan_seconds:.0f}s left)"
        return "Phase 1: Hold still — improving signal..."
    if scan_seconds < 30:
        return "Phase 2: BPM locked — building HRV (need ~30s)"
    if scan_seconds < 45:
        return "Phase 3: Estimating breathing rate..."
    return "Phase 4: Monitoring — best quality"


def estimate_respiratory_rate(trace: np.ndarray, fps: float) -> float | None:
    """Breathing modulates the baseline; FFT peak in ~0.1–0.5 Hz band."""
    if len(trace) < int(fps * 45):
        return None
    detrended = trace - np.mean(trace)
    n = len(detrended)
    freqs = np.fft.rfftfreq(n, d=1.0 / fps)
    spectrum = np.abs(np.fft.rfft(detrended * np.hanning(n)))
    valid = (freqs >= 0.1) & (freqs <= 0.5)
    if not np.any(valid):
        return None
    peak_hz = freqs[valid][int(np.argmax(spectrum[valid]))]
    return float(peak_hz * 60.0)


def draw_rois(frame: np.ndarray, landmarks) -> None:
    h, w = frame.shape[:2]
    for indices, color in (
        (FOREHEAD_IDX, (0, 255, 255)),
        (LEFT_CHEEK_IDX, (0, 200, 0)),
        (RIGHT_CHEEK_IDX, (0, 200, 0)),
    ):
        pts = _landmarks_to_pixels([landmarks[i] for i in indices], w, h)
        if len(pts) >= 3:
            cv2.polylines(frame, [cv2.convexHull(pts)], True, color, 1)


def _open_capture(camera_index: int, video_path: Path | None) -> cv2.VideoCapture:
    if video_path is not None:
        cap = cv2.VideoCapture(str(video_path))
        if not cap.isOpened():
            raise RuntimeError(f"Could not open video file: {video_path}")
        return cap
    import sys

    if sys.platform == "win32":
        cap = cv2.VideoCapture(camera_index, cv2.CAP_DSHOW)
    else:
        cap = cv2.VideoCapture(camera_index)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open camera index {camera_index}")
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    return cap


def _write_json(
    path: Path,
    *,
    bpm: float,
    conf: float,
    scan_seconds: float,
    fps: float,
    face_coverage: float,
    hrv_rmssd_ms: float | None = None,
    respiratory_rate_bpm: float | None = None,
    source: str = "webcam",
    phase: str = "",
) -> None:
    hrv_reliable = hrv_rmssd_ms is not None and fps >= MIN_FPS_FOR_HRV
    notes: list[str] = []
    if fps < MIN_FPS_FOR_HRV:
        notes.append(f"Low FPS ({fps:.1f}) — close other apps; try --no-plot for faster capture.")
    if face_coverage < 0.85:
        notes.append("Face often lost from frame — center face in the circle.")
    if conf < 0.5:
        notes.append("Low confidence — use daylight on forehead, hold still.")

    payload: dict = {
        "bpm": round(bpm, 1),
        "confidence": round(conf, 3),
        "timestamp": time.time(),
        "scan_seconds": round(scan_seconds, 2),
        "fps": round(fps, 2),
        "source": source,
        "phase": phase,
        "quality": {
            "fps_ok": fps >= MIN_FPS_FOR_HRV,
            "face_coverage": round(face_coverage, 3),
            "hrv_reliable": hrv_reliable,
            "notes": notes,
        },
        "disclaimer": "Wellness prototype — compare to wrist/Watch; not a medical device.",
    }
    if hrv_rmssd_ms is not None:
        payload["hrv_rmssd_ms"] = round(hrv_rmssd_ms, 1)
    if respiratory_rate_bpm is not None:
        payload["respiratory_rate_bpm"] = round(respiratory_rate_bpm, 1)
    path.write_text(json.dumps(payload, indent=2))


def _append_history(history_path: Path, payload: dict) -> None:
    history_path.parent.mkdir(parents=True, exist_ok=True)
    with history_path.open("a", encoding="utf-8") as f:
        f.write(json.dumps(payload) + "\n")


def run_scan(
    camera_index: int = 0,
    video_path: Path | None = None,
    duration_sec: float = 30,
    continuous: bool = False,
    show_plot: bool = True,
    show_window: bool = True,
    output_json: Path | None = None,
    history_path: Path | None = None,
) -> ScanResult | None:
    cap = _open_capture(camera_index, video_path)
    from_file = video_path is not None

    file_fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    if file_fps <= 1:
        file_fps = 30.0
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    if from_file and frame_count > 0:
        video_duration = frame_count / file_fps
        duration_sec = min(duration_sec, video_duration) if duration_sec > 0 else video_duration

    if continuous and not from_file:
        duration_sec = float("inf")

    detector = FaceLandmarkDetector(video_mode=True)
    buffer_seconds = 600 if continuous else 90
    pulse_buffer: deque[float] = deque(maxlen=int(buffer_seconds * 35))
    times: deque[float] = deque(maxlen=int(buffer_seconds * 35))
    t0 = time.perf_counter()
    last_json_write = 0.0
    last_history_write = 0.0
    frames_total = 0
    frames_with_face = 0
    plot_frame_skip = 0

    plot = None
    if show_plot:
        import matplotlib.pyplot as plt

        plt.ion()
        fig, (ax_cam_placeholder, ax_wave) = plt.subplots(2, 1, figsize=(8, 6))
        ax_wave.set_title("Pulse waveform (filtered)")
        ax_wave.set_xlabel("Time (s)")
        ax_wave.set_ylabel("Amplitude")
        plot = (fig, ax_wave)

    if from_file:
        print(f"Processing video: {video_path}")
        print(f"~{duration_sec:.1f}s @ {file_fps:.1f} fps — need ~{MIN_SCAN_SECONDS}s for BPM.")
    elif continuous:
        print("Continuous mode — keep the app open; press Q to stop.")
        print(f"BPM after ~{MIN_SCAN_SECONDS}s; HRV improves after ~30s; resp. rate after ~45s.")
    else:
        print("Align your face in frame. Hold still with even lighting on your forehead.")
        print(f"Scanning for up to {duration_sec:.0f}s — need ~{MIN_SCAN_SECONDS}s for BPM estimate.")

    frame_idx = 0
    try:
        while True:
            ok, frame = cap.read()
            if not ok:
                break

            if not from_file:
                frame = cv2.flip(frame, 1)
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            display = frame.copy()

            if from_file:
                now = frame_idx / file_fps
                frame_idx += 1
            else:
                now = time.perf_counter() - t0

            timestamp_ms = int(now * 1000)
            lm = detector.process(rgb, timestamp_ms=timestamp_ms)
            frames_total += 1

            bpm, conf = 0.0, 0.0
            snr_conf = 0.0
            hrv_ms: float | None = None
            resp_bpm: float | None = None

            if lm is not None:
                frames_with_face += 1
                draw_rois(display, lm)
                sample = extract_pulse_sample(frame, lm)
                if sample is not None:
                    pulse_buffer.append(sample)
                    times.append(now)

            if len(times) >= 2:
                fps = (len(times) - 1) / (times[-1] - times[0])
            else:
                fps = file_fps if from_file else 30.0

            face_coverage = frames_with_face / frames_total if frames_total else 0.0

            if len(pulse_buffer) >= int(fps * MIN_SCAN_SECONDS):
                trace = np.array(pulse_buffer, dtype=np.float64)
                bpm, snr_conf, harmonic_ratio = estimate_bpm(trace, fps)
                conf = compute_confidence(snr_conf, fps, face_coverage, harmonic_ratio)
                hrv_ms = estimate_hrv_rmssd(trace, fps, bpm=bpm)
                resp_bpm = estimate_respiratory_rate(trace, fps)

            phase = scan_phase_label(now, bpm, conf)
            status = "SCANNING..." if conf < 0.35 else f"BPM: {bpm:.0f}  (conf {conf:.0%})"
            if hrv_ms is not None and conf >= 0.35:
                status += f"  HRV: {hrv_ms:.0f}ms"
            cv2.rectangle(display, (10, 10), (620, 78), (0, 0, 0), -1)
            cv2.putText(display, status, (20, 32), cv2.FONT_HERSHEY_SIMPLEX, 0.65, (255, 255, 255), 2)
            cv2.putText(
                display,
                f"{phase}  |  {fps:.0f} fps",
                (20, 58),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (180, 220, 255),
                1,
            )
            if fps < MIN_FPS_FOR_HRV and frames_total > 30:
                cv2.putText(
                    display,
                    "Low FPS — use --no-plot",
                    (20, 74),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.45,
                    (0, 180, 255),
                    1,
                )
            if continuous:
                cv2.circle(display, (display.shape[1] - 36, 36), 12, (0, 0, 255), -1)
                cv2.putText(
                    display,
                    "REC",
                    (display.shape[1] - 52, 42),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.45,
                    (255, 255, 255),
                    1,
                )
                time_label = f"CONTINUOUS {now:.0f}s — Q to stop"
            elif duration_sec == float("inf"):
                time_label = f"{now:.1f}s"
            else:
                time_label = f"{now:.1f}s / {duration_sec:.0f}s"
            cv2.putText(
                display,
                time_label,
                (20, display.shape[0] - 20),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (200, 200, 200),
                1,
            )

            if show_window:
                cv2.imshow("Hemodynamic Bridge — rPPG Mirror Scan", display)

            plot_frame_skip += 1
            if show_plot and plot and len(pulse_buffer) > int(fps * 2) and plot_frame_skip % 12 == 0:
                fig, ax_wave = plot
                t_arr = np.array(times)
                trace = np.array(pulse_buffer)
                filtered = bandpass_pulse(trace, fps)
                ax_wave.clear()
                ax_wave.plot(t_arr - t_arr[0], filtered, color="#e74c3c", linewidth=1)
                ax_wave.set_title("Pulse waveform (filtered)")
                ax_wave.set_xlabel("Time (s)")
                ax_wave.set_ylabel("Amplitude")
                fig.canvas.draw()
                fig.canvas.flush_events()

            if output_json and now - last_json_write > 0.5 and bpm > 0:
                _write_json(
                    output_json,
                    bpm=bpm,
                    conf=conf,
                    scan_seconds=now,
                    fps=fps,
                    face_coverage=face_coverage,
                    hrv_rmssd_ms=hrv_ms,
                    respiratory_rate_bpm=resp_bpm,
                    source="video" if from_file else "webcam",
                    phase=phase,
                )
                last_json_write = now

            if (
                history_path
                and continuous
                and bpm > 0
                and conf >= 0.35
                and now - last_history_write >= 30
            ):
                _append_history(
                    history_path,
                    {
                        "bpm": round(bpm, 1),
                        "confidence": round(conf, 3),
                        "hrv_rmssd_ms": round(hrv_ms, 1) if hrv_ms else None,
                        "respiratory_rate_bpm": round(resp_bpm, 1) if resp_bpm else None,
                        "scan_seconds": round(now, 2),
                        "timestamp": time.time(),
                    },
                )
                last_history_write = now

            if from_file:
                if show_window and cv2.waitKey(max(1, int(1000 / file_fps))) & 0xFF == ord("q"):
                    break
                if now >= duration_sec:
                    break
            else:
                key = cv2.waitKey(1) & 0xFF
                if key == ord("q") or (duration_sec != float("inf") and now >= duration_sec):
                    break
    finally:
        cap.release()
        cv2.destroyAllWindows()
        detector.close()
        if show_plot:
            import matplotlib.pyplot as plt

            plt.ioff()

    if len(pulse_buffer) < 30:
        return None

    trace = np.array(pulse_buffer, dtype=np.float64)
    t_arr = np.array(times)
    fps = (len(t_arr) - 1) / (t_arr[-1] - t_arr[0]) if len(t_arr) > 1 else 30.0
    face_coverage = frames_with_face / frames_total if frames_total else 0.0
    bpm, snr_conf, harmonic_ratio = estimate_bpm(trace, fps)
    conf = compute_confidence(snr_conf, fps, face_coverage, harmonic_ratio)
    scan_seconds = float(t_arr[-1] - t_arr[0]) if len(t_arr) > 1 else 0.0
    hrv_ms = estimate_hrv_rmssd(trace, fps, bpm=bpm)
    resp_bpm = estimate_respiratory_rate(trace, fps)
    phase = scan_phase_label(scan_seconds, bpm, conf)

    result = ScanResult(
        bpm=bpm,
        confidence=conf,
        scan_seconds=scan_seconds,
        fps=fps,
        hrv_rmssd_ms=hrv_ms,
        respiratory_rate_bpm=resp_bpm,
    )
    if output_json:
        _write_json(
            output_json,
            bpm=result.bpm,
            conf=result.confidence,
            scan_seconds=result.scan_seconds,
            fps=result.fps,
            face_coverage=face_coverage,
            hrv_rmssd_ms=result.hrv_rmssd_ms,
            respiratory_rate_bpm=result.respiratory_rate_bpm,
            source="video" if from_file else "webcam",
            phase=phase,
        )
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="rPPG face scan (webcam or video file)")
    src = parser.add_mutually_exclusive_group()
    src.add_argument("--camera", type=int, default=0, help="Webcam index (default)")
    src.add_argument("--video", type=Path, help="Process a recorded .mp4/.mov instead of webcam")
    parser.add_argument("--duration", type=float, default=30, help="Max scan seconds (0 = full video)")
    parser.add_argument(
        "--continuous",
        action="store_true",
        help="Webcam: run until Q; log snapshots every 30s to scan_history.jsonl",
    )
    parser.add_argument(
        "--quick",
        action="store_true",
        help="30s scan, no waveform plot (faster FPS, better accuracy)",
    )
    parser.add_argument("--no-plot", action="store_true", help="Disable matplotlib waveform")
    parser.add_argument("--no-window", action="store_true", help="Skip OpenCV preview window")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path(__file__).resolve().parent / "latest_scan.json",
        help="JSON file updated live with BPM (for 3D heart / frontend)",
    )
    args = parser.parse_args()

    duration = args.duration
    if args.video and duration == 0:
        duration = 9999.0
    if args.quick:
        duration = 30.0

    no_plot = args.no_plot or args.quick
    history = args.output.parent / "scan_history.jsonl" if args.continuous else None

    result = run_scan(
        camera_index=args.camera,
        video_path=args.video,
        duration_sec=duration,
        continuous=args.continuous,
        show_plot=not no_plot,
        show_window=not args.no_window,
        output_json=args.output,
        history_path=history,
    )

    if result is None:
        print("Scan too short or no face detected. Try again with steady lighting.")
        return

    print("\n--- Scan complete ---")
    print(f"Heart rate: {result.bpm:.1f} BPM")
    print(f"Confidence: {result.confidence:.0%}")
    print(f"Duration:   {result.scan_seconds:.1f}s @ {result.fps:.1f} fps")
    if result.hrv_rmssd_ms is not None:
        print(f"HRV (RMSSD): {result.hrv_rmssd_ms:.1f} ms")
    if result.respiratory_rate_bpm is not None:
        print(f"Resp. rate:  {result.respiratory_rate_bpm:.1f} breaths/min")
    if result.fps < MIN_FPS_FOR_HRV:
        print(f"\nNote: FPS was only {result.fps:.1f} — HRV may be wrong. Re-run with: python vision/rppg_scanner.py --quick")
    if result.hrv_rmssd_ms and result.hrv_rmssd_ms > 150:
        print("Note: HRV looks unusually high — trust BPM; compare HRV after a --quick re-scan.")
    print(f"\nValidate: count wrist pulse for 15s, multiply by 4, compare to {result.bpm:.0f} BPM.")
    print(f"Wrote:      {args.output}")


if __name__ == "__main__":
    main()
