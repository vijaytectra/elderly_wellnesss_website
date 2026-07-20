#!/usr/bin/env python3
"""Generate 5 new Elderly Wellness blog posts from the hire-caregiver template."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "blogs/how-to-hire-best-caregiver-for-seniors-in-chennai/index.html"
BLOGS = ROOT / "blogs"
UPLOAD = "../../images/blogs"
PUB = "2026-07-20T10:00:00+00:00"
MOD = "2026-07-20T10:00:00+00:00"
DATE_DISP = "July 20, 2026"
APP = "https://apps.apple.com/in/app/elderly-care-plus/id6740391242"
CONTACT = "../../contact.html"


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def p(html: str) -> str:
    return f"<p>{html}</p>\n\n\n\n"


def h2(aid: str, text: str) -> str:
    return f'<h2 class="wp-block-heading" id="{aid}">{text}</h2>\n\n\n\n'


def ul(items: list[str]) -> str:
    lis = "\n\n\n\n".join(f"<li>{i}</li>" for i in items)
    return f'<ul class="wp-block-list">\n{lis}\n</ul>\n\n\n\n'


def toc(items: list[tuple[str, str]]) -> str:
    lis = "".join(f'<li><a href="#{aid}">{label}</a></li>' for aid, label in items)
    return (
        f'<div class="wp-block-rank-math-toc-block" id="rank-math-toc">'
        f"<h2>In This Guide</h2><nav><ul>{lis}</ul></nav></div>\n\n\n\n"
    )


def faq(items: list[tuple[str, str]]) -> str:
    blocks = []
    for i, (q, a) in enumerate(items, 1):
        blocks.append(
            f'<div id="faq-question-20260720{i:02d}" class="rank-math-list-item">\n'
            f'<h3 class="rank-math-question ">{esc(q)}</h3>\n'
            f'<div class="rank-math-answer ">\n\n<p>{a}</p>\n\n</div>\n</div>'
        )
    return (
        '<div id="rank-math-faq" class="rank-math-block">\n'
        '<div class="rank-math-list ">\n'
        + "\n".join(blocks)
        + "\n</div>\n</div>\n\n\n\n"
    )


def cta(eyebrow: str, title: str, body: str, btn: str, href: str, app: bool = False) -> str:
    cls = "ew-blog-cta ew-blog-cta--app" if app else "ew-blog-cta"
    return (
        f'<div class="{cls}">\n'
        f'<p class="ew-blog-cta__eyebrow">{esc(eyebrow)}</p>\n'
        f"<h3>{esc(title)}</h3>\n"
        f"<p>{body}</p>\n"
        f'<p class="ew-blog-cta__action"><a class="ew-blog-cta__btn" href="{href}">{esc(btn)} →</a></p>\n'
        f"</div>\n\n\n\n"
    )


def a(href: str, text: str) -> str:
    return f'<a href="{href}">{text}</a>'


# Internal link helpers
GERIATRIC = a("../../geriatric-care-services-for-elders.html", "Geriatric Care")
PHYSIO = a("../../physiotherapy-services-for-elders.html", "Physiotherapy")
NURSING = a("../../nursing-services-for-elders.html", "Nursing Service")
ASSISTED = a("../../assisted-living-support-services-for-elders.html", "Assisted Living Support")
EXERCISES = a("../exercises-for-seniors-over-75", "Exercises for Seniors Over 75")
HIRE = a("../how-to-hire-best-caregiver-for-seniors-in-chennai", "How to Hire the Best Caregiver for Seniors in Chennai")
CHECKUPS = a("../heres-why-regular-checkups-matter-so-much-for-seniors", "Here's Why Regular Checkups Matter So Much for Seniors")
BALANCE = a(
    "../finding-the-right-balance-between-professional-care-and-family-involvement-for-senior-citizens",
    "Finding the Right Balance Between Professional Care and Family Involvement",
)
CARDIO = a(
    "../necessary-lifestyle-changes-to-prevent-cardiovascular-diseases-for-elderly-citizens",
    "Necessary Lifestyle Changes to Prevent Cardiovascular Diseases for Elderly Citizens",
)
OSTEO = a(
    "../different-ways-to-prevent-osteoporosis-in-senior-citizens-for-stronger-bone-health",
    "Different Ways to Prevent Osteoporosis in Senior Citizens for Stronger Bone Health",
)
DEMENTIA_CARE = a(
    "../alzheimers-and-dementia-care-services-for-senior-citizens",
    "Alzheimer's and Dementia Care Services for Senior Citizens",
)
POST_HOSPITAL = a(
    "../post-hospital-recovery-care-at-home-chennai",
    "Post-Hospital Recovery Care at Home",
)


def build_blog1() -> dict:
    toc_items = [
        ("why-do-most-elderly-falls-happen-at-home", "Why elderly falls happen at home"),
        ("what-should-a-bathroom-safety-checklist-include", "Bathroom safety checklist"),
        ("what-changes-reduce-falls-in-the-bedroom-and-living-room", "Bedroom and living room checklist"),
        ("how-should-staircases-and-entryways-be-made-safer", "Staircase and entryway checklist"),
        ("when-does-a-family-need-professional-caregiving-support", "When a family needs professional caregiving support"),
        ("frequently-asked-questions", "FAQs"),
    ]
    body = (
        p(
            "A fall-safe home for seniors needs three things: clear, well-lit walkways, "
            "grab support in the bathroom and staircase, and a trained caregiver who can "
            "spot risks before they become accidents. Falls are one of the leading causes "
            "of hospitalization among elderly citizens, and most of them happen inside the "
            "home — not outside it."
        )
        + toc(toc_items)
        + h2("why-do-most-elderly-falls-happen-at-home", "Why Do Most Elderly Falls Happen at Home?")
        + p(
            "Ageing brings changes in balance, eyesight, muscle strength, and reaction time. "
            "Combine that with loose rugs, dim lighting, and wet bathroom floors, and an ordinary "
            "Tuesday afternoon can turn into an emergency room visit. Families across Adyar and "
            "Mylapore often assume their parents' homes are safe simply because nothing has "
            "happened yet — but fall risk builds silently, especially after 70."
        )
        + p(
            f"This is one of the reasons {GERIATRIC} exists as a dedicated discipline: it looks "
            "at the whole person — mobility, medication side effects, vision, and home "
            "environment — rather than treating a fall as an isolated accident. Our "
            f"{PHYSIO} team often works alongside geriatric caregivers to rebuild the strength "
            "that prevents the next fall, not just respond to the last one."
        )
        + h2("what-should-a-bathroom-safety-checklist-include", "What Should a Bathroom Safety Checklist Include?")
        + p("The bathroom is the single riskiest room in an elderly parent's home.")
        + ul(
            [
                "Non-slip mats both inside and outside the shower area",
                "Grab bars near the toilet and shower, installed at the correct height",
                "A plastic shower chair to reduce standing time",
                "Raised toilet seats for parents with knee or hip pain",
                "A nightlight so late-night trips don't happen in the dark",
            ]
        )
        + p(
            "Elderly citizens in Adyar and Mylapore, where many homes still have older bathroom "
            "fittings and step-down shower areas, benefit especially from a professional home "
            "safety audit before renovation."
        )
        + h2(
            "what-changes-reduce-falls-in-the-bedroom-and-living-room",
            "What Changes Reduce Falls in the Bedroom and Living Room?",
        )
        + ul(
            [
                "Remove loose rugs or secure them with non-slip backing",
                "Keep walking paths free of furniture, cables, and clutter",
                "Use a bed height that allows feet to touch the floor when seated",
                "Add motion-sensor lights near the bed for night-time movement",
                "Keep frequently used items within arm's reach to avoid overreaching or climbing",
            ]
        )
        + p(
            "Families in Anna Nagar and T. Nagar apartments, where space is often limited, "
            "should pay particular attention to furniture placement — tight walking corridors "
            "are a common, overlooked hazard."
        )
        + cta(
            "FREE HOME SAFETY ASSESSMENT",
            "Worried about your parent's safety at home?",
            "Get a free in-home fall-risk assessment from an Elderly Wellness care specialist.",
            "Book a Free Assessment",
            CONTACT,
        )
        + h2(
            "how-should-staircases-and-entryways-be-made-safer",
            "How Should Staircases and Entryways Be Made Safer?",
        )
        + ul(
            [
                "Install handrails on both sides of the staircase, not just one",
                "Add non-slip strips to each step edge",
                "Ensure entryway lighting is bright and motion-activated",
                "Keep footwear and doormats away from the direct walking path",
                "Fix uneven thresholds or raised door frames",
            ]
        )
        + p(
            "For homes in Velachery, where many residences have external staircases exposed to "
            "Chennai's monsoon rain, slip-resistant flooring treatment is worth prioritising "
            "before the rainy season each year."
        )
        + h2(
            "when-does-a-family-need-professional-caregiving-support",
            "When Does a Family Need Professional Caregiving Support?",
        )
        + p(
            "A safety checklist reduces risk, but it doesn't replace supervision. If your parent "
            "has already had one fall, uses a walker or cane, is on medication that affects "
            "balance (like sedatives or blood pressure drugs), or lives alone for long stretches "
            "during the day, it's time to bring in a trained caregiver."
        )
        + p(
            "At Elderly Wellness, our caregivers are trained at the Elderly Academy of Caretaking "
            "&amp; Hospitality (EACH) specifically in fall-risk observation, safe transfer "
            f"techniques, and emergency response. Combined with our {PHYSIO} services, we help "
            f"seniors rebuild strength and balance. Read our guide on {EXERCISES} for safe "
            "movement routines that pair well with a fall-prevention plan, and see how caregiver "
            f"quality affects outcomes in {HIRE}."
        )
        + h2("frequently-asked-questions", "Frequently Asked Questions")
        + faq(
            [
                (
                    "What is the most common cause of falls in elderly people at home?",
                    "Poor lighting, loose rugs, and wet bathroom floors are the most common causes, "
                    "often combined with age-related balance and vision changes.",
                ),
                (
                    "How often should a home be checked for fall hazards?",
                    "At least once every six months, and immediately after any change in a parent's "
                    "mobility, medication, or health condition.",
                ),
                (
                    "Can a caregiver help prevent falls, not just respond to them?",
                    "Yes. Trained caregivers are taught to identify fall risk factors early — "
                    "unsteady gait, dizziness after standing, poor footwear — and correct them "
                    "before an accident happens.",
                ),
            ]
        )
        + cta(
            "ELDERLY CARE PLUS APP",
            "Need a trained caregiver at home this week?",
            "Book vetted nurses and caregivers in minutes with the Elderly Care Plus app.",
            "Download the App",
            APP,
            app=True,
        )
    )
    return {
        "slug": "fall-prevention-home-safety-checklist-elderly-chennai",
        "post_id": 901,
        "title": "Fall Prevention at Home: A Room-by-Room Safety Checklist for Elderly Parents in Chennai",
        "meta_title": "Fall Prevention Checklist for Elderly Parents in Chennai | Elderly Wellness",
        "meta_desc": (
            "A room-by-room fall prevention checklist for elderly parents in Chennai. "
            "Practical home safety tips from Elderly Wellness caregivers and nurses."
        ),
        "image": "fall-prevention-home-safety-elderly-chennai.png",
        "alt": "elderly-parent-safe-home-fall-prevention-chennai",
        "category_slug": "elderly-care-services",
        "category_name": "Elderly Care Services",
        "tags": [
            "Fall Prevention for Elderly",
            "Home Safety for Seniors",
            "Elderly Care Services in Chennai",
            "Caregivers",
            "Elderly Care",
        ],
        "keywords": "Elderly Care Services in Chennai, Elder Care, Caregivers, fall prevention",
        "toc": toc_items,
        "body": body,
        "excerpt": (
            "A fall-safe home for seniors needs clear walkways, grab support, and a trained "
            "caregiver who can spot risks before they become accidents."
        ),
    }


def build_blog2() -> dict:
    toc_items = [
        ("what-are-the-earliest-signs-of-dementia-in-elderly-parents", "Early signs families often miss"),
        ("how-is-this-different-from-normal-ageing", "Normal forgetfulness vs dementia"),
        ("what-should-a-family-do-after-noticing-these-signs", "What to do after noticing the signs"),
        ("how-does-professional-geriatric-care-help-with-dementia", "How professional geriatric care helps"),
        ("frequently-asked-questions", "FAQs"),
    ]
    body = (
        p(
            'The earliest signs of dementia in elderly parents are usually subtle: repeating the '
            'same question within minutes, misplacing everyday items in odd places, struggling to '
            'follow a conversation, or getting confused about the day or date. These signs are '
            'easy to dismiss as "normal ageing," but noticing the pattern early makes a real '
            "difference to how families plan care."
        )
        + toc(toc_items)
        + h2(
            "what-are-the-earliest-signs-of-dementia-in-elderly-parents",
            "What Are the Earliest Signs of Dementia in Elderly Parents?",
        )
        + ul(
            [
                "Asking the same question multiple times in one conversation",
                "Losing track of familiar routes, even near home",
                "Struggling to find the right word mid-sentence",
                "Misplacing items in unusual places (keys in the fridge, spectacles in a shoe)",
                "Withdrawing from conversations or social activities they used to enjoy",
                "Difficulty managing finances or medication schedules they've handled for years",
            ]
        )
        + p(
            "Families in Besant Nagar and Nungambakkam, where many elderly parents live "
            "independently while their children work long hours, are often the last to notice "
            "these changes simply because visits are infrequent. A daily caregiver, by contrast, "
            "notices pattern changes within days."
        )
        + h2("how-is-this-different-from-normal-ageing", "How Is This Different from Normal Ageing?")
        + p(
            "Some forgetfulness is a normal part of ageing — misplacing your glasses occasionally, "
            "or forgetting a name and remembering it later. Dementia-related memory loss is "
            "different because it disrupts daily functioning: forgetting how to get home from a "
            "familiar market, forgetting a close family member's name, or being unable to follow "
            "simple instructions they've followed for decades."
        )
        + p(
            "If your parent in Kilpauk or Alwarpet has started struggling with tasks they've done "
            "automatically for years — operating the gas stove, using the remote control, "
            "recognising neighbours — that's a signal worth acting on, not waiting out."
        )
        + cta(
            "GERIATRIC CARE CONSULTATION",
            "Noticed memory changes in a parent?",
            "Speak to our geriatric care team for a confidential consultation.",
            "Talk to a Specialist",
            CONTACT,
        )
        + h2(
            "what-should-a-family-do-after-noticing-these-signs",
            "What Should a Family Do After Noticing These Signs?",
        )
        + ul(
            [
                "Don't confront, observe. Keep a simple diary of specific incidents — what happened, when, how often.",
                "Consult a geriatrician, not a general physician alone. Early diagnosis significantly improves quality-of-life outcomes.",
                "Rule out reversible causes — vitamin B12 deficiency, thyroid issues, and urinary tract infections can all mimic dementia symptoms in elderly patients.",
                "Involve the whole family early, including decisions about home safety, driving, and financial management, before a crisis forces the conversation.",
            ]
        )
        + p(
            f"{CHECKUPS} covers how to build this kind of monitoring routine before a crisis "
            "happens."
        )
        + p(
            "Families in Tambaram, where extended family often lives across the city rather than "
            "under one roof, benefit from centralising this information with one point of contact "
            "— often a professional caregiver who visits daily and can flag changes to the whole "
            f"family. Our earlier guide on {DEMENTIA_CARE} explains care options once a diagnosis "
            "is in place."
        )
        + h2(
            "how-does-professional-geriatric-care-help-with-dementia",
            "How Does Professional Geriatric Care Help with Dementia?",
        )
        + p(
            "Unlike a general caregiver, our team at the Elderly Academy of Caretaking &amp; "
            "Hospitality (EACH) is specifically trained in dementia-safe communication — never "
            "arguing with confusion, redirecting gently, and maintaining a calm, predictable "
            "routine that reduces anxiety for the elderly parent."
        )
        + p(
            f"Our {GERIATRIC} caregivers are trained to support cognitive changes with "
            "patience-based communication techniques, structured daily routines, and "
            "memory-friendly environments — reducing confusion and agitation. Combined with our "
            f"{NURSING} for medication management, families get consistent, professional support "
            "instead of guessing day to day. If daily supervision becomes necessary, our guide on "
            f"{BALANCE} walks through how families and caregivers can share that responsibility well."
        )
        + h2("frequently-asked-questions", "Frequently Asked Questions")
        + faq(
            [
                (
                    "At what age do dementia symptoms typically start showing?",
                    "Symptoms most commonly appear after age 65, though early-onset dementia can "
                    "occur earlier. Risk increases significantly with age.",
                ),
                (
                    "Can dementia be reversed?",
                    "Most forms of dementia are progressive and not reversible, but some memory "
                    "issues caused by vitamin deficiencies, infections, or medication side effects "
                    "can be treated and improved.",
                ),
                (
                    "How is dementia care different from regular elderly care?",
                    "Dementia care requires specific communication techniques, structured routines, "
                    "and safety modifications (like preventing wandering) that general elderly care "
                    "does not always include.",
                ),
            ]
        )
        + cta(
            "ELDERLY CARE PLUS APP",
            "Find a trained, dementia-aware caregiver near you.",
            "Browse vetted caregiver profiles on the Elderly Care Plus app.",
            "Download the App",
            APP,
            app=True,
        )
    )
    return {
        "slug": "early-signs-of-dementia-in-elderly-parents",
        "post_id": 902,
        "title": "Recognizing Early Signs of Dementia in Elderly Parents: A Family's Guide",
        "meta_title": "Early Signs of Dementia in Elderly Parents: A Family Guide | Elderly Wellness",
        "meta_desc": (
            "Learn the early signs of dementia in elderly parents and when to seek help. "
            "A practical guide from Elderly Wellness's geriatric care specialists in Chennai."
        ),
        "image": "early-signs-dementia-elderly-parents.png",
        "alt": "elderly-parent-early-signs-dementia-family-guide",
        "category_slug": "elderly",
        "category_name": "Elderly",
        "tags": [
            "Dementia in Elderly",
            "Elderly Care",
            "Caregivers",
            "Elderly Care Services",
            "Elderly Wellness",
        ],
        "keywords": "Elderly Care, Elderly Wellness, Elder Care Services, dementia care",
        "toc": toc_items,
        "body": body,
        "excerpt": (
            "The earliest signs of dementia in elderly parents are usually subtle — noticing "
            "the pattern early makes a real difference to how families plan care."
        ),
    }


def build_blog3() -> dict:
    toc_items = [
        ("why-do-the-first-two-weeks-after-hospital-discharge-matter-most", "Why the first two weeks after discharge matter most"),
        ("what-does-home-recovery-care-actually-include", "What home recovery care includes"),
        ("what-mistakes-do-families-commonly-make-after-discharge", "Common mistakes families make"),
        ("how-should-a-family-set-up-a-home-care-plan-before-discharge-day", "Setting up a home care plan before discharge day"),
        ("frequently-asked-questions", "FAQs"),
    ]
    body = (
        p(
            "Post-hospital recovery care at home means arranging trained nursing support, "
            "medication management, wound care, and mobility assistance in the days and weeks "
            "after an elderly parent is discharged. It matters because most hospital readmissions "
            "among seniors happen not because the treatment failed, but because recovery at home "
            "wasn't properly managed."
        )
        + toc(toc_items)
        + h2(
            "why-do-the-first-two-weeks-after-hospital-discharge-matter-most",
            "Why Do the First Two Weeks After Hospital Discharge Matter Most?",
        )
        + p(
            "Hospitals treat the immediate medical crisis, but recovery — the part where strength, "
            "mobility, and independence are rebuilt — happens at home. This window is when "
            "complications like infections, falls, and missed medication doses are most likely, "
            "especially for elderly patients recovering from surgery, a cardiac event, or a fracture."
        )
        + p(
            "Families in Porur and Guindy, close to several of Chennai's major hospitals, often "
            "discharge a parent home the same day treatment ends — without a clear plan for who "
            "manages dressing changes, physiotherapy exercises, or the next round of medication. "
            f"That gap is exactly where professional {NURSING} support matters most."
        )
        + h2(
            "what-does-home-recovery-care-actually-include",
            "What Does Home Recovery Care Actually Include?",
        )
        + ul(
            [
                "Medication management — ensuring the right dose at the right time, and watching for side effects",
                "Wound and dressing care — changing bandages, monitoring for infection signs",
                "Vital monitoring — blood pressure, blood sugar, oxygen levels, as advised by the discharging doctor",
                "Mobility support — safe transfers from bed to chair, assisted walking, fall prevention",
                "Physiotherapy continuation for recoveries needing structured movement work",
                "Doctor follow-up coordination — making sure review appointments actually happen on schedule",
            ]
        )
        + p(
            f"Many recoveries — hip replacement, cardiac surgery, stroke — need structured {PHYSIO} "
            "at home to regain strength. For heart-related recoveries specifically, see our guide "
            f"on {CARDIO}; for fracture or joint recovery, see {OSTEO}."
        )
        + p(
            "Families in Ashok Nagar and Chrompet managing recovery for a parent after joint "
            "replacement surgery, in particular, often underestimate how much daily physiotherapy "
            "affects the final outcome — skipping even a few sessions can meaningfully slow recovery."
        )
        + cta(
            "PLAN BEFORE DISCHARGE",
            "Discharge coming up soon?",
            "Arrange a trained nurse before your parent leaves the hospital.",
            "Talk to Our Care Team",
            CONTACT,
        )
        + h2(
            "what-mistakes-do-families-commonly-make-after-discharge",
            "What Mistakes Do Families Commonly Make After Discharge?",
        )
        + ul(
            [
                'Assuming a family member without medical training can handle wound care — improper dressing changes are a leading cause of post-surgical infection',
                "Missing medication timing, especially with multiple new medications prescribed at discharge",
                'Skipping physiotherapy because the parent "seems fine" resting at home',
                "Not tracking warning signs — fever, unusual swelling, confusion, or breathlessness that need immediate medical attention",
                "Underestimating the emotional toll of recovery, particularly for seniors who feel a sudden loss of independence",
            ]
        )
        + p(
            "For families in Guindy and Perungudi, where working professionals often can't take "
            "extended leave, this is precisely where a live-in or daily-visit nurse changes the "
            "outcome — someone is present and trained to catch these issues early."
        )
        + h2(
            "how-should-a-family-set-up-a-home-care-plan-before-discharge-day",
            "How Should a Family Set Up a Home Care Plan Before Discharge Day?",
        )
        + ul(
            [
                "Ask the hospital for a written discharge summary, including medication schedule and warning signs to watch for",
                "Book a trained nurse or caregiver before discharge day, not after — the first 48 hours are the highest-risk window",
                "Set up the home environment in advance (hospital bed if needed, mobility aids, medication organiser)",
                "Schedule follow-up appointments immediately, don't leave them open-ended",
                "Keep one family member as the point of contact with the care team to avoid confused, conflicting instructions",
            ]
        )
        + p(
            "Our care coordinators help families in Chrompet, Porur, and across Chennai put this "
            "plan together before the parent even leaves the hospital, so care starts the moment "
            "they walk through the door."
        )
        + h2("frequently-asked-questions", "Frequently Asked Questions")
        + faq(
            [
                (
                    "How soon after hospital discharge should home nursing care start?",
                    "Ideally, care should be arranged before discharge so a trained nurse or "
                    "caregiver is present from the first day at home, when complication risk is highest.",
                ),
                (
                    "Can a family member do wound care instead of a nurse?",
                    "For simple dressing changes, yes with guidance. For surgical wounds, stitches, "
                    "or drains, a trained nurse should manage this to reduce infection risk.",
                ),
                (
                    "How long does post-hospital home care typically last?",
                    "It depends on the condition — anywhere from a few days for minor procedures to "
                    "several weeks for major surgery, cardiac events, or stroke recovery.",
                ),
            ]
        )
        + cta(
            "ELDERLY CARE PLUS APP",
            "Book a nurse for home recovery care in minutes.",
            "Trained, vetted nursing support, available across Chennai.",
            "Download the App",
            APP,
            app=True,
        )
    )
    return {
        "slug": "post-hospital-recovery-care-at-home-chennai",
        "post_id": 903,
        "title": "Post-Hospital Recovery Care at Home: What Every Chennai Family Should Know",
        "meta_title": "Post-Hospital Recovery Care at Home in Chennai | Elderly Wellness",
        "meta_desc": (
            "Learn how post-hospital recovery care at home works, what to arrange first, and how "
            "nursing support speeds recovery. A guide by Elderly Wellness, Chennai."
        ),
        "image": "post-hospital-recovery-care-at-home-chennai.png",
        "alt": "nurse-caring-elderly-patient-post-hospital-recovery-home",
        "category_slug": "elderly-care-services",
        "category_name": "Elderly Care Services",
        "tags": [
            "Post-Hospital Care",
            "Nursing Service",
            "Elderly Care Services in Chennai",
            "Caregivers",
            "Elder Care",
        ],
        "keywords": "Elderly Care Services in Chennai, Elder Care, Caregivers, home nursing care",
        "toc": toc_items,
        "body": body,
        "excerpt": (
            "Post-hospital recovery care at home means arranging trained nursing support, "
            "medication management, wound care, and mobility assistance after discharge."
        ),
    }


def build_blog4() -> dict:
    toc_items = [
        ("why-does-loneliness-affect-elderly-parents-so-deeply", "Why loneliness affects elderly parents deeply"),
        ("what-are-the-signs-a-parent-may-be-struggling-with-isolation", "Signs a parent may be struggling"),
        ("what-can-families-do-to-help", "Practical ways families can help"),
        ("how-does-caregiver-companionship-make-a-measurable-difference", "How caregiver companionship makes a difference"),
        ("frequently-asked-questions", "FAQs"),
    ]
    body = (
        p(
            "Loneliness in elderly parents is a genuine health risk, not just an emotional "
            "inconvenience — studies consistently link chronic loneliness in seniors to higher "
            "rates of depression, cognitive decline, and even heart disease. The most effective "
            "support combines regular human connection, structured daily engagement, and, where "
            "needed, a trained caregiver who provides companionship alongside physical care."
        )
        + toc(toc_items)
        + h2(
            "why-does-loneliness-affect-elderly-parents-so-deeply",
            "Why Does Loneliness Affect Elderly Parents So Deeply?",
        )
        + p(
            "Retirement, the loss of a spouse, children moving away for work, and reduced mobility "
            "can combine to shrink an elderly parent's world dramatically — sometimes down to the "
            "four walls of their home. Unlike younger adults, seniors often have fewer opportunities "
            "to rebuild a social circle once it thins out."
        )
        + p(
            "In neighbourhoods like Vadapalani and Kodambakkam, where many elderly residents have "
            "lived for decades as their surroundings changed around them — old neighbours moving "
            "away, children relocating for work — this sense of isolation can build up quietly over "
            "years, even inside a full household."
        )
        + h2(
            "what-are-the-signs-a-parent-may-be-struggling-with-isolation",
            "What Are the Signs a Parent May Be Struggling with Isolation?",
        )
        + ul(
            [
                "Withdrawing from phone calls or visits they used to look forward to",
                "Loss of interest in hobbies, festivals, or routines they once enjoyed",
                "Changes in appetite or sleep without a clear medical cause",
                'Speaking about feeling like a "burden" to the family',
                "Increased irritability or, conversely, unusual quietness",
                "Reduced interest in personal grooming or appearance",
            ]
        )
        + p(
            "Families in Saidapet and Sholinganallur, where adult children often work long "
            "IT-sector hours, sometimes only notice these changes during video calls — subtle cues "
            "like a parent's flat tone or short answers are easy to miss when visits are infrequent."
        )
        + cta(
            "COMPANIONSHIP-FOCUSED CARE",
            "Worried your parent feels isolated?",
            "Speak to our team about companionship-focused caregiving.",
            "Get in Touch",
            CONTACT,
        )
        + h2("what-can-families-do-to-help", "What Can Families Do to Help?")
        + ul(
            [
                "Prioritise consistency over frequency. A short daily call matters more than one long weekly visit.",
                "Encourage structured routines — a fixed time for a walk, a call with a grandchild, or a favourite TV programme gives the day shape.",
                "Reconnect with community. Many residential areas in Chennai, including Thiruvanmiyur, have active senior citizen associations and temple groups worth reintroducing a parent to.",
                "Involve them in decisions, not just care. Feeling consulted, not managed, protects a sense of independence.",
                "Watch for depression, not just loneliness. If low mood persists for weeks, a geriatric mental health consultation is worth arranging, not just more family visits.",
            ]
        )
        + h2(
            "how-does-caregiver-companionship-make-a-measurable-difference",
            "How Does Caregiver Companionship Make a Measurable Difference?",
        )
        + p(
            "Physical care alone doesn't solve loneliness — a caregiver who only handles medication "
            "and meals but never truly engages leaves the emotional gap untouched. At Elderly "
            "Wellness, our caregivers are trained at the Elderly Academy of Caretaking &amp; "
            "Hospitality (EACH) to build genuine daily engagement: conversation, shared activities, "
            "and consistent presence, not just task completion."
        )
        + p(
            f"This is closely tied to our {GERIATRIC} approach, which treats emotional wellbeing as "
            "part of overall health, not separate from it. For families managing this from a "
            f"distance — including many NRI families — our {ASSISTED} services combine daily "
            "physical care with structured companionship. Choosing the right caregiver matters "
            f"here too — our guide on {HIRE} covers what to look for beyond just medical skills."
        )
        + h2("frequently-asked-questions", "Frequently Asked Questions")
        + faq(
            [
                (
                    "How common is loneliness among elderly people in India?",
                    "It is increasingly common, particularly in urban households where adult "
                    "children relocate for work, leaving elderly parents living alone or with "
                    "reduced daily social contact.",
                ),
                (
                    "Can loneliness actually affect physical health?",
                    "Yes. Chronic loneliness is linked to higher risks of depression, cognitive "
                    "decline, weakened immunity, and cardiovascular problems in elderly populations.",
                ),
                (
                    "How is a caregiver different from a companion for addressing loneliness?",
                    "A trained caregiver combines companionship with the ability to notice health "
                    "changes, manage routines, and respond to emergencies — something a casual "
                    "companion arrangement can't provide.",
                ),
            ]
        )
        + cta(
            "ELDERLY CARE PLUS APP",
            "Find a caregiver who cares beyond the checklist.",
            "Browse vetted, companionship-trained caregivers near you.",
            "Download the App",
            APP,
            app=True,
        )
    )
    return {
        "slug": "loneliness-mental-wellbeing-elderly-parents",
        "post_id": 904,
        "title": "Understanding Loneliness in Elderly Parents &amp; How to Support Their Mental Wellbeing",
        "meta_title": "Loneliness & Mental Wellbeing in Elderly Parents | Elderly Wellness",
        "meta_desc": (
            "Loneliness affects elderly parents' health as much as physical illness. Learn the "
            "signs and how caregivers can help. A guide by Elderly Wellness, Chennai."
        ),
        "image": "loneliness-mental-wellbeing-elderly-parents.png",
        "alt": "elderly-parent-caregiver-companionship-mental-wellbeing",
        "category_slug": "elderly",
        "category_name": "Elderly",
        "tags": [
            "Elderly Mental Health",
            "Loneliness in Seniors",
            "Elderly Care",
            "Caregivers",
            "Elderly Wellness",
        ],
        "keywords": "Elderly Care, Caregivers, Elderly Wellness, senior loneliness",
        "toc": toc_items,
        "body": body,
        "excerpt": (
            "Loneliness in elderly parents is a genuine health risk — the most effective support "
            "combines regular connection, structured engagement, and trained companionship care."
        ),
    }


def build_blog5() -> dict:
    toc_items = [
        ("what-does-home-care-for-elderly-parents-actually-cover", "What home care covers"),
        ("what-does-assisted-living-support-actually-cover", "What assisted living support covers"),
        ("what-are-the-key-differences-families-should-weigh", "Key differences to weigh"),
        ("how-should-a-family-decide-between-the-two", "A simple decision framework"),
        ("frequently-asked-questions", "FAQs"),
    ]
    table = (
        '<figure class="wp-block-table"><table class="has-fixed-layout">'
        "<thead><tr><th>Factor</th><th>Home Care</th><th>Assisted Living Support</th></tr></thead>"
        "<tbody>"
        "<tr><td>Level of supervision</td><td>Periodic — fixed hours or specific tasks</td>"
        "<td>Continuous, structured daily assistance</td></tr>"
        "<tr><td>Best suited for</td><td>Largely independent parents needing targeted help</td>"
        "<td>Parents needing consistent daily support</td></tr>"
        "<tr><td>Environment</td><td>Parent's own home, unchanged</td>"
        "<td>Parent's own home, with structured routines</td></tr>"
        "<tr><td>Flexibility</td><td>Easy to scale up or down as needs change</td>"
        "<td>Built around a consistent daily care plan</td></tr>"
        "<tr><td>Family involvement</td><td>High — family often coordinates alongside caregiver</td>"
        "<td>Coordinated closely with the care team</td></tr>"
        "</tbody></table></figure>\n\n\n\n"
    )
    body = (
        p(
            "Home care keeps an elderly parent in their own familiar surroundings with a caregiver "
            "visiting or living in, while assisted living support provides structured daily "
            "assistance within the home environment through trained professionals, without "
            "relocating the parent to a facility. For most Chennai families, the right choice "
            "depends on the parent's medical needs, mobility, and how much daily supervision they "
            "realistically require."
        )
        + toc(toc_items)
        + h2(
            "what-does-home-care-for-elderly-parents-actually-cover",
            "What Does Home Care for Elderly Parents Actually Cover?",
        )
        + p(
            "Home care typically means a caregiver or nurse visiting for fixed hours, or living in, "
            "to assist with specific tasks — medication reminders, meals, mobility support, and "
            "companionship — while the parent continues managing most of their own routine."
        )
        + p(
            "This works well for elderly parents in Nanganallur or Medavakkam who are largely "
            "independent but need support with a few specific things: post-surgery recovery, "
            "managing a chronic condition, or simply having someone present during the day while "
            "adult children are at work."
        )
        + h2(
            "what-does-assisted-living-support-actually-cover",
            "What Does Assisted Living Support Actually Cover?",
        )
        + p(
            f"{ASSISTED} goes a step further — structured, ongoing daily assistance with bathing, "
            "dressing, mobility, medication management, and health monitoring, delivered by trained "
            "professionals within the parent's own home. It's designed for elderly parents who need "
            "consistent, hands-on help throughout the day, not just periodic visits."
        )
        + p(
            "Families in Pallikaranai and Madipakkam managing a parent with declining mobility or "
            "early-stage dementia often find this level of structured, daily support bridges the "
            "gap between occasional home care and a full residential facility — without uprooting "
            "the parent from their home."
        )
        + cta(
            "PERSONALISED RECOMMENDATION",
            "Not sure which level of care your parent needs?",
            "Get a free, personalised care assessment from our coordinators.",
            "Book a Consultation",
            CONTACT,
        )
        + h2(
            "what-are-the-key-differences-families-should-weigh",
            "What Are the Key Differences Families Should Weigh?",
        )
        + table
        + p(
            "The right choice isn't fixed — many families in Alandur start with home care after a "
            "hospital discharge, and transition to assisted living support as a parent's needs "
            "increase over time."
        )
        + h2(
            "how-should-a-family-decide-between-the-two",
            "How Should a Family Decide Between the Two?",
        )
        + ul(
            [
                "Can my parent manage daily activities (bathing, dressing, medication) mostly alone, or do they need help every day? Mostly alone → home care. Daily help needed → assisted living support.",
                f"Is there a specific, time-limited need (recovery, a temporary illness)? Home care, via our {NURSING}, is usually enough.",
                "Has there been a fall, a diagnosis like dementia, or a steady decline in mobility over the past year? Assisted living support provides the consistency that periodic care can't.",
                "Is a family member available daily to check in, or is care needed to be fully self-sufficient? The less family availability there is, the more structured the support should be.",
            ]
        )
        + p(
            f"Point 2 above is why our {NURSING} and {POST_HOSPITAL} guide pair well together for "
            "families managing a time-limited recovery rather than an ongoing care need. Our care "
            "coordinators, trained through the Elderly Academy of Caretaking &amp; Hospitality "
            "(EACH), assess each family's situation individually — because the right answer often "
            f"changes as a parent's needs evolve. For guidance on evaluating caregivers either way, "
            f"see {HIRE}."
        )
        + h2("frequently-asked-questions", "Frequently Asked Questions")
        + faq(
            [
                (
                    "Is assisted living support the same as moving a parent into a care facility?",
                    "No. Our assisted living support is delivered within the parent's own home, "
                    "providing structured daily assistance without relocation.",
                ),
                (
                    "Can a family switch from home care to assisted living support later?",
                    "Yes, and it's common. Many families start with home care after a hospital "
                    "discharge and move to assisted living support as daily needs increase.",
                ),
                (
                    "How is cost typically structured for these services?",
                    "Elderly Wellness uses transparent, slab-based pricing depending on the level "
                    "and hours of care required — families can discuss specific plans with our "
                    "care coordinators.",
                ),
            ]
        )
        + cta(
            "ELDERLY CARE PLUS APP",
            "Compare home care and assisted living plans in one app.",
            "Browse care options and book vetted professionals near you.",
            "Download the App",
            APP,
            app=True,
        )
    )
    return {
        "slug": "home-care-vs-assisted-living-chennai",
        "post_id": 905,
        "title": "Home Care vs Assisted Living: How to Choose the Right Elder Care Option in Chennai",
        "meta_title": "Home Care vs Assisted Living in Chennai: Which to Choose | Elderly Wellness",
        "meta_desc": (
            "Home care or assisted living? Compare costs, independence, and safety to choose the "
            "right elder care option in Chennai. Guide by Elderly Wellness."
        ),
        "image": "home-care-vs-assisted-living-chennai.png",
        "alt": "elderly-parent-choosing-home-care-assisted-living-chennai",
        "category_slug": "elderly-care-services",
        "category_name": "Elderly Care Services",
        "tags": [
            "Assisted Living Support",
            "Home Care for Elderly",
            "Elderly Care Services in Chennai",
            "Elder Care",
            "Caregivers",
        ],
        "keywords": "Elderly Care Services in Chennai, Elder Care, Caregivers, elder care comparison",
        "toc": toc_items,
        "body": body,
        "excerpt": (
            "Home care keeps a parent in familiar surroundings; assisted living support adds "
            "structured daily assistance at home — here's how Chennai families choose."
        ),
    }


def schema_json(blog: dict) -> str:
    img = f"{UPLOAD}/{blog['image']}"
    toc_nav = [
        {
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "@id": "#rank-math-toc",
            "name": label,
            "url": f"#{aid}",
        }
        for aid, label in blog["toc"]
    ]
    graph = [
        toc_nav,
        {
            "@type": "Organization",
            "@id": "../#organization",
            "name": "Elderly Wellness",
            "url": "..",
            "email": "info@theelderlywellness.com",
            "logo": {
                "@type": "ImageObject",
                "@id": "../#logo",
                "url": "../wp-content/uploads/2025/04/logo.png",
                "contentUrl": "../wp-content/uploads/2025/04/logo.png",
                "caption": "Elderly Wellness",
                "inLanguage": "en-US",
                "width": "91",
                "height": "91",
            },
            "contactPoint": [
                {"@type": "ContactPoint", "telephone": "+91 9944890577", "contactType": "customer support"}
            ],
            "description": (
                "Elderly Wellness connects families with trained professionals providing nursing "
                "care, physiotherapy, and assisted living support, ensuring peace of mind and "
                "improved quality of life for seniors"
            ),
        },
        {
            "@type": "WebSite",
            "@id": "../#website",
            "url": "..",
            "name": "Elderly Wellness",
            "alternateName": "Elderly",
            "publisher": {"@id": "../#organization"},
            "inLanguage": "en-US",
        },
        {
            "@type": "ImageObject",
            "@id": img,
            "url": img,
            "width": "1200",
            "height": "628",
            "caption": blog["alt"],
            "inLanguage": "en-US",
        },
        {
            "@type": "BreadcrumbList",
            "@id": "#breadcrumb",
            "itemListElement": [
                {"@type": "ListItem", "position": "1", "item": {"@id": "https://blogs.theelderlywellness.com", "name": "Home"}},
                {
                    "@type": "ListItem",
                    "position": "2",
                    "item": {"@id": f"../category/{blog['category_slug']}", "name": blog["category_name"]},
                },
                {"@type": "ListItem", "position": "3", "item": {"@id": "", "name": blog["title"].replace("&amp;", "&")}},
            ],
        },
        {
            "@type": "WebPage",
            "@id": "#webpage",
            "url": "",
            "name": blog["meta_title"],
            "datePublished": PUB,
            "dateModified": MOD,
            "isPartOf": {"@id": "../#website"},
            "primaryImageOfPage": {"@id": img},
            "inLanguage": "en-US",
            "breadcrumb": {"@id": "#breadcrumb"},
        },
        {
            "@type": "Person",
            "@id": "../author/elderly",
            "name": "Elderly",
            "url": "../author/elderly",
            "image": {
                "@type": "ImageObject",
                "@id": "https://blogs.theelderlywellness.com/wp-content/uploads/2025/04/logo.png",
                "url": "https://blogs.theelderlywellness.com/wp-content/uploads/2025/04/logo.png",
                "caption": "Elderly",
                "inLanguage": "en-US",
            },
            "sameAs": ["https://blogs.theelderlywellness.com"],
            "worksFor": {"@id": "../#organization"},
        },
        {
            "@type": "BlogPosting",
            "headline": blog["meta_title"],
            "keywords": blog["keywords"],
            "datePublished": PUB,
            "dateModified": MOD,
            "articleSection": blog["category_name"],
            "author": {"@id": "../author/elderly", "name": "Elderly"},
            "publisher": {"@id": "../#organization"},
            "description": blog["meta_desc"],
            "name": blog["meta_title"],
            "@id": "#richSnippet",
            "isPartOf": {"@id": "#webpage"},
            "image": {"@id": img},
            "inLanguage": "en-US",
            "mainEntityOfPage": {"@id": "#webpage"},
        },
    ]
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)


def render_post(template: str, blog: dict, prev_slug: str, prev_title: str, next_slug: str, next_title: str) -> str:
    html = template
    pid = blog["post_id"]
    img = f"{UPLOAD}/{blog['image']}"
    title = blog["title"]
    meta_title = blog["meta_title"]
    meta_desc = blog["meta_desc"]

    # Replace title / meta block (simple substitutions)
    html = re.sub(r"<title>.*?</title>", f"<title>{esc(meta_title)}</title>", html, count=1)
    html = re.sub(
        r'<meta name="description" content="[^"]*"/>',
        f'<meta name="description" content="{esc(meta_desc)}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:title" content="[^"]*"/>',
        f'<meta property="og:title" content="{esc(meta_title)}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:description" content="[^"]*"/>',
        f'<meta property="og:description" content="{esc(meta_desc)}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:title" content="[^"]*"/>',
        f'<meta name="twitter:title" content="{esc(meta_title)}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:description" content="[^"]*"/>',
        f'<meta name="twitter:description" content="{esc(meta_desc)}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:image" content="[^"]*"/>',
        f'<meta property="og:image" content="{img}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:image:secure_url" content="[^"]*"/>',
        f'<meta property="og:image:secure_url" content="https://www.theelderlywellness.com/images/blogs/{blog["image"]}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:image:alt" content="[^"]*"/>',
        f'<meta property="og:image:alt" content="{esc(blog["alt"])}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:image" content="[^"]*"/>',
        f'<meta name="twitter:image" content="{img}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="article:published_time" content="[^"]*"/>',
        f'<meta property="article:published_time" content="{PUB}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="article:modified_time" content="[^"]*"/>',
        f'<meta property="article:modified_time" content="{MOD}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:updated_time" content="[^"]*"/>',
        f'<meta property="og:updated_time" content="{MOD}"/>',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="article:section" content="[^"]*"/>',
        f'<meta property="article:section" content="{esc(blog["category_name"])}"/>',
        html,
        count=1,
    )

    # Tags meta
    tag_meta = "\n".join(f'<meta property="article:tag" content="{esc(t)}"/>' for t in blog["tags"])
    html = re.sub(
        r'(?:<meta property="article:tag" content="[^"]*"/>\s*)+',
        tag_meta + "\n",
        html,
        count=1,
    )

    # Schema
    html = re.sub(
        r'<script type="application/ld\+json" class="rank-math-schema">.*?</script>',
        f'<script type="application/ld+json" class="rank-math-schema">{schema_json(blog)}</script>',
        html,
        count=1,
        flags=re.DOTALL,
    )

    # Body class post id
    html = html.replace("postid-822", f"postid-{pid}")
    html = html.replace("post-822", f"post-{pid}")
    html = html.replace('value="822"', f'value="{pid}"')
    html = html.replace("category-caregiver", f"category-{blog['category_slug']}")

    # Add blog-pages.css if missing
    if "blog-pages.css" not in html:
        html = html.replace(
            '<link rel="stylesheet" href="../../css/blog-faq.css"/>',
            '<link rel="stylesheet" href="../../css/blog-faq.css"/>\n'
            '<link rel="stylesheet" href="../../css/blog-pages.css"/>',
        )

    # Featured image + header + content replacement
    article_pattern = re.compile(
        r'(<article[^>]*>.*?<div class="featured-image[^>]*>).*?(</div>\s*<header class="entry-header">).*?(</header>\s*<div class="entry-content"[^>]*>).*?(<div class="post-views)',
        re.DOTALL,
    )

    def repl_article(m: re.Match) -> str:
        featured = (
            f'{m.group(1)}\n'
            f'\t\t\t<img width="1200" height="628" src="{img}" class="attachment-full size-full wp-post-image" '
            f'alt="{esc(blog["alt"])}" itemprop="image" decoding="async" fetchpriority="high" '
            f'title="{esc(title)}">\t\t{m.group(2)}\n'
            f'\t\t\t\t<h1 class="entry-title" itemprop="headline">{title}</h1>\t\t'
            f'<div class="entry-meta">\n'
            f'\t\t\t<span class="posted-on"><time class="updated" datetime="{MOD}" itemprop="dateModified">{DATE_DISP}</time>'
            f'<time class="entry-date published" datetime="{PUB}" itemprop="datePublished">{DATE_DISP}</time></span> '
            f'<span class="byline">by <span class="author vcard" itemprop="author" itemtype="https://schema.org/Person" itemscope>'
            f'<a class="url fn n" href="../author/elderly" title="View all posts by Elderly" rel="author" itemprop="url">'
            f'<span class="author-name" itemprop="name">Elderly</span></a></span></span>\t\t</div>\n'
            f'\t\t\t\t\t{m.group(3)}\n\t\t\t\n{blog["body"]}{m.group(4)}'
        )
        return featured

    html, n = article_pattern.subn(repl_article, html, count=1)
    if n != 1:
        raise RuntimeError(f"Failed to inject content for {blog['slug']}")

    # Category footer link
    html = re.sub(
        r'(<span class="cat-links">.*?<a href=")[^"]*(" rel="category tag">)[^<]*(</a>)',
        rf'\1../category/{blog["category_slug"]}\2{blog["category_name"]}\3',
        html,
        count=1,
        flags=re.DOTALL,
    )

    # Prev/next
    html = re.sub(
        r'(<div class="nav-previous">.*?href=")[^"]*(" rel="prev">)[^<]*(</a>)',
        rf'\1../{prev_slug}\2{esc(prev_title)}\3',
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<div class="nav-next">.*?href=")[^"]*(" rel="next">)[^<]*(</a>)',
        rf'\1../{next_slug}\2{esc(next_title)}\3',
        html,
        count=1,
        flags=re.DOTALL,
    )

    # Recent posts sidebar: prepend this post's siblings later via shared block; for now leave template

    # RSS alternate title
    html = re.sub(
        r"Elderly Wellness » .*? Comments Feed",
        f"Elderly Wellness » {blog['title'].replace('&amp;', '&')} Comments Feed",
        html,
        count=1,
    )

    return html


def listing_card(blog: dict) -> str:
    return f'''<article id="post-{blog["post_id"]}" class="post-{blog["post_id"]} post type-post status-publish format-standard has-post-thumbnail hentry category-{blog["category_slug"]} has-tfm-read-time" itemtype="https://schema.org/CreativeWork" itemscope>
	<div class="inside-article">
					<header class="entry-header">
				<h2 class="entry-title" itemprop="headline"><a href="{blog["slug"]}" rel="bookmark">{blog["title"]}</a></h2>		<div class="entry-meta">
			<span class="posted-on"><time class="updated" datetime="{MOD}" itemprop="dateModified">{DATE_DISP}</time><time class="entry-date published" datetime="{PUB}" itemprop="datePublished">{DATE_DISP}</time></span> <span class="byline">by <span class="author vcard" itemprop="author" itemtype="https://schema.org/Person" itemscope><a class="url fn n" href="author/elderly" title="View all posts by Elderly" rel="author" itemprop="url"><span class="author-name" itemprop="name">Elderly</span></a></span></span> 		</div>
					</header>
			<div class="post-image">
						
						<a href="{blog["slug"]}">
							<img width="1200" height="628" src="../images/blogs/{blog["image"]}" class="attachment-full size-full wp-post-image" alt="{esc(blog["alt"])}" itemprop="image" decoding="async" title="{esc(blog["title"])}">
						</a>
					</div>
			<div class="entry-summary" itemprop="text">
				<p>{esc(blog["excerpt"])} &#8230; <a title="{esc(blog["title"])}" class="read-more" href="{blog["slug"]}" aria-label="Read more about {esc(blog["title"])}">Read more</a></p>
			</div>

				<footer class="entry-meta" aria-label="Entry meta">
			<span class="cat-links"><span class="gp-icon icon-categories"><svg viewbox="0 0 512 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M0 112c0-26.51 21.49-48 48-48h110.014a48 48 0 0143.592 27.907l12.349 26.791A16 16 0 00228.486 128H464c26.51 0 48 21.49 48 48v224c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112z"/></svg></span><span class="screen-reader-text">Categories </span><a href="category/{blog["category_slug"]}" rel="category tag">{blog["category_name"]}</a></span> <span class="comments-link"><span class="gp-icon icon-comments"><svg viewbox="0 0 512 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M132.838 329.973a435.298 435.298 0 0016.769-9.004c13.363-7.574 26.587-16.142 37.419-25.507 7.544.597 15.27.925 23.098.925 54.905 0 105.634-15.311 143.285-41.28 23.728-16.365 43.115-37.692 54.155-62.645 54.739 22.205 91.498 63.272 91.498 110.286 0 42.186-29.558 79.498-75.09 102.828 23.46 49.216 75.09 101.709 75.09 101.709s-115.837-38.35-154.424-78.46c-9.956 1.12-20.297 1.758-30.793 1.758-88.727 0-162.927-43.071-181.007-100.61z"/><path d="M383.371 132.502c0 70.603-82.961 127.787-185.216 127.787-10.496 0-20.837-.639-30.793-1.757-38.587 40.093-154.424 78.429-154.424 78.429s51.63-52.472 75.09-101.67c-45.532-23.321-75.09-60.619-75.09-102.79C12.938 61.9 95.9 4.716 198.155 4.716 300.41 4.715 383.37 61.9 383.37 132.502z"/></svg></span><a href="{blog["slug"]}/#respond">Leave a comment</a></span> 		</footer>
			</div>
</article>
'''


def update_index(blogs: list[dict]) -> None:
    index = BLOGS / "index.html"
    html = index.read_text(encoding="utf-8")
    cards = "\n".join(listing_card(b) for b in blogs)
    # Insert before first article
    html = html.replace(
        '<main class="site-main" id="main">\n\t\t\t<article id="post-843"',
        f'<main class="site-main" id="main">\n\t\t\t{cards}<article id="post-843"',
        1,
    )
    if "blog-pages.css" not in html:
        html = html.replace(
            '<link rel="stylesheet" href="../css/manrope.css" media="all"/>',
            '<link rel="stylesheet" href="../css/manrope.css" media="all"/>\n'
            '<link rel="stylesheet" href="../css/blog-pages.css"/>',
            1,
        )
    index.write_text(html, encoding="utf-8")
    print("Updated blogs/index.html")


def main() -> None:
    template = TEMPLATE.read_text(encoding="utf-8")
    blogs = [build_blog1(), build_blog2(), build_blog3(), build_blog4(), build_blog5()]

    # Prev/next chain among new posts + existing bookends
    nav = [
        ("exercises-for-seniors-over-75", "Exercise for Seniors Over 75: Safe, Simple & Life-Enhancing Movements"),
        *[(b["slug"], b["title"].replace("&amp;", "&")) for b in blogs],
        ("how-to-hire-best-caregiver-for-seniors-in-chennai", "How to Hire the Best Caregiver for Seniors in Chennai – Complete Family Guide"),
    ]

    for i, blog in enumerate(blogs):
        prev_slug, prev_title = nav[i]
        next_slug, next_title = nav[i + 2]
        out_dir = BLOGS / blog["slug"]
        out_dir.mkdir(parents=True, exist_ok=True)
        html = render_post(template, blog, prev_slug, prev_title, next_slug, next_title)
        (out_dir / "index.html").write_text(html, encoding="utf-8")
        print(f"Wrote {blog['slug']}/index.html")

    update_index(blogs)
    print("Done.")


if __name__ == "__main__":
    main()
