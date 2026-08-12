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

  // Single Box Scroll Controller
  function initSingleBoxScroll() {
    var wrapper = document.querySelector(".task_single_box_wrapper");
    var block = document.querySelector(".task_single_block");
    if (!wrapper || !block) return;

    var cards = block.querySelectorAll(".task_single_card_item");
    if (!cards.length) return;

    var stickyTop = 75;
    var ticking = false;

    function mapRange(val, inMin, inMax, outMin, outMax) {
      if (val <= inMin) return outMin;
      if (val >= inMax) return outMax;
      return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
    }

    function applyCardStyles(card, translateY, opacity) {
      if (!card) return;

      if (window.innerWidth < 992) {
        card.style.visibility = "visible";
        card.style.opacity = "1";
        card.style.transform = "none";
        card.style.pointerEvents = "auto";
        return;
      }

      if (opacity <= 0.001) {
        card.style.visibility = "hidden";
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        return;
      }

      var scaleVal = 0.94 + 0.06 * opacity;

      card.style.visibility = "visible";
      card.style.opacity = String(opacity);
      card.style.transform = "translateY(" + translateY + "px) scale(" + scaleVal + ")";
      card.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
    }

    function renderProgress() {
      if (window.innerWidth < 992) {
        cards.forEach(function(card) {
          applyCardStyles(card, 0, 1);
        });
        ticking = false;
        return;
      }

      var rect = wrapper.getBoundingClientRect();
      var wrapperHeight = wrapper.offsetHeight;
      var windowHeight = window.innerHeight;

      var totalScrollable = wrapperHeight - windowHeight;
      if (totalScrollable <= 0) {
        ticking = false;
        return;
      }

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      var wrapperOffsetTop = rect.top + scrollTop;
      var scrollStart = wrapperOffsetTop - stickyTop;

      var currentScroll = scrollTop - scrollStart;
      var progress = currentScroll / totalScrollable;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      // Slide 1 (Index 0): 0.0 -> 0.22 locked, 0.22 -> 0.35 slides up & fades out completely to 0 opacity
      var s1Y, s1Opacity;
      if (progress <= 0.22) {
        s1Y = 0;
        s1Opacity = 1;
      } else if (progress <= 0.35) {
        s1Y = mapRange(progress, 0.22, 0.35, 0, -100);
        s1Opacity = mapRange(progress, 0.22, 0.35, 1, 0);
      } else {
        s1Y = -100;
        s1Opacity = 0;
      }

      // Slide 2 (Index 1): 0.0 -> 0.26 hidden below, 0.26 -> 0.42 scrubs up & fades in, 0.42 -> 0.58 locked, 0.58 -> 0.70 slides up & fades out
      var s2Y, s2Opacity;
      if (progress < 0.26) {
        s2Y = 180;
        s2Opacity = 0;
      } else if (progress <= 0.42) {
        s2Y = mapRange(progress, 0.26, 0.42, 180, 0);
        s2Opacity = mapRange(progress, 0.26, 0.42, 0, 1);
      } else if (progress <= 0.58) {
        s2Y = 0;
        s2Opacity = 1;
      } else if (progress <= 0.70) {
        s2Y = mapRange(progress, 0.58, 0.70, 0, -100);
        s2Opacity = mapRange(progress, 0.58, 0.70, 1, 0);
      } else {
        s2Y = -100;
        s2Opacity = 0;
      }

      // Slide 3 (Index 2): 0.0 -> 0.62 hidden below, 0.62 -> 0.78 scrubs up & fades in, 0.78 -> 1.0 locked
      var s3Y, s3Opacity;
      if (progress < 0.62) {
        s3Y = 180;
        s3Opacity = 0;
      } else if (progress <= 0.78) {
        s3Y = mapRange(progress, 0.62, 0.78, 180, 0);
        s3Opacity = mapRange(progress, 0.62, 0.78, 0, 1);
      } else {
        s3Y = 0;
        s3Opacity = 1;
      }

      applyCardStyles(cards[0], s1Y, s1Opacity);
      applyCardStyles(cards[1], s2Y, s2Opacity);
      applyCardStyles(cards[2], s3Y, s3Opacity);

      ticking = false;
    }

    function requestRender() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(renderProgress);
      }
    }

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });
    window.addEventListener("wheel", requestRender, { passive: true });
    window.addEventListener("touchmove", requestRender, { passive: true });

    requestRender();
  }

  function afterFirstPaint() {
    initSingleBoxScroll();

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initSingleBoxScroll();
    });
  } else {
    initSingleBoxScroll();
  }

  if (document.readyState === "complete") {
    afterFirstPaint();
  } else {
    window.addEventListener("load", afterFirstPaint);
  }
})();
