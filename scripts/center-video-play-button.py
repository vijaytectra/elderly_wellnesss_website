import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update play/pause button position from bottom-right (bottom: 16px; right: 16px) to absolute CENTER (top: 50%; left: 50%; transform: translate(-50%, -50%))
    old_btn = 'style="position: absolute; bottom: 16px; right: 16px; width: 44px; height: 44px; border-radius: 50%; background: rgba(39,134,165,0.9); border: 2px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"'

    new_btn = 'style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 64px; height: 64px; border-radius: 50%; background: rgba(39, 134, 165, 0.85); border: 2.5px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 6px 18px rgba(0,0,0,0.35);"'

    content = content.replace(old_btn, new_btn)

    # 2. Update icon font-size inside 64px center button
    content = content.replace('style="font-size: 18px; line-height: 1;"', 'style="font-size: 26px; line-height: 1;"')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Centered hero video play/pause button (64px circular centered overlay) on index.html!")

if __name__ == '__main__':
    main()
