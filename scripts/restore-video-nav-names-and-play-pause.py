import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update banner_slider container to include the 3 navigation video names below
    old_banner_slider = re.search(r'<div class="banner_slider".*?<!-- banner slides end -->', html, re.DOTALL)
    if old_banner_slider:
        new_banner_slider = '''<div class="banner_slider" style="position: relative;">
              <div id="frmae_slider" class="owl-carousel owl-theme">
                <div class="item">
                  <div class="slider_media" style="position: relative;">
                    <video src="images/home/1.mp4" autoplay muted loop playsinline webkit-playsinline></video>
                    <button class="video_play_toggle_btn" onclick="toggleHeroVideo(this)" aria-label="Pause video" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 64px; height: 64px; border-radius: 50%; background: rgba(39, 134, 165, 0.85); border: 2.5px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 6px 18px rgba(0,0,0,0.35);">
                      <i class="icofont-pause" style="font-size: 26px; line-height: 1;"></i>
                    </button>
                  </div>
                </div>
                <div class="item">
                  <div class="slider_media" style="position: relative;">
                    <video src="images/home/2.mp4" autoplay muted loop playsinline webkit-playsinline></video>
                    <button class="video_play_toggle_btn" onclick="toggleHeroVideo(this)" aria-label="Pause video" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 64px; height: 64px; border-radius: 50%; background: rgba(39, 134, 165, 0.85); border: 2.5px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 6px 18px rgba(0,0,0,0.35);">
                      <i class="icofont-pause" style="font-size: 26px; line-height: 1;"></i>
                    </button>
                  </div>
                </div>
                <div class="item">
                  <div class="slider_media" style="position: relative;">
                    <video src="images/home/3.mp4" muted loop autoplay playsinline webkit-playsinline></video>
                    <button class="video_play_toggle_btn" onclick="toggleHeroVideo(this)" aria-label="Pause video" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 64px; height: 64px; border-radius: 50%; background: rgba(39, 134, 165, 0.85); border: 2.5px solid #ffffff; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: transform 0.2s ease, background 0.2s ease; box-shadow: 0 6px 18px rgba(0,0,0,0.35);">
                      <i class="icofont-pause" style="font-size: 26px; line-height: 1;"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 3 Navigation Video Names / Tabs below Video Player -->
              <div class="hero_video_nav_tabs" style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 20px; flex-wrap: wrap;">
                <button class="hero_vid_tab active" onclick="goToHeroVideo(0)" style="padding: 8px 18px; border-radius: 20px; font-size: 13.5px; font-weight: 700; border: 1.5px solid #2786a5; background: #2786a5; color: #ffffff; cursor: pointer; transition: all 0.25s ease;">Physiotherapy Care</button>
                <button class="hero_vid_tab" onclick="goToHeroVideo(1)" style="padding: 8px 18px; border-radius: 20px; font-size: 13.5px; font-weight: 700; border: 1.5px solid #cbd5e1; background: #ffffff; color: #475569; cursor: pointer; transition: all 0.25s ease;">24/7 Home Nursing</button>
                <button class="hero_vid_tab" onclick="goToHeroVideo(2)" style="padding: 8px 18px; border-radius: 20px; font-size: 13.5px; font-weight: 700; border: 1.5px solid #cbd5e1; background: #ffffff; color: #475569; cursor: pointer; transition: all 0.25s ease;">Geriatric Care</button>
              </div>
            </div>
          </div>
          <!-- banner slides end -->'''
        html = html.replace(old_banner_slider.group(0), new_banner_slider)

    # 2. Add video navigation tab handler function before </body>
    if 'function goToHeroVideo(index)' not in html:
        script_code = '''<script>
function goToHeroVideo(index) {
  var $owl = $('#frmae_slider');
  if ($owl.length && typeof $owl.trigger === 'function') {
    $owl.trigger('to.owl.carousel', [index, 300]);
  }
  updateHeroVidTabs(index);
}

function updateHeroVidTabs(index) {
  $('.hero_vid_tab').each(function(i) {
    if (i === index) {
      $(this).css({ 'background': '#2786a5', 'color': '#ffffff', 'border-color': '#2786a5' }).addClass('active');
    } else {
      $(this).css({ 'background': '#ffffff', 'color': '#475569', 'border-color': '#cbd5e1' }).removeClass('active');
    }
  });
}

$(document).ready(function() {
  var $owl = $('#frmae_slider');
  if ($owl.length) {
    $owl.on('changed.owl.carousel', function(event) {
      if (!event.namespace) return;
      var itemIndex = event.item.index - event.relatedTarget._clones.length / 2;
      var totalItems = event.item.count;
      var currentSlide = (itemIndex % totalItems + totalItems) % totalItems;
      updateHeroVidTabs(currentSlide);
    });
  }
});
</script>
</body>'''
        html = html.replace('</body>', script_code)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("Restored video block with 3 navigation video names and center play/pause overlay button!")

if __name__ == '__main__':
    main()
