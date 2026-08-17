import os
import re

FOOTER_CSS = '''

/* ==========================================================================
   PERFECT BLOG PAGE FOOTER FULL-WIDTH WRAPPER & LAYOUT FIX
   ========================================================================== */
#page,
.site-content,
.content-area,
.site-main,
article,
.inside-article {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  float: none !important;
  clear: both !important;
}

#page::after,
.site-content::after,
.content-area::after,
.site-main::after,
article::after {
  content: "" !important;
  display: table !important;
  clear: both !important;
}

body.single-post footer,
body.single footer,
body footer,
footer,
footer.site-footer,
footer.row_am,
.footer_bottom {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  clear: both !important;
  float: none !important;
  position: relative !important;
  left: 0 !important;
  right: 0 !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-top: 40px !important;
  box-sizing: border-box !important;
}
'''

def fix_file_footer(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Check if footer is inside #page / .site-content
    # Match footer starting with <!-- Footer-Section start --> or <footer
    if '<footer' in content and '<div class="site grid-container' in content:
        # Close #primary, .site-content, #page before <footer
        # If <footer appears before </div>\n</div>\n</div> for #page
        parts = content.split('<footer', 1)
        if len(parts) == 2:
            head_part = parts[0]
            tail_part = parts[1]

            # Remove trailing closing </div> </div> </footer> </div> at end of tail_part
            tail_part = re.sub(r'</div>\s*</footer>\s*</div>\s*<script', '<script', tail_part)
            tail_part = re.sub(r'</footer>\s*</div>\s*<script', '<script', tail_part)

            # Close #main, #primary, .site-content, #page cleanly before <footer
            # Ensure open divs in head_part are closed
            # Count open vs closed divs in head_part
            open_divs = head_part.count('<div')
            close_divs = head_part.count('</div>')
            needed_closes = open_divs - close_divs
            if needed_closes > 0:
                head_part += ('\n' + '</div>' * needed_closes + '\n')

            content = head_part + '<footer' + tail_part

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed footer DOM position in: {filepath}")

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
            if "PERFECT BLOG PAGE FOOTER FULL-WIDTH WRAPPER & LAYOUT FIX" not in c_content:
                c_content += FOOTER_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended footer layout CSS fix to: {c}")

def main():
    update_all_css()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                fix_file_footer(fp)

if __name__ == '__main__':
    main()
