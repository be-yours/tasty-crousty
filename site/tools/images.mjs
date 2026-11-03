#!/usr/bin/env node
// Construit les visuels servis (WebP + variantes -sm) à partir des sources
// générées dans site/source/generated/ (jamais servies).
// Usage : node site/tools/images.mjs
// Rôles et prompts : site/IMAGES_A_GENERER.md.
import { mkdir, stat } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
const SRC = join(ROOT, "site/source/generated")
const PUB = join(ROOT, "public")

// [source, sortie (sans extension, relative à public/), largeur, hauteur, largeur -sm, qualité]
// Hauteur = recadrage centré au ratio indiqué (cover).
const JOBS = [
  // Produits et catégories : carrés, sujet centré sur noir (marge pour l'inclinaison 3D)
  ["crousty-blanche.png", "photos/crousty-blanche", 1024, 1024, 512],
  ["crousty-curry.png", "photos/crousty-curry", 1024, 1024, 512],
  ["crousty-mixte.png", "photos/crousty-mixte", 1024, 1024, 512],
  ["nems.png", "photos/nems", 1024, 1024, 512],
  ["tenders.png", "photos/tenders", 1024, 1024, 512],
  ["tiramisu.png", "photos/tiramisu", 1024, 1024, 512],
  ["dada-mojito.png", "photos/dada-mojito", 1024, 1024, 512],
  ["calypso.png", "photos/calypso", 1024, 1024, 512],
  // À propos (carrés), CTA et blog (16:9)
  ["about-1.png", "photos/about-1", 1024, 1024, 512],
  ["about-2.png", "photos/about-2", 1024, 1024, 512],
  ["cta.png", "photos/cta", 1536, 864, 768],
  ["blog-1.png", "photos/blog-1", 1536, 864, 768],
  ["blog-2.png", "photos/blog-2", 1536, 864, 768],
  ["blog-3.png", "photos/blog-3", 1536, 864, 768],
  ["blog-4.png", "photos/blog-4", 1536, 864, 768],
  // Scènes : hero paysage et portrait (plafonner en svh côté CSS), sac, devanture
  ["hero-16x9.png", "brand/scenes/hero-16x9", 1920, 1080, 960, 78],
  ["hero-9x16.png", "brand/scenes/hero-9x16", 864, 1536, 540, 78],
  ["sac-kraft.png", "brand/scenes/sac-kraft", 1024, 1024, 512],
  ["devanture.png", "brand/scenes/devanture", 1536, 864, 768],
]

const kb = async (f) => `${Math.round((await stat(f)).size / 1024)} Ko`

for (const [src, out, w, h, smW, q = 80] of JOBS) {
  const input = join(SRC, src)
  const target = join(PUB, `${out}.webp`)
  const targetSm = join(PUB, `${out}-sm.webp`)
  await mkdir(dirname(target), { recursive: true })
  await sharp(input).resize(w, h, { fit: "cover", position: "centre" }).webp({ quality: q, effort: 6 }).toFile(target)
  const smH = Math.round((smW * h) / w)
  await sharp(input).resize(smW, smH, { fit: "cover", position: "centre" }).webp({ quality: q - 4, effort: 6 }).toFile(targetSm)
  console.log(`${out}.webp ${w}x${h} ${await kb(target)} · -sm ${smW}x${smH} ${await kb(targetSm)}`)
}

// Image de partage : 1200x630 PNG, recadrée dans le hero paysage (sans texte).
const og = join(PUB, "brand/og-default.png")
await sharp(join(SRC, "hero-16x9.png"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  // Palette 256 couleurs + tramage : ~4x plus léger, sans bandes visibles.
  .png({ compressionLevel: 9, palette: true, colours: 256, dither: 1, effort: 10 })
  .toFile(og)
console.log(`brand/og-default.png 1200x630 ${await kb(og)}`)
