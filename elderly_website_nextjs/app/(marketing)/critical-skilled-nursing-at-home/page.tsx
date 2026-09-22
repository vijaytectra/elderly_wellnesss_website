import type { Metadata } from "next";
import { ArrangeSteps, type ArrangeStep } from "@/components/sections/ArrangeSteps";
import { OurValues } from "@/components/sections/OurValues";
import { ServiceFAQ, type ServiceFAQItem } from "@/components/sections/ServiceFAQ";
import { ServiceHero } from "@/components/sections/ServiceHero";
import {
  ServiceInfoBlock,
  type ServiceInfoBullet,
} from "@/components/sections/ServiceInfoBlock";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
} from "@/lib/schema";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import {
  getPrimaryServiceByHref,
  toServiceInfoBullets,
} from "@/data/primary-services";

const SERVICE = getPrimaryServiceByHref("/critical-skilled-nursing-at-home/")!;

export const metadata: Metadata = buildMetadata({
  title: "Critical & Skilled Nursing Support at Home in Chennai",
  description:
    "Skilled home nursing in Chennai — vitals monitoring, injections, IV care, wound dressing, catheter and feeding-tube care for complex needs.",
  ogTitle: "Critical & Skilled Nursing at Home",
  ogDescription: SERVICE.body,
  path: "/critical-skilled-nursing-at-home/",
  image: SERVICE.image,
});

const whatWeProvideBullets: readonly ServiceInfoBullet[] = toServiceInfoBullets(
  SERVICE.bullets,
);

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
          <li>Post-Operative &amp; Discharge Care at Home</li>
          <li>Elderly Care at Home</li>
          <li>Critical &amp; Skilled Nursing Support at Home</li>
          <li>Personalised Physiotherapy &amp; Rehabilitation at Home</li>
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
    q: "What is critical and skilled nursing at home?",
    a: "It is professional clinical nursing for complex needs — vitals monitoring, injections, IV care, wound dressing, catheter or feeding-tube care, and support for stroke, paralysis or bedridden patients.",
  },
  {
    q: "How often is skilled nursing needed?",
    a: "Frequency depends on the medical condition. Some patients need daily nursing; others need visits a few times a week. A personalised plan is created after assessment.",
  },
  {
    q: "Is home skilled nursing covered by insurance?",
    a: "Coverage depends on the policy. Check with your insurer to confirm whether home nursing support is included.",
  },
  {
    q: "How qualified are your nurses?",
    a: "Our nurses are licensed professionals experienced in home-based clinical care, matched carefully to each patient’s medical needs.",
  },
  {
    q: "What happens after I select critical and skilled nursing?",
    a: "An Elderly Wellness specialist will contact you, review clinical needs, and assign the most suitable nurse.",
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

const PATH = "/critical-skilled-nursing-at-home/";

const pageSchemas = [
  serviceSchema({
    name: SERVICE.title,
    serviceType: "Critical and skilled nursing",
    description: SERVICE.body,
    path: PATH,
  }),
  faqPageSchema(PATH, faqs),
  breadcrumbSchema([{ name: SERVICE.title, path: PATH }]),
];

export default function NursingPage() {
  return (
    <div>
      <JsonLd id="page-schema" data={pageSchemas} />
      <section className="pt-6 sm:pt-10">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: SERVICE.title },
            ]}
          />
        </Container>
      </section>
      <ServiceHero
        image={SERVICE.image}
        imageAlt={SERVICE.imageAlt}
        headingLead={SERVICE.title}
        headingAccent="Clinical Care Without the Hospital"
        subheading="Where Age Meets Professional Assistance"
        paragraphs={[SERVICE.body]}
      />

      <ServiceInfoBlock
        heading="What we provide"
        intro="Skilled nursing support for patients who need regular medical care and special attention at home."
        bullets={whatWeProvideBullets}
        image="/images/services/info/nursing-provide-indian.jpg"
        imageAlt="Indian nurse preparing medication for an elderly patient at home"
      />

      <ServiceInfoBlock
        heading="The Role of Critical & Skilled Nursing at Home"
        intro="A skilled nurse provides clinical care for patients with complex medical needs at home. They:"
        bullets={roleBullets}
        image="/images/services/info/nursing-role-indian.jpg"
        imageAlt="Indian nurse standing beside the bed explaining medication to an elderly patient"
        reversed
      />

      <ServiceInfoBlock
        heading="Why Choose Critical & Skilled Nursing at Home?"
        intro="Choosing skilled nursing at home provides these benefits:"
        bullets={whyHomeBullets}
        image="/images/services/info/why-home-care-indian.jpg"
        imageAlt="Elderly woman receiving compassionate care at home in India"
      />

      <ServiceInfoBlock
        heading="What to Expect from Critical & Skilled Nursing at Home?"
        intro="When you arrange skilled nursing at home, you can expect:"
        bullets={expectBullets}
        image="/images/services/info/nursing-expect-indian.jpg"
        imageAlt="Indian nurse checking vitals for an elderly woman at home"
        tinted
      />

      <ArrangeSteps
        heading="How to Arrange Critical & Skilled Nursing at Home?"
        intro="Looking for trustworthy, compassionate care for your aging loved ones? Elderly Wellness is here to help. With just a few clicks, you can connect with highly trained professionals who are ready to provide the care your family deserves."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
