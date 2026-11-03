"use client"

/**
 * The tilted pink band of capitals that crosses the screen (CLIENT ZONE).
 * Markup and WCAG 2.2.2 rules are those of `.tc-ribbon` in site/pages/base.css:
 * it stops on hover, on focus and with the toggle, and never runs under
 * prefers-reduced-motion (base.css hides the toggle there).
 */

import { useState } from "react"

export function Ribbon({ words, tone = "pink" }: { words: readonly string[]; tone?: "pink" | "cyan" }) {
  const [paused, setPaused] = useState(false)
  const list = [...words, ...words, ...words]

  return (
    <div className={`tc-ribbon${tone === "cyan" ? " tc-ribbon--cyan" : ""}`} data-paused={paused}>
      <button
        type="button"
        className="tc-ribbon__toggle"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Relancer le bandeau" : "Mettre en pause le bandeau"}
      </button>
      <div className="tc-ribbon__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <span key={copy} className="tc-ribbon__set">
            {list.map((word, index) => (
              <span key={`${copy}-${index}`}>{word}</span>
            ))}
          </span>
        ))}
      </div>
      <p className="tc-sr">{words.join(". ")}.</p>
    </div>
  )
}
