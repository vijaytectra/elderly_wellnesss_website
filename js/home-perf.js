/**
 * Homepage helpers:
 * - Typed.js init
 * - Stacked feature cards
 * - Defer heavy icon font until after load (keeps icons, frees LCP bandwidth)
 */
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function loadIcoFont() {
    if (document.querySelector('link[data-ew-icofont]')) return;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/icofont.min.css";
    link.setAttribute("data-ew-icofont", "1");
    document.head.appendChild(link);
  }

  onReady(function () {
    if (window.jQuery && typeof jQuery.fn.typed === "function" && jQuery("#typed").length) {
      jQuery("#typed").typed({
        strings: [
          "Type Writing Text",
          "Auto Type Text",
          "Add any text you like here.",
        ],
        typeSpeed: 100,
        startDelay: 0,
        backSpeed: 60,
        backDelay: 2000,
        loop: true,
        cursorChar: "|",
        contentType: "html",
      });
    }

    var cardBlocks = document.querySelectorAll(".task_app_section .task_block");
    var topStyle = 100;
    cardBlocks.forEach(function (card, index) {
      card.style.top = topStyle + "px";
      card.style.zIndex = String(index + 10);
      topStyle += 28;
    });
  });

  function scheduleIcoFont() {
    var done = false;
    var run = function () {
      if (done) return;
      done = true;
      loadIcoFont();
    };
    // After LCP window, or on first interaction (icons still appear)
    window.setTimeout(run, 4500);
    ["scroll", "touchstart", "mousemove", "keydown"].forEach(function (evt) {
      window.addEventListener(evt, run, { once: true, passive: true });
    });
  }

  if (document.readyState === "complete") {
    scheduleIcoFont();
  } else {
    window.addEventListener("load", scheduleIcoFont);
  }
})();
