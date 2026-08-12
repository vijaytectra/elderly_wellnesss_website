async function loadBlogs() {
  const blogContainer = document.getElementById("blog-posts");
  if (!blogContainer) return;
  try {
    const response = await fetch("blogs/blog-manifest.json");
    const posts = await response.json();
    // Titles in blog-manifest.json already carry HTML entities (e.g. "&amp;"),
    // so '&' is deliberately left alone -- escaping it would double-encode and
    // render "&amp;" literally. Tag and attribute delimiters are still escaped
    // so a title can never break out of the markup it is interpolated into.
    const esc = (s) =>
      String(s == null ? "" : s)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    // Built as one string and assigned once. The previous `innerHTML +=` per
    // post re-parsed and re-laid-out the whole container on every iteration.
    const markup = [];

    // Homepage shows 4 newest posts (2 per row)
    posts.slice(0, 4).forEach((item) => {
      const date = item.date
        ? new Date(item.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "";

      // Always stay under blogs/ — never link to /slug at the site root
      let slug = (item.slug || "").replace(/^\/+|\/+$/g, "");
      if (!slug && item.link) {
        const match = String(item.link).match(/blogs\/([^/?#]+)/i);
        slug = match ? match[1] : "";
      }
      // Relative from homepage so Live Server + production both resolve correctly
      const link = slug ? `blogs/${slug}/` : "blogs/";

      let imageSrc = (item.image || "")
        .replace(/^\//, "")
        .replace(/^https?:\/\/(www\.)?theelderlywellness\.com\//i, "");

      // Prefer compressed homepage thumbs when available (same image, smaller file)
      if (imageSrc.indexOf("images/blogs/") === 0) {
        const base = imageSrc.replace(/^images\/blogs\//, "").replace(/\.[^.]+$/, "");
        imageSrc = "images/blogs/opt/" + base + ".jpg";
      }

      const title = esc(item.title);
      const href = esc(link);

      const image = imageSrc
        ? `<a href="${href}" class="img" tabindex="-1" aria-hidden="true"><img src="${esc(imageSrc)}" width="640" height="400" alt="${title}" loading="lazy" decoding="async"/></a>`
        : "";

      // "Read more" on its own is not a descriptive link name (Lighthouse SEO
      // link-text). The visible label stays the same; the accessible name
      // carries the post title.
      markup.push(`
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
        `);
    });

    blogContainer.innerHTML = markup.join("");
    if (typeof AOS !== "undefined" && typeof AOS.refresh === "function") {
      AOS.refresh();
    }
  } catch (error) {
    blogContainer.innerHTML = "<p>Failed to load blog posts.</p>";
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
