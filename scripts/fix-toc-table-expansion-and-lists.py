import os

TOC_EXPANSION_CSS = '''

/* ==========================================================================
   TABLE OF CONTENTS FULL HORIZONTAL EXPANSION & FONT SIZE INCREASE
   ========================================================================== */
#rank-math-toc,
.wp-block-rank-math-toc-block {
  width: 100% !important;
  max-width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-top: 24px !important;
  margin-bottom: 28px !important;
  padding: 24px 28px !important;
  background-color: #f8fafc !important;
  border: 1.5px solid #e2e8f0 !important;
  border-left: 4px solid #2786a5 !important;
  border-radius: 16px !important;
  box-sizing: border-box !important;
}

#rank-math-toc h2,
.wp-block-rank-math-toc-block h2 {
  font-size: 1.35rem !important;
  font-weight: 800 !important;
  color: #1e293b !important;
  margin-bottom: 16px !important;
  margin-top: 0 !important;
}

#rank-math-toc nav ul,
.wp-block-rank-math-toc-block nav ul {
  padding-left: 0 !important;
  margin: 0 !important;
  list-style: none !important;
  width: 100% !important;
}

#rank-math-toc nav ul li,
.wp-block-rank-math-toc-block nav ul li {
  margin-bottom: 10px !important;
  padding-left: 0 !important;
  font-size: 1.05rem !important;
  line-height: 1.5 !important;
  width: 100% !important;
}

#rank-math-toc nav ul li a,
.wp-block-rank-math-toc-block nav ul li a {
  color: #1e293b !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  display: block !important;
  width: 100% !important;
  transition: color 0.2s ease !important;
}

#rank-math-toc nav ul li a:hover,
.wp-block-rank-math-toc-block nav ul li a:hover {
  color: #2786a5 !important;
}

/* Fill Horizontal Article Space & Correct Sequential List Numbers */
.entry-content,
article .entry-content,
.inside-article {
  width: 100% !important;
  max-width: 100% !important;
}

.entry-content p,
article .entry-content p {
  width: 100% !important;
  max-width: 100% !important;
  font-size: 1.08rem !important;
  line-height: 1.68 !important;
  color: #334155 !important;
  margin-bottom: 16px !important;
}

ol,
.entry-content ol,
article ol,
.wp-block-list {
  list-style-type: decimal !important;
  padding-left: 24px !important;
  margin-top: 14px !important;
  margin-bottom: 18px !important;
  width: 100% !important;
}

ol > li,
.entry-content ol > li,
article ol > li,
.wp-block-list > li {
  display: list-item !important;
  list-style-type: decimal !important;
  font-size: 1.05rem !important;
  line-height: 1.6 !important;
  margin-bottom: 10px !important;
  padding-left: 4px !important;
  color: #1e293b !important;
}

ol > li::before,
.entry-content ol > li::before,
article ol > li::before,
.wp-block-list > li::before {
  content: none !important;
}
'''

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
            if "TABLE OF CONTENTS FULL HORIZONTAL EXPANSION" not in c_content:
                c_content += TOC_EXPANSION_CSS
                with open(c, 'w', encoding='utf-8') as f:
                    f.write(c_content)
                print(f"Appended TOC expansion & text fill CSS to: {c}")

def main():
    update_all_css()

if __name__ == '__main__':
    main()
