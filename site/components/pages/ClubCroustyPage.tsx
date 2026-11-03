/**
 * /club-crousty · Tasty Crousty (CLIENT ZONE).
 *
 * A DEMONSTRATION loyalty programme, shared by every shop. Every threshold and
 * every rate is « À confirmer »: no figure is invented. It is never presented
 * as a replacement for the brand's existing app.
 *
 * Scene: the member card that turns over among balloons (ClubCard.tsx).
 */

import Link from "next/link"
import { Button } from "@be-yours/ui"
import { ClubCard } from "./ClubCard"
import { PageHead, SectionTitle, ToConfirm } from "./shared"

const HOW = [
  { title: "Tu commandes", text: "En click & collect, dans n'importe quelle boutique du club." },
  { title: "Tu cumules", text: "Tes points tombent quand ta commande est terminée." },
  { title: "Tu croques", text: "Tu échanges tes points contre une récompense. Dessert offert, par exemple." },
] as const

const SCALE = [
  { label: "Points par commande terminée", value: null },
  { label: "Points pour un dessert offert", value: null },
  { label: "Autres récompenses", value: null },
  { label: "Durée de validité des points", value: null },
  { label: "Boutiques concernées", value: "Toutes, c'est un club commun" },
] as const

const FAQ = [
  {
    q: "Le club marche dans toutes les boutiques ?",
    a: "Oui. C'est le même club partout : tes points te suivent d'une boutique à l'autre.",
  },
  {
    q: "Quand est-ce que je reçois mes points ?",
    a: "Quand ta commande est terminée, donc récupérée. Le nombre de points par commande est à confirmer.",
  },
  {
    q: "Je gagne quoi, concrètement ?",
    a: "Un dessert offert fait partie des récompenses. Les autres, et les seuils, sont encore à confirmer.",
  },
  {
    q: "Et l'appli de la marque, alors ?",
    a: "Ce club est une démonstration sur ce site. Il ne remplace pas l'appli existante de la marque.",
  },
] as const

export function ClubCroustyPage() {
  return (
    <div className="tc-page tc-page--club">
      <PageHead
        kicker="Programme de fidélité"
        title={
          <>
            Le <span className="italic">Club</span> Crousty
          </>
        }
        intro="Tu commandes, tu cumules, tu croques gratos. Un seul club pour toutes les boutiques."
        aside={<ClubCard />}
      >
        <p className="tc-flag">
          <span className="tc-caption tc-caption--cyan">Programme de démonstration, barème à confirmer</span>
        </p>
      </PageHead>

      {/* How it works: three giant neon digits */}
      <section className="tc-section" aria-labelledby="club-comment">
        <div className="tc-wrap">
          <SectionTitle id="club-comment" kicker="Trois gestes">
            Comment <span className="italic">ça marche</span>
          </SectionTitle>
          <ol className="tc-how" role="list">
            {HOW.map((step, index) => (
              <li key={step.title} className="tc-how__item" style={{ ["--i" as string]: index }}>
                <span className="tc-how__num" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="tc-h3">{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rewards and scale: a till receipt under the LED */}
      <section className="tc-section" aria-labelledby="club-gains">
        <div className="tc-wrap tc-rewards">
          <div className="tc-rewards__text">
            <SectionTitle id="club-gains" kicker="Le barème">
              Ce que <span className="italic">tu gagnes</span>
            </SectionTitle>
            <p className="tc-lead">
              Le dessert offert est au menu des récompenses. Pour le reste, on ne sort pas de chiffre au hasard :
              le barème arrive.
            </p>
          </div>
          <div className="tc-receipt">
            <p className="tc-receipt__title">Barème du club</p>
            <dl>
              <div className="tc-receipt__row tc-receipt__row--hit">
                <dt>Récompense</dt>
                <dd>Dessert offert</dd>
              </div>
              {SCALE.map((row) => (
                <div key={row.label} className="tc-receipt__row">
                  <dt>{row.label}</dt>
                  <dd>{row.value ?? <ToConfirm />}</dd>
                </div>
              ))}
            </dl>
            <p className="tc-receipt__foot">Programme de démonstration</p>
          </div>
        </div>
      </section>

      {/* QR game: the turquoise wall */}
      <section className="tc-section" aria-labelledby="club-qr">
        <div className="tc-wrap">
          <div className="tc-qrgame">
            <div className="tc-qrgame__text">
              <p className="tc-qrgame__kicker">
                <span className="tc-caption">Le jeu QR</span>
              </p>
              <h2 id="club-qr" className="tc-h2">
                Scanne ta <span className="italic">barquette</span>
              </h2>
              <p>
                Un QR code sur la barquette. Tu le scannes, tu tentes ta chance, et tu peux gagner un dessert ou
                une sauce.
              </p>
              <p>
                Règlement et fréquence des gains : <ToConfirm />
              </p>
            </div>
            <div className="tc-qrgame__scan" aria-hidden="true">
              <span className="tc-qrgame__beam" />
            </div>
          </div>
        </div>
      </section>

      {/* Short FAQ */}
      <section className="tc-section" aria-labelledby="club-faq">
        <div className="tc-wrap tc-faq-wrap">
          <SectionTitle id="club-faq" kicker="Tu te demandes">
            Questions <span className="italic">en vrac</span>
          </SectionTitle>
          <div className="tc-faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <p className="tc-actions">
            <Button asChild>
              <Link href="/menu">Je commande</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/commander">Comment commander</Link>
            </Button>
          </p>
        </div>
      </section>
    </div>
  )
}
