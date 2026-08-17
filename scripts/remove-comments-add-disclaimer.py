import os
import re

DISCLAIMER_HTML = '''
<!-- Medical Disclaimer Box -->
<div class="ew-medical-disclaimer">
  <div class="ew-disclaimer-icon"><i class="icofont-info-circle"></i></div>
  <div class="ew-disclaimer-text">
    <p><strong>Medical Disclaimer:</strong> This article is for general informational purposes only and does not constitute medical advice. Please consult a qualified doctor or healthcare professional regarding your parent's specific medical condition or care plan.</p>
  </div>
</div>
'''

DISCLAIMER_CSS = '''

/* ==========================================================================
   MEDICAL DISCLAIMER BOX & COMPLETE COMMENT REMOVAL
   ========================================================================== */
.comments-area,
#comments,
#respond,
.comment-respond,
.comment-form,
.entry-meta-comment-count,
.comments-link,
.post-meta .entry-meta-comment-count {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}

.ew-medical-disclaimer {
  margin: 28px 0 !important;
  padding: 16px 20px !important;
  background-color: #fff8f6 !important;
  border: 1px solid #fee2e2 !important;
  border-left: 4px solid #ef4444 !important;
  border-radius: 12px !important;
  display: flex !important;
  align-items: flex-start !important;
  gap: 14px !important;
  box-sizing: border-box !important;
}

.ew-disclaimer-icon {
  color: #ef4444 !important;
  font-size: 20px !important;
  flex-shrink: 0 !important;
  margin-top: 2px !important;
}

.ew-disclaimer-text p {
  margin: 0 !important;
  font-size: 0.88rem !important;
  color: #7f1d1d !important;
  line-height: 1.5 !important;
}
'''

def process_blog_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # 1. Remove comments-area section
    content = re.sub(r'<div class="comments-area">[\s\S]*?</div>\s*</div>\s*(<!-- #comments -->)?\s*</div>', '', content)
    content = re.sub(r'<div id="respond" class="comment-respond">[\s\S]*?</form>\s*</div>', '', content)
    content = re.sub(r'<li class="entry-meta-comment-count">[\s\S]*?</li>', '', content)

    # 2. Inject Medical Disclaimer if not already present
    if "ew-medical-disclaimer" not in content:
        if '<div class="ew-related-posts-section"' in content:
            content = content.replace('<div class="ew-related-posts-section"', DISCLAIMER_HTML + '\n<div class="ew-related-posts-section"')
        elif '<div class="ew-blog-service-card"' in content:
            content = content.replace('<div class="ew-blog-service-card"', DISCLAIMER_HTML + '\n<div class="ew-blog-service-card"')
        elif '</article>' in content:
            content = content.replace('</article>', DISCLAIMER_HTML + '\n</article>')

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Removed comments & added Medical Disclaimer to: {filepath}")

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
                content = f.read()
            if "MEDICAL DISCLAIMER BOX & COMPLETE COMMENT REMOVAL" not in content:
                content += DISCLAIMER_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Appended disclaimer & comment removal CSS to: {c}")

def main():
    update_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                if fp != './blogs/index.html' and not fp.endswith('/page/2/index.html') and not fp.endswith('/page/3/index.html'):
                    process_blog_file(fp)

if __name__ == '__main__':
    main()
