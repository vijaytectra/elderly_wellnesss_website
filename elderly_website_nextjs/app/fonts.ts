import { Inter } from "next/font/google";

// Stub — Phase 2b replaces with `next/font/local` loaders for the actual
// woff2 files under ../fonts/ (cormorant-garamond-300, playball, icofont, etc.)
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
