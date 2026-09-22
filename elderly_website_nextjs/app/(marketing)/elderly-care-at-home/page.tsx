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

const SERVICE = getPrimaryServiceByHref(
  "/elderly-care-at-home/",
)!;

export const metadata: Metadata = buildMetadata({
  title: "Elderly Care at Home in Chennai",
  description:
    "Compassionate daily elderly care at home in Chennai — bathing, feeding, mobility support, medicine reminders and companionship.",
  ogTitle: "Elderly Care at Home",
  ogDescription: SERVICE.body,
  path: "/elderly-care-at-home/",
  image: SERVICE.image,
});

const whatWeProvideBullets: readonly ServiceInfoBullet[] = toServiceInfoBullets(
  SERVICE.bullets,
);

const roleBullets: readonly ServiceInfoBullet[] = [
  {
    title: "Assist with daily living",
    body: "Help with bathing, grooming, dressing, feeding and other everyday activities at home.",
  },
  {
    title: "Provide companionship",
    body: "Offer warm company and conversation so seniors feel supported and less isolated.",
  },
  {
    title: "Support mobility and safety",
    body: "Help with walking, transfers and a safer home routine to reduce fall risk.",
  },
  {
    title: "Remind medicines and routines",
    body: "Support medicine reminders and daily schedules so care stays consistent and reliable.",
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
    q: "What is elderly care at home?",
    a: "Elderly care at home is compassionate daily support — bathing, grooming, feeding, mobility help, medicine reminders and companionship in the senior’s own home.",
  },
  {
    q: "How often should seniors receive elderly care at home?",
    a: "It depends on need. Some families book a few hours a day; others need longer daily support. We help match the schedule to your loved one’s routine.",
  },
  {
    q: "Is elderly care at home covered by insurance?",
    a: "Coverage varies by plan. Contact your insurer to check whether home-based elder care support is included.",
  },
  {
    q: "How qualified are your elderly care providers?",
    a: "Our caregivers are screened, trained and experienced in senior daily living support, matched carefully to each family’s needs.",
  },
  {
    q: "What happens after I select elderly care at home?",
    a: "An Elderly Wellness specialist will contact you, understand daily living needs, and assign the most suitable caregiver.",
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

const PATH = "/elderly-care-at-home/";

const pageSchemas = [
  serviceSchema({
    name: SERVICE.title,
    serviceType: "Elderly care at home",
    description: SERVICE.body,
    path: PATH,
  }),
  faqPageSchema(PATH, faqs),
  breadcrumbSchema([{ name: SERVICE.title, path: PATH }]),
];

export default function ElderlyCareAtHomePage() {
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
        headingAccent="Compassionate Care for Daily Living"
        subheading="Where Age Meets Comprehensive Assistance"
        paragraphs={[SERVICE.body]}
      />

      <ServiceInfoBlock
        heading="What we provide"
        intro="Day-to-day support that helps seniors stay safe, active and comfortable at home."
        bullets={whatWeProvideBullets}
        image="/images/services/info/elderly-provide-indian.jpg"
        imageAlt="Indian caregiver helping an elderly woman with a meal at home"
      />

      <ServiceInfoBlock
        heading="The Role of Elderly Care at Home"
        intro="An elderly care caregiver plays an important role in helping seniors stay safe, comfortable and engaged at home. They:"
        bullets={roleBullets}
        image="/images/services/info/elderly-role-indian.jpg"
        imageAlt="Indian caregiver helping an elderly man walk with a walker at home"
        reversed
      />

      <ServiceInfoBlock
        heading="Why Choose Elderly Care at Home?"
        intro="Choosing elderly care at home offers these advantages:"
        bullets={whyHomeBullets}
        image="/images/services/info/why-home-care-indian.jpg"
        imageAlt="Senior enjoying comfort of home with caregiver support in India"
      />

      <ServiceInfoBlock
        heading="What to Expect from Elderly Care at Home?"
        intro="When you arrange elderly care at home, here’s what you can expect:"
        bullets={expectBullets}
        image="/images/services/info/care-plan-expect-indian.jpg"
        imageAlt="Care specialist discussing a home care plan with family"
        tinted
      />

      <ArrangeSteps
        heading="How to Arrange Elderly Care at Home?"
        intro="Looking for trustworthy, compassionate care for your aging loved ones? Elderly Wellness is here to help. With just a few clicks, you can connect with highly trained professionals who are ready to provide the care your family deserves."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
