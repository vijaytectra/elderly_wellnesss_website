import os
import re

def get_topic(path_str, content):
    lower = (path_str + " " + content[:2000]).lower()
    if any(k in lower for k in ['fall', 'osteoporosis', 'arthritis', 'exercis', 'physio', 'mobility']):
        return 'physio'
    elif any(k in lower for k in ['dementia', 'alzheimer', 'adls', 'hygiene', 'grooming', 'caregiver', 'assisted', 'diaper']):
        return 'assisted'
    elif any(k in lower for k in ['hospital', 'recovery', 'nursing', 'medication', 'meals', 'checkup', 'sodium', 'cardio']):
        return 'nursing'
    else:
        return 'geriatric'

def generate_service_block(topic, rel_prefix):
    if topic == 'physio':
        eyebrow = "PHYSICAL THERAPY & SAFETY"
        title = "Worried about falls or mobility at home?"
        desc = "Our certified physiotherapists perform comprehensive home safety assessments, stroke rehab, and post-fall mobility care in Chennai."
        primary_link = f"{rel_prefix}physiotherapy-services-for-elders.html"
        primary_label = "Explore Home Physiotherapy →"
    elif topic == 'assisted':
        eyebrow = "ASSISTED LIVING & DEMENTIA CARE"
        title = "Need a patient, dementia-trained caregiver?"
        desc = "Our verified caregivers assist with daily living activities (ADLs), hygiene, medication management, and memory care right at home."
        primary_link = f"{rel_prefix}assisted-living-support-services-for-elders.html"
        primary_label = "Explore Caregiver Support →"
    elif topic == 'nursing':
        eyebrow = "24/7 IN-HOME NURSING CARE"
        title = "Recovering after surgery or hospital discharge?"
        desc = "Our registered nurses provide professional wound dressing, catheter care, IV monitoring, and 24/7 post-hospital medical assistance."
        primary_link = f"{rel_prefix}nursing-services-for-elders.html"
        primary_label = "Explore Home Nursing Services →"
    else:
        eyebrow = "GERIATRIC WELLNESS & CARE"
        title = "Looking for comprehensive elder care in Chennai?"
        desc = "Elderly Wellness connects families with screened, compassionate caregivers and senior care managers tailored to your parent's exact needs."
        primary_link = f"{rel_prefix}geriatric-care-services-for-elders.html"
        primary_label = "Explore Geriatric Care →"

    cb_link = f"{rel_prefix}contact.html"

    return f'''
<!-- Related Service CTA Block -->
<div class="ew-blog-service-card ew-service-{topic}">
  <div class="ew-service-card__icon"><i class="icofont-heart-beat"></i></div>
  <div class="ew-service-card__content">
    <p class="ew-service-card__eyebrow">{eyebrow}</p>
    <h3>{title}</h3>
    <p>{desc}</p>
    <div class="ew-service-card__actions">
      <a href="{primary_link}" class="ew-service-card__btn-primary">{primary_label}</a>
      <a href="{cb_link}" class="ew-service-card__btn-secondary"><i class="icofont-headphone-alt"></i> Request a Callback</a>
    </div>
  </div>
</div>
'''

def generate_inline_cta(rel_prefix):
    return f'''
<!-- Mid-Article Inline App CTA Box -->
<div class="ew-blog-cta ew-blog-cta--app ew-inline-article-cta" style="margin: 32px 0;">
  <p class="ew-blog-cta__eyebrow">ELDERLY CARE PLUS APP</p>
  <h3>Find a trained, dementia-aware caregiver near you.</h3>
  <p>Browse vetted caregiver profiles, track daily care progress, and manage shifts directly on the Elderly Care Plus app.</p>
  <p class="ew-blog-cta__action"><a class="ew-blog-cta__btn" href="https://apps.apple.com/in/app/elderly-care-plus/id6740391242">Download the App →</a></p>
</div>
'''

def generate_related_posts_block(rel_prefix):
    return f'''
<!-- 3 Related Posts Grid -->
<div class="ew-related-posts-section" style="margin-top: 40px; padding-top: 32px; border-top: 1.5px solid #e2e8f0;">
  <div class="ew-related-header" style="margin-bottom: 24px;">
    <p style="font-size: 0.78rem; font-weight: 700; color: #2786a5; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 4px;">Recommended Reading</p>
    <h3 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">Related Elder Care Articles</h3>
  </div>
  <div class="row" style="row-gap: 20px;">
    <!-- Related 1 -->
    <div class="col-md-4">
      <div class="ew-related-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; height: 100%; display: flex; flex-direction: column; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <img src="{rel_prefix}images/blogs/opt/fall-prevention-home-safety-elderly-chennai.jpg" alt="Fall Prevention" style="width: 100%; height: 140px; object-fit: cover;"/>
        <div style="padding: 16px; display: flex; flex-direction: column; flex: 1;">
          <span style="font-size: 0.72rem; font-weight: 700; color: #2786a5; text-transform: uppercase;">Safety & Mobility</span>
          <h4 style="font-size: 0.98rem; font-weight: 700; color: #1e293b; margin: 6px 0 10px; line-height: 1.35;"><a href="{rel_prefix}blogs/fall-prevention-home-safety-checklist-elderly-chennai/index.html" style="color: inherit; text-decoration: none;">Fall Prevention Home Safety Checklist for Seniors</a></h4>
          <a href="{rel_prefix}blogs/fall-prevention-home-safety-checklist-elderly-chennai/index.html" style="font-size: 0.85rem; font-weight: 700; color: #2786a5; text-decoration: none; margin-top: auto;">Read Post →</a>
        </div>
      </div>
    </div>
    <!-- Related 2 -->
    <div class="col-md-4">
      <div class="ew-related-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; height: 100%; display: flex; flex-direction: column; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <img src="{rel_prefix}images/blogs/opt/early-signs-dementia-elderly-parents.jpg" alt="Dementia Care" style="width: 100%; height: 140px; object-fit: cover;"/>
        <div style="padding: 16px; display: flex; flex-direction: column; flex: 1;">
          <span style="font-size: 0.72rem; font-weight: 700; color: #2786a5; text-transform: uppercase;">Dementia Support</span>
          <h4 style="font-size: 0.98rem; font-weight: 700; color: #1e293b; margin: 6px 0 10px; line-height: 1.35;"><a href="{rel_prefix}blogs/early-signs-of-dementia-in-elderly-parents/index.html" style="color: inherit; text-decoration: none;">Recognizing Early Signs of Dementia in Aging Parents</a></h4>
          <a href="{rel_prefix}blogs/early-signs-of-dementia-in-elderly-parents/index.html" style="font-size: 0.85rem; font-weight: 700; color: #2786a5; text-decoration: none; margin-top: auto;">Read Post →</a>
        </div>
      </div>
    </div>
    <!-- Related 3 -->
    <div class="col-md-4">
      <div class="ew-related-card" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; height: 100%; display: flex; flex-direction: column; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
        <img src="{rel_prefix}images/blogs/opt/post-hospital-recovery-care-at-home-chennai.jpg" alt="Recovery Care" style="width: 100%; height: 140px; object-fit: cover;"/>
        <div style="padding: 16px; display: flex; flex-direction: column; flex: 1;">
          <span style="font-size: 0.72rem; font-weight: 700; color: #2786a5; text-transform: uppercase;">Recovery Care</span>
          <h4 style="font-size: 0.98rem; font-weight: 700; color: #1e293b; margin: 6px 0 10px; line-height: 1.35;"><a href="{rel_prefix}blogs/post-hospital-recovery-care-at-home-chennai/index.html" style="color: inherit; text-decoration: none;">Post-Hospital Discharge & Recovery Care at Home</a></h4>
          <a href="{rel_prefix}blogs/post-hospital-recovery-care-at-home-chennai/index.html" style="font-size: 0.85rem; font-weight: 700; color: #2786a5; text-decoration: none; margin-top: auto;">Read Post →</a>
        </div>
      </div>
    </div>
  </div>
</div>
'''

def enhance_blog_post(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content
    rel_prefix = "../../" if "/blogs/" in filepath and filepath.count("/") >= 2 else ("../" if "/blogs/" in filepath or "/chennai/" in filepath else "")

    topic = get_topic(filepath, content)

    # 1. Inject Topic-Matched Service Block before </article> or before comments-area if not present
    if "ew-blog-service-card" not in content:
        service_block = generate_service_block(topic, rel_prefix)
        if "</article>" in content:
            content = content.replace("</article>", f"{service_block}\n</article>")
        elif '<div class="comments-area">' in content:
            content = content.replace('<div class="comments-area">', f"{service_block}\n<div class=\"comments-area\">")

    # 2. Inject 3 Related Posts block if not present
    if "ew-related-posts-section" not in content:
        related_posts = generate_related_posts_block(rel_prefix)
        if '<div class="comments-area">' in content:
            content = content.replace('<div class="comments-area">', f"{related_posts}\n<div class=\"comments-area\">")
        elif "</article>" in content:
            content = content.replace("</article>", f"{related_posts}\n</article>")

    # 3. Inject Mid-Article Inline App CTA if not present and post has multiple paragraphs
    if "ew-inline-article-cta" not in content and '<div class="entry-content' in content:
        p_matches = list(re.finditer(r'</p>', content))
        if len(p_matches) >= 4:
            mid_idx = p_matches[len(p_matches) // 2].end()
            inline_cta = generate_inline_cta(rel_prefix)
            content = content[:mid_idx] + "\n" + inline_cta + "\n" + content[mid_idx:]

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Enhanced blog post with CTAs & Related Services: {filepath}")

def main():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'brain' in dirs: dirs.remove('brain')
        for f in files:
            if f.endswith('.html') and ('/blogs/' in os.path.join(root, f) or 'the-inspiring-journey' in f or 'elderly-wellness.html' in f):
                # Skip index.html of blog listing
                full_p = os.path.join(root, f)
                if full_p != './blogs/index.html' and not full_p.endswith('/page/2/index.html') and not full_p.endswith('/page/3/index.html'):
                    enhance_blog_post(full_p)

if __name__ == '__main__':
    main()
