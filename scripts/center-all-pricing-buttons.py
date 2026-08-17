import re

def main():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Replace the Pricing Summary section with 100% centered buttons inside every box and at the bottom
    old_pricing_sec = re.search(r'<section class="pricing_summary_section".*?</section>', html, re.DOTALL)
    if old_pricing_sec:
        new_pricing_sec = '''<section class="pricing_summary_section" style="padding: 44px 0 28px 0; background: #ffffff;">
        <div class="container">
          <div class="section_title text-center mb-4" data-aos="fade-up">
            <span class="title_badge mb-2">Transparent Pricing</span>
            <h2>Affordable Elder Care Plans in Chennai</h2>
            <p style="max-width: 680px; margin: 12px auto 0; color: #64748b; font-size: 15px;">Flexible daily, weekly, or monthly home care plans with no lock-in contracts and 100% transparent pricing.</p>
          </div>
          <div class="row" style="row-gap: 24px; margin-bottom: 40px;">
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px; text-align: center;">Physiotherapy</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px; text-align: center;">₹800 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ session</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px; text-align: center;">In-home mobility, joint pain rehab &amp; post-stroke therapy.</p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 12px;">
                  <a href="pricing.html" class="btn puprple_btn" style="padding: 10px 28px; font-size: 14px; font-weight: 700; border-radius: 30px; background: #2786a5; color: #ffffff; text-decoration: none; display: inline-block;">View Details</a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px; text-align: center;">24/7 Home Nursing</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px; text-align: center;">₹1,200 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ shift</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px; text-align: center;">Qualified B.Sc/GNM nurses for clinical procedures &amp; night care.</p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 12px;">
                  <a href="pricing.html" class="btn puprple_btn" style="padding: 10px 28px; font-size: 14px; font-weight: 700; border-radius: 30px; background: #2786a5; color: #ffffff; text-decoration: none; display: inline-block;">View Details</a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px; text-align: center;">Geriatric Care</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px; text-align: center;">₹15,000 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ month</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px; text-align: center;">Dedicated care manager, vital tracking &amp; dementia care.</p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 12px;">
                  <a href="pricing.html" class="btn puprple_btn" style="padding: 10px 28px; font-size: 14px; font-weight: 700; border-radius: 30px; background: #2786a5; color: #ffffff; text-decoration: none; display: inline-block;">View Details</a>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-3 mb-lg-0">
              <div style="background: #f8fafc; border-radius: 16px; padding: 28px 20px; border: 1.5px solid #e2e8f0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                <div>
                  <h3 style="font-size: 18px; font-weight: 700; color: #2786a5; margin-bottom: 8px; text-align: center;">Assisted Living</h3>
                  <div style="font-size: 28px; font-weight: 800; color: #1a2e35; margin-bottom: 12px; text-align: center;">₹12,000 <span style="font-size: 14px; font-weight: 600; color: #64748b;">/ month</span></div>
                  <p style="font-size: 13.5px; color: #64748b; line-height: 1.5; margin-bottom: 20px; text-align: center;">Daily living assistance, hygiene care &amp; senior companionship.</p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 12px;">
                  <a href="pricing.html" class="btn puprple_btn" style="padding: 10px 28px; font-size: 14px; font-weight: 700; border-radius: 30px; background: #2786a5; color: #ffffff; text-decoration: none; display: inline-block;">View Details</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Perfectly Centered Main Section Button -->
          <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 32px; margin-bottom: 16px;">
            <a href="pricing.html" class="btn puprple_btn" style="padding: 14px 38px; font-size: 15px; font-weight: 700; border-radius: 30px; background-color: #2786a5 !important; color: #ffffff !important; border: 2px solid #2786a5 !important; text-decoration: none !important; box-shadow: 0 6px 18px rgba(39,134,165,0.25);">
              Explore Full Pricing &amp; Comparison Table &rarr;
            </a>
          </div>
        </div>
      </section>'''
        html = html.replace(old_pricing_sec.group(0), new_pricing_sec)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

    print("Centered ALL buttons (card buttons + main section button) on the pricing section!")

if __name__ == '__main__':
    main()
