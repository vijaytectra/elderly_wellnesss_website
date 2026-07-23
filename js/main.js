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

// Hero slider: bind first, then init (so all 3 videos rotate)
function playHeroVideos() {
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

var $heroSlider = $("#frmae_slider");
$heroSlider.on(
  "initialized.owl.carousel changed.owl.carousel translated.owl.carousel",
  playHeroVideos
);
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

// Non-hero carousels: wait until idle so first paint / LCP stay free
ewIdle(function () {
  initOwlIfPresent("#company_slider", {
    loop: !0,
    margin: 10,
    nav: !1,
    autoplay: !0,
    smartSpeed: 1500,
    dots: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 5 } },
  });
  initOwlIfPresent("#testimonial_slider", {
    loop: !0,
    margin: 0,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    items: 1,
  });
  initOwlIfPresent("#screen_slider", {
    loop: !0,
    margin: 10,
    nav: !1,
    dots: !0,
    autoplay: !0,
    smartSpeed: 2500,
    center: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 5 } },
  });
  initOwlIfPresent("#feature_slider", {
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
  });
  initOwlIfPresent("#text_list_flow", {
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
  });
  initOwlIfPresent("#text_list_flow_download", {
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
  });
  initOwlIfPresent("#client_slider", {
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
  });
  initOwlIfPresent("#about_slider", {
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
  });
  initOwlIfPresent("#value_slider", {
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
  });
}, 2000);

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
