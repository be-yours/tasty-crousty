// SITE-SPECIFIC · Tasty Crousty: the pilot shop (Strasbourg, Esplanade).
import type { Metadata } from "next"
import { buildSeoMetadata } from "@/lib/seo"
import { RestaurantPage } from "@/site/components/pages/RestaurantPage"

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    pathname: "/restaurant",
    fallbackTitle: "Tasty Crousty Strasbourg (Esplanade) : adresse et horaires",
    fallbackDescription:
      "La boutique pilote Tasty Crousty, 12 rue de Rome à Strasbourg : horaires, téléphone, sur place et à emporter.",
    fallbackOgImage: "/brand/og-default.png",
    ogLocale: "fr_FR",
  })
}

export default function Restaurant() {
  return <RestaurantPage />
}
