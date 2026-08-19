import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

export interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  noIndex?: boolean;
}

function toAbsolute(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalized}`;
}

export function buildMetadata({
  title,
  description,
  path,
  image = "/images/logo.png",
  type = "website",
  keywords,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonical = toAbsolute(path);
  const absoluteImage = toAbsolute(image);

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
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: SITE_NAME }],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}
