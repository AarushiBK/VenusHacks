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
| `/` | Platform overview — problem statement and entry points |
| `/carechain` | Four interactive demos: Missed Signal Replay, Interpretation Diff, Trajectory Engine, Continuity Map, Prevention Coach |
| `/motherboard` | Lifelong cardiovascular passport — timeline, recovery graph, Future Heart Replay |
| `/health` | Overall health detail, averages, and daily recommendations |
| `/metrics` | Face-scan rPPG hub (Watch / Face / Oura picker, 30s scan, history calendar) |
| `/vitals` | Redirects to `/health` |

All data on every page is synthetic and for demonstration only. The app does not provide medical advice.

## Stack

Next.js 15 · React 19 · Tailwind CSS 4 · React Three Fiber
