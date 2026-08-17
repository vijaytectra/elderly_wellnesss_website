import os
import re

WHITE_GAP_FOOTER_CSS = '''

/* ==========================================================================
   CLEAN WHITE SPACE / GAP ABOVE FOOTER SECTION
   ========================================================================== */
#callback-form-section,
.ew-contact-hub-section,
.service_section#callback-form-section,
.how_it_section,
.row_am:last-of-type {
  margin-bottom: 48px !important;
  padding-bottom: 0 !important;
}

body footer,
body.inner-services-page footer,
footer.white_text,
footer {
  margin-top: 48px !important;
  clear: both !important;
}
'''

def fix_hero_and_broken_imgs_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Fix hero image on services.html
    if 'alt="Elderly care professional supporting senior at home"' in content:
        content = re.sub(
            r'<img[^>]*alt="Elderly care professional supporting senior at home"[^>]*>',
            '<img src="images/services/banner-left.png" alt="Elderly care professional supporting senior at home" style="width: 100%; height: auto; display: block;"/>',
            content
        )

    # Generic fix for any remaining src=" " in img tags
    content = re.sub(r'<img[^>]*src=["\']\s*["\'][^>]*alt="Step 1[^"]*"[^>]*>', '<img src="images/services/step1_download_app.png" alt="Step 1: Download Elderly Care Plus App"/>', content)
    content = re.sub(r'<img[^>]*src=["\']\s*["\'][^>]*alt="Step 2[^"]*"[^>]*>', '<img src="images/services/step2_signup_account.png" alt="Step 2: Sign up for an account"/>', content)
    content = re.sub(r'<img[^>]*src=["\']\s*["\'][^>]*alt="Step 3[^"]*"[^>]*>', '<img src="images/services/step3_select_service.png" alt="Step 3: Select senior care service in the app"/>', content)
    
    # Catch-all for remaining broken src=" "
    content = re.sub(r'<img\s+src=["\']\s*["\']', '<img src="images/service1.png"', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed hero image & broken img srcs in: {filepath}")

def update_css():
    css_files = [
        "css/style.css",
        "css/service-pages-enhancements.css",
        "css/blog-pages.css",
        "css/ew-a11y.css",
        "css/responsive.css"
    ]
    for c in css_files:
        if os.path.exists(c):
            with open(c, 'r', encoding='utf-8', errors='ignore') as f:
                c_content = f.read()
            if "CLEAN WHITE SPACE / GAP ABOVE FOOTER SECTION" not in c_content:
                c_content += WHITE_GAP_FOOTER_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended white gap above footer CSS to: {c}")

def main():
    update_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                fix_hero_and_broken_imgs_in_file(fp)

if __name__ == '__main__':
    main()
