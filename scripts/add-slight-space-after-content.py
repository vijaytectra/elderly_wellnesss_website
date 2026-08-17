import re

def main():
    with open('about.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update abt_text row to have slight space after content (margin-bottom: 48px, padding-bottom: 16px)
    content = content.replace(
        'style="justify-content: center; margin-top: 16px; margin-bottom: 24px; padding-top: 0;"',
        'style="justify-content: center; margin-top: 16px; margin-bottom: 48px; padding-bottom: 16px;"'
    )

    # 2. Update about_us_section bottom padding
    content = content.replace(
        '<section class="about_us_section" style="padding-top: 40px; padding-bottom: 20px;">',
        '<section class="about_us_section" style="padding-top: 40px; padding-bottom: 40px;">'
    )

    # 3. Update text_list_section top margin so badge has breathing room
    content = content.replace(
        '<div class="text_list_section" style="margin-top: 10px; padding: 20px 0;"',
        '<div class="text_list_section" style="margin-top: 32px; padding: 24px 0;"'
    )

    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Added slight space after content on about.html!")

if __name__ == '__main__':
    main()
