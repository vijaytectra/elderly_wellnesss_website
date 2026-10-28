import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MEDICAL_PROCEDURES, getMedicalProcedureBySlug } from "@/data/medical-procedures";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MEDICAL_PROCEDURES.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const procedure = getMedicalProcedureBySlug(slug);

  if (!procedure) {
    return { title: "Not Found" };
  }

  return {
    title: `${procedure.title} at Home in Chennai | Elderly Wellness`,
    description: procedure.desc,
  };
}

export default async function MedicalProcedureDetailPage({ params }: Props) {
  const { slug } = await params;
  const procedure = getMedicalProcedureBySlug(slug);

  if (!procedure) {
    notFound();
  }

  const similarProcedures = MEDICAL_PROCEDURES.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="bg-brand-light/10 pb-16">
      <section className="pt-6 sm:pt-10 mb-6 bg-white pb-4 border-b border-gray-100">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Medical Procedures", href: "/medical-procedures-at-home/" },
              { label: procedure.title },
            ]}
          />
        </Container>
      </section>

      <Container>
        <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100">
          {/* Left Column: Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
              <Image
                src={procedure.image}
                alt={procedure.title}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              {procedure.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {procedure.desc}
            </p>

            <div className="mb-8">
              {procedure.price ? (
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-brand-primary">
                    ₹{procedure.price.toLocaleString("en-IN")}
                  </div>
                  {procedure.oldPrice && (
                    <div className="text-xl text-gray-400 line-through">
                      ₹{procedure.oldPrice.toLocaleString("en-IN")}
                    </div>
                  )}
                  {procedure.oldPrice && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Discounted
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-3xl font-bold text-brand-primary">
                  Enquire Now
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 flex gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900">Final confirmation is subject to slot availability.</h4>
                <p className="text-sm text-blue-800 mt-1">Our representative will contact you shortly to confirm and finalize your preferred slot after you book.</p>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <a
                href="#download-btn"
                className="btn-brand flex-1 text-center py-4 rounded-full font-semibold shadow-md transition-colors"
              >
                Add to Cart
              </a>
              <a
                href="#download-btn"
                data-open-booking-modal="true"
                data-service-name={procedure.title}
                className="btn-dark flex-1 text-center py-4 rounded-full font-semibold shadow-md transition-colors cursor-pointer"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        {/* Scope of Care Section */}
        <div className="mt-12 bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
            Scope of Care (Services Included)
          </h2>
          <ul className="space-y-4">
            {procedure.scopeOfCare.map((item, index) => (
              <li key={index} className="flex gap-3 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Similar Procedures */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-poppins">
            Similar Procedures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProcedures.map((proc, index) => (
              <Link 
                href={`/medical-procedures-at-home/${proc.slug}/`}
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col hover:shadow-md transition-all group hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={proc.image}
                    alt={proc.title}
                    fill
                    className="object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {proc.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                    {proc.desc}
                  </p>
                </div>
                <div className="mt-auto border-t border-gray-50 pt-3 flex items-center justify-between">
                  {proc.price ? (
                    <div className="text-lg font-bold text-brand-primary">
                      ₹{proc.price.toLocaleString("en-IN")}
                    </div>
                  ) : (
                    <div className="text-sm font-bold text-brand-primary">
                      Enquire Now
                    </div>
                  )}
                  <span className="text-xs font-semibold text-gray-400 group-hover:text-brand-primary transition-colors">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
      
      <div id="download-btn" aria-hidden="true" />
    </div>
  );
}
