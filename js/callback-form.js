/**
 * Elderly Wellness - 4-Field Callback Form & Pre-filled WhatsApp Lead Manager
 */
(function () {
  'use strict';

  const RECIPIENT_EMAIL = 'kaushikganesh1512@gmail.com';
  const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

  // Page context mapping for WhatsApp and default service dropdowns
  const PAGE_CONTEXT = [
    { pattern: 'physiotherapy', name: 'Physiotherapy', waText: 'Hi, I would like to know about Physiotherapy services' },
    { pattern: 'nursing', name: 'Home Nursing', waText: 'Hi, I would like to know about Home Nursing services' },
    { pattern: 'geriatric', name: 'Geriatric Care', waText: 'Hi, I would like to know about Geriatric Care services' },
    { pattern: 'assisted-living', name: 'Assisted Living', waText: 'Hi, I would like to know about Assisted Living services' },
    { pattern: 'pricing', name: 'General Care Inquiry', waText: 'Hi, I would like to inquire about Elderly Care pricing and plans' },
    { pattern: 'contact', name: 'General Care Inquiry', waText: 'Hi, I would like to contact Elderly Wellness' }
  ];

  /**
   * Detect current page service context
   */
  function getCurrentContext() {
    const path = window.location.pathname.toLowerCase();
    for (const ctx of PAGE_CONTEXT) {
      if (path.includes(ctx.pattern)) {
        return ctx;
      }
    }
    return { name: 'General Care Inquiry', waText: 'Hi, I would like to inquire about Elderly Wellness care services' };
  }

  /**
   * Get dynamic WhatsApp link with pre-filled page context
   */
  function getContextualWhatsAppUrl() {
    const ctx = getCurrentContext();
    return `https://wa.me/919944890577?text=${encodeURIComponent(ctx.waText)}`;
  }

  /**
   * Save Lead to local Database (localStorage)
   */
  function saveLeadToStorage(leadData) {
    try {
      const existingLeads = JSON.parse(localStorage.getItem('ew_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('ew_leads', JSON.stringify(existingLeads));
    } catch (e) {
      console.warn('Could not store lead locally', e);
    }
  }

  /**
   * Submit 4-Field Callback Form
   */
  async function submitCallbackForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validate inputs
    let isValid = true;
    const nameInput = form.querySelector('[name="name"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const serviceInput = form.querySelector('[name="service"]');
    const timeInput = form.querySelector('[name="time_to_call"]');

    [nameInput, phoneInput, serviceInput, timeInput].forEach(input => {
      if (input && !input.value.trim()) {
        input.classList.add('invalid');
        isValid = false;
      } else if (input) {
        input.classList.remove('invalid');
      }
    });

    if (!isValid) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="icofont-spinner alt-1 spin"></i> Submitting...';
    }

    const leadPayload = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      service: serviceInput ? serviceInput.value : 'General Inquiry',
      time_to_call: timeInput ? timeInput.value : 'Anytime',
      submitted_from_page: window.location.href,
      submitted_at: new Date().toLocaleString()
    };

    // 1. Save lead to local database
    saveLeadToStorage(leadPayload);

    // 2. Submit to email inbox via FormSubmit AJAX
    try {
      await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Lead: Callback Request from ${leadPayload.name} (${leadPayload.service})`,
          ...leadPayload
        })
      });
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
    }

    // 3. Hide header and form, show Success View
    const card = form.closest('.ew-callback-card');
    if (card) {
      const header = card.querySelector('.ew-callback-header');
      if (header) {
        header.style.display = 'none';
      }
    }

    const successBox = document.createElement('div');
    successBox.className = 'ew-callback-success';
    successBox.innerHTML = `
      <i class="icofont-check-circled"></i>
      <h4>Callback Request Submitted!</h4>
      <p>Thank you. A senior care specialist will call you within 2 hours.</p>
      
      <div class="ew-success-summary-box">
        <div class="ew-summary-row">
          <span class="ew-summary-label">Name:</span>
          <span class="ew-summary-val">${leadPayload.name}</span>
        </div>
        <div class="ew-summary-row">
          <span class="ew-summary-label">Phone:</span>
          <span class="ew-summary-val">${leadPayload.phone}</span>
        </div>
        <div class="ew-summary-row">
          <span class="ew-summary-label">Service:</span>
          <span class="ew-summary-val">${leadPayload.service}</span>
        </div>
        <div class="ew-summary-row">
          <span class="ew-summary-label">Best Time:</span>
          <span class="ew-summary-val">${leadPayload.time_to_call}</span>
        </div>
      </div>
    `;

    form.insertAdjacentElement('afterend', successBox);
    form.style.display = 'none';
  }

  /**
   * Create Quick Callback Modal
   */
  function openCallbackModal() {
    let modal = document.getElementById('ewCallbackModal');
    if (!modal) {
      const currentCtx = getCurrentContext();
      const modalMarkup = `
        <div id="ewCallbackModal" class="ew-modal-overlay" style="display: flex; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); z-index: 999999; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px);">
          <div class="ew-callback-card" style="width: 100%; max-width: 540px; position: relative; animation: modalFadeIn 0.3s ease;">
            <button type="button" id="ewCallbackCloseBtn" style="position: absolute; top: 16px; right: 20px; background: none; border: none; font-size: 24px; color: #64748b; cursor: pointer;">&times;</button>
            <div class="ew-callback-header">
              <span class="ew-callback-badge"><i class="icofont-headphone-alt"></i> Fast Response</span>
              <h3>Request a Callback</h3>
              <p>Leave your contact details and our care specialist in Chennai will get in touch.</p>
            </div>

            <form class="ew-4field-form" id="ewModalCallbackForm">
              <div class="ew-field-group">
                <label class="ew-field-label">Your Name *</label>
                <input type="text" name="name" class="ew-field-control" placeholder="e.g. Rajesh Kumar" required />
              </div>
              <div class="ew-field-group">
                <label class="ew-field-label">Phone Number *</label>
                <input type="tel" name="phone" class="ew-field-control" placeholder="e.g. +91 98765 43210" required />
              </div>
              <div class="ew-field-group">
                <label class="ew-field-label">Which Service *</label>
                <select name="service" class="ew-field-control" required>
                  <option value="Physiotherapy" ${currentCtx.name === 'Physiotherapy' ? 'selected' : ''}>Physiotherapy at Home</option>
                  <option value="Home Nursing" ${currentCtx.name === 'Home Nursing' ? 'selected' : ''}>Home Nursing Care</option>
                  <option value="Geriatric Care" ${currentCtx.name === 'Geriatric Care' ? 'selected' : ''}>Geriatric Care</option>
                  <option value="Assisted Living" ${currentCtx.name === 'Assisted Living' ? 'selected' : ''}>Assisted Living Support</option>
                  <option value="General Care Inquiry" ${currentCtx.name === 'General Care Inquiry' ? 'selected' : ''}>General Inquiry</option>
                </select>
              </div>
              <div class="ew-field-group">
                <label class="ew-field-label">Best Time to Call *</label>
                <select name="time_to_call" class="ew-field-control" required>
                  <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                  <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                  <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                  <option value="Anytime (As soon as possible)" selected>Anytime (ASAP)</option>
                </select>
              </div>
              <button type="submit" class="ew-callback-submit-btn">Request Callback Now</button>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalMarkup);
      modal = document.getElementById('ewCallbackModal');

      document.getElementById('ewCallbackCloseBtn').onclick = () => {
        modal.remove();
      };
      document.getElementById('ewModalCallbackForm').onsubmit = (e) => {
        e.preventDefault();
        submitCallbackForm(e.target);
      };
    }
  }

  /**
   * Bind events & update WhatsApp links contextually
   */
  document.addEventListener('DOMContentLoaded', function () {
    const waUrl = getContextualWhatsAppUrl();

    // Update all WhatsApp action buttons with page-specific pre-filled text
    document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"], .ew-bar-whatsapp').forEach(a => {
      a.href = waUrl;
    });

    // Handle all callback forms on the page
    document.querySelectorAll('.ew-4field-form').forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitCallbackForm(form);
      });
    });

    // Handle "See the full process" expander buttons
    document.querySelectorAll('.ew-expand-process-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const targetId = btn.getAttribute('aria-controls');
        const targetEl = document.getElementById(targetId);
        
        if (targetEl) {
          if (isExpanded) {
            btn.setAttribute('aria-expanded', 'false');
            targetEl.style.display = 'none';
            btn.querySelector('span').textContent = 'See the full process';
            const icon = btn.querySelector('.ew-toggle-icon');
            if (icon) icon.className = 'icofont-navigation-down ew-toggle-icon';
          } else {
            btn.setAttribute('aria-expanded', 'true');
            targetEl.style.display = 'block';
            btn.querySelector('span').textContent = 'Hide full process';
            const icon = btn.querySelector('.ew-toggle-icon');
            if (icon) icon.className = 'icofont-navigation-up ew-toggle-icon';
          }
        }
      });
    });

    // Attach click handler to "Request a Callback" & "Book Care" buttons to open Modal if not scrolling to form
    document.querySelectorAll('a[href*="contact.html"], .ew-book-care-btn, [data-callback-trigger]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const hasEmbeddedForm = document.querySelector('#callback-form-section');
        if (!hasEmbeddedForm && !window.location.pathname.includes('contact.html')) {
          e.preventDefault();
          openCallbackModal();
        }
      });
    });
  });
})();
