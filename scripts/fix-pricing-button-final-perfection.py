import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update Pricing Summary Section
    old_pricing_sec = re.search(r'<section class="row_am pricing_summary_section".*?</section>', html, re.DOTALL)
    if old_pricing_sec:
        new_pricing_sec = '''<section class="pricing_summary_section" style="padding: 40px 0 24px 0; background: #ffffff;">
        <div class="container">
          <div class="section_title text-center mb-4" data-aos="fade-up">
            <span class="title_badge mb-2">Transparent Pricing</span>
            <h2>Affordable Elder Care Plans in Chennai</h2>
            <p style="max-width: 680px; margin: 12px auto 0; color: #64748b; font-size: 15px;">Flexible daily, weekly, or monthly home care plans with no lock-in contracts and 100% transparent pricing.</p>
          </div>
          <div class="row" style="row-gap: 24px; margin-bottom: 44px;">
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">Physiotherapy</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹800 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ session</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">In-home mobility, joint pain rehab &amp; post-stroke therapy.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px; border-radius: 10px; background: #2786a5; color: #ffffff;">View Details</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">24/7 Home Nursing</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹1,200 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ shift</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">Qualified B.Sc/GNM nurses for clinical procedures &amp; night care.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px; border-radius: 10px; background: #2786a5; color: #ffffff;">View Details</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">Geriatric Care</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹15,000 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ month</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">Dedicated care manager, vital tracking &amp; dementia care.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px; border-radius: 10px; background: #2786a5; color: #ffffff;">View Details</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px;">Assisted Living</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px;">₹12,000 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ month</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">Daily living assistance, hygiene care &amp; senior companionship.</p>
                </div>
                <a href="pricing.html" class="btn puprple_btn" style="width: 100%; text-align: center; padding: 10px 0; font-size: 14px; border-radius: 10px; background: #2786a5; color: #ffffff;">View Details</a>
              </div>
            </div>
          </div>

          <!-- Perfectly Centered Theme Button -->
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 32px; margin-bottom: 16px;">
            <a href="pricing.html" class="btn puprple_btn" style="padding: 14px 38px; font-size: 15px; font-weight: 700; border-radius: 30px; background-color: #2786a5 !important; color: #ffffff !important; border: 2px solid #2786a5 !important; text-decoration: none !important; box-shadow: 0 6px 18px rgba(39,134,165,0.25);">
              Explore Full Pricing &amp; Comparison Table &rarr;
            </a>
          </div>
        </div>
      </section>'''
        html = html.replace(old_pricing_sec.group(0), new_pricing_sec)

    # 2. Update Testimonials Section
    old_test_sec = re.search(r'<section class="row_am testimonials_section".*?</section>', html, re.DOTALL)
    if old_test_sec:
        new_test_sec = '''<section class="testimonials_section" style="padding: 40px 0 40px 0; background: #ffffff; border-top: 1px solid #f1f5f9;">
        <div class="container">
          <div class="section_title text-center mb-4" data-aos="fade-up">
            <span class="title_badge mb-2">Patient &amp; Family Proof</span>
            <h2>Trusted by 500+ Families Across Chennai</h2>
            <p style="max-width: 640px; margin: 12px auto 0; color: #64748b; font-size: 15px;">Read how our verified caregivers and nurses bring peace of mind to NRI sons, daughters, and elderly parents.</p>
          </div>
          <div class="row" style="row-gap: 24px;">
            <div class="col-md-4 mb-3 mb-md-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 24px; border: 1.5px solid #e2e8f0; height: 100%;">
                <div style="color: #f59e0b; margin-bottom: 14px; font-size: 16px;">★★★★★</div>
                <p style="font-size: 14px; color: #334155; line-height: 1.65; margin-bottom: 20px;">"Living in the US, I was worried about my mother's post-surgery care in Anna Nagar. Elderly Wellness assigned a professional nurse within hours. Highly recommended!"</p>
                <div style="font-weight: 700; font-size: 14px; color: #1a2e35;">— Rajesh K., NRI Family (USA)</div>
              </div>
            </div>
            <div class="col-md-4 mb-3 mb-md-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 24px; border: 1.5px solid #e2e8f0; height: 100%;">
                <div style="color: #f59e0b; margin-bottom: 14px; font-size: 16px;">★★★★★</div>
                <p style="font-size: 14px; color: #334155; line-height: 1.65; margin-bottom: 20px;">"The physiotherapist came daily to our house in Adyar for my father's stroke rehabilitation. His walking has improved dramatically. The 2-hour replacement promise gave us immense confidence."</p>
                <div style="font-weight: 700; font-size: 14px; color: #1a2e35;">— Sundaram V., Adyar, Chennai</div>
              </div>
            </div>
            <div class="col-md-4">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 24px; border: 1.5px solid #e2e8f0; height: 100%;">
                <div style="color: #f59e0b; margin-bottom: 14px; font-size: 16px;">★★★★★</div>
                <p style="font-size: 14px; color: #334155; line-height: 1.65; margin-bottom: 20px;">"Transparent pricing with no hidden charges. The care manager sends daily health updates right on the app. Truly a lifesaver for elder care."</p>
                <div style="font-weight: 700; font-size: 14px; color: #1a2e35;">— Anita M., T. Nagar, Chennai</div>
              </div>
            </div>
          </div>
        </div>
      </section>'''
        html = html.replace(old_test_sec.group(0), new_test_sec)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("Perfected pricing section button, box bottom spacing, and eliminated whitespace gaps!")

if __name__ == '__main__':
    main()
