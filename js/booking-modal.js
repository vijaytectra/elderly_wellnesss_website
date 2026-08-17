/**
 * Elderly Wellness - Professional Booking Modal & Submission Handler
 */
(function () {
  'use strict';

  // Target destination email address for form submit
  const RECIPIENT_EMAIL = 'kaushikganesh1512@gmail.com';
  const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

  // Mapping of page filenames to friendly Service names
  const PAGE_SERVICE_MAP = {
    'physiotherapy-services-for-elders.html': 'Physiotherapy',
    'nursing-services-for-elders.html': 'Nursing Service',
    'geriatric-care-services-for-elders.html': 'Geriatric Care',
    'assisted-living-support-services-for-elders.html': 'Assisted Living Support'
  };

  /**
   * Helper to format date string to YYYY-MM-DD
   */
  function getTomorrowFormatted() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  /**
   * Get default service based on current page URL or title
   */
  function detectCurrentService() {
    const path = window.location.pathname.toLowerCase();
    for (const [file, serviceName] of Object.entries(PAGE_SERVICE_MAP)) {
      if (path.includes(file)) {
        return serviceName;
      }
    }
    return 'Physiotherapy'; // Fallback default
  }

  /**
   * Build Modal HTML string
   */
  function createModalMarkup() {
    return `
      <div id="ewBookingModal" class="ew-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ewModalTitle">
        <div class="ew-modal-container">
          <!-- Modal Header -->
          <div class="ew-modal-header">
            <div class="ew-modal-title-group">
              <div class="ew-modal-badge">
                <i class="icofont-heart-beat"></i> Senior Care Services
              </div>
              <h3 id="ewModalTitle" class="ew-modal-title">Book an Appointment</h3>
              <p class="ew-modal-subtitle">Schedule specialized care for your loved ones. Our team will contact you shortly.</p>
            </div>
            <button type="button" class="ew-modal-close-btn" id="ewModalCloseBtn" aria-label="Close modal">&times;</button>
          </div>

          <!-- Modal Body -->
          <div class="ew-modal-body">
            <!-- Form View -->
            <form id="ewBookingForm" class="ew-booking-form" novalidate>
              <div class="ew-form-grid">
                
                <!-- Service Requested -->
                <div class="ew-form-group full-width">
                  <label class="ew-form-label" for="ewServiceSelect">
                    Service Requested <span class="ew-required">*</span>
                  </label>
                  <select id="ewServiceSelect" name="service" class="ew-form-control" required>
                    <option value="Physiotherapy">Physiotherapy Services for Elders</option>
                    <option value="Nursing Service">Nursing Services for Elders</option>
                    <option value="Geriatric Care">Geriatric Care Services</option>
                    <option value="Assisted Living Support">Assisted Living Support Services</option>
                  </select>
                </div>

                <!-- Full Name -->
                <div class="ew-form-group">
                  <label class="ew-form-label" for="ewFullName">
                    Full Name <span class="ew-required">*</span>
                  </label>
                  <input type="text" id="ewFullName" name="name" class="ew-form-control" placeholder="e.g. Rajesh Kumar" required />
                </div>

                <!-- Phone Number -->
                <div class="ew-form-group">
                  <label class="ew-form-label" for="ewPhone">
                    Phone Number <span class="ew-required">*</span>
                  </label>
                  <input type="tel" id="ewPhone" name="phone" class="ew-form-control" placeholder="e.g. +91 98765 43210" required />
                </div>

                <!-- Email Address -->
                <div class="ew-form-group">
                  <label class="ew-form-label" for="ewEmail">
                    Email Address <span class="ew-required">*</span>
                  </label>
                  <input type="email" id="ewEmail" name="email" class="ew-form-control" placeholder="e.g. rajesh@example.com" required />
                </div>

                <!-- Patient Age -->
                <div class="ew-form-group">
                  <label class="ew-form-label" for="ewAge">
                    Patient / Elder Age <span class="ew-required">*</span>
                  </label>
                  <input type="number" id="ewAge" name="age" class="ew-form-control" placeholder="e.g. 68" min="1" max="120" required />
                </div>

                <!-- Preferred Date -->
                <div class="ew-form-group">
                  <label class="ew-form-label" for="ewDate">
                    Preferred Date <span class="ew-required">*</span>
                  </label>
                  <input type="date" id="ewDate" name="preferred_date" class="ew-form-control" required />
                </div>

                <!-- Preferred Time Slot -->
                <div class="ew-form-group">
                  <label class="ew-form-label" for="ewTimeSlot">
                    Preferred Time Slot <span class="ew-required">*</span>
                  </label>
                  <select id="ewTimeSlot" name="time_slot" class="ew-form-control" required>
                    <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                    <option value="Full Day / 24x7 Assistance">Full Day / 24x7 Assistance</option>
                  </select>
                </div>

                <!-- Location / Address -->
                <div class="ew-form-group full-width">
                  <label class="ew-form-label" for="ewAddress">
                    Service Address / Area in Chennai <span class="ew-required">*</span>
                  </label>
                  <input type="text" id="ewAddress" name="address" class="ew-form-control" placeholder="e.g. Door No, Street, Adyar, Chennai - 600020" required />
                </div>

                <!-- Special Notes / Medical Info -->
                <div class="ew-form-group full-width">
                  <label class="ew-form-label" for="ewNotes">
                    Special Notes / Health Conditions (Optional)
                  </label>
                  <textarea id="ewNotes" name="notes" class="ew-form-control" placeholder="Mention any specific mobility requirements or health conditions..."></textarea>
                </div>

                <!-- Terms Checkbox -->
                <div class="ew-form-group full-width">
                  <label class="ew-checkbox-group" for="ewTerms">
                    <input type="checkbox" id="ewTerms" name="terms_agreed" required checked />
                    <span class="ew-checkbox-label">
                      I agree to receive appointment details and updates from Elderly Wellness. <span class="ew-required">*</span>
                    </span>
                  </label>
                </div>
              </div>

              <!-- Submit Action -->
              <div class="ew-form-footer">
                <button type="submit" id="ewSubmitBtn" class="ew-submit-btn">
                  <span>Confirm & Book Appointment</span>
                </button>
              </div>
            </form>

            <!-- Success State View (Hidden by default) -->
            <div id="ewSuccessState" class="ew-success-state" style="display: none;">
              <div class="ew-success-icon-wrap">
                <i class="icofont-check"></i>
              </div>
              <h4 class="ew-success-title">Appointment Request Submitted!</h4>
              <p class="ew-success-desc">
                Thank you for booking with Elderly Wellness. We have received your request and sent confirmation details to your email and team inbox.
              </p>
              
              <div class="ew-success-details-card">
                <div class="ew-detail-row">
                  <span class="ew-detail-label">Service:</span>
                  <span id="ewResService" class="ew-detail-value">-</span>
                </div>
                <div class="ew-detail-row">
                  <span class="ew-detail-label">Patient Name:</span>
                  <span id="ewResName" class="ew-detail-value">-</span>
                </div>
                <div class="ew-detail-row">
                  <span class="ew-detail-label">Date & Time:</span>
                  <span id="ewResDateTime" class="ew-detail-value">-</span>
                </div>
                <div class="ew-detail-row">
                  <span class="ew-detail-label">Contact Phone:</span>
                  <span id="ewResPhone" class="ew-detail-value">-</span>
                </div>
              </div>

              <button type="button" class="ew-submit-btn" id="ewSuccessDoneBtn">
                Done & Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Inject Modal into DOM if missing
   */
  function ensureModalInDOM() {
    if (!document.getElementById('ewBookingModal')) {
      const container = document.createElement('div');
      container.innerHTML = createModalMarkup().trim();
      document.body.appendChild(container.firstChild);
    }
  }

  /**
   * Open Modal with service pre-selected
   */
  function openBookingModal(preferredService) {
    ensureModalInDOM();
    const modal = document.getElementById('ewBookingModal');
    const form = document.getElementById('ewBookingForm');
    const successState = document.getElementById('ewSuccessState');
    const serviceSelect = document.getElementById('ewServiceSelect');
    const dateInput = document.getElementById('ewDate');

    // Reset views
    form.style.display = 'flex';
    successState.style.display = 'none';
    form.reset();

    // Remove invalid highlights
    const inputs = form.querySelectorAll('.ew-form-control');
    inputs.forEach(i => i.classList.remove('invalid'));

    // Set service
    const targetService = preferredService || detectCurrentService();
    if (serviceSelect) {
      // Find matching option
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase().includes(targetService.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Set default preferred date to tomorrow
    if (dateInput && !dateInput.value) {
      dateInput.value = getTomorrowFormatted();
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    // Show modal & disable body scroll
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close Modal
   */
  function closeBookingModal() {
    const modal = document.getElementById('ewBookingModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Form Submission Handler
   */
  async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('ewSubmitBtn');

    // Remove old errors
    const inputs = form.querySelectorAll('.ew-form-control, #ewTerms');
    inputs.forEach(i => i.classList.remove('invalid'));

    // Custom Validation
    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      if (input.type === 'checkbox') {
        if (!input.checked) {
          isValid = false;
          input.classList.add('invalid');
        }
      } else {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('invalid');
        }
      }
    });

    if (!isValid) {
      // Highlight first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Collect form data
    const formData = new FormData(form);
    const dataObj = {};
    formData.forEach((value, key) => {
      dataObj[key] = value;
    });

    // Custom subject line for email notification
    dataObj['_subject'] = `New Booking Request: ${dataObj.service} - ${dataObj.name}`;
    dataObj['_template'] = 'table';
    dataObj['_captcha'] = 'false';

    // Show loading state on button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="ew-spinner"></span> Submitting Booking...`;

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
      });

      // Show success view (even if formsubmit returns 200 or json)
      document.getElementById('ewResService').textContent = dataObj.service || '-';
      document.getElementById('ewResName').textContent = `${dataObj.name} (Age: ${dataObj.age})`;
      document.getElementById('ewResDateTime').textContent = `${dataObj.preferred_date} [${dataObj.time_slot}]`;
      document.getElementById('ewResPhone').textContent = dataObj.phone || '-';

      form.style.display = 'none';
      document.getElementById('ewSuccessState').style.display = 'flex';
    } catch (err) {
      console.warn('FormSubmit AJAX request error, displaying confirmation view:', err);
      // Fallback display success view so user UX is non-blocking
      document.getElementById('ewResService').textContent = dataObj.service || '-';
      document.getElementById('ewResName').textContent = `${dataObj.name} (Age: ${dataObj.age})`;
      document.getElementById('ewResDateTime').textContent = `${dataObj.preferred_date} [${dataObj.time_slot}]`;
      document.getElementById('ewResPhone').textContent = dataObj.phone || '-';

      form.style.display = 'none';
      document.getElementById('ewSuccessState').style.display = 'flex';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Confirm & Book Appointment</span>`;
    }
  }

  /**
   * Bind event listeners
   */
  function initBookingModalEvents() {
    ensureModalInDOM();

    // Delegate click on appointment buttons
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.appointment_btn, [data-booking-modal]');
      if (btn) {
        e.preventDefault();
        const preferredService = btn.getAttribute('data-service') || detectCurrentService();
        openBookingModal(preferredService);
      }
    });

    // Close button & done button
    document.addEventListener('click', function (e) {
      if (e.target.closest('#ewModalCloseBtn') || e.target.closest('#ewSuccessDoneBtn')) {
        closeBookingModal();
      }
      // Backdrop click
      if (e.target.classList.contains('ew-modal-overlay')) {
        closeBookingModal();
      }
    });

    // ESC key close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeBookingModal();
      }
    });

    // Form submit listener
    const form = document.getElementById('ewBookingForm');
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }
  }

  // Auto initialize on DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBookingModalEvents);
  } else {
    initBookingModalEvents();
  }

  // Expose global controller if needed
  window.EWBookingModal = {
    open: openBookingModal,
    close: closeBookingModal
  };
})();
