/**
 * /restaurant · the pilot shop, Tasty Crousty Strasbourg (Esplanade) (CLIENT ZONE).
 *
 * Scene « La devanture la nuit » (ART_DIRECTION.md §8): the shopfront in
 * perspective, the city written in a neon tube letter by letter, an
 * « OUVERT / FERMÉ » panel lit from the hours, the hours themselves as neon
 * tubes. Address, phone and hours come from the press (April 2026) and are
 * flagged « À confirmer ». No embedded map (no key): the route button opens a
 * Google Maps SEARCH for the address.
 */

import Link from "next/link"
import { Button } from "@be-yours/ui"
import { Facade } from "./Facade"
import { OpeningHours } from "./OpeningHours"
import { Ribbon } from "./Ribbon"
import { PageHead, SectionTitle, ToConfirm } from "./shared"

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=12+rue+de+Rome+67000+Strasbourg"

export function RestaurantPage() {
  return (
    <div className="tc-page tc-page--shop">
      <PageHead
        kicker="La boutique pilote"
        title={
          <>
            Tasty Crousty <span className="italic">Strasbourg</span>
          </>
        }
        intro="Esplanade. La boutique où tout se teste en premier. Ici, on ne pèse pas l'amour. On le sert."
      />

      {/* The shopfront at night + the shop's card */}
      <section className="tc-section tc-store" aria-labelledby="fiche">
        <div className="tc-wrap tc-store__grid">
          <Facade city="Strasbourg" />

          <div className="tc-store__card">
            <p className="tc-store__kicker">
              <span className="tc-caption">Adresse</span>
            </p>
            <h2 id="fiche" className="tc-store__name">
              Tasty Crousty Strasbourg <span className="tc-store__sub">Esplanade</span>
            </h2>
            <address className="tc-store__address">
              12 rue de Rome
              <br />
              67000 Strasbourg
            </address>
            <p className="tc-store__phone">
              <a className="tc-store__tel" href="tel:+33749280276">
                +33 7 49 28 02 76
              </a>
            </p>
            <p className="tc-store__src">
              Adresse et numéro relevés dans la presse : <ToConfirm />
            </p>

            <ul className="tc-modes" role="list" aria-label="Services">
              <li className="tc-mode tc-mode--yes">Sur place</li>
              <li className="tc-mode tc-mode--yes">À emporter</li>
              <li className="tc-mode tc-mode--no">Livraison : pas à l&apos;ouverture</li>
            </ul>

            <p className="tc-actions">
              <Button asChild>
                <Link href="/menu">Commander ici</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                  Itinéraire
                  <span className="tc-sr"> (Google Maps, nouvel onglet)</span>
                </a>
              </Button>
            </p>
          </div>
        </div>
      </section>

      {/* Hours: neon tubes, today's tube lit */}
      <section className="tc-section" aria-labelledby="horaires">
        <div className="tc-wrap">
          <div className="tc-board tc-on-night">
            <div className="tc-board__head">
              <SectionTitle id="horaires" kicker="On est là">
                Les <span className="italic">horaires</span>
              </SectionTitle>
              <p className="tc-board__note">
                Relevés dans la presse en avril 2026 : <ToConfirm />
              </p>
            </div>
            <OpeningHours />
          </div>
        </div>
      </section>

      {/* The cities are waiting */}
      <section className="tc-section tc-cities" aria-labelledby="villes">
        <Ribbon words={["On arrive", "Partout", "Pour vous", "Toujours généreux"]} />
        <div className="tc-wrap tc-cities__body">
          <SectionTitle id="villes" center>
            Les villes attendent <span className="italic">leur ouverture</span>
          </SectionTitle>
          <p className="tc-lead tc-cities__lead">
            Ta ville trépigne ? Elle n&apos;est pas la seule. De nouvelles boutiques arrivent, mais ici on ne lâche
            ni date ni promesse.
          </p>
          <p className="tc-actions tc-actions--center">
            <Button asChild>
              <Link href="/contact">Réclame ta ville</Link>
            </Button>
          </p>
        </div>
      </section>
    </div>
  )
}
