/* ==========================================================================
   ELDERLY WELLNESS GOOGLE ANALYTICS 4 & MICROSOFT CLARITY ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // 1. Initialize GA4 & Microsoft Clarity Loaders
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Microsoft Clarity Tracker Setup
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "ew_clarity_id");

  // Event dispatch helper
  function trackEvent(eventName, eventParams) {
    var params = eventParams || {};
    params.page_location = window.location.href;
    params.page_title = document.title;
    
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    if (window.clarity) {
      window.clarity("event", eventName);
    }
    // Local verification logging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[GA4 & Clarity Event]', eventName, params);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var pageUrl = window.location.pathname;

    // 1. Track Pricing Page View
    if (pageUrl.indexOf('pricing') !== -1) {
      trackEvent('pricing_page_view', { page: pageUrl });
    }

    // 2. Track cta_call_click on any tel: link
    document.body.addEventListener('click', function (e) {
      var target = e.target.closest('a[href^="tel:"]');
      if (target) {
        trackEvent('cta_call_click', {
          phone_number: target.getAttribute('href').replace('tel:', ''),
          link_text: (target.textContent || '').trim(),
          cta_position: target.closest('header') ? 'header' : (target.closest('footer') ? 'footer' : 'body')
        });
      }
    });

    // 3. Track cta_whatsapp_click on any wa.me or whatsapp link
    document.body.addEventListener('click', function (e) {
      var target = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
      if (target) {
        trackEvent('cta_whatsapp_click', {
          link_url: target.getAttribute('href'),
          link_text: (target.textContent || '').trim(),
          cta_position: target.closest('header') ? 'header' : (target.closest('footer') ? 'footer' : 'body')
        });
      }
    });

    // 4. Track app_badge_click (Google Play / App Store)
    document.body.addEventListener('click', function (e) {
      var target = e.target.closest('a[href*="play.google.com"], a[href*="apps.apple.com"]');
      if (target) {
        var isGoogle = target.href.indexOf('play.google.com') !== -1;
        trackEvent('app_badge_click', {
          store_name: isGoogle ? 'Google Play' : 'App Store',
          link_url: target.href
        });
      }
    });

    // 5. Track blog_to_service_click (Clicks from blog posts to main service pages)
    if (pageUrl.indexOf('/blogs/') !== -1) {
      document.body.addEventListener('click', function (e) {
        var target = e.target.closest('a[href*="physiotherapy-services"], a[href*="nursing-services"], a[href*="geriatric-care"], a[href*="assisted-living"]');
        if (target) {
          trackEvent('blog_to_service_click', {
            target_service: target.getAttribute('href'),
            anchor_text: (target.textContent || '').trim()
          });
        }
      });
    }

    // 6. Track nav_dropdown_open (mouse, touch, keyboard)
    var navDropdowns = document.querySelectorAll('.has_dropdown, .menu-toggle');
    navDropdowns.forEach(function (el) {
      var triggeredBy = 'mouse';
      el.addEventListener('touchstart', function () { triggeredBy = 'touch'; }, { passive: true });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') triggeredBy = 'keyboard'; });
      
      el.addEventListener('click', function () {
        trackEvent('nav_dropdown_open', {
          trigger_method: triggeredBy,
          menu_name: 'Services Dropdown'
        });
      });
    });

    // 7. Track Callback Form Interaction (start, submit, error)
    var callbackForms = document.querySelectorAll('form, #callback-form, .callback-form');
    callbackForms.forEach(function (form) {
      var formStarted = false;
      form.addEventListener('focusin', function () {
        if (!formStarted) {
          formStarted = true;
          trackEvent('callback_form_start', { form_id: form.id || 'callback_form' });
        }
      });

      form.addEventListener('submit', function (e) {
        var isValid = form.checkValidity ? form.checkValidity() : true;
        if (isValid) {
          trackEvent('callback_form_submit', { form_id: form.id || 'callback_form' });
        } else {
          trackEvent('callback_form_error', { form_id: form.id || 'callback_form', error_reason: 'validation_failed' });
        }
      });
    });

    // 8. Track service_page_scroll_depth (25%, 50%, 75%, 100%)
    if (pageUrl.indexOf('services') !== -1 || pageUrl.indexOf('geriatric') !== -1 || pageUrl.indexOf('nursing') !== -1 || pageUrl.indexOf('physiotherapy') !== -1 || pageUrl.indexOf('assisted-living') !== -1) {
      var scrollDepthsTracked = { 25: false, 50: false, 75: false, 100: false };
      window.addEventListener('scroll', function () {
        var winHeight = window.innerHeight;
        var docHeight = document.documentElement.scrollHeight;
        var scrollTop = window.scrollY || window.pageYOffset;
        var scrollPercent = Math.round(((scrollTop + winHeight) / docHeight) * 100);

        [25, 50, 75, 100].forEach(function (depth) {
          if (scrollPercent >= depth && !scrollDepthsTracked[depth]) {
            scrollDepthsTracked[depth] = true;
            trackEvent('service_page_scroll_depth', { depth_percent: depth, page: pageUrl });
          }
        });
      }, { passive: true });
    }
  });
})();
