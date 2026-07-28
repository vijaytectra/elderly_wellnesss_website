#!/usr/bin/env python3
"""
Generate WebP versions of the site's oversized raster images.

The home page already ships optimised assets under images/opt/ and
images/home/opt/, but the inner pages still reference the originals --
images/process.png alone is 353K, and about.html pulls ~1.1MB of PNG/JPG.
That bandwidth is what pushes Largest Contentful Paint past 6s on those pages.

For every source image over a size threshold this writes a sibling .webp,
downscaling anything wider than MAX_WIDTH (no page displays an image wider
than roughly that). Originals are kept on disk so <picture> can still offer a
fallback and nothing 404s if a reference is missed.

Usage: python scripts/optimize-images.py [--min-kb 40] [--max-width 1600]
"""
import argparse
import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES = os.path.join(ROOT, "images")
SKIP_DIRS = {"opt"}          # already-optimised trees
EXTS = {".png", ".jpg", ".jpeg"}


def iter_images():
    for dirpath, dirnames, filenames in os.walk(IMAGES):
        # don't descend into already-optimised folders
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if os.path.splitext(fn)[1].lower() in EXTS:
                yield os.path.join(dirpath, fn)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-kb", type=int, default=40)
    ap.add_argument("--max-width", type=int, default=1600)
    ap.add_argument("--quality", type=int, default=82)
    args = ap.parse_args()

    converted = 0
    saved = 0
    skipped_bigger = 0

    for src in sorted(iter_images()):
        size = os.path.getsize(src)
        if size < args.min_kb * 1024:
            continue

        dst = os.path.splitext(src)[0] + ".webp"
        if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
            continue

        try:
            with Image.open(src) as im:
                im.load()
                has_alpha = im.mode in ("RGBA", "LA") or (
                    im.mode == "P" and "transparency" in im.info
                )
                im = im.convert("RGBA" if has_alpha else "RGB")

                if im.width > args.max_width:
                    ratio = args.max_width / im.width
                    im = im.resize(
                        (args.max_width, max(1, round(im.height * ratio))),
                        Image.LANCZOS,
                    )

                im.save(dst, "WEBP", quality=args.quality, method=6)
        except Exception as exc:                      # noqa: BLE001
            print(f"  ! {os.path.relpath(src, ROOT)}: {exc}")
            continue

        new = os.path.getsize(dst)
        # A WebP that came out larger than the source helps nobody.
        if new >= size:
            os.remove(dst)
            skipped_bigger += 1
            continue

        converted += 1
        saved += size - new
        print(
            f"  {os.path.relpath(src, ROOT).replace(os.sep, '/'):58s}"
            f"{size / 1024:7.0f}K -> {new / 1024:6.0f}K"
        )

    print(
        f"\n  {converted} converted, {skipped_bigger} skipped (webp was larger), "
        f"{saved / 1024 / 1024:.2f} MB saved"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
