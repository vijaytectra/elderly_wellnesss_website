async function loadBlogs() {
  const blogContainer = document.getElementById("blog-posts");
  try {
    const response = await fetch("blogs/blog-manifest.json");
    const posts = await response.json();
    // Homepage shows 3 newest posts that exist with a local image (see blog-manifest.json)
    posts.slice(0, 3).forEach((item) => {
      const date = item.date
        ? new Date(item.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "";
      // Always use /blogs/<slug> so cards never link to the site root
      const slug = (item.slug || "").replace(/^\/+|\/+$/g, "");
      const link = slug
        ? `/blogs/${slug}`
        : (item.link || "#").replace(/\/index\.html\/?$/, "");
      const imageSrc = (item.image || "").replace(/^\//, "");
      const image = imageSrc
        ? `<a href="${link}" class="img"><img src="${imageSrc}" alt="${item.title}"/></a>`
        : "";
      blogContainer.innerHTML += `
          <div class="blog_post" data-aos="fade-up" data-aos-duration="1500">
            ${image}
            <div class="text">
              <ul class="blog_info">
                <li>${date}</li>
                <li>Blogs</li>
              </ul>
              <h3><a href="${link}">${item.title}</a></h3>
              <div class="tag_more">
                <span class="tag">Blogs</span>
                <a href="${link}">Read more <i class="icofont-arrow-right"></i></a>
              </div>
            </div>
          </div>
        `;
    });
  } catch (error) {
    blogContainer.innerHTML = "<p>Failed to load blog posts.</p>";
  }
}

loadBlogs();
