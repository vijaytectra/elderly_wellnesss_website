import os
import re

def clean_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Split content into CTA blocks vs Non-CTA blocks so we ONLY keep inline colors inside CTA blocks
    parts = re.split(r'(<div class="ew-blog-cta[\s\S]*?</div>\s*</div>)', content)
    new_parts = []
    for p in parts:
        if p.startswith('<div class="ew-blog-cta'):
            new_parts.append(p)
        else:
            # Strip style="color: #f1f5f9 !important;" from non-CTA HTML
            cleaned = re.sub(r'\s*style="color:\s*#f1f5f9\s*!important;"', '', p)
            cleaned = re.sub(r'\s*style="color:\s*#ffffff\s*!important;"', '', cleaned)
            new_parts.append(cleaned)

    content = ''.join(new_parts)

    # Bump cache version to v=20260817g
    content = re.sub(r'blog-pages\.css\?v=[^\s"\'\>]+', 'blog-pages.css?v=20260817g', content)
    content = re.sub(r'style\.css\?v=[^\s"\'\>]+', 'style.css?v=20260817g', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned bad inline styles in: {filepath}")

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                clean_html_file(fp)

if __name__ == '__main__':
    main()
