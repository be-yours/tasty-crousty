/**
 * Opening hours of the pilot shop, Strasbourg (Esplanade) (CLIENT ZONE).
 * Press source, April 2026: À confirmer (site/A_COMPLETER.md). Hard-coded, not
 * read from the CMS: align by hand if the shop changes in the admin.
 */

export const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] as const

/** Index 0 = Monday. Opening and closing hour (24 = midnight). */
export const OPEN: readonly (readonly [number, number])[] = [
  [11, 24],
  [11, 24],
  [11, 24],
  [11, 24],
  [15, 24],
  [11, 24],
  [11, 24],
]

export const HOURS_LABEL = OPEN.map(([from]) => `${from}\u00a0h à minuit`)

const SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

/** Day (0 = Monday) and hour as decimals, in Europe/Paris whatever the visitor's zone. */
export function parisNow(date = new Date()): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date)
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? ""
  const day = SHORT.indexOf(read("weekday") as (typeof SHORT)[number])
  const hour = Number(read("hour")) + Number(read("minute")) / 60
  return { day, hour }
}

export function isOpenNow(date = new Date()): boolean {
  const { day, hour } = parisNow(date)
  const slot = OPEN[day]
  if (!slot) return false
  return hour >= slot[0] && hour < slot[1]
}
