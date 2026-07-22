async function loadBlogs() {
  const blogContainer = document.getElementById("blog-posts");
  try {
    const response = await fetch("blogs/blog-manifest.json");
    const posts = await response.json();
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

      const imageSrc = (item.image || "")
        .replace(/^\//, "")
        .replace(/^https?:\/\/(www\.)?theelderlywellness\.com\//i, "");
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
