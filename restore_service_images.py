#!/usr/bin/env python3
"""Restore service page images from archived site assets and add values section."""

from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path

SITE = Path(__file__).resolve().parent
STASH = SITE / "._service_images"

SERVICE_PAGES = (
    "physiotherapy-services-for-elders.html",
    "nursing-services-for-elders.html",
    "geriatric-care-services-for-elders.html",
    "assisted-living-support-services-for-elders.html",
)

PHYSIO_ICONS: dict[str, str] = {
    "simplified-discovery-process.png": "images/feature1a.png",
    "affordable-transparent-care.png": "images/feature2a.png",
    "reliable-long-term-support.png": "images/feature3a.png",
    "quality-you-can-count-on.png": "images/service1.png",
    "longevity-of-care.png": "images/service2.png",
    "download-the-elderly-wellness-app.png": "images/mobileicon.png",
    "sign-up-and-create-your-account.png": "images/mobileicon.png",
    "select-the-service-you-need.png": "images/googleplay.png",
    "connect-with-a-specialist.png": "images/howstep1.png",
    "assignment-of-a-suitable-service-provider.png": "images/howstep1.png",
    "confirm-the-service-provider-s-details.png": "images/howstep2.png",
    "Secure-Payment.png": "images/googleplay.png",
    "track-the-status-of-your-booking.png": "images/howstep3.png",
    "receive-care-at-home.png": "images/howstep2.png",
    "rate-and-review-the-service.png": "images/howstep3.png",
}

BLOG = "blogs/wp-content/uploads"

PHYSIO_PHOTOS: dict[str, str] = {
    "images/services/banner-left.png": "images/home/Physiotherapy.png",
    "images/services/1.png": f"{BLOG}/2025/12/exercise-for-seniors-over-75.png",
    "images/services/2.png": f"{BLOG}/2025/09/Osteoporosis-in-Senior-Citizens-.png",
    "images/services/3.png": f"{BLOG}/2025/09/senior-workout-indian.png",
    "images/services/4.png": "images/abt-slide3.jpg",
}

NURSING_PHOTOS: dict[str, str] = {
    "images/services/nursing/1.png": "images/home/Nurse.png",
    "images/services/nursing/2.png": f"{BLOG}/2025/06/Seniors-Regular-Checkups.png",
    "images/services/nursing/3.png": (
        f"{BLOG}/2025/04/How-Proper-Meals-and-Medication-Assistance-Improve-Senior-Health-and-Well-Being-1.png"
    ),
    "images/services/nursing/4.png": (
        f"{BLOG}/2025/12/Caregiver-for-seniors-in-Chennai-assisting-elderly-parent-at-home.png"
    ),
    "images/services/nursing/5.png": "images/abt-slide2.jpg",
}

GERIATRIC_PHOTOS: dict[str, str] = {
    "images/services/geriatric/1.png": "images/home/geriatric-care.png",
    "images/services/geriatric/2.png": (
        f"{BLOG}/2025/04/alzheimers-and-dementia-care-services-for-senior-citizens.png"
    ),
    "images/services/geriatric/3.png": f"{BLOG}/2025/06/Family-Involvement-for-Senior-Citizens.png",
    "images/services/geriatric/4.png": f"{BLOG}/2025/05/Age-Related-Health-Conditions.png",
    "images/services/geriatric/5.png": "images/abt-slide4.jpg",
}

ASSISTED_PHOTOS: dict[str, str] = {
    "images/services/assisted/1.png": "images/home/assisted-living-care.png",
    "images/services/assisted/2.png": f"{BLOG}/2025/04/Activities-of-Daily-Living.png",
    "images/services/assisted/3.png": f"{BLOG}/2025/04/essential-grooming-hygiene-tips-elderly.png",
    "images/services/assisted/4.png": "images/blogs/living-care2.webp",
    "images/services/assisted/5.png": f"{BLOG}/2025/04/Home-Modifications-for-Elder-Safety.png",
}

OURVALUE_PHOTOS: dict[str, str] = {
    "images/ourvalue_1.png": "images/profile/1.png",
    "images/ourvalue_2.png": "images/profile/2.png",
    "images/ourvalue_3.png": "images/profile/3.png",
}

OUR_VALUES_SECTION = """      <!-- Our Value Section Start -->
      <section class="our_value_section home_feature white_text row_am">
        <div class="dotes_blue">
          <img src="images/blue_dotes.png" alt="image"/>
        </div>
        <div class="container">
          <div class="section_title" data-aos="fade-up" data-aos-duration="1500">
            <span class="title_badge">Our values</span>
            <h2><span>Our values</span> driven by relations</h2>
          </div>
          <div class="value_slider" data-aos="fade-in" data-aos-duration="1500">
            <div class="owl-carousel owl-theme" id="value_slider">
              <div class="item">
                <div class="value_block">
                  <div class="icon">
                    <img src="images/ourvalue_1.png" alt="Skilled Team"/>
                  </div>
                  <div class="text">
                    <h3>Skilled Team</h3>
                    <p>
                      The Elderly app boasts a skilled team dedicated to
                      enhancing elder care through expertise and innovation.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="value_block">
                  <div class="icon">
                    <img src="images/ourvalue_2.png" alt="Creative Thinking"/>
                  </div>
                  <div class="text">
                    <h3>Creative Thinking</h3>
                    <p>
                      Inspired by empathy, Elderly fosters creative thinking to
                      revolutionize elder care.
                    </p>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="value_block">
                  <div class="icon">
                    <img src="images/ourvalue_3.png" alt="Growth Support"/>
                  </div>
                  <div class="text">
                    <h3>Growth Support</h3>
                    <p>
                      The Elderly app offers tailored growth support, enhancing
                      the elder-caregiver experience with personalized resources
                      and guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Our Value Section End -->

"""


def copy_image(src_rel: str, dest_rel: str) -> bool:
    src = SITE / src_rel
    dest = SITE / dest_rel
    if not src.exists():
        print(f"SKIP missing source: {src_rel}")
        return False
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix.lower() in {".jpg", ".jpeg", ".webp"} and dest.suffix.lower() == ".png":
        subprocess.run(
            ["sips", "-s", "format", "png", str(src), "--out", str(dest)],
            check=True,
            capture_output=True,
        )
    else:
        shutil.copy2(src, dest)
    return True


def restore_image_assets() -> int:
    count = 0
    mappings: dict[str, str] = {}
    mappings.update(PHYSIO_PHOTOS)
    mappings.update(NURSING_PHOTOS)
    mappings.update(GERIATRIC_PHOTOS)
    mappings.update(ASSISTED_PHOTOS)
    mappings.update(OURVALUE_PHOTOS)
    for dest, src in mappings.items():
        if copy_image(src, dest):
            count += 1
            print(f"OK: {dest} <- {src}")
    icons_dir = SITE / "images/services/physio-icons"
    icons_dir.mkdir(parents=True, exist_ok=True)
    for name, src in PHYSIO_ICONS.items():
        if copy_image(src, f"images/services/physio-icons/{name}"):
            count += 1
            print(f"OK: physio-icons/{name} <- {src}")
    return count


def fix_image_paths(html: str) -> str:
    html = re.sub(
        r'images/services/physio-icons/([a-zA-Z0-9_-]+)\.png(?:\.html)?',
        r"images/services/physio-icons/\1.png",
        html,
    )
    for folder in ("", "nursing/", "geriatric/", "assisted/"):
        html = re.sub(
            rf'images/services/{folder}(\d+)\.webp(?:\.html)?',
            rf"images/services/{folder}\1.png",
            html,
        )
    html = re.sub(
        r'images/services/banner-left\.webp(?:\.html)?',
        "images/services/banner-left.png",
        html,
    )
    html = re.sub(r'images/ourvalue_(\d)\.png\.html', r"images/ourvalue_\1.png", html)
    return html


def add_values_section(html: str) -> str:
    if "Our values</span> driven by relations" in html:
        return html
    marker = "      <!-- faq-section -->"
    if marker not in html:
        return html
    return html.replace(marker, OUR_VALUES_SECTION + marker, 1)


def stash_images() -> None:
    STASH.mkdir(exist_ok=True)
    for pattern in (
        "images/services/**/*.png",
        "images/ourvalue_*.png",
    ):
        for path in SITE.glob(pattern):
            if not path.is_file():
                continue
            rel = path.relative_to(SITE)
            dest = STASH / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, dest)


def restore_stashed_images() -> None:
    if not STASH.exists():
        return
    for path in STASH.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(STASH)
        dest = SITE / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists() or dest.stat().st_size < path.stat().st_size:
            shutil.copy2(path, dest)


def main() -> None:
    restore_stashed_images()
    restored = restore_image_assets()
    pages = list(SERVICE_PAGES) + ["investors.html"]
    for page in pages:
        path = SITE / page
        if not path.exists():
            continue
        html = path.read_text(encoding="utf-8", errors="ignore")
        updated = fix_image_paths(html)
        if page in SERVICE_PAGES:
            updated = add_values_section(updated)
        if updated != html:
            path.write_text(updated, encoding="utf-8")
            print(f"OK: updated {page}")
    stash_images()
    print(f"\nRestored {restored} service images")


if __name__ == "__main__":
    main()
