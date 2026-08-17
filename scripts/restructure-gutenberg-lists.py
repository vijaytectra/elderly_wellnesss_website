import os
import re

def fix_split_ol_in_content(html_content):
    # Regex pattern to find consecutive split <ol> tags separated by <p> tags
    # Example: <ol class="wp-block-list">\n<li><strong>Breakfast:</strong></li>\n</ol>\n\n<p>text</p>\n\n<ol start="2" class="wp-block-list">...
    
    # First, let's find blocks of <ol ...> <li>...</li> </ol> followed by <p>...</p> followed by <ol start="2"...
    # We will combine them into a single <ol class="ew-blog-ordered-list">
    
    def replacer(match):
        full_match = match.group(0)
        # Parse all items out of full_match
        items = re.findall(r'<ol[^>]*>\s*<li>([\s\S]*?)</li>\s*</ol>\s*<p>([\s\S]*?)</p>', full_match)
        if not items:
            return full_match
        
        res = ['<ol class="ew-blog-ordered-list">']
        for title, ptext in items:
            res.append(f'  <li>\n    {title.strip()}\n    <p>{ptext.strip()}</p>\n  </li>')
        res.append('</ol>')
        return '\n'.join(res)

    pattern = r'(?:<ol[^>]*>\s*<li>[\s\S]*?</li>\s*</ol>\s*<p>[\s\S]*?</p>\s*)+'
    html_content = re.sub(pattern, replacer, html_content)
    return html_content

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content
    new_content = fix_split_ol_in_content(content)

    if new_content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Restructured split <ol> lists in: {filepath}")

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                process_file(fp)

if __name__ == '__main__':
    main()
