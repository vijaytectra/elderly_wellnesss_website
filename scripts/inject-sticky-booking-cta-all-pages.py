import os

FLOATING_CTA_HTML = '''
<!-- Sticky Floating Quick-Booking CTA (Rule: Booking button visible or within 1 scroll at every point) -->
<div class="ew-sticky-booking-bar d-md-none" style="position: fixed; bottom: 0; left: 0; right: 0; background: #ffffff; padding: 12px 16px; border-top: 1px solid #e2e8f0; box-shadow: 0 -4px 16px rgba(0,0,0,0.08); z-index: 9999; display: flex; gap: 10px; align-items: center;">
  <a href="contact.html" class="btn puprple_btn" style="flex: 1; text-align: center; padding: 10px 0; font-size: 14px; font-weight: 700;">Book Care Now</a>
  <a href="tel:+919944890577" class="btn black_btn" style="padding: 10px 16px; font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;"><i class="icofont-phone"></i> Call</a>
</div>
'''

TARGET_PAGES = [
    "index.html",
    "about.html",
    "contact.html",
    "pricing.html",
    "services.html",
    "physiotherapy-services-for-elders.html",
    "nursing-services-for-elders.html",
    "geriatric-care-services-for-elders.html",
    "assisted-living-support-services-for-elders.html"
]

def process_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    if 'ew-sticky-booking-bar' not in content:
        if '</body>' in content:
            content = content.replace('</body>', FLOATING_CTA_HTML + '\n</body>')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Injected sticky booking bar into: {filepath}")

def main():
    for p in TARGET_PAGES:
        process_file(p)

if __name__ == '__main__':
    main()
