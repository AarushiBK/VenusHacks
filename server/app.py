"""
Hemodynamic Bridge API — serves iPhone web rPPG app + stores latest scans.

Run: python server/app.py
Then on iPhone (same WiFi): https via ngrok OR deploy web/ to Vercel for HTTPS camera access.

30s scans: phone records video → POST /api/scan/video → open-rppg (server) for BPM/HRV/SQI.
Live preview on phone still uses lightweight JS rPPG during the scan.
"""

from __future__ import annotations

import json
import shutil
import socket
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from vision.open_rppg_engine import analyze_video_path, model_status, preload_model
from vision.baseline_logic import recovery_status
from vision.scan_quality import enrich_scan, filter_for_baseline

WEB = ROOT / "web"
VISION = ROOT / "vision"
LATEST = VISION / "latest_scan.json"
HISTORY = VISION / "scan_history.jsonl"
DEMO_HISTORY = VISION / "demo_scan_history.jsonl"
DEMO_PROFILE = VISION / "demo_user_profile.json"
PROFILE = VISION / "user_profile.json"
UPLOADS = VISION / "uploads"

app = FastAPI(title="Hemodynamic Bridge", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProfilePayload(BaseModel):
    phase: str | None = None
    routine_time: str | None = None
    reference_bpm: float | None = None
    lock_reference_from_scans: bool = False
    ethnicity: str | None = None
    ethnicity_calibration_enabled: bool | None = None


class ScanPayload(BaseModel):
    bpm: float | None = None
    confidence: float | None = None
    hrv_rmssd_ms: float | None = None
    respiratory_rate_bpm: float | None = None
    fps: float | None = None
    scan_seconds: float | None = None
    mode: str = "scan"
    source: str = "iphone_web_rppg"
    timestamp: int | None = None
    engine: str | None = None
    model: str | None = None
    sqi: float | None = None
    preview_bpm: float | None = None


def _local_ip() -> str:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except OSError:
        return "127.0.0.1"


def _load_history(limit: int = 500) -> list[dict]:
    if not HISTORY.is_file():
        return []
    lines = HISTORY.read_text(encoding="utf-8").strip().splitlines()
    return [json.loads(line) for line in lines[-limit:] if line.strip()]


def _load_profile() -> dict:
    if PROFILE.is_file():
        return json.loads(PROFILE.read_text(encoding="utf-8"))
    return {}


def _save_profile(data: dict) -> dict:
    PROFILE.parent.mkdir(parents=True, exist_ok=True)
    merged = {**_load_profile(), **data}
    merged["updated_at"] = datetime.now(timezone.utc).isoformat()
    PROFILE.write_text(json.dumps(merged, indent=2), encoding="utf-8")
    return merged


def _persist_scan(data: dict) -> Path:
    data = enrich_scan(data)
    data["saved_at"] = datetime.now(timezone.utc).isoformat()
    LATEST.parent.mkdir(parents=True, exist_ok=True)
    LATEST.write_text(json.dumps(data, indent=2), encoding="utf-8")
    with HISTORY.open("a", encoding="utf-8") as f:
        f.write(json.dumps(data) + "\n")
    return LATEST


def _apply_demo_timeline() -> int:
    """Copy Maya demo scans + profile into active storage. Returns scan count."""
    if not DEMO_HISTORY.is_file():
        return len(_load_history())
    HISTORY.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(DEMO_HISTORY, HISTORY)
    lines = [
        line.strip()
        for line in DEMO_HISTORY.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    if lines:
        LATEST.write_text(lines[-1] + "\n", encoding="utf-8")
    if DEMO_PROFILE.is_file():
        shutil.copyfile(DEMO_PROFILE, PROFILE)
    return len(lines)


def _seed_demo_scan_data() -> None:
    """Load Maya demo scan timeline when no real history exists yet."""
    if _load_history():
        return
    _apply_demo_timeline()


@app.post("/api/demo/ensure")
def ensure_maya_demo():
    """
    Idempotent: ensure Maya longitudinal scans exist.
    If history is empty or thin (<50 scans), reload full demo timeline.
    New scans you take after this are still appended on top.
    """
    existing = _load_history(5000)
    if len(existing) >= 50:
        profile = _load_profile()
        if not profile.get("reference_bpm") and DEMO_PROFILE.is_file():
            demo = json.loads(DEMO_PROFILE.read_text(encoding="utf-8"))
            _save_profile({k: v for k, v in demo.items() if k != "updated_at"})
        return {
            "ok": True,
            "scan_count": len(existing),
            "reloaded": False,
            "message": "Timeline already loaded — new scans will append.",
        }
    count = _apply_demo_timeline()
    return {
        "ok": True,
        "scan_count": count,
        "reloaded": True,
        "message": "Loaded Maya demo timeline (pre-conception → postpartum).",
    }


@app.on_event("startup")
def startup_preload_rppg():
    _seed_demo_scan_data()
    preload_model()


@app.get("/api/health")
def health():
    st = model_status()
    return {
        "ok": True,
        "method": "rPPG",
        "engine": st.get("library"),
        "model_ready": st.get("ready"),
        "model_loading": st.get("loading"),
        "note": "Camera scan + open-rppg server analysis — see research/REFERENCES.md",
    }


@app.get("/api/rppg/status")
def rppg_status():
    return model_status()


@app.get("/api/latest")
def latest():
    if LATEST.is_file():
        return json.loads(LATEST.read_text(encoding="utf-8"))
    return {"bpm": 0, "confidence": 0, "message": "No scan yet"}


@app.get("/api/history")
def history(limit: int = 20, trustworthy_only: bool = False):
    cap = min(max(limit, 1), 500)
    scans = _load_history(cap * 3 if trustworthy_only else cap)
    if trustworthy_only:
        scans = [s for s in scans if enrich_scan(s).get("trustworthy")][-limit:]
    else:
        scans = scans[-limit:]
    return {"scans": [enrich_scan(s) for s in scans], "count": len(scans)}


def _median_bpm(scans: list[dict]) -> float | None:
    bpms = sorted(s["bpm"] for s in scans if s.get("bpm"))
    if not bpms:
        return None
    mid = len(bpms) // 2
    return round(bpms[mid] if len(bpms) % 2 else (bpms[mid - 1] + bpms[mid]) / 2, 1)


@app.get("/api/profile")
def get_profile():
    return _load_profile()


@app.post("/api/profile")
def save_profile(payload: ProfilePayload):
    data = payload.model_dump(exclude_none=True)
    lock = data.pop("lock_reference_from_scans", None)
    if lock:
        good = filter_for_baseline(_load_history(200))
        med = _median_bpm(good)
        if med is None:
            raise HTTPException(400, "Need at least one good open-rppg scan to lock baseline")
        data["reference_bpm"] = med
        data["reference_locked_at"] = datetime.now(timezone.utc).isoformat()
    return _save_profile(data)


@app.get("/api/baseline")
def baseline(user_id: str | None = None, phase: str | None = None):
    """
    Pre-pregnancy reference + rolling median + green/amber/red recovery zone.
    """
    profile = _load_profile()
    phase = phase or profile.get("phase") or "pregnancy"
    scans = filter_for_baseline(_load_history(500))
    if user_id:
        scans = [s for s in scans if s.get("user_id") == user_id]

    reference_bpm = profile.get("reference_bpm")
    rolling_median = _median_bpm(scans)
    recent_bpms = [float(s["bpm"]) for s in scans if s.get("bpm")][-10:]

    latest_bpm = None
    if LATEST.is_file():
        latest = enrich_scan(json.loads(LATEST.read_text(encoding="utf-8")))
        if latest.get("trustworthy"):
            latest_bpm = latest.get("bpm")

    recovery = recovery_status(latest_bpm, reference_bpm, recent_bpms, phase)

    if not scans:
        return {
            "ready": False,
            "scan_count": 0,
            "phase": phase,
            "routine_time": profile.get("routine_time", "07:30"),
            "reference_bpm": reference_bpm,
            "rolling_median_bpm": None,
            "recovery": recovery,
            "message": "Need good open-rppg scans (≥24s, SQI ≥ 0.4)",
        }

    hrvs = [s["hrv_rmssd_ms"] for s in scans if s.get("hrv_rmssd_ms")]
    return {
        "ready": len(scans) >= 3,
        "scan_count": len(scans),
        "phase": phase,
        "routine_time": profile.get("routine_time", "07:30"),
        "reference_bpm": reference_bpm,
        "reference_locked": reference_bpm is not None,
        "rolling_median_bpm": rolling_median,
        "bpm_min": round(min(s["bpm"] for s in scans), 1),
        "bpm_max": round(max(s["bpm"] for s in scans), 1),
        "hrv_rmssd_ms_mean": round(sum(hrvs) / len(hrvs), 1) if hrvs else None,
        "latest_bpm": latest_bpm,
        "last_scan_at": scans[-1].get("saved_at"),
        "recovery": recovery,
        "can_lock_reference": reference_bpm is None and len(scans) >= 3,
    }


@app.post("/api/scan")
def save_scan(payload: ScanPayload):
    data = payload.model_dump(exclude_none=True)
    path = _persist_scan(data)
    return {"ok": True, "path": str(path)}


@app.post("/api/scan/video")
async def scan_video(
    video: UploadFile = File(...),
    mode: str = Form("scan"),
    preview_bpm: float | None = Form(None),
    preview_confidence: float | None = Form(None),
    scan_seconds: float | None = Form(None),
    fps: float | None = Form(None),
    timestamp: int | None = Form(None),
    user_id: str | None = Form(None),
):
    """Analyze a recorded face video with open-rppg (authoritative BPM/HRV/SQI)."""
    st = model_status()
    if st.get("error"):
        raise HTTPException(503, f"open-rppg unavailable: {st['error']}")
    if not st.get("ready"):
        raise HTTPException(
            503,
            "open-rppg model still loading — wait 1–3 min after server start, then retry",
        )

    suffix = Path(video.filename or "scan.webm").suffix or ".webm"
    if suffix.lower() not in {".webm", ".mp4", ".mov", ".mkv", ".m4v"}:
        suffix = ".webm"

    UPLOADS.mkdir(parents=True, exist_ok=True)
    dest = UPLOADS / f"{uuid.uuid4().hex}{suffix}"

    try:
        with dest.open("wb") as out:
            shutil.copyfileobj(video.file, out)
    finally:
        await video.close()

    if dest.stat().st_size < 50_000:
        dest.unlink(missing_ok=True)
        raise HTTPException(400, "Video too short — hold still for the full scan")

    try:
        result = analyze_video_path(dest)
    except Exception as exc:
        raise HTTPException(500, f"rPPG analysis failed: {exc}") from exc
    finally:
        dest.unlink(missing_ok=True)

    data = {
        **result,
        "mode": mode,
        "source": "iphone_web_open_rppg",
        "timestamp": timestamp or int(datetime.now(timezone.utc).timestamp() * 1000),
        "scan_seconds": scan_seconds,
        "fps": fps,
        "preview_bpm": preview_bpm,
        "preview_confidence": preview_confidence,
        "user_id": user_id,
    }
    path = _persist_scan(data)
    saved = enrich_scan(data)
    return {"ok": True, "path": str(path), **saved}


@app.get("/research/REFERENCES.md")
def references():
    path = ROOT / "research" / "REFERENCES.md"
    return FileResponse(path, media_type="text/markdown")


ASSETS_DIR = WEB / "assets"
ICONS_DIR = WEB / "css" / "icons"


def _safe_asset_path(name: str) -> Path:
    """Resolve a single filename under web/assets (no path traversal)."""
    safe = Path(name).name
    if not safe or safe != name:
        raise HTTPException(404, "Asset not found")
    for base in (ASSETS_DIR, ICONS_DIR):
        path = (base / safe).resolve()
        try:
            path.relative_to(base.resolve())
        except ValueError:
            continue
        if path.is_file():
            return path
    raise HTTPException(404, "Asset not found")


@app.get("/assets/{filename}")
def get_asset(filename: str):
    return FileResponse(_safe_asset_path(filename))


@app.on_event("startup")
def _verify_static_assets() -> None:
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    ICONS_DIR.mkdir(parents=True, exist_ok=True)
    required = ("apple-watch.png", "oura-ring.png", "face-scan.png", "face-scan.svg")
    missing = [f for f in required if not (ASSETS_DIR / f).is_file()]
    if missing:
        print(f"WARNING: missing web/assets: {', '.join(missing)}")
    else:
        print(f"Assets OK: {ASSETS_DIR}")


app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")
app.mount("/css", StaticFiles(directory=str(WEB / "css")), name="css")
app.mount("/js", StaticFiles(directory=str(WEB / "js")), name="js")


@app.get("/")
def index():
    return FileResponse(WEB / "index.html")


@app.get("/login.html")
def login_page():
    return FileResponse(WEB / "login.html")


@app.get("/signup.html")
def signup_page():
    return FileResponse(WEB / "signup.html")


if __name__ == "__main__":
    import uvicorn

    ip = _local_ip()
    print("\n=== Hemodynamic Bridge — rPPG server ===")
    print("Method: Remote photoplethysmography (camera, not Watch sensor)")
    print("Engine: open-rppg (FacePhys.rlap) — loads in background on first start")
    print(f"  Laptop:  http://127.0.0.1:8000")
    print(f"  LAN:     http://{ip}:8000  (iPhone may need HTTPS — use ngrok)")
    print("  iPhone:  Safari → allow camera → 30s scan → server analyzes video")
    print("  Docs:    research/REFERENCES.md\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)
