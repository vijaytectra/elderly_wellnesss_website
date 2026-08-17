import os
import re

BENEFIT_BLOCKS = {
    "physiotherapy-services-for-elders.html": '''
      <!-- Specialized Physiotherapy Benefits Section -->
      <section class="how_it_section" id="services-inner-icon-section">
        <div class="container">
          <div class="section_title" data-aos="fade-up" data-aos-duration="1500" style="margin-bottom: 48px; text-align: center;">
            <h2 style="font-size: 32px; font-weight: 800; color: #1a2e35; margin-bottom: 8px;">
              Specialized In-Home <span style="color: #2786a5;">Physiotherapy Benefits</span>
            </h2>
            <p style="font-size: 15px; color: #64748b; margin: 0;">Targeted rehabilitation designed to restore mobility, reduce pain, and improve independence.</p>
          </div>

          <div class="row" style="row-gap: 28px;">
            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-pulse"></i></div>
                <div class="ew-feature-text">
                  <h3>Conditions Treated</h3>
                  <p>Specialized care for post-stroke recovery, severe joint &amp; arthritis pain, paralysis rehabilitation, Parkinson’s mobility support, and post-surgery knee or hip rehab.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-medical-sign"></i></div>
                <div class="ew-feature-text">
                  <h3>Session Inclusions</h3>
                  <p>45-60 minute personalized sessions including manual joint mobilization, gait &amp; balance training, pain-relief modalities, and customized muscle strengthening exercises.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-doctor"></i></div>
                <div class="ew-feature-text">
                  <h3>Certified BPT/MPT Therapists</h3>
                  <p>Delivered by licensed Bachelor of Physiotherapy (BPT) or Master of Physiotherapy (MPT) specialists with proven clinical experience in senior rehabilitation.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-chart-growth"></i></div>
                <div class="ew-feature-text">
                  <h3>Measurable Results</h3>
                  <p>Weekly mobility assessments tracking range of motion, walking endurance, and posture improvements to help your parent safely regain daily independence.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-home"></i></div>
                <div class="ew-feature-text">
                  <h3>Care in Comfort of Home</h3>
                  <p>Eliminate stressful clinic visits and travel exhaustion. All therapeutic equipment and exercise plans are brought straight to your parent’s doorstep.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
''',

    "nursing-services-for-elders.html": '''
      <!-- Comprehensive Nursing Benefits Section -->
      <section class="how_it_section" id="services-inner-icon-section">
        <div class="container">
          <div class="section_title" data-aos="fade-up" data-aos-duration="1500" style="margin-bottom: 48px; text-align: center;">
            <h2 style="font-size: 32px; font-weight: 800; color: #1a2e35; margin-bottom: 8px;">
              Comprehensive In-Home <span style="color: #2786a5;">Clinical Nursing Care</span>
            </h2>
            <p style="font-size: 15px; color: #64748b; margin: 0;">Professional medical nursing tailored for post-hospitalization, chronic illness, and complex care.</p>
          </div>

          <div class="row" style="row-gap: 28px;">
            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-stethoscope"></i></div>
                <div class="ew-feature-text">
                  <h3>Clinical Procedures Covered</h3>
                  <p>Expert administration of IV infusions, wound dressing, bedshore management, urinary catheter care, Ryle’s tube feeding, and regular vital sign monitoring.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-badge"></i></div>
                <div class="ew-feature-text">
                  <h3>B.Sc &amp; GNM Certified Nurses</h3>
                  <p>Skilled care delivered exclusively by licensed B.Sc Nursing or General Nursing &amp; Midwifery (GNM) professionals with extensive hospital and elder care training.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-clock-time"></i></div>
                <div class="ew-feature-text">
                  <h3>24/7 &amp; Night Care Availability</h3>
                  <p>Flexible shifts including 8-hour day shifts, 12-hour night shifts, and 24-hour live-in clinical nursing to ensure round-the-clock peace of mind.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-first-aid"></i></div>
                <div class="ew-feature-text">
                  <h3>Post-Hospital Recovery</h3>
                  <p>Dedicated transition care following surgery, stroke, or ICU discharge to accelerate healing and prevent re-hospitalization complications.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-prescription"></i></div>
                <div class="ew-feature-text">
                  <h3>Medication &amp; Doctor Coordination</h3>
                  <p>Rigorous medication administration schedules and direct coordination with your parent’s treating physician to update clinical records in real time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
''',

    "geriatric-care-services-for-elders.html": '''
      <!-- Holistic Geriatric Benefits Section -->
      <section class="how_it_section" id="services-inner-icon-section">
        <div class="container">
          <div class="section_title" data-aos="fade-up" data-aos-duration="1500" style="margin-bottom: 48px; text-align: center;">
            <h2 style="font-size: 32px; font-weight: 800; color: #1a2e35; margin-bottom: 8px;">
              Holistic Geriatric &amp; <span style="color: #2786a5;">Memory Care Support</span>
            </h2>
            <p style="font-size: 15px; color: #64748b; margin: 0;">Empathetic daily assistance designed to support aging parents and cognitive health.</p>
          </div>

          <div class="row" style="row-gap: 28px;">
            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-heart-beat"></i></div>
                <div class="ew-feature-text">
                  <h3>Daily Support Inclusions</h3>
                  <p>Comprehensive assistance with routine vital checks, daily medication compliance, assisted walking, nutritious meal oversight, and companion engagement.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-brain"></i></div>
                <div class="ew-feature-text">
                  <h3>Dementia &amp; Alzheimer's Expertise</h3>
                  <p>Caregivers specifically trained at EACH in dementia-safe communication, non-confrontational redirection, panic reduction, and wandering prevention.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-user-suited"></i></div>
                <div class="ew-feature-text">
                  <h3>Geriatric Care Management</h3>
                  <p>Every family is paired with a dedicated Elderly Wellness Care Manager who conducts routine health audits and provides weekly updates to adult children.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-shield-alt"></i></div>
                <div class="ew-feature-text">
                  <h3>Emergency Response Protocol</h3>
                  <p>Trained emergency protocols to handle sudden health changes, fall incidents, or acute distress with immediate 2-hour replacement guarantees.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-smile"></i></div>
                <div class="ew-feature-text">
                  <h3>Cognitive &amp; Social Engagement</h3>
                  <p>Meaningful social interaction, memory stimulation exercises, reading support, and conversation to combat senior loneliness and depression.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
''',

    "assisted-living-support-services-for-elders.html": '''
      <!-- Assisted Living Benefits Section -->
      <section class="how_it_section" id="services-inner-icon-section">
        <div class="container">
          <div class="section_title" data-aos="fade-up" data-aos-duration="1500" style="margin-bottom: 48px; text-align: center;">
            <h2 style="font-size: 32px; font-weight: 800; color: #1a2e35; margin-bottom: 8px;">
              Personal Care &amp; <span style="color: #2786a5;">Daily Living Assistance</span>
            </h2>
            <p style="font-size: 15px; color: #64748b; margin: 0;">Dignified non-clinical support helping seniors navigate daily life in their own homes.</p>
          </div>

          <div class="row" style="row-gap: 28px;">
            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-bed"></i></div>
                <div class="ew-feature-text">
                  <h3>Essential ADL Tasks Covered</h3>
                  <p>Gentle, respectful assistance with daily activities including bathing, grooming, oral hygiene, dressing, feeding, and diaper change management.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-wall-clock"></i></div>
                <div class="ew-feature-text">
                  <h3>Flexible Hours (8h, 12h &amp; 24h)</h3>
                  <p>Tailored support packages ranging from 8-hour day assistance, 12-hour day/night shifts, to 24-hour continuous live-in attendant support.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-wheelchair"></i></div>
                <div class="ew-feature-text">
                  <h3>Safe Mobility &amp; Transfer Support</h3>
                  <p>Physical support for bed-to-chair transfers, wheelchair assistance, guided indoor walking, and fall prevention around the home.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-soup-bowl"></i></div>
                <div class="ew-feature-text">
                  <h3>Meal Assistance &amp; Hydration</h3>
                  <p>Help with feeding, serving prescribed dietary meals, monitoring fluid intake, and assisting with light kitchen preparation for senior wellness.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6">
              <div class="ew-feature-card">
                <div class="ew-feature-icon"><i class="icofont-shield"></i></div>
                <div class="ew-feature-text">
                  <h3>Police-Verified &amp; Vetted Attendants</h3>
                  <p>100% background-checked, police-verified personal care attendants trained in empathetic senior care and home safety protocols.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
'''
}

def update_service_page(filename, new_section):
    if not os.path.exists(filename):
        return
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content
    # Replace existing #services-inner-icon-section
    pattern = r'<section class="how_it_section" id="services-inner-icon-section">[\s\S]*?</section>'
    if re.search(pattern, content):
        content = re.sub(pattern, new_section.strip(), content)

    if content != orig:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated topic-specific benefit blocks in: {filename}")

def main():
    for fn, block_html in BENEFIT_BLOCKS.items():
        update_service_page(fn, block_html)

if __name__ == '__main__':
    main()
