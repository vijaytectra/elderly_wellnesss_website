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
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";

export const metadata: Metadata = buildMetadata({
  title: "Best Nursing Services for Elders at Home - Elderly Wellness",
  description:
    "Contact us today +919944890577. Offering professional home nursing for elders, Elderly Wellness improves mobility and quality of life for seniors.",
  path: "/nursing-services-for-elders/",
});

const importanceBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Chronic Condition Management",
    body: "Monitoring and managing health conditions like diabetes, hypertension, and heart disease.",
  },
  {
    title: "Medication Management",
    body: "Administering and organizing medications to ensure correct dosages.",
  },
  {
    title: "Post-Surgery Care",
    body: "Assisting with recovery after surgery, including wound care and mobility support.",
  },
  {
    title: "Emotional Support",
    body: "Offering companionship and emotional reassurance to prevent isolation.",
  },
];

const roleBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Assess health conditions",
    body: "Thoroughly assess the elderly person’s health and medical history.",
  },
  {
    title: "Develop care plans",
    body: "Create personalized nursing plans tailored to meet specific health needs.",
  },
  {
    title: "Provide medical care",
    body: "Administer medications, handle medical equipment, and support with daily activities.",
  },
  {
    title: "Monitor progress",
    body: "Ensure care plans are followed, making adjustments as necessary to improve health outcomes.",
  },
];

const whyHomeBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Convenience",
    body: "Seniors receive care at home, avoiding the stress of hospital visits.",
  },
  {
    title: "Personalized Care",
    body: "One-on-one care tailored to your loved one’s specific health needs.",
  },
  {
    title: "Comfort",
    body: "Familiar home environment reduces anxiety and promotes healing.",
  },
  {
    title: "Consistency",
    body: "Continuity of care ensures your loved one’s health and well-being are always monitored.",
  },
];

const expectBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Initial assessment",
    body: "The nurse will evaluate your loved one’s health status and needs.",
  },
  {
    title: "Personalized care plan",
    body: "A plan will be created to address their specific medical requirements.",
  },
  {
    title: "Care sessions",
    body: "Nurses will assist with medication, wound care, and other medical tasks.",
  },
  {
    title: "Regular follow-ups",
    body: "Health status will be monitored, and updates provided to family members.",
  },
];

const whyChooseFeatures: readonly WhyChooseUsFeature[] = [
  {
    icon: "/images/services/physio-icons/simplified-discovery-process.png",
    title: "Simplified Discovery Process",
    body: "Finding the right care provider can be overwhelming, but our specialists make it easy. They assess your loved one’s needs and match them with the most suitable caregiver, saving you time and effort.",
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
    body: "We don’t just offer short-term solutions. We’re committed to providing long-term support, ensuring consistent and dependable care for as long as necessary. Should any issues arise, we’re here to quickly resolve them and maintain continuity of care.",
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
          <li>Geriatric Care</li>
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
    q: "What is nursing care for elderly individuals?",
    a: "Nursing care for seniors involves providing medical support, administering medications, assisting with mobility, and offering emotional support to ensure elderly individuals remain comfortable and healthy in their own homes.",
  },
  {
    q: "How often should elderly people receive nursing care?",
    a: "The frequency of nursing care varies based on the individual's health condition. Some may require daily visits, while others might need care a few times a week. A personalized care plan will be created based on specific needs.",
  },
  {
    q: "Is home nursing care covered by insurance?",
    a: "Insurance coverage for home nursing services depends on the individual’s policy. It’s recommended to check with your insurance provider to confirm whether home nursing care is covered under your plan.",
  },
  {
    q: "How qualified are your nurses?",
    a: "All our nurses are licensed professionals with extensive experience in elderly care. They are trained to provide the highest quality care and are regularly updated on best practices in elderly wellness.",
  },
  {
    q: "What happens after I sign up and select the nursing care service I need?",
    a: "Once you sign up and select the nursing care service, an Elderly Wellness specialist will contact you. They will discuss your loved one’s needs and assign the most suitable nurse based on their specific requirements and preferences.",
  },
  {
    q: "Can I book more than one session in a day?",
    a: "Yes, you can book multiple sessions on the same day. You can confirm the availability of the service provider during your call with our specialist and schedule additional sessions if necessary.",
  },
  {
    q: "How do I pay for the service?",
    a: "After the nurse is assigned, you will receive their details. You can then make a secure payment directly through the Elderly Wellness app. The booking will be confirmed once the payment is processed.",
  },
  {
    q: "How can I change the contact information or address of the elderly person?",
    a: "You can easily update the contact details and address of the elderly person in your account settings within the app. Make sure the details are up-to-date before finalizing any service bookings.",
  },
  {
    q: "How do I track the status of my booking or service?",
    a: "Once the service provider is assigned, you will receive notifications via the app regarding their arrival time and status updates. You can track the real-time progress of the session through the app.",
  },
  {
    q: "What if the service provider does not arrive on time?",
    a: "If there is any delay, you will be notified through the app. In case of significant delays, please reach out to our customer support team, and we will assist in resolving the issue as quickly as possible.",
  },
  {
    q: "Can I request the same nurse for future sessions?",
    a: "Yes, you can request the same nurse for future sessions. Simply note their profile and mention it when booking. If the nurse is available, they can be scheduled for additional sessions.",
  },
  {
    q: "Is my payment information safe?",
    a: "Yes, all payment transactions are processed securely using encrypted methods. Your payment and personal details are fully protected and stored securely, ensuring complete confidentiality.",
  },
];

export default function NursingPage() {
  return (
    <div>
      <section className="pt-6 sm:pt-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Nursing Services For Elders" },
            ]}
          />
        </Container>
      </section>
      <ServiceHero
        image="/images/services/nursing/1.png"
        imageAlt="Nurse caring for an elderly patient at home"
        headingLead="Nursing Services for Elders -"
        headingAccent="Enhance Mobility & Wellness"
        subheading="Where Age Meets Professional Assistance"
        paragraphs={[
          <>
            Elderly Wellness connects families with professional caregivers,
            offering Nnursing services in the comfort of your home. Our
            home-based nursing services for seniors help elderly individuals
            lead a safe, independent, and dignified life.
          </>,
          <>
            Our services are designed to improve the health and mobility of
            seniors, providing them with the support they need to thrive in
            their own homes. We focus on{" "}
            <Link
              href="/elderly-wellness/"
              className="text-[color:var(--color-brand)] underline"
            >
              elderly wellness
            </Link>
            , ensuring both families and seniors enjoy peace of mind.
          </>,
        ]}
      />

      <ServiceInfoBlock
        heading="Why are Nursing Services Important for Elders?"
        intro="As seniors age, their healthcare needs become more complex. Nursing care plays a critical role in managing chronic conditions, providing emotional support, and ensuring that seniors remain comfortable at home. Here’s how nursing services benefit elders:"
        bullets={importanceBullets}
        image="/images/services/nursing/2.png"
        imageAlt="Nurse taking notes with an elderly patient"
      />

      <ServiceInfoBlock
        heading="The Role of a Nurse in Elder Care"
        intro="A qualified nurse is essential in providing comprehensive care for seniors with medical needs. They:"
        bullets={roleBullets}
        image="/images/services/nursing/3.png"
        imageAlt="Nurse assisting an elderly patient with medication"
        reversed
      />

      <ServiceInfoBlock
        heading="Why Choose Home Nursing Services for Elders?"
        intro="Opting for home nursing services provides the following benefits:"
        bullets={whyHomeBullets}
        image="/images/services/nursing/4.png"
        imageAlt="Nurse and senior in a home setting"
      />

      <ServiceInfoBlock
        heading="What to Expect from At-Home Nursing Services for Elders?"
        intro="When scheduling home nursing services, you can expect:"
        bullets={expectBullets}
        image="/images/services/nursing/5.png"
        imageAlt="Nurse assessing an elderly patient at home"
        tinted
      />

      <WhyChooseUs
        heading={
          <>
            Why Choose Elderly Wellness for{" "}
            <span className="text-[color:var(--color-brand)]">
              Nursing Services?
            </span>
          </>
        }
        features={whyChooseFeatures}
      />

      <ArrangeSteps
        heading="How to Arrange Home Nursing Services for Elders?"
        intro="Looking for trustworthy, compassionate care for your aging loved ones? Elderly Wellness is here to help. With just a few clicks, you can connect with highly trained professionals who are ready to provide the care your family deserves."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
