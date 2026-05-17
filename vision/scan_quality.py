"""Quality tiers for open-rppg scans — used for baseline and trends."""

from __future__ import annotations

from typing import Any

OPEN_RPPG_SOURCES = {"iphone_web_open_rppg", "open-rppg"}
MIN_SECONDS_GOOD = 24.0
SQI_GOOD = 0.55
SQI_MARGINAL = 0.40


def sqi_of(scan: dict[str, Any]) -> float | None:
    v = scan.get("sqi")
    if v is None:
        v = scan.get("confidence")
    if v is None:
        return None
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def is_open_rppg(scan: dict[str, Any]) -> bool:
    if scan.get("engine") == "open-rppg":
        return True
    return scan.get("source") in OPEN_RPPG_SOURCES


def scan_quality(scan: dict[str, Any]) -> str:
    """
    good | marginal | poor | too_short | legacy_preview
    """
    if not is_open_rppg(scan):
        return "legacy_preview"
    secs = float(scan.get("scan_seconds") or 0)
    if secs < MIN_SECONDS_GOOD:
        return "too_short"
    sqi = sqi_of(scan)
    if sqi is None:
        return "unknown"
    if sqi >= SQI_GOOD:
        return "good"
    if sqi >= SQI_MARGINAL:
        return "marginal"
    return "poor"


def enrich_scan(scan: dict[str, Any]) -> dict[str, Any]:
    q = scan_quality(scan)
    out = {**scan, "quality": q, "trustworthy": q in ("good", "marginal")}
    sqi = sqi_of(scan)
    if sqi is not None:
        out["sqi"] = round(sqi, 3)
    if out.get("hrv_rmssd_ms") is None:
        detail = scan.get("hrv_detail")
        if isinstance(detail, dict) and detail.get("rmssd") is not None:
            try:
                out["hrv_rmssd_ms"] = round(float(detail["rmssd"]), 1)
            except (TypeError, ValueError):
                pass
    return out


def filter_for_baseline(scans: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [s for s in scans if scan_quality(s) in ("good", "marginal") and s.get("bpm")]
