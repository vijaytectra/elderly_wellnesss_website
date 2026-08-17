import re

def fix_h1_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('<h2 class="heading-font" id="banner-font2">', '<h1 class="heading-font" id="banner-font2">')
    content = content.replace('</h2>\n              <p class="remove-br">', '</h1>\n              <p class="remove-br">')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

def fix_h1_page(filepath, h1_html):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace existing banner h2 or main title with h1
    if '<h1' not in content:
        content = re.sub(r'<h2>(.*?)</h2>', r'<h1>\1</h1>', content, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    fix_h1_index()
    print("Fixed H1 tag on index.html")
    fix_h1_page("about.html", "<h1>About Elderly Wellness - Senior Care in Chennai</h1>")
    print("Fixed H1 tag on about.html")
    fix_h1_page("contact.html", "<h1>Contact Elderly Wellness - Book Senior Care in Chennai</h1>")
    print("Fixed H1 tag on contact.html")
    fix_h1_page("pricing.html", "<h1>Elderly Care Pricing & Plans in Chennai</h1>")
    print("Fixed H1 tag on pricing.html")

if __name__ == '__main__':
    main()
