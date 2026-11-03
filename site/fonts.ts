/**
 * Site fonts — CLIENT ZONE. Tasty Crousty, « Vice City Crousty ».
 *
 * The brand's own typefaces (Open Sauce One on the site, a custom script and a
 * custom heavy capital on the sign) are not freely licensed, so this demo uses
 * close Google Fonts (OFL), loaded through next/font:
 *   - Sofia Sans Extra Condensed (variable 1-1000, roman + italic): the poster
 *     capitals of « L'ORIGINAL. LE SEUL. », titles at 800-950, italic for the
 *     Vice City slant. -> --font-poppins (the engine's heading variable).
 *   - Plus Jakarta Sans (variable 200-800): readable text, buttons, forms.
 *     -> --font-inter (the engine's body variable).
 *   - Yellowtail: the 80s neon sign script of « Tasty », for a few accents only
 *     (never a paragraph, never a button). -> --font-tc-script (site variable).
 * The engine theme reads --font-poppins (headings) and --font-inter (body):
 * keep those two names whatever the typeface. The logotype in public/brand/ is
 * drawn as outlines (an SVG in an <img> cannot load a web font).
 */
import { Plus_Jakarta_Sans, Sofia_Sans_Extra_Condensed, Yellowtail } from "next/font/google"

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

const sofiaCondensed = Sofia_Sans_Extra_Condensed({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  display: "swap",
})

const yellowtail = Yellowtail({
  variable: "--font-tc-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const fontVariables = `${jakarta.variable} ${sofiaCondensed.variable} ${yellowtail.variable}`
