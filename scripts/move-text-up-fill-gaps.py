import re

def main():
    with open('about.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update about_us_section padding
    content = content.replace('<section class="about_us_section">', '<section class="about_us_section" style="padding-top: 40px; padding-bottom: 20px;">')

    # 2. Update about_slider margins (tight gap above and below)
    old_slider = re.search(r'<div class="about_slider".*?</div>\s*</div>\s*</div>', content, re.DOTALL)
    if old_slider:
        new_slider = '''<div class="about_slider" data-aos="fade-in" data-aos-duration="1500" style="margin-top: 24px; margin-bottom: 20px; padding: 0;">
          <div class="owl-carousel owl-theme" id="about_slider">
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide1.jpg" alt="Elderly care professional supporting senior at home" style="width: 100%; height: 380px; max-height: 380px; object-fit: cover; display: block; border-radius: 20px;"/>
              </div>
            </div>
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide2.jpg" alt="Trained nurse conducting health check for elder" style="width: 100%; height: 380px; max-height: 380px; object-fit: cover; display: block; border-radius: 20px;"/>
              </div>
            </div>
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide3.jpg" alt="Physiotherapist assisting senior citizen mobility" style="width: 100%; height: 380px; max-height: 380px; object-fit: cover; display: block; border-radius: 20px;"/>
              </div>
            </div>
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide4.jpg" alt="Elderly parent receiving daily assisted living care" style="width: 100%; height: 380px; max-height: 380px; object-fit: cover; display: block; border-radius: 20px;"/>
              </div>
            </div>
          </div>
        </div>'''
        content = content.replace(old_slider.group(0), new_slider)

    # 3. Clean up extra closing tags and tighten abt_text position
    old_abt_text = re.search(r'</div>\s*<div class="container">\s*<div class="row abt_text".*?>', content, re.DOTALL)
    if old_abt_text:
        new_abt_text = '''<div class="container">
          <div class="row abt_text" data-aos="fade-up" data-aos-duration="1500" style="justify-content: center; margin-top: 16px; margin-bottom: 24px; padding-top: 0;">'''
        content = content.replace(old_abt_text.group(0), new_abt_text)

    # 4. Remove row_am double padding from text_list_section below
    content = content.replace('<div class="text_list_section row_am"', '<div class="text_list_section" style="margin-top: 10px; padding: 20px 0;"')

    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Moved text UP directly below cards and filled all whitespace gaps on about.html!")

if __name__ == '__main__':
    main()
