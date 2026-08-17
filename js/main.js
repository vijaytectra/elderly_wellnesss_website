function preloader_fade() {
  $("#preloader").fadeOut("slow");
}
// Accessible Click/Tap, Keyboard & Hover-Intent Dropdown Navigation
(function () {
  var openTimer = null;
  var closeTimer = null;

  function closeAllDropdowns() {
    $(".has_dropdown").removeClass("open").find(".drp_btn").attr("aria-expanded", "false");
    if ($(window).width() > 991) {
      $(".has_dropdown .sub_menu").stop(true, true).fadeOut(150);
    } else {
      $(".has_dropdown .sub_menu").stop(true, true).slideUp(150);
    }
  }

  function openSingleDropdown($item) {
    // Close all other dropdowns
    $(".has_dropdown").not($item).removeClass("open").find(".drp_btn").attr("aria-expanded", "false");
    if ($(window).width() > 991) {
      $(".has_dropdown").not($item).find(".sub_menu").stop(true, true).fadeOut(150);
    } else {
      $(".has_dropdown").not($item).find(".sub_menu").stop(true, true).slideUp(150);
    }

    $item.addClass("open").find(".drp_btn").attr("aria-expanded", "true");
    if ($(window).width() > 991) {
      $item.find(".sub_menu").stop(true, true).fadeIn(150);
    } else {
      $item.find(".sub_menu").stop(true, true).slideDown(150);
    }
  }

  // Combined Click & Tap Handler for Parent Link and Arrow Toggle Button
  $(document).on("click", ".has_dropdown > a, .drp_btn", function (e) {
    var $parent = $(this).closest(".has_dropdown");
    var href = $parent.children("a").attr("href");
    var isLink = $(this).is("a");

    if (!isLink || !href || href === "#" || href === "javascript:void(0);" || href.includes("#")) {
      e.preventDefault();
      e.stopPropagation();

      if ($parent.hasClass("open")) {
        closeAllDropdowns();
      } else {
        openSingleDropdown($parent);
      }
    }
  });

  // Close dropdown when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".has_dropdown").length) {
      closeAllDropdowns();
    }
  });

  // Desktop Hover Intent with 180ms open & 250ms close delays
  $(document).on("mouseenter", ".has_dropdown", function () {
    if ($(window).width() <= 991) return;
    var $this = $(this);
    clearTimeout(closeTimer);
    openTimer = setTimeout(function () {
      openSingleDropdown($this);
    }, 180);
  });

  $(document).on("mouseleave", ".has_dropdown", function () {
    if ($(window).width() <= 991) return;
    var $this = $(this);
    clearTimeout(openTimer);
    closeTimer = setTimeout(function () {
      $this.removeClass("open").find(".drp_btn").attr("aria-expanded", "false");
      $this.find(".sub_menu").stop(true, true).fadeOut(150);
    }, 250);
  });

  // Keyboard navigation: Escape key closes dropdown and returns focus
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      var $openDropdown = $(".has_dropdown.open");
      if ($openDropdown.length) {
        closeAllDropdowns();
        $openDropdown.find(".drp_btn, > a").first().focus();
      }
    }
  });

  // Keyboard navigation: Enter & Space toggle button trigger
  $(document).on("keydown", ".drp_btn", function (e) {
    if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      $(this).trigger("click");
    }
  });
})();
$(document).ready(function () {
  window.setTimeout("preloader_fade();", 500);
  var currentYear = new Date().getFullYear();
  $(".ew-current-year, #yr, #copyright-year").text(currentYear);

  // Inject Floating WhatsApp Support Button on pages without native Chaty (Logo only)
  if ($(".chaty-widget, .chaty-main-button, .ew-whatsapp-floating-btn").length === 0) {
    var waUrl = "https://api.whatsapp.com/send?phone=919944890577&text=Hello%20Elderly%20Wellness%2C%20I%20would%20like%20to%20inquire%20about%20your%20senior%20care%20services.";
    var waHtml = '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" class="ew-whatsapp-floating-btn" aria-label="Contact Elderly Wellness on WhatsApp">' +
                 '<div class="ew-wa-circle">' +
                 '<svg width="34" height="34" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                 '<circle cx="19.4395" cy="19.4395" r="19.4395" fill="#49E670"/>' +
                 '<path d="M12.9821 10.1115C12.7029 10.7767 11.5862 11.442 10.7486 11.575C10.1902 11.7081 9.35269 11.8411 6.84003 10.7767C3.48981 9.44628 1.39593 6.25317 1.25634 6.12012C1.11674 5.85403 0 4.39053 0 2.92702C0 1.46351 0.83755 0.665231 1.11673 0.399139C1.39592 0.133046 1.8147 0 2.23348 0C2.37307 0 2.51267 0 2.65226 0C2.93144 0 3.21063 0 3.35022 0.532183C3.62941 1.19741 4.32736 2.66092 4.32736 2.79397C4.46696 2.92702 4.46696 3.19311 4.32736 3.32616C4.18777 3.59225 4.18777 3.59224 3.90858 3.85834C3.76899 3.99138 3.6294 4.12443 3.48981 4.39052C3.35022 4.52357 3.21063 4.78966 3.35022 5.05576C3.48981 5.32185 4.18777 6.38622 5.16491 7.18449C6.42125 8.24886 7.39839 8.51496 7.81717 8.78105C8.09636 8.91409 8.37554 8.9141 8.65472 8.648C8.93391 8.38191 9.21309 7.98277 9.49228 7.58363C9.77146 7.31754 10.0507 7.1845 10.3298 7.31754C10.609 7.45059 12.2841 8.11582 12.5633 8.38191C12.8425 8.51496 13.1217 8.648 13.1217 8.78105C13.1217 8.78105 13.1217 9.44628 12.9821 10.1115Z" transform="translate(12.9597 12.9597)" fill="#FAFAFA"/>' +
                 '<path d="M0.196998 23.295L0.131434 23.4862L0.323216 23.4223L5.52771 21.6875C7.4273 22.8471 9.47325 23.4274 11.6637 23.4274C18.134 23.4274 23.4274 18.134 23.4274 11.6637C23.4274 5.19344 18.134 -0.1 11.6637 -0.1C5.19344 -0.1 -0.1 5.19344 -0.1 11.6637C-0.1 13.9996 0.624492 16.3352 1.93021 18.2398L0.196998 23.295ZM5.87658 19.8847L5.84025 19.8665L5.80154 19.8788L2.78138 20.8398L3.73978 17.9646L3.75932 17.906L3.71562 17.8623L3.43104 17.5777C2.27704 15.8437 1.55796 13.8245 1.55796 11.6637C1.55796 6.03288 6.03288 1.55796 11.6637 1.55796C17.2945 1.55796 21.7695 6.03288 21.7695 11.6637C21.7695 17.2945 17.2945 21.7695 11.6637 21.7695C9.64222 21.7695 7.76778 21.1921 6.18227 20.039L6.17557 20.0342L6.16817 20.0305L5.87658 19.8847Z" transform="translate(7.7758 7.77582)" fill="white" stroke="white" stroke-width="0.2"/>' +
                 '</svg>' +
                 '</div>' +
                 '</a>';
    document.body.insertAdjacentHTML('beforeend', waHtml);
  }

  // Floating WhatsApp icon is active on all pages
});

if ($.fn && $.fn.owlCarousel) {
  if ($("#frmae_slider").length) {
    var $heroSlider = $("#frmae_slider").owlCarousel({
      loop: false,
      margin: 0,
      autoplay: false,
      autoplayTimeout: 0,
      autoplayHoverPause: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      freeDrag: false,
      smartSpeed: 800,
      nav: false,
      dots: false,
      responsive: { 0: { items: 1 }, 600: { items: 1 }, 1000: { items: 1 } },
    });
    var owlData = $heroSlider.data('owl.carousel');
    if (owlData && owlData._plugins && owlData._plugins.autoplay) {
      owlData._plugins.autoplay.stop();
      owlData._plugins.autoplay._next = function() {};
      owlData._plugins.autoplay.play = function() {};
    }
  }

  }
  $("#company_slider").owlCarousel({
    loop: !0,
    margin: 10,
    nav: !1,
    autoplay: !0,
    smartSpeed: 1500,
    dots: !0,
    responsive: { 0: { items: 2 }, 600: { items: 3 }, 1e3: { items: 5 } },
  }),
  $("#testimonial_slider").owlCarousel({
    loop: !0,
    margin: 10,
    nav: !1,
    autoplay: !0,
    smartSpeed: 2500,
    dots: !0,
    responsive: { 0: { items: 1 }, 600: { items: 1 }, 1e3: { items: 1 } },
  }),
  $("#screen_slider").owlCarousel({
    loop: !0,
    margin: 10,
    nav: !1,
    dots: !0,
    autoplay: !0,
    smartSpeed: 2500,
    center: !0,
    responsive: { 0: { items: 1 }, 600: { items: 3 }, 1e3: { items: 5 } },
  }),
  $("#feature_slider").owlCarousel({
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
  }),
  $("#text_list_flow").owlCarousel({
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
  }),
  $("#text_list_flow_download").owlCarousel({
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
  }),
  $("#client_slider").owlCarousel({
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
  }),
  $("#about_slider").owlCarousel({
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
  }),
  $("#value_slider").owlCarousel({
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
  }),
  $("#testimonial_slider").owlCarousel({
    loop: !0,
    margin: 0,
    nav: !0,
    dots: !1,
    autoplay: !0,
    smartSpeed: 2500,
    items: 1,
  });
}
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
  }),
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
    function setNavState(isOpen) {
      var $toggler = $(".navbar-toggler");
      var $wrap = $toggler.find(".toggle-wrap");
      if (isOpen) {
        $wrap.addClass("active");
        $toggler.removeClass("collapsed").attr("aria-expanded", "true");
      } else {
        $wrap.removeClass("active");
        $toggler.addClass("collapsed").attr("aria-expanded", "false");
      }
    }

    $(".navbar-collapse")
      .on("show.bs.collapse", function () {
        setNavState(true);
      })
      .on("hide.bs.collapse", function () {
        setNavState(false);
      });

    // Close mobile menu and reset icon to menu icon when selecting a menu item
    $(document).on("click", ".navbar-collapse a", function (e) {
      if ($(window).width() < 992) {
        var href = $(this).attr("href");
        var isDropdownToggle = (!href || href === "#" || href === "index.html#" || href.endsWith("#") || $(this).siblings(".sub_menu").length > 0);

        if (isDropdownToggle) {
          var $subMenu = $(this).siblings(".sub_menu");
          if ($subMenu.length > 0) {
            e.preventDefault();
            $subMenu.slideToggle(300);
          }
        } else {
          var $navCollapse = $(this).closest(".navbar-collapse");
          if ($navCollapse.hasClass("show")) {
            $navCollapse.collapse("hide");
          }
        }
      }
    });
  }),
  AOS.init();

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

  // Dynamically wrap post-navigation icons in native <a> tags & attach click handlers
  function setupPostNavLinks() {
    document.querySelectorAll(".nav-previous, .nav-next").forEach(function (container) {
      const link = container.querySelector("a");
      if (link && link.href) {
        const href = link.getAttribute("href");
        const icon = container.querySelector(".gp-icon");
        if (icon && !icon.closest("a")) {
          const iconLink = document.createElement("a");
          iconLink.setAttribute("href", href);
          if (link.hasAttribute("rel")) {
            iconLink.setAttribute("rel", link.getAttribute("rel"));
          }
          iconLink.className = "gp-icon-link";
          icon.parentNode.insertBefore(iconLink, icon);
          iconLink.appendChild(icon);
        }

        container.style.cursor = "pointer";
        container.onclick = function (e) {
          if (e.target.tagName !== "A" && !e.target.closest("a")) {
            window.location.href = link.href;
          }
        };
      }
    });
  }

  setupPostNavLinks();

  // Clean up trailing colons and leading numbers from Table of Contents links
  function cleanTocLinks() {
    document.querySelectorAll("#rank-math-toc nav a").forEach(function (link) {
      let text = link.textContent.trim();
      if (text.endsWith(":")) {
        text = text.slice(0, -1).trim();
      }
      text = text.replace(/^\s*\d+[\.\)\-]\s*/, "");
      link.textContent = text;
    });
  }

  cleanTocLinks();

  // WCAG Form Validation & Handling for ewPageCallbackForm
  $(document).on("submit", ".ew-4field-form, #ewPageCallbackForm", function (e) {
    e.preventDefault();
    var $form = $(this);
    var isValid = true;

    // Clear previous error messages
    $form.find(".ew-field-error").hide();

    // Validate Name
    var $name = $form.find("input[name='name'], #ew_name");
    if ($name.length && (!$.trim($name.val()) || $.trim($name.val()).length < 2)) {
      $form.find("#ew_name_error").show();
      isValid = false;
    }

    // Validate Phone
    var $phone = $form.find("input[name='phone'], #ew_phone");
    var phoneVal = $phone.length ? $.trim($phone.val()).replace(/\D/g, "") : "";
    if ($phone.length && (!phoneVal || phoneVal.length < 10)) {
      $form.find("#ew_phone_error").show();
      isValid = false;
    }

    // Validate Required Service Consent Checkbox
    var $consentService = $form.find("#ew_consent_service, input[name='consent_service']");
    if ($consentService.length && !$consentService.is(":checked")) {
      $form.find("#ew_consent_service_error").show();
      isValid = false;
    }

    if (!isValid) {
      // Keep everything user typed - DO NOT RESET FORM
      return false;
    }

    // On valid submit: show clear success message inside aria-live="polite"
    var $successMsg = $form.find("#ew_form_success");
    if ($successMsg.length) {
      $successMsg.slideDown();
    } else {
      $form.prepend('<div id="ew_form_success" aria-live="polite" style="background: #f0fdf4; border: 1.5px solid #86efac; color: #166534; padding: 16px 20px; border-radius: 12px; margin-bottom: 24px; font-weight: 700; font-size: 15px; text-align: center;"><i class="icofont-check-circled" style="font-size: 20px; vertical-align: -2px; margin-right: 6px;"></i> Thank you! Your callback request has been received. Our care specialist will reach out shortly.</div>');
    }

    // Disable submit button to prevent double submits
    $form.find("button[type='submit']").attr("disabled", true).css("opacity", "0.6");
  });
});
