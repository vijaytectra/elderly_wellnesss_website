import os
import re

TEXT_VISIBILITY_MASTER_CSS = '''

/* ==========================================================================
   MASTER PARAGRAPH TEXT CONTRAST FIX (CRISP DARK TEXT ON WHITE BACKGROUND)
   ========================================================================== */

/* 1. Article Body Text on White Background */
.entry-content p,
article .entry-content p,
.inside-article p,
.site-content p {
  color: #334155 !important;
  font-size: 1.08rem !important;
  line-height: 1.68 !important;
}

.entry-content a,
.inside-article a {
  color: #0284c7 !important;
  text-decoration: underline !important;
}

.entry-content a:hover,
.inside-article a:hover {
  color: #0369a1 !important;
}

/* 2. Dark CTA Card Text ONLY */
.ew-blog-cta,
.ew-blog-cta--app,
.ew-blog-service-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
  color: #ffffff !important;
}

.ew-blog-cta p,
.ew-blog-cta--app p,
.ew-blog-service-card p {
  color: #f1f5f9 !important;
  font-size: 1.05rem !important;
  line-height: 1.6 !important;
}

.ew-blog-cta h3,
.ew-blog-cta--app h3,
.ew-blog-service-card h3 {
  color: #ffffff !important;
  font-weight: 800 !important;
}

.ew-blog-cta .ew-blog-cta__eyebrow,
.ew-blog-cta--app .ew-blog-cta__eyebrow,
.ew-blog-service-card .ew-blog-cta__eyebrow {
  color: #38bdf8 !important;
  font-weight: 700 !important;
}

.ew-blog-cta a.ew-blog-cta__btn,
.ew-blog-cta--app a.ew-blog-cta__btn,
.ew-blog-service-card a.ew-blog-cta__btn {
  color: #ffffff !important;
  text-decoration: none !important;
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;
}
'''

def fix_html_inline_styles(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Remove any inline style="color: #f1f5f9 !important;" that was mistakenly placed on regular <p> tags outside dark CTA boxes
    # We strip style="color: #f1f5f9 !important;" unless inside <div class="ew-blog-cta
    def remove_faint_inline_style(match):
        full_html = match.group(0)
        # Split by <div class="ew-blog-cta
        parts = re.split(r'(<div class="ew-blog-cta[\s\S]*?</div>\s*</div>)', full_html)
        new_parts = []
        for p in parts:
            if p.startswith('<div class="ew-blog-cta'):
                new_parts.append(p)
            else:
                # Remove style="color: #f1f5f9 !important;" from non-CTA html
                cleaned = re.sub(r'\s*style="color:\s*#f1f5f9\s*!important;"', '', p)
                new_parts.append(cleaned)
        return ''.join(new_parts)

    content = remove_faint_inline_style(re.search(r'[\s\S]*', content))

    # Bump cache version to v=20260817f
    content = re.sub(r'blog-pages\.css\?v=[^\s"\'\>]+', 'blog-pages.css?v=20260817f', content)
    content = re.sub(r'style\.css\?v=[^\s"\'\>]+', 'style.css?v=20260817f', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed paragraph text visibility in: {filepath}")

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
            c_content += TEXT_VISIBILITY_MASTER_CSS
            with open(c, 'w', encoding='utf-8') as f:
                f.write(c_content)
            print(f"Appended master text visibility CSS to: {c}")

def main():
    update_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                fix_html_inline_styles(fp)

if __name__ == '__main__':
    main()
