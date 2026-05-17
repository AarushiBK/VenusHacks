"""One-off: make Oura ring PNG with transparent background from product photo."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "web" / "assets"
SRC = Path(
    r"C:\Users\aarab\.cursor\projects\c-Users-aarab-New-folder-VenusHacks\assets"
    r"\c__Users_aarab_AppData_Roaming_Cursor_User_workspaceStorage_1d40cc2a8fb964b8a6f383b105c6f784_images_image-86a35bd6-155c-48a3-b4b3-ba1f961dee0e.png"
)


def remove_near_white(im: Image.Image, threshold: int = 235) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                px[x, y] = (r, g, b, 0)
    return im


def trim_transparent(im: Image.Image, pad: int = 8) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.width, x1 + pad)
    y1 = min(im.height, y1 + pad)
    return im.crop((x0, y0, x1, y1))


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    if not SRC.is_file():
        raise SystemExit(f"Source not found: {SRC}")

    ring = trim_transparent(remove_near_white(Image.open(SRC)))
    out = ASSETS / "oura-ring.png"
    ring.save(out, optimize=True)
    print(f"Wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
