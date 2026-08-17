#!/usr/bin/env python3
import os
import re

workspace_dir = "/Users/kaushikganesh/Desktop/Elderly Wellness"

# 1. Remove pricing.html file from root and any subdirectories
removed_files = []
for root, dirs, files in os.walk(workspace_dir):
    for f in files:
        if f == "pricing.html":
            full_path = os.path.join(root, f)
            try:
                os.remove(full_path)
                removed_files.append(full_path)
            except Exception as e:
                print(f"Error removing {full_path}: {e}")

print(f"Deleted {len(removed_files)} pricing.html files.")

# 2. Regex patterns to remove Pricing nav items and service-pricing-teaser blocks
nav_pricing_pattern = re.compile(
    r'<li\s+class="nav-item">\s*<a\s+class="nav-link[^"]*"\s+href="[^"]*pricing\.html">Pricing</a>\s*</li>\n?',
    re.IGNORECASE
)

service_pricing_teaser_pattern = re.compile(
    r'<div\s+class="service-pricing-teaser"[\s\S]*?</div>\s*\n?',
    re.IGNORECASE
)

# 3. Process all HTML files
modified_count = 0
for root, dirs, files in os.walk(workspace_dir):
    for f in files:
        if f.endswith(".html"):
            file_path = os.path.join(root, f)
            with open(file_path, "r", encoding="utf-8", errors="ignore") as fh:
                content = fh.read()

            new_content = content
            new_content = nav_pricing_pattern.sub('', new_content)
            new_content = service_pricing_teaser_pattern.sub('', new_content)

            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as fh:
                    fh.write(new_content)
                modified_count += 1

print(f"Updated {modified_count} HTML files to remove Pricing links and pricing teaser sections.")

# 4. Update sitemap.xml to remove pricing.html url entry
sitemap_path = os.path.join(workspace_dir, "sitemap.xml")
if os.path.exists(sitemap_path):
    with open(sitemap_path, "r", encoding="utf-8", errors="ignore") as fh:
        sitemap = fh.read()
    
    new_sitemap = re.sub(r'<url>\s*<loc>https?://[^<]*pricing\.html</loc>[\s\S]*?</url>\s*', '', sitemap, flags=re.IGNORECASE)
    if new_sitemap != sitemap:
        with open(sitemap_path, "w", encoding="utf-8") as fh:
            fh.write(new_sitemap)
        print("Removed pricing.html from sitemap.xml")

# 5. Update scripts/run-full-accessibility-audit.py
audit_script_path = os.path.join(workspace_dir, "scripts", "run-full-accessibility-audit.py")
if os.path.exists(audit_script_path):
    with open(audit_script_path, "r", encoding="utf-8") as fh:
        audit_code = fh.read()
    
    new_audit_code = re.sub(r'\s*"pricing\.html",?', '', audit_code)
    if new_audit_code != audit_code:
        with open(audit_script_path, "w", encoding="utf-8") as fh:
            fh.write(new_audit_code)
        print("Removed pricing.html from run-full-accessibility-audit.py")
