#!/usr/bin/env python3
"""Rebuild blogs/blog-manifest.json from post folders that have a local featured image."""
from __future__ import annotations

import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOGS = ROOT / "blogs"
SKIP = {
    "wp-content", "wp-includes", "wp-admin", "wp-json",
    "category", "tag", "author", "page", "feed", "comments",
}
PRIORITY = {
    "fall-prevention-home-safety-checklist-elderly-chennai": 0,
    "early-signs-of-dementia-in-elderly-parents": 1,
    "post-hospital-recovery-care-at-home-chennai": 2,
    "loneliness-mental-wellbeing-elderly-parents": 3,
    "home-care-vs-assisted-living-chennai": 4,
}


def normalize_image(src: str, post_dir: str) -> str | None:
    if not src:
        return None
    src = src.strip().split("?")[0].split("#")[0]
    if src.startswith("http://") or src.startswith("https://"):
        src = re.sub(r"^https?://(www\.)?theelderlywellness\.com", "", src)
        if src.startswith("http"):
            return None
    while src.startswith("./"):
        src = src[2:]
    if src.startswith("../../"):
        src = "/" + src[6:]
    elif src.startswith("../"):
        rest = src[3:]
        src = "/" + rest if rest.startswith("images/") else "/blogs/" + rest
    elif src.startswith("images/"):
        src = "/" + src
    elif src.startswith("wp-content/"):
        src = "/blogs/" + src
    elif not src.startswith("/"):
        src = f"/blogs/{post_dir}/{src}"
    local = ROOT / src.lstrip("/")
    return src if local.is_file() else None


def extract_image(html: str, slug: str) -> str | None:
    patterns = [
        r'<img[^>]*src="([^"]+)"[^>]*class="[^"]*wp-post-image[^"]*"',
        r'<img[^>]*class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"',
        r'<div class="featured-image"[^>]*>\s*<a[^>]*>\s*<img[^>]*src="([^"]+)"',
        r'<meta property="og:image" content="([^"]+)"',
    ]
    for pat in patterns:
        for m in re.finditer(pat, html, re.I):
            img = normalize_image(m.group(1), slug)
            if img and "logo" not in img.lower():
                return img
    return None


def main() -> None:
    posts = []
    for d in BLOGS.iterdir():
        if not d.is_dir() or d.name in SKIP or d.name.startswith("."):
            continue
        index = d / "index.html"
        if not index.is_file():
            continue
        html = index.read_text(encoding="utf-8", errors="ignore")
        if 'property="og:type" content="article"' not in html and "single-post" not in html:
            continue
        image = extract_image(html, d.name)
        if not image:
            continue
        title_m = re.search(r'<meta property="og:title" content="([^"]*)"', html)
        title = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", title_m.group(1) if title_m else d.name)).strip()
        if not title.endswith("Elderly Wellness"):
            title = f"{title} - Elderly Wellness"
        desc_m = re.search(r'<meta property="og:description" content="([^"]*)"', html)
        desc = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", desc_m.group(1) if desc_m else "")).strip()
        date_m = re.search(r'<meta property="article:published_time" content="([^"]*)"', html)
        if not date_m:
            date_m = re.search(r'<time[^>]+datetime="([^"]+)"', html)
        posts.append({
            "title": title,
            "description": desc[:220],
            "date": date_m.group(1) if date_m else "",
            "link": f"blogs/{d.name}/",
            "slug": d.name,
            "image": image,
        })

    def sort_key(p):
        try:
            ts = datetime.fromisoformat(p["date"].replace("Z", "+00:00")).timestamp()
        except Exception:
            ts = 0
        return (-ts, PRIORITY.get(p["slug"], 99), p["slug"])

    posts.sort(key=sort_key)
    out = BLOGS / "blog-manifest.json"
    out.write_text(json.dumps(posts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(posts)} available posts -> {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
