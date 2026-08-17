import os
import re

# 10 Crisp SVG Icons with brand colors (#2786a5) and clean vector paths
STEP_SVGS = {
    "howstep1.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><polyline points="8 10 12 14 16 10"/><line x1="12" y1="6" x2="12" y2="14"/></svg>''',
    "howstep2.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>''',
    "howstep3.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>''',
    "howstep4.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>''',
    "howstep5.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>''',
    "howstep6.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>''',
    "howstep7.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>''',
    "howstep8.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>''',
    "howstep9.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>''',
    "howstep10.svg": '''<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2786a5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'''
}

def create_svgs():
    os.makedirs('images/icons', exist_ok=True)
    for fname, svg_content in STEP_SVGS.items():
        fp = os.path.join('images/icons', fname)
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Created {fp}")

def update_service_page_step_images(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Replace step 1 to 10 image src attributes with images/icons/howstepX.svg
    for i in range(1, 11):
        # Match img tags inside step containers
        pattern = re.compile(rf'(<h3>Step {i}:.*?</h3>)', re.IGNORECASE | re.DOTALL)
        
        # Replace broken img tag immediately preceding Step X header
        sub_pattern = re.compile(rf'<img[^>]*alt="Step {i}:[^"]*"[^>]*>', re.IGNORECASE)
        replacement = f'<img loading="lazy" src="images/icons/howstep{i}.svg" alt="Step {i} Icon" style="width: 48px; height: 48px; min-width: 48px; display: block;"/>'
        
        content = sub_pattern.sub(replacement, content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated all 10 step images in {filepath}")

def main():
    create_svgs()
    target_pages = [
        "physiotherapy-services-for-elders.html",
        "nursing-services-for-elders.html",
        "geriatric-care-services-for-elders.html",
        "assisted-living-support-services-for-elders.html"
    ]
    for p in target_pages:
        update_service_page_step_images(p)

if __name__ == '__main__':
    main()
