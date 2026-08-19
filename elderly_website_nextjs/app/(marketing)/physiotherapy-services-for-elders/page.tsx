import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Best Physiotherapy Services for Elders at Home - Elderly Wellness",
  description:
    "Contact us today +919944890577. Offering professional home physiotherapy for elders, Elderly Wellness improves mobility and quality of life for seniors.",
  path: "/physiotherapy-services-for-elders/",
});

const importanceBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Pain Relief",
    body: "Targeting conditions like arthritis, muscle stiffness, and joint problems.",
  },
  {
    title: "Mobility Improvement",
    body: "Increasing flexibility and reducing the risk of falls.",
  },
  {
    title: "Muscle Strengthening",
    body: "Supporting weak muscles and enhancing balance.",
  },
  {
    title: "Post-Surgery Recovery",
    body: "Facilitating faster recovery from surgeries like hip replacements or joint surgeries.",
  },
];

const roleBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Assess physical health",
    body: "A thorough assessment of the patient’s needs and conditions.",
  },
  {
    title: "Develop personalized plans",
    body: "Creating tailored exercise and rehabilitation plans.",
  },
  {
    title: "Provide hands-on care",
    body: "Guiding and assisting through exercises and stretches.",
  },
  {
    title: "Monitor progress",
    body: "Ensuring therapy is progressing and making necessary adjustments.",
  },
];

const whyHomeBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Convenience",
    body: "No need to travel, making it ideal for seniors with limited mobility.",
  },
  {
    title: "Personalized Care",
    body: "One-on-one physiotherapy sessions tailored to the individual's needs.",
  },
  {
    title: "Comfort",
    body: "The therapy is conducted in a familiar and comfortable home environment.",
  },
  {
    title: "Consistency",
    body: "Regular and continuous physiotherapy ensures steady progress and better results.",
  },
];

const expectBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Initial assessment",
    body: "The physiotherapist will evaluate your loved one’s physical health.",
  },
  {
    title: "Customized treatment plan",
    body: "A plan will be created to address specific health issues.",
  },
  {
    title: "Therapy sessions",
    body: "Focus on improving strength, mobility, and reducing pain.",
  },
  {
    title: "Regular follow-ups",
    body: "Progress will be monitored to ensure effective treatment.",
  },
];

const whyChooseFeatures: readonly WhyChooseUsFeature[] = [
  {
    icon: "/images/services/physio-icons/simplified-discovery-process.png",
    title: "Simplified Discovery Process",
    body: "Finding the right care provider can be overwhelming, but our care specialists make it easy. They assess your loved one’s needs and match them with the most suitable caregiver, saving you time and effort.",
  },
  {
    icon: "/images/services/physio-icons/affordable-transparent-care.png",
    title: "Affordable, Transparent Care",
    body: "We offer flexible, slab-based pricing, ensuring top-quality care that fits within your budget. Our transparent pricing system helps you choose the right service without any surprises.",
  },
  {
    icon: "/images/services/physio-icons/reliable-long-term-support.png",
    title: "Reliable, Long-term Support",
    body: "At Elderly Wellness, we ensure consistent, reliable care. Our caregivers are carefully vetted and trained at our Elderly Academy of Caretaking & Hospitality (EACH). In case of delays or no-shows, we guarantee a replacement caregiver within 2 hours, ensuring continuous care for your loved ones.",
  },
  {
    icon: "/images/services/physio-icons/quality-you-can-count-on.png",
    title: "Quality You Can Count On",
    body: "At Elderly Wellness, we only work with caregivers who are thoroughly screened, vetted, and trained to provide the highest quality care. All our caregivers are part of the Elderly Wellness family and are trained at our Elderly Academy of Caretaking & Hospitality (EACH). This academy is dedicated to elevating their skills and expertise, ensuring your loved ones receive the best care possible—whether they need physical assistance, medical care, or emotional support.",
  },
  {
    icon: "/images/services/physio-icons/longevity-of-care.png",
    title: "Longevity of Care",
    body: "At Elderly Wellness, we don’t just offer short-term solutions. We’re committed to providing long-term support for your loved ones, ensuring consistent and dependable care for as long as necessary. Should any issues arise, we’re here to quickly resolve them and maintain continuity of care.",
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
          <li>Nursing Care</li>
          <li>Physiotherapy</li>
          <li>Geriatric Care</li>
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
        <p>This way, you&rsquo;ll know exactly who will be providing care for your loved one.</p>
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
    q: "What is physiotherapy for elderly individuals?",
    a: "Physiotherapy helps seniors maintain and improve mobility, strength, and flexibility. It is an essential part of elderly care to prevent physical decline.",
  },
  {
    q: "How often should elderly people receive physiotherapy?",
    a: "Frequency varies, but typically, 1-2 sessions per week are ideal to see improvements in physical health.",
  },
  {
    q: "Is home physiotherapy covered by insurance?",
    a: "Coverage depends on the insurance plan. We recommend checking with your insurance provider to determine eligibility.",
  },
  {
    q: "How qualified are your physiotherapists?",
    a: "All our physiotherapists are licensed professionals with extensive experience in elderly care.",
  },
  {
    q: "What happens after I sign up and select the physiotherapy service I need?",
    a: "Once you sign up and choose the service you need, one of our Elderly Wellness specialists will contact you to discuss your requirements. They will assign the most suitable physiotherapist based on your elderly loved one’s specific needs and preferences.",
  },
  {
    q: "Can I book more than one session in a day?",
    a: "Yes, you can schedule multiple sessions on the same day. During the call with our specialist, you can check the availability of your service provider and arrange additional sessions if necessary.",
  },
  {
    q: "How do I pay for the service?",
    a: "After the service provider is assigned, you will receive their details. You can then make a secure payment directly through the app. Once the payment is confirmed, your booking will be finalized, and the service will be scheduled.",
  },
  {
    q: "How can I change the contact information or address of the elderly person?",
    a: "You can easily update the contact details and address of the elderly person in your account settings within the app. Ensure these details are correct before finalizing any service bookings.",
  },
  {
    q: "How do I track the status of my booking or service?",
    a: "Once the service provider is assigned, you will receive notifications via the app regarding their arrival time and status updates. You can track the real-time progress of the session through the app.",
  },
  {
    q: "How will I know which service provider is assigned to my booking?",
    a: "After our specialist contacts you, they will assign a provider based on the elderly person's needs. You will receive detailed information about the physiotherapist, including their profile, qualifications, and experience through the app.",
  },
  {
    q: "What if the service provider does not arrive on time?",
    a: "If there is any delay, you will be notified through the app. If there are significant delays, please reach out to our customer support team, and we will assist in resolving the issue as quickly as possible.",
  },
  {
    q: "Can I request the same physiotherapist for future sessions?",
    a: "Yes, you can request the same physiotherapist for future sessions. Simply note their profile and mention it when booking. If they are available, they can be scheduled for additional sessions.",
  },
  {
    q: "Is my payment information safe?",
    a: "Absolutely! All payment transactions are processed through secure encryption methods. Your payment and personal details are fully protected and stored securely in accordance with the highest standards of privacy and security.",
  },
];

export default function PhysiotherapyPage() {
  return (
    <div>
      <ServiceHero
        image="/images/services/banner-left.png"
        imageAlt="Physiotherapist assisting an elderly patient at home"
        headingLead="Physiotherapy Services for Elders:"
        headingAccent="Enhance Mobility & Wellness"
        subheading="Where Age Meets Assistance"
        paragraphs={[
          <>
            Elderly Wellness connects families with professional caregivers,
            offering physiotherapy services in the comfort of your home. Our
            home-based physiotherapy services for seniors help elderly
            individuals lead a safe, independent, and dignified life. Our
            services are designed to improve the health and mobility of
            seniors, providing them with the support they need to thrive in
            their own homes. We focus on{" "}
            <Link
              href="/elderly-wellness/"
              className="text-[color:var(--color-brand)] underline"
            >
              elderly wellness,
            </Link>{" "}
            ensuring both families and seniors enjoy peace of mind.
          </>,
        ]}
      />

      <ServiceInfoBlock
        heading="Why are Physiotherapy Services Important for Elders?"
        intro="As seniors age, maintaining their physical health is crucial. Physiotherapy plays a vital role in reducing pain, improving mobility, and enhancing overall quality of life. Here’s how physiotherapy helps elders:"
        bullets={importanceBullets}
        image="/images/services/1.png"
        imageAlt="Elderly patient receiving physiotherapy"
      />

      <ServiceInfoBlock
        heading="The Role of a Physiotherapist in Elder Care"
        intro="A qualified physiotherapist plays a crucial role in assessing and treating seniors with physical limitations. They:"
        bullets={roleBullets}
        image="/images/services/2.png"
        imageAlt="Physiotherapist evaluating an elderly patient"
        reversed
      />

      <ServiceInfoBlock
        heading="Why Choose Home Physiotherapy for Elders?"
        intro="Opting for home physiotherapy services is a convenient and effective solution for elderly individuals. Here are the benefits:"
        bullets={whyHomeBullets}
        image="/images/services/3.png"
        imageAlt="Home physiotherapy session with senior"
      />

      <ServiceInfoBlock
        heading="What to Expect from At-Home Physiotherapy for Elders?"
        intro="When scheduling home physiotherapy, here's what you can expect:"
        bullets={expectBullets}
        image="/images/services/4.png"
        imageAlt="Physiotherapist demonstrating exercises to a senior"
        tinted
      />

      <WhyChooseUs
        heading={
          <>
            Why Choose Elderly Wellness for{" "}
            <span className="text-[color:var(--color-brand)]">
              Physiotherapy Services?
            </span>
          </>
        }
        features={whyChooseFeatures}
      />

      <ArrangeSteps
        heading="How to Arrange Home Physiotherapy Services for Elders?"
        intro="Looking for trustworthy, compassionate care for your aging loved ones? Elderly Wellness is here to help. With just a few clicks, you can connect with highly trained professionals who are ready to provide the care your family deserves."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      {/* Anchor for the site-wide Download CTA */}
      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
