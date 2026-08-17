import os
import re
import json

FAQ_HTML = '''
<!-- Reframed & High-Reassurance FAQ Section -->
<div class="card">
  <div class="card-header" id="headingBooking">
    <h3 class="mb-0">
      <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseBooking" aria-expanded="false" aria-controls="collapseBooking">
        How do I book a caregiver or service for my parent?
        <span class="icons"><i class="icofont-plus"></i><i class="icofont-minus"></i></span>
      </button>
    </h3>
  </div>
  <div id="collapseBooking" class="collapse" aria-labelledby="headingBooking" data-parent="#accordionGenral">
    <div class="card-body">
      You can book directly in seconds through the <strong>Elderly Care Plus App</strong> or via our quick online form. Standard services can be booked instantly online. Once requested, a care specialist calls you within 2 hours to understand your parent's exact needs. <strong>This consultation is 100% free with zero obligation to book.</strong>
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header" id="headingCost">
    <h3 class="mb-0">
      <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseCost" aria-expanded="false" aria-controls="collapseCost">
        What does elder care cost, and how does pricing work?
        <span class="icons"><i class="icofont-plus"></i><i class="icofont-minus"></i></span>
      </button>
    </h3>
  </div>
  <div id="collapseCost" class="collapse" aria-labelledby="headingCost" data-parent="#accordionGenral">
    <div class="card-body">
      We offer 100% transparent, slab-based pricing with <strong>no hidden fees and no long-term lock-in contracts</strong>. You can view all pricing tiers upfront on our <a href="pricing.html" style="color:#2786a5; text-decoration:underline;">Pricing page</a> or inside the Elderly Care Plus app before booking.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header" id="headingReplacement">
    <h3 class="mb-0">
      <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseReplacement" aria-expanded="false" aria-controls="collapseReplacement">
        What if we or our parent do not like the assigned caregiver?
        <span class="icons"><i class="icofont-plus"></i><i class="icofont-minus"></i></span>
      </button>
    </h3>
  </div>
  <div id="collapseReplacement" class="collapse" aria-labelledby="headingReplacement" data-parent="#accordionGenral">
    <div class="card-body">
      Your parent's comfort and happiness are our highest priorities. If you ever feel the assigned caregiver is not the right fit, we provide a <strong>replacement caregiver within 2 hours — no questions asked</strong>.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header" id="headingMeet">
    <h3 class="mb-0">
      <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseMeet" aria-expanded="false" aria-controls="collapseMeet">
        Can we meet or review the caregiver's profile before care begins?
        <span class="icons"><i class="icofont-plus"></i><i class="icofont-minus"></i></span>
      </button>
    </h3>
  </div>
  <div id="collapseMeet" class="collapse" aria-labelledby="headingMeet" data-parent="#accordionGenral">
    <div class="card-body">
      Yes! Before care starts, we share the caregiver's verified profile, qualifications, police background check clearance, and EACH Academy certification details so you know exactly who is caring for your parent.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header" id="headingNRI">
    <h3 class="mb-0">
      <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseNRI" aria-expanded="false" aria-controls="collapseNRI">
        Can children living outside India (NRIs) book care for parents in Chennai?
        <span class="icons"><i class="icofont-plus"></i><i class="icofont-minus"></i></span>
      </button>
    </h3>
  </div>
  <div id="collapseNRI" class="collapse" aria-labelledby="headingNRI" data-parent="#accordionGenral">
    <div class="card-body">
      Absolutely. Over 40% of our clients are NRIs living in the US, UK, Gulf, and Australia. You can book care online, pay securely via international cards, and receive real-time care updates and vitals tracking directly inside the app.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-header" id="headingEmergency">
    <h3 class="mb-0">
      <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseEmergency" aria-expanded="false" aria-controls="collapseEmergency">
        What happens in case of a medical emergency during a session?
        <span class="icons"><i class="icofont-plus"></i><i class="icofont-minus"></i></span>
      </button>
    </h3>
  </div>
  <div id="collapseEmergency" class="collapse" aria-labelledby="headingEmergency" data-parent="#accordionGenral">
    <div class="card-body">
      All Elderly Wellness caregivers are trained in basic first aid and emergency protocols. In an emergency, our care manager coordinates immediate medical transfer to your preferred hospital and notifies family members instantly.
    </div>
  </div>
</div>
'''

FAQ_SCHEMA = '''
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I book a caregiver or service for my parent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book directly in seconds through the Elderly Care Plus App or via our quick online form. A care specialist calls you within 2 hours to understand your parent's exact needs — free with zero obligation."
      }
    },
    {
      "@type": "Question",
      "name": "What does elder care cost, and how does pricing work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer 100% transparent, slab-based pricing with no hidden fees and no long-term lock-in contracts."
      }
    },
    {
      "@type": "Question",
      "name": "What if we or our parent do not like the assigned caregiver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your parent's comfort and happiness are our highest priorities. We provide a replacement caregiver within 2 hours — no questions asked."
      }
    },
    {
      "@type": "Question",
      "name": "Can we meet or review the caregiver's profile before care begins?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Before care starts, we share the caregiver's verified profile, qualifications, background check details, and certification."
      }
    },
    {
      "@type": "Question",
      "name": "Can children living outside India (NRIs) book care for parents in Chennai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Over 40% of our clients are NRIs. You can book online, pay securely via international cards, and receive real-time care updates in the app."
      }
    },
    {
      "@type": "Question",
      "name": "What happens in case of a medical emergency during a session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Caregivers are trained in emergency protocols, coordinating immediate medical transfer to your preferred hospital and notifying family members instantly."
      }
    }
  ]
}
</script>
'''

TARGET_FILES = [
    'physiotherapy-services-for-elders.html',
    'nursing-services-for-elders.html',
    'geriatric-care-services-for-elders.html',
    'assisted-living-support-services-for-elders.html',
    'about.html',
    'services.html',
    'how-elderly-wellness-works.html'
]

def update_faq_in_file(filePath):
    if not os.path.exists(filePath):
        return

    with open(filePath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # 1. Inject FAQPage schema into <head> if not present
    if '"@type": "FAQPage"' not in content and '</head>' in content:
        content = content.replace('</head>', FAQ_SCHEMA + '\n</head>')

    # 2. Replace or update the FAQ accordion in the HTML
    if '<div class="accordion" id="accordionGenral">' in content:
        # Check if old specialist text exists and update accordion
        regex = r'<div class="accordion" id="accordionGenral">[\s\S]*?</div>\s*</div>\s*</div>'
        # Let's cleanly inject our reframed FAQ items inside accordionGenral
        replacement = '<div class="accordion" id="accordionGenral">\n' + FAQ_HTML + '\n</div>'
        content = re.sub(r'<div class="accordion" id="accordionGenral">[\s\S]*?</div>\s*</div>\s*</div>\s*</div>\s*</div>', '<div class="accordion" id="accordionGenral">\n<div class="row">\n<div class="col-md-12">\n' + FAQ_HTML + '\n</div>\n</div>\n</div>\n</div>\n</div>', content)

    if content != orig:
        with open(filePath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated FAQ & injected FAQPage schema in: {filePath}")

def main():
    for f in TARGET_FILES:
        update_faq_in_file(f)

if __name__ == '__main__':
    main()
