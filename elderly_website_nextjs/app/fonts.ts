import { Manrope } from "next/font/google";
import localFont from "next/font/local";

/**
 * Manrope — body sans-serif, matches the legacy site's intended stack
 * (see MIGRATION_INVENTORY §10). Loaded from Google Fonts so body text
 * renders consistently across Windows / macOS / Linux / Android rather
 * than falling through to each OS's system UI font.
 */
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

/**
 * Cormorant Garamond, weight 300 only — sourced from ../fonts/ in the legacy
 * repo. The legacy site only ships weight 300 (see MIGRATION_INVENTORY §11);
 * if more weights are needed later, drop more .woff2 files into
 * `public/fonts/` and extend the `src` array.
 */
export const cormorant = localFont({
  src: [
    {
      path: "../public/fonts/cormorant-garamond-300.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

/** Playball display script, single weight. */
export const playball = localFont({
  src: [
    {
      path: "../public/fonts/playball.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: false,
});
