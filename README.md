# CARECHAIN CARDIO

**The Maternal Cardiovascular Continuity Infrastructure**

An intelligence layer connecting fragmented maternal cardiovascular care across pregnancy and postpartum — not a symptom tracker, not an AI doctor.

## Run locally

```bash
npm install
pip install -r requirements.txt
```

**Terminal 1** — face-scan API (required for the Metrics tab):

```bash
npm run dev:rppg
```

**Terminal 2** — Next.js app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — profile dashboard, avg metrics grid, send report |
| `/health` | Overall health detail, averages, and daily recommendations |
| `/metrics` | Face-scan rPPG hub (Watch / Face / Oura picker, 30s scan, history calendar) |
| `/carechain` | Four interactive demos: Missed Signal Replay, Interpretation Diff, Trajectory Engine, Continuity Map, Prevention Coach |
| `/motherboard` | Lifelong cardiovascular passport — timeline, recovery graph, Future Heart Replay |
| `/vitals` | Redirects to `/health` |

All data on every page is synthetic and for demonstration only. The app does not provide medical advice.

## Face scanner (rPPG)

The **Metrics** tab embeds the VitaCor face-scan flow from `face_scanner_RPPG`:

- **Live preview** on device; **final BPM/HRV** from [open-rppg](https://github.com/KegangWangCCNU/open-rppg) on the Python server after upload
- **iPhone:** Safari needs **HTTPS** for camera access — see [docs/IPHONE_SETUP.md](docs/IPHONE_SETUP.md) and `scripts/start-ngrok.ps1`
- **Laptop test:** `http://127.0.0.1:8000` (standalone) or Metrics tab with `npm run dev:rppg` + `npm run dev`
- Standalone hub also at `web/index.html` when running `python server/app.py` directly

More detail: `research/REFERENCES.md`

## Stack

Next.js 15 · React 19 · Tailwind CSS 4 · FastAPI · open-rppg
