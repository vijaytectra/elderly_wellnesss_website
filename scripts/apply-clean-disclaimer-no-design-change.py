import os
import re

CLEAN_DISCLAIMER_HTML = '''
<!-- Medical Disclaimer Box -->
<div class="ew-medical-disclaimer">
  <div class="ew-disclaimer-icon"><i class="icofont-info-circle"></i></div>
  <div class="ew-disclaimer-text">
    <p><strong>Medical Disclaimer:</strong> This article is general information and is not medical advice. Please consult a doctor about your parent's specific condition.</p>
  </div>
</div>
'''

CLEAN_CSS = '''

/* ==========================================================================
   CLEAN BLOG DISCLAIMER & COMMENT REMOVAL (PRESERVING ORIGINAL DESIGN)
   ========================================================================== */
.comments-area,
#comments,
#respond,
.comment-respond,
.comment-form,
.entry-meta-comment-count,
.comments-link {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.ew-medical-disclaimer {
  margin: 24px 0 !important;
  padding: 16px 20px !important;
  background-color: #fff8f6 !important;
  border: 1px solid #fee2e2 !important;
  border-left: 4px solid #ef4444 !important;
  border-radius: 12px !important;
  display: flex !important;
  align-items: flex-start !important;
  gap: 12px !important;
  box-sizing: border-box !important;
  width: 100% !important;
}

.ew-disclaimer-icon {
  color: #ef4444 !important;
  font-size: 18px !important;
  flex-shrink: 0 !important;
  margin-top: 2px !important;
}

.ew-disclaimer-text p {
  margin: 0 !important;
  font-size: 0.9rem !important;
  color: #7f1d1d !important;
  line-height: 1.5 !important;
}
'''

def update_disclaimer_text_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Replace any previous medical disclaimer with the clean verbatim version
    if '<div class="ew-medical-disclaimer">' in content:
        content = re.sub(r'<div class="ew-medical-disclaimer">[\s\S]*?</div>\s*</div>', CLEAN_DISCLAIMER_HTML.strip(), content)
    else:
        if '<div class="ew-related-posts-section"' in content:
            content = content.replace('<div class="ew-related-posts-section"', CLEAN_DISCLAIMER_HTML + '\n<div class="ew-related-posts-section"')
        elif '</article>' in content:
            content = content.replace('</article>', CLEAN_DISCLAIMER_HTML + '\n</article>')

    # Ensure comments remain hidden
    content = re.sub(r'<div class="comments-area">[\s\S]*?</div>\s*</div>\s*(<!-- #comments -->)?\s*</div>', '', content)
    content = re.sub(r'<div id="respond" class="comment-respond">[\s\S]*?</form>\s*</div>', '', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated disclaimer text in: {filepath}")

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
            if "CLEAN BLOG DISCLAIMER & COMMENT REMOVAL" not in c_content:
                c_content += CLEAN_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended clean disclaimer CSS to: {c}")

def main():
    update_all_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                if fp != './blogs/index.html' and not fp.endswith('/page/2/index.html') and not fp.endswith('/page/3/index.html'):
                    update_disclaimer_text_in_file(fp)

if __name__ == '__main__':
    main()
