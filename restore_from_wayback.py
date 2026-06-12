#!/usr/bin/env python3
"""Restore theelderlywellness.com from web.archive.org extracted files."""

import json
import re
import shutil
from pathlib import Path
from urllib.parse import unquote

ARCHIVE_WEB = Path(
    "/Users/akashsmac/Documents/june 12/elderly-wayback-20260412/full-wayback/web.archive.org/web"
)
SITE = Path(__file__).resolve().parent

PAGE_SNAPSHOTS = {
    "index.html": "20260412052019",
    "about.html": "20250513230139",
    "contact.html": "20250513235554",
    "physiotherapy-services-for-elders.html": "20250813170241",
    "nursing-services-for-elders.html": "20250813155435",
    "geriatric-care-services-for-elders.html": "20250813155435",
    "assisted-living-support-services-for-elders.html": "20250912120719",
    "board-of-advisors.html": "20251212161452",
    "investors.html": "20250322183949",
    "how-elderly-wellness-works.html": "20250520010311",
    "elderly-wellness.html": "20250618174205",
    "company/privacy-policy.html": "20250513233508",
    "company/terms-and-conditions.html": "20250912124004",
    "company/refund-and-cancellation-policies.html": "20250206131005",
    "blogs/index.html": "20260210130938",
}

BLOG_SKIP_PAGES = {"blogs/wp-json/index.html"}
BLOG_LISTING_PREFIXES = ("tag/", "category/", "page/", "author/")

ADVISOR_IMAGES = (
    "images/suresh.jpg",
    "images/jothi.jpeg",
    "images/Shri-harish.png",
    "images/Rajaraman-Sundaresan.png",
    "images/Deepa.png",
)
ADVISOR_STASH = SITE / "._advisor_images"
ICOFONT_FILES = ("icofont.woff2", "icofont.woff")
ICOFONT_STASH = SITE / "._icofont_fonts"
GP_THEME_DIR = SITE / "blogs/wp-content/themes/generatepress"
GP_THEME_STASH = SITE / "._generatepress_theme"
BLOG_UPLOADS_STASH = SITE / "._blog_uploads"
SERVICE_IMAGES_STASH = SITE / "._service_images"

TS_RE = re.compile(r"^(\d{14})(cs_|js_|im_|mp_|if_|id_)?$")
TS_PREFIX_RE = r"\d{14}(?:cs_|js_|im_|mp_|if_|id_)?"
WAYBACK_HEAD_RE = re.compile(
    r"(<head>)\s*<script[^>]*bundle-playback\.js[^>]*>.*?"
    r"<!-- End Wayback Rewrite JS Include -->\s*",
    re.DOTALL | re.IGNORECASE,
)
WAYBACK_FOOTER_RE = re.compile(r"\n<!--\s*\n\s*FILE ARCHIVED ON.*", re.DOTALL)
ARCHIVE_PATH_RE = re.compile(
    rf"(?:\.\./)*(?:{TS_PREFIX_RE}/)?https:/theelderlywellness\.com/([^\"'\s>)]+)"
)
TIMESTAMP_PATH_RE = re.compile(
    rf"(?:\.\./)+{TS_PREFIX_RE}/([^\"'\s>)]+)"
)
WAYBACK_URL_RE = re.compile(
    r"https://web\.archive\.org/web/\d+(?:[a-z]{2}_)?/https?://theelderlywellness\.com/?([^\"'\s>]*)"
)
WAYBACK_TEL_MAIL_RE = re.compile(
    r"https://web\.archive\.org/web/\d+/(tel:[^\"'\s>]+|mailto:[^\"'\s>]+)"
)
WAYBACK_EXTERNAL_RE = re.compile(
    r"https://web\.archive\.org/web/\d+(?:[a-z]{2}_)?/(https?://(?!theelderlywellness\.com)[^\"'\s>]+)"
)
WOMBAT_FOOTER_JS_RE = re.compile(r"/\*[\s\S]*?FILE ARCHIVED ON[\s\S]*?\*/", re.MULTILINE)
WOMBAT_PLAYBACK_RE = re.compile(r"/\*[\s\S]*?playback timings[\s\S]*?\*/", re.MULTILINE)
WOMBAT_CSS_FOOTER_RE = re.compile(
    r"/\*\s*[\r\n]+\s*FILE ARCHIVED ON[\s\S]*?\*/\s*/\*\s*[\r\n]+playback timings[\s\S]*?\*/",
    re.MULTILINE,
)
FONT_PRECONNECT_RE = re.compile(
    r'<link[^>]*rel="preconnect"[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*/>\s*',
    re.IGNORECASE,
)
FONT_STYLESHEET_RE = re.compile(
    r'<link[^>]*rel="stylesheet"[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*/>\s*|'
    r'<link[^>]*href="[^"]*fonts\.googleapis\.com[^"]*"[^>]*rel="stylesheet"[^>]*/>\s*',
    re.IGNORECASE,
)
GSTATIC_ARCHIVE_URL_RE = re.compile(
    rf"(?:\.\./)+{TS_PREFIX_RE}/https:/fonts\.gstatic\.com/([^)\"']+)"
)
MANROPE_FACE_RE = re.compile(
    r"@font-face\s*\{[^}]*font-family:\s*[\"']Manrope[\"'][^}]*\}\s*",
    re.IGNORECASE,
)

CORMORANT_CSS_SRC = (
    ARCHIVE_WEB
    / "20260412052019cs_/https:/fonts.googleapis.com"
    / "css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap.css"
)
MANROPE_CSS_SRC = (
    ARCHIVE_WEB
    / "20260412053147cs_/https:/fonts.googleapis.com"
    / "css?family=Manrope:200,300,regular,500,600,700,800&display=auto&ver=3.6.1.css"
)


def timestamp_from_path(path: Path) -> str:
    for part in path.parts:
        m = TS_RE.match(part)
        if m:
            return m.group(1)
    return "00000000000000"


def find_archive_html(page: str, timestamp: str | None) -> Path | None:
    if timestamp:
        candidate = ARCHIVE_WEB / timestamp / "https:/theelderlywellness.com" / page
        if candidate.exists():
            return candidate
    best = None
    best_ts = ""
    for p in ARCHIVE_WEB.rglob(f"theelderlywellness.com/{page}"):
        if not p.is_file() or p.suffix == ".orig":
            continue
        ts = timestamp_from_path(p)
        if ts > best_ts:
            best_ts = ts
            best = p
    return best


def site_relative_from_archive(path: Path) -> str | None:
    parts = path.parts
    for i, part in enumerate(parts):
        if part == "theelderlywellness.com":
            return "/".join(parts[i + 1 :])
    return None


def blog_html_score(path: Path) -> tuple[int, str]:
    text = path.read_text(encoding="utf-8", errors="ignore")[:150000]
    ts = timestamp_from_path(path)
    if "themes/jinko/" in text or "wp-theme-jinko" in text:
        return (2, ts)
    if "generatepress" in text:
        return (0, ts)
    return (1, ts)


def collect_all_blog_pages() -> dict[str, Path]:
    best: dict[str, tuple[tuple[int, str], Path]] = {}
    for p in ARCHIVE_WEB.rglob("theelderlywellness.com/blogs/**/index.html"):
        if not p.is_file() or p.name.endswith(".orig"):
            continue
        rel = site_relative_from_archive(p)
        if not rel or rel in BLOG_SKIP_PAGES:
            continue
        score = blog_html_score(p)
        if rel not in best or score > best[rel][0]:
            best[rel] = (score, p)
    return {k: v[1] for k, v in best.items()}


def is_blog_post_page(page: str) -> bool:
    if not page.startswith("blogs/") or not page.endswith("/index.html"):
        return False
    slug_path = page[len("blogs/") : -len("/index.html")]
    if not slug_path or "/" in slug_path:
        return False
    return not any(slug_path.startswith(p.rstrip("/")) for p in BLOG_LISTING_PREFIXES)


def local_blog_target(target: str) -> str:
    target = target.split("?")[0].split("#")[0].strip()
    if not target or target.startswith(("http://", "https://", "mailto:", "tel:", "#", "javascript:")):
        return target
    if target.startswith("/"):
        target = target.lstrip("/")
    if target in {"blogs", "blogs/"}:
        return "blogs/index.html"
    if target.endswith("/"):
        return target + "index.html"
    if not target.endswith((".html", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".css", ".js", ".xml", ".pdf")):
        return target + "/index.html"
    return target


def blog_uses_jinko(html: str) -> bool:
    return "wp-theme-jinko" in html


def fix_blog_theme(html: str, page: str) -> str:
    if not page.startswith("blogs/"):
        return html

    uses_jinko = blog_uses_jinko(html)

    html = re.sub(r'<link[^>]*dashicons[^>]*/>\s*', "", html, flags=re.IGNORECASE)
    html = re.sub(r'<script[^>]*google_gtagjs[^>]*>[\s\S]*?</script>\s*', "", html, flags=re.IGNORECASE)
    html = re.sub(r'<script id="google_gtagjs-inline">[\s\S]*?</script>\s*', "", html, flags=re.IGNORECASE)
    html = re.sub(r'href="\.\./https://', 'href="https://', html)
    html = re.sub(r'src="\.\./https://', 'src="https://', html)
    html = re.sub(
        r'<link[^>]*fonts\.googleapis\.com[^>]*/>\s*',
        f'<link rel="stylesheet" href="{rel_link(page, "css/manrope.css")}" media="all"/>\n',
        html,
        flags=re.IGNORECASE,
    )

    if uses_jinko:
        html = re.sub(r'<link[^>]*themes/generatepress[^>]*/>\s*', "", html, flags=re.IGNORECASE)
        html = re.sub(r'<script[^>]*themes/generatepress[^>]*></script>\s*', "", html, flags=re.IGNORECASE)
        if "themes/jinko/" not in html:
            jinko_block = (
                f'<link rel="stylesheet" href="{rel_link(page, "blogs/wp-content/themes/jinko/css/normalize.css")}" media="all"/>\n'
                f'<link rel="stylesheet" href="{rel_link(page, "blogs/wp-content/themes/jinko/style.css")}" media="all"/>\n'
                f'<link rel="stylesheet" href="{rel_link(page, "blogs/wp-content/themes/jinko/css/gutenberg.css")}" media="all"/>\n'
                f'<link rel="stylesheet" href="{rel_link(page, "blogs/wp-content/themes/jinko-child/style.css")}" media="all"/>\n'
            )
            marker = re.search(r'<link[^>]*contact-form-7[^>]*/>', html, re.IGNORECASE)
            if marker:
                html = html[: marker.start()] + jinko_block + html[marker.start() :]
            else:
                html = html.replace("</head>", jinko_block + "</head>", 1)
        if 'id="tfm-main-js"' not in html and "themes/jinko/js/main.js" not in html:
            script = (
                f'<script src="{rel_link(page, "blogs/wp-content/themes/jinko/js/main.js")}" '
                f'id="tfm-main-js"></script>\n'
            )
            html = html.replace("</body>", script + "</body>", 1)
    else:
        html = re.sub(r'<link[^>]*themes/jinko[^>]*/>\s*', "", html, flags=re.IGNORECASE)
        html = re.sub(
            r'<script[^>]*themes/jinko/js/main\.js[^>]*></script>\s*',
            "",
            html,
            flags=re.IGNORECASE,
        )
        gp_css = (
            f'<link rel="stylesheet" id="generate-style-css" '
            f'href="{rel_link(page, "blogs/wp-content/themes/generatepress/assets/css/main.min.css")}" media="all"/>\n'
        )
        if "themes/generatepress/assets/css/main.min.css" not in html:
            marker = re.search(r'<link[^>]*tfm-theme-boost[^>]*/>', html, re.IGNORECASE)
            if marker:
                insert_at = marker.end()
                html = html[:insert_at] + "\n" + gp_css + html[insert_at:]
            else:
                html = html.replace("</head>", gp_css + "</head>", 1)
        gp_js = (
            f'<script src="{rel_link(page, "blogs/wp-content/themes/generatepress/assets/js/menu.min.js")}" '
            f'id="generate-menu-js"></script>\n'
        )
        if 'id="generate-menu-js"' not in html and "generatepressMenu" in html:
            html = html.replace("</body>", gp_js + "</body>", 1)

    return html


def normalize_site_links(html: str, page: str) -> str:
    def fix_blogs_href(m: re.Match) -> str:
        quote = m.group(1)
        target = local_blog_target(m.group(2))
        return f"href={quote}{rel_link(page, target)}{quote}"

    html = re.sub(r'href=(["\'])(blogs/[^"\']*)\1', fix_blogs_href, html)

    if not page.startswith("blogs/"):
        return html

    def fix_blog_slug_href(m: re.Match) -> str:
        quote = m.group(1)
        target = m.group(2)
        if (
            not target
            or target.startswith(("#", "http://", "https://", "mailto:", "tel:", "javascript:"))
            or "/" in target
            or target.endswith((".html", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".css", ".js"))
            or any(target.startswith(prefix) for prefix in ("tag/", "category/", "page/", "author/", "wp-"))
        ):
            return m.group(0)
        fixed = local_blog_target(f"blogs/{target}")
        return f"href={quote}{rel_link(page, fixed)}{quote}"

    return re.sub(r'href=(["\'])([^"\']+?)\1', fix_blog_slug_href, html)


def extract_blog_meta(html: str, page: str) -> dict | None:
    if not is_blog_post_page(page):
        return None
    title_m = re.search(r"<title>([^<]+)</title>", html, re.IGNORECASE)
    desc_m = re.search(r'<meta name="description" content="([^"]*)"', html, re.IGNORECASE)
    date_m = re.search(
        r'<meta property="article:published_time" content="([^"]+)"',
        html,
        re.IGNORECASE,
    )
    slug = page[len("blogs/") : -len("/index.html")]
    image_m = re.search(r'<meta property="og:image" content="([^"]+)"', html, re.IGNORECASE)
    image = ""
    if image_m:
        image = image_m.group(1).split("?")[0]
        if image.startswith("../"):
            image = "blogs/" + image[3:]
        elif image.startswith("wp-content/"):
            image = "blogs/" + image
        image = "/" + image.lstrip("/")
    return {
        "title": (title_m.group(1).split("|")[0].strip() if title_m else slug),
        "description": desc_m.group(1) if desc_m else "",
        "date": date_m.group(1) if date_m else "",
        "link": "/" + page,
        "slug": slug,
        "image": image,
    }


def collect_all_assets() -> dict[str, Path]:
    best: dict[str, tuple[str, Path]] = {}
    skip_ext = {".orig"}
    for f in ARCHIVE_WEB.rglob("*"):
        if not f.is_file() or f.name in {".DS_Store"}:
            continue
        if f.suffix in skip_ext or f.name.endswith(".orig"):
            continue
        rel = site_relative_from_archive(f)
        if not rel:
            continue
        if "/fonts/" in rel and rel.endswith(".html"):
            continue
        ts = timestamp_from_path(f)
        if rel not in best or ts > best[rel][0]:
            best[rel] = (ts, f)
    return {k: v[1] for k, v in best.items()}


def gstatic_site_path(src: Path) -> str:
    parts = src.parts
    for i, part in enumerate(parts):
        if part == "fonts.gstatic.com":
            return "fonts/gstatic/" + "/".join(parts[i + 1 :])
    return "fonts/gstatic/" + src.name


def find_gstatic_file(encoded_path: str) -> Path | None:
    decoded = unquote(encoded_path)
    best = None
    best_ts = ""
    needle = decoded.split("?")[0]
    for p in ARCHIVE_WEB.rglob(f"fonts.gstatic.com/{needle}*"):
        if not p.is_file() or p.name.endswith(".orig"):
            continue
        ts = timestamp_from_path(p)
        if ts > best_ts:
            best_ts = ts
            best = p
    return best


def gstatic_urls_in_css(css: str) -> set[str]:
    return set(GSTATIC_ARCHIVE_URL_RE.findall(css))


def rewrite_timestamp_target(path: str, from_file: str) -> str:
    clean = path.split("?")[0]
    if clean.startswith("https:/") and "theelderlywellness.com" not in clean:
        return path.replace("https:/", "https://", 1)
    if clean.startswith("https:/fonts.googleapis.com/"):
        if "Cormorant" in path or "cormorant" in path.lower():
            return rel_link(from_file, "css/cormorant-garamond.css")
        if "Manrope" in path or "manrope" in path.lower():
            return rel_link(from_file, "css/manrope.css")
        return path.replace("https:/", "https://")
    if clean.startswith("https:/fonts.gstatic.com/"):
        src = find_gstatic_file(path[len("https:/fonts.gstatic.com/") :])
        if src:
            return rel_link(from_file, gstatic_site_path(src))
        return rel_link(from_file, "fonts/gstatic/" + unquote(path[len("https:/fonts.gstatic.com/") :]))
    if clean.startswith("https:/theelderlywellness.com/"):
        return rel_link(from_file, clean[len("https:/theelderlywellness.com/") :])
    return rel_link(from_file, clean)


def rel_link(from_page: str, target: str) -> str:
    from_dir = Path(from_page).parent
    to_path = Path(target)
    from_parts = [] if from_dir.as_posix() == "." else from_dir.as_posix().split("/")
    to_parts = to_path.as_posix().split("/")
    common = 0
    for a, b in zip(from_parts, to_parts):
        if a == b:
            common += 1
        else:
            break
    ups = [".."] * (len(from_parts) - common)
    return "/".join(ups + to_parts[common:]) if ups else "/".join(to_parts[common:])


def extract_font_links(html: str, page: str) -> str:
    preconnects: list[str] = []
    for link in FONT_PRECONNECT_RE.findall(html):
        link = re.sub(
            r"https://web\.archive\.org/web/\d+/https://fonts\.(googleapis|gstatic)\.com/",
            r"https://fonts.\1.com/",
            link,
        )
        if link not in preconnects:
            preconnects.append(link)
    stylesheet = FONT_STYLESHEET_RE.search(html)
    if not stylesheet:
        return ""
    sheet = (
        f'<link href="{rel_link(page, "css/cormorant-garamond.css")}" rel="stylesheet"/>'
        if "Cormorant" in stylesheet.group(0) or "cormorant" in stylesheet.group(0).lower()
        else stylesheet.group(0).strip()
    )
    return "\n    ".join(preconnects + [sheet])


def clean_html(html: str, page: str) -> str:
    html = WAYBACK_HEAD_RE.sub(r"\1\n", html)
    html = WAYBACK_FOOTER_RE.sub("", html)
    font_links = extract_font_links(html, page)

    def arch_asset(m: re.Match) -> str:
        return rel_link(page, m.group(1).split("?")[0])

    def wayback_internal(m: re.Match) -> str:
        return rel_link(page, m.group(1).split("?")[0])

    def ts_asset(m: re.Match) -> str:
        return rewrite_timestamp_target(m.group(1), page)

    html = WAYBACK_TEL_MAIL_RE.sub(r"\1", html)
    html = WAYBACK_URL_RE.sub(wayback_internal, html)
    html = WAYBACK_EXTERNAL_RE.sub(r"\1", html)
    html = ARCHIVE_PATH_RE.sub(arch_asset, html)
    html = TIMESTAMP_PATH_RE.sub(ts_asset, html)

    html = re.sub(
        r"<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->",
        "",
        html,
        flags=re.DOTALL,
    )
    if font_links and "cormorant-garamond.css" not in html:
        html = html.replace(
            '<link rel="stylesheet" href="css/responsive.css"/>',
            '<link rel="stylesheet" href="css/responsive.css"/>\n    ' + font_links,
            1,
        )
    html = re.sub(
        r"<noscript><iframe[^>]*googletagmanager.*?</iframe></noscript>",
        "",
        html,
        flags=re.DOTALL | re.IGNORECASE,
    )
    html = re.sub(
        r"<script async src=\"[^\"]*googletagmanager[^\"]*\"></script>",
        "",
        html,
        flags=re.IGNORECASE,
    )
    html = re.sub(
        r"<script>\s*window\.dataLayer[\s\S]*?</script>",
        "",
        html,
        count=2,
    )
    html = re.sub(
        r"https://web\.archive\.org/web/\d+(?:[a-z]{2}_)?/https://schema\.org",
        "https://schema.org",
        html,
    )
    html = re.sub(
        r"https://web\.archive\.org/web/\d+/https://fonts\.googleapis\.com/",
        "https://fonts.googleapis.com/",
        html,
    )
    html = re.sub(
        r"https://web\.archive\.org/web/\d+/https://fonts\.gstatic\.com/",
        "https://fonts.gstatic.com/",
        html,
    )
    html = re.sub(r'href="blogs"', 'href="blogs/index.html"', html)
    html = re.sub(r"content=\"theelderlywellness\.com\"", 'content="https://theelderlywellness.com/"', html)
    html = normalize_site_links(html, page)
    html = fix_blog_theme(html, page)
    html = re.sub(
        r'((?:src|href)=["\'][^"\']*?)\.(png|jpe?g|gif|webp|svg)\.html(["\'])',
        r"\1.\2\3",
        html,
        flags=re.IGNORECASE,
    )
    return html


def clean_css(css: str, css_file: str) -> str:
    def arch_asset(m: re.Match) -> str:
        return rel_link(css_file, m.group(1).split("?")[0])

    def ts_asset(m: re.Match) -> str:
        return rewrite_timestamp_target(m.group(1), css_file)

    def gstatic_asset(m: re.Match) -> str:
        src = find_gstatic_file(m.group(1))
        rel = rel_link(css_file, gstatic_site_path(src)) if src else rel_link(
            css_file, "fonts/gstatic/" + unquote(m.group(1))
        )
        return f"url({rel})"

    css = WOMBAT_CSS_FOOTER_RE.sub("", css)
    css = ARCHIVE_PATH_RE.sub(arch_asset, css)
    css = TIMESTAMP_PATH_RE.sub(ts_asset, css)
    css = GSTATIC_ARCHIVE_URL_RE.sub(gstatic_asset, css)
    css = re.sub(
        r"url\([^)]*icofont\.woff2[^)]*\)",
        "url(../fonts/icofont.woff2)",
        css,
    )
    css = re.sub(
        r"url\([^)]*icofont\.woff\)(?!2)",
        "url(../fonts/icofont.woff)",
        css,
    )
    css = css.replace(".png.html)", ".png)")
    css = css.replace("yellow_dotes_tr.png", "yellow_dotes.png")
    if css_file == "css/style.css":
        if "@keyframes preloader_hide" not in css:
            css = css.replace(
                "/* -------------Preloader-Css-Start-------------- */",
                "/* -------------Preloader-Css-Start-------------- */\n"
                "@keyframes preloader_hide {\n"
                "  to { opacity: 0; visibility: hidden; pointer-events: none; }\n"
                "}\n",
                1,
            )
        if "animation: preloader_hide" not in css:
            css = css.replace(
                "#preloader {\n  position: fixed;",
                "#preloader {\n  animation: preloader_hide 0.4s ease 0.8s forwards;\n  position: fixed;",
                1,
            )
        css = MANROPE_FACE_RE.sub("", css)
        css = re.sub(
            r"/\* @import url\([^)]*Manrope[^)]*\); \*/\s*",
            "",
            css,
        )
        css = css.replace(
            "/* --------Font--------------- */",
            '/* --------Font--------------- */\n@import url("manrope.css");',
            1,
        )
    return css.strip() + "\n"


WOMBAT_PREAMBLE_RE = re.compile(
    r"^var _____WB\$wombat\$assign\$function_____=[\s\S]*?"
    r'let opener = _____WB\$wombat\$assign\$function_____\("opener"\);\n?',
    re.MULTILINE,
)


def strip_wombat_js(js: str) -> str:
    js = WOMBAT_FOOTER_JS_RE.sub("", js)
    js = WOMBAT_PLAYBACK_RE.sub("", js)
    if "_____WB$wombat" not in js:
        return js.rstrip() + "\n"

    js = WOMBAT_PREAMBLE_RE.sub("", js)

    opener_idx = js.find('opener = _____WB$wombat$assign$function_____("opener")')
    if opener_idx >= 0:
        start = js.find("\n", opener_idx)
        if start >= 0:
            js = js[start + 1 :]

    markers = [
        "function preloader_fade",
        "function ",
        "!function",
        "(function(",
        "async function",
        "/**!",
        "/*!",
    ]
    best = len(js)
    for marker in markers:
        idx = js.find(marker)
        if 0 <= idx < best:
            best = idx
    if best < len(js):
        js = js[best:]

    js = re.sub(r"\n}\s*$", "", js.rstrip())
    return js.strip() + "\n"


def clean_js(js: str, filename: str) -> str:
    js = strip_wombat_js(js)
    js = ARCHIVE_PATH_RE.sub(lambda m: m.group(1).split("?")[0], js)
    js = TIMESTAMP_PATH_RE.sub(lambda m: m.group(1).split("?")[0], js)
    js = WAYBACK_EXTERNAL_RE.sub(r"\1", js)
    if filename == "main.js":
        js = js.replace(
            'document.getElementById("view-count").innerText = `${views} Views`;',
            'const viewCountEl = document.getElementById("view-count");\n'
            "  if (viewCountEl) viewCountEl.innerText = `${views} Views`;",
        )
    if filename == "article.js":
        js = js.replace('getElementById("blogs")', 'getElementById("blog-posts")')
        js = """async function loadBlogs() {
  const blogContainer = document.getElementById("blog-posts");
  try {
    const response = await fetch("blogs/blog-manifest.json");
    const posts = await response.json();
    posts.slice(0, 3).forEach((item) => {
      const date = item.date
        ? new Date(item.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "";
      const image = item.image
        ? `<a href="${item.link}" class="img"><img src="${item.image.replace(/^\\//, "")}" alt="${item.title}"/></a>`
        : "";
      blogContainer.innerHTML += `
          <div class="blog_post" data-aos="fade-up" data-aos-duration="1500">
            ${image}
            <div class="text">
              <ul class="blog_info">
                <li>${date}</li>
                <li>Blogs</li>
              </ul>
              <h3><a href="${item.link}">${item.title}</a></h3>
              <div class="tag_more">
                <span class="tag">Blogs</span>
                <a href="${item.link}">Read more <i class="icofont-arrow-right"></i></a>
              </div>
            </div>
          </div>`;
    });
  } catch (error) {
    blogContainer.innerHTML = "<p>Failed to load blog posts.</p>";
  }
}

loadBlogs();
"""
    return js.strip() + "\n"


def copy_font_assets(copied: list[str]) -> None:
    font_css = {
        "css/cormorant-garamond.css": CORMORANT_CSS_SRC,
        "css/manrope.css": MANROPE_CSS_SRC,
    }
    needed_gstatic: set[str] = set()
    for dest_rel, src in font_css.items():
        if not src.exists():
            print(f"MISSING font css: {src}")
            continue
        dest = SITE / dest_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        text = src.read_text(encoding="utf-8", errors="ignore")
        needed_gstatic.update(gstatic_urls_in_css(text))
        dest.write_text(clean_css(text, dest_rel), encoding="utf-8")
        copied.append(dest_rel)

    for encoded in sorted(needed_gstatic):
        src = find_gstatic_file(encoded)
        if not src:
            print(f"MISSING gstatic font: {encoded[:80]}")
            continue
        rel = gstatic_site_path(src)
        dest = SITE / rel
        if dest.exists():
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        copied.append(rel)


def stash_generatepress_theme():
    if not GP_THEME_DIR.exists():
        return
    if GP_THEME_STASH.exists():
        shutil.rmtree(GP_THEME_STASH)
    shutil.copytree(GP_THEME_DIR, GP_THEME_STASH)


def restore_generatepress_theme():
    if not GP_THEME_STASH.exists():
        return
    GP_THEME_DIR.parent.mkdir(parents=True, exist_ok=True)
    if GP_THEME_DIR.exists():
        shutil.rmtree(GP_THEME_DIR)
    shutil.copytree(GP_THEME_STASH, GP_THEME_DIR)
    print("OK: generatepress theme assets")


def stash_icofont_fonts():
    ICOFONT_STASH.mkdir(exist_ok=True)
    fonts_dir = SITE / "fonts"
    if not fonts_dir.exists():
        return
    for name in ICOFONT_FILES:
        src = fonts_dir / name
        if src.exists() and src.stat().st_size > 10000:
            shutil.copy2(src, ICOFONT_STASH / name)


def restore_icofont_fonts():
    if not ICOFONT_STASH.exists():
        return
    dest_dir = SITE / "fonts"
    dest_dir.mkdir(parents=True, exist_ok=True)
    for name in ICOFONT_FILES:
        src = ICOFONT_STASH / name
        if src.exists():
            shutil.copy2(src, dest_dir / name)
            print(f"OK: font {name}")


def stash_advisor_images():
    ADVISOR_STASH.mkdir(exist_ok=True)
    for rel in ADVISOR_IMAGES:
        src = SITE / rel
        if src.exists() and src.stat().st_size > 3000:
            shutil.copy2(src, ADVISOR_STASH / src.name)


def restore_advisor_images():
    if not ADVISOR_STASH.exists():
        return
    for rel in ADVISOR_IMAGES:
        src = ADVISOR_STASH / Path(rel).name
        if not src.exists():
            continue
        dest = SITE / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        print(f"OK: advisor image {rel}")


def wipe_site():
    keep = {
        "restore_from_wayback.py",
        "restore_blog_images.py",
        "restore_service_images.py",
        "standardize_headers.py",
        ADVISOR_STASH.name,
        ICOFONT_STASH.name,
        GP_THEME_STASH.name,
        BLOG_UPLOADS_STASH.name,
        SERVICE_IMAGES_STASH.name,
        "assets",
    }
    for item in list(SITE.iterdir()):
        if item.name in keep:
            continue
        if item.is_dir():
            shutil.rmtree(item)
        else:
            item.unlink()


def main():
    stash_advisor_images()
    stash_icofont_fonts()
    stash_generatepress_theme()
    wipe_site()
    assets = collect_all_assets()
    copied = []

    for rel, src in sorted(assets.items()):
        if rel.endswith(".html"):
            continue
        dest = SITE / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        copied.append(rel)

        if rel.endswith(".css"):
            text = dest.read_text(encoding="utf-8", errors="ignore")
            dest.write_text(clean_css(text, rel), encoding="utf-8")
        elif rel.endswith(".js"):
            text = dest.read_text(encoding="utf-8", errors="ignore")
            dest.write_text(clean_js(text, Path(rel).name), encoding="utf-8")

    copy_font_assets(copied)

    blog_pages = collect_all_blog_pages()
    pages_to_restore: dict[str, Path | None] = {}
    for page, ts in PAGE_SNAPSHOTS.items():
        pages_to_restore[page] = find_archive_html(page, ts)
    for page, src in sorted(blog_pages.items()):
        if page not in pages_to_restore:
            pages_to_restore[page] = src

    restored_pages = []
    blog_manifest = []
    for page, src in sorted(pages_to_restore.items()):
        if not src or not src.exists():
            print(f"MISSING: {page}")
            continue
        dest = SITE / page
        dest.parent.mkdir(parents=True, exist_ok=True)
        html = src.read_text(encoding="utf-8", errors="ignore")
        cleaned = clean_html(html, page)
        dest.write_text(cleaned, encoding="utf-8")
        restored_pages.append(page)
        meta = extract_blog_meta(cleaned, page)
        if meta:
            blog_manifest.append(meta)
        ts = timestamp_from_path(src)
        if page.startswith("blogs/"):
            print(f"OK: {page} <- {ts}")
        else:
            print(f"OK: {page} <- {ts}")

    blog_manifest.sort(key=lambda x: x.get("date", ""), reverse=True)
    manifest_path = SITE / "blogs/blog-manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(blog_manifest, indent=2), encoding="utf-8")

    blog_posts = [p for p in restored_pages if is_blog_post_page(p)]
    manifest = {
        "restored_pages": restored_pages,
        "blog_pages": [p for p in restored_pages if p.startswith("blogs/")],
        "blog_posts": blog_posts,
        "asset_count": len(copied),
        "primary_snapshot": "20260412052019",
    }
    (SITE / "restore_manifest.json").write_text(json.dumps(manifest, indent=2))
    restore_icofont_fonts()
    restore_generatepress_theme()
    restore_advisor_images()
    stash_icofont_fonts()
    stash_generatepress_theme()
    stash_advisor_images()
    from standardize_headers import main as standardize_headers
    from restore_blog_images import main as restore_blog_images
    from restore_service_images import main as restore_service_images

    standardize_headers()
    restore_blog_images()
    restore_service_images()
    print(
        f"\nRestored {len(restored_pages)} pages "
        f"({len(blog_posts)} blog posts, {len(manifest['blog_pages'])} total blog pages), "
        f"{len(copied)} assets"
    )


if __name__ == "__main__":
    main()
