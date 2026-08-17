import os
import re

def fix_images_in_content(content):
    # 1. Our Value Section Images
    content = re.sub(
        r'<img[^>]*alt="Compassionate Senior Care Value"[^>]*>',
        '<img src="images/ourvalue_1.png" alt="Compassionate Senior Care Value"/>',
        content
    )
    content = re.sub(
        r'<img[^>]*alt="Transparent Slab Pricing Value"[^>]*>',
        '<img src="images/ourvalue_2.png" alt="Transparent Slab Pricing Value"/>',
        content
    )
    content = re.sub(
        r'<img[^>]*alt="Tech-Enabled Care Platform Value"[^>]*>',
        '<img src="images/ourvalue_3.png" alt="Tech-Enabled Care Platform Value"/>',
        content
    )

    # 2. How it works steps
    content = re.sub(
        r'<img[^>]*alt="Step 1: Download Elderly Care Plus App"[^>]*>',
        '<img src="images/howstep1.png" alt="Step 1: Download Elderly Care Plus App"/>',
        content
    )
    content = re.sub(
        r'<img[^>]*alt="Step 2: Sign up for an account"[^>]*>',
        '<img src="images/howstep2.png" alt="Step 2: Sign up for an account"/>',
        content
    )
    content = re.sub(
        r'<img[^>]*alt="Step 3: Select senior care service in the app"[^>]*>',
        '<img src="images/howstep3.png" alt="Step 3: Select senior care service in the app"/>',
        content
    )

    # 3. Generic broken <img src=" "> or <img src="">
    # Map by alt text or sensible defaults
    def img_replacer(match):
        img_tag = match.group(0)
        if 'src="images/' in img_tag or 'src="../../images/' in img_tag or 'src="http' in img_tag:
            return img_tag
        if 'ourvalue_1' in img_tag or 'Skilled' in img_tag or 'Compassionate' in img_tag:
            return '<img src="images/ourvalue_1.png" alt="Our Value 1"/>'
        if 'ourvalue_2' in img_tag or 'Creative' in img_tag or 'Transparent' in img_tag:
            return '<img src="images/ourvalue_2.png" alt="Our Value 2"/>'
        if 'ourvalue_3' in img_tag or 'Growth' in img_tag or 'Tech' in img_tag:
            return '<img src="images/ourvalue_3.png" alt="Our Value 3"/>'
        if 'step1' in img_tag.lower() or 'step 1' in img_tag.lower():
            return '<img src="images/howstep1.png" alt="Step 1"/>'
        if 'step2' in img_tag.lower() or 'step 2' in img_tag.lower():
            return '<img src="images/howstep2.png" alt="Step 2"/>'
        if 'step3' in img_tag.lower() or 'step 3' in img_tag.lower():
            return '<img src="images/howstep3.png" alt="Step 3"/>'
        return img_tag

    content = re.sub(r'<img[^>]*src=["\']\s*["\'][^>]*>', img_replacer, content)
    return content

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content
    content = fix_images_in_content(content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Restored broken image sources in: {filepath}")

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                process_file(fp)

if __name__ == '__main__':
    main()
