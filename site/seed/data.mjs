// SITE-SPECIFIC — données du seed de démo Tasty Crousty (zone client).
//
// Données PURES : aucun appel réseau ici. `run.mjs` les envoie au backend.
// Tout texte visible passe par `fr()` (espaces insécables avant : ; ? ! € et
// dans « », jamais de tiret cadratin ou demi-cadratin) : `assertTypography()`
// refuse de lancer le seed si une chaîne visible enfreint la règle.
//
// Rien d'inventé : ce qui n'est pas confirmé est écrit « à confirmer » ici ET
// listé dans `site/A_COMPLETER.md`.

const NBSP = " " // avant : et €, dans « », entre un nombre et « h »
const NNBSP = " " // avant ; ! ?

/** Typographie française appliquée à un texte (ou à du HTML simple). */
export function fr(text) {
  return text
    .replace(/[   ]*([;!?])(?=[\s<»)"]|$)/g, `${NNBSP}$1`)
    .replace(/[   ]+:(?=[\s<]|$)/g, `${NBSP}:`)
    .replace(/(\d)[   ]*€/g, `$1${NBSP}€`)
    .replace(/«[   ]*/g, `«${NBSP}`)
    .replace(/[   ]*»/g, `${NBSP}»`)
    .replace(/(\d)[   ]+h\b/g, `$1${NBSP}h`)
}

// ── Comptes de démo ─────────────────────────────────────────────────────────
// Domaine `.test` (RFC 2606) : aucune adresse ne peut recevoir de courrier.
// Les mots de passe ne sont PAS ici : `run.mjs` les génère et les garde dans
// `.env.local` (git-ignoré).
export const ADMIN_ACCOUNT = {
  name: "Admin démo Tasty Crousty",
  email: "admin.demo@tasty-crousty.test",
}
export const CUSTOMER_ACCOUNT = {
  name: "Client démo",
  email: "client.demo@tasty-crousty.test",
}

// ── Réglages généraux (globalSettings) ──────────────────────────────────────
/** Lun.–jeu. 11 h–minuit, ven. 15 h–minuit, sam.–dim. 11 h–minuit (presse, avril 2026, À CONFIRMER). 0 = dimanche. */
export const HOURS = [
  { day: 0, open: "11:00", close: "00:00", isClosed: false },
  { day: 1, open: "11:00", close: "00:00", isClosed: false },
  { day: 2, open: "11:00", close: "00:00", isClosed: false },
  { day: 3, open: "11:00", close: "00:00", isClosed: false },
  { day: 4, open: "11:00", close: "00:00", isClosed: false },
  { day: 5, open: "15:00", close: "00:00", isClosed: false },
  { day: 6, open: "11:00", close: "00:00", isClosed: false },
]

/** Sur place + à emporter (click & collect). Livraison désactivée à l'ouverture. */
export const SERVICES = {
  dineIn: true,
  takeaway: true,
  delivery: false,
  clickAndCollect: true,
}

const A_CONFIRMER = "À confirmer"

export const GLOBAL_SETTINGS = {
  currency: "EUR",
  timezone: "Europe/Paris",
  // 10 % = vente à consommer immédiatement. Taux par produit : À CONFIRMER.
  taxRate: 10,
  services: SERVICES,
  hours: HOURS,
  // Espèces de démonstration uniquement : aucun prestataire de carte.
  payments: { cardProvider: "none", paypal: false, cash: true },
  // Entité légale : trois pistes contradictoires, on ne tranche pas.
  seller: {
    legalName: A_CONFIRMER,
    legalForm: A_CONFIRMER,
    // Pas d'adresse de siège : le moteur n'affiche une adresse que si rue,
    // code postal ET ville sont remplis (« À confirmer » ×3 donnait une ligne
    // illisible). Absente, la page affiche « non communiqué par l'établissement ».
    // `upsert` remplace `seller` en entier : une adresse posée avant disparaît.
    rcs: A_CONFIRMER,
    legalMentions: "Site de démonstration. Identité de l'éditeur à confirmer.",
  },
  siteLegal: {
    publicationDirector: A_CONFIRMER,
    contactEmail: "contact@tastycrousty.io",
    host: { name: A_CONFIRMER, address: A_CONFIRMER, phone: A_CONFIRMER },
  },
}

// ── La boutique pilote (la seule du seed) ───────────────────────────────────
export const STORE = {
  slug: "strasbourg-esplanade",
  name: "Tasty Crousty Strasbourg (Esplanade)",
  description: fr(
    "Boutique pilote de la démo. Sur place et à emporter (click & collect). Livraison : pas à l'ouverture. Adresse, téléphone et horaires relevés dans la presse (avril 2026), à confirmer.",
  ),
  // Pas de coordonnées GPS : non fournies, donc non inventées.
  address: {
    street: "12 rue de Rome",
    city: "Strasbourg",
    postalCode: "67000",
    country: "FR",
  },
  phone: "+33 7 49 28 02 76", // source presse, À CONFIRMER
  email: "contact@tastycrousty.io", // contact général de la marque
  hours: HOURS,
  overrides: { services: SERVICES },
  status: "open",
  trendingMode: "manual",
}

// ── La carte ────────────────────────────────────────────────────────────────
// Prix en CENTIMES. SEUL prix public daté : la barquette originale à 9 €
// (Strasbourg, avril 2026, à confirmer).
//
// PLACEHOLDER_PRICES : prix de REMPLISSAGE, cohérents mais FICTIFS. Ils ne
// sont jamais présentés comme réels (la fiche produit dit « Prix de
// démonstration ») et sont listés dans site/A_COMPLETER.md et site/seed/README.md.
export const PLACEHOLDER_PRICES = {
  "crousty-sauce-curry-maison": 950,
  "crousty-mixte": 950,
  "nems-poulet": 500,
  "tenders-de-poulet": 650,
  "tiramisu-nutella": 450,
  "dada-mojito": 350,
  "calypso-ocean-blue": 350,
}

/** Prix relevés (à confirmer), distincts des placeholders. */
export const SOURCED_PRICES = {
  "crousty-sauce-blanche-maison": 900, // presse, Strasbourg, avril 2026
}

const PRICE_NOTE_DEMO = "Prix de démonstration, à confirmer."
const PRICE_NOTE_SOURCED = "Prix relevé à Strasbourg en avril 2026, à confirmer."
const DETAILS_NOTE = "Grammage et allergènes : à confirmer."

export const CATEGORIES = [
  {
    slug: "les-crousty",
    name: "Les Crousty",
    description: fr("Les barquettes chaudes. Riz, poulet croustillant, sauce maison : la base."),
    imageUrl: "/photos/crousty-blanche.webp",
    sortOrder: 0,
  },
  {
    slug: "les-petits-plus",
    name: "Les petits plus",
    description: fr("Pour accompagner ta barquette. Ou pour partager, si t'es d'humeur."),
    imageUrl: "/photos/tenders.webp",
    sortOrder: 1,
  },
  {
    slug: "dessert",
    name: "Dessert",
    description: fr("Parce qu'il reste toujours une petite place."),
    imageUrl: "/photos/tiramisu.webp",
    sortOrder: 2,
  },
  {
    slug: "boissons",
    name: "Boissons",
    description: fr("De quoi faire passer le croustillant."),
    imageUrl: "/photos/dada-mojito.webp",
    sortOrder: 3,
  },
]

function priceOf(slug) {
  const price = SOURCED_PRICES[slug] ?? PLACEHOLDER_PRICES[slug]
  if (price === undefined) throw new Error(`Pas de prix pour ${slug}`)
  return price
}

function describe(slug, text) {
  const note = slug in SOURCED_PRICES ? PRICE_NOTE_SOURCED : PRICE_NOTE_DEMO
  return fr(`${text} ${note} ${DETAILS_NOTE}`)
}

export const PRODUCTS = [
  {
    slug: "crousty-sauce-blanche-maison",
    category: "les-crousty",
    name: "Crousty sauce blanche maison",
    text: "La barquette chaude version sauce blanche : riz fondant, poulet frit ultra croustillant, sauce blanche maison. Tu mélanges, tu croques, t'es bien.",
    image: "/photos/crousty-blanche.webp",
    isFeatured: true,
    trending: true,
  },
  {
    slug: "crousty-sauce-curry-maison",
    category: "les-crousty",
    name: "Crousty sauce curry maison",
    text: "La même barquette, autre ambiance : riz, poulet frit croustillant et sauce curry maison. Pour celles et ceux qui aiment quand ça a du caractère.",
    image: "/photos/crousty-curry.webp",
    isFeatured: true,
    trending: true,
  },
  {
    slug: "crousty-mixte",
    category: "les-crousty",
    name: "Crousty mixte",
    text: "Tu sais pas choisir ? Normal. Les deux sauces maison, blanche ET curry, sur ta barquette riz et poulet croustillant.",
    image: "/photos/crousty-mixte.webp",
    isFeatured: true,
    trending: true,
  },
  {
    slug: "nems-poulet",
    category: "les-petits-plus",
    name: "Nems poulet",
    text: "Des nems au poulet à grignoter à côté de ta barquette. Ou avant. On juge pas.",
    image: "/photos/nems.webp",
    isFeatured: false,
    trending: false,
  },
  {
    slug: "tenders-de-poulet",
    category: "les-petits-plus",
    name: "Tenders de poulet",
    text: "Des tenders de poulet, à partager. Enfin, en théorie.",
    image: "/photos/tenders.webp",
    isFeatured: false,
    trending: true,
  },
  {
    slug: "tiramisu-nutella",
    category: "dessert",
    name: "Tiramisu Nutella",
    text: "Le tiramisu au Nutella pour finir en douceur. La petite place, tu l'avais, avoue.",
    image: "/photos/tiramisu.webp",
    isFeatured: false,
    trending: false,
  },
  {
    slug: "dada-mojito",
    category: "boissons",
    name: "Dada Mojito",
    text: "La boisson Dada Mojito, bien fraîche. Contenance : à confirmer.",
    image: "/photos/dada-mojito.webp",
    isFeatured: false,
    trending: false,
  },
  {
    slug: "calypso-ocean-blue",
    category: "boissons",
    name: "Calypso Ocean Blue",
    text: "La boisson Calypso Ocean Blue, pour faire une pause entre deux bouchées. Contenance : à confirmer.",
    image: "/photos/calypso.webp",
    isFeatured: false,
    trending: false,
  },
].map(({ text, ...p }, index) => ({
  ...p,
  price: priceOf(p.slug),
  isPlaceholderPrice: p.slug in PLACEHOLDER_PRICES,
  description: describe(p.slug, text),
  sortOrder: index,
  // 10 % : vente à consommer immédiatement. À CONFIRMER par produit.
  taxRate: 10,
}))

// ── Médias (bibliothèque CMS) ───────────────────────────────────────────────
// Le CMS référence une image par un id `cmsMedia`, dont l'URL est servie telle
// quelle. Une URL relative `/photos/….webp` passe. Les fichiers sont des
// illustrations générées par IA, construites par `site/tools/images.mjs`
// (sources dans `site/source/generated/`, rôles dans `site/IMAGES_A_GENERER.md`).
export const MEDIA = {
  hero: { url: "/brand/scenes/hero-16x9.webp", filename: "hero-16x9.webp", width: 1920, height: 1080 },
  cta: { url: "/photos/cta.webp", filename: "cta.webp", width: 1536, height: 864 },
  about1: { url: "/photos/about-1.webp", filename: "about-1.webp", width: 1024, height: 1024 },
  about2: { url: "/photos/about-2.webp", filename: "about-2.webp", width: 1024, height: 1024 },
  blog1: { url: "/photos/blog-1.webp", filename: "blog-1.webp", width: 1536, height: 864 },
  blog2: { url: "/photos/blog-2.webp", filename: "blog-2.webp", width: 1536, height: 864 },
  blog3: { url: "/photos/blog-3.webp", filename: "blog-3.webp", width: 1536, height: 864 },
  blog4: { url: "/photos/blog-4.webp", filename: "blog-4.webp", width: 1536, height: 864 },
}

// ── Pages CMS ───────────────────────────────────────────────────────────────
// Valeurs de champ au format du CMS. `{mot}` colore le mot dans un titre.
const t = (s) => ({ type: "text", textValue: fr(s) })
const rt = (html) => ({ type: "richtext", textValue: fr(html) })
const sel = (s) => ({ type: "select", textValue: s })
/** Image : `media` est une clé de MEDIA, résolue en id par `run.mjs`. */
const img = (media, alt) => ({ type: "image", media, altText: fr(alt) })

const seo = (title, description) => ({
  metaTitle: t(title),
  metaDescription: t(description),
  robots: sel("index, follow"),
})

export const CMS_PAGES = [
  {
    pageSlug: "homepage",
    blocks: {
      seo: seo(
        "Tasty Crousty, l'original. Commande en click & collect",
        "Riz fondant, poulet frit croustillant, sauce maison : commande ta barquette Tasty Crousty en click & collect et passe la récupérer sans attendre.",
      ),
      hero: {
        badge: t("La barquette qui a retourné TikTok"),
        title: t("Riz. Poulet. {Crousty.}"),
        subtitle: t(
          "Riz fondant, poulet frit ultra croustillant, sauce maison. Une barquette qui déborde, zéro prise de tête. Tu commandes, tu passes, tu croques.",
        ),
        image: img(
          "hero",
          "Illustration d'une barquette Tasty Crousty : riz, poulet frit croustillant et sauce maison",
        ),
        ctaLabel: t("Trouve ton tasty"),
      },
      features: {
        feature1Label: t("Ingrédients XXL"),
        feature2Label: t("Générosité max"),
        feature3Label: t("Prix imbattable"),
        feature4Label: t("Sauce maison, blanche ou curry"),
        feature5Label: t("Tu commandes, tu récupères"),
      },
      trendingMeals: {
        sectionTitle: t("Les {stars} de la barquette"),
        viewAllLabel: t("Toute la carte"),
      },
      categories: {
        badge: t("La carte"),
        sectionTitle: t("Trouve ton {tasty}"),
        description: t(
          "Des barquettes, des petits plus, un dessert et de quoi faire descendre. Court, efficace, comme on aime.",
        ),
      },
      cta: {
        badge: t("Click & collect"),
        title: t("Ton crousty. {Sans attendre.}"),
        subtitle: t(
          "Tu choisis ta barquette, tu commandes, tu passes la prendre au comptoir encore chaude. Paiement en espèces sur place (démo).",
        ),
        buttonText: t("Je commande"),
        backgroundImage: img("cta", "Illustration : un sac kraft tendu par-dessus un comptoir lumineux rose et cyan, prêt à être récupéré"),
      },
      blog: {
        sectionTitle: t("Le mag {Crousty}"),
        viewAllLabel: t("Tous les articles"),
      },
    },
  },
  {
    pageSlug: "about",
    blocks: {
      seo: seo(
        "Notre histoire, Tasty Crousty",
        "Un premier resto à L'Haÿ-les-Roses à l'été 2023, un seul plat en barquette, et un réseau qui grandit. L'histoire de Tasty Crousty.",
      ),
      hero: {
        badge: t("Notre histoire"),
        title: t("Le bonheur est dans les choses {simples.}"),
        subtitle: t("Un plat. Une barquette. Et une idée fixe : te servir généreux."),
      },
      story: {
        badge: t("Été 2023"),
        title: t("Tout part de {L'Haÿ-les-Roses}"),
        description: rt(
          "<p>Été 2023, premier resto à L'Haÿ-les-Roses. À la carte : un seul plat. Du riz, du poulet frit croustillant et une sauce maison, le tout dans une barquette. Pas de carte de douze pages, pas de chichis.</p>" +
            "<p>La barquette a ensuite beaucoup tourné sur TikTok, et de partage en partage, le crousty s'est fait connaître bien au-delà de son quartier.</p>" +
            "<p>Aujourd'hui, Tasty Crousty grandit en franchise et de nouvelles ouvertures arrivent. Les villes attendent leur ouverture. On arrive, partout, et toujours généreux.</p>",
        ),
        image: img("about1", "Illustration : un panier de poulet croustillant sort de la friteuse, en cuisine, la nuit"),
      },
      values: {
        badge: t("Ce qui compte"),
        title: t("Simple. Généreux. {Crousty.}"),
        value1Title: t("Ingrédients XXL"),
        value1Description: t("Une barquette qui cale vraiment. C'est la base, et on ne transige pas dessus."),
        value2Title: t("Générosité max"),
        value2Description: t("Ici, on ne pèse pas l'amour. On le sert. Et ça se voit dans la barquette."),
        value3Title: t("Prix imbattable"),
        value3Description: t("Bien manger sans vider ton compte : c'est la promesse de la maison."),
      },
      cta: {
        title: t("Prêt à trouver ton {tasty} ?"),
        subtitle: t("Choisis ta barquette, commande en click & collect et passe la récupérer en boutique."),
        buttonText: t("Voir la carte"),
      },
    },
  },
  {
    pageSlug: "contact",
    blocks: {
      seo: seo(
        "Contact, Tasty Crousty",
        "Une question ou une idée sur Tasty Crousty ? Écris-nous : contact@tastycrousty.io.",
      ),
      hero: {
        badge: t("Contact"),
        title: t("On t'{écoute.}"),
        subtitle: t(
          "Une question, une idée, un mot doux pour la sauce ? Écris à contact@tastycrousty.io. Pas de numéro central : le téléphone de la boutique de Strasbourg est sur sa fiche (à confirmer).",
        ),
      },
      form: {
        heading: t("Envoie-nous un message"),
        description: t(
          "Remplis le formulaire, on te lit.",
        ),
        submitLabel: t("Envoyer"),
      },
      info: {
        addressTitle: t("La boutique"),
        hoursTitle: t("Horaires (à confirmer)"),
        contactTitle: t("Nous joindre"),
      },
    },
  },
  {
    pageSlug: "menu",
    blocks: {
      seo: seo(
        "La carte, Tasty Crousty",
        "Les Crousty sauce blanche, curry ou mixte, les petits plus, le dessert et les boissons. Commande en click & collect.",
      ),
      header: {
        title: t("La {carte}"),
        subtitle: t(
          "Barquettes, petits plus, dessert, boissons. Tu choisis, tu commandes, tu récupères. Les prix « de démonstration » sont fictifs.",
        ),
      },
      emptyState: {
        title: t("La carte arrive"),
        subtitle: t("Les barquettes chauffent. Reviens dans un instant."),
      },
    },
  },
  {
    pageSlug: "blog",
    blocks: {
      seo: seo(
        "Le mag Crousty, Tasty Crousty",
        "Les coulisses de la barquette Tasty Crousty : le format, les sauces, l'histoire et la boutique de Strasbourg.",
      ),
      hero: {
        badge: t("Le mag"),
        title: t("Le mag {Crousty}"),
        subtitle: t("Les coulisses de la barquette, sans blabla."),
      },
      emptyState: {
        title: t("Rien à lire pour l'instant"),
        subtitle: t("Les articles arrivent. Va plutôt voir la carte en attendant."),
      },
    },
  },
  {
    pageSlug: "storefront-layout",
    blocks: {
      seo: seo(
        "Tasty Crousty",
        "Tasty Crousty, l'original : riz fondant, poulet frit croustillant, sauce maison. Commande en click & collect.",
      ),
      branding: {
        brandName: t("Tasty Crousty"),
      },
      header: {
        brandName: t("Tasty Crousty"),
        menuLabel: t("La carte"),
        cartLabel: t("Panier"),
        accountLabel: t("Mon compte"),
        signinLabel: t("Connexion"),
      },
      footer: {
        tagline: t("Tasty Crousty, l'original. Le bonheur est dans les choses simples."),
        copyrightText: t("© 2026 Tasty Crousty. Site de démonstration."),
      },
      // Titres seulement : sans lien saisi, la colonne garde les liens du
      // moteur PLUS ceux déclarés dans site/routes.ts. En saisir ici les
      // remplacerait (pages custom comprises).
      footerNav: { display: sel("show"), title: t("Explorer") },
      footerUseful: { display: sel("show"), title: t("Infos utiles") },
      // Réseaux sociaux : volontairement VIDES (aucun lien).
    },
  },
  {
    pageSlug: "legal-notice",
    blocks: {
      seo: seo("Mentions légales, Tasty Crousty", "Mentions légales du site de démonstration Tasty Crousty."),
      content: {
        intellectualProperty: rt(
          "<p>Visuels : illustrations générées par IA pour la démonstration (« Illustration générée par IA »), aucune photo de la marque n'est reprise. Le logotype est un dessin de démonstration, pas le logo officiel de la marque.</p>" +
            "<p>Les textes de ce site ont été rédigés pour la démonstration. Les marques citées appartiennent à leurs titulaires respectifs.</p>",
        ),
        additional: rt(
          "<p><strong>Site de démonstration.</strong> L'identité de l'éditeur (dénomination, forme, siège, immatriculation, directeur de la publication) et l'hébergeur sont à confirmer : les champs marqués « À confirmer » ne sont pas des informations officielles.</p>" +
            "<p>Contact : contact@tastycrousty.io. Franchise : franchise@tastycrousty.io.</p>",
        ),
      },
    },
  },
  {
    pageSlug: "terms-of-sale",
    blocks: {
      seo: seo("Conditions générales de vente, Tasty Crousty", "CGV du site de démonstration Tasty Crousty."),
      clauses: {
        ordering: rt(
          "<p>Tu commandes en ligne pour un retrait en boutique (click & collect) ou pour manger sur place. La commande est confirmée à l'écran. Les prix affichés sont TTC. Sur ce site de démonstration, les prix marqués « Prix de démonstration » sont fictifs et à confirmer.</p>",
        ),
        delivery: rt(
          "<p>Livraison : non disponible à l'ouverture. Retrait en boutique uniquement, aux horaires affichés (à confirmer).</p>",
        ),
        cancellation: rt(
          "<p>Annulation, réclamations et remboursements : politique à confirmer auprès de la marque. En attendant, écris à contact@tastycrousty.io.</p>",
        ),
        additional: rt(
          "<p>Paiement : en espèces au retrait, en mode démonstration. Aucun paiement en ligne n'est encaissé sur ce site.</p>" +
            "<p>Vendeur : entité légale à confirmer.</p>",
        ),
      },
    },
  },
  {
    pageSlug: "privacy-policy",
    blocks: {
      seo: seo("Confidentialité, Tasty Crousty", "Politique de confidentialité du site de démonstration Tasty Crousty."),
      content: {
        additional: rt(
          "<p>Ce site est une démonstration : n'y saisis pas de vraies données personnelles. Responsable du traitement : à confirmer. Pour toute question : contact@tastycrousty.io.</p>",
        ),
      },
    },
  },
]

// ── Blog ────────────────────────────────────────────────────────────────────
export const BLOG_CATEGORY = {
  name: "Le mag Crousty",
  description: fr("Les coulisses de la barquette."),
}

const p = (...paragraphs) => paragraphs.map((x) => `<p>${x}</p>`).join("")

export const BLOG_ARTICLES = [
  {
    slug: "pourquoi-la-barquette-et-pourquoi-ca-marche",
    title: "Pourquoi la barquette, et pourquoi ça marche",
    excerpt:
      "Riz, poulet frit croustillant, sauce maison, le tout dans une barquette. Un format tout simple, et c'est justement pour ça qu'il fonctionne.",
    cover: "blog1",
    coverAlt: "Illustration d'une barquette Tasty Crousty vue de dessus",
    content: p(
      "Au départ, il n'y avait qu'un seul plat. Du riz, du poulet frit croustillant, une sauce maison. Et pour emballer tout ça : une barquette. Pas d'assiette, pas de plateau, pas de mode d'emploi.",
      "La barquette, c'est le format qui va avec ta vie. Tu la prends au comptoir, tu la manges sur place ou tu l'emportes. Le riz en dessous, le poulet par-dessus, la sauce qui relie le tout : chaque bouchée a tout ce qu'il faut.",
      "Et comme il n'y a pas cinquante choix, tu ne passes pas dix minutes devant la carte. Tu choisis ta sauce, tu commandes, c'est réglé. Le bonheur est dans les choses simples, on te l'avait dit.",
      "Bref, la barquette n'est pas un détail d'emballage : c'est l'idée de départ. Et franchement, on n'a jamais trouvé mieux.",
    ),
  },
  {
    slug: "blanche-ou-curry-le-grand-debat",
    title: "Blanche ou curry : le grand débat",
    excerpt:
      "Il y a la team sauce blanche, la team curry, et ceux qui prennent la mixte pour éviter les embrouilles. Et toi, t'es de quel côté ?",
    cover: "blog2",
    coverAlt: "Illustration de deux barquettes côte à côte, l'une sauce blanche, l'autre sauce curry",
    content: p(
      "C'est LE sujet qui divise les groupes d'amis. D'un côté, la sauce blanche maison. De l'autre, la sauce curry maison. Entre les deux, aucune trêve.",
      "La team blanche te dira que c'est l'équilibre parfait avec le poulet croustillant. La team curry te répondra que la vie est trop courte pour manger sans caractère. Les deux ont raison, et c'est bien le problème.",
      "Et puis il y a les diplomates. Ceux qui ne veulent fâcher personne et qui prennent la Crousty mixte, blanche ET curry dans la même barquette. Lâche ? Malin ? On te laisse juger.",
      "Notre conseil : goûte les trois, puis choisis ton camp. Ou change d'avis à chaque commande, personne ne tient les comptes.",
    ),
  },
  {
    slug: "du-premier-resto-a-ton-ecran",
    title: "Du premier resto à ton écran : l'histoire d'un plat unique",
    excerpt:
      "Été 2023, L'Haÿ-les-Roses : un premier resto, un seul plat en barquette. Puis TikTok s'en est mêlé, et le crousty a voyagé.",
    cover: "blog3",
    coverAlt: "Illustration d'un téléphone affichant une barquette Tasty Crousty",
    content: p(
      "L'histoire commence à l'été 2023, à L'Haÿ-les-Roses. Un premier restaurant ouvre avec une carte qui tient en une ligne : du riz, du poulet frit croustillant et une sauce maison, servis en barquette.",
      "Un plat unique, c'est un pari. Pas de plan B, pas de carte à rallonge pour se rattraper. Juste une recette, et l'envie de la servir généreusement.",
      "Ensuite, TikTok s'en est mêlé. La barquette s'est retrouvée partout dans les fils, partagée, commentée, re-partagée. De quoi faire connaître le crousty bien au-delà de sa ville de départ.",
      "Depuis, le réseau grandit en franchise et de nouvelles ouvertures arrivent. La recette de départ, elle, n'a pas changé d'idée : faire simple, et faire généreux.",
    ),
  },
  {
    slug: "strasbourg-premiere-boutique-de-la-demo",
    title: "Strasbourg, première boutique de la démo : ce qu'il faut savoir",
    excerpt:
      "Adresse, horaires, sur place ou à emporter : tout ce qu'il faut savoir sur Tasty Crousty Strasbourg (Esplanade), la boutique de cette démo.",
    cover: "blog4",
    coverAlt: "Illustration d'une boutique à néon rose dans une rue pavée de Strasbourg, la nuit",
    content: p(
      "Sur ce site de démonstration, une seule boutique est ouverte à la commande : Tasty Crousty Strasbourg (Esplanade), au 12 rue de Rome, 67000 Strasbourg. Ces infos viennent de la presse : elles sont à confirmer.",
      "Côté horaires, la presse (avril 2026) annonce : du lundi au jeudi de 11 h à minuit, le vendredi de 15 h à minuit, le samedi et le dimanche de 11 h à minuit. Là aussi, à confirmer avant de te déplacer.",
      "Tu peux manger sur place ou emporter ta barquette en click & collect : tu commandes ici, tu passes la récupérer. La livraison, elle, n'est pas prévue à l'ouverture.",
      "Le téléphone de la boutique, relevé dans la presse : +33 7 49 28 02 76 (à confirmer). Pour une question générale, écris à contact@tastycrousty.io.",
    ),
  },
].map((a) => ({
  ...a,
  title: fr(a.title),
  excerpt: fr(a.excerpt),
  coverAlt: fr(a.coverAlt),
  content: fr(a.content),
}))

// ── Garde-fous ──────────────────────────────────────────────────────────────
const FORBIDDEN = [
  { re: /[—–]/, why: "tiret cadratin ou demi-cadratin" },
  { re: /halal/i, why: "mention halal" },
  { re: /inventeur/i, why: "« inventeur du crousty »" },
  { re: /millions? de vues/i, why: "chiffre de vues" },
  { re: /instagram\.com|tiktok\.com|facebook\.com/i, why: "lien réseau social" },
]

/** Lève une erreur si une chaîne visible enfreint les règles de rédaction. */
export function assertTypography() {
  const strings = []
  const walk = (value) => {
    if (typeof value === "string") strings.push(value)
    else if (Array.isArray(value)) value.forEach(walk)
    else if (value && typeof value === "object") Object.values(value).forEach(walk)
  }
  walk([STORE, CATEGORIES, PRODUCTS, CMS_PAGES, BLOG_CATEGORY, BLOG_ARTICLES, GLOBAL_SETTINGS])
  const problems = []
  for (const s of strings) {
    for (const { re, why } of FORBIDDEN) if (re.test(s)) problems.push(`${why} : ${s.slice(0, 80)}`)
    if (/ [:;!?€»]/.test(s) || /« /.test(s)) problems.push(`espace sécable mal placée : ${s.slice(0, 80)}`)
  }
  if (problems.length) throw new Error(`Typographie refusée :\n- ${problems.join("\n- ")}`)
}
