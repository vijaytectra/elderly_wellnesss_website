/**
 * Homepage helpers:
 * - Stacked feature cards
 * - Defer icon font / AOS / blog JS until after first paint
 */
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

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

  function loadIcoFont() {
    if (document.querySelector("link[data-ew-icofont]")) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/icofont.min.css";
    link.setAttribute("data-ew-icofont", "1");
    document.head.appendChild(link);
  }

  function loadAos() {
    loadStylesheet("css/aos.css");
    loadScript("js/aos.js", function () {
      window.dispatchEvent(new Event("ew:aos-ready"));
    });
  }

  onReady(function () {
    var cardBlocks = document.querySelectorAll(".task_app_section .task_block");
    var topStyle = 100;
    cardBlocks.forEach(function (card, index) {
      card.style.top = topStyle + "px";
      card.style.zIndex = String(index + 10);
      topStyle += 28;
    });
  });

  function afterFirstPaint() {
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
