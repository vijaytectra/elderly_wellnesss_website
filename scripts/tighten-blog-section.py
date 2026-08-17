import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update blog section padding
    content = content.replace(
        '<section class="blog_section row_am" id="home-blog-section">',
        '<section class="blog_section row_am" id="home-blog-section" style="padding: 40px 0 20px 0;">'
    )

    # 2. Update callback form section padding
    content = content.replace(
        '<section id="callback-form-section" class="row_am" style="padding: 60px 0; background: #f8fafc;">',
        '<section id="callback-form-section" class="row_am" style="padding: 40px 0; background: #f8fafc;">'
    )

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Tightened blog section and callback form padding on index.html!")

if __name__ == '__main__':
    main()
