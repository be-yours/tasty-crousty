/**
 * /commander · how click & collect works (CLIENT ZONE).
 *
 * Scene « Le sac kraft » (ART_DIRECTION.md §8): a kraft bag in perspective
 * that fills with the three steps as the page scrolls (pinned for a little
 * more than one screen from 900 px, unpinned below). CSS only, scroll-driven;
 * the resting state (reduced motion, or no view timelines) is the full bag
 * with the three steps listed.
 *
 * DEMONSTRATION: cash on pick-up only, no real order. Names no third-party
 * platform, runs nothing down, and never claims to replace the brand's app.
 */

import Image from "next/image"
import Link from "next/link"
import { Button } from "@be-yours/ui"
import { PageHead, SectionTitle } from "./shared"

const STEPS = [
  {
    title: "Choisis ta boutique",
    text: "Le site gère plusieurs boutiques. Tu choisis la tienne avant de remplir ta barquette.",
  },
  {
    title: "Choisis ton crousty",
    text: "Ta barquette, ta sauce. Tu valides, puis tu choisis ton créneau de retrait.",
  },
  {
    title: "Passe récupérer",
    text: "Tu arrives à l'heure du créneau, tu paies en espèces au comptoir, tu repars avec ta barquette.",
  },
] as const

const PERKS = [
  { title: "Créneau au choix", tone: "pink" },
  { title: "Paiement en espèces au retrait", tone: "cyan" },
  { title: "Sans commission", tone: "violet" },
  { title: "Points Club Crousty", tone: "kraft" },
] as const

/** The LED board of the counter: dot-matrix capitals that slide with the scroll. */
function LedBoard() {
  return (
    <div className="tc-ledboard">
      <p className="tc-ledboard__screen" aria-hidden="true">
        <span className="tc-ledboard__run">Click &amp; collect · Ta barquette t&apos;attend · Pas de file ·</span>
      </p>
      <p className="tc-ledboard__plate">
        <span className="tc-ledboard__dot" aria-hidden="true" />
        Commande en ligne, retrait au comptoir
      </p>
    </div>
  )
}

function KraftBag() {
  return (
    <div className="tc-bag" aria-hidden="true">
      <div className="tc-bag__body">
        <span className="tc-bag__back" />
        <span className="tc-bag__item tc-bag__item--1">
          <Image src="/brand/scenes/devanture-sm.webp" alt="" width={480} height={270} sizes="200px" />
          <span className="tc-bag__tag">Ta boutique</span>
        </span>
        <span className="tc-bag__item tc-bag__item--2">
          <Image src="/photos/crousty-mixte-sm.webp" alt="" width={480} height={480} sizes="220px" />
          <span className="tc-bag__tag">Ton crousty</span>
        </span>
        <span className="tc-bag__item tc-bag__item--3">
          <span className="tc-bag__clock" />
          <span className="tc-bag__tag">Ton créneau</span>
        </span>
        <span className="tc-bag__front">
          <span className="tc-bag__mark" />
          <span className="tc-bag__script">Tasty</span>
          <span className="tc-bag__caps">Crousty</span>
        </span>
        <span className="tc-bag__handle" />
      </div>
      <span className="tc-bag__shadow" />
    </div>
  )
}

export function CommanderPage() {
  return (
    <div className="tc-page tc-page--order">
      <PageHead
        kicker="Click & collect"
        title={
          <>
            Ton crousty. Sans <span className="italic">attendre.</span>
          </>
        }
        intro="Tu commandes en ligne, tu passes au créneau, tu récupères. Pas de file, pas de prise de tête."
        aside={<LedBoard />}
      >
        <p className="tc-actions">
          <Button asChild>
            <Link href="/menu">Je commande</Link>
          </Button>
        </p>
      </PageHead>

      {/* Demo notice, loud and clear */}
      <div className="tc-wrap tc-demo">
        <p>
          <span className="tc-caption tc-caption--white tc-caption--tilt">
            Démonstration : paiement en espèces uniquement, aucune vraie commande.
          </span>
        </p>
      </div>

      {/* The bag that fills with the three steps */}
      <section className="tc-bagscene" aria-labelledby="etapes-commande">
        <div className="tc-bagscene__pin">
          <div className="tc-wrap tc-bagscene__grid">
            <div className="tc-bagscene__text">
              <SectionTitle id="etapes-commande" kicker="Comment ça marche">
                En <span className="italic">3 étapes</span>
              </SectionTitle>
              <ol className="tc-steps" role="list">
                {STEPS.map((step, index) => (
                  <li key={step.title} className={`tc-step tc-step--${index + 1}`}>
                    <span className="tc-step__num" aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="tc-h3">
                        <span className="tc-sr">Étape {index + 1} : </span>
                        {step.title}
                      </h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <KraftBag />
          </div>
        </div>
      </section>

      {/* Perks: a bento with the bag photo */}
      <section className="tc-section" aria-labelledby="avantages">
        <div className="tc-wrap">
          <SectionTitle id="avantages" kicker="En direct">
            Pourquoi <span className="italic">en direct</span>
          </SectionTitle>
          <div className="tc-perks">
            <figure className="tc-perks__photo">
              <Image
                src="/brand/scenes/sac-kraft.webp"
                alt="Illustration d'un sac kraft posé sur un comptoir à LED rose et cyan"
                width={1024}
                height={1024}
                sizes="(min-width: 900px) 40vw, 100vw"
              />
              <figcaption>
                <span className="tc-caption">Prêt au comptoir</span>
              </figcaption>
            </figure>
            <ul className="tc-perks__list" role="list">
              {PERKS.map((perk, index) => (
                <li key={perk.title} className={`tc-perk tc-perk--${perk.tone}`} style={{ ["--i" as string]: index }}>
                  {perk.title}
                </li>
              ))}
            </ul>
            <p className="tc-perks__note">
              Tu commandes directement à la boutique : pas d&apos;intermédiaire, pas de commission. Et chaque
              commande terminée te rapporte des points Club Crousty.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="tc-section" aria-labelledby="go">
        <div className="tc-wrap">
          <div className="tc-go tc-on-night">
            <SectionTitle id="go" center>
              Trouve <span className="italic">ton tasty</span>
            </SectionTitle>
            <p className="tc-lead">La carte t&apos;attend. Le créneau aussi.</p>
            <p className="tc-actions tc-actions--center">
              <Button asChild>
                <Link href="/menu">Voir la carte et commander</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/club-crousty">Le Club Crousty</Link>
              </Button>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
