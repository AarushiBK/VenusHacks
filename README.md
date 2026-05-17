# VitaCor (Hemodynamic Bridge) — Venus Hacks

**Remote photoplethysmography (rPPG)** for long-term women's heart health (pregnancy → postpartum → lifelong baseline).

## Yes — we use real rPPG

| Question | Answer |
|----------|--------|
| Is this rPPG? | **Yes.** Pulse from **camera** blood-volume changes (forehead/cheeks). |
| iPhone camera? | **Yes** — **web app** records video; **server** runs [open-rppg](https://github.com/KegangWangCCNU/open-rppg) (deep model). |
| Live preview BPM? | Lightweight JS estimate during scan; **final BPM** from open-rppg after upload. |
| Laptop webcam? | Same flow — dev/testing. |
| Apple Watch sensor? | **Different** (contact PPG on wrist). Optional add-on via Member 2. |
| ML heart dataset? | **No patient labels** — pretrained FacePhys model + your face video. See `research/REFERENCES.md`. |

## iPhone app (recommended demo)

### 1. Install & start server

```powershell
cd "c:\Users\aarab\New folder\VenusHacks"
pip install -r requirements.txt
python server/app.py
```

### 2. Open on iPhone

**Important:** iPhone Safari **blocks the camera on plain HTTP**. You will see a black box or a ▶ play icon — that is **not** a video file; the camera never started.

| Method | Steps |
|--------|--------|
| **ngrok (required for iPhone)** | See below — `ngrok` is not in PATH by default on Windows |
| **Laptop test** | `http://127.0.0.1:8000` in Chrome → tap **30s scan** (camera works on localhost) |

**Before scanning:** you should see “Tap 30s scan to open front camera”. **After tapping:** your face appears (not black).

#### ngrok on Windows (`ngrok` not recognized)

Signing up ≠ installed on PATH. Use the bundled scripts (open https://ngrok.com/download in a **browser**, not the terminal):

```powershell
cd "c:\Users\aarab\New folder\VenusHacks"
.\scripts\setup-ngrok.ps1 -Token YOUR_TOKEN_FROM_DASHBOARD
.\scripts\start-ngrok.ps1
```

Terminal 1 must still run `python server/app.py`. Copy the **`https://`** URL from Terminal 2 into iPhone Safari.

### 3. Use the app

- **/** — main hub: rotate **Face scan · Apple Watch · Oura**, tap **Scan**  
- **/login.html** · **/signup.html** — VitaCor auth screens (demo)  
- **One daily 30s face scan** — set routine time (default **7:30 AM**), auto-stops  
- Instructions for when to scan / when not to  
- **Pre-pregnancy baseline** → pregnancy daily scans → postpartum **green / amber / red** vs reference  
- Live **BPM preview** during scan; after 30s, video uploads → **open-rppg** BPM + **SQI** + HRV  
- First server start may take **1–3 min** to load the model (status bar shows progress)  
- Data saved to `vision/latest_scan.json` + `vision/scan_history.jsonl` for the 3D heart teammate  

### rPPG engine choice

| Library | Role in this repo |
|---------|-------------------|
| **[open-rppg](https://github.com/KegangWangCCNU/open-rppg)** | **Primary** — `pip install open-rppg`, server analyzes uploaded scans |
| [rPPG-Toolbox](https://github.com/ubicomplab/rPPG-Toolbox) | Research reference / offline validation (not wired in) |
| [rppg-vitalsigns](https://github.com/ebowwa/rppg-vitalsigns) | Heavier VitalLens training stack — future if you need lowest MAE |

**License:** open-rppg code is MIT; pretrained weights follow each paper’s terms — cite models in your write-up ([open-rppg README](https://github.com/KegangWangCCNU/open-rppg)).  

## Python dev scanner (laptop)

```powershell
python vision/rppg_scanner.py --quick
```

Continuous mode shows **red REC** + `CONTINUOUS` on the camera window.

## Project layout

```
vision/          Python rPPG + open_rppg_engine.py
web/             iPhone browser (live preview + video upload)
server/          FastAPI — web app + /api/scan/video (open-rppg)
research/        REFERENCES.md — papers & method mapping
```

## iPhone settings for better scans

See **[docs/IPHONE_SETUP.md](docs/IPHONE_SETUP.md)** — turn off Low Power Mode, allow Safari camera, face the light, charge the phone.

## Validate results

1. Count wrist pulse 15s × 4 → compare to BPM  
2. FPS should be **20+** on iPhone  
3. HRV only trust when FPS ≥ 20 and value **&lt; 150 ms** typical  

> Wellness prototype — not a medical device.
