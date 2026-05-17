# rPPG research basis — Hemodynamic Bridge

This project uses **remote photoplethysmography (rPPG)**: estimating pulse from **standard RGB camera video** of the skin (forehead/cheeks). No ML “heart dataset” is required for the core BPM path—the signal is physics + digital signal processing (DSP).

## Core science

1. **Hemoglobin absorbs green light** (~530–570 nm). Each heartbeat changes blood volume in superficial facial vessels, slightly changing how much green light is reflected back to the camera.
2. The change is **invisible to the eye** but measurable as a small periodic fluctuation in the **green channel** over time.
3. **Regions of interest (ROI)** on the forehead and cheeks have strong pulsatile signal (Verkruysse et al.; Poh et al.).
4. **Bandpass filtering** (~0.75–3.5 Hz ≈ 45–210 BPM) removes drift, lighting flicker, and motion.
5. **Frequency analysis (FFT / DFT)** finds the dominant pulse frequency → BPM.
6. **Beat-to-beat intervals** on the filtered waveform → **HRV (RMSSD)** when frame rate and stability are sufficient.

## Implementation mapping (this repo)

| Step | Server (open-rppg) | Phone live preview (`web/js/`) |
|------|--------------------|--------------------------------|
| Face ROI | Built-in face detector (ONNX) | MediaPipe Tasks (browser) |
| Signal / model | **FacePhys.rlap** deep rPPG | POS-style chrominance (`3R−2G`) |
| BPM | FFT on learned BVP + SQI | DFT peak + harmonic check |
| HRV | NeuroKit-style PRV when SQI > 0.5 | RMSSD from preview waveform |
| Confidence | **SQI** (0–1) from open-rppg | SNR + FPS + face coverage |
| Final result | **POST /api/scan/video** after 30s recording | Shown during scan only |

Python-only dev path: `vision/rppg_scanner.py` (classical green-channel + SciPy).

## Key references (for judges / write-up)

- Verkruysse, Svaasand, Nelson — *Remote plethysmographic imaging using ambient light* (Optics Express, 2008).
- Poh, McDuff, Picard — *Non-contact, automated cardiac pulse measurements using video* (MIT Media Lab, 2010).
- de Haan, Jeanne — *Robust pulse rate from chrominance-based rPPG* (IEEE TBME, 2013) — CHROM/POS family.
- Wieringa et al. — *Remote PPG: evaluation of contactless heart rate measurement* (review).
- American Heart Association — pregnancy/postpartum cardiovascular risk and lifelong CVD prevention (clinical framing, not rPPG validation).

## What is NOT in the prototype

- **Not** Apple Watch PPG (contact sensor on wrist)—that is complementary data via HealthKit (Member 2).
- **Not** clinical SpO2 or blood pressure from face-only video (research-grade; do not over-claim).
- **Not** trained on a patient dataset for BPM—the live signal **is** the measurement.

## iPhone vs laptop camera

Both use **rPPG** if they use the **front/rear RGB camera**. iPhone often gives **higher FPS and better optics**, which improves HRV and confidence. The Apple Watch heart sensor is a different modality (contact PPG).

## Open-source libraries

| Project | Used here? | Notes |
|---------|------------|--------|
| **[open-rppg](https://github.com/KegangWangCCNU/open-rppg)** | **Yes (server)** | Chosen: `pip install`, FacePhys model, HRV + SQI, MIT code |
| [rPPG-Toolbox](https://github.com/ubicomplab/rPPG-Toolbox) | Reference | NeurIPS toolbox — best for offline benchmark sweeps, heavier config |
| [rppg-vitalsigns](https://github.com/ebowwa/rppg-vitalsigns) | Future | VitalLens / training — lowest reported MAE but needs GPU + weights |
| [heartbeat-js](https://github.com/prouast/heartbeat-js) | Preview only | Browser live estimate during scan |

Phone camera rPPG often differs from Apple Watch by **±5–15 BPM** without calibration. Use Watch for ground truth; use face scan for **daily trends** in the pitch.

## Scan regions (not full face)

We measure **forehead + cheeks** only — the standard rPPG ROIs. The red circle is a guide; teal boxes show where pulse is actually read.
