import os
import re

SPECIFICITY_CSS = '''

/* ==========================================================================
   MASTER HIGH-SPECIFICITY CONTRAST FIX FOR DARK CTA CARDS (BEATING ENTRY-CONTENT P)
   ========================================================================== */
.entry-content .ew-blog-cta p,
.entry-content .ew-blog-cta--app p,
.entry-content .ew-blog-service-card p,
.inside-article .ew-blog-cta p,
.inside-article .ew-blog-cta--app p,
.inside-article .ew-blog-service-card p,
.ew-blog-cta p,
.ew-blog-cta--app p,
.ew-blog-service-card p {
  color: #f1f5f9 !important;
  font-size: 1.05rem !important;
  line-height: 1.6 !important;
}

.entry-content .ew-blog-cta h3,
.entry-content .ew-blog-cta--app h3,
.entry-content .ew-blog-service-card h3,
.inside-article .ew-blog-cta h3,
.inside-article .ew-blog-cta--app h3,
.inside-article .ew-blog-service-card h3,
.ew-blog-cta h3,
.ew-blog-cta--app h3,
.ew-blog-service-card h3 {
  color: #ffffff !important;
  font-size: 1.45rem !important;
  font-weight: 800 !important;
}

.entry-content .ew-blog-cta .ew-blog-cta__eyebrow,
.entry-content .ew-blog-cta--app .ew-blog-cta__eyebrow,
.entry-content .ew-blog-service-card .ew-blog-cta__eyebrow,
.inside-article .ew-blog-cta .ew-blog-cta__eyebrow,
.inside-article .ew-blog-cta--app .ew-blog-cta__eyebrow,
.inside-article .ew-blog-service-card .ew-blog-cta__eyebrow,
.ew-blog-cta .ew-blog-cta__eyebrow,
.ew-blog-cta--app .ew-blog-cta__eyebrow,
.ew-blog-service-card .ew-blog-cta__eyebrow {
  color: #38bdf8 !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}
'''

def update_html_cta_styles(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Add inline style colors directly to HTML tags inside CTA boxes for guaranteed rendering
    content = re.sub(
        r'<p class="ew-blog-cta__eyebrow"(?: style="[^"]*")?>',
        '<p class="ew-blog-cta__eyebrow" style="color: #38bdf8 !important; font-weight: 700 !important;">',
        content
    )
    content = re.sub(
        r'<h3(?: class="[^"]*")?(?: style="[^"]*")?>(Find a trained|Need |Looking for |Specialized care|Professional caregiver)',
        r'<h3 style="color: #ffffff !important; font-weight: 800 !important;">\1',
        content
    )

    # Convert any plain <p> text inside .ew-blog-cta to have inline color: #f1f5f9
    def cta_replacer(match):
        block = match.group(0)
        # Add style="color: #f1f5f9 !important;" to <p> tags inside CTA except eyebrow or action
        block = re.sub(r'<p>(?!\s*<a)', '<p style="color: #f1f5f9 !important;">', block)
        return block

    content = re.sub(r'<div class="ew-blog-cta[\s\S]*?</div>\s*</div>', cta_replacer, content)

    # Bump cache version
    content = re.sub(r'blog-pages\.css\?v=[^\s"\'\>]+', 'blog-pages.css?v=20260817e', content)
    content = re.sub(r'style\.css\?v=[^\s"\'\>]+', 'style.css?v=20260817e', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added inline high-contrast CTA styles to: {filepath}")

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
            if "MASTER HIGH-SPECIFICITY CONTRAST FIX FOR DARK CTA CARDS" not in c_content:
                c_content += SPECIFICITY_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended master CTA contrast CSS to: {c}")

def main():
    update_all_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                update_html_cta_styles(fp)

if __name__ == '__main__':
    main()
