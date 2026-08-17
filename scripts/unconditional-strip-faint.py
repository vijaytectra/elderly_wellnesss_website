import os

def main():
    target_str1 = ' style="color: #f1f5f9 !important;"'
    target_str2 = ' style="color: #f1f5f9"'

    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fp = os.path.join(root, f)
                with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read()
                
                orig = content
                # Only strip if NOT in ew-blog-cta
                # We can split by <div class="ew-blog-cta
                parts = content.split('<div class="ew-blog-cta')
                new_parts = [parts[0].replace(target_str1, '').replace(target_str2, '')]
                for p in parts[1:]:
                    # The end of CTA box is </div>\s*</div> or similar, but CTA internal tags can keep style
                    # Actually, CTA box styles are handled by CSS! So we can safely remove inline style from ALL <p> tags!
                    cta_cleaned = p.replace(target_str1, '').replace(target_str2, '')
                    new_parts.append(cta_cleaned)
                
                content = '<div class="ew-blog-cta'.join(new_parts)

                if content != orig:
                    with open(fp, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f"Stripped faint inline style from: {fp}")

if __name__ == '__main__':
    main()
