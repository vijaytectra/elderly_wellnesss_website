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
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";

export const metadata: Metadata = buildMetadata({
  title: "Best Geriatric Care Services for Elders at Home – Elderly Wellness",
  description:
    "Offering professional home geriatric care for seniors. Elderly Wellness ensures your loved ones receive the best care at home. Contact us today at +919944890577.",
  path: "/geriatric-care-services-for-elders/",
});

const importanceBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Chronic Condition Management",
    body: "Monitoring and managing long-term health conditions like diabetes, arthritis, and heart disease.",
  },
  {
    title: "Cognitive Support",
    body: "Providing assistance to those experiencing dementia, Alzheimer’s, or other cognitive disorders.",
  },
  {
    title: "Medication Management",
    body: "Ensuring correct medication administration and preventing adverse drug interactions.",
  },
  {
    title: "Companionship",
    body: "Offering emotional support and companionship to prevent isolation and improve mental health.",
  },
];

const roleBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Assess health status",
    body: "Thoroughly assess physical, mental, and emotional health to create a tailored care plan.",
  },
  {
    title: "Develop care plans",
    body: "Create personalized care plans to address specific geriatric needs, from mobility support to emotional well-being.",
  },
  {
    title: "Monitor health",
    body: "Regularly track the health progress of seniors and adjust care plans accordingly.",
  },
  {
    title: "Provide hands-on care",
    body: "Assist with daily tasks, mobility, personal care, and offer emotional support.",
  },
];

const whyHomeBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Convenience",
    body: "Seniors receive comprehensive care without having to leave the comfort of their homes.",
  },
  {
    title: "Personalized Care",
    body: "One-on-one care designed to meet the unique needs of each elderly individual.",
  },
  {
    title: "Comfort",
    body: "Remaining in a familiar environment reduces stress and promotes a sense of security.",
  },
  {
    title: "Consistency",
    body: "Regular and ongoing care ensures that seniors receive continuous attention and support.",
  },
];

const expectBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Initial assessment",
    body: "A geriatric care specialist will evaluate your loved one’s physical, mental, and emotional health.",
  },
  {
    title: "Customized care plan",
    body: "Based on the assessment, a personalized care plan will be developed to address their specific needs.",
  },
  {
    title: "Ongoing support",
    body: "The specialist will provide daily care, assist with mobility, manage medications, and offer companionship.",
  },
  {
    title: "Regular monitoring",
    body: "Progress will be tracked, and adjustments will be made to the care plan as needed.",
  },
];

const whyChooseFeatures: readonly WhyChooseUsFeature[] = [
  {
    icon: "/images/services/physio-icons/simplified-discovery-process.png",
    title: "Simplified Discovery Process",
    body: "Finding the right geriatric care provider can be challenging. Our care specialists make it easy by assessing your loved one’s needs and matching them with the most suitable caregiver, saving you time and effort.",
  },
  {
    icon: "/images/services/physio-icons/affordable-transparent-care.png",
    title: "Affordable, Transparent Care",
    body: "We offer flexible, slab-based pricing, ensuring you receive top-quality care at an affordable price. Our transparent pricing system helps you choose the right service without any surprises.",
  },
  {
    icon: "/images/services/physio-icons/reliable-long-term-support.png",
    title: "Reliable, Long-term Support",
    body: "At Elderly Wellness, we ensure consistent, reliable care. Our caregivers are carefully vetted and trained at our Elderly Academy of Caretaking & Hospitality (EACH). In case of delays or no-shows, we guarantee a replacement caregiver within 2 hours, ensuring continuous care for your loved ones.",
  },
  {
    icon: "/images/services/physio-icons/quality-you-can-count-on.png",
    title: "Quality You Can Count On",
    body: "We only work with caregivers who are thoroughly screened, vetted, and trained to provide the highest quality care. All our caregivers are part of the Elderly Wellness family, trained at EACH. This ensures your loved ones receive the best possible care—whether they need help with daily tasks, medical care, or emotional support.",
  },
  {
    icon: "/images/services/physio-icons/longevity-of-care.png",
    title: "Longevity of Care",
    body: "At Elderly Wellness, we don’t just provide short-term solutions. We are committed to offering long-term care, ensuring ongoing support for your loved ones. Should any issues arise, we’re here to resolve them quickly and maintain continuity of care.",
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
          <li>Geriatric Care</li>
          <li>Nursing Care</li>
          <li>Physiotherapy</li>
          <li>Assisted Living Support</li>
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
    q: "What is geriatric care for elderly individuals?",
    a: "Geriatric care involves comprehensive medical and personal support for seniors, including managing chronic conditions, medication, and emotional well-being.",
  },
  {
    q: "How often should elderly people receive geriatric care?",
    a: "The frequency of care depends on individual needs. It could range from daily visits for those with complex health needs to weekly check-ins for those who require less frequent support.",
  },
  {
    q: "Is home geriatric care covered by insurance?",
    a: "Insurance coverage varies by plan. Check with your provider to determine if home geriatric care is covered under your policy.",
  },
  {
    q: "How qualified are your geriatric care specialists?",
    a: "Our geriatric care specialists are licensed professionals with extensive experience in elderly care, ensuring the highest level of care for your loved one.",
  },
  {
    q: "What happens after I sign up and select the geriatric care service I need?",
    a: "Once you sign up, an Elderly Wellness specialist will contact you to discuss your loved one’s needs and assign the most suitable caregiver.",
  },
  {
    q: "Can I book more than one session in a day?",
    a: "Yes, multiple sessions can be scheduled in a day. Confirm the availability during the call with our specialist.",
  },
  {
    q: "How do I pay for the service?",
    a: "Once the service provider is assigned, you’ll make a secure payment directly through the app, and the booking will be finalized.",
  },
  {
    q: "How can I change the contact information or address of the elderly person?",
    a: "You can easily update contact details and address in your account settings within the app.",
  },
  {
    q: "How do I track the status of my booking or service?",
    a: "Receive real-time notifications through the app, allowing you to track the progress of your loved one’s care.",
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

export default function GeriatricCarePage() {
  return (
    <div>
      <section className="pt-6 sm:pt-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Geriatric Care Services For Elders" },
            ]}
          />
        </Container>
      </section>
      <ServiceHero
        image="/images/services/geriatric/1.png"
        imageAlt="Geriatric care specialist supporting an elderly patient"
        headingLead="Geriatric Care Services for Elders"
        headingAccent="Compassionate Support for Senior Well-being"
        subheading="Where Age Meets Expert Care"
        paragraphs={[
          <>
            Elderly Wellness connects families with professional caregivers,
            offering geriatric care in the comfort of your home. Our home-based
            geriatric care services ensure that elderly individuals receive the
            right support to live a safe, independent, and dignified life.
          </>,
          <>
            Our geriatric services are designed to improve the health, comfort,
            and independence of seniors, providing them with the assistance
            they need to thrive in their own homes. We focus on elderly
            wellness, ensuring both families and seniors enjoy peace of mind.
          </>,
        ]}
      />

      <ServiceInfoBlock
        heading="Why is Geriatric Care Important for Elders?"
        intro="As seniors age, their physical, emotional, and mental health needs become more complex. Geriatric care plays a vital role in addressing these needs and ensuring the elderly receive appropriate care to maintain their quality of life. Here’s how geriatric care helps elders:"
        bullets={importanceBullets}
        image="/images/services/geriatric/2.png"
        imageAlt="Geriatric specialist reviewing a care plan"
      />

      <ServiceInfoBlock
        heading="The Role of a Geriatric Care Specialist"
        intro="A geriatric care specialist plays a crucial role in ensuring that seniors receive the care they need. They:"
        bullets={roleBullets}
        image="/images/services/geriatric/3.png"
        imageAlt="Geriatric care specialist with an elderly patient"
        reversed
      />

      <ServiceInfoBlock
        heading="Why Choose Home Geriatric Care for Elders?"
        intro="Opting for home geriatric care offers numerous benefits:"
        bullets={whyHomeBullets}
        image="/images/services/geriatric/4.png"
        imageAlt="Elderly patient at home receiving geriatric care"
      />

      <ServiceInfoBlock
        heading="What to Expect from At-Home Geriatric Care Services for Elders?"
        intro="When you arrange home geriatric care, here’s what you can expect:"
        bullets={expectBullets}
        image="/images/services/geriatric/5.png"
        imageAlt="Geriatric care team preparing a personalized plan"
        tinted
      />

      <WhyChooseUs
        heading={
          <>
            Why Choose Elderly Wellness for{" "}
            <span className="text-[color:var(--color-brand)]">
              Geriatric Care Services?
            </span>
          </>
        }
        features={whyChooseFeatures}
      />

      <ArrangeSteps
        heading="How to Arrange Home Geriatric Care Services for Elders?"
        intro="Looking for trustworthy, compassionate care for your aging loved ones? Elderly Wellness is here to help. With just a few clicks, you can connect with highly trained professionals who are ready to provide the care your family deserves."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
