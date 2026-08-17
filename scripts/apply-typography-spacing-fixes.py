import os
import re

TYPOGRAPHY_SPACING_CSS = '''

/* ==========================================================================
   BLOG TYPOGRAPHY, SPACING TIGHTENING & BOTTOM EMPTY BOX REMOVAL
   ========================================================================== */

/* 1. Font Size Increase & Tighten Paragraph Gaps */
.entry-content p,
article .entry-content p,
.inside-article p {
  font-size: 1.08rem !important;
  line-height: 1.68 !important;
  color: #334155 !important;
  margin-bottom: 16px !important;
  padding-bottom: 0 !important;
}

.entry-content h2,
article .entry-content h2 {
  font-size: 1.6rem !important;
  line-height: 1.35 !important;
  color: #1e293b !important;
  margin-top: 28px !important;
  margin-bottom: 14px !important;
  font-weight: 800 !important;
}

.entry-content h3,
article .entry-content h3 {
  font-size: 1.3rem !important;
  line-height: 1.4 !important;
  color: #1e293b !important;
  margin-top: 22px !important;
  margin-bottom: 10px !important;
  font-weight: 700 !important;
}

/* 2. Correct Sequential List Number Order (1, 2, 3, 4, 5) */
ol,
.entry-content ol,
article ol,
.wp-block-list {
  list-style-type: decimal !important;
  padding-left: 24px !important;
  margin-top: 12px !important;
  margin-bottom: 18px !important;
}

ol > li,
.entry-content ol > li,
article ol > li,
.wp-block-list > li {
  display: list-item !important;
  list-style-type: decimal !important;
  font-size: 1.05rem !important;
  line-height: 1.6 !important;
  margin-bottom: 8px !important;
  padding-left: 4px !important;
  color: #1e293b !important;
}

ol > li::before,
.entry-content ol > li::before,
article ol > li::before,
.wp-block-list > li::before {
  content: none !important;
}

/* 3. Remove Empty Box at Bottom of Article */
footer.entry-meta,
footer.entry-meta:empty,
.comments-area,
.comments-area:empty,
#respond,
#comments {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
}
'''

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Remove empty footer.entry-meta tags
    content = re.sub(r'<footer class="entry-meta">\s*</footer>', '', content)
    content = re.sub(r'<footer class="entry-meta"></footer>', '', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed empty bottom box in: {filepath}")

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
            if "BLOG TYPOGRAPHY, SPACING TIGHTENING" not in c_content:
                c_content += TYPOGRAPHY_SPACING_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended typography & bottom box removal CSS to: {c}")

def main():
    update_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                process_file(fp)

if __name__ == '__main__':
    main()
