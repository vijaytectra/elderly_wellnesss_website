import re

def main():
    with open('about.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add gap above slider (margin-top: 44px) and below slider (margin-bottom: 56px)
    old_slider = re.search(r'<div class="about_slider row_am".*?</div>\s*</div>\s*</div>', content, re.DOTALL)
    if old_slider:
        new_slider = '''<div class="about_slider" data-aos="fade-in" data-aos-duration="1500" style="margin-top: 44px; margin-bottom: 56px; padding: 0;">
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

    # 2. Add gap above "Our story" text section (margin-top: 48px, padding-top: 16px)
    old_abt_text = '<div class="row abt_text" data-aos="fade-up" data-aos-duration="1500" style="justify-content: center">'
    new_abt_text = '<div class="row abt_text" data-aos="fade-up" data-aos-duration="1500" style="justify-content: center; margin-top: 48px; padding-top: 16px;">'
    content = content.replace(old_abt_text, new_abt_text)

    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Added generous professional spacing above slider cards and story text!")

if __name__ == '__main__':
    main()
