import os

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Determine relative path to js/analytics.js
    if '/blogs/' in filepath:
        rel_prefix = '../../' if filepath.count('/') >= 3 else '../'
    else:
        rel_prefix = ''

    script_tag = f'<script src="{rel_prefix}js/analytics.js?v=20260817i"></script>'

    if 'js/analytics.js' not in content:
        if '</body>' in content:
            content = content.replace('</body>', f'  {script_tag}\n</body>')
        elif '</head>' in content:
            content = content.replace('</head>', f'  {script_tag}\n</head>')

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected GA4 analytics engine into: {filepath}")

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
