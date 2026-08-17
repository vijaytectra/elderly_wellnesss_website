import re

def main():
    with open('about.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the about_slider div with full valid image sources
    old_slider = re.search(r'<div class="about_slider row_am".*?</div>\s*</div>\s*</div>', content, re.DOTALL)
    if old_slider:
        new_slider = '''<div class="about_slider row_am" data-aos="fade-in" data-aos-duration="1500">
          <div class="owl-carousel owl-theme" id="about_slider">
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide1.jpg" alt="Elderly care professional supporting senior at home" style="width: 100%; height: auto; display: block; border-radius: 16px;"/>
              </div>
            </div>
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide2.jpg" alt="Trained nurse conducting health check for elder" style="width: 100%; height: auto; display: block; border-radius: 16px;"/>
              </div>
            </div>
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide3.jpg" alt="Physiotherapist assisting senior citizen mobility" style="width: 100%; height: auto; display: block; border-radius: 16px;"/>
              </div>
            </div>
            <div class="item">
              <div class="abt_slides">
                <img loading="lazy" src="images/abt-slide4.jpg" alt="Elderly parent receiving daily assisted living care" style="width: 100%; height: auto; display: block; border-radius: 16px;"/>
              </div>
            </div>
          </div>
        </div>'''
        content = content.replace(old_slider.group(0), new_slider)

    with open('about.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Restored all 4 image sources in about.html slider!")

if __name__ == '__main__':
    main()
