/**
 * rPPG — remote photoplethysmography (browser).
 * Face ROI → pulse waveform → band-limited DFT → BPM / HRV.
 * Signal: simplified POS (3R − 2G) per frame, aligned with literature.
 */

const BPM_MIN = 45;
const BPM_MAX = 180;
const MIN_SCAN_SEC = 10;
const MIN_FPS_HRV = 15;
const HRV_MAX_MS = 200;
const CONF_LOCK = 0.35;

export class RPPGProcessor {
  constructor(maxSeconds = 120) {
    this.samples = [];
    this.times = [];
    this.maxSeconds = maxSeconds;
  }

  reset() {
    this.samples = [];
    this.times = [];
  }

  addSample(value, t) {
    this.samples.push(value);
    this.times.push(t);
    const cutoff = this.times[0] + this.maxSeconds;
    while (this.times.length > 1 && this.times[this.times.length - 1] > cutoff) {
      this.samples.shift();
      this.times.shift();
    }
  }

  get fps() {
    if (this.times.length < 2) return 0;
    const span = this.times[this.times.length - 1] - this.times[0];
    if (span <= 0) return 0;
    return (this.times.length - 1) / span;
  }

  get scanSeconds() {
    if (this.times.length < 2) return 0;
    return this.times[this.times.length - 1] - this.times[0];
  }

  get sampleCount() {
    return this.samples.length;
  }

  _acSignal() {
    if (this.samples.length < 10) return [];
    const fps = this.fps || 30;
    const win = Math.max(5, Math.floor(fps * 0.9));
    const ac = [];
    for (let i = 0; i < this.samples.length; i++) {
      let sum = 0;
      let count = 0;
      for (let j = Math.max(0, i - win); j <= Math.min(this.samples.length - 1, i + win); j++) {
        sum += this.samples[j];
        count++;
      }
      ac.push(this.samples[i] - sum / count);
    }
    return ac;
  }

  _detrend(signal) {
    const mean = signal.reduce((a, b) => a + b, 0) / signal.length;
    return signal.map((v) => v - mean);
  }

  _dftPower(signal, fps, freqHz) {
    if (!fps || fps <= 0) return 0;
    let re = 0;
    let im = 0;
    for (let n = 0; n < signal.length; n++) {
      const a = (-2 * Math.PI * freqHz * n) / fps;
      re += signal[n] * Math.cos(a);
      im += signal[n] * Math.sin(a);
    }
    return re * re + im * im;
  }

  _bandpassViaDft(signal, fps) {
    const detrended = this._detrend(signal);
    const n = detrended.length;
    if (n < 30 || !fps) return { freqs: [], mags: [], peakHz: 0 };

    const windowed = detrended.map(
      (v, i) => v * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / Math.max(n - 1, 1)))
    );
    const fMin = BPM_MIN / 60;
    const fMax = BPM_MAX / 60;
    const step = 0.02;
    let bestF = fMin;
    let bestP = -1;
    const freqs = [];
    const mags = [];
    for (let f = fMin; f <= fMax; f += step) {
      const p = this._dftPower(windowed, fps, f);
      freqs.push(f);
      mags.push(p);
      if (p > bestP) {
        bestP = p;
        bestF = f;
      }
    }
    return { freqs, mags, peakHz: bestF };
  }

  estimateBPM() {
    const fps = this.fps;
    if (!fps || this.scanSeconds < MIN_SCAN_SEC || this.samples.length < fps * MIN_SCAN_SEC * 0.5) {
      return { bpm: 0, snrConf: 0, harmonicRatio: 1 };
    }

    const ac = this._acSignal();
    const signal = ac.length ? ac : this._detrend(this.samples);
    const { freqs, mags, peakHz } = this._bandpassViaDft(signal, fps);
    if (!freqs.length || peakHz <= 0) return { bpm: 0, snrConf: 0, harmonicRatio: 1 };

    let bpm = peakHz * 60;
    const candidates = [bpm];
    if (bpm * 2 <= BPM_MAX) candidates.push(bpm * 2);
    if (bpm / 2 >= BPM_MIN) candidates.push(bpm / 2);

    const magAt = (b) => {
      const hz = b / 60;
      let idx = 0;
      let bestD = Infinity;
      for (let i = 0; i < freqs.length; i++) {
        const d = Math.abs(freqs[i] - hz);
        if (d < bestD) {
          bestD = d;
          idx = i;
        }
      }
      return mags[idx] ?? 0;
    };

    let bestMag = 0;
    for (const c of candidates) {
      const m = magAt(c);
      if (m > bestMag) {
        bestMag = m;
        bpm = c;
      }
    }

    const sorted = mags.slice().sort((a, b) => a - b);
    const median = (sorted[Math.floor(sorted.length / 2)] ?? 0) + 1e-9;
    const snrConf = Math.min(1, bestMag / (bestMag + 4 * median));
    const harmonicRatio = Math.min(2, bestMag / (magAt(peakHz * 60) + 1e-9));

    if (!Number.isFinite(bpm) || bpm < BPM_MIN || bpm > BPM_MAX) {
      return { bpm: 0, snrConf: 0, harmonicRatio: 1 };
    }
    return {
      bpm,
      snrConf: Number.isFinite(snrConf) ? snrConf : 0,
      harmonicRatio: Number.isFinite(harmonicRatio) ? harmonicRatio : 1,
    };
  }

  computeConfidence(snrConf, faceCoverage, harmonicRatio, fps) {
    const fpsFactor = Math.max(0, Math.min(1, ((fps || 0) - 8) / 22));
    const faceFactor = Math.max(0, Math.min(1, faceCoverage));
    const harmFactor = Math.max(0.5, Math.min(1, harmonicRatio));
    const blended = 0.45 * snrConf + 0.25 * fpsFactor + 0.2 * faceFactor + 0.1 * harmFactor;
    return Math.max(0, Math.min(1, blended));
  }

  _filteredTrace() {
    const ac = this._acSignal();
    const signal = ac.length ? ac : this._detrend(this.samples);
    const n = signal.length;
    if (n < 2) return signal;
    return signal.map(
      (v, i) => v * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / Math.max(n - 1, 1)))
    );
  }

  estimateHRV(bpm) {
    const fps = this.fps;
    if (!fps || fps < MIN_FPS_HRV || this.scanSeconds < 25 || bpm <= 0) return null;

    const filtered = this._filteredTrace();
    if (filtered.length < fps * 20) return null;

    const minDist = Math.max(Math.floor((fps * 60) / bpm * 0.55), 2);
    const std = Math.sqrt(filtered.reduce((s, v) => s + v * v, 0) / filtered.length) || 1e-6;
    const prom = std * 0.35;
    const peaks = [];
    for (let i = minDist; i < filtered.length - minDist; i++) {
      if (filtered[i] < prom) continue;
      let isPeak = true;
      for (let j = i - minDist; j <= i + minDist; j++) {
        if (j !== i && filtered[j] >= filtered[i]) isPeak = false;
      }
      if (isPeak && (peaks.length === 0 || i - peaks[peaks.length - 1] >= minDist)) peaks.push(i);
    }
    if (peaks.length < 8) return null;

    let rr = [];
    for (let i = 1; i < peaks.length; i++) rr.push((peaks[i] - peaks[i - 1]) / fps);
    const expected = 60 / bpm;
    rr = rr.filter((r) => Math.abs(r - expected) < expected * 0.45);
    if (rr.length < 5) return null;

    const diffs = [];
    for (let i = 1; i < rr.length; i++) diffs.push(rr[i] - rr[i - 1]);
    const rmssd = Math.sqrt(diffs.reduce((s, d) => s + d * d, 0) / diffs.length) * 1000;
    if (rmssd < 5 || rmssd > HRV_MAX_MS) return null;
    return rmssd;
  }

  /** One clear status line for the UI */
  statusLine(bpm, conf, elapsed, targetSec = 30) {
    if (elapsed < 1) return "Starting…";
    if (bpm > 0 && conf >= CONF_LOCK) {
      if (elapsed < 25) return `Pulse detected · ${Math.round(bpm)} BPM`;
      return `Tracking · ${Math.round(bpm)} BPM`;
    }
    if (elapsed < MIN_SCAN_SEC) {
      return `Reading pulse · ${Math.ceil(MIN_SCAN_SEC - elapsed)}s`;
    }
    if (targetSec > 0 && elapsed >= targetSec - 0.5) return "Finishing scan…";
    return "Hold still · light on forehead";
  }
}

function meanRgbBox(ctx, landmarks, i0, i1, w, h, pad = 0.15) {
  const x0 = landmarks[i0].x * w;
  const y0 = landmarks[i0].y * h;
  const x1 = landmarks[i1].x * w;
  const y1 = landmarks[i1].y * h;
  let minX = Math.max(0, Math.floor(Math.min(x0, x1)));
  let maxX = Math.min(w - 1, Math.ceil(Math.max(x0, x1)));
  let minY = Math.max(0, Math.floor(Math.min(y0, y1)));
  let maxY = Math.min(h - 1, Math.ceil(Math.max(y0, y1)));
  const pw = (maxX - minX) * pad;
  const ph = (maxY - minY) * pad;
  minX = Math.max(0, Math.floor(minX - pw));
  maxX = Math.min(w - 1, Math.ceil(maxX + pw));
  minY = Math.max(0, Math.floor(minY - ph));
  maxY = Math.min(h - 1, Math.ceil(maxY + ph));
  const rw = maxX - minX + 1;
  const rh = maxY - minY + 1;
  if (rw < 8 || rh < 8) return null;

  const { data } = ctx.getImageData(minX, minY, rw, rh);
  let r = 0;
  let g = 0;
  let b = 0;
  const n = rw * rh;
  for (let i = 0; i < n; i++) {
    const j = i * 4;
    r += data[j];
    g += data[j + 1];
    b += data[j + 2];
  }
  return { r: r / n, g: g / n, b: b / n };
}

/** POS-style pulse sample (de Haan & Jeanne, 2013 — simplified) */
/** ROI definitions: forehead + left/right cheek (standard rPPG — not whole face) */
export const PULSE_ROIS = [
  { i0: 10, i1: 151, pad: 0.4, label: "forehead" },
  { i0: 234, i1: 454, pad: 0.25, label: "cheeks" },
];

export function roiRect(landmarks, i0, i1, w, h, pad = 0.15) {
  const x0 = landmarks[i0].x * w;
  const y0 = landmarks[i0].y * h;
  const x1 = landmarks[i1].x * w;
  const y1 = landmarks[i1].y * h;
  let minX = Math.min(x0, x1);
  let maxX = Math.max(x0, x1);
  let minY = Math.min(y0, y1);
  let maxY = Math.max(y0, y1);
  const pw = (maxX - minX) * pad;
  const ph = (maxY - minY) * pad;
  return {
    x: Math.max(0, minX - pw),
    y: Math.max(0, minY - ph),
    w: Math.min(w, maxX + pw) - Math.max(0, minX - pw),
    h: Math.min(h, maxY + ph) - Math.max(0, minY - ph),
  };
}

export function drawPulseRois(ctx, landmarks, w, h) {
  ctx.lineWidth = 2;
  for (const roi of PULSE_ROIS) {
    const r = roiRect(landmarks, roi.i0, roi.i1, w, h, roi.pad);
    if (r.w < 8 || r.h < 8) continue;
    ctx.strokeStyle = "rgba(94, 234, 212, 0.85)";
    ctx.strokeRect(r.x, r.y, r.w, r.h);
  }
}

export function extractPulseSample(ctx, landmarks, w, h) {
  const boxes = PULSE_ROIS.map((roi) => meanRgbBox(ctx, landmarks, roi.i0, roi.i1, w, h, roi.pad)).filter(
    Boolean
  );

  if (!boxes.length) return null;

  let sum = 0;
  for (const { r, g } of boxes) {
    sum += 3 * r - 2 * g;
  }
  return sum / boxes.length;
}

export { CONF_LOCK, MIN_SCAN_SEC };
