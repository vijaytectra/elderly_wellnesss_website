import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Ensure heading has Title Case text (Age Meets Assistance.)
    old_heading = '''              <h1 class="heading-font" id="banner-font2">
                <span class="hero-age">Age</span>
                <span class="hero-serif">MEETS</span>
                <span class="hero-serif hero-line2">ASSISTANCE.</span>
              </h1>'''

    new_heading = '''              <h1 class="heading-font" id="banner-font2">
                <span class="hero-age">Age</span>
                <span class="hero-serif">Meets</span>
                <span class="hero-serif hero-line2">Assistance.</span>
              </h1>'''

    content = content.replace(old_heading, new_heading)

    # 2. Add video play/pause buttons to all 3 video slider items
    old_slider = '''          <div class="col-lg-6 col-md-12">
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
          </div>'''

    new_slider = '''          <div class="col-lg-6 col-md-12">
            <div class="banner_slider">
              <div id="frmae_slider" class="owl-carousel owl-theme">
                <div class="item">
                  <div class="slider_media" style="position: relative;">
                    <video src="images/home/1.mp4" autoplay muted loop playsinline webkit-playsinline></video>
                    <button class="video_play_toggle_btn" onclick="toggleHeroVideo(this)" aria-label="Pause video" style="position: absolute; bottom: 16px; right: 16px; width: 44px; height: 44px; border-radius: 50%; background: rgba(39,134,165,0.9); border: 2px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                      <i class="icofont-pause" style="font-size: 18px; line-height: 1;"></i>
                    </button>
                  </div>
                </div>
                <div class="item">
                  <div class="slider_media" style="position: relative;">
                    <video src="images/home/2.mp4" autoplay muted loop playsinline webkit-playsinline></video>
                    <button class="video_play_toggle_btn" onclick="toggleHeroVideo(this)" aria-label="Pause video" style="position: absolute; bottom: 16px; right: 16px; width: 44px; height: 44px; border-radius: 50%; background: rgba(39,134,165,0.9); border: 2px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                      <i class="icofont-pause" style="font-size: 18px; line-height: 1;"></i>
                    </button>
                  </div>
                </div>
                <div class="item">
                  <div class="slider_media" style="position: relative;">
                    <video src="images/home/3.mp4" muted loop autoplay playsinline webkit-playsinline></video>
                    <button class="video_play_toggle_btn" onclick="toggleHeroVideo(this)" aria-label="Pause video" style="position: absolute; bottom: 16px; right: 16px; width: 44px; height: 44px; border-radius: 50%; background: rgba(39,134,165,0.9); border: 2px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                      <i class="icofont-pause" style="font-size: 18px; line-height: 1;"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>'''

    content = content.replace(old_slider, new_slider)

    # 3. Add toggleHeroVideo helper script before </body> if not present
    if 'function toggleHeroVideo' not in content:
        script_code = '''<script>
function toggleHeroVideo(btn) {
  var media = btn.parentElement;
  var video = media.querySelector('video');
  var icon = btn.querySelector('i');
  if (video) {
    if (video.paused) {
      video.play();
      icon.className = 'icofont-pause';
      btn.setAttribute('aria-label', 'Pause video');
    } else {
      video.pause();
      icon.className = 'icofont-ui-play';
      btn.setAttribute('aria-label', 'Play video');
    }
  }
}
</script>
</body>'''
        content = content.replace('</body>', script_code)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Restored all hero text, video play/pause buttons, and slider items in index.html!")

if __name__ == '__main__':
    main()
