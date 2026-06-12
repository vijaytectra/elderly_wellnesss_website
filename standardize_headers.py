#!/usr/bin/env python3
"""Apply the canonical site header to all main Elderly Wellness pages."""

import re
from pathlib import Path

SITE = Path(__file__).resolve().parent
DOWNLOAD_PDF = "assets/elderly_wellness.pdf"

MAIN_PAGES = {
    "index.html": "home",
    "about.html": "about",
    "contact.html": "contact",
    "board-of-advisors.html": "board",
    "investors.html": "investors",
    "how-elderly-wellness-works.html": "home",
    "elderly-wellness.html": "about",
    "physiotherapy-services-for-elders.html": "services",
    "nursing-services-for-elders.html": "services",
    "geriatric-care-services-for-elders.html": "services",
    "assisted-living-support-services-for-elders.html": "services",
    "company/privacy-policy.html": None,
    "company/terms-and-conditions.html": None,
    "company/refund-and-cancellation-policies.html": None,
}

HEADER_RE = re.compile(r"<!-- Header Start -->.*?</header>", re.DOTALL)
WP_BLOG_HEADER_RE = re.compile(
    r'<header class="site-header[^"]*"[^>]*>.*?</header>',
    re.DOTALL,
)
WP_SITE_FOOTER_RE = re.compile(
    r'<div class="site-footer">.*?</div>\s*',
    re.DOTALL,
)
MAIN_SITE_FOOTER_MARKER = "<!-- Main site footer -->"
def site_prefix(rel_path: str) -> str:
    return "../" * len(Path(rel_path).parent.parts)


def main_header_assets(prefix: str, blog_post: bool = False) -> str:
    assets = f"""<!-- Main site header assets -->
<link rel="stylesheet" href="{prefix}css/bootstrap.min.css"/>
<link rel="stylesheet" href="{prefix}css/icofont.min.css"/>
<link rel="stylesheet" href="{prefix}css/style.css"/>
<link rel="stylesheet" href="{prefix}css/responsive.css"/>
<link rel="stylesheet" href="{prefix}css/blog-main-header.css"/>
"""
    if blog_post:
        assets += f'<link rel="stylesheet" href="{prefix}css/blog-faq.css"/>\n'
    return assets


def main_header_scripts(prefix: str, blog_post: bool = False) -> str:
    scripts = f"""<!-- Main site header scripts -->
<script src="{prefix}js/jquery.js"></script>
<script src="{prefix}js/bootstrap.min.js"></script>
<script src="{prefix}js/main.js"></script>
"""
    if blog_post:
        scripts += f'<script src="{prefix}js/blog-faq.js"></script>\n'
    return scripts


def active_cls(current: str | None, key: str) -> str:
    return " active" if current == key else ""


def build_header(prefix: str, page_path: str, active: str | None) -> str:
    home = f"{prefix}index.html"
    hash_page = home if page_path.startswith("blogs/") else f"{prefix}{page_path}"
    download = f"{prefix}{DOWNLOAD_PDF}"
    services_hash = f"{hash_page}#"
    locations_hash = f"{hash_page}#"

    return f"""    <!-- Header Start -->
    <header>
      <!-- container start -->
      <div class="container">
        <!-- navigation bar -->
        <nav class="navbar navbar-expand-lg">
          <a class="navbar-brand" href="{home}">
            <img src="{prefix}images/logo.png" alt="Elderly Wellness"/>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
              <span class="toggle-wrap">
                <span class="toggle-bar"></span>
              </span>
            </span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link{active_cls(active, "home")}" href="{home}">Home</a>
              </li>
              <li class="nav-item">
                <a href="{prefix}about.html" class="nav-link{active_cls(active, "about")}">About Us</a>
              </li>
              <li class="nav-item has_dropdown">
                <a class="nav-link{active_cls(active, "services")}" href="{services_hash}">Services</a>
                <span class="drp_btn"><i class="icofont-rounded-down"></i></span>
                <div class="sub_menu">
                  <ul>
                    <li>
                      <a href="{prefix}physiotherapy-services-for-elders.html">Physiotherapy</a>
                    </li>
                    <li>
                      <a href="{prefix}nursing-services-for-elders.html">Nursing Service</a>
                    </li>
                    <li>
                      <a href="{prefix}geriatric-care-services-for-elders.html">Geriatric Care</a>
                    </li>
                    <li>
                      <a href="{prefix}assisted-living-support-services-for-elders.html">Assisted Living Support</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item has_dropdown">
                <a class="nav-link{active_cls(active, "locations")}" href="{locations_hash}">Locations</a>
                <span class="drp_btn"><i class="icofont-rounded-down"></i></span>
                <div class="sub_menu">
                  <ul>
                    <li>
                      <a href="{prefix}blogs/elderly-care-services-in-chennai/index.html">Chennai</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link{active_cls(active, "board")}" href="{prefix}board-of-advisors.html">Board of Advisors</a>
              </li>
              <li class="nav-item">
                <a class="nav-link{active_cls(active, "investors")}" href="{prefix}investors.html">Investors</a>
              </li>
              <li class="nav-item">
                <a class="nav-link{active_cls(active, "blogs")}" href="{prefix}blogs/index.html">Blogs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link{active_cls(active, "contact")}" href="{prefix}contact.html">Contact Us</a>
              </li>
              <li class="nav-item">
                <div class="btn_block">
                  <a class="nav-link dark_btn" href="{download}" download="elderly_wellness.pdf">Download</a>
                  <div class="btn_bottom"></div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <!-- navigation end -->
      </div>
      <!-- container end -->
    </header>"""


def build_footer(prefix: str) -> str:
    return f"""{MAIN_SITE_FOOTER_MARKER}
      <!-- Footer-Section start -->
      <footer class="white_text site-main-footer" data-aos="fade-in" data-aos-duration="1500" id="download-btn" style="margin-top: 0">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="logo_side">
                <div class="logo">
                  <a href="{prefix}index.html">
                    <img src="{prefix}images/ft_logo.png" alt="Elderly Wellness"/>
                  </a>
                </div>
                <h3 class="mb-4">Contact Us</h3>
                <ul class="contact_info">
                  <li>
                    <a href="tel:919944890577">+91 99448 90577</a>
                  </li>
                </ul>
                <ul class="contact_info">
                  <li>
                    <a href="mailto:info@theelderlywellness.com">info@theelderlywellness.com</a>
                  </li>
                </ul>
                <ul class="social_media">
                  <li>
                    <a href="https://www.facebook.com/profile.php?id=100089074061784" target="_blank"><i class="icofont-facebook"></i></a>
                  </li>
                  <li>
                    <a href="https://x.com/elderly____?s=11" target="_blank"><i class="icofont-twitter"></i></a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/elderly__wellness?igsh=MW43cmZpb2liaGNzdA==" target="_blank"><i class="icofont-instagram"></i></a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/elderly-wellness-service-pvt-ltd/about/" target="_blank"><i class="icofont-linkedin"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <div class="logo_side" id="quick_links_side">
                <h3>Quick Links</h3>
                <ul class="contact_info" id="quick_links">
                  <li>
                    <a href="{prefix}company/privacy-policy.html">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="{prefix}company/refund-and-cancellation-policies.html">Refund &amp; Cancellation Policy</a>
                  </li>
                  <li>
                    <a href="{prefix}company/terms-and-conditions.html">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="{prefix}contact.html">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <div class="download_side">
                <h3>Download app</h3>
                <ul class="app_btn">
                  <li>
                    <a href="https://play.google.com/store/apps/details?id=com.elderly.nri">
                      <img class="blue_img" src="{prefix}images/googleplay.png" alt="image"/>
                    </a>
                  </li>
                  <li>
                    <a href="https://apps.apple.com/in/app/elderly-care-plus/id6740391242">
                      <img class="blue_img" src="{prefix}images/appstorebtn.png" alt="image"/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="footer_bottom">
          <div class="container">
            <div class="ft_inner">
              <div class="copy_text">
                <p>© Copyrights 2024. All rights reserved.</p>
              </div>
              <div class="design_by">
                <p>
                  Developed by
                  <a href="https://www.tectratechnologies.com/" target="blank">Tectra Technologies</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <!-- Footer-Section end -->

      <!-- go top button -->
      <div class="go_top" id="Gotop">
        <span><i class="icofont-arrow-up"></i></span>
      </div>
"""


def inject_blog_footer(text: str, prefix: str) -> str:
    if MAIN_SITE_FOOTER_MARKER in text:
        return text
    footer = build_footer(prefix)
    if WP_SITE_FOOTER_RE.search(text):
        return WP_SITE_FOOTER_RE.sub(footer + "\n", text, count=1)
    if "<!-- Main site header scripts -->" in text:
        return text.replace("<!-- Main site header scripts -->", footer + "\n<!-- Main site header scripts -->", 1)
    return text.replace("</body>", footer + "\n</body>", 1)


def standardize_page(rel_path: str, active: str | None) -> bool:
    path = SITE / rel_path
    if not path.exists():
        print(f"SKIP missing: {rel_path}")
        return False
    text = path.read_text(encoding="utf-8", errors="ignore")
    if not HEADER_RE.search(text):
        print(f"SKIP no header: {rel_path}")
        return False
    prefix = "../" if rel_path.startswith("company/") else ""
    header = build_header(prefix, rel_path, active)
    updated = HEADER_RE.sub(header, text, count=1)
    if updated == text:
        print(f"UNCHANGED: {rel_path}")
        return False
    path.write_text(updated, encoding="utf-8")
    print(f"OK: {rel_path}")
    return True


def blog_active(rel_path: str) -> str:
    slug = Path(rel_path).parent.name
    if slug.startswith("elderly-care-services-in-"):
        return "locations"
    return "blogs"


def standardize_blog_page(rel_path: str, active: str) -> bool:
    path = SITE / rel_path
    if not path.exists():
        print(f"SKIP missing: {rel_path}")
        return False
    text = path.read_text(encoding="utf-8", errors="ignore")
    prefix = site_prefix(rel_path)
    header = build_header(prefix, rel_path, active)
    if WP_BLOG_HEADER_RE.search(text):
        text = WP_BLOG_HEADER_RE.sub(header, text, count=1)
    elif HEADER_RE.search(text):
        text = HEADER_RE.sub(header, text, count=1)
    else:
        print(f"SKIP no header: {rel_path}")
        return False
    blog_main_header = f'<link rel="stylesheet" href="{prefix}css/blog-main-header.css"/>'
    blog_faq_css = f'<link rel="stylesheet" href="{prefix}css/blog-faq.css"/>'
    blog_faq_js = f'<script src="{prefix}js/blog-faq.js"></script>'
    main_js = f'<script src="{prefix}js/main.js"></script>'

    if "<!-- Main site header assets -->" not in text:
        text = text.replace("</head>", main_header_assets(prefix, blog_post=True) + "</head>", 1)
    elif "blog-faq.css" not in text:
        text = text.replace(blog_main_header, blog_main_header + "\n" + blog_faq_css, 1)

    if "<!-- Main site header scripts -->" not in text:
        text = text.replace("</body>", main_header_scripts(prefix, blog_post=True) + "</body>", 1)
    elif "blog-faq.js" not in text:
        text = text.replace(main_js, main_js + "\n" + blog_faq_js, 1)
    text = inject_blog_footer(text, prefix)
    path.write_text(text, encoding="utf-8")
    print(f"OK: {rel_path} (main site header)")
    return True


def standardize_blog_posts() -> int:
    count = 0
    for path in sorted(SITE.glob("blogs/**/index.html")):
        rel_path = path.relative_to(SITE).as_posix()
        if rel_path == "blogs/index.html":
            continue
        if standardize_blog_page(rel_path, blog_active(rel_path)):
            count += 1
    return count


def main():
    count = 0
    for rel_path, active in MAIN_PAGES.items():
        if standardize_page(rel_path, active):
            count += 1
    if standardize_blog_page("blogs/index.html", "blogs"):
        count += 1
    count += standardize_blog_posts()
    print(f"\nUpdated {count} page headers")


if __name__ == "__main__":
    main()
