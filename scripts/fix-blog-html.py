#!/usr/bin/env python3
"""Fix static blog HTML: TOC anchor links and Wayback Machine artifacts."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOGS = ROOT / "blogs"


def toc_urls_from_schema(html: str) -> list[str]:
    match = re.search(
        r'<script type="application/ld\+json" class="rank-math-schema">(.*?)</script>',
        html,
        re.DOTALL,
    )
    if not match:
        return []

    try:
        data = json.loads(match.group(1))
    except json.JSONDecodeError:
        return []

    urls: list[str] = []

    def walk(node: object) -> None:
        if isinstance(node, dict):
            if (
                node.get("@type") == "SiteNavigationElement"
                and isinstance(node.get("url"), str)
                and node["url"].startswith("#")
            ):
                urls.append(node["url"])
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(data.get("@graph", []))
    return urls


def fix_toc_block(html: str) -> tuple[str, bool]:
    urls = toc_urls_from_schema(html)
    if not urls:
        return html, False

    toc_match = re.search(
        r'(<div class="wp-block-rank-math-toc-block"[^>]*>.*?</div>)',
        html,
        re.DOTALL,
    )
    if not toc_match:
        return html, False

    toc = toc_match.group(1)
    broken = re.findall(r'<a href="(?:\.\./)?index\.html"', toc)
    if not broken:
        return html, False

    if len(broken) != len(urls):
        return html, False

    index = 0

    def replace_href(_: re.Match[str]) -> str:
        nonlocal index
        href = f'<a href="{urls[index]}"'
        index += 1
        return href

    fixed_toc = re.sub(r'<a href="(?:\.\./)?index\.html"', replace_href, toc)
    return html.replace(toc, fixed_toc, 1), True


def remove_wayback_artifacts(html: str) -> tuple[str, bool]:
    changed = False
    new_html, count = re.subn(
        r'<script type="module">var _____WB\$wombat[\s\S]*?</script>\s*',
        "",
        html,
    )
    if count:
        html = new_html
        changed = True

    new_html, count = re.subn(
        r"https://web\.archive\.org/web/\d+/https://theelderlywellness\.com/blogs/",
        "../",
        html,
    )
    if count:
        html = new_html
        changed = True

    new_html, count = re.subn(
        r"https:\\/\\/web\.archive\.org\\/web\\/\d+\\/https:\\/\\/theelderlywellness\.com\\/blogs\\/",
        r"..\\/",
        html,
    )
    if count:
        html = new_html
        changed = True

    return html, changed


def process_file(path: Path) -> list[str]:
    notes: list[str] = []
    html = path.read_text(encoding="utf-8")
    original = html

    html, toc_fixed = fix_toc_block(html)
    if toc_fixed:
        notes.append("toc")

    html, wayback_fixed = remove_wayback_artifacts(html)
    if wayback_fixed:
        notes.append("wayback")

    if html != original:
        path.write_text(html, encoding="utf-8")

    return notes


def main() -> None:
    files = sorted(BLOGS.glob("**/index.html"))
    files = [f for f in files if "wp-content" not in f.parts and "wp-includes" not in f.parts]

    toc_count = 0
    wayback_count = 0

    for path in files:
        notes = process_file(path)
        if notes:
            print(f"{path.relative_to(ROOT)}: {', '.join(notes)}")
        if "toc" in notes:
            toc_count += 1
        if "wayback" in notes:
            wayback_count += 1

    print(f"\nDone. TOC fixed: {toc_count}, Wayback cleaned: {wayback_count}")


if __name__ == "__main__":
    main()
