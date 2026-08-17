import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content
    rel_prefix = "../" if "/blogs/" in filepath or "/chennai/" in filepath else ""
    if "/blogs/" in filepath and filepath.count("/") >= 2:
        rel_prefix = "../../"

    # Fix services.html hero/overview image
    if "services.html" in filepath and not filepath.startswith("blogs/"):
        content = re.sub(
            r'<img\s+src=["\']\s*["\']\s+alt=["\']Elderly care professional supporting senior at home["\']',
            f'<img src="{rel_prefix}images/services/1.png" alt="Elderly care professional supporting senior at home"',
            content
        )

    # Fix investors.html unique section broken images
    if "investors.html" in filepath:
        content = re.sub(r'<img\s+src=["\']\s*["\']\s+alt=["\']Verified Caregivers Advantage["\']', f'<img src="images/feature1a.png" alt="Verified Caregivers Advantage"', content)
        content = re.sub(r'<img\s+src=["\']\s*["\']\s+alt=["\']2-Hour Replacement Guarantee["\']', f'<img src="images/feature2a.png" alt="2-Hour Replacement Guarantee"', content)
        content = re.sub(r'<img\s+src=["\']\s*["\']\s+alt=["\']Real-Time Vitals Tracking["\']', f'<img src="images/feature3a.png" alt="Real-Time Vitals Tracking"', content)
        content = re.sub(r'<img\s+src=["\']\s*["\']\s+alt=["\']Dedicated Care Manager Support["\']', f'<img src="images/feature1a.png" alt="Dedicated Care Manager Support"', content)
        content = re.sub(r'<img\s+src=["\']\s*["\']\s+alt=["\']Flexible Shift Options["\']', f'<img src="images/feature2a.png" alt="Flexible Shift Options"', content)
        content = re.sub(r'<img\s+src=["\']\s*["\']\s+alt=["\']Elderly Academy EACH Certified["\']', f'<img src="images/feature3a.png" alt="Elderly Academy EACH Certified"', content)
        content = re.sub(r'<img\s+src=["\']\s*["\']\s+alt=["\']No Lock-In Contract Advantage["\']', f'<img src="images/feature1a.png" alt="No Lock-In Contract Advantage"', content)

    # Fix typos in blog image extensions (e.g. .webp.html)
    content = content.replace("bath2.webp.html", "bath1.png")
    content = content.replace("living-care3.webp.html", "living-care2.webp")

    # Fix missing Journey-of-Elderly-Wellness.jpeg path references
    content = re.sub(r'src=["\']([^"\']*)/wp-content/uploads/2025/04/Journey-of-Elderly-Wellness\.jpeg["\']', f'src="{rel_prefix}images/blogs/opt/senior-workout-indian.jpg"', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed image references in: {filepath}")

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fix_file(os.path.join(root, f))

if __name__ == '__main__':
    main()
