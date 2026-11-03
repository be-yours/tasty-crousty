#!/usr/bin/env node
// SITE-SPECIFIC — seed de démo Tasty Crousty. Rejouable (idempotent).
//
//   node site/seed/run.mjs
//
// Prérequis : le site Next (BETTER_AUTH_URL) et le backend Convex
// (NEXT_PUBLIC_CONVEX_URL) tournent, et ce shell atteint le déploiement avec
// `npx convex` (CONVEX_DEPLOYMENT dans .env.local). Voir site/seed/README.md.
//
// Voie choisie : le compte admin est créé par Better Auth (comme un vrai
// propriétaire), son rôle `client_admin` est posé par la fonction interne
// EXISTANTE `userProfiles:internalUpsert`, puis tout le reste passe par les
// mutations PUBLIQUES du moteur avec son jeton (mêmes contrôles que l'admin).
// Seule exception : les médias, créés par la fonction interne EXISTANTE
// `cmsSeedData:createMediaRecord` (la voie publique exige un upload S3).

import { execFile } from "node:child_process"
import { randomBytes } from "node:crypto"
import { appendFileSync, existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { ConvexHttpClient } from "convex/browser"
import { anyApi as api } from "convex/server"
import * as data from "./data.mjs"

const run = promisify(execFile)
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
const ENV_FILE = resolve(ROOT, ".env.local")
const MIN_PASSWORD_LENGTH = 12 // convex/auth.ts, minPasswordLength

// ── Environnement ───────────────────────────────────────────────────────────
function loadEnv(file) {
  if (!existsSync(file)) return
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m || process.env[m[1]] !== undefined) continue
    process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2")
  }
}
loadEnv(resolve(ROOT, ".env.seed"))
loadEnv(ENV_FILE)

const BASE_URL = (process.env.BETTER_AUTH_URL ?? "http://localhost:3000").replace(/\/$/, "")
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL
if (!CONVEX_URL) {
  console.error("NEXT_PUBLIC_CONVEX_URL manquant (.env.local). Abandon.")
  process.exit(1)
}

/** Réutilise le mot de passe stocké, ou en génère un et l'écrit AVANT de créer le compte. */
function passwordFrom(varName) {
  const existing = process.env[varName]
  if (existing) {
    if (existing.length < MIN_PASSWORD_LENGTH) throw new Error(`${varName} : ${MIN_PASSWORD_LENGTH} caractères minimum.`)
    return existing
  }
  const generated = randomBytes(15).toString("base64url")
  appendFileSync(ENV_FILE, `\n# Seed de démo Tasty Crousty (site/seed/run.mjs). Démo uniquement.\n${varName}=${generated}\n`)
  process.env[varName] = generated
  console.log(`  mot de passe généré et écrit dans .env.local (${varName})`)
  return generated
}

// ── Better Auth ─────────────────────────────────────────────────────────────
// Better Auth refuse une requête sans `Origin` ; fetch de Node n'en envoie pas.
const AUTH_HEADERS = { "Content-Type": "application/json", Origin: BASE_URL }

async function authPost(path, body) {
  const res = await fetch(`${BASE_URL}/api/auth/${path}`, {
    method: "POST",
    headers: AUTH_HEADERS,
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  const cookie = res.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ")
  return { ok: res.ok, json, cookie }
}

/** Crée le compte s'il n'existe pas, puis ouvre une session. */
async function ensureAccount({ name, email }, password) {
  await authPost("sign-up/email", { name, email, password }) // échoue si déjà là : normal
  const signIn = await authPost("sign-in/email", { email, password })
  const userId = signIn.json?.user?.id
  if (!signIn.ok || !userId) {
    const why = signIn.json?.code ?? signIn.json?.message ?? "inconnu"
    throw new Error(
      `Connexion impossible pour ${email} : ${why}.` +
        (why === "EMAIL_NOT_VERIFIED" ? " Pose AUTH_ALLOW_UNVERIFIED_EMAIL=true sur le déploiement de TEST." : "") +
        (why === "INVALID_EMAIL_OR_PASSWORD" ? " Le compte existe avec un autre mot de passe : remets celui de .env.local." : ""),
    )
  }
  return { userId, cookie: signIn.cookie }
}

async function convexToken(cookie) {
  const res = await fetch(`${BASE_URL}/api/auth/convex/token`, { headers: { Cookie: cookie, Origin: BASE_URL } })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.token) throw new Error(`Jeton Convex introuvable (HTTP ${res.status}).`)
  return json.token
}

// ── Fonctions internes (CLI Convex, authentifiée comme le déploiement) ──────
async function convexRun(fn, args) {
  try {
    const { stdout } = await run("npx", ["convex", "run", fn, JSON.stringify(args)], {
      cwd: ROOT,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    })
    const out = stdout.trim()
    try {
      return JSON.parse(out)
    } catch {
      return out
    }
  } catch (err) {
    throw new Error(`npx convex run ${fn} : ${String(err?.stderr ?? err).trim()}`)
  }
}

// ── Seed ────────────────────────────────────────────────────────────────────
const log = (msg) => console.log(msg)

async function main() {
  data.assertTypography()
  log("=== Seed Tasty Crousty ===")
  log(`Site : ${BASE_URL}  ·  Convex : ${CONVEX_URL}\n`)

  // 1. Compte admin + rôle
  log("1. Compte admin de démo")
  const adminPassword = passwordFrom("TASTY_SEED_ADMIN_PASSWORD")
  const admin = await ensureAccount(data.ADMIN_ACCOUNT, adminPassword)
  const client = new ConvexHttpClient(CONVEX_URL)
  client.setAuth(await convexToken(admin.cookie))

  const profile = await client.query(api.userProfiles.getMyProfile, {})
  if (!profile || profile.role !== "client_admin") {
    await convexRun("userProfiles:internalUpsert", {
      userId: admin.userId,
      role: "client_admin",
      storeIds: profile?.storeIds ?? [],
      permissions: [],
      language: "fr",
    })
    log("  rôle client_admin attribué")
  } else log("  déjà client_admin")
  log(`  ${data.ADMIN_ACCOUNT.email}`)

  // 2. Réglages généraux
  log("\n2. Réglages généraux (horaires, services, paiement espèces, mentions)")
  await client.mutation(api.globalSettings.upsert, data.GLOBAL_SETTINGS)

  // 3. La boutique
  log("\n3. Boutique")
  const S = data.STORE
  let store = (await client.query(api.stores.listAll, {})).find((s) => s.slug === S.slug)
  if (!store) {
    // Elle existe peut-être sans que ce profil y ait accès (profil recréé).
    const orphan = await client.query(api.stores.getBySlug, { slug: S.slug })
    if (orphan) {
      await convexRun("userProfiles:internalUpsert", {
        userId: admin.userId,
        role: "client_admin",
        storeIds: [orphan._id],
        permissions: [],
        language: "fr",
      })
      store = orphan
      log("  accès rendu à la boutique existante")
    }
  }
  const storeId =
    store?._id ??
    (await client.mutation(api.stores.create, {
      name: S.name,
      slug: S.slug,
      description: S.description,
      address: S.address,
      phone: S.phone,
      email: S.email,
    }))
  log(`  ${store ? "mise à jour" : "créée"} : ${S.name} (${storeId})`)
  await client.mutation(api.stores.update, {
    id: storeId,
    name: S.name,
    description: S.description,
    phone: S.phone,
    email: S.email,
    useGlobalHours: false,
    status: S.status,
  })
  await client.mutation(api.stores.updateAddress, { id: storeId, address: S.address })
  await client.mutation(api.stores.updateHours, { id: storeId, hours: S.hours })
  await client.mutation(api.stores.updateOverrides, { id: storeId, overrides: S.overrides })
  await client.mutation(api.stores.updateTrendingMode, { id: storeId, trendingMode: S.trendingMode })

  // 4. Catégories
  log("\n4. Catégories")
  const existingCats = await client.query(api.categories.listAll, { storeId })
  const catIds = {}
  for (const c of data.CATEGORIES) {
    const found = existingCats.find((x) => x.slug === c.slug)
    const fields = { name: c.name, description: c.description, imageUrl: c.imageUrl, sortOrder: c.sortOrder, isActive: true }
    if (found) {
      await client.mutation(api.categories.update, { id: found._id, ...fields })
      catIds[c.slug] = found._id
    } else {
      catIds[c.slug] = await client.mutation(api.categories.create, { storeId, slug: c.slug, ...fields })
    }
    log(`  ${found ? "=" : "+"} ${c.name}`)
  }

  // 5. Produits
  log("\n5. Produits")
  const existingProducts = await client.query(api.products.listAll, { storeId })
  const productIds = {}
  for (const p of data.PRODUCTS) {
    const found = existingProducts.find((x) => x.slug === p.slug)
    const fields = {
      categoryId: catIds[p.category],
      name: p.name,
      description: p.description,
      price: p.price,
      taxRate: p.taxRate,
      images: [p.image],
      allergens: [], // non confirmés : rien d'inventé
      isActive: true,
      isFeatured: p.isFeatured,
      sortOrder: p.sortOrder,
    }
    if (found) {
      await client.mutation(api.products.update, { id: found._id, ...fields })
      productIds[p.slug] = found._id
    } else {
      productIds[p.slug] = await client.mutation(api.products.create, { storeId, slug: p.slug, source: "manual", ...fields })
    }
    const euros = (p.price / 100).toFixed(2).replace(".", ",")
    log(`  ${found ? "=" : "+"} ${p.name} : ${euros} €${p.isPlaceholderPrice ? " (PLACEHOLDER)" : " (relevé, à confirmer)"}`)
  }
  await client.mutation(api.products.setTrendingProducts, {
    storeId,
    productIds: data.PRODUCTS.filter((p) => p.trending).map((p) => productIds[p.slug]),
  })

  // 6. Médias (URL relative servie par public/)
  log("\n6. Médias CMS")
  const library = await client.query(api.cmsMedia.listMedia, { storeId })
  const mediaIds = {}
  for (const [key, m] of Object.entries(data.MEDIA)) {
    const found = library.find((x) => x.sourceUrl === m.url || x.url === m.url)
    mediaIds[key] =
      found?._id ??
      (await convexRun("cmsSeedData:createMediaRecord", {
        storeId,
        filename: m.filename,
        mimeType: m.url.endsWith(".svg") ? "image/svg+xml" : "image/webp",
        size: 0,
        // Pas d'objet S3 : la clé est un marqueur, l'URL servie est `sourceUrl`.
        s3Key: `seed-static${m.url}`,
        sourceUrl: m.url,
        width: m.width,
        height: m.height,
      }))
    log(`  ${found ? "=" : "+"} ${m.url}`)
  }

  // 7. Pages CMS (brouillon puis publication)
  log("\n7. Pages CMS")
  for (const page of data.CMS_PAGES) {
    for (const [blockKey, rawValues] of Object.entries(page.blocks)) {
      const values = {}
      for (const [field, v] of Object.entries(rawValues)) {
        if (v.type === "image") {
          values[field] = { type: "image", mediaId: mediaIds[v.media], altText: v.altText }
        } else values[field] = v
      }
      await client.mutation(api.cms.saveDraftBlock, { storeId, pageSlug: page.pageSlug, blockKey, values })
    }
    await client.mutation(api.cms.publishPage, { storeId, pageSlug: page.pageSlug })
    log(`  publiée : ${page.pageSlug} (${Object.keys(page.blocks).join(", ")})`)
  }

  // 8. Blog
  log("\n8. Blog")
  const blogCats = await client.query(api.blog.listCategories, { storeId })
  const blogCategoryId =
    blogCats.find((c) => c.name === data.BLOG_CATEGORY.name)?._id ??
    (await client.mutation(api.blog.createCategory, { storeId, ...data.BLOG_CATEGORY }))
  const articles = await client.query(api.blog.listAdminArticles, { storeId })
  for (const a of data.BLOG_ARTICLES) {
    const found = articles.find((x) => x.draftSlug === a.slug || x.publishedSlug === a.slug)
    const articleId =
      found?._id ?? (await client.mutation(api.blog.createArticle, { storeId, title: a.title, categoryId: blogCategoryId }))
    await client.mutation(api.blog.saveDraft, {
      articleId,
      categoryId: blogCategoryId,
      draftContent: {
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        coverImageId: mediaIds[a.cover],
        coverImageAlt: a.coverAlt,
        content: a.content,
        metaTitle: a.title.slice(0, 70),
        metaDescription: a.excerpt.slice(0, 160),
      },
    })
    const after = (await client.query(api.blog.listAdminArticles, { storeId })).find((x) => x._id === articleId)
    if (after?.status !== "published" || after?.hasUnpublishedChanges) {
      await client.mutation(api.blog.publishArticle, { articleId })
    }
    log(`  ${found ? "=" : "+"} /blog/${a.slug}`)
  }

  // 9. Client de démo (pour tester une commande en espèces : compte requis)
  log("\n9. Compte client de démo")
  const customerPassword = passwordFrom("TASTY_SEED_CUSTOMER_PASSWORD")
  await ensureAccount(data.CUSTOMER_ACCOUNT, customerPassword)
  log(`  ${data.CUSTOMER_ACCOUNT.email}`)

  log("\n=== Seed terminé ===")
  log(`Admin  : ${data.ADMIN_ACCOUNT.email} (mot de passe : TASTY_SEED_ADMIN_PASSWORD dans .env.local)`)
  log(`Client : ${data.CUSTOMER_ACCOUNT.email} (mot de passe : TASTY_SEED_CUSTOMER_PASSWORD dans .env.local)`)
}

main().catch((err) => {
  console.error(`\nÉCHEC : ${err?.message ?? err}`)
  process.exitCode = 1
})
