#!/usr/bin/env node
import os
import glob
import re

def truncate_text(text, max_len=135):
    # Strip existing trailing ellipsis or whitespace
    clean = re.sub(r'[\s\.\&\#8230\;]+$', '', text).strip()
    if len(clean) <= max_len:
        return clean
    # Truncate to max_len at nearest word boundary
    truncated = clean[:max_len]
    if ' ' in truncated:
        truncated = truncated.rsplit(' ', 1)[0]
    return truncated.rstrip(',;:-. ')

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    modified = False

    # Regex matching <p> inside entry-summary containing a read-more link
    # Or matching paragraph with read-more link
    def replace_p(match):
        nonlocal modified
        full_p = match.group(0)
        p_attrs = match.group(1) or ""
        inner = match.group(2)
        
        # Match text before read-more link
        rm_match = re.search(r'^(.*?)(?:\s*(?:\&\#8230;|\.\.\.|\u2026)?\s*)?(<a\s+[^>]*class=["\'][^"\']*read-more[^"\']*["\'][^>]*>.*?</a>)', inner, re.DOTALL | re.IGNORECASE)
        if not rm_match:
            return full_p

        text_part = rm_match.group(1)
        link_part = rm_match.group(2)

        # Clean text_part tags if any
        plain_text = re.sub(r'<[^>]+>', '', text_part).strip()
        if len(plain_text) > 135:
            new_text = truncate_text(plain_text, 135)
            new_p = f'<p{p_attrs}>{new_text} &#8230; {link_part}</p>'
            modified = True
            return new_p
        
        return full_p

    # Pattern for <p> tags containing read-more link
    pattern = re.compile(r'<p([^>]*)>(.*?<a\s+[^>]*class=["\'][^"\']*read-more[^"\']*["\'][^>]*>.*?</a>.*?)</p>', re.DOTALL | re.IGNORECASE)
    new_content = pattern.sub(replace_p, content)

    if modified and new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    html_files = []
    
    for dirpath, _, filenames in os.walk(root_dir):
        # Skip node_modules or .git
        if 'node_modules' in dirpath or '.git' in dirpath or '.superpowers' in dirpath:
            continue
        for f in filenames:
            if f.endswith('.html'):
                html_files.append(os.path.join(dirpath, f))

    count = 0
    for hf in html_files:
        if process_html_file(hf):
            count += 1
            print(f"Truncated blog descriptions in: {os.path.relpath(hf, root_dir)}")

    print(f"\nDone! Processed and updated {count} HTML files.")

if __name__ == '__main__':
    main()
