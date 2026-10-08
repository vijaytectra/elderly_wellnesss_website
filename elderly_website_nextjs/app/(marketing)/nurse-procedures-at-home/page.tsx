import type { Metadata } from "next";
import Image from "next/image";
import { ArrangeSteps, type ArrangeStep } from "@/components/sections/ArrangeSteps";
import { OurValues } from "@/components/sections/OurValues";
import { ServiceFAQ, type ServiceFAQItem } from "@/components/sections/ServiceFAQ";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
} from "@/lib/schema";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Container } from "@/components/Container";
import { getPrimaryServiceByHref } from "@/data/primary-services";

const SERVICE = getPrimaryServiceByHref("/nurse-procedures-at-home/")!;

export const metadata: Metadata = buildMetadata({
  title: "Nurse Procedures at Home in Chennai",
  description:
    "Get professional and safe nurse procedures at home, including IM injections, catheter insertions, tube placements, and more with a 30% discount.",
  ogTitle: "Nurse Procedures at Home",
  ogDescription: SERVICE.body,
  path: "/nurse-procedures-at-home/",
  image: SERVICE.image,
});

import { NURSE_PROCEDURES } from "@/data/nurse-procedures";
import Link from "next/link";

const steps: readonly ArrangeStep[] = [
  {
    image: "/images/services/step1_download_app.png",
    title: "Step 1: Download the Elderly Wellness App",
    body: (
      <p>
        Start by downloading the Elderly Wellness app from your phone&rsquo;s
        app store. This app will be your gateway to accessing professional care.
      </p>
    ),
  },
  {
    image: "/images/services/step2_signup_account.png",
    title: "Step 2: Sign Up and Select Nurse Procedures",
    body: (
      <p>
        Once installed, create an account and select the specific nurse procedure
        you need from our comprehensive list of services.
      </p>
    ),
  },
  {
    image: "/images/services/step4_connect_specialist.png",
    title: "Step 3: Connect with a Specialist",
    body: (
      <p>
        An Elderly Wellness specialist will contact you to discuss your specific
        needs, ensuring the right nurse is assigned for the procedure.
      </p>
    ),
  },
  {
    image: "/images/services/step9_receive_care.png",
    title: "Step 4: Receive Care at Home",
    body: (
      <p>
        Your assigned certified nurse will visit your home at the scheduled time
        to safely perform the required medical procedure.
      </p>
    ),
  },
];

const faqs: readonly ServiceFAQItem[] = [
  {
    q: "Are the nurses certified and trained?",
    a: "Yes, all our nurses are fully certified, licensed, and trained to perform these specific medical procedures safely at home.",
  },
  {
    q: "Are consumables included in the price?",
    a: "No, consumables required for the procedure will be charged additionally as per MRP, unless stated otherwise.",
  },
  {
    q: "How do I book a procedure that says 'Enquire Now'?",
    a: "You can book these procedures by contacting us directly through the app or by calling our support team for a personalized quote.",
  },
  {
    q: "Is there a discount available?",
    a: "Yes, we are currently offering a special 30% discount on select nurse procedures, as reflected in our pricing.",
  },
];

const PATH = "/nurse-procedures-at-home/";

const pageSchemas = [
  serviceSchema({
    name: SERVICE.title,
    serviceType: "Nurse Procedures",
    description: SERVICE.body,
    path: PATH,
  }),
  faqPageSchema(PATH, faqs),
  breadcrumbSchema([{ name: SERVICE.title, path: PATH }]),
];

export default function NurseProceduresPage() {
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
        headingAccent="Professional Care at Your Doorstep"
        subheading="Safe, Sterile, and Convenient"
        paragraphs={[SERVICE.body]}
      />

      <section className="py-16 bg-brand-light/20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Procedures & Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of professional nursing procedures at home. Take advantage of our special 30% discount on select services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NURSE_PROCEDURES.map((proc, index) => (
              <Link 
                href={`/nurse-procedures-at-home/${proc.slug}/`}
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                <div className="relative w-full h-104 bg-gray-100 border-b border-gray-100 overflow-hidden">
                  <Image 
                    src={proc.image} 
                    alt={proc.title} 
                    fill 
                    className="object-cover object-[center_30%] group-hover:scale-104 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
                      {proc.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {proc.desc}
                    </p>
                  </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  {proc.price ? (
                    <div>
                      <div className="text-2xl font-bold text-brand-primary">
                        ₹{proc.price.toLocaleString("en-IN")}
                      </div>
                      <div className="text-sm text-gray-400 line-through">
                        ₹{proc.oldPrice?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-brand-primary">
                      Enquire Now
                    </div>
                  )}
                  <span
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 rounded-full transition-colors"
                  >
                    View Details
                  </span>
                </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ArrangeSteps
        heading="How to Arrange Nurse Procedures at Home?"
        intro="Booking a professional nurse procedure at home is simple and convenient. Follow these quick steps to get started."
        steps={steps}
      />

      <OurValues />

      <ServiceFAQ items={faqs} />

      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
