import os
import re

DISCLAIMER_HTML = '''
<!-- Medical Disclaimer Box -->
<div class="ew-medical-disclaimer">
  <div class="ew-disclaimer-icon"><i class="icofont-info-circle"></i></div>
  <div class="ew-disclaimer-text">
    <p><strong>Medical Disclaimer:</strong> This article is general information and is not medical advice. Please consult a doctor about your parent's specific condition.</p>
  </div>
</div>
'''

LIST_COUNTER_CSS = '''

/* ==========================================================================
   PERFECT NATIVE ORDERED LIST NUMBERING FIX (1, 2, 3, 4 SEQUENTIAL)
   ========================================================================== */
ol,
.entry-content ol,
article ol,
.wp-block-list {
  list-style-type: decimal !important;
  padding-left: 24px !important;
  margin-top: 16px !important;
  margin-bottom: 20px !important;
}

ol > li,
.entry-content ol > li,
article ol > li,
.wp-block-list li {
  display: list-item !important;
  list-style-type: decimal !important;
  margin-bottom: 14px !important;
  padding-left: 6px !important;
}

ol > li::before,
.entry-content ol > li::before,
article ol > li::before,
.wp-block-list li::before {
  content: none !important; /* Remove broken pseudo-element counters that force 1. on every item */
}

ol > li p,
.entry-content ol > li p,
article ol > li p {
  margin-top: 6px !important;
  margin-bottom: 0 !important;
}
'''

def convert_split_ol_in_html(html_content):
    # Regex to find split Gutenberg <ol> tags separated by <p> paragraphs
    # Example:
    # <ol class="wp-block-list">
    # <li><strong>Title:</strong></li>
    # </ol>
    # <p>Paragraph text...</p>
    # <ol start="2" class="wp-block-list">...
    
    # We match sequences of <ol...><li>...</li></ol>\s*<p>...</p>
    pattern = r'(?:<ol[^>]*>\s*<li>([\s\S]*?)</li>\s*</ol>\s*<p>([\s\S]*?)</p>\s*)+'

    def replace_group(match):
        block = match.group(0)
        # Extract title and paragraph pairs
        pairs = re.findall(r'<ol[^>]*>\s*<li>([\s\S]*?)</li>\s*</ol>\s*<p>([\s\S]*?)</p>', block)
        if not pairs:
            return block
        
        res = ['<ol class="wp-block-list">']
        for title, desc in pairs:
            res.append(f'  <li>\n    {title.strip()}\n    <p>{desc.strip()}</p>\n  </li>')
        res.append('</ol>')
        return '\n'.join(res)

    return re.sub(pattern, replace_group, html_content)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # 1. Convert split <ol> tags
    content = convert_split_ol_in_html(content)

    # 2. Add or update Medical Disclaimer
    if '<div class="ew-medical-disclaimer">' not in content:
        if '<div class="ew-related-posts-section"' in content:
            content = content.replace('<div class="ew-related-posts-section"', DISCLAIMER_HTML + '\n<div class="ew-related-posts-section"')
        elif '<div class="ew-blog-service-card"' in content:
            content = content.replace('<div class="ew-blog-service-card"', DISCLAIMER_HTML + '\n<div class="ew-blog-service-card"')
        elif '</article>' in content:
            content = content.replace('</article>', DISCLAIMER_HTML + '\n</article>')
    else:
        # Ensure exact verbatim disclaimer text
        content = re.sub(
            r'<div class="ew-medical-disclaimer">[\s\S]*?</div>\s*</div>',
            DISCLAIMER_HTML.strip(),
            content
        )

    # 3. Ensure comments remain hidden
    content = re.sub(r'<div class="comments-area">[\s\S]*?</div>\s*</div>\s*(<!-- #comments -->)?\s*</div>', '', content)
    content = re.sub(r'<div id="respond" class="comment-respond">[\s\S]*?</form>\s*</div>', '', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed list numbering & disclaimer in: {filepath}")

def update_css():
    css_files = [
        "css/style.css",
        "css/blog-pages.css",
        "css/blog-sidebar.css",
        "css/ew-a11y.css",
        "blogs/wp-content/plugins/tfm-theme-boost/css/style.css",
        "blogs/wp-content/themes/generatepress/assets/css/main.min.css"
    ]
    for c in css_files:
        if os.path.exists(c):
            with open(c, 'r', encoding='utf-8', errors='ignore') as f:
                c_content = f.read()
            if "PERFECT NATIVE ORDERED LIST NUMBERING FIX" not in c_content:
                c_content += LIST_COUNTER_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended list counter CSS fix to: {c}")

def main():
    update_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                if fp != './blogs/index.html' and not fp.endswith('/page/2/index.html') and not fp.endswith('/page/3/index.html'):
                    process_file(fp)

if __name__ == '__main__':
    main()
