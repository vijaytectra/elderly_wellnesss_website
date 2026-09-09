import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

export type DublinCoreType =
  | "Text.Homepage"
  | "Text.Webpage"
  | "Text.Article";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Share-context headline. Falls back to `title` when omitted. */
  ogTitle?: string;
  /** Share-context blurb. Falls back to `description` when omitted. */
  ogDescription?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  noIndex?: boolean;
  /** Dublin Core resource type. Defaults to `Text.Webpage`. */
  dcType?: DublinCoreType;
}

function toAbsolute(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalized}`;
}

const GEO_POSITION = "12.84236971761543, 80.22651263719975";

export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  image = "/images/logo.png",
  type = "website",
  keywords,
  noIndex = false,
  dcType,
}: BuildMetadataInput): Metadata {
  const canonical = toAbsolute(path);
  const absoluteImage = toAbsolute(image);
  const shareTitle = ogTitle ?? title;
  const shareDescription = ogDescription ?? description;
  const resolvedDcType: DublinCoreType =
    dcType ?? (type === "article" ? "Text.Article" : "Text.Webpage");

  return {
    title: { absolute: title },
    description,
    keywords,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical,
      },
    },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: SITE_NAME }],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [absoluteImage],
    },
    other: {
      "DC.title": title,
      "DC.description": description,
      "DC.publisher": SITE_NAME,
      "DC.language": "en-IN",
      "DC.type": resolvedDcType,
      "DC.identifier": canonical,
      "geo.region": "IN-TN",
      "geo.placename": "Chennai",
      "geo.position": GEO_POSITION,
      ICBM: GEO_POSITION,
    },
  };
}
