import os
import re

LIST_PADDING_CSS = '''

/* ==========================================================================
   MASTER FIX: ORDERED LIST NUMBERING & CONTAINER PADDING MATCHING MAIN SITE
   ========================================================================== */
#page,
#page.site,
.single-post #page,
.single-post .site-content,
body.single-post #page,
body.single #page {
  max-width: 1170px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  box-sizing: border-box !important;
}

.ew-breadcrumb-bar .container {
  max-width: 1170px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
}

.inside-article {
  padding: 30px 0 !important;
}

@media (max-width: 768px) {
  #page,
  #page.site,
  .single-post #page {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

/* Fix Ordered List Numbering (Respect HTML start="" attribute) */
.entry-content ol,
article ol,
.wp-block-list {
  list-style-type: decimal !important;
  padding-left: 28px !important;
  margin-bottom: 20px !important;
}

.entry-content ol li,
article ol li,
.wp-block-list li {
  display: list-item !important;
  list-style-type: decimal !important;
  margin-bottom: 8px !important;
  padding-left: 4px !important;
}

.entry-content ol li::before,
article ol li::before,
.wp-block-list li::before {
  content: none !important;
}

.entry-content ul,
article ul {
  list-style-type: disc !important;
  padding-left: 24px !important;
  margin-bottom: 20px !important;
}

.entry-content ul li,
article ul li {
  display: list-item !important;
  list-style-type: disc !important;
  margin-bottom: 6px !important;
}

.entry-content ul li::before,
article ul li::before {
  content: none !important;
}
'''

def merge_consecutive_ols(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Merge pattern where <ol start="N"...> <li>...</li> </ol> <p>...</p> <ol start="N+1"...> <li>...</li> </ol>
    # Convert separate single-item <ol> tags into clean continuous list items or ensure list-style decimal works
    # We can also clean up consecutive <ol> tags if there are no paragraphs between them
    content = re.sub(r'</ol>\s*<ol[^>]*>', '', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned consecutive <ol> tags in: {filepath}")

def update_all_css():
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
            if "MASTER FIX: ORDERED LIST NUMBERING & CONTAINER PADDING" not in c_content:
                c_content += LIST_PADDING_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended list & container padding CSS to: {c}")

def main():
    update_all_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                merge_consecutive_ols(fp)

if __name__ == '__main__':
    main()
