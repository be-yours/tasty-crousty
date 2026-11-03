// SITE-SPECIFIC · Tasty Crousty: franchise page (linked from the footer only).
import type { Metadata } from "next"
import { buildSeoMetadata } from "@/lib/seo"
import { FranchisePage } from "@/site/components/pages/FranchisePage"

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    pathname: "/franchise",
    fallbackTitle: "Franchise Tasty Crousty : ouvre ta boutique",
    fallbackDescription:
      "Rejoins l'aventure Tasty Crousty : pourquoi nous rejoindre, les quatre étapes, le profil recherché et le contact franchise.",
    ogLocale: "fr_FR",
  })
}

export default function Franchise() {
  return <FranchisePage />
}
