import os
import re

MASTER_PADDING_CSS = '''

/* ==========================================================================
   PERFECT BLOG COMPONENT INSIDE-ENTRY-CONTENT PADDING & ALIGNMENT
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
  padding-left: 32px !important;
  padding-right: 32px !important;
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
  padding-left: 32px !important;
  padding-right: 32px !important;
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
.ew-related-posts-section p,
.ew-related-posts-section .ew-related-eyebrow {
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

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Check if entry-content exists
    if '<div class="entry-content"' in content:
        # Extract components if they are outside entry-content
        # Entry content closing tag is usually </div> <!-- .entry-content --> or </div> followed by footer/comments
        # If ew-medical-disclaimer or ew-related-posts-section or ew-blog-service-card is after </div> of entry-content:
        # Move them inside entry-content right before entry-content ends!
        
        # Pull out any ew-blog-service-card, ew-medical-disclaimer, ew-related-posts-section outside entry-content
        service_card = ""
        disclaimer = ""
        related = ""

        m_sc = re.search(r'(<div class="ew-blog-service-card">[\s\S]*?</div>\s*</div>)', content)
        m_dc = re.search(r'(<div class="ew-medical-disclaimer">[\s\S]*?</div>\s*</div>)', content)
        m_rp = re.search(r'(<div class="ew-related-posts-section">[\s\S]*?</div>\s*</div>\s*</div>)', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Processed: {filepath}")

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
            if "PERFECT BLOG COMPONENT INSIDE-ENTRY-CONTENT PADDING" not in c_content:
                c_content += MASTER_PADDING_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended master component padding CSS to: {c}")

def main():
    update_css()

if __name__ == '__main__':
    main()
