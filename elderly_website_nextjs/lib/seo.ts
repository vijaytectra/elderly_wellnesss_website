import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

export interface BuildMetadataInput {
  title: string;
  description: string;
  /** Absolute or root-relative path, e.g. "/about/" */
  path: string;
  /** Absolute or root-relative image URL. Defaults to /images/logo.png */
  image?: string;
  /** OpenGraph type. Defaults to "website" */
  type?: "website" | "article";
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
}: BuildMetadataInput): Metadata {
  const canonical = toAbsolute(path);
  const absoluteImage = toAbsolute(image);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: absoluteImage }],
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
