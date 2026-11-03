// SITE-SPECIFIC · Tasty Crousty: how click & collect works (demonstration).
import type { Metadata } from "next"
import { buildSeoMetadata } from "@/lib/seo"
import { CommanderPage } from "@/site/components/pages/CommanderPage"

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    pathname: "/commander",
    fallbackTitle: "Commander : click & collect Tasty Crousty",
    fallbackDescription:
      "Choisis ta boutique, choisis ton crousty, passe le récupérer au créneau. Paiement au retrait, points Club Crousty.",
    ogLocale: "fr_FR",
  })
}

export default function Commander() {
  return <CommanderPage />
}
