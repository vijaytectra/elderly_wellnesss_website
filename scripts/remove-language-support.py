import os
import shutil
import re

def remove_lang_from_html(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Regex to match the language switcher list item or container
    # 1. Match <li class="nav-item">\s*<div class="ew-lang-switch"[\s\S]*?<\/div>\s*<\/li>
    content = re.sub(r'<li[^>]*>\s*<div class="ew-lang-switch"[\s\S]*?</div>\s*</li>', '', content)
    # 2. Match standalone <div class="ew-lang-switch"[\s\S]*?</div>
    content = re.sub(r'<div class="ew-lang-switch"[\s\S]*?</div>', '', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed language switcher from: {filepath}")

def main():
    # 1. Remove language switcher from all HTML files
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                remove_lang_from_html(os.path.join(root, f))

    # 2. Remove ta directory if it exists
    if os.path.exists('ta'):
        shutil.rmtree('ta')
        print("Removed ta directory completely.")

    # 3. Clean up CSS files containing ew-lang-switch
    css_files = ['css/style.css', 'css/ew-a11y.css', 'css/blog-pages.css']
    for css_path in css_files:
        if os.path.exists(css_path):
            with open(css_path, 'r', encoding='utf-8', errors='ignore') as f:
                css_content = f.read()
            cleaned_css = re.sub(r'/\*[\s\S]*?LANGUAGE SELECTOR[\s\S]*?\*/[\s\S]*?(\n\n|\Z)', '', css_content, flags=re.IGNORECASE)
            cleaned_css = re.sub(r'\.ew-lang-switch[\s\S]*?\}', '', cleaned_css)
            cleaned_css = re.sub(r'\.ew-lang-btn[\s\S]*?\}', '', cleaned_css)
            cleaned_css = re.sub(r'\.ew-lang-divider[\s\S]*?\}', '', cleaned_css)
            if cleaned_css != css_content:
                with open(css_path, 'w', encoding='utf-8') as f:
                    f.write(cleaned_css)
                print(f"Cleaned language CSS from: {css_path}")

if __name__ == '__main__':
    main()
