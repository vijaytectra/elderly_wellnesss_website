import type { Metadata } from "next";
import { ArrangeSteps, type ArrangeStep } from "@/components/sections/ArrangeSteps";
import { OurValues } from "@/components/sections/OurValues";
import { ServiceFAQ, type ServiceFAQItem } from "@/components/sections/ServiceFAQ";
import { ServiceHero } from "@/components/sections/ServiceHero";
import {
  ServiceInfoBlock,
  type ServiceInfoBullet,
} from "@/components/sections/ServiceInfoBlock";
import { WhyChooseUs, type WhyChooseUsFeature } from "@/components/sections/WhyChooseUs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title:
    "Best Assisted Living Support Services for Elders at Home – Elderly Wellness",
  description:
    "Offering professional home assisted living support for seniors. Elderly Wellness ensures your loved ones receive the best care at home. Contact us today at +919944890577.",
  path: "/assisted-living-support-services-for-elders/",
});

const importanceBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Personal Care",
    body: "Assistance with daily activities such as bathing, dressing, grooming, and toileting.",
  },
  {
    title: "Medication Management",
    body: "Ensuring proper administration of medications, reducing the risk of medication errors.",
  },
  {
    title: "Meal Preparation",
    body: "Preparing nutritious meals and helping with feeding, ensuring proper diet and hydration.",
  },
  {
    title: "Household Assistance",
    body: "Light housekeeping, laundry, and maintaining a clean living environment.",
  },
  {
    title: "Companionship",
    body: "Providing emotional support and companionship to combat loneliness and improve mental health.",
  },
];

const roleBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Assist with daily tasks",
    body: "Help with bathing, dressing, meal preparation, and other activities of daily living (ADLs).",
  },
  {
    title: "Provide companionship",
    body: "Offer emotional support and social interaction to reduce feelings of isolation.",
  },
  {
    title: "Promote safety",
    body: "Ensure the home environment is safe and suitable for elderly living, helping prevent falls and accidents.",
  },
  {
    title: "Monitor health",
    body: "Track the elderly individual’s health progress, report any concerns, and adjust care plans accordingly.",
  },
];

const whyHomeBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Familiar Environment",
    body: "Seniors remain in their own home, surrounded by familiar things, reducing stress and promoting comfort.",
  },
  {
    title: "Personalized Care",
    body: "One-on-one support tailored to meet the unique needs of your loved one.",
  },
  {
    title: "Independence",
    body: "While receiving help, seniors can maintain their independence in their daily routines.",
  },
  {
    title: "Flexibility",
    body: "Care can be adjusted based on the individual’s evolving needs, ensuring continuous support.",
  },
];

const expectBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Initial assessment",
    body: "A care specialist will evaluate your loved one’s needs, health, and preferences.",
  },
  {
    title: "Customized care plan",
    body: "A tailored plan will be developed to address specific needs such as personal care, medication, meals, and companionship.",
  },
  {
    title: "Daily support",
    body: "The caregiver will assist with personal care, household tasks, and social interaction.",
  },
  {
    title: "Regular monitoring",
    body: "Care plans will be updated based on the progress and any changes in health or well-being.",
  },
];

const whyChooseFeatures: readonly WhyChooseUsFeature[] = [
  {
    icon: "/images/services/physio-icons/simplified-discovery-process.png",
    title: "Simplified Discovery Process",
    body: "Finding the right care provider can be overwhelming. Our specialists make it easy by assessing your loved one’s needs and matching them with the most suitable caregiver, saving you time and effort.",
  },
  {
    icon: "/images/services/physio-icons/affordable-transparent-care.png",
    title: "Affordable, Transparent Care",
    body: "We offer flexible, slab-based pricing, ensuring you receive top-quality care at a price that fits your budget. Our transparent pricing system helps you choose the right service without any surprises.",
  },
  {
    icon: "/images/services/physio-icons/reliable-long-term-support.png",
    title: "Reliable, Long-term Support",
    body: "At Elderly Wellness, we ensure consistent, reliable care. Our caregivers are carefully vetted and trained at our Elderly Academy of Caretaking & Hospitality (EACH). In case of delays or no-shows, we guarantee a replacement caregiver within 2 hours, ensuring continuous care for your loved ones.",
  },
  {
    icon: "/images/services/physio-icons/quality-you-can-count-on.png",
    title: "Quality You Can Count On",
    body: "We only work with caregivers who are thoroughly screened, vetted, and trained to provide the highest quality care. All our caregivers are part of the Elderly Wellness family, trained at EACH. This ensures your loved ones receive the best possible care—whether they need help with daily activities, medical support, or emotional care.",
  },
  {
    icon: "/images/services/physio-icons/longevity-of-care.png",
    title: "Longevity of Care",
    body: "At Elderly Wellness, we don’t just provide short-term solutions. We are committed to offering long-term support, ensuring consistent and dependable care for your loved ones. Should any issues arise, we’re here to resolve them quickly and maintain continuity of care.",
  },
];

const steps: readonly ArrangeStep[] = [
  {
    image: "/images/services/step1_download_app.png",
    title: "Step 1: Download the Elderly Wellness App",
    body: (
      <p>
        Start by downloading the Elderly Wellness app from your phone&rsquo;s
        app store (available on both iOS and Android). This app will be your
        gateway to accessing professional and compassionate care for your
        elderly family members.
      </p>
    ),
  },
  {
    image: "/images/services/step2_signup_account.png",
    title: "Step 2: Sign Up and Create Your Account",
    body: (
      <p>
        Once the app is installed, open it and sign up by entering your basic
        information. Create an account to get started. This step will allow
        you to save preferences and keep track of your bookings.
      </p>
    ),
  },
  {
    image: "/images/services/step3_select_service.png",
    title: "Step 3: Select the Service You Need",
    body: (
      <>
        <p>
          After signing up, browse through the available services. Choose the
          type of care your loved one needs:
        </p>
        <ul>
          <li>Assisted Living Support</li>
          <li>Nursing Care</li>
          <li>Physiotherapy</li>
          <li>Geriatric Care</li>
        </ul>
        <p>
          Each service option is designed to address specific needs, so
          carefully choose the one that aligns with your elderly loved
          one&rsquo;s requirements.
        </p>
      </>
    ),
  },
  {
    image: "/images/services/step4_connect_specialist.png",
    title: "Step 4: Connect with a Specialist",
    body: (
      <>
        <p>
          Once you&rsquo;ve selected the service, an Elderly Wellness specialist
          will contact you. During this call, the specialist will:
        </p>
        <ul>
          <li>Discuss the specific needs of your elderly loved one.</li>
          <li>
            Ask questions about preferences, health status, and any special
            care requirements.
          </li>
          <li>
            Understand your family&rsquo;s unique situation to provide tailored
            care.
          </li>
        </ul>
      </>
    ),
  },
  {
    image: "/images/services/step5_assign_provider.png",
    title: "Step 5: Assignment of a Suitable Service Provider",
    body: (
      <p>
        Based on the information gathered, the specialist will assign the most
        suitable physiotherapist, nurse, or caregiver. The specialist ensures
        the provider matches the specific needs and preferences of your loved
        one.
      </p>
    ),
  },
  {
    image: "/images/services/step6_confirm_details.png",
    title: "Step 6: Confirm the Service Provider’s Details",
    body: (
      <>
        <p>
          Once a provider is assigned, you will receive all the necessary
          details within the app. This includes:
        </p>
        <ul>
          <li>The provider&rsquo;s profile</li>
          <li>Qualifications and experience</li>
          <li>Availability</li>
        </ul>
        <p>
          This way, you&rsquo;ll know exactly who will be providing care for
          your loved one.
        </p>
      </>
    ),
  },
  {
    image: "/images/services/step7_secure_payment.png",
    title: "Step 7: Secure Payment",
    body: (
      <p>
        After confirming the service provider&rsquo;s details, you&rsquo;ll
        make a secure payment directly through the app. Payments are processed
        safely with encryption, ensuring your financial data remains protected.
      </p>
    ),
  },
  {
    image: "/images/services/step8_track_status.png",
    title: "Step 8: Track the Status of Your Booking",
    body: (
      <p>
        Once the booking is confirmed and payment is processed, you&rsquo;ll
        receive real-time updates about the arrival time and progress of the
        session. You can track the status of your service provider directly
        from the app.
      </p>
    ),
  },
  {
    image: "/images/services/step9_receive_care.png",
    title: "Step 9: Receive Care at Home",
    body: (
      <p>
        When the day of the appointment arrives, your assigned physiotherapist,
        nurse, or caregiver will visit your home to provide the care your loved
        one needs. Enjoy the peace of mind knowing that experienced
        professionals are taking care of your family.
      </p>
    ),
  },
  {
    image: "/images/services/step10_rate_review.png",
    title: "Step 10: Rate and Review the Service",
    body: (
      <p>
        After the session, you can rate and review the service received. This
        feedback helps us maintain high-quality standards and allows other
        families to make informed decisions.
      </p>
    ),
  },
];

const faqs: readonly ServiceFAQItem[] = [
  {
    q: "What is assisted living support for elderly individuals?",
    a: "Assisted living support includes helping seniors with daily activities such as dressing, bathing, meal preparation, medication management, and providing companionship.",
  },
  {
    q: "How often should elderly people receive assisted living support?",
    a: "The frequency of care depends on individual needs. It could range from daily visits for those with high care needs to a few times a week for those requiring occasional support.",
  },
  {
    q: "Is home assisted living support covered by insurance?",
    a: "Insurance coverage for home assisted living services varies by plan. Contact your insurance provider to determine if it’s covered.",
  },
  {
    q: "How qualified are your assisted living support providers?",
    a: "Our assisted living support providers are licensed professionals with extensive experience in senior care, ensuring the best support for your loved one.",
  },
  {
    q: "What happens after I sign up and select the assisted living support service I need?",
    a: "Once you sign up, an Elderly Wellness specialist will contact you, discuss your loved one’s needs, and assign the most suitable care provider.",
  },
  {
    q: "Can I book more than one session in a day?",
    a: "Yes, you can book multiple sessions on the same day. Confirm availability during your call with our specialist.",
  },
  {
    q: "How do I pay for the service?",
    a: "You’ll make a secure payment directly through the app once the service provider is assigned. The booking will be finalized once payment is confirmed.",
  },
  {
    q: "How can I change the contact information or address of the elderly person?",
    a: "You can easily update contact details and address in your account settings within the app.",
  },
  {
    q: "How do I track the status of my booking or service?",
    a: "You’ll receive real-time notifications through the app, allowing you to track the progress of your loved one’s care.",
  },
  {
    q: "What if the service provider does not arrive on time?",
    a: "If there’s a delay, you’ll be notified through the app. For significant delays, contact customer support for assistance.",
  },
  {
    q: "Can I request the same caregiver for future sessions?",
    a: "Yes, you can request the same caregiver for future sessions as long as they are available.",
  },
  {
    q: "Is my payment information safe?",
    a: "Yes, all payments are securely processed through encrypted methods, ensuring the protection of your financial and personal information.",
  },
];

export default function AssistedLivingSupportPage() {
  return (
    <div>
      <ServiceHero
        image="/images/services/assisted/1.png"
        imageAlt="Caregiver assisting an elderly person with daily activities"
        headingLead="Assisted Living Support for Elders"
        headingAccent="Compassionate Care for Daily Living"
        subheading="Where Age Meets Comprehensive Assistance"
        paragraphs={[
          <>
            Elderly Wellness connects families with offering assisted living
            support in the comfort of your home. Our home-based assisted
            living support services help elderly individuals lead a safe,
            independent, and dignified life.
          </>,
          <>
            Our services are designed to improve the health, comfort, and
            independence of seniors, providing them with the assistance they
            need to thrive in their own homes. We focus on elderly wellness,
            ensuring both families and seniors enjoy peace of mind.
          </>,
        ]}
      />

      <ServiceInfoBlock
        heading="Why is Assisted Living Support Important for Elders?"
        intro="As seniors age, their ability to perform daily activities may decline. Assisted living support is crucial for helping elderly individuals with routine tasks while preserving their independence. Here’s how assisted living support benefits elders:"
        bullets={importanceBullets}
        image="/images/services/assisted/2.png"
        imageAlt="Caregiver helping elderly person"
      />

      <ServiceInfoBlock
        heading="The Role of Assisted Living Support Specialists"
        intro="An assisted living support specialist plays a critical role in maintaining the health and well-being of seniors. They:"
        bullets={roleBullets}
        image="/images/services/assisted/3.png"
        imageAlt="Assisted living specialist with a senior"
        reversed
      />

      <ServiceInfoBlock
        heading="Why Choose Home Assisted Living Support for Elders?"
        intro="Opting for home assisted living support offers numerous advantages:"
        bullets={whyHomeBullets}
        image="/images/services/assisted/4.png"
        imageAlt="Senior enjoying comfort of home with support"
      />

      <ServiceInfoBlock
        heading="What to Expect from At-Home Assisted Living Support for Elders?"
        intro="When you arrange home assisted living support, here’s what you can expect:"
        bullets={expectBullets}
        image="/images/services/assisted/5.png"
        imageAlt="Care specialist creating a plan"
        tinted
      />

      <WhyChooseUs
        heading={
          <>
            Why Choose Elderly Wellness for{" "}
            <span className="text-[color:var(--color-brand)]">
              Assisted Living Support Services?
            </span>
          </>
        }
        features={whyChooseFeatures}
      />

      <ArrangeSteps
        heading="How to Arrange Home Assisted Living Support Services for Elders?"
        intro="Looking for trustworthy, compassionate care for your aging loved ones? Elderly Wellness is here to help. With just a few clicks, you can connect with highly trained professionals who are ready to provide the care your family deserves."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
