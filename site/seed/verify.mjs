#!/usr/bin/env node
// SITE-SPECIFIC — vérification navigateur du seed Tasty Crousty.
//
//   node site/seed/verify.mjs            (site sur BETTER_AUTH_URL)
//   SHOTS_DIR=/tmp/shots node site/seed/verify.mjs
//
// Parcours : la carte s'affiche, un produit s'ajoute au panier, le client de
// démo se connecte, passe une commande « à emporter » (click & collect) payée
// en espèces (démo), et arrive sur la page de suivi.
//
// Le moteur REFUSE une commande hors horaires (fuseau Europe/Paris) : lancé en
// dehors de lun.–jeu. 11 h–minuit, ven. 15 h–minuit, sam.–dim. 11 h–minuit, ce
// script s'arrête avant de commander et le dit (voir README).

import { createRequire } from "node:module"
import { existsSync, mkdirSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { CUSTOMER_ACCOUNT, HOURS, PRODUCTS } from "./data.mjs"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
for (const line of readFileSync(resolve(ROOT, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2]
}
const BASE = (process.env.BETTER_AUTH_URL ?? "http://localhost:3000").replace(/\/$/, "")
const PASSWORD = process.env.TASTY_SEED_CUSTOMER_PASSWORD
if (!PASSWORD) throw new Error("TASTY_SEED_CUSTOMER_PASSWORD absent : lance d'abord node site/seed/run.mjs")
const SHOTS = process.env.SHOTS_DIR
if (SHOTS && !existsSync(SHOTS)) mkdirSync(SHOTS, { recursive: true })

function loadPlaywright() {
  for (const base of [ROOT, "/opt/node-tools/"]) {
    try {
      return createRequire(resolve(base, "package.json"))("playwright")
    } catch {}
  }
  throw new Error("Playwright introuvable (npm i -D playwright, ou /opt/node-tools).")
}

/** La boutique est-elle ouverte maintenant, à l'heure de Paris ? (même règle que le moteur) */
function openNowInParis(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  )
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday)
  const minutes = Number(parts.hour) * 60 + Number(parts.minute)
  const toMin = (s) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3))
  const today = HOURS.find((h) => h.day === day)
  if (!today || today.isClosed) return { open: false, day, minutes }
  const open = toMin(today.open)
  const close = toMin(today.close)
  return { open: close <= open ? minutes >= open : minutes >= open && minutes < close, day, minutes }
}

const step = (msg) => console.log(`✔ ${msg}`)

async function main() {
  const { chromium } = loadPlaywright()
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  const shot = async (name) => SHOTS && page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true })
  try {
    // 1. La carte
    await page.goto(`${BASE}/menu`, { waitUntil: "networkidle", timeout: 120_000 })
    const product = PRODUCTS[0]
    const addButton = page.getByRole("button", { name: `Ajouter ${product.name} au panier` })
    await addButton.waitFor({ timeout: 30_000 })
    for (const p of PRODUCTS) {
      await page.getByRole("button", { name: `Ajouter ${p.name} au panier` }).waitFor({ timeout: 10_000 })
    }
    step(`la carte affiche les ${PRODUCTS.length} produits`)
    const brokenImages = await page.$$eval("main img", (imgs) =>
      imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")),
    )
    if (brokenImages.length) console.log(`  ⚠ images non chargées : ${brokenImages.join(", ")}`)
    await shot("1-menu")

    // 2. Le panier
    await addButton.click()
    await page.waitForTimeout(1500)
    await page.goto(`${BASE}/cart`, { waitUntil: "networkidle" })
    await page.getByText(product.name, { exact: false }).first().waitFor({ timeout: 15_000 })
    step(`« ${product.name} » est dans le panier`)
    await shot("2-cart")

    const hours = openNowInParis()
    if (!hours.open) {
      console.log(
        "⚠ Hors horaires (heure de Paris) : le moteur refuserait la commande. " +
          "Relance pendant les horaires (lun.–jeu. 11 h–minuit, ven. 15 h–minuit, sam.–dim. 11 h–minuit).",
      )
      process.exitCode = 2
      return
    }

    // 3. Connexion du client de démo (les espèces exigent un compte)
    await page.goto(`${BASE}/sign-in?redirect=/checkout`, { waitUntil: "networkidle" })
    await page.locator('input[type="email"]').fill(CUSTOMER_ACCOUNT.email)
    await page.locator('input[type="password"]').fill(PASSWORD)
    await page.locator('form button[type="submit"]').click()
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(2000)
    step(`connecté en ${CUSTOMER_ACCOUNT.email}`)

    // 4. Commande à emporter, espèces
    await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" })
    await page.getByRole("button", { name: /À emporter/i }).first().click()
    const nameInput = page.locator('input[placeholder="Jean Dupont"]')
    if (await nameInput.count()) {
      if (!(await nameInput.inputValue())) await nameInput.fill(CUSTOMER_ACCOUNT.name)
    }
    const phoneInput = page.locator('input[placeholder="+33 6 00 00 00 00"]')
    if ((await phoneInput.count()) && !(await phoneInput.inputValue())) await phoneInput.fill("+33 6 00 00 00 00")
    await page.getByRole("button", { name: /esp[eè]ces/i }).first().click()
    await shot("3-checkout")
    // Le bouton du formulaire de commande (pas celui de la newsletter du pied de page).
    await page
      .locator("form")
      .filter({ has: page.locator('input[placeholder="Jean Dupont"]') })
      .locator('button[type="submit"]')
      .click()
    // Espèces : le moteur confirme sur place (pas de redirection), toast
    // « Commande confirmée ! » puis écran de succès.
    await page.getByText(/Commande confirmée/i).first().waitFor({ timeout: 30_000 })
    await page.waitForLoadState("networkidle")
    step("commande à emporter payée en espèces (démo) confirmée à l'écran")
    await shot("4-order")
  } catch (err) {
    await shot("error")
    throw err
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(`✘ ${err?.message ?? err}`)
  process.exitCode = 1
})
