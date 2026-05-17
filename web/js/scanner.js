/**
 * Hemodynamic Bridge — daily 30s rPPG scan (open-rppg on server)
 */

import {
  RPPGProcessor,
  extractPulseSample,
  drawPulseRois,
  CONF_LOCK,
  MIN_SCAN_SEC,
} from "./rppg-core.js?v=5";
import { FaceLandmarker, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";

const $ = (id) => document.getElementById(id);
const SCAN_DURATION_SEC = 30;
const ROUTINE_KEY = "hb_routine_time";
const PHASE_KEY = "hb_phase";
const DEFAULT_ROUTINE = "07:30";

let visionTasks = null;

const state = {
  mode: "idle",
  landmarker: null,
  processor: new RPPGProcessor(180),
  rafId: null,
  framesTotal: 0,
  framesFace: 0,
  pulseSamples: 0,
  startedAt: 0,
  scanTargetSec: SCAN_DURATION_SEC,
  history: [],
  stream: null,
  lastMpTimestampMs: 0,
  recorder: null,
  recordChunks: [],
  recordMime: "",
  baseline: null,
};

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function formatTime12h(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const am = h < 12;
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${am ? "AM" : "PM"}`;
}

function loadRoutine() {
  const t = localStorage.getItem(ROUTINE_KEY) || DEFAULT_ROUTINE;
  $("routineTime").value = t;
  updateRoutineHint(t);
}

function updateRoutineHint(hhmm) {
  const label = formatTime12h(hhmm);
  $("routineHint").innerHTML = `Routine: every day at <strong>${label}</strong>`;
  $("guideTime").textContent = label;
}

function loadPhase() {
  const p = localStorage.getItem(PHASE_KEY) || "pregnancy";
  $("phaseSelect").value = p;
}

async function saveProfile(patch) {
  try {
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  } catch {
    /* ok offline */
  }
}

async function refreshBaseline() {
  const phase = $("phaseSelect").value;
  try {
    const r = await fetch(`/api/baseline?phase=${encodeURIComponent(phase)}`);
    if (!r.ok) return;
    state.baseline = await r.json();
  } catch {
    state.baseline = null;
    return;
  }

  const rec = state.baseline.recovery;
  const badge = $("recoveryBadge");
  if (rec?.zone && rec.zone !== "building") {
    badge.classList.remove("hidden", "zone-green", "zone-amber", "zone-red", "zone-building");
    badge.classList.add(`zone-${rec.zone}`);
    $("recoveryLabel").textContent = rec.label;
    $("recoveryDetail").textContent = rec.detail || "";
    badge.classList.remove("hidden");
  } else if (rec) {
    badge.classList.remove("hidden", "zone-green", "zone-amber", "zone-red");
    badge.classList.add("zone-building");
    $("recoveryLabel").textContent = rec.label;
    $("recoveryDetail").textContent = rec.detail || "";
  }

  const lockBtn = $("btnLockBaseline");
  if (phase === "pre_pregnancy" && state.baseline?.can_lock_reference) {
    lockBtn.classList.remove("hidden");
  } else {
    lockBtn.classList.add("hidden");
  }

  if (state.baseline?.reference_bpm) {
    const ref = state.baseline.reference_bpm;
    $("recoveryBadge").classList.remove("hidden");
    if (!rec || rec.zone === "building") {
      $("recoveryLabel").textContent = `Reference: ${Math.round(ref)} BPM`;
      $("recoveryDetail").textContent = "Pre-pregnancy baseline locked.";
    }
  }
}

function updateDeltaMetric(bpm) {
  const ref = state.baseline?.reference_bpm;
  if (bpm == null || ref == null) {
    $("valDelta").textContent = "—";
    return;
  }
  const d = Math.round(bpm - ref);
  if (Math.abs(d) <= 8) $("valDelta").textContent = "OK";
  else $("valDelta").textContent = d > 0 ? `+${d}` : `${d}`;
}

function cameraErrorMessage(err) {
  if (!window.isSecureContext) {
    return "Camera requires HTTPS — open your ngrok https:// link in Safari.";
  }
  const name = err?.name || "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return "Allow camera: Safari → aA → Website Settings → Camera.";
  }
  if (name === "NotFoundError") return "No camera found.";
  return err?.message || "Could not start camera.";
}

function qualityTip(m) {
  if (!window.isSecureContext) return "Use the ngrok https:// link (not http).";
  if (m.elapsed < 3) return null;
  if (m.pulseSamples < 30) return "Brighten your forehead — daylight works best.";
  if (m.faceCoverage < 0.8) return "Center your face in the circle.";
  if (m.fps > 0 && m.fps < 18) return "Turn off Low Power Mode for a smoother scan.";
  if (m.bpm > 0 && m.conf < 0.5) return "Almost there — hold still a few more seconds.";
  return null;
}

async function initLandmarker() {
  if (!visionTasks) {
    visionTasks = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
    );
  }
  if (state.landmarker) {
    try {
      state.landmarker.close();
    } catch {
      /* ignore */
    }
    state.landmarker = null;
  }

  const opts = {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: isIOS() ? "CPU" : "GPU",
    },
    runningMode: "VIDEO",
    numFaces: 1,
  };
  try {
    state.landmarker = await FaceLandmarker.createFromOptions(visionTasks, opts);
  } catch {
    opts.baseOptions.delegate = "CPU";
    state.landmarker = await FaceLandmarker.createFromOptions(visionTasks, opts);
  }
}

function setMode(mode) {
  state.mode = mode;
  const badge = $("recordBadge");
  badge.classList.toggle("hidden", mode === "idle");
  badge.classList.toggle("scanning", mode === "scanning");

  $("recordLabel").textContent = mode === "scanning" ? "Scanning" : "Ready";
  $("recordDot").classList.toggle("pulse", mode === "scanning");

  $("btnStart").disabled = mode !== "idle";
  $("btnStop").disabled = mode === "idle";
}

function setCameraUI(active) {
  $("videoWrap").classList.toggle("camera-active", active);
  $("cameraPlaceholder").classList.toggle("hidden", active);
  $("scanGuide").classList.toggle("hidden", !active);
  $("video").classList.toggle("live", active);
}

function setProgress(elapsed) {
  const pct = Math.min(100, (elapsed / SCAN_DURATION_SEC) * 100);
  $("scanProgress").style.width = `${pct}%`;
}

function computeMetrics() {
  const { bpm, snrConf, harmonicRatio } = state.processor.estimateBPM();
  const fps = state.processor.fps;
  const faceCoverage = state.framesTotal ? state.framesFace / state.framesTotal : 0;
  const conf = state.processor.computeConfidence(snrConf, faceCoverage, harmonicRatio, fps);
  const hrv = state.processor.estimateHRV(bpm);
  const elapsed = state.processor.scanSeconds;

  const m = {
    bpm,
    conf,
    hrv,
    fps,
    elapsed,
    faceCoverage,
    pulseSamples: state.pulseSamples,
    locked: bpm > 0 && conf >= CONF_LOCK,
    phase: state.processor.statusLine(bpm, conf, elapsed, SCAN_DURATION_SEC),
    tip: null,
  };
  m.tip = qualityTip(m);
  return m;
}

function updateMetricsUI(m) {
  $("valBpm").textContent = m.bpm > 0 ? Math.round(m.bpm) : "—";
  $("valHrv").textContent = m.hrv != null ? Math.round(m.hrv) : "—";
  $("valConf").textContent =
    m.elapsed >= MIN_SCAN_SEC && Number.isFinite(m.conf) ? `${Math.round(m.conf * 100)}%` : "—";

  $("phaseText").textContent = m.phase;
  $("timerText").textContent = formatTime(m.elapsed);
  setProgress(m.elapsed);
  $("metricsRow").classList.toggle("locked", m.locked);

  const tipEl = $("qualityTip");
  if (m.tip) {
    tipEl.textContent = m.tip;
    tipEl.hidden = false;
  } else {
    tipEl.hidden = true;
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

async function saveScan(payload) {
  try {
    await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* ok */
  }
}

function pickRecordMime() {
  for (const t of ["video/mp4", "video/webm;codecs=vp9", "video/webm"]) {
    if (MediaRecorder.isTypeSupported(t)) return t;
  }
  return "";
}

function startRecorder(stream) {
  if (typeof MediaRecorder === "undefined") return;
  state.recordChunks = [];
  state.recordMime = pickRecordMime();
  try {
    state.recorder = state.recordMime
      ? new MediaRecorder(stream, { mimeType: state.recordMime })
      : new MediaRecorder(stream);
  } catch {
    state.recorder = new MediaRecorder(stream);
    state.recordMime = state.recorder.mimeType || "video/webm";
  }
  state.recorder.ondataavailable = (e) => {
    if (e.data?.size) state.recordChunks.push(e.data);
  };
  state.recorder.start(1000);
}

function stopRecorder() {
  return new Promise((resolve) => {
    if (!state.recorder || state.recorder.state === "inactive") {
      state.recorder = null;
      resolve(null);
      return;
    }
    const rec = state.recorder;
    rec.onstop = () => {
      const type = state.recordMime || rec.mimeType || "video/webm";
      resolve(
        state.recordChunks.length ? new Blob(state.recordChunks, { type }) : null
      );
      state.recorder = null;
      state.recordChunks = [];
    };
    try {
      rec.stop();
    } catch {
      resolve(null);
    }
  });
}

async function uploadRecording(blob, preview) {
  const ext = blob.type.includes("mp4") ? ".mp4" : ".webm";
  const form = new FormData();
  form.append("video", blob, `scan${ext}`);
  form.append("mode", "scan");
  form.append("scan_seconds", String(preview.elapsed));
  if (preview.fps) form.append("fps", String(preview.fps));
  form.append("timestamp", String(Date.now()));

  const res = await fetch("/api/scan/video", { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Server ${res.status}`);
  }
  return res.json();
}

function buildPayload(m, data = {}) {
  return {
    bpm: data.bpm ?? (m.bpm > 0 ? Math.round(m.bpm * 10) / 10 : null),
    confidence: data.sqi ?? data.confidence ?? null,
    sqi: data.sqi ?? data.confidence ?? null,
    hrv_rmssd_ms: data.hrv_rmssd_ms ?? (m.hrv != null ? Math.round(m.hrv * 10) / 10 : null),
    scan_seconds: Math.round(m.elapsed * 100) / 100,
    mode: "scan",
    timestamp: Date.now(),
    source: data.engine ? "iphone_web_open_rppg" : "iphone_web_rppg",
    engine: data.engine,
    quality: data.quality,
  };
}

function waitForVideoReady(video) {
  return new Promise((resolve, reject) => {
    if (video.readyState >= 2 && video.videoWidth > 0) {
      resolve();
      return;
    }
    const onReady = () => {
      cleanup();
      video.videoWidth > 0 ? resolve() : reject(new Error("No video frames."));
    };
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Camera timeout."));
    }, 15000);
    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
    };
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);
  });
}

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: { ideal: "user" },
      width: { ideal: 640 },
      height: { ideal: 480 },
      frameRate: { ideal: 30, min: 20 },
    },
  });
  state.stream = stream;
  const video = $("video");
  video.playsInline = true;
  video.muted = true;
  video.srcObject = stream;
  await waitForVideoReady(video);
  await video.play();
  return video;
}

function processFrame(video, canvas, ctx) {
  if (video.readyState < 2 || !state.landmarker) {
    state.rafId = requestAnimationFrame(() => processFrame(video, canvas, ctx));
    return;
  }

  const w = canvas.width;
  const h = canvas.height;
  ctx.drawImage(video, 0, 0, w, h);

  let mpTs = Math.round(performance.now());
  if (mpTs <= state.lastMpTimestampMs) mpTs = state.lastMpTimestampMs + 33;
  state.lastMpTimestampMs = mpTs;

  let result;
  try {
    result = state.landmarker.detectForVideo(canvas, mpTs);
  } catch (err) {
    console.error(err);
    state.rafId = requestAnimationFrame(() => processFrame(video, canvas, ctx));
    return;
  }

  state.framesTotal++;
  const elapsedSec = (performance.now() - state.startedAt) / 1000;

  if (result.faceLandmarks?.length) {
    state.framesFace++;
    const lm = result.faceLandmarks[0];
    drawPulseRois(ctx, lm, w, h);
    const sample = extractPulseSample(ctx, lm, w, h);
    if (sample != null) {
      state.pulseSamples++;
      state.processor.addSample(sample, elapsedSec);
    }
  }

  const m = computeMetrics();
  updateMetricsUI(m);
  $("jsonPreview").textContent = JSON.stringify(buildPayload(m), null, 2);
  state.rafId = requestAnimationFrame(() => processFrame(video, canvas, ctx));
}

async function startScan() {
  if (!state.landmarker) return;

  try {
    await initLandmarker();
    state.processor.reset();
    state.framesTotal = 0;
    state.framesFace = 0;
    state.pulseSamples = 0;
    state.startedAt = performance.now();
    state.lastMpTimestampMs = 0;

    setMode("scanning");
    $("statusText").textContent = "Opening camera…";

    const video = await startCamera();
    setCameraUI(true);
    startRecorder(state.stream);

    const canvas = $("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (state.rafId) cancelAnimationFrame(state.rafId);
    $("statusText").textContent = "30s scan — hold still, face the light";

    processFrame(video, canvas, ctx);
    setTimeout(() => stopScan(), SCAN_DURATION_SEC * 1000);
  } catch (err) {
    console.error(err);
    stopScan();
    $("statusText").textContent = cameraErrorMessage(err);
  }
}

async function stopScan() {
  if (state.rafId) cancelAnimationFrame(state.rafId);
  state.rafId = null;

  const recordPromise = stopRecorder();
  if (state.stream) {
    state.stream.getTracks().forEach((t) => t.stop());
    state.stream = null;
  }

  const video = $("video");
  video.pause();
  video.srcObject = null;

  setCameraUI(false);
  setProgress(0);

  let finalM = null;
  if (state.framesTotal > 0) {
    finalM = computeMetrics();
    updateMetricsUI(finalM);
  }

  setMode("idle");

  const blob = await recordPromise;

  if (blob && blob.size > 80_000 && finalM && finalM.elapsed >= 24) {
    $("statusText").textContent = "Analyzing with open-rppg…";
    $("phaseText").textContent = "Processing your 30s scan";
    try {
      const data = await uploadRecording(blob, finalM);
      const bpm = data.bpm;
      $("valBpm").textContent = bpm != null ? Math.round(bpm) : "—";
      $("valHrv").textContent =
        data.hrv_rmssd_ms != null ? Math.round(data.hrv_rmssd_ms) : "—";
      const sqi = data.sqi ?? data.confidence;
      $("valConf").textContent = sqi != null ? `${Math.round(sqi * 100)}%` : "—";
      updateDeltaMetric(bpm);
      $("jsonPreview").textContent = JSON.stringify(buildPayload(finalM, data), null, 2);

      await refreshBaseline();

      if (bpm != null) {
        $("statusText").textContent = `Done · ${Math.round(bpm)} BPM`;
        $("phaseText").textContent = `Next scan tomorrow at ${formatTime12h($("routineTime").value)}`;
      }
      return;
    } catch (err) {
      console.error(err);
      $("statusText").textContent = err.message || "Analysis failed — try again";
    }
  }

  if (finalM?.bpm > 0) {
    $("statusText").textContent = "Scan ended — server analysis unavailable";
  } else {
    $("statusText").textContent = `Ready — scan at ${formatTime12h($("routineTime").value)}`;
  }
}

async function boot() {
  loadRoutine();
  loadPhase();

  $("routineTime").addEventListener("change", (e) => {
    const v = e.target.value || DEFAULT_ROUTINE;
    localStorage.setItem(ROUTINE_KEY, v);
    updateRoutineHint(v);
    saveProfile({ routine_time: v });
  });

  $("phaseSelect").addEventListener("change", (e) => {
    const v = e.target.value;
    localStorage.setItem(PHASE_KEY, v);
    saveProfile({ phase: v });
    refreshBaseline();
  });

  $("btnLockBaseline").addEventListener("click", async () => {
    $("btnLockBaseline").disabled = true;
    try {
      const r = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lock_reference_from_scans: true }),
      });
      if (!r.ok) throw new Error("Could not lock baseline");
      await refreshBaseline();
      $("statusText").textContent = "Pre-pregnancy baseline locked";
    } catch (err) {
      $("statusText").textContent = err.message;
    }
    $("btnLockBaseline").disabled = false;
  });

  $("btnStart").addEventListener("click", startScan);
  $("btnStop").addEventListener("click", stopScan);

  setCameraUI(false);

  try {
    await initLandmarker();
    const p = await fetch("/api/profile").then((r) => (r.ok ? r.json() : {}));
    if (p.routine_time) {
      $("routineTime").value = p.routine_time;
      localStorage.setItem(ROUTINE_KEY, p.routine_time);
      updateRoutineHint(p.routine_time);
    }
    if (p.phase) {
      $("phaseSelect").value = p.phase;
      localStorage.setItem(PHASE_KEY, p.phase);
    }
    saveProfile({
      routine_time: $("routineTime").value,
      phase: $("phaseSelect").value,
    });
    await refreshBaseline();
    $("statusText").textContent = window.isSecureContext
      ? `Ready — daily scan at ${formatTime12h($("routineTime").value)}`
      : "Use ngrok https:// on iPhone";
  } catch {
    $("statusText").textContent = "Could not load — refresh page";
  }
}

boot();
