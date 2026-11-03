/**
 * Shared bits of the Tasty Crousty pages (CLIENT ZONE), « Vice City Crousty ».
 *
 * Server components. The styles live in `site/pages/custom.css`, every class
 * prefixed `tc-` and confined to `.storefront-theme`.
 */

import type { ReactNode } from "react"

/** The visible marker for everything not sourced yet. */
export function ToConfirm({ children = "À confirmer" }: { children?: ReactNode }) {
  return <span className="tc-tbc">{children}</span>
}

/**
 * The night street that opens each page: a TikTok caption as kicker, a huge
 * leaning title whose coloured word is a neon tube, the striped sun with three
 * palms rising over the grid floor. Always a night island (the black facade),
 * in light mode too. The engine's navigation bar is `fixed`: the band clears it.
 */
export function PageHead({
  kicker,
  title,
  intro,
  children,
  aside,
}: {
  kicker: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  aside?: ReactNode
}) {
  return (
    <header className={`tc-hero tc-on-night${aside ? " tc-hero--split" : ""}`}>
      <div className="tc-hero__sky" aria-hidden="true">
        <span className="tc-hero__sun" />
        <span className="tc-hero__floor" />
      </div>
      <div className="tc-wrap tc-hero__grid">
        <div className="tc-hero__text">
          <p className="tc-hero__kicker">
            <span className="tc-caption tc-caption--tilt">{kicker}</span>
          </p>
          <h1 className="tc-hero__title">{title}</h1>
          {intro ? <p className="tc-hero__intro">{intro}</p> : null}
          {children}
        </div>
        {aside ? <div className="tc-hero__aside">{aside}</div> : null}
      </div>
    </header>
  )
}

/**
 * A word written in a neon tube that switches on letter by letter (CSS only:
 * each letter carries its index). The word is read once, as a whole, by
 * assistive technologies.
 */
export function NeonLetters({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`tc-letters ${className}`.trim()}>
      <span className="tc-sr">{text}</span>
      {Array.from(text).map((char, index) => (
        <span key={index} aria-hidden="true" className="tc-letters__l" style={{ ["--i" as string]: index }}>
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  )
}

/** A section title: upright poster capitals, one word in neon. */
export function SectionTitle({
  id,
  children,
  kicker,
  center = false,
}: {
  id: string
  children: ReactNode
  kicker?: string
  center?: boolean
}) {
  return (
    <div className={`tc-title${center ? " tc-title--center" : ""}`}>
      {kicker ? (
        <p className="tc-title__kicker">
          <span className="tc-caption tc-caption--cyan">{kicker}</span>
        </p>
      ) : null}
      <h2 id={id} className="tc-h2">
        {children}
      </h2>
    </div>
  )
}
