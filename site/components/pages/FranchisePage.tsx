/**
 * /franchise · Tasty Crousty (CLIENT ZONE).
 *
 * Linked from the footer only. No figure of any kind on this page (fees,
 * royalties, turnover, number of shops): everything financial is « À confirmer ».
 *
 * Scene « La façade qui s'assemble » (ART_DIRECTION.md §8): the four steps
 * build a shopfront layer by layer (wall, awning, sign, lights on), pinned
 * for about one screen from 900 px, unpinned below. CSS only, scroll-driven;
 * the resting state is the assembled, lit shopfront.
 */

import Image from "next/image"
import { FranchiseForm } from "./FranchiseForm"
import { PageHead, SectionTitle, ToConfirm } from "./shared"

const REASONS = [
  {
    title: "Un concept simple",
    quote: "Le bonheur est dans les choses simples.",
    text: "Une barquette, du poulet bien croustillant, des sauces. Ça s'explique en une phrase et ça se retient tout de suite.",
    img: "/photos/crousty-blanche.webp",
    alt: "Illustration d'une barquette de riz et poulet croustillant sauce blanche",
  },
  {
    title: "Une marque qui a du caractère",
    quote: "Tasty Crousty, l'original.",
    text: "Une identité qu'on reconnaît de loin, de nuit comme de jour. Tu n'ouvres pas un fast-food de plus, tu ouvres l'original.",
    img: "/brand/scenes/devanture.webp",
    alt: "Illustration d'une devanture noire à néon rose sous un auvent turquoise",
  },
  {
    title: "La générosité comme règle",
    quote: "Ingrédients XXL. Générosité max. Prix imbattable.",
    text: "Ici, on ne pèse pas l'amour. On le sert. Et les clients le voient direct dans la barquette.",
    img: "/photos/crousty-mixte.webp",
    alt: "Illustration d'une barquette mixte, sauce blanche et sauce curry",
  },
  {
    title: "Une marque qui bouge",
    quote: "ON ARRIVE. Partout. Pour vous. Toujours généreux.",
    text: "Des villes attendent leur boutique. Peut-être la tienne, avec toi derrière le comptoir.",
    img: "/photos/cta.webp",
    alt: "Illustration d'un sac à emporter passé au comptoir",
  },
] as const

const STEPS = [
  {
    title: "Candidature",
    text: "Tu remplis le formulaire en bas de page. Qui tu es, où tu vises, pourquoi toi.",
  },
  {
    title: "Rencontre",
    text: "On se voit, on goûte, on parle sérieux. Toi aussi tu poses tes questions.",
  },
  {
    title: "Formation",
    text: "Tu apprends la recette, les gestes et le rythme d'une boutique.",
    tbc: "Durée et lieu",
  },
  {
    title: "Ouverture",
    text: "Ta ville, ta boutique, ta première barquette. Et la file qui va avec.",
  },
] as const

const PROFILE = [
  "Tu aimes le terrain, le service et le rush du soir.",
  "Tu sais mener une équipe, ou tu as très envie d'apprendre.",
  "Tu as une ville en tête, et pourquoi pas déjà un local.",
  "Tu respectes la recette. L'original, ça ne s'improvise pas.",
] as const

/** The shopfront drawn in CSS, one layer per step (decor). */
function ShopBuild() {
  return (
    <div className="tc-shop" aria-hidden="true">
      <span className="tc-shop__wall">
        <span className="tc-shop__window">
          <span className="tc-shop__led" />
        </span>
        <span className="tc-shop__door" />
      </span>
      <span className="tc-shop__awning" />
      <span className="tc-shop__sign">
        <span className="tc-shop__disc" />
        <span className="tc-shop__tasty">Tasty</span>
        <span className="tc-shop__crousty">Crousty</span>
      </span>
      <span className="tc-shop__open">
        <span className="tc-caption">Ta ville ici</span>
      </span>
      <span className="tc-shop__street" />
    </div>
  )
}

export function FranchisePage() {
  return (
    <div className="tc-page tc-page--franchise">
      <PageHead
        kicker="Franchise"
        title={
          <>
            Ouvre ta boutique <span className="italic">Tasty Crousty</span>
          </>
        }
        intro="Tu rêves de servir l'original dans ta ville ? On cherche des gens motivés et généreux. Lis, candidate, on se rencontre."
      >
        <p className="tc-actions">
          <a href="#candidature" data-slot="button" data-variant="default" className="tc-btn tc-btn--big">
            Je candidate
          </a>
          <a href="#etapes" className="tc-link">
            Voir les 4 étapes
          </a>
        </p>
      </PageHead>

      {/* Why join: a bento with photos */}
      <section className="tc-section" aria-labelledby="pourquoi">
        <div className="tc-wrap">
          <SectionTitle id="pourquoi" kicker="Pourquoi nous">
            Pourquoi <span className="italic">nous rejoindre</span>
          </SectionTitle>
          <ul className="tc-bento" role="list">
            {REASONS.map((reason, index) => (
              <li key={reason.title} className={`tc-bento__card tc-bento__card--${index + 1}`}>
                <div className="tc-bento__media">
                  <Image
                    src={reason.img}
                    alt={reason.alt}
                    width={1024}
                    height={1024}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
                <div className="tc-bento__body">
                  <h3 className="tc-h3">{reason.title}</h3>
                  <p className="tc-bento__quote">« {reason.quote} »</p>
                  <p>{reason.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="tc-note">
            Conditions financières et zones disponibles : <ToConfirm />. On en parle à la rencontre, pas sur une
            page de démo.
          </p>
        </div>
      </section>

      {/* The four steps build the shopfront */}
      <section id="etapes" className="tc-build tc-anchor" aria-labelledby="etapes-titre">
        <div className="tc-build__pin">
          <div className="tc-wrap tc-build__grid">
            <div className="tc-build__text">
              <SectionTitle id="etapes-titre" kicker="Couche par couche">
                Les <span className="italic">4 étapes</span>
              </SectionTitle>
              <ol className="tc-build__steps" role="list">
                {STEPS.map((step, index) => (
                  <li key={step.title} className={`tc-build__step tc-build__step--${index + 1}`}>
                    <span className="tc-build__num" aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="tc-h3">
                        <span className="tc-sr">Étape {index + 1} : </span>
                        {step.title}
                      </h3>
                      <p>{step.text}</p>
                      {"tbc" in step ? (
                        <p className="tc-build__tbc">
                          {step.tbc} : <ToConfirm />
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <ShopBuild />
          </div>
        </div>
      </section>

      {/* Profile */}
      <section className="tc-section" aria-labelledby="profil">
        <div className="tc-wrap tc-profile">
          <div className="tc-profile__head">
            <SectionTitle id="profil" kicker="Toi, peut-être">
              Le profil <span className="italic">recherché</span>
            </SectionTitle>
            <p className="tc-lead">
              Pas besoin d&apos;un costard. Besoin d&apos;envie, de rigueur et du sens du service.
            </p>
          </div>
          <ul className="tc-ticks" role="list">
            {PROFILE.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li className="tc-ticks__tbc">
              Apport, expérience exigée, critères exacts : <ToConfirm />
            </li>
          </ul>
        </div>
      </section>

      {/* Demo form + direct contact */}
      <section id="candidature" className="tc-section tc-anchor" aria-labelledby="candidature-titre">
        <div className="tc-wrap tc-apply">
          <div className="tc-apply__form">
            <SectionTitle id="candidature-titre" kicker="À toi">
              Ta <span className="italic">candidature</span>
            </SectionTitle>
            <p className="tc-lead">
              Formulaire de démonstration : rien ne part, rien n&apos;est enregistré. Pour de vrai, écris-nous.
            </p>
            <FranchiseForm />
          </div>
          <aside className="tc-apply__aside tc-on-night" aria-labelledby="contact-franchise">
            <h3 id="contact-franchise" className="tc-h3">
              Contact franchise
            </h3>
            <p>Une question avant de te lancer ? Un projet déjà bien ficelé ? Écris directement à l&apos;équipe.</p>
            <p>
              <a className="tc-mail" href="mailto:franchise@tastycrousty.io">
                franchise@tastycrousty.io
              </a>
            </p>
          </aside>
        </div>
      </section>
    </div>
  )
}
