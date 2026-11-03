"use client"

/**
 * /club-crousty scene: the iridescent member card that turns over (CLIENT ZONE).
 *
 * One plane in perspective (`perspective()` in its own transform, no
 * preserve-3d: WebKit-safe). The face shown is swapped when the plane is edge
 * on, and the back face is drawn pre-mirrored, so it reads the right way at
 * 180°. The card turns with the scroll (a half turn as it crosses the top of
 * the screen), leans ≤ 6° towards the pointer (hover devices) and turns on the
 * button. Balloons rise once around it (CSS, finite).
 *
 * Under prefers-reduced-motion nothing runs: CSS lays both faces flat side by
 * side and hides the button (the composition is complete without motion).
 */

import { useEffect, useRef, useState } from "react"
import { clamp, finePointer, motionAllowed, whileVisible } from "./fx"

/** Decorative pseudo-QR (not a real code). */
function FakeQr() {
  const cells = ["1110111", "1010101", "1110111", "0001000", "1101011", "0110110", "1011101"]
  return (
    <svg className="tc-qr" viewBox="0 0 9 9" aria-hidden="true" focusable="false">
      <rect width="9" height="9" rx="1" fill="#fff" />
      {cells.flatMap((row, y) =>
        row
          .split("")
          .map((bit, x) =>
            bit === "1" ? (
              <rect key={`${x}-${y}`} x={x + 1} y={y + 1} width="1" height="1" rx="0.2" fill="#141015" />
            ) : null,
          ),
      )}
    </svg>
  )
}

export function ClubCard() {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)
  const flippedRef = useRef(false)

  useEffect(() => {
    flippedRef.current = flipped
  }, [flipped])

  useEffect(() => {
    const root = rootRef.current
    const card = cardRef.current
    if (!root || !card || !motionAllowed()) return

    const hover = finePointer()
    let targetX = 0
    let targetY = 0
    let px = 0
    let py = 0
    let angle = 0
    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect()
      targetX = clamp(((event.clientX - box.left) / box.width) * 2 - 1, -1, 1)
      targetY = clamp(((event.clientY - box.top) / box.height) * 2 - 1, -1, 1)
    }
    const onLeave = () => {
      targetX = 0
      targetY = 0
    }
    if (hover) {
      root.addEventListener("pointermove", onMove)
      root.addEventListener("pointerleave", onLeave)
    }

    root.dataset.live = "true"
    const stop = whileVisible(root, () => {
      const box = card.getBoundingClientRect()
      const vh = window.innerHeight
      // Front while the card comes up to the upper half of the screen (or from
      // the load if it is already there), then a half turn over a scroll of
      // about its own height.
      const docTop = box.top + window.scrollY
      const start = Math.max(0, docTop - vh * 0.5)
      const progress = clamp((window.scrollY - start) / Math.max(220, box.height * 1.1), 0, 1)
      const eased = progress * progress * (3 - 2 * progress)
      const target = (flippedRef.current ? 180 : 0) + eased * 180
      angle += (target - angle) * 0.14
      px += (targetX - px) * 0.12
      py += (targetY - py) * 0.12
      const turn = ((angle % 360) + 360) % 360
      const side = turn > 90 && turn < 270 ? "back" : "front"
      if (root.dataset.side !== side) root.dataset.side = side
      card.style.transform = `perspective(1100px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(angle + px * 6).toFixed(2)}deg)`
      card.style.setProperty("--tc-sheen", `${(50 + px * 40).toFixed(1)}%`)
    })

    return () => {
      stop()
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      delete root.dataset.live
      root.dataset.side = "front"
      card.style.removeProperty("transform")
      card.style.removeProperty("--tc-sheen")
    }
  }, [])

  return (
    <div ref={rootRef} className="tc-club" data-side="front">
      <div className="tc-club__balloons" aria-hidden="true">
        <span className="tc-balloon tc-balloon--pink" />
        <span className="tc-balloon tc-balloon--blue" />
        <span className="tc-balloon tc-balloon--white" />
        <span className="tc-balloon tc-balloon--violet" />
      </div>

      <div ref={cardRef} className="tc-club__card">
        <figure className="tc-club__face tc-club__face--front">
          <div className="tc-club__top">
            <span className="tc-club__mark" aria-hidden="true" />
            <span className="tc-club__chip" aria-hidden="true" />
          </div>
          <p className="tc-club__script" aria-hidden="true">
            Club
          </p>
          <p className="tc-club__name">Carte Club Crousty</p>
          <dl className="tc-club__member">
            <div>
              <dt>Membre</dt>
              <dd>Toi</dd>
            </div>
            <div>
              <dt>Boutiques</dt>
              <dd>Toutes</dd>
            </div>
          </dl>
          <figcaption className="tc-club__demo">Carte de démonstration</figcaption>
        </figure>

        <figure className="tc-club__face tc-club__face--back">
          <ul className="tc-stamps" role="list" aria-label="Cases de la carte (illustration)">
            <li className="tc-stamp tc-stamp--on">
              <span className="tc-sr">Case tamponnée</span>
            </li>
            <li className="tc-stamp tc-stamp--on">
              <span className="tc-sr">Case tamponnée</span>
            </li>
            <li className="tc-stamp">?</li>
            <li className="tc-stamp">?</li>
            <li className="tc-stamp">?</li>
            <li className="tc-stamp tc-stamp--gift">Dessert offert</li>
          </ul>
          <div className="tc-club__backfoot">
            <FakeQr />
            <figcaption>Illustration. Nombre de cases avant la récompense : à confirmer.</figcaption>
          </div>
        </figure>
      </div>

      <button
        type="button"
        className="tc-club__flip"
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
      >
        <span className="tc-club__flip-icon" aria-hidden="true" />
        {flipped ? "Voir le recto" : "Retourner la carte"}
      </button>
    </div>
  )
}
