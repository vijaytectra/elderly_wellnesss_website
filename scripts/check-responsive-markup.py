#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.rglob("*.html"))
errors = []

for path in HTML_FILES:
    text = path.read_text(encoding="utf-8")
    rel = path.relative_to(ROOT)

    if not re.search(
        r'<meta\s+name=["\']viewport["\']\s+content=["\'][^"\']*width=device-width',
        text,
        re.IGNORECASE,
    ):
        errors.append(f"{rel}: missing responsive viewport meta")

    if rel.parts and rel.parts[0] == "blogs":
        direct = len(re.findall(r'href=["\'][^"\']*css/blog-pages\.css["\']', text))
        if direct != 1:
            errors.append(f"{rel}: expected one direct blog-pages.css link, found {direct}")

if errors:
    print("\n".join(errors))
    sys.exit(1)

print(f"Responsive markup checks passed for {len(HTML_FILES)} HTML files.")
