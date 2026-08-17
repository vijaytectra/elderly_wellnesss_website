import os
import shutil
import re

def main():
    # 1. Ensure images/icons folder exists
    os.makedirs('images/icons', exist_ok=True)

    # 2. Copy vector SVGs to root images directory as well for backward compatibility
    for fname in ['feature-icon1.svg', 'feature-icon2.svg', 'feature-icon3.svg']:
        src = os.path.join('images/icons', fname)
        dst = os.path.join('images', fname)
        if os.path.exists(src):
            shutil.copy(src, dst)
            print(f"Copied vector SVG to {dst}")

    # 3. Update all HTML files to use images/icons/*.svg and add aria-hidden="true" to decorative icons
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read()
                
                orig = content

                # Update feature icon src paths to images/icons/
                content = content.replace('images/feature-icon1.svg', 'images/icons/feature-icon1.svg')
                content = content.replace('images/feature-icon2.svg', 'images/icons/feature-icon2.svg')
                content = content.replace('images/feature-icon3.svg', 'images/icons/feature-icon3.svg')

                # Ensure aria-hidden="true" on decorative icon images and icofont <i> elements
                content = re.sub(
                    r'<img([^>]*src=["\']images/icons/[^"\']*["\'][^>]*)>',
                    lambda m: f'<img{m.group(1)} aria-hidden="true">' if 'aria-hidden' not in m.group(1) else m.group(0),
                    content
                )

                content = re.sub(
                    r'<i class="(icofont-[^"]*)"([^>]*)>',
                    lambda m: f'<i class="{m.group(1)}"{m.group(2)} aria-hidden="true">' if 'aria-hidden' not in m.group(2) else m.group(0),
                    content
                )

                if content != orig:
                    with open(fp, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f"Updated vector icons & aria-hidden in: {fp}")

    # 4. Remove old PNG physio-icons directory if it exists
    physio_png_dir = os.path.join('images', 'services', 'physio-icons')
    if os.path.exists(physio_png_dir):
        shutil.rmtree(physio_png_dir)
        print(f"Deleted legacy PNG icons directory: {physio_png_dir}")

if __name__ == '__main__':
    main()
