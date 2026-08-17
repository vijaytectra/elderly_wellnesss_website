import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Update stylesheet version strings to force browser cache reload
    content = content.replace('v=20260817teal', 'v=20260817blackmixed')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Updated index.html CSS cache buster strings for black mixed-case hero heading!")

if __name__ == '__main__':
    main()
