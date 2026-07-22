/**
 * Homepage helpers restored from inline script:
 * - Typed.js init
 * - Stacked feature cards
 */
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
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
})();
