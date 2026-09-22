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

const SERVICE = getPrimaryServiceByHref("/post-operative-discharge-care-at-home/")!;

export const metadata: Metadata = buildMetadata({
  title: "Post-Operative & Discharge Care at Home in Chennai",
  description:
    "Professional post-surgery and hospital discharge care at home in Chennai — wound care, medication support, vitals monitoring and recovery assistance.",
  ogTitle: "Post-Operative Care at Home",
  ogDescription: SERVICE.body,
  path: "/post-operative-discharge-care-at-home/",
  image: SERVICE.image,
});

const whatWeProvideBullets: readonly ServiceInfoBullet[] = toServiceInfoBullets(
  SERVICE.bullets,
);

const roleBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Support recovery at home",
    body: "Help patients settle after surgery or hospital discharge with wound care, hygiene and safe daily routines.",
  },
  {
    title: "Manage medicines and vitals",
    body: "Support prescribed medicines, injections and regular checks of BP, temperature, pulse and oxygen.",
  },
  {
    title: "Prevent complications",
    body: "Watch for infection, pain, mobility risks and other post-discharge warning signs, and escalate when needed.",
  },
  {
    title: "Guide families",
    body: "Explain the care plan clearly so family members know what to expect during recovery at home.",
  },
];

const whyHomeBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Safer recovery",
    body: "Continue healing at home with professional support instead of prolonged hospital stays.",
  },
  {
    title: "Personalised attention",
    body: "One-on-one care focused on the patient’s surgery, discharge notes and recovery goals.",
  },
  {
    title: "Familiar surroundings",
    body: "Recovering at home reduces stress and helps patients feel more comfortable and secure.",
  },
  {
    title: "Family involvement",
    body: "Loved ones stay close to the care process and receive clear updates along the way.",
  },
];

const expectBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Initial assessment",
    body: "A care professional reviews discharge notes, wound status, medicines and home safety needs.",
  },
  {
    title: "Customised recovery plan",
    body: "A clear plan covers wound care, vitals, hygiene, mobility support and medicine reminders.",
  },
  {
    title: "Hands-on recovery support",
    body: "Caregivers or nurses assist with daily recovery tasks so the patient can heal comfortably at home.",
  },
  {
    title: "Progress check-ins",
    body: "Recovery is monitored and the plan is adjusted if symptoms, mobility or care needs change.",
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
    q: "What is post-operative and discharge care at home?",
    a: "It is professional support after surgery or hospital discharge — including wound care, medicine support, vitals monitoring, hygiene help and safe mobility assistance at home.",
  },
  {
    q: "How often is post-operative care needed?",
    a: "Frequency depends on the procedure and recovery plan. Some patients need daily visits initially; others need shorter support as they regain strength.",
  },
  {
    q: "Is home post-operative care covered by insurance?",
    a: "Coverage varies by plan. Check with your insurer to confirm whether home recovery support is included under your policy.",
  },
  {
    q: "Who provides the care?",
    a: "Trained nurses and caregivers experienced in post-surgery and discharge support, matched to your loved one’s recovery needs.",
  },
  {
    q: "What happens after I select post-operative care?",
    a: "An Elderly Wellness specialist will contact you, review discharge needs, and assign the most suitable nurse or caregiver.",
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

const PATH = "/post-operative-discharge-care-at-home/";

const pageSchemas = [
  serviceSchema({
    name: SERVICE.title,
    serviceType: "Post-operative and discharge care",
    description: SERVICE.body,
    path: PATH,
  }),
  faqPageSchema(PATH, faqs),
  breadcrumbSchema([{ name: SERVICE.title, path: PATH }]),
];

export default function PostOperativeCarePage() {
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
        headingAccent="Safe Recovery in the Comfort of Home"
        subheading="Where Age Meets Expert Care"
        paragraphs={[SERVICE.body]}
      />

      <ServiceInfoBlock
        heading="What we provide"
        intro="Focused post-operative and discharge support, delivered at home by trained care professionals."
        bullets={whatWeProvideBullets}
        image="/images/services/info/postop-provide-indian.jpg"
        imageAlt="Indian nurse providing wound dressing care for an elderly patient at home"
      />

      <ServiceInfoBlock
        heading="The Role of Post-Operative Care at Home"
        intro="After surgery or hospital discharge, trained care professionals help patients recover safely at home. They:"
        bullets={roleBullets}
        image="/images/services/info/postop-role-indian.jpg"
        imageAlt="Indian nurse providing wound care for an elderly patient at home"
        reversed
      />

      <ServiceInfoBlock
        heading="Why Choose Post-Operative Care at Home?"
        intro="Choosing recovery support at home offers these benefits:"
        bullets={whyHomeBullets}
        image="/images/services/info/why-home-care-indian.jpg"
        imageAlt="Senior receiving caring support at home in India"
      />

      <ServiceInfoBlock
        heading="What to Expect from Post-Operative & Discharge Care at Home?"
        intro="When you arrange post-operative care at home, here’s what you can expect:"
        bullets={expectBullets}
        image="/images/services/info/care-plan-expect-indian.jpg"
        imageAlt="Indian nurse reviewing a care plan with family at home"
        tinted
      />

      <ArrangeSteps
        heading="How to Arrange Post-Operative & Discharge Care at Home?"
        intro="Looking for trustworthy, compassionate care for your aging loved ones? Elderly Wellness is here to help. With just a few clicks, you can connect with highly trained professionals who are ready to provide the care your family deserves."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
