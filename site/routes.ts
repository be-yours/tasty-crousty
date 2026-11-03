/**
 * Site routes — CLIENT ZONE.
 *
 * The pages THIS site adds to the storefront, beside the ones the engine ships.
 * Empty as shipped. An update never touches this file, so what is written here
 * survives `pnpm update:template`.
 *
 * Adding a page takes two files: the route, `app/(storefront)/<name>/page.tsx`
 * (prefix it with a `// SITE-SPECIFIC` comment and import its content from
 * `site/components/`), and one entry here. The entry is what puts the page in
 * `sitemap.xml`, lets `tests/seo/sitemap-robots.test.ts` accept it, and links it
 * from the header or the footer. Delete the entry and the page leaves all three.
 *
 *   {
 *     path: "/evenements",
 *     changeFrequency: "monthly",
 *     priority: 0.6,
 *     nav: { label: "Événements", placement: "header", order: 45 },
 *   }
 *
 * `nav` is optional: leave it out for a page that should be indexed but not
 * linked. The fields, and what becomes of an invalid entry, are documented in
 * `lib/site-routes.ts`; the walkthrough is in `docs/CUSTOMIZATION.md`.
 */

import type { SitePublicRoute } from '@/lib/site-routes'

// Tasty Crousty: four pages of its own, all linked from the footer (« Liens
// utiles »: Mon compte 10, Mes adresses 20, Nos restaurants 30). The engine's
// header already holds five links: nothing is added there, and the franchise is
// never in the header. (Links: see lib/site-routes.ts.)
export const sitePublicRoutes: SitePublicRoute[] = [
  {
    path: "/restaurant",
    changeFrequency: "monthly",
    priority: 0.8,
    nav: { label: "La boutique", placement: "footer", order: 40 },
  },
  {
    path: "/commander",
    changeFrequency: "monthly",
    priority: 0.7,
    nav: { label: "Commander", placement: "footer", order: 50 },
  },
  {
    path: "/club-crousty",
    changeFrequency: "monthly",
    priority: 0.6,
    nav: { label: "Club Crousty", placement: "footer", order: 60 },
  },
  {
    path: "/franchise",
    changeFrequency: "monthly",
    priority: 0.5,
    nav: { label: "Franchise", placement: "footer", order: 70 },
  },
]
