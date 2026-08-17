import re

def update_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Revert #blog-posts div back to standard grid class
    content = content.replace(
        '<div id="blog-posts" class="owl-carousel owl-theme blog_listing home-blog-listing">',
        '<div id="blog-posts" class="blog_listing home-blog-listing">'
    )

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Reverted index.html #blog-posts container back to static grid!")

def update_article_js():
    with open('js/article.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Limit posts to 3
    content = content.replace('posts.slice(0, 4).forEach', 'posts.slice(0, 3).forEach')

    # 2. Remove <div class="item"> wrapper
    old_push = '''    markup.push(`
        <div class="item">
          <div class="blog_post" data-aos="fade-up" data-aos-duration="1500">'''

    new_push = '''    markup.push(`
        <div class="blog_post" data-aos="fade-up" data-aos-duration="1500">'''

    content = content.replace(old_push, new_push)

    old_close = '''            <div class="tag_more">
              <span class="tag">Blogs</span>
              <a href="${href}" aria-label="Read more about ${title}">Read More <i class="icofont-arrow-right" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      </div>
      `);'''

    new_close = '''            <div class="tag_more">
              <span class="tag">Blogs</span>
              <a href="${href}" aria-label="Read more about ${title}">Read More <i class="icofont-arrow-right" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      `);'''

    content = content.replace(old_close, new_close)

    # 3. Remove owlCarousel init block
    old_init = '''  blogContainer.innerHTML = markup.join("");

  if (window.jQuery && window.jQuery.fn.owlCarousel) {
    window.jQuery(blogContainer).owlCarousel({
      loop: true,
      margin: 24,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        992: { items: 3 }
      }
    });
  }

  if (typeof AOS !== "undefined" && typeof AOS.refresh === "function") {
    AOS.refresh();
  }'''

    new_init = '''  blogContainer.innerHTML = markup.join("");
  if (typeof AOS !== "undefined" && typeof AOS.refresh === "function") {
    AOS.refresh();
  }'''

    content = content.replace(old_init, new_init)

    with open('js/article.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Reverted js/article.js back to static 3-blog post grid!")

def main():
    update_index_html()
    update_article_js()

if __name__ == '__main__':
    main()
