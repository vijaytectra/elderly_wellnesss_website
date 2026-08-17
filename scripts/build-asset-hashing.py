import os
import re

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # 1. Strip hand-typed legacy query parameters like ?v=5, ?v=2.0, ?v=123.0, ?v=173.0
    content = re.sub(r'(\.(?:png|jpg|jpeg|gif|webp|svg|js|css))\?v=(?:[0-9\.]+|[a-zA-Z0-9]+)', r'\1?v=20260817i', content)

    # 2. Add loading="lazy" to all below-the-fold <img> tags that don't already specify loading
    def add_lazy_loading(match):
        img_tag = match.group(0)
        # Skip hero images, logos, or images already having loading=
        if 'loading=' in img_tag or 'logo' in img_tag.lower() or 'hero' in img_tag.lower() or 'banner' in img_tag.lower():
            return img_tag
        return img_tag.replace('<img ', '<img loading="lazy" ')

    content = re.sub(r'<img[^>]+>', add_lazy_loading, content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Processed asset hashing & lazy loading in: {filepath}")

def main():
    print("Running automated asset hashing & lazy loading build step...")
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                process_html_file(fp)

if __name__ == '__main__':
    main()
