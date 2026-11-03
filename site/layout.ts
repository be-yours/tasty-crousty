/**
 * Site layout — CLIENT ZONE. Tasty Crousty, « Vice City Crousty ».
 *
 * The layout half of the identity, beside theme.css (colour) and fonts.ts
 * (type). Values must stay inside their family (lib/layout-families.ts);
 * `pnpm design:check` fails otherwise.
 *
 *   nav  "left"     the engine's neutral bar. site/pages/base.css redraws it
 *                   entirely (floating cyan pill, logotype on the axis, rooms
 *                   split around it), so no engine nav rule may fight it;
 *                   "center" would add a grid under our own placement.
 *   hero "split"    text + media; the home page sheet restyles it.
 *   menu "cards"    product cards, styled by the shop sheet.
 *   btn  "pill"     every button is a pill (the brand's own buttons are).
 *   tex  "none"     no engine texture: base.css paints its own night ground
 *                   (and the turquoise wall in light mode).
 *   foot "columns"  the engine's columns; base.css paints the night plate and
 *                   the neon edge ("heavy" would add a second top border).
 *   up   "1"        headings in capitals: the brand writes its titles that way.
 */

import type { SiteLayout } from "@/lib/layout-families"

export const siteLayout: SiteLayout = {
  nav: "left",
  hero: "split",
  menu: "cards",
  btn: "pill",
  tex: "none",
  foot: "columns",
  up: "1",
}
