import os
import re

def process_html(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # 1. Fix mixed capitalization Age MEETS ASSISTANCE in index.html
    content = content.replace(
        '<span class="hero-serif">MEETS</span>',
        '<span class="hero-serif">Meets</span>'
    )
    content = content.replace(
        '<span class="hero-serif hero-line2">ASSISTANCE.</span>',
        '<span class="hero-serif hero-line2">Assistance.</span>'
    )

    # 2. Inject css/theme-tokens.css into <head> if not already linked
    if 'css/theme-tokens.css' not in content:
        # Determine relative path prefix for blogs/ or nested pages
        if '/blogs/' in filepath:
            rel_prefix = '../../' if filepath.count('/') >= 3 else '../'
        else:
            rel_prefix = ''
        
        token_link = f'<link rel="stylesheet" href="{rel_prefix}css/theme-tokens.css?v=20260817i" />'
        
        if '</head>' in content:
            content = content.replace('</head>', f'  {token_link}\n</head>')

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Applied shared theme-tokens link & title case in: {filepath}")

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                process_html(fp)

if __name__ == '__main__':
    main()
