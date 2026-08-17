import os
import re

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read()
                orig = content
                content = re.sub(r'blog-pages\.css\?v=[^\s"\'\>]+', 'blog-pages.css?v=20260817h', content)
                content = re.sub(r'style\.css\?v=[^\s"\'\>]+', 'style.css?v=20260817h', content)
                if content != orig:
                    with open(fp, 'w', encoding='utf-8') as file:
                        file.write(content)

    print("Successfully bumped cache version to v=20260817h in all HTML files.")

if __name__ == '__main__':
    main()
