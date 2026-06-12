#!/usr/bin/env python3
"""Restore missing blog upload images not captured in the Wayback archive."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
from pathlib import Path

SITE = Path(__file__).resolve().parent
UPLOADS = SITE / "blogs/wp-content/uploads"
STASH = SITE / "._blog_uploads"

# Homepage thumbnails archived under images/blogs/ -> wp upload paths
WEBP_SOURCES: dict[str, str] = {
    "2025/04/How-to-Increase-Sodium-Levels-in-Elderly-at-Home.png": "images/blogs/sodium-level.webp",
    "2025/04/What-is-Caregivers.jpg": "images/blogs/caregivers.webp",
    "2025/04/elderly-wellness-works.png": "images/blogs/elderly-wellness-works.webp",
    "2025/04/Journey-of-Eldery.jpeg": "images/blogs/living-care2.webp",
    "2025/12/exercise-for-seniors-over-75.png": "images/blogs/living-care2.webp",
}

# Copy an existing archived April upload, optionally resized
ARCHIVE_COPIES: dict[str, tuple[str, tuple[int, int] | None]] = {
    "2025/05/Age-Related-Health-Conditions.png": ("2025/04/What-is-Elderly.png", (1200, 628)),
    "2025/05/Crafting-Nutritious-Diets-for-Senior-Health.png": (
        "2025/04/How-Proper-Meals-and-Medication-Assistance-Improve-Senior-Health-and-Well-Being-1.png",
        (1200, 628),
    ),
    "2025/06/Family-Involvement-for-Senior-Citizens.png": (
        "2025/04/Lonliness-and-Depression-in-Older-Adults.png",
        (1200, 628),
    ),
    "2025/06/Seniors-Regular-Checkups.png": (
        "2025/04/Personal-Hygiene-and-Diaper-Change-Services-for-Senior-Citizens.png",
        (1200, 628),
    ),
    "2025/09/senior-workout-indian.png": ("2025/04/Activities-of-Daily-Living.png", (1200, 628)),
    "2025/09/Arthritis-for-Senior-Citizens.png": ("2025/04/Activities-of-Daily-Living.png", (1200, 628)),
    "2025/09/Cardiovascular-Diseases-in-Senior-Citizens.png": ("2025/04/What-is-Elderly.png", (1200, 628)),
    "2025/09/Osteoporosis-in-Senior-Citizens-.png": (
        "2025/04/ADLs-What-Are-Activities-of-Daily-Living-How-Can-ADLs-Help-Your-Parents-1.png",
        (1200, 628),
    ),
    "2025/12/Caregiver-for-seniors-in-Chennai-assisting-elderly-parent-at-home.png": (
        "2025/04/Elderly-Care-Services-in-Chennai.png",
        (848, 444),
    ),
}

EXERCISE_INLINE_SOURCES = [
    "2025/04/Activities-of-Daily-Living.png",
    "2025/04/ADLs-What-Are-Activities-of-Daily-Living-How-Can-ADLs-Help-Your-Parents-1.png",
    "2025/04/What-is-Elderly.png",
    "2025/04/Home-Modifications-for-Elder-Safety.png",
    "2025/04/How-Proper-Meals-and-Medication-Assistance-Improve-Senior-Health-and-Well-Being-1.png",
    "2025/04/Personal-Hygiene-and-Diaper-Change-Services-for-Senior-Citizens.png",
    "2025/04/alzheimers-and-dementia-care-services-for-senior-citizens.png",
    "2025/04/essential-grooming-hygiene-tips-elderly.png",
    "2025/04/Lonliness-and-Depression-in-Older-Adults.png",
    "2025/04/Elderly-Care-Services-in-Chennai.png",
    "2025/04/Elderly-Care-Services-in-Adyar.png",
    "2025/04/Elderly-Care-Services-in-Alandur.png",
    "2025/04/Elderly-Care-Services-in-Alapakkam.png",
    "2025/04/Elderly-Care-Services-in-Alwarthirunagar.png",
    "2025/04/Elderly-Care-Services-in-Ambattur.png",
]

FEATURED_SIZES: dict[str, tuple[int, int]] = {
    "2025/04/How-to-Increase-Sodium-Levels-in-Elderly-at-Home.png": (1200, 628),
    "2025/04/What-is-Caregivers.jpg": (1200, 628),
    "2025/04/elderly-wellness-works.png": (1200, 628),
    "2025/04/Journey-of-Eldery.jpeg": (1260, 800),
    "2025/12/exercise-for-seniors-over-75.png": (848, 444),
}


def run_sips(args: list[str]) -> None:
    subprocess.run(["sips", *args], check=True, capture_output=True)


def resize_image(path: Path, size: tuple[int, int]) -> None:
    width, height = size
    run_sips(["-z", str(height), str(width), str(path)])


def convert_webp(src: Path, dest: Path, size: tuple[int, int] | None) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.suffix.lower() in {".jpg", ".jpeg"}:
        run_sips(["-s", "format", "jpeg", str(src), "--out", str(dest)])
    else:
        run_sips(["-s", "format", "png", str(src), "--out", str(dest)])
    if size:
        resize_image(dest, size)


def copy_archive_image(src_rel: str, dest_rel: str, size: tuple[int, int] | None) -> None:
    src = UPLOADS / src_rel
    dest = UPLOADS / dest_rel
    if not src.exists():
        raise FileNotFoundError(src)
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    if size:
        resize_image(dest, size)


def collect_referenced_uploads() -> set[str]:
    refs: set[str] = set()
    for html in SITE.rglob("blogs/**/*.html"):
        text = html.read_text(encoding="utf-8", errors="ignore")
        for match in re.finditer(
            r"wp-content/uploads/([^\"'\s>)]+?\.(?:png|jpe?g|webp|gif))",
            text,
            re.IGNORECASE,
        ):
            refs.add(match.group(1))
    return refs


def restore_missing_images() -> list[str]:
    restored: list[str] = []

    for dest_rel, src_rel in WEBP_SOURCES.items():
        dest = UPLOADS / dest_rel
        if dest.exists() and dest.stat().st_size > 5000:
            continue
        src = SITE / src_rel
        if not src.exists():
            print(f"SKIP webp source missing: {src_rel}")
            continue
        convert_webp(src, dest, FEATURED_SIZES.get(dest_rel))
        restored.append(dest_rel)
        print(f"OK: {dest_rel} <- {src_rel}")

    for dest_rel, (src_rel, size) in ARCHIVE_COPIES.items():
        dest = UPLOADS / dest_rel
        if dest.exists() and dest.stat().st_size > 5000:
            continue
        try:
            copy_archive_image(src_rel, dest_rel, size)
        except FileNotFoundError:
            print(f"SKIP archive copy source missing: {src_rel}")
            continue
        restored.append(dest_rel)
        print(f"OK: {dest_rel} <- {src_rel}")

    for idx in range(1, 16):
        dest_rel = f"2025/12/{idx}.png"
        dest = UPLOADS / dest_rel
        if dest.exists() and dest.stat().st_size > 5000:
            continue
        src_rel = EXERCISE_INLINE_SOURCES[idx - 1]
        try:
            copy_archive_image(src_rel, dest_rel, (1080, 1080))
        except FileNotFoundError:
            print(f"SKIP exercise image source missing: {src_rel}")
            continue
        restored.append(dest_rel)
        print(f"OK: {dest_rel} <- {src_rel}")

    return restored


def stash_uploads() -> None:
    if not UPLOADS.exists():
        return
    STASH.mkdir(exist_ok=True)
    for path in UPLOADS.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(UPLOADS)
        dest = STASH / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, dest)


def restore_stashed_uploads() -> None:
    if not STASH.exists():
        return
    for path in STASH.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(STASH)
        dest = UPLOADS / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists() or dest.stat().st_size < path.stat().st_size:
            shutil.copy2(path, dest)


def extract_featured_image(html: str, page: str) -> str:
    for pattern in (
        r'<meta property="og:image" content="([^"]+)"',
        r'class="[^"]*wp-post-image[^"]*"[^>]*src="([^"]+)"',
    ):
        match = re.search(pattern, html, re.IGNORECASE)
        if match:
            src = match.group(1).split("?")[0]
            if src.startswith("../"):
                src = "blogs/" + src[3:]
            elif src.startswith("wp-content/"):
                src = "blogs/" + src
            elif not src.startswith("blogs/"):
                src = str(Path(page).parent / src)
            return "/" + src.replace("//", "/").lstrip("/")
    return ""


def update_blog_manifest() -> None:
    manifest_path = SITE / "blogs/blog-manifest.json"
    if not manifest_path.exists():
        return
    posts = json.loads(manifest_path.read_text(encoding="utf-8"))
    for post in posts:
        page = post["link"].lstrip("/")
        html_path = SITE / page
        if html_path.exists():
            post["image"] = extract_featured_image(html_path.read_text(encoding="utf-8", errors="ignore"), page)
    manifest_path.write_text(json.dumps(posts, indent=2), encoding="utf-8")
    print(f"OK: updated blog-manifest.json ({len(posts)} posts)")


def verify_uploads() -> tuple[int, int]:
    refs = collect_referenced_uploads()
    missing = [rel for rel in sorted(refs) if not (UPLOADS / rel).exists()]
    return len(refs), len(missing)


def main() -> None:
    restore_stashed_uploads()
    restored = restore_missing_images()
    stash_uploads()
    update_blog_manifest()
    total, missing = verify_uploads()
    print(f"\nBlog uploads: {total} referenced, {missing} missing, {len(restored)} restored this run")


if __name__ == "__main__":
    main()
