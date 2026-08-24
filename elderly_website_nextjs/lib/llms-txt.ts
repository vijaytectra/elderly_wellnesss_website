import { getAllBlogs, getChennaiLocationBlogs } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { MARKETING_SITEMAP } from "@/lib/sitemap";

function abs(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function cleanTitle(title: string): string {
  return title
    .replace(/\s*[|–—-]\s*Elderly\s*Wellness.*$/i, "")
    .replace(/\s*\|\s*CareTaker Services.*$/i, "")
    .replace(/\s*\|\s*ElderlyWellness.*$/i, "")
    .trim();
}

function bullets(
  items: readonly { title: string; path: string; description?: string }[],
): string {
  return items
    .map((item) => {
      const desc = item.description?.trim();
      return desc
        ? `- [${item.title}](${abs(item.path)}): ${desc}`
        : `- [${item.title}](${abs(item.path)})`;
    })
    .join("\n");
}

export function buildLlmsTxt(): string {
  const locationSlugs = new Set(
    getChennaiLocationBlogs().map((b) => b.slug),
  );
  const locations = getChennaiLocationBlogs().map((b) => ({
    title: cleanTitle(b.title).replace(/^Elderly Care Services in /i, ""),
    path: b.path,
  }));
  const resourceBlogs = getAllBlogs()
    .filter((b) => !locationSlugs.has(b.slug))
    .map((b) => ({
      title: cleanTitle(b.title),
      path: b.path,
      description: b.description,
    }));

  const pages = MARKETING_SITEMAP.filter((p) => p.group === "Pages");
  const services = MARKETING_SITEMAP.filter((p) => p.group === "Services");
  const company = MARKETING_SITEMAP.filter((p) => p.group === "Company");
  const legal = MARKETING_SITEMAP.filter((p) => p.group === "Legal");

  return `# Elderly Wellness

> Elderly Wellness connects families in Chennai with professional, vetted physiotherapists, nurses, and caregivers who deliver nursing care, physiotherapy, geriatric care, and assisted living support in the elderly person's own home. Care is booked and coordinated through the Elderly Wellness Care Plus app.

## About

Elderly Wellness is a home elder-care platform, currently serving Chennai, that connects families with professional, vetted caregivers, nurses, and physiotherapists. Care is delivered at the client's home rather than in a facility. The company positions itself for NRI and working-family caregivers who cannot be physically present for an aging parent, offering a 2-hour caregiver replacement guarantee, police-verified and trained caregivers (trained through the company's own Elderly Academy of Caretaking & Hospitality, "EACH"), slab-based transparent pricing, and no lock-in contracts. Families discover care, are matched with a provider by an Elderly Wellness specialist, and manage bookings, provider details, and payment through the Elderly Care Plus mobile app. The company states it currently serves Chennai with plans to expand to Bangalore.

## Services

${bullets(
    services.map((p) => ({
      title: p.title,
      path: p.path,
    })),
  )}

## Locations

- [Chennai](${abs("/locations/chennai/")}): Elderly Wellness's primary and currently active service city, covering home physiotherapy, nursing, geriatric care, and assisted living support across Chennai neighborhoods.
${locations.map((l) => `  - [${l.title}](${abs(l.path)})`).join("\n")}

Note: Bangalore is mentioned on the site only as a planned future expansion market, not as an active service location, so it is intentionally not listed above.

## Important Pages

${bullets(pages.map((p) => ({ title: p.title, path: p.path })))}
- [Company Brochure (PDF)](${abs("/assets/elderly_wellness.pdf")}): Downloadable overview brochure.

## Company

${bullets(company.map((p) => ({ title: p.title, path: p.path })))}

## Legal

${bullets(legal.map((p) => ({ title: p.title, path: p.path })))}

## Resources

${bullets(resourceBlogs)}

## FAQs

- **What happens after I sign up and select a service?** An Elderly Wellness specialist calls to discuss requirements and assigns the most suitable physiotherapist, nurse, or caregiver.
- **Can I book more than one session in a day?** Yes; availability is confirmed with the specialist during the initial call.
- **How do I pay for the service?** Payment is made securely through the Elderly Care Plus app once a provider is assigned.
- **What if the provider does not arrive on time?** The family is notified via the app; significant delays can be escalated to customer support, and Elderly Wellness offers a 2-hour replacement guarantee.
- **Is my payment information safe?** Yes, all payments are processed through encrypted methods.

Full FAQ list: [About Us](${abs("/about/")}) and each service page (e.g. [Physiotherapy FAQs](${abs("/physiotherapy-services-for-elders/")})).

## Contact

- Phone: [+91 99448 90577](tel:919944890577)
- Email: [info@theelderlywellness.com](mailto:info@theelderlywellness.com)
- Contact page: ${abs("/contact/")}
- Facebook: https://www.facebook.com/profile.php?id=100089074061784
- Instagram: https://www.instagram.com/elderly__wellness
- LinkedIn: https://www.linkedin.com/company/elderly-wellness-service-pvt-ltd/about/
- X (Twitter): https://x.com/elderly____
`;
}
