"""Recovery zones vs pre-pregnancy reference (flowchart: green / amber / red)."""

from __future__ import annotations

from typing import Any

GREEN_DELTA = 8
AMBER_DELTA = 15


def recovery_status(
    latest_bpm: float | None,
    reference_bpm: float | None,
    recent_bpms: list[float],
    phase: str = "pregnancy",
) -> dict[str, Any]:
    """
    Map latest vitals to green / amber / red / building per pitch flowchart.
    """
    if latest_bpm is None:
        return {
            "zone": "building",
            "label": "No scan yet",
            "detail": "Complete a 30s scan at your routine time.",
        }

    if reference_bpm is None:
        if phase == "pre_pregnancy":
            n = len(recent_bpms)
            return {
                "zone": "building",
                "label": "Building baseline",
                "detail": f"{n}/3 good scans needed — then lock your pre-pregnancy baseline.",
                "scans_for_baseline": n,
                "scans_needed": max(0, 3 - n),
            }
        return {
            "zone": "building",
            "label": "Set pre-pregnancy baseline first",
            "detail": "Lock a reference BPM before pregnancy for recovery comparison.",
        }

    delta = round(latest_bpm - reference_bpm, 1)
    abs_d = abs(delta)

    # Worsening trend: last 3 scans each higher than reference by increasing margin
    if len(recent_bpms) >= 3:
        last3 = recent_bpms[-3:]
        if all(b > reference_bpm + 5 for b in last3) and last3[-1] > last3[0] + 5:
            return {
                "zone": "red",
                "label": "Worsening trend",
                "detail": "HR elevated across recent scans — consider clinical follow-up.",
                "delta_bpm": delta,
                "reference_bpm": reference_bpm,
            }

    if abs_d <= GREEN_DELTA:
        label = "At baseline" if phase == "postpartum" else "On track"
        return {
            "zone": "green",
            "label": label,
            "detail": f"Within {GREEN_DELTA} BPM of your reference ({reference_bpm} BPM).",
            "delta_bpm": delta,
            "reference_bpm": reference_bpm,
        }

    if abs_d <= AMBER_DELTA:
        return {
            "zone": "amber",
            "label": "Away from baseline",
            "detail": (
                "Lifestyle + talk to your PCP if this persists 3–6 months postpartum."
                if phase == "postpartum"
                else "Recheck tomorrow at your routine time; stay hydrated and rested."
            ),
            "delta_bpm": delta,
            "reference_bpm": reference_bpm,
        }

    return {
        "zone": "red",
        "label": "Far from baseline",
        "detail": "Large change vs reference — escalate / clinical follow-up if you feel unwell.",
        "delta_bpm": delta,
        "reference_bpm": reference_bpm,
    }
