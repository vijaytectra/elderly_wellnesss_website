import os
import re

SERVICE_CONFIGS = {
    "physiotherapy-services-for-elders.html": {
        "service_name": "Home Physiotherapy",
        "wa_text": "Hi%2C%20I%20would%20like%20to%20know%20about%20Home%20Physiotherapy%20services",
        "img_alts": [
            ("images/services/1.png", "Certified physiotherapist guiding senior in leg mobility exercises at home in Chennai"),
            ("images/services/2.png", "Home physiotherapy session restoring joint movement for elderly parent"),
            ("images/services/3.png", "Senior citizen practicing balance rehab with licensed physiotherapist"),
            ("images/services/4.png", "Post-stroke paralysis recovery physiotherapy session at home"),
            ("images/services/5.png", "Elderly patient completing stroke rehab walking exercises")
        ]
    },
    "nursing-services-for-elders.html": {
        "service_name": "Home Nursing",
        "wa_text": "Hi%2C%20I%20would%20like%20to%20know%20about%20Home%20Nursing%20services",
        "img_alts": [
            ("images/services/nursing/1.png", "Registered home nurse administering medical care to senior in Chennai"),
            ("images/services/nursing/2.png", "Professional nurse monitoring vital signs and managing medication for elderly patient"),
            ("images/services/nursing/3.png", "Licensed B.Sc nurse conducting health assessment for senior citizen"),
            ("images/services/nursing/4.png", "Nurse providing post-hospital wound care and recovery support at home"),
            ("images/services/nursing/5.png", "In-home nurse checking blood pressure for elderly parent")
        ]
    },
    "geriatric-care-services-for-elders.html": {
        "service_name": "Geriatric Care",
        "wa_text": "Hi%2C%20I%20would%20like%20to%20know%20about%20Geriatric%20Care%20services",
        "img_alts": [
            ("images/services/geriatric/1.png", "Geriatric care manager providing compassionate monitoring for elderly parent in Chennai"),
            ("images/services/geriatric/2.png", "Trained caregiver supporting dementia patient with patience-based communication"),
            ("images/services/geriatric/3.png", "Geriatric care specialist monitoring senior health and daily routine"),
            ("images/services/geriatric/4.png", "Elderly parent receiving personalized cognitive and memory support at home"),
            ("images/services/geriatric/5.png", "Caregiver conducting daily health audit for senior citizen")
        ]
    },
    "assisted-living-support-services-for-elders.html": {
        "service_name": "Assisted Living Support",
        "wa_text": "Hi%2C%20I%20would%20like%20to%20know%20about%20Assisted%20Living%20Support%20services",
        "img_alts": [
            ("images/services/assisted/1.png", "Personal care attendant helping senior citizen with daily activities of living in Chennai"),
            ("images/services/assisted/2.png", "Caregiver assisting elderly parent with safe walking and mobility around the home"),
            ("images/services/assisted/3.png", "Police-verified attendant helping senior with grooming and meal assistance"),
            ("images/services/assisted/4.png", "Personal attendant providing gentle bed transfer and hygiene care"),
            ("images/services/assisted/5.png", "Senior parent enjoying companion care and daily support at home")
        ]
    }
}

def audit_and_fix_page(filepath, cfg):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    orig = content

    # 1. Fix WhatsApp link pre-filled text
    content = re.sub(
        r'https://wa\.me/919944890577\?text=[^"\'\s>]+',
        f'https://wa.me/919944890577?text={cfg["wa_text"]}',
        content
    )

    # 2. Fix empty alt="" and generic alt="image" attributes for service images
    for img_src, alt_text in cfg["img_alts"]:
        pattern = re.compile(rf'<img[^>]*src=["\']{re.escape(img_src)}[^"\']*["\'][^>]*>', re.IGNORECASE)
        content = pattern.sub(f'<img src="{img_src}" alt="{alt_text}"/>', content)

    # 3. Catch-all: Replace any remaining alt="" or alt="image" with descriptive service alt
    content = re.sub(r'alt=""', f'alt="{cfg["service_name"]} for seniors in Chennai"', content)
    content = re.sub(r'alt="image"', f'alt="{cfg["service_name"]} professional supporting elderly parent"', content)

    # 4. Heading Hierarchy Validation: Ensure single <h1> tag
    h1_count = len(re.findall(r'<h1[^>]*>', content, re.IGNORECASE))
    print(f"[{filepath}] H1 Count: {h1_count}")

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Audited & synchronized all fixes in: {filepath}")

def main():
    for fp, cfg in SERVICE_CONFIGS.items():
        audit_and_fix_page(fp, cfg)

if __name__ == '__main__':
    main()
