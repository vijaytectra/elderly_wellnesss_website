import os
import re

def fix_images_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Fix "Our Values" broken images
    content = re.sub(
        r'<img[^>]*alt="Compassionate Senior Care Value"[^>]*>',
        '<img src="images/ourvalue_1.png" alt="Compassionate Senior Care Value"/>',
        content
    )
    content = re.sub(
        r'<img[^>]*alt="Transparent Slab Pricing Value"[^>]*>',
        '<img src="images/ourvalue_2.png" alt="Transparent Slab Pricing Value"/>',
        content
    )
    content = re.sub(
        r'<img[^>]*alt="Tech-Enabled Care Platform Value"[^>]*>',
        '<img src="images/ourvalue_3.png" alt="Tech-Enabled Care Platform Value"/>',
        content
    )

    # 2. Fix 10 Steps broken images (both root and relative paths)
    rel_prefix = "../" if "/blogs/" in filepath or "/chennai/" in filepath else ""
    if "/blogs/" in filepath and filepath.count("/") >= 2:
        rel_prefix = "../../"

    steps_map = [
        ("Step 1: Download Elderly Care Plus App", f"{rel_prefix}images/services/step1_download_app.png"),
        ("Step 1: Download the Elderly Wellness App", f"{rel_prefix}images/services/step1_download_app.png"),
        ("Step 2: Sign up for an account", f"{rel_prefix}images/services/step2_signup_account.png"),
        ("Step 3: Select senior care service in the app", f"{rel_prefix}images/services/step3_select_service.png"),
        ("Step 4: Connect with senior care specialist", f"{rel_prefix}images/services/step4_connect_specialist.png"),
        ("Step 5: Dedicated caregiver assigned", f"{rel_prefix}images/services/step5_assign_provider.png"),
        ("Step 6: Confirm care schedule details", f"{rel_prefix}images/services/step6_confirm_details.png"),
        ("Step 6: Confirm the Service Provider's Details", f"{rel_prefix}images/services/step6_confirm_details.png"),
        ("Step 7: Secure transparent payment", f"{rel_prefix}images/services/step7_secure_payment.png"),
        ("Step 7: Secure Payment", f"{rel_prefix}images/services/step7_secure_payment.png"),
        ("Step 8: Real-time care status tracking", f"{rel_prefix}images/services/step8_track_status.png"),
        ("Step 8: Track the Status of Your Booking", f"{rel_prefix}images/services/step8_track_status.png"),
        ("Step 9: Receive compassionate home care", f"{rel_prefix}images/services/step9_receive_care.png"),
        ("Step 9: Receive Care at Home", f"{rel_prefix}images/services/step9_receive_care.png"),
        ("Step 10: Rate and review your care experience", f"{rel_prefix}images/services/step10_rate_review.png"),
        ("Step 10: Rate and Review the Service", f"{rel_prefix}images/services/step10_rate_review.png")
    ]

    for alt_text, img_src in steps_map:
        pattern = r'<img[^>]*alt="' + re.escape(alt_text) + r'"[^>]*>'
        replacement = f'<img src="{img_src}" alt="{alt_text}"/>'
        content = re.sub(pattern, replacement, content)

    # Generic catch for any remaining <img src=" " alt="Step..."/> or <img src="" alt="Step..."/>
    def step_replacer(match):
        alt = match.group(1)
        if "10" in alt:
            s = f"{rel_prefix}images/services/step10_rate_review.png"
        elif "1" in alt:
            s = f"{rel_prefix}images/services/step1_download_app.png"
        elif "2" in alt:
            s = f"{rel_prefix}images/services/step2_signup_account.png"
        elif "3" in alt:
            s = f"{rel_prefix}images/services/step3_select_service.png"
        elif "4" in alt:
            s = f"{rel_prefix}images/services/step4_connect_specialist.png"
        elif "5" in alt:
            s = f"{rel_prefix}images/services/step5_assign_provider.png"
        elif "6" in alt:
            s = f"{rel_prefix}images/services/step6_confirm_details.png"
        elif "7" in alt:
            s = f"{rel_prefix}images/services/step7_secure_payment.png"
        elif "8" in alt:
            s = f"{rel_prefix}images/services/step8_track_status.png"
        elif "9" in alt:
            s = f"{rel_prefix}images/services/step9_receive_care.png"
        else:
            s = f"{rel_prefix}images/services/step1_download_app.png"
        return f'<img src="{s}" alt="{alt}"/>'

    content = re.sub(r'<img[^>]*src=["\']\s*["\'][^>]*alt=["\'](Step[^"\']+)["\'][^>]*>', step_replacer, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed broken images in: {filepath}")

def scan():
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if 'brain' in dirs:
            dirs.remove('brain')
        for f in files:
            if f.endswith('.html'):
                fix_images_in_file(os.path.join(root, f))

if __name__ == '__main__':
    scan()
