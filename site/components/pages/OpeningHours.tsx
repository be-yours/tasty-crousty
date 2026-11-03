"use client"

/**
 * Opening hours of the pilot shop as neon tubes, today's tube lit (CLIENT ZONE).
 *
 * Hydration-safe: the server snapshot is `null`, so the server HTML and the
 * first client render are neutral (no row lit). React then re-renders with
 * today's day, computed in Europe/Paris whatever the visitor's zone.
 */

import { useSyncExternalStore } from "react"
import { DAYS, HOURS_LABEL, parisNow } from "./hours"

const subscribe = () => () => {}
const today = () => parisNow().day

export function OpeningHours() {
  const current = useSyncExternalStore<number | null>(subscribe, today, () => null)

  return (
    <ul className="tc-hours" role="list">
      {DAYS.map((day, index) => {
        const isToday = current === index
        return (
          <li
            key={day}
            className={isToday ? "tc-hours__row tc-hours__row--today" : "tc-hours__row"}
            aria-current={isToday ? "date" : undefined}
            style={{ ["--i" as string]: index }}
          >
            <span className="tc-hours__day">
              {day}
              {isToday ? <span className="tc-hours__pill">Aujourd&apos;hui</span> : null}
            </span>
            <span className="tc-hours__tube" aria-hidden="true" />
            <span className="tc-hours__time">{HOURS_LABEL[index]}</span>
          </li>
        )
      })}
    </ul>
  )
}
