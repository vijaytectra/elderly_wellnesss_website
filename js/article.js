async function loadBlogs() {
  const blogContainer = document.getElementById("blog-posts");
  const blogSection = document.getElementById("home-blog-section");
  if (!blogContainer) return;

  const hideSection = () => {
    if (blogSection) {
      blogSection.style.display = "none";
    }
  };

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  let posts = [];

  try {
    const response = await fetch("blogs/blog-manifest.json");
    if (response.ok) {
      posts = await response.json();
    }
  } catch (e) {
    // Manifest fetch failed, fallback will be attempted
  }

  // Fallback to WordPress REST API if manifest returned no posts
  if (!Array.isArray(posts) || posts.length === 0) {
    try {
      const wpResponse = await fetch("blogs/wp-json/wp/v2/posts?per_page=4&_embed");
      if (wpResponse.ok) {
        const wpData = await wpResponse.json();
        posts = wpData.map((item) => {
          const featuredMedia = item._embedded && item._embedded["wp:featuredmedia"] ? item._embedded["wp:featuredmedia"][0] : null;
          return {
            title: item.title ? item.title.rendered : "",
            date: item.date,
            link: item.link,
            slug: item.slug,
            image: featuredMedia ? featuredMedia.source_url : "",
          };
        });
      }
    } catch (e) {
      // Fallback failed
    }
  }

  // If no posts available, hide the entire section (never show an empty heading)
  if (!Array.isArray(posts) || posts.length === 0) {
    hideSection();
    return;
  }

  // Ensure section is visible if posts exist
  if (blogSection) {
    blogSection.style.display = "";
  }

  const markup = [];
  posts.slice(0, 4).forEach((item) => {
    const date = item.date
      ? new Date(item.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";

    let slug = (item.slug || "").replace(/^\/+|\/+$/g, "");
    if (!slug && item.link) {
      const match = String(item.link).match(/blogs\/([^/?#]+)/i);
      slug = match ? match[1] : "";
    }
    const link = slug ? `blogs/${slug}/` : "blogs/";

    let imageSrc = (item.image || "")
      .replace(/^\//, "")
      .replace(/^https?:\/\/(www\.)?theelderlywellness\.com\//i, "");

    if (imageSrc.indexOf("images/blogs/") === 0) {
      const base = imageSrc.replace(/^images\/blogs\//, "").replace(/\.[^.]+$/, "");
      imageSrc = "images/blogs/opt/" + base + ".jpg";
    }

    const title = esc(item.title);
    const href = esc(link);

    const image = imageSrc
      ? `<a href="${href}" class="img" tabindex="-1" aria-hidden="true"><img src="${esc(imageSrc)}" width="640" height="400" alt="${title}" loading="lazy" decoding="async"/></a>`
      : "";

    markup.push(`
        <div class="item">
          <div class="blog_post" data-aos="fade-up" data-aos-duration="1500">
          ${image}
          <div class="text">
            <ul class="blog_info">
              <li>${esc(date)}</li>
              <li>Blogs</li>
            </ul>
            <h3><a href="${href}">${title}</a></h3>
            <div class="tag_more">
              <span class="tag">Blogs</span>
              <a href="${href}" aria-label="Read more about ${title}">Read More <i class="icofont-arrow-right" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      </div>
      `);
  });

  blogContainer.innerHTML = markup.join("");

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
  }
}

// The blog grid is well below the fold. Fetching the manifest and building the
// cards during load cost ~120ms of main-thread time inside the TBT window, so
// it now runs once the page has loaded (or as the section comes into view,
// whichever happens first).
(function scheduleBlogs() {
  var container = document.getElementById("blog-posts");
  if (!container) return;

  var started = false;
  var start = function () {
    if (started) return;
    started = true;
    loadBlogs();
  };

  if (typeof IntersectionObserver === "function") {
    var io = new IntersectionObserver(
      function (entries) {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(container);
  }

  var after = function () {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(start, { timeout: 2500 });
    } else {
      window.setTimeout(start, 200);
    }
  };
  if (document.readyState === "complete") after();
  else window.addEventListener("load", after);
})();

window.addEventListener("ew:aos-ready", function () {
  if (typeof AOS !== "undefined" && typeof AOS.refresh === "function") {
    AOS.refresh();
  }
});
