// SITE-SPECIFIC · Tasty Crousty: Club Crousty loyalty programme (demonstration).
import type { Metadata } from "next"
import { buildSeoMetadata } from "@/lib/seo"
import { ClubCroustyPage } from "@/site/components/pages/ClubCroustyPage"

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    pathname: "/club-crousty",
    fallbackTitle: "Club Crousty : le programme de fidélité",
    fallbackDescription:
      "Le Club Crousty, commun à toutes les boutiques : des points sur tes commandes terminées, un dessert offert et le jeu QR de la barquette.",
    ogLocale: "fr_FR",
  })
}

export default function ClubCrousty() {
  return <ClubCroustyPage />
}
