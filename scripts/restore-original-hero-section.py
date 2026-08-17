import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Restore exact original hero heading markup
    old_heading = '''              <h1 class="heading-font" id="banner-font2">
                <span class="hero-age">Age</span>
                <span class="hero-serif">Meets</span>
                <span class="hero-serif hero-line2">Assistance.</span>
              </h1>'''

    new_heading = '''              <h1 class="heading-font" id="banner-font2">
                <span class="hero-age">Age</span>
                <span class="hero-serif">MEETS</span>
                <span class="hero-serif hero-line2">ASSISTANCE.</span>
              </h1>'''

    content = content.replace(old_heading, new_heading)

    # 2. Restore video slider on the right side if it was replaced with static images
    old_slider_pattern = re.compile(r'<div class="col-lg-6 col-md-12">\s*<div class="banner_slider">.*?</div>\s*</div>\s*</div>\s*<!-- banner slides end -->', re.DOTALL)

    new_slider = '''<div class="col-lg-6 col-md-12">
            <div class="banner_slider">
              <div id="frmae_slider" class="owl-carousel owl-theme">
                <div class="item">
                  <div class="slider_media">
                    <video src="images/home/1.mp4" autoplay muted loop playsinline webkit-playsinline></video>
                  </div>
                </div>
                <div class="item">
                  <div class="slider_media">
                    <video src="images/home/2.mp4" autoplay muted loop playsinline webkit-playsinline></video>
                  </div>
                </div>
                <div class="item">
                  <div class="slider_media">
                    <video src="images/home/3.mp4" muted loop autoplay playsinline webkit-playsinline></video>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- banner slides end -->'''

    content = old_slider_pattern.sub(new_slider, content)

    # Reset cache buster
    content = content.replace('v=20260817blackmixed', 'v=20260817restored')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Restored original hero heading markup and video player slider on index.html!")

if __name__ == '__main__':
    main()
