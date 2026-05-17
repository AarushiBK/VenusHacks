/**
 * VitaCor — source picker + face scan (open-rppg)
 */

import { RPPGProcessor, extractPulseSample, CONF_LOCK, MIN_SCAN_SEC } from "./rppg-core.js?v=5";
import {
  applyPulseCalibration,
  applyBpmCalibration,
  calibrationLabel,
  confidenceBoost,
  getEthnicityProfile,
  isCalibrationEnabled,
  setCalibrationEnabled,
  setEthnicityProfile,
} from "./ethnicity-calibration.js?v=1";
import { FaceLandmarker, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
import { SOURCES, SOURCE_ORDER } from "./sources.js?v=1";
import { formatHrvDisplay, formatBaselineDisplay } from "./metrics-helpers.js?v=1";
import { renderCalendar } from "./calendar.js?v=1";

const SUPPORTER_PHONE = "5550148821";
const PROVIDER_PHONE = "5550142200";
const PROVIDER_NAME = "Dr. Elena Rivera";

const $ = (id) => document.getElementById(id);
const SCAN_DURATION_SEC = 30;
const RING_C = 326.73;
const ROUTINE_KEY = "hb_routine_time";
const PHASE_KEY = "hb_phase";
const SOURCE_KEY = "hb_source";
const DEFAULT_ROUTINE = "07:30";

let visionTasks = null;
let sourceIndex = SOURCE_ORDER.indexOf("face");

const state = {
  mode: "idle",
  landmarker: null,
  processor: new RPPGProcessor(180),
  rafId: null,
  framesTotal: 0,
  framesFace: 0,
  pulseSamples: 0,
  startedAt: 0,
  stream: null,
  lastMpTimestampMs: 0,
  recorder: null,
  recordChunks: [],
  recordMime: "",
  baseline: null,
  latest: null,
};

function currentSource() {
  return SOURCES.find((s) => s.id === SOURCE_ORDER[sourceIndex]) || SOURCES[1];
}

function formatTime12h(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function showView(name) {
  $("viewHub").classList.toggle("hidden", name !== "hub");
  $("viewScan").classList.toggle("hidden", name !== "scan");
  $("viewScan").setAttribute("aria-hidden", name === "scan" ? "false" : "true");
}

function setPickerIndex(idx) {
  sourceIndex = ((idx % SOURCE_ORDER.length) + SOURCE_ORDER.length) % SOURCE_ORDER.length;
  const id = SOURCE_ORDER[sourceIndex];
  localStorage.setItem(SOURCE_KEY, id);

  document.querySelectorAll(".source-bubble").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.source === id);
  });

  const offset = (sourceIndex - 1) * 136;
  $("pickerTrack").style.transform = `translateX(${-offset}px)`;

  const src = currentSource();
  $("sourceBlurb").textContent = src.blurb;
  $("metricsTitle").textContent = `${src.label} tracks`;
  $("btnScan").textContent = src.scanEnabled ? "Scan" : "Connect";

  renderMetricsList();
}

function renderMetricsList() {
  const src = currentSource();
  const latest = state.latest;
  const ul = $("metricsList");
  ul.innerHTML = "";

  src.metrics.forEach((m) => {
    let val = m.demo;
    if (src.id === "face" && latest) {
      if (m.key === "bpm" && latest.bpm != null) val = `${Math.round(latest.bpm)} BPM`;
      if (m.key === "hrv") val = formatHrvDisplay(latest);
      if (m.key === "signal" && (latest.sqi ?? latest.confidence) != null) {
        val = `${Math.round((latest.sqi ?? latest.confidence) * 100)}%`;
      }
      if (m.key === "delta") val = formatBaselineDisplay(latest, state.baseline);
    }
    const li = document.createElement("li");
    li.innerHTML = `<span>${m.label}</span><span class="val">${val}</span>`;
    ul.appendChild(li);
  });
}

async function loadLatest() {
  try {
    const r = await fetch("/api/latest");
    if (r.ok) state.latest = await r.json();
    renderMetricsList();
  } catch {
    /* ok */
  }
}

async function loadHistoryView() {
  const root = $("calendarRoot");
  if (!root) return;
  try {
    const [hr, bl] = await Promise.all([
      fetch("/api/history?limit=500"),
      fetch(`/api/baseline?phase=${encodeURIComponent($("phaseSelect").value)}`),
    ]);
    const scans = hr.ok ? (await hr.json()).scans : [];
    const baseline = bl.ok ? await bl.json() : state.baseline;
    renderCalendar(root, scans, baseline);
  } catch {
    root.innerHTML = "<p class='cal-detail'>Could not load history</p>";
  }
}

function setRingProgress(pct) {
  const off = RING_C * (1 - Math.min(1, pct));
  $("ringProgress").style.strokeDashoffset = String(off);
}

function updateRoutineHint(hhmm) {
  $("routineHint").innerHTML = `Every day at <strong>${formatTime12h(hhmm)}</strong>`;
}

async function saveProfile(patch) {
  try {
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  } catch {
    /* ok */
  }
}

async function refreshBaseline() {
  const phase = $("phaseSelect").value;
  try {
    const r = await fetch(`/api/baseline?phase=${encodeURIComponent(phase)}`);
    if (!r.ok) return;
    state.baseline = await r.json();
  } catch {
    return;
  }

  const rec = state.baseline?.recovery;
  const badge = $("recoveryBadge");
  if (!rec) {
    badge.classList.add("hidden");
    return;
  }
  badge.classList.remove("hidden", "zone-green", "zone-amber", "zone-red", "zone-building");
  if (rec.zone) badge.classList.add(`zone-${rec.zone}`);
  $("recoveryLabel").textContent = rec.label || "";
  $("recoveryDetail").textContent = rec.detail || "";

  $("btnLockBaseline").classList.toggle(
    "hidden",
    !($("phaseSelect").value === "pre_pregnancy" && state.baseline?.can_lock_reference)
  );

  const zone = rec?.zone;
  const showCare = zone === "amber" || zone === "red";
  $("careActions")?.classList.toggle("hidden", !showCare);

  renderMetricsList();
}

function setupEquityControls() {
  const toggle = $("equityCalibToggle");
  const select = $("ethnicitySelect");
  const hint = $("equityCalibHint");
  if (!toggle || !select) return;

  const params = new URLSearchParams(location.search);
  if (params.get("ethnicity")) {
    setEthnicityProfile(params.get("ethnicity"));
  }

  toggle.checked = isCalibrationEnabled();
  select.value = getEthnicityProfile();
  if (hint) hint.textContent = calibrationLabel(getEthnicity());

  toggle.addEventListener("change", () => {
    setCalibrationEnabled(toggle.checked);
    if (hint) hint.textContent = calibrationLabel(getEthnicity());
    saveProfile({
      ethnicity: getEthnicity(),
      ethnicity_calibration_enabled: toggle.checked,
    });
  });

  select.addEventListener("change", () => {
    setEthnicityProfile(select.value);
    if (hint) hint.textContent = calibrationLabel(getEthnicity());
    saveProfile({ ethnicity: select.value });
  });
}

function setupCareActions() {
  $("btnAlertSupporter")?.addEventListener("click", () => {
    const body = encodeURIComponent(
      "VitaCor demo alert: elevated cardiovascular pattern logged. Please check in (not a diagnosis)."
    );
    window.open(`sms:${SUPPORTER_PHONE}?body=${body}`, "_blank");
  });
  $("btnConnectProvider")?.addEventListener("click", () => {
    window.open(`tel:${PROVIDER_PHONE}`, "_self");
    setTimeout(() => {
      const subject = encodeURIComponent("VitaCor follow-up");
      const body = encodeURIComponent(
        `Hello ${PROVIDER_NAME},\n\nI would like to discuss my mirror scan and symptom trends.\n\n— Maya (demo)`
      );
      window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    }, 400);
  });
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
      delegate: /iPad|iPhone|iPod/.test(navigator.userAgent) ? "CPU" : "GPU",
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

function setScanUI(active) {
  $("cameraPlaceholder").classList.toggle("hidden", active);
  $("scanOverlay").classList.toggle("hidden", !active);
  $("video").classList.toggle("live", active);
  $("btnStop").classList.toggle("hidden", !active);
}

function getEthnicity() {
  return getEthnicityProfile();
}

function computeMetrics() {
  const { bpm: rawBpm, snrConf, harmonicRatio } = state.processor.estimateBPM();
  const fps = state.processor.fps;
  const faceCoverage = state.framesTotal ? state.framesFace / state.framesTotal : 0;
  let conf = state.processor.computeConfidence(snrConf, faceCoverage, harmonicRatio, fps);
  conf = Math.min(1, conf + confidenceBoost(getEthnicity()));
  const bpm = applyBpmCalibration(rawBpm, getEthnicity());
  return {
    bpm,
    conf,
    hrv: state.processor.estimateHRV(bpm),
    fps,
    elapsed: state.processor.scanSeconds,
    faceCoverage,
    pulseSamples: state.pulseSamples,
  };
}

function formatTime(sec) {
  return `${Math.floor(sec / 60)}:${Math.floor(sec % 60)
    .toString()
    .padStart(2, "0")}`;
}

function pickRecordMime() {
  for (const t of ["video/mp4", "video/webm"]) {
    if (MediaRecorder.isTypeSupported(t)) return t;
  }
  return "";
}

function startRecorder(stream) {
  state.recordChunks = [];
  state.recordMime = pickRecordMime();
  try {
    state.recorder = state.recordMime
      ? new MediaRecorder(stream, { mimeType: state.recordMime })
      : new MediaRecorder(stream);
  } catch {
    state.recorder = new MediaRecorder(stream);
  }
  state.recorder.ondataavailable = (e) => {
    if (e.data?.size) state.recordChunks.push(e.data);
  };
  state.recorder.start(1000);
}

function stopRecorder() {
  return new Promise((resolve) => {
    if (!state.recorder || state.recorder.state === "inactive") {
      resolve(null);
      return;
    }
    const rec = state.recorder;
    rec.onstop = () => {
      const type = state.recordMime || rec.mimeType || "video/webm";
      resolve(state.recordChunks.length ? new Blob(state.recordChunks, { type }) : null);
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
  const form = new FormData();
  form.append("video", blob, blob.type.includes("mp4") ? "scan.mp4" : "scan.webm");
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
  await new Promise((res, rej) => {
    if (video.readyState >= 2) res();
    else video.addEventListener("loadedmetadata", res, { once: true });
    setTimeout(() => rej(new Error("Camera timeout")), 15000);
  });
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

  const result = state.landmarker.detectForVideo(canvas, mpTs);
  state.framesTotal++;
  const elapsedSec = (performance.now() - state.startedAt) / 1000;

  if (result.faceLandmarks?.length) {
    state.framesFace++;
    const raw = extractPulseSample(ctx, result.faceLandmarks[0], w, h);
    const sample = applyPulseCalibration(raw, getEthnicity());
    if (sample != null) {
      state.pulseSamples++;
      state.processor.addSample(sample, elapsedSec);
    }
  }

  const m = computeMetrics();
  $("scanTimer").textContent = formatTime(elapsedSec);
  $("phaseText").textContent =
    elapsedSec < 5 ? "Hold still" : elapsedSec < 25 ? "Keep steady…" : "Almost done";
  setRingProgress(elapsedSec / SCAN_DURATION_SEC);
  state.rafId = requestAnimationFrame(() => processFrame(video, canvas, ctx));
}

async function startFaceScan() {
  if (!window.isSecureContext) {
    $("statusText").textContent = "Use https:// (ngrok) for camera";
    return;
  }
  if (!state.landmarker) {
    $("statusText").textContent = "Face tracking still loading…";
    try {
      await initLandmarker();
    } catch {
      $("statusText").textContent = "Face tracking unavailable — refresh the page";
      return;
    }
  }

  showView("scan");
  setScanUI(false);
  setRingProgress(0);
  $("scanCaption").textContent = "Align your face inside the oval";
  $("phaseText").textContent = "Opening camera…";

  try {
    state.processor.reset();
    state.framesTotal = 0;
    state.framesFace = 0;
    state.pulseSamples = 0;
    state.startedAt = performance.now();
    state.lastMpTimestampMs = 0;
    state.mode = "scanning";

    const video = await startCamera();
    setScanUI(true);
    startRecorder(state.stream);

    const canvas = $("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    processFrame(video, canvas, ctx);
    setTimeout(() => finishScan(), SCAN_DURATION_SEC * 1000);
  } catch (err) {
    console.error(err);
    $("phaseText").textContent = err.message || "Camera error";
    setTimeout(() => {
      showView("hub");
    }, 2000);
  }
}

async function finishScan() {
  if (state.rafId) cancelAnimationFrame(state.rafId);
  state.rafId = null;

  const blobP = stopRecorder();
  if (state.stream) {
    state.stream.getTracks().forEach((t) => t.stop());
    state.stream = null;
  }
  $("video").srcObject = null;
  setScanUI(false);

  const finalM = state.framesTotal > 0 ? computeMetrics() : null;
  state.mode = "idle";
  const blob = await blobP;

  $("phaseText").textContent = "Analyzing…";
  setRingProgress(1);

  try {
    if (blob && blob.size > 80_000 && finalM && finalM.elapsed >= 24) {
      const data = await uploadRecording(blob, finalM);
      state.latest = data;
      await loadLatest();
      await refreshBaseline();
      renderMetricsList();
      await loadHistoryView();
      $("phaseText").textContent =
        data.bpm != null ? `Done · ${Math.round(data.bpm)} BPM` : "Complete";
    } else {
      $("phaseText").textContent = "Scan too short — try again";
    }
  } catch (err) {
    const msg = err.message || "Analysis failed";
    $("phaseText").textContent = msg.includes("fetch") || msg.includes("Failed")
      ? "Scan server offline — run npm run dev:rppg"
      : msg;
  }

  setTimeout(() => {
    showView("hub");
    $("statusText").textContent = `Next scan · ${formatTime12h($("routineTime").value)}`;
  }, 1800);
}

function onScanClick() {
  const src = currentSource();
  if (src.scanEnabled) {
    startFaceScan();
    return;
  }
  $("statusText").textContent =
    src.id === "watch"
      ? "Apple Watch sync — HealthKit (coming in full app)"
      : "Oura sync — API (coming in full app)";
}

async function boot() {
  if (new URLSearchParams(location.search).get("embed") === "1") {
    document.body.classList.add("embed-mode");
  }
  const savedSource = localStorage.getItem(SOURCE_KEY);
  if (savedSource) sourceIndex = Math.max(0, SOURCE_ORDER.indexOf(savedSource));

  $("routineTime").value = localStorage.getItem(ROUTINE_KEY) || DEFAULT_ROUTINE;
  updateRoutineHint($("routineTime").value);
  $("phaseSelect").value = localStorage.getItem(PHASE_KEY) || "pregnancy";

  $("pickerPrev").addEventListener("click", () => setPickerIndex(sourceIndex - 1));
  $("pickerNext").addEventListener("click", () => setPickerIndex(sourceIndex + 1));
  document.querySelectorAll(".source-bubble").forEach((btn) => {
    btn.addEventListener("click", () => setPickerIndex(SOURCE_ORDER.indexOf(btn.dataset.source)));
  });

  $("btnScan").addEventListener("click", onScanClick);
  $("btnBack").addEventListener("click", () => {
    if (state.mode === "scanning") finishScan();
    else showView("hub");
  });

  $("btnStop").addEventListener("click", finishScan);

  $("routineTime").addEventListener("change", (e) => {
    localStorage.setItem(ROUTINE_KEY, e.target.value);
    updateRoutineHint(e.target.value);
    saveProfile({ routine_time: e.target.value });
  });
  $("phaseSelect").addEventListener("change", (e) => {
    localStorage.setItem(PHASE_KEY, e.target.value);
    saveProfile({ phase: e.target.value });
    refreshBaseline();
    loadHistoryView();
  });
  $("btnLockBaseline").addEventListener("click", async () => {
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lock_reference_from_scans: true }),
    });
    await refreshBaseline();
  });

  let touchX = 0;
  $("pickerTrack").parentElement.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.touches[0].clientX;
    },
    { passive: true }
  );
  $("pickerTrack").parentElement.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) setPickerIndex(sourceIndex + (dx < 0 ? 1 : -1));
    },
    { passive: true }
  );

  setPickerIndex(sourceIndex);
  setupEquityControls();
  setupCareActions();

  if (!window.isSecureContext) {
    $("statusText").textContent = "Camera needs HTTPS — use ngrok on iPhone";
    return;
  }

  $("statusText").textContent = "Loading face tracking…";
  try {
    await initLandmarker();
  } catch (err) {
    console.error(err);
    $("statusText").textContent =
      "Face tracking failed — check network (MediaPipe CDN) and refresh";
    return;
  }

  let apiOnline = false;
  try {
    const health = await fetch("/api/health", { signal: AbortSignal.timeout(4000) });
    apiOnline = health.ok;
  } catch {
    apiOnline = false;
  }

  if (!apiOnline) {
    $("statusText").textContent =
      "Start scan server: npm run dev:rppg (port 8000), then refresh";
  }

  try {
    const p = await fetch("/api/profile").then((r) => (r.ok ? r.json() : {}));
    if (p.routine_time) {
      $("routineTime").value = p.routine_time;
      updateRoutineHint(p.routine_time);
    }
    if (p.phase) $("phaseSelect").value = p.phase;
    if (p.ethnicity) {
      setEthnicityProfile(p.ethnicity);
      if ($("ethnicitySelect")) $("ethnicitySelect").value = p.ethnicity;
    }
    if (typeof p.ethnicity_calibration_enabled === "boolean" && $("equityCalibToggle")) {
      $("equityCalibToggle").checked = p.ethnicity_calibration_enabled;
      setCalibrationEnabled(p.ethnicity_calibration_enabled);
    }
    if (apiOnline) {
      saveProfile({
        routine_time: $("routineTime").value,
        phase: $("phaseSelect").value,
        ethnicity: getEthnicity(),
        ethnicity_calibration_enabled: isCalibrationEnabled(),
      });
    }
  } catch {
    /* profile optional when offline */
  }

  if (apiOnline) {
    await loadLatest();
    await refreshBaseline();
    await loadHistoryView();
  }

  if (apiOnline) {
    $("statusText").textContent = `Daily scan · ${formatTime12h($("routineTime").value)}`;
  }
}

boot();
