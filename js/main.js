function preloader_fade() {
  $("#preloader").fadeOut("slow");
}

$(".drp_btn").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  var $btn = $(this);
  var $item = $btn.closest(".has_dropdown");
  var $menu = $item.children(".sub_menu");
  var willOpen = !$item.hasClass("open");

  // Accordion: close other open dropdowns in this nav
  $item
    .siblings(".has_dropdown.open")
    .removeClass("open")
    .find(".drp_btn")
    .removeClass("active")
    .end()
    .children(".sub_menu")
    .stop(true, true)
    .slideUp(200);

  $item.toggleClass("open", willOpen);
  $btn.toggleClass("active", willOpen);
  $menu.stop(true, true);
  if (willOpen) {
    $menu.slideDown(200);
  } else {
    $menu.slideUp(200);
  }
});

$(document).ready(function () {
    window.setTimeout("preloader_fade();", 300);
});

// Owl builds its dots as <button role="button"> with no text (no accessible
// name) and its arrows as <button role="presentation"> (a role that is not
// allowed on button). Both fail Lighthouse a11y, so patch each carousel's
// generated controls as it initialises or refreshes.
function ewPatchOwlA11y(root) {
  var scope = root && root.querySelectorAll ? root : document;
  var each = function (sel, fn) {
    Array.prototype.forEach.call(scope.querySelectorAll(sel), fn);
  };

  each(".owl-dot", function (dot, i) {
    dot.removeAttribute("role");
    dot.setAttribute("type", "button");
    if (!dot.getAttribute("aria-label")) {
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    }
  });
  each(".owl-prev", function (btn) {
    btn.removeAttribute("role");
    btn.setAttribute("type", "button");
    if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Previous slide");
  });
  each(".owl-next", function (btn) {
    btn.removeAttribute("role");
    btn.setAttribute("type", "button");
    if (!btn.getAttribute("aria-label")) btn.setAttribute("aria-label", "Next slide");
  });
}

// Registered before any carousel is initialised so no init event is missed.
$(document).on(
  "initialized.owl.carousel refreshed.owl.carousel changed.owl.carousel",
  function (e) {
    ewPatchOwlA11y(e.target);
  }
);

// Hero slider: bind first, then init (so all 3 videos rotate)
//
// The hero videos are preload="none" with no autoplay attribute. Playback is
// armed only after the window load event, so ~630KB of MP4 never competes with
// the LCP poster for bandwidth on first paint.
var ewHeroVideosArmed = false;

function playHeroVideos() {
  if (!ewHeroVideosArmed) return;
  $("#frmae_slider .owl-item").each(function () {
    var video = $(this).find("video").get(0);
    if (!video) return;
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    if ($(this).hasClass("active")) {
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {});
      }
    } else {
      video.pause();
    }
  });
}

function armHeroVideos() {
  if (ewHeroVideosArmed) return;
  ewHeroVideosArmed = true;
  playHeroVideos();
}

function ewAfterLoad(fn) {
  if (document.readyState === "complete") ewIdle(fn, 1500);
  else
    window.addEventListener("load", function () {
      ewIdle(fn, 1500);
    });
}

ewAfterLoad(function () {
  ewInitHeroSlider();
  armHeroVideos();
});

var $heroSlider = $("#frmae_slider");
$heroSlider.on(
  "initialized.owl.carousel changed.owl.carousel translated.owl.carousel",
  playHeroVideos
);

// Initialising Owl on the hero was the largest single main-thread task during
// load. The static .hero_poster behind the slider is already painted by then,
// so the carousel can be built after load without any visible gap.
function ewInitHeroSlider() {
  if (!$heroSlider.length || $heroSlider.hasClass("owl-loaded")) return;
  $heroSlider.owlCarousel({
    loop: !0,
    margin: 0,
    items: 1,
    autoplay: !0,
    autoplayTimeout: 4500,
    autoplayHoverPause: !1,
    autoplaySpeed: 800,
    smartSpeed: 800,
    nav: !1,
    dots: !0,
    touchDrag: !0,
    mouseDrag: !0,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } },
  });

  playHeroVideos();
  $heroSlider.find("video").on("loadedmetadata", function () {
    $heroSlider.trigger("refresh.owl.carousel");
  });
}

function ewIdle(fn, timeout) {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(fn, { timeout: timeout || 2500 });
  } else {
    window.setTimeout(fn, 1);
  }
}

function initOwlIfPresent(selector, options) {
  var $el = $(selector);
  if (!$el.length || typeof $el.owlCarousel !== "function") return;
  $el.owlCarousel(options);
}
// Non-hero carousels, keyed by selector. Initialising all nine up-front
// produced a single ~400ms main-thread task inside the TBT window, so each one
// is now initialised on its own as the reader approaches it.
var EW_CAROUSELS = {
  "#company_slider": {
    loop: !0,
    margin: 10,
    nav: !1,
    autoplay: !0,
    smartSpeed: 1500,
    dots: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 5 } },
  },
  "#testimonial_slider": {
    loop: !0,
    margin: 0,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    items: 1,
  },
  "#screen_slider": {
    loop: !0,
    margin: 10,
    nav: !1,
    dots: !0,
    autoplay: !0,
    smartSpeed: 2500,
    center: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 5 } },
  },
  "#feature_slider": {
    loop: !0,
    margin: 16,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      992: { items: 3 },
      1200: { items: 4, margin: 20 },
    },
  },
  "#text_list_flow": {
    loop: !0,
    margin: 0,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  },
  "#text_list_flow_download": {
    loop: !0,
    margin: 0,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  },
  "#client_slider": {
    loop: !0,
    margin: 30,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  },
  "#about_slider": {
    loop: !0,
    margin: 20,
    nav: !1,
    dots: !1,
    center: !0,
    autoplay: !0,
    slideTransition: "linear",
    autoplayTimeout: 4e3,
    autoplaySpeed: 4e3,
    autoWidth: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 4 } },
  },
  "#value_slider": {
    loop: !0,
    margin: 15,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1e3: { items: 3 },
      1400: { margin: 60 },
    },
  },
};

function ewInitCarousel(selector) {
  var $el = $(selector);
  if (!$el.length || $el.hasClass("owl-loaded") || $el.data("ewPending")) return;

  // An autoWidth carousel sizes its stage from the measured width of each
  // slide. Initialising before the slide images have decoded yields a stage
  // that is too narrow, and the floated slides then wrap onto a second row --
  // #about_slider rendered 700px tall instead of 350px. A post-init
  // refresh.owl.carousel does NOT recompute the stage width, so the images
  // have to be in before Owl runs at all.
  var pending = $el
    .find("img")
    .toArray()
    .filter(function (img) {
      return !img.complete;
    });

  // Owl's initial autoWidth pass can measure the stage short -- it produced a
  // 2780px stage for #about_slider whose slides actually total 2957px, so the
  // floated slides wrapped onto a second row and the carousel rendered 700px
  // tall instead of 350px. Its own refresh recomputes the width correctly, so
  // run one right after init. Reproducible on a fully settled page, so this is
  // an Owl measurement bug rather than an image-timing race.
  var initOwl = function () {
    initOwlIfPresent(selector, EW_CAROUSELS[selector]);
    if (!EW_CAROUSELS[selector] || !EW_CAROUSELS[selector].autoWidth) return;
    window.requestAnimationFrame(function () {
      $el.trigger("refresh.owl.carousel");
    });
  };

  if (!pending.length) {
    initOwl();
    return;
  }

  $el.data("ewPending", true);
  var start = function () {
    if (!$el.data("ewPending")) return;
    $el.data("ewPending", false);
    initOwl();
  };

  var remaining = pending.length;
  var settle = function () {
    if (--remaining === 0) start();
  };
  pending.forEach(function (img) {
    img.addEventListener("load", settle, { once: true });
    img.addEventListener("error", settle, { once: true });
  });

  // A stalled or never-loaded image must not leave the carousel hidden.
  window.setTimeout(start, 3000);
}

function ewInitBelowFoldCarousels() {
  Object.keys(EW_CAROUSELS).forEach(ewInitCarousel);
}

// Observe each below-the-fold carousel and initialise only the ones the reader
// actually approaches. Falls back to the old idle-time batch where
// IntersectionObserver is unavailable.
(function () {
  var present = Object.keys(EW_CAROUSELS).filter(function (sel) {
    return document.querySelector(sel);
  });
  if (!present.length) return;

  if (typeof IntersectionObserver !== "function") {
    ewIdle(ewInitBelowFoldCarousels, 2000);
    return;
  }

  // target element -> carousel selector
  var watched = [];

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        watched
          .filter(function (w) {
            return w.target === entry.target;
          })
          .forEach(function (w) {
            ewInitCarousel(w.sel);
          });
      });
    },
    { rootMargin: "400px 0px" }
  );

  present.forEach(function (sel) {
    var el = document.querySelector(sel);
    // Owl's stylesheet sets .owl-carousel{display:none} until it initialises,
    // so the carousel element itself has no box and would NEVER intersect --
    // observing it directly leaves the section permanently invisible. Watch the
    // nearest laid-out ancestor instead.
    var target = el;
    while (target && !target.offsetHeight && target !== document.body) {
      target = target.parentElement;
    }
    target = target || el;
    watched.push({ target: target, sel: sel });
    io.observe(target);
  });

  // Safety net: a carousel that never initialises is invisible content (Owl
  // hides .owl-carousel until load), so guarantee every one comes up after
  // load even if the observer never fires for it. Initialised one per timer
  // tick so the sweep can never become a single long task.
  var sweep = function () {
    window.setTimeout(function () {
      io.disconnect();
      var queue = present.slice();
      var next = function () {
        var sel = queue.shift();
        if (!sel) return;
        ewInitCarousel(sel);
        window.setTimeout(next, 0);
      };
      next();
    }, 3000);
  };
  if (document.readyState === "complete") sweep();
  else window.addEventListener("load", sweep);
})();

let counter_find = document.querySelector("#counter");
void 0 !== counter_find &&
  null != counter_find &&
  window.addEventListener("scroll", function () {
    var e = document.querySelector("#counter").getBoundingClientRect();
    0 <= e.top &&
      e.bottom <= window.innerHeight &&
      $(".counter-value").each(function () {
        var e = $(this),
          o = e.attr("data-count");
        $({ countNum: e.text() }).animate(
          { countNum: o },
          {
            duration: 2e3,
            easing: "swing",
            step: function () {
              e.text(Math.floor(this.countNum));
            },
            complete: function () {
              e.text(this.countNum);
            },
          }
        );
      }),
      (e.top < window.innerHeight && 0 <= e.bottom) ||
        $(".counter-value").each(function () {
          var e = $(this);
          $({ countNum: e.text() }).animate(
            { countNum: 0 },
            {
              duration: 100,
              easing: "swing",
              step: function () {
                e.text(Math.floor(this.countNum));
              },
              complete: function () {
                e.text(this.countNum);
              },
            }
          );
        });
  });
$(document).ready(function () {
    $(".collapse.show").each(function () {
      $(this)
        .prev(".card-header")
        .find(".icon_faq")
        .addClass("icofont-minus")
        .removeClass("icofont-plus");
    }),
      $(".collapse")
        .on("show.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .find(".icon_faq")
            .removeClass("icofont-plus")
            .addClass("icofont-minus");
        })
        .on("hide.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .find(".icon_faq")
            .removeClass("icofont-minus")
            .addClass("icofont-plus");
        }),
      $(".collapse")
        .on("show.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .children("h2")
            .children(".btn")
            .addClass("active");
        })
        .on("hide.bs.collapse", function () {
          $(this)
            .prev(".card-header")
            .children("h2")
            .children(".btn")
            .removeClass("active");
        });
  }),
  $(document).ready(function () {
    $("#Gotop").click(function () {
      var e = $(window).scrollTop();
      e <= 1e3
        ? $("body,html").animate({ scrollTop: 0 }, 1e3)
        : e <= 2e3 && 1e3 < e
        ? $("body,html").animate({ scrollTop: 0 }, 2e3)
        : $("body,html").animate({ scrollTop: 0 }, 2500);
    });
  }),
  $(window).scroll(function () {
    300 < $(window).scrollTop()
      ? $("#Gotop").fadeIn(500)
      : $("#Gotop").fadeOut(500);
  }),
  $(".play-button").click(function (e) {
    $("<iframe>", { src: $(this).data("url") });
    $("#youtubevideo").attr("src", $(this).data("url"));
  }),
  $("#close-video").click(function (e) {
    $("#youtubevideo").attr("src", "");
  }),
  $(document).on("hidden.bs.modal", "#myModal", function () {
    $("#youtubevideo").attr("src", "");
  }),
  $(document).ready(function () {
    $(".navbar-toggler").click(function () {
      $(this)
        .children("span")
        .children(".ico_menu")
        .hasClass("icofont-navigation-menu")
        ? $(this)
            .children("span")
            .children(".ico_menu")
            .removeClass("icofont-navigation-menu")
            .addClass("icofont-close")
        : $(this)
            .children("span")
            .children(".ico_menu")
            .removeClass("icofont-close")
            .addClass("icofont-navigation-menu");
    });

    // Sync hamburger ↔ open/close state with Bootstrap collapse
    var $navCollapse = $("#navbarSupportedContent");
    var $toggleWrap = $(".navbar-toggler .toggle-wrap");
    $navCollapse.on("show.bs.collapse", function () {
      $toggleWrap.addClass("active");
      $(".navbar-toggler").attr("aria-expanded", "true");
    });
    $navCollapse.on("hide.bs.collapse", function () {
      $toggleWrap.removeClass("active");
      $(".navbar-toggler").attr("aria-expanded", "false");
    });
  }),
// Only animate aside drawers when present (not the site navbar hamburger)
$("aside .toggle-wrap, .sidebar .toggle-wrap").on("click", function () {
  $(this).toggleClass("active");
  $("aside").animate({ width: "toggle" }, 200);
});

function initAosWhenReady() {
  var done = false;
  function tryInit() {
    if (done || typeof AOS === "undefined") return false;
    done = true;
    AOS.init({
      once: true,
      duration: 700,
      offset: 60,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    return true;
  }
  window.addEventListener("ew:aos-ready", tryInit);
  ewIdle(function () {
    if (tryInit()) return;
    var n = 0;
    var t = setInterval(function () {
      if (tryInit() || ++n > 50) clearInterval(t);
    }, 100);
  }, 2500);
}
initAosWhenReady();

function ActiveMenu() {
  // Get all links
  const links = document.querySelectorAll(".nav-link");
  const currentUrl = window.location.href;

  // Loop through the links and add the active class to the current link
  links.forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add("active");
    }
  });
}
ActiveMenu();

document.addEventListener("DOMContentLoaded", function () {
  // Get the current page URL or a unique identifier for the page
  let page = window.location.pathname; // This will be the unique identifier (you can also use a custom ID for each page)

  // Get the views for this specific page from localStorage
  let views = localStorage.getItem("pageViews_" + page)
    ? parseInt(localStorage.getItem("pageViews_" + page))
    : 750;

  // Increment the view count for this page
  views++;

  // Store the updated view count in localStorage with the page-specific key
  localStorage.setItem("pageViews_" + page, views);

  // Update the DOM to display the updated view count for this page
  const viewCountEl = document.getElementById("view-count");
  if (viewCountEl) viewCountEl.innerText = `${views} Views`;
});
