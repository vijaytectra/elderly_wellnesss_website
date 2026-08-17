import os
import re

TOC_DIRECT_CSS = '''
/* RankMath TOC Direct Overrides for 100% Full-Width Expansion & Font Size Increase */
.wp-block-rank-math-toc-block,
#rank-math-toc {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  margin: 24px 0 !important;
  padding: 24px 28px !important;
  background-color: #f8fafc !important;
  border: 1.5px solid #e2e8f0 !important;
  border-left: 4px solid #2786a5 !important;
  border-radius: 16px !important;
  display: block !important;
}

.wp-block-rank-math-toc-block h2,
#rank-math-toc h2 {
  font-size: 1.35rem !important;
  font-weight: 800 !important;
  color: #1e293b !important;
  margin-bottom: 16px !important;
  margin-top: 0 !important;
}

.wp-block-rank-math-toc-block nav,
#rank-math-toc nav {
  width: 100% !important;
}

.wp-block-rank-math-toc-block nav ul,
#rank-math-toc nav ul,
.wp-block-rank-math-toc-block nav ol,
#rank-math-toc nav ol {
  padding-left: 0 !important;
  margin: 0 !important;
  list-style: none !important;
  width: 100% !important;
  counter-reset: none !important;
}

.wp-block-rank-math-toc-block nav ul li,
#rank-math-toc nav ul li,
.wp-block-rank-math-toc-block nav ol li,
#rank-math-toc nav ol li {
  margin-bottom: 10px !important;
  padding-left: 0 !important;
  font-size: 1.05rem !important;
  line-height: 1.5 !important;
  width: 100% !important;
  display: block !important;
}

.wp-block-rank-math-toc-block nav ul li::before,
#rank-math-toc nav ul li::before,
.wp-block-rank-math-toc-block nav ol li::before,
#rank-math-toc nav ol li::before {
  content: none !important;
}

.wp-block-rank-math-toc-block nav ul li a,
#rank-math-toc nav ul li a,
.wp-block-rank-math-toc-block nav ol li a,
#rank-math-toc nav ol li a {
  color: #1e293b !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  display: block !important;
  width: 100% !important;
  transition: color 0.2s ease !important;
}

.wp-block-rank-math-toc-block nav ul li a:hover,
#rank-math-toc nav ul li a:hover,
.wp-block-rank-math-toc-block nav ol li a:hover,
#rank-math-toc nav ol li a:hover {
  color: #2786a5 !important;
}
'''

def update_toc_css_files():
    toc_files = [
        "blogs/wp-content/plugins/seo-by-rank-math/includes/modules/schema/blocks/toc/assets/css/toc_list_style.css",
        "blogs/wp-content/plugins/seo-by-rank-math/includes/modules/schema/blocks/toc/assets/css/toc_list_style.css?ver=1.0.242.css"
    ]
    for tf in toc_files:
        if os.path.exists(tf):
            with open(tf, 'w', encoding='utf-8') as f:
                f.write(TOC_DIRECT_CSS)
            print(f"Overwrote RankMath TOC CSS in: {tf}")

def bust_cache_in_html(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content
    content = re.sub(r'blog-pages\.css\?v=[\d\.]+', 'blog-pages.css?v=20260817a', content)
    content = re.sub(r'style\.css\?v=[\d\.]+', 'style.css?v=20260817a', content)
    content = re.sub(r'ew-a11y\.css\?v=[\d\.]+', 'ew-a11y.css?v=20260817a', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    update_toc_css_files()
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                fp = os.path.join(root, f)
                bust_cache_in_html(fp)

if __name__ == '__main__':
    main()
