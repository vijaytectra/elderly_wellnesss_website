import os
import re

LAYOUT_CSS = '''

/* ==========================================================================
   MASTER BLOG PAGE CONTENT CONTAINER & PADDING ALIGNMENT FIX (PERFECT ALIGNMENT)
   ========================================================================== */
body.single-post #page,
body.single #page,
.single-post #page,
.single-post .site-content,
.single-post .content-area,
.single-post .site-main,
.single-post article {
  max-width: 1170px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  box-sizing: border-box !important;
  width: 100% !important;
}

.single-post .inside-article,
.single-post .entry-content,
article .inside-article,
article .entry-content {
  padding-left: 24px !important;
  padding-right: 24px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  box-sizing: border-box !important;
  max-width: 1170px !important;
  width: 100% !important;
}

.ew-breadcrumb-bar {
  width: 100% !important;
  background-color: #f8fafc !important;
  border-bottom: 1px solid #e2e8f0 !important;
  padding: 12px 0 !important;
  margin-bottom: 24px !important;
}

.ew-breadcrumb-bar .container {
  max-width: 1170px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
  box-sizing: border-box !important;
  width: 100% !important;
}

.ew-blog-service-card,
.ew-blog-cta--app,
.ew-medical-disclaimer,
.ew-related-posts-section {
  max-width: 100% !important;
  width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  box-sizing: border-box !important;
}

.ew-related-posts-section h3,
.ew-related-posts-section h2,
.ew-related-posts-section .ew-related-title,
.ew-related-posts-section p {
  padding-left: 0 !important;
  margin-left: 0 !important;
}

@media (max-width: 768px) {
  .single-post .inside-article,
  .single-post .entry-content,
  .ew-breadcrumb-bar .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}
'''

def fix_ol_lists_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Fix pattern in nutritious-diets and other blogs where each list item was in its own <ol> tag
    # Example: <ol class="wp-block-list"> <li><strong>Breakfast:</strong></li> </ol> <p>text</p> <ol start="2"...
    # We replace </ol>\s*<p>([\s\S]*?)</p>\s*<ol start="\d+"[^>]*>\s*<li> with <p style="margin-left:24px;">\1</p><li>
    
    # Simple fix for consecutive list items with start attributes
    content = re.sub(r'</ol>\s*<p>([\s\S]*?)</p>\s*<ol start="\d+"[^>]*>\s*<li>', r'<br/>\1</li>\n<li>', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Unified list structure in: {filepath}")

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
            if "MASTER BLOG PAGE CONTENT CONTAINER & PADDING ALIGNMENT FIX" not in c_content:
                c_content += LAYOUT_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended master layout padding CSS to: {c}")

def main():
    update_all_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                fix_ol_lists_in_file(fp)

if __name__ == '__main__':
    main()
