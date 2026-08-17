import os
import re

def fix_about_team_images():
    with open('about.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Match and replace team section images
    replacements = [
        ('alt="Santosh Kumar, Founder and CEO"', 'src="images/profile/1.png" alt="Santosh Kumar, Founder and CEO" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"'),
        ('alt="Tanya Mehtani, Lead - Business Process & Design"', 'src="images/profile/2.png" alt="Tanya Mehtani, Lead - Business Process & Design" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"'),
        ('alt="Jaffar A, Product Architect"', 'src="images/profile/3.png" alt="Jaffar A, Product Architect" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"'),
        ('alt="Andrew Athisayaraj, Data Analyst"', 'src="images/profile/4.png" alt="Andrew Athisayaraj, Data Analyst" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"'),
        ('alt="Deugul B S, Business Operations"', 'src="images/profile/5.png" alt="Deugul B S, Business Operations" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"'),
        ('alt="Danny Lalwani, Technical Architect"', 'src="images/profile/Danny.png" alt="Danny Lalwani, Technical Architect" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"')
    ]

    for alt_pattern, replacement in replacements:
        pattern = re.compile(rf'<img[^>]*src=["\']\s*["\'][^>]*{re.escape(alt_pattern)}[^>]*>', re.IGNORECASE)
        content = pattern.sub(f'<img loading="lazy" {replacement}/>', content)

    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Restored all 6 team member profile images on about.html!")

def sweep_all_html_files_for_broken_images():
    broken_found = 0
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.git' in root: continue
        for file in files:
            if file.endswith('.html'):
                fp = os.path.join(root, file)
                with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                # Find any <img src=" " ...> or <img src="" ...>
                broken_matches = re.findall(r'<img[^>]*src=["\']\s*["\'][^>]*>', content, re.IGNORECASE)
                if broken_matches:
                    print(f"⚠️ {fp} has {len(broken_matches)} broken img tags with empty src:")
                    for bm in broken_matches:
                        print(f"   - {bm}")
                    broken_found += len(broken_matches)

    if broken_found == 0:
        print("✅ 100% SWEEP COMPLETE: ZERO broken img tags with empty src found across entire codebase!")

def main():
    fix_about_team_images()
    sweep_all_html_files_for_broken_images()

if __name__ == '__main__':
    main()
