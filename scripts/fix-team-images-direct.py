import re

def main():
    with open('about.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Exact string replacements for all 6 team profile images
    content = content.replace(
        '<img loading="lazy" src=" " alt="Santosh Kumar, Founder and CEO"/>',
        '<img loading="lazy" src="images/profile/1.png" alt="Santosh Kumar, Founder and CEO" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"/>'
    )
    content = content.replace(
        '<img loading="lazy" src=" " alt="Tanya Mehtani, Lead - Business Process & Design"/>',
        '<img loading="lazy" src="images/profile/2.png" alt="Tanya Mehtani, Lead - Business Process &amp; Design" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"/>'
    )
    content = content.replace(
        '<img loading="lazy" src=" " alt="Jaffar A, Product Architect"/>',
        '<img loading="lazy" src="images/profile/3.png" alt="Jaffar A, Product Architect" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"/>'
    )
    content = content.replace(
        '<img loading="lazy" src=" " alt="Andrew Athisayaraj, Data Analyst"/>',
        '<img loading="lazy" src="images/profile/4.png" alt="Andrew Athisayaraj, Data Analyst" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"/>'
    )
    content = content.replace(
        '<img loading="lazy" src=" " alt="Deugul B S, Business Operations"/>',
        '<img loading="lazy" src="images/profile/5.png" alt="Deugul B S, Business Operations" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"/>'
    )
    content = content.replace(
        '<img loading="lazy" src=" " alt="Danny Lalwani, Technical Architect"/>',
        '<img loading="lazy" src="images/profile/Danny.png" alt="Danny Lalwani, Technical Architect" style="width: 100%; height: 260px; object-fit: cover; border-radius: 20px; display: block;"/>'
    )

    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Directly replaced all 6 team member images on about.html!")

if __name__ == '__main__':
    main()
