import os
import re

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    imgs = re.findall(r'<img[^>]+>', content, re.IGNORECASE)
    broken_in_file = []

    for img in imgs:
        src_match = re.search(r'src=["\']([^"\']*)["\']', img, re.IGNORECASE)
        if not src_match:
            broken_in_file.append((img, "No src attribute"))
            continue
        src = src_match.group(1).strip()
        if not src or src == ' ' or src == '#':
            broken_in_file.append((img, "Empty src"))
        elif not src.startswith(('http://', 'https://', 'data:')):
            clean_src = src.split('?')[0].split('#')[0]
            target_path = os.path.normpath(os.path.join(os.path.dirname(filepath), clean_src))
            if not os.path.exists(target_path):
                broken_in_file.append((img, f"File missing: {clean_src}"))

    return broken_in_file

def main():
    total_broken = 0
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                broken = check_file(fp)
                if broken:
                    total_broken += len(broken)
                    print(f"\n[BROKEN IMAGES] {fp}:")
                    for b_img, reason in broken:
                        print(f"  - {reason} | {b_img[:80]}")

    print(f"\nTotal broken images across entire site: {total_broken}")

if __name__ == '__main__':
    main()
