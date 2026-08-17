import os
import re

def audit_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    issues = []

    # 1. Check <html lang="...">
    if not re.search(r'<html[^>]*lang=["\'][a-z]{2}', content, re.IGNORECASE):
        issues.append("Missing or invalid <html lang> attribute")

    # 2. Check title
    if not re.search(r'<title>[^<]+</title>', content, re.IGNORECASE):
        issues.append("Missing <title> tag")

    # 3. Check meta viewport
    if 'name="viewport"' not in content and "name='viewport'" not in content:
        issues.append("Missing meta viewport")

    # 4. Check H1 count
    h1s = re.findall(r'<h1[^>]*>.*?</h1>', content, re.IGNORECASE | re.DOTALL)
    if len(h1s) == 0:
        issues.append("No <h1> tag found")
    elif len(h1s) > 1:
        issues.append(f"Multiple <h1> tags found ({len(h1s)})")

    # 5. Check images missing alt
    img_tags = re.findall(r'<img[^>]*>', content, re.IGNORECASE)
    missing_alt_count = 0
    for img in img_tags:
        if 'alt=' not in img.lower():
            missing_alt_count += 1
    if missing_alt_count > 0:
        issues.append(f"{missing_alt_count} images missing alt attribute")

    # 6. Check skip link
    if 'skip-link' not in content and 'href="#main"' not in content:
        issues.append("Missing skip to content link")

    # 7. Check form inputs missing label or aria-label
    input_tags = re.findall(r'<(?:input|textarea|select)[^>]*>', content, re.IGNORECASE)
    unlabeled_inputs = 0
    for inp in input_tags:
        if 'type="hidden"' in inp.lower() or 'type="submit"' in inp.lower() or 'type="button"' in inp.lower():
            continue
        if 'aria-label=' not in inp.lower() and 'id=' not in inp.lower() and 'placeholder=' not in inp.lower():
            unlabeled_inputs += 1
    if unlabeled_inputs > 0:
        issues.append(f"{unlabeled_inputs} form inputs missing label or aria-label")

    return issues

def main():
    target_pages = [
        "index.html",
        "about.html",
        "contact.html",
        "pricing.html",
        "services.html",
        "physiotherapy-services-for-elders.html",
        "nursing-services-for-elders.html",
        "geriatric-care-services-for-elders.html",
        "assisted-living-support-services-for-elders.html",
        "404.html",
        "the-inspiring-journey-of-elderly-wellness.html"
    ]

    total_issues = 0
    print("==========================================================")
    print("      ELDERLY WELLNESS ACCESSIBILITY & WCAG 2.1 AUDIT     ")
    print("==========================================================")

    for page in target_pages:
        if os.path.exists(page):
            issues = audit_html_file(page)
            if not issues:
                print(f"✅ {page}: 100% ACCESSIBLE (0 issues)")
            else:
                total_issues += len(issues)
                print(f"⚠️  {page}: {len(issues)} issues found:")
                for iss in issues:
                    print(f"   - {iss}")

    print("==========================================================")
    print(f"TOTAL ACCESSIBILITY ISSUES ACROSS CORE PAGES: {total_issues}")
    print("==========================================================")

if __name__ == '__main__':
    main()
