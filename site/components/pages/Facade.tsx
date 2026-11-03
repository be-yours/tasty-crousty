"use client"

/**
 * /restaurant scene « La devanture la nuit » (CLIENT ZONE).
 *
 * The shopfront (an AI illustration) is one plane turned in perspective; the
 * shop's name switches on letter by letter in the empty sign, and a small
 * « OUVERT / FERMÉ » panel lights according to the hours (Paris time).
 *
 * Motion: the plane straightens as it scrolls in (CSS, view timeline) and leans
 * a few degrees towards the pointer (hover devices only, ≤ 5°). The pointer is
 * read only while the scene is on screen; nothing runs under
 * prefers-reduced-motion. Single plane, no preserve-3d (WebKit-safe).
 */

import Image from "next/image"
import { useEffect, useRef, useSyncExternalStore } from "react"
import { finePointer, motionAllowed, pointerVars } from "./fx"
import { isOpenNow } from "./hours"
import { NeonLetters } from "./shared"

function subscribeMinute(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000)
  return () => window.clearInterval(timer)
}

export function ShopStatus() {
  const open = useSyncExternalStore<boolean | null>(subscribeMinute, () => isOpenNow(), () => null)
  const state = open === null ? "idle" : open ? "open" : "closed"
  return (
    <p className={`tc-status tc-status--${state}`}>
      <span className="tc-status__lamp" aria-hidden="true" />
      <span className="tc-status__word">{open === null ? "Horaires" : open ? "Ouvert" : "Fermé"}</span>
      <span className="tc-sr"> selon les horaires relevés dans la presse, à confirmer</span>
    </p>
  )
}

export function Facade({ city }: { city: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !motionAllowed() || !finePointer()) return
    return pointerVars(element)
  }, [])

  return (
    <div ref={ref} className="tc-facade">
      <div className="tc-facade__plane">
        <Image
          src="/brand/scenes/devanture.webp"
          alt="Illustration d'une devanture noire à néon rose, la nuit, sous un auvent turquoise"
          width={1536}
          height={864}
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
          className="tc-facade__img"
        />
        <p className="tc-facade__sign">
          <NeonLetters text={city} />
        </p>
        <div className="tc-facade__status">
          <ShopStatus />
        </div>
        <span className="tc-facade__glare" aria-hidden="true" />
      </div>
      <p className="tc-facade__credit">Illustration générée par IA, pas une photo de la boutique.</p>
    </div>
  )
}
