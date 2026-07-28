/**
 * Homepage helpers:
 * - Stacked feature cards
 * - Defer icon font / AOS / blog JS until after first paint
 */
(function () {
  function idle(fn, timeout) {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(fn, { timeout: timeout || 2500 });
    } else {
      window.setTimeout(fn, 1);
    }
  }

  function loadStylesheet(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function loadScript(src, onload) {
    if (document.querySelector('script[src="' + src.split("?")[0] + '"], script[data-ew-src="' + src + '"]')) {
      if (onload) onload();
      return;
    }
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.setAttribute("data-ew-src", src);
    if (onload) s.onload = onload;
    document.body.appendChild(s);
  }

  // Subset built by scripts/build-icon-subset.js: only the ~23 glyphs the site
  // actually uses (3.4K woff2 + 1.4K css, down from 525K + 90K).
  function loadIcoFont() {
    if (document.querySelector("link[data-ew-icofont]")) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/icofont-subset.css";
    link.setAttribute("data-ew-icofont", "1");
    document.head.appendChild(link);
  }

  function loadAos() {
    loadStylesheet("css/aos.css");
    loadScript("js/aos.js", function () {
      window.dispatchEvent(new Event("ew:aos-ready"));
    });
  }

  // Stacked sticky cards. These live below the fold and each write invalidates
  // layout for a position:sticky element, so the whole pass is deferred out of
  // the load window rather than running at DOMContentLoaded.
  function layoutStackedCards() {
    var cardBlocks = document.querySelectorAll(".task_app_section .task_block");
    if (!cardBlocks.length) return;
    var topStyle = 100;
    cardBlocks.forEach(function (card, index) {
      card.style.top = topStyle + "px";
      card.style.zIndex = String(index + 10);
      topStyle += 28;
    });
  }

  function afterFirstPaint() {
    idle(layoutStackedCards, 1500);

    idle(function () {
      loadAos();
    }, 2000);

    var done = false;
    var runIcons = function () {
      if (done) return;
      done = true;
      loadIcoFont();
    };
    window.setTimeout(runIcons, 4500);
    ["scroll", "touchstart", "mousemove", "keydown"].forEach(function (evt) {
      window.addEventListener(evt, runIcons, { once: true, passive: true });
    });
  }

  if (document.readyState === "complete") {
    afterFirstPaint();
  } else {
    window.addEventListener("load", afterFirstPaint);
  }
})();
