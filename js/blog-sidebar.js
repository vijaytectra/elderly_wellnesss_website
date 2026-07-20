/**
 * Blog sidebar — live search + recent posts from blog-manifest.json
 * Expects #ew-blog-sidebar with data-manifest and data-blogs-base attributes.
 */
(function () {
  const root = document.getElementById("ew-blog-sidebar");
  if (!root) return;

  const manifestUrl = root.getAttribute("data-manifest") || "../blog-manifest.json";
  const blogsBase = root.getAttribute("data-blogs-base") || "../";
  const listEl = root.querySelector("[data-ew-recent-list]");
  const inputEl = root.querySelector("[data-ew-search-input]");
  const hintEl = root.querySelector("[data-ew-search-hint]");
  const formEl = root.querySelector("[data-ew-search-form]");
  const RECENT_COUNT = 6;

  function currentSlug() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const blogsIdx = parts.indexOf("blogs");
    if (blogsIdx === -1) return "";
    const after = parts.slice(blogsIdx + 1);
    if (!after.length || after[0] === "index.html") return "";
    // skip archives
    if (["category", "tag", "author", "page"].includes(after[0])) return "";
    return after[0].replace(/\.html$/, "");
  }

  function postHref(slug) {
    const base = blogsBase.endsWith("/") ? blogsBase : blogsBase + "/";
    return base + slug + "/";
  }

  function imageSrc(image) {
    if (!image) return "";
    if (/^https?:\/\//i.test(image)) return image;
    // Manifest paths like /images/... or /blogs/wp-content/... or blogs/...
    if (image.startsWith("/")) return image;
    if (image.startsWith("blogs/") || image.startsWith("images/")) return "/" + image.replace(/^\//, "");
    return image;
  }

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function cleanTitle(title) {
    return String(title || "")
      .replace(/\s*[-|]\s*Elderly Wellness\s*$/i, "")
      .replace(/&amp;/g, "&")
      .trim();
  }

  function renderPosts(posts) {
    if (!listEl) return;
    if (!posts.length) {
      listEl.innerHTML = '<li class="ew-sidebar__empty">No matching articles.</li>';
      return;
    }
    listEl.innerHTML = posts
      .map((post) => {
        const href = postHref(post.slug);
        const title = cleanTitle(post.title);
        const date = formatDate(post.date);
        const img = imageSrc(post.image);
        const thumb = img
          ? `<img class="ew-sidebar__thumb" src="${img}" alt="" loading="lazy" width="72" height="56"/>`
          : `<span class="ew-sidebar__thumb ew-sidebar__thumb--placeholder" aria-hidden="true">EW</span>`;
        return `<li class="ew-sidebar__item" data-title="${title.toLowerCase()}">
          <a class="ew-sidebar__link" href="${href}">
            ${thumb}
            <span class="ew-sidebar__meta">
              <span class="ew-sidebar__post-title">${title}</span>
              ${date ? `<time class="ew-sidebar__date" datetime="${post.date || ""}">${date}</time>` : ""}
            </span>
          </a>
        </li>`;
      })
      .join("");
  }

  let allPosts = [];

  function applyFilter(query) {
    const q = query.trim().toLowerCase();
    const slug = currentSlug();
    let pool = allPosts.filter((p) => p.slug !== slug);
    if (q) {
      pool = pool.filter((p) => {
        const hay = `${cleanTitle(p.title)} ${p.description || ""} ${p.slug}`.toLowerCase();
        return hay.includes(q);
      });
    }
    const recent = q ? pool.slice(0, 12) : pool.slice(0, RECENT_COUNT);
    renderPosts(recent);
    if (hintEl) {
      hintEl.textContent = q
        ? recent.length
          ? `${recent.length} result${recent.length === 1 ? "" : "s"}`
          : "No articles match that search"
        : "Showing the latest articles";
    }
    return recent;
  }

  fetch(manifestUrl)
    .then((r) => {
      if (!r.ok) throw new Error("manifest missing");
      return r.json();
    })
    .then((posts) => {
      allPosts = Array.isArray(posts) ? posts : [];
      applyFilter("");
    })
    .catch(() => {
      if (listEl) {
        listEl.innerHTML =
          '<li class="ew-sidebar__empty">Unable to load articles right now.</li>';
      }
    });

  if (inputEl) {
    let timer = 0;
    inputEl.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => applyFilter(inputEl.value), 120);
    });
  }

  if (formEl) {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = applyFilter(inputEl ? inputEl.value : "");
      if (results.length === 1) {
        window.location.href = postHref(results[0].slug);
      } else if (results.length > 1) {
        const first = listEl && listEl.querySelector(".ew-sidebar__link");
        if (first) first.focus();
      }
    });
  }
})();
