import os
import json
import re

FAQ_SECTION_TEMPLATE = '''
      <!-- SHARED FAQ COMPONENT: Synchronized with data/faqs.json. Update all service pages & about.html together. -->
      <section class="row_am faq_section" id="faq-section">
        <div class="container">
          <div class="section_title" data-aos="fade-up" data-aos-duration="1500">
            <span class="title_badge">Question &amp; Answer</span>
            <h2><span>FAQs</span> - Frequently Asked Questions</h2>
          </div>
          <div class="tab-content" id="myTabContent" data-aos="fade-up" data-aos-duration="1500">
            <div class="tab-pane fade show active" id="genral" role="tabpanel" aria-labelledby="genral-tab">
              <div class="accordion" id="accordionExample">
                <div class="row">
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h3 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            What happens after I sign up and select the service I need?
                            <span class="icons">
                              <i class="icofont-plus"></i>
                              <i class="icofont-minus"></i>
                            </span>
                          </button>
                        </h3>
                      </div>
                      <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                          Once you sign up and select the service you need, our Elderly Wellness specialist will call you. The specialist will discuss your requirements and assign the most suitable physiotherapist, nurse, or caregiver based on the elderly person's needs and preferences.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h3 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Can I book more than one session in a day?
                            <span class="icons">
                              <i class="icofont-plus"></i>
                              <i class="icofont-minus"></i>
                            </span>
                          </button>
                        </h3>
                      </div>
                      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                          Yes, you can book multiple sessions for the same day. During the call with our specialist, you can confirm the availability of the service provider and schedule additional sessions if needed.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h3 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            How do I pay for the service?
                            <span class="icons">
                              <i class="icofont-plus"></i>
                              <i class="icofont-minus"></i>
                            </span>
                          </button>
                        </h3>
                      </div>
                      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          Once the service provider is assigned, you'll receive the details and can make a secure payment directly through the app. After the payment is confirmed, the booking will be finalized.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="card">
                      <div class="card-header" id="headingFour">
                        <h3 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            How can I change the contact information or address of the elderly person?
                            <span class="icons">
                              <i class="icofont-plus"></i>
                              <i class="icofont-minus"></i>
                            </span>
                          </button>
                        </h3>
                      </div>
                      <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                        <div class="card-body">
                          You can update the contact details and address of the elderly person directly in your account settings within the app. Please ensure that these details are updated before finalizing any service bookings.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingFive">
                        <h3 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                            How do I track the status of my booking or service?
                            <span class="icons">
                              <i class="icofont-plus"></i>
                              <i class="icofont-minus"></i>
                            </span>
                          </button>
                        </h3>
                      </div>
                      <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                        <div class="card-body">
                          You can track the status of your booking in real-time through the Elderly Wellness app. Notifications and status updates will be provided as your service request progresses.
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="headingSix">
                        <h3 class="mb-0">
                          <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                            What if I need to cancel or reschedule a service?
                            <span class="icons">
                              <i class="icofont-plus"></i>
                              <i class="icofont-minus"></i>
                            </span>
                          </button>
                        </h3>
                      </div>
                      <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                        <div class="card-body">
                          You can easily cancel or reschedule a service through the app or by contacting our specialist directly at +91 99448 90577. Please refer to our Refund &amp; Cancellation Policy for specific timelines.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
'''

def process_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # Replace existing faq_section if present
    if '<section class="row_am faq_section"' in content:
        content = re.sub(
            r'(?:<!-- SHARED FAQ COMPONENT[\s\S]*?-->\s*)?<section class="row_am faq_section"[\s\S]*?</section>',
            FAQ_SECTION_TEMPLATE.strip(),
            content
        )
    else:
        # Inject right before <section class="row_am service_section" id="callback-form-section">
        if '<section class="row_am service_section" id="callback-form-section">' in content:
            content = content.replace(
                '<section class="row_am service_section" id="callback-form-section">',
                FAQ_SECTION_TEMPLATE.strip() + '\n\n      <section class="row_am service_section" id="callback-form-section">'
            )
        elif '<footer class="white_text"' in content:
            content = content.replace(
                '<footer class="white_text"',
                FAQ_SECTION_TEMPLATE.strip() + '\n\n      <footer class="white_text"'
            )

    # Ensure all FAQ question buttons use <h3 class="mb-0">
    content = re.sub(r'<h2 class="mb-0">(\s*<button[^>]*card-header|\s*<button)', r'<h3 class="mb-0">\1', content)
    content = re.sub(r'</h2>(\s*</div>\s*<div id="collapse)', r'</h3>\1', content)

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected & synchronized FAQs with H3 headings in: {filepath}")

def main():
    pages = [
        "about.html",
        "geriatric-care-services-for-elders.html",
        "nursing-services-for-elders.html",
        "physiotherapy-services-for-elders.html",
        "assisted-living-support-services-for-elders.html"
    ]
    for p in pages:
        process_file(p)

if __name__ == '__main__':
    main()
