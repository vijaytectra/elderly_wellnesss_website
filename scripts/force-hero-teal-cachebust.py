import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Update stylesheet version strings to force browser cache reload
    content = content.replace('css/style.css?v=20260817ih', 'css/style.css?v=20260817teal')
    content = content.replace('css/service-pages-enhancements.css', 'css/service-pages-enhancements.css?v=20260817teal')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Updated index.html CSS cache buster strings!")

if __name__ == '__main__':
    main()
