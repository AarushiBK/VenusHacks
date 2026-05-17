"""
Server-side rPPG via open-rppg (FacePhys.rlap).

https://github.com/KegangWangCCNU/open-rppg — MIT code; cite model papers in README.
"""

from __future__ import annotations

import logging
import threading
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)

_model = None
_model_lock = threading.Lock()
_infer_lock = threading.Lock()
_load_error: str | None = None
_loading = False
_ready = False

DEFAULT_MODEL = "FacePhys.rlap"


def model_status() -> dict[str, Any]:
    return {
        "ready": _ready,
        "loading": _loading,
        "error": _load_error,
        "model": DEFAULT_MODEL,
        "library": "open-rppg",
    }


def _load_model() -> None:
    global _model, _load_error, _loading, _ready
    if _ready or _loading:
        return
    with _model_lock:
        if _ready or _loading:
            return
        _loading = True
        _load_error = None
    try:
        import rppg

        logger.info("Loading open-rppg model %s (first run may take 1–3 min)…", DEFAULT_MODEL)
        m = rppg.Model(DEFAULT_MODEL)
        with _model_lock:
            _model = m
            _ready = True
        logger.info("open-rppg model ready.")
    except Exception as exc:
        logger.exception("open-rppg load failed")
        with _model_lock:
            _load_error = str(exc)
    finally:
        with _model_lock:
            _loading = False


def preload_model() -> None:
    """Start background model load (call at server startup)."""
    if _ready or _loading:
        return
    threading.Thread(target=_load_model, name="open-rppg-load", daemon=True).start()


def _get_model():
    if not _ready:
        _load_model()
    with _model_lock:
        if _model is None:
            raise RuntimeError(_load_error or "open-rppg model not loaded yet")
        return _model


def _hrv_value(hrv: dict, *keys: str) -> float | None:
    for k in keys:
        if k in hrv and hrv[k] is not None:
            try:
                return float(hrv[k])
            except (TypeError, ValueError):
                pass
    return None


def _breathing_rate_bpm(hrv: dict) -> float | None:
    """
    open-rppg / HeartPy return breathingrate in Hz (breaths per second), not BPM.
    See heartpy docs: 0.17 Hz ≈ one breath every 6.25 s (~9.6 breaths/min).
    """
    hz = _hrv_value(hrv, "breathingrate", "BreathingRate")
    if hz is None:
        return None
    bpm = hz * 60.0
    # Adult rest typically ~10–25 breaths/min; discard failed peaks
    if bpm < 6 or bpm > 35:
        return None
    return round(bpm, 1)


def analyze_video_path(path: Path) -> dict[str, Any]:
    """
    Run open-rppg on a saved video file.
    Returns a dict aligned with Hemodynamic Bridge scan JSON.
    """
    path = Path(path)
    if not path.is_file():
        raise FileNotFoundError(path)

    model = _get_model()
    with _infer_lock:
        raw = model.process_video(str(path))

    if not raw:
        return {
            "bpm": None,
            "confidence": None,
            "sqi": None,
            "hrv_rmssd_ms": None,
            "respiratory_rate_bpm": None,
            "engine": "open-rppg",
            "model": DEFAULT_MODEL,
            "error": "no_signal",
        }

    hr = raw.get("hr")
    sqi = raw.get("SQI")
    hrv = raw.get("hrv") or {}

    bpm = round(float(hr), 1) if hr is not None else None
    sqi_f = round(float(sqi), 3) if sqi is not None else None
    rmssd = _hrv_value(hrv, "RMSSD", "rmssd")
    resp = _breathing_rate_bpm(hrv)

    out: dict[str, Any] = {
        "bpm": bpm,
        "confidence": sqi_f,
        "sqi": sqi_f,
        "hrv_rmssd_ms": round(rmssd, 1) if rmssd is not None else None,
        "respiratory_rate_bpm": round(resp, 1) if resp is not None else None,
        "engine": "open-rppg",
        "model": DEFAULT_MODEL,
        "latency_ms": raw.get("latency"),
    }
    if hrv:
        out["hrv_detail"] = {k: (float(v) if isinstance(v, (int, float)) else v) for k, v in hrv.items()}
    return out
