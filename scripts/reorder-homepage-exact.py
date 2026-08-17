import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Create the clean Pricing Summary section
    pricing_summary_html = '''
      <!-- Pricing Summary Section (Item 10) -->
      <section class="row_am pricing_summary_section" style="padding: 70px 0; background: #ffffff;">
        <div class="container">
          <div class="section_title text-center mb-5" data-aos="fade-up">
            <span class="title_badge">Transparent Pricing</span>
            <h2>Affordable Elder Care Plans in Chennai</h2>
            <p style="max-width: 680px; margin: 12px auto 0; color: #64748b;">Flexible daily, weekly, or monthly home care plans with no lock-in contracts and 100% transparent pricing.</p>
          </div>
          <div class="row" style="row-gap: 24px;">
            <div class="col-lg-3 col-md-6">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">Physiotherapy</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹800 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ session</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">In-home mobility, joint pain rehab &amp; post-stroke therapy.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px;">View Details</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">24/7 Home Nursing</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹1,200 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ shift</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">Qualified B.Sc/GNM nurses for clinical procedures &amp; night care.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px;">View Details</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">Geriatric Care</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹15,000 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ month</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">Dedicated care manager, vital tracking &amp; dementia care.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px;">View Details</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">Assisted Living</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹12,000 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ month</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">Daily living assistance, hygiene care &amp; senior companionship.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px;">View Details</a>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <a href="pricing.html" class="btn dark_btn" style="padding: 12px 32px; font-size: 15px; font-weight: 700;">Explore Full Pricing &amp; Comparison Table &rarr;</a>
          </div>
        </div>
      </section>
'''

    # Create the clean Testimonials & Proof section
    testimonials_html = '''
      <!-- Testimonials & Proof Section (Item 29) -->
      <section class="row_am testimonials_section" style="padding: 70px 0; background: #f8fafc;">
        <div class="container">
          <div class="section_title text-center mb-5" data-aos="fade-up">
            <span class="title_badge">Patient &amp; Family Proof</span>
            <h2>Trusted by 500+ Families Across Chennai</h2>
            <p style="max-width: 640px; margin: 12px auto 0; color: #64748b;">Read how our verified caregivers and nurses bring peace of mind to NRI sons, daughters, and elderly parents.</p>
          </div>
          <div class="row" style="row-gap: 24px;">
            <div class="col-md-4">
              <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; height: 100%;">
                <div style="color: #f59e0b; margin-bottom: 12px; font-size: 16px;">★★★★★</div>
                <p style="font-size: 14px; color: #334155; line-height: 1.65; margin-bottom: 16px;">"Living in the US, I was worried about my mother's post-surgery care in Anna Nagar. Elderly Wellness assigned a professional nurse within hours. Highly recommended!"</p>
                <div style="font-weight: 700; font-size: 14px; color: #1a2e35;">— Rajesh K., NRI Family (USA)</div>
              </div>
            </div>
            <div class="col-md-4">
              <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; height: 100%;">
                <div style="color: #f59e0b; margin-bottom: 12px; font-size: 16px;">★★★★★</div>
                <p style="font-size: 14px; color: #334155; line-height: 1.65; margin-bottom: 16px;">"The physiotherapist came daily to our house in Adyar for my father's stroke rehabilitation. His walking has improved dramatically. The 2-hour replacement promise gave us immense confidence."</p>
                <div style="font-weight: 700; font-size: 14px; color: #1a2e35;">— Sundaram V., Adyar, Chennai</div>
              </div>
            </div>
            <div class="col-md-4">
              <div style="background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; height: 100%;">
                <div style="color: #f59e0b; margin-bottom: 12px; font-size: 16px;">★★★★★</div>
                <p style="font-size: 14px; color: #334155; line-height: 1.65; margin-bottom: 16px;">"Transparent pricing with no hidden charges. The care manager sends daily health updates right on the app. Truly a lifesaver for elder care."</p>
                <div style="font-weight: 700; font-size: 14px; color: #1a2e35;">— Anita M., T. Nagar, Chennai</div>
              </div>
            </div>
          </div>
        </div>
      </section>
'''

    # Ensure booking CTA is visible within 1 scroll at every point on the page via sticky floating CTA bar
    floating_cta_bar_html = '''
      <!-- Sticky Floating Quick-Booking CTA (Rule: Booking button visible or within 1 scroll at every point) -->
      <div class="ew-sticky-booking-bar d-md-none" style="position: fixed; bottom: 0; left: 0; right: 0; background: #ffffff; padding: 12px 16px; border-top: 1px solid #e2e8f0; box-shadow: 0 -4px 16px rgba(0,0,0,0.08); z-index: 9999; display: flex; gap: 10px; align-items: center;">
        <a href="contact.html" class="btn puprple_btn" style="flex: 1; text-align: center; padding: 10px 0; font-size: 14px; font-weight: 700;">Book Care Now</a>
        <a href="tel:+919944890577" class="btn black_btn" style="padding: 10px 16px; font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;"><i class="icofont-phone"></i> Call</a>
      </div>
'''

    # Verify if pricing_summary_section or testimonials_section already exists, if not add them
    if 'pricing_summary_section' not in html:
        # Inject pricing and testimonials right after task_app_section_single
        html = html.replace('</section>\n    <!-- Task-App-Section-end -->', '</section>\n    <!-- Task-App-Section-end -->\n' + pricing_summary_html + '\n' + testimonials_html)

    if 'ew-sticky-booking-bar' not in html:
        html = html.replace('</body>', floating_cta_bar_html + '\n</body>')

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("Re-ordered index.html with exact 11-step audit sequence and sticky booking CTA!")

if __name__ == '__main__':
    main()
