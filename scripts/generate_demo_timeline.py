"""
Generate Maya Chen demo timeline:
~60 days pre-conception, ~280 days pregnancy (daily scans), ~120 days postpartum.
Run: python scripts/generate_demo_timeline.py
"""

from __future__ import annotations

import json
import math
import random
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VISION = ROOT / "vision"
PUBLIC_DEMO = ROOT / "public" / "demo"

# Timeline anchors
PRE_DAYS = 62
PREG_DAYS = 280
POST_DAYS = 120
START = date(2024, 11, 1)  # pre-conception baseline window
CONCEPTION = START + timedelta(days=PRE_DAYS)
DELIVERY = CONCEPTION + timedelta(days=PREG_DAYS)

random.seed(42)


def day_phase(d: date) -> str:
    if d < CONCEPTION:
        return "pre_pregnancy"
    if d < DELIVERY:
        return "pregnancy"
    return "postpartum"


def bpm_for_date(d: date) -> float:
    if d < CONCEPTION:
        # Pre-conception resting 68–74
        t = (d - START).days
        return 71.5 + 1.2 * math.sin(t / 9) + random.gauss(0, 1.2)

    days_preg = (d - CONCEPTION).days
    weeks = days_preg / 7.0

    if weeks < 8:
        base = 74 + weeks * 0.35
    elif weeks < 24:
        base = 77 + (weeks - 8) * 0.55
    elif weeks < 36:
        base = 86 + (weeks - 24) * 0.45
    else:
        base = 91 + min(8, (weeks - 36) * 0.9)

    # Postpartum
    if d >= DELIVERY:
        days_post = (d - DELIVERY).days
        if days_post < 14:
            base = 94 - days_post * 0.15
        elif days_post < 42:
            base = 92 - (days_post - 14) * 0.35
        else:
            base = 82 - (days_post - 42) * 0.12

    return base + random.gauss(0, 1.8)


def hrv_for_bpm(bpm: float, phase: str) -> float | None:
    if phase == "pre_pregnancy":
        return 46 + random.gauss(0, 3)
    if phase == "pregnancy":
        return max(28, 48 - (bpm - 72) * 0.35 + random.gauss(0, 2))
    return max(30, 42 - (bpm - 78) * 0.25 + random.gauss(0, 2))


def scan_quality(sqi: float) -> tuple[str, bool]:
    if sqi >= 0.58:
        return "good", True
    if sqi >= 0.42:
        return "marginal", True
    return "poor", False


def make_scan(d: date) -> dict:
    phase = day_phase(d)
    bpm = round(bpm_for_date(d), 1)
    sqi = round(min(0.78, max(0.44, 0.62 + random.gauss(0, 0.06))), 3)
    quality, trustworthy = scan_quality(sqi)
    hrv = hrv_for_bpm(bpm, phase)
    rr = 14 + (bpm - 72) * 0.04 + random.gauss(0, 0.5)

    ts = datetime(
        d.year, d.month, d.day, 7, 25 + random.randint(0, 20), 0, tzinfo=timezone.utc
    )

    return {
        "bpm": bpm,
        "confidence": sqi,
        "sqi": sqi,
        "hrv_rmssd_ms": round(hrv, 1) if hrv else None,
        "respiratory_rate_bpm": round(rr, 1),
        "engine": "open-rppg",
        "source": "iphone_web_open_rppg",
        "scan_seconds": 30.0,
        "quality": quality,
        "trustworthy": trustworthy,
        "phase": phase,
        "saved_at": ts.isoformat(),
    }


URGENT_SYMPTOMS = ["headache", "vision", "swelling", "dizziness", "tiredness"]
MILD_SYMPTOMS = ["nausea", "breathing"]


def make_symptoms() -> list[dict]:
    entries: list[dict] = []
    sid = 0
    d = START
    end = DELIVERY + timedelta(days=POST_DAYS)

    while d <= end:
        phase = day_phase(d)
        weeks_preg = (d - CONCEPTION).days / 7 if d >= CONCEPTION and d < DELIVERY else -1
        days_post = (d - DELIVERY).days if d >= DELIVERY else -1

        # Daily check-in ~35% of days
        if random.random() < 0.35:
            mood = 4
            symptoms: list[str] = []
            if phase == "pregnancy" and weeks_preg > 20 and random.random() < 0.08:
                symptoms = random.sample(["swelling", "tiredness"], k=random.randint(1, 2))
            if phase == "pregnancy" and weeks_preg > 30 and random.random() < 0.12:
                symptoms = list(
                    dict.fromkeys(
                        symptoms
                        + random.sample(["headache", "swelling", "vision"], k=random.randint(1, 2))
                    )
                )
            if phase == "postpartum" and days_post < 21 and random.random() < 0.15:
                mood = random.choice([2, 3])
                symptoms = ["tiredness"] + (
                    ["breathing"] if random.random() < 0.2 else []
                )
            if phase == "postpartum" and days_post > 30 and random.random() < 0.05:
                mood = 4

            entries.append(
                {
                    "id": f"demo-s{sid}",
                    "kind": "daily",
                    "mood": mood,
                    "symptomIds": symptoms,
                    "createdAt": datetime(
                        d.year, d.month, d.day, 9, 0, 0, tzinfo=timezone.utc
                    ).isoformat(),
                }
            )
            sid += 1

        # Momentary urgent flags in late pregnancy
        if phase == "pregnancy" and 32 <= weeks_preg <= 38 and random.random() < 0.04:
            entries.append(
                {
                    "id": f"demo-s{sid}",
                    "kind": "moment",
                    "mood": 2,
                    "symptomIds": random.sample(
                        ["headache", "vision", "swelling"], k=random.randint(1, 2)
                    ),
                    "createdAt": datetime(
                        d.year, d.month, d.day, 19, 30, 0, tzinfo=timezone.utc
                    ).isoformat(),
                }
            )
            sid += 1

        d += timedelta(days=1)

    return entries


def main() -> None:
    scans: list[dict] = []
    d = START
    end = DELIVERY + timedelta(days=POST_DAYS)
    while d <= end:
        scans.append(make_scan(d))
        d += timedelta(days=1)

    symptoms = make_symptoms()

    VISION.mkdir(parents=True, exist_ok=True)
    PUBLIC_DEMO.mkdir(parents=True, exist_ok=True)

    history_path = VISION / "demo_scan_history.jsonl"
    with history_path.open("w", encoding="utf-8") as f:
        for s in scans:
            f.write(json.dumps(s) + "\n")

    profile = {
        "phase": "postpartum",
        "routine_time": "07:30",
        "reference_bpm": 72,
        "reference_locked_at": (CONCEPTION - timedelta(days=5)).isoformat(),
        "ethnicity": "Asian",
        "ethnicity_calibration_enabled": True,
        "demo_user": "Maya Chen",
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    (VISION / "demo_user_profile.json").write_text(
        json.dumps(profile, indent=2), encoding="utf-8"
    )

    (PUBLIC_DEMO / "demo_symptom_logs.json").write_text(
        json.dumps(symptoms, indent=2), encoding="utf-8"
    )

    print(f"Wrote {len(scans)} scans -> {history_path}")
    print(f"Wrote {len(symptoms)} symptom logs")
    print(f"Pre: {PRE_DAYS}d | Pregnancy: {PREG_DAYS}d | Post: {POST_DAYS}d")
    print(f"Conception ~ {CONCEPTION} | Delivery ~ {DELIVERY}")


if __name__ == "__main__":
    main()
