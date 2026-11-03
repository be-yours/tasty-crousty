# Rapport : site démo Tasty Crousty (web uniquement)

Démonstration de prospection pour le Salon de la Street Food (Villepinte, 7-8 novembre 2026). Marque seule, version web, design créé de zéro (`--blank`, aucun gabarit du catalogue, aucun `mobile/`). Rien n'est publié, déployé, commité ni partagé.

**Historique :** la première version (« Barquette Pop », fond clair pastel, illustrations SVG plates) a été refusée par l'utilisateur le 2026-11-03, écrite sans avoir regardé une seule photo de la marque. Elle est archivée dans `site/source/archive/barquette-pop/` et jamais remise en service. La refonte repart de la marque réelle : voir `site/BRAND_RESEARCH.md`.

## Lancer le site en local
Pré-requis : le moteur lié au commit `9ce1d4d0` (worktree `/Users/admin/Desktop/Dev/agence/beyours-luks`, partagé avec Lüks), puis :

```bash
pnpm engine:link /Users/admin/Desktop/Dev/agence/beyours-luks
CONVEX_AGENT_MODE=anonymous node node_modules/convex/bin/main.js dev --local-cloud-port 3310 --local-site-port 3311
pnpm convex:env                                  # pousse .env.convex (valeurs de test)
node node_modules/next/dist/bin/next dev --webpack --port 3510   # Turbopack bute sur les polices en mode lien
node site/seed/run.mjs                           # données, rejouable (--only=pages,blog)
node site/seed/verify.mjs                        # menu, panier, commande en espèces
```
Toujours `http://localhost:3510` (jamais 127.0.0.1). `.env.local` et `.env.convex` ne sont pas versionnés. Après un seed, recharger le navigateur. Comptes de démo : `site/seed/README.md`.

Contournement jsdom (article de blog en 500 en mode lien) : `mkdir -p .next/browser && cp node_modules/.pnpm/jsdom@29.*/node_modules/jsdom/lib/jsdom/browser/default-stylesheet.css .next/browser/` (à refaire après tout effacement de `.next`).

## Direction artistique : « Vice City Crousty »
Contrat complet : `site/ART_DIRECTION.md`. La marque est de nuit : façade noire, enseigne néon rose, soleil couchant à trois palmiers, mur turquoise, comptoir LED en losanges, ballons, sacs kraft, TikTok jeune et drôle.
- **Nuit par défaut** (une ligne de `site.config.ts` : thème par défaut `dark`). Le mode clair est « l'intérieur » : mur turquoise plein, dalles blanches, encre, rose. Pas de pastel.
- **Signatures :** tubes néon, soleil rayé à palmiers, sol quadrillé en perspective (canvas à l'accueil), panneau LED en losanges, bandeau rose incliné, pastilles de sous-titres TikTok, sac kraft, ballons.
- **Une scène 3D par page, courte :** accueil (coucher de soleil, sol qui file, parallaxe), carte (comptoir LED, cartes qui s'inclinent de 6° au plus), boutique (devanture en perspective, enseigne néon lettre par lettre, panneau OUVERT/FERMÉ selon l'heure de Paris), commander (tableau LED et sac kraft qui se remplit), club (carte de membre qui se retourne, ballons), franchise (façade qui s'assemble), à propos (cadres 9:16 en éventail), blog, contact, pages légales, connexion, 404.
- **Sans nouvelle dépendance** (ni three.js ni GSAP) : CSS 3D, canvas 2D, `animation-timeline` avec repli, JS dans `site/components/SiteEffects.tsx`. `prefers-reduced-motion` : l'état de repos est la composition finale.
- **Contraste :** le rose `#F578B0` n'est jamais un texte sur clair (2,56:1) ; sur nuit il fait 7,35:1. `pnpm design:check` passe.
- **Polices libres proches de l'esprit des enseignes** (celles de la marque ne sont pas libres) : Sofia Sans Extra Condensed, Plus Jakarta Sans, Yellowtail (script, deux mots au plus).
- **Logotype dessiné pour la démo** (script penché, soleil à palmiers, CROUSTY en capitales), pas le logo de la marque. La notice légale le dit.
- **Visuels générés** avec le MCP `studio` (modèle `openai/gpt-image-2`), listés dans `site/IMAGES_A_GENERER.md` et `site/tools/images.mjs` ; images WebP dans `public/photos/` et `public/brand/scenes/`. Coût estimé environ 2,9 USD (le modèle facture au jeton : le montant exact est sur le tableau de bord du Gateway). Aucun visage d'équipe reproduit, aucune photo copiée de la marque. Les 4 images de référence de l'utilisateur sont dans `site/source/reference/` et ne sont jamais servies.
- **Pages ajoutées** (routes `SITE-SPECIFIC` + `site/routes.ts`) : `/franchise` (lien dans le pied de page seulement, formulaire de démonstration qui valide et confirme sans rien envoyer, aucun montant), `/club-crousty`, `/restaurant`, `/commander`.

## Modifications hors fichiers de design (à connaître)
- `site.config.ts` : thème par défaut `dark` (une ligne, zone client).
- `site/seed/run.mjs` : type MIME déduit de l'extension (les images sont en WebP).
- Un dossier `.next/browser/` complété à la main pour jsdom (voir plus haut), non versionné.
- Fichiers modifiés par l'installation et qui ne doivent jamais être commités : `package.json`, `pnpm-lock.yaml`, `AGENTS.md` (réécrit par Next), `convex/_generated/*`.

## Hypothèses
- Horaires, téléphone et adresse de Strasbourg : source presse, marqués « à confirmer ». Seul prix « réel » : la barquette sauce blanche à 9 € (presse, avril 2026, à confirmer). Les autres prix sont des PLACEHOLDER (`site/A_COMPLETER.md`, `site/seed/data.mjs`).
- Entité légale, halal (jamais écrit sur le site, non confirmé), réseaux sociaux, allergènes, tailles, formules, barème du Club : « À confirmer » visibles, jamais tranchés.
- Pas de numéro WhatsApp repris (source indirecte), pas de chiffre d'abonnés ou de vues.
- Les dates des quatre articles sont celles du jour du seed.

## Vérifié (2026-11-03, après la refonte)
`pnpm design:check` (6 tests) vert, `tsc` sans erreur dans `site/`. Contrôle par un agent sur 18 pages × 375, 768 et 1440 px × nuit et clair (Chromium headless) : aucun défilement horizontal, aucune image cassée, aucune image plein écran sur téléphone ou tablette, un seul `h1` par page, aucun « halal », aucun montant de franchise, lien Franchise dans le pied de page seulement, focus clavier visible. Mouvement réduit (accueil, `/commander`, `/club-crousty`) : composition finale visible. WebKit (nuit, accueil et `/commander`, 3 largeurs) : rendu identique à Chromium. Parcours client : connexion, ajout au panier, `/cart`, `/checkout`, paiement espèces au retrait, confirmation, `/order`, `/track` : OK, boutique ouverte à ce moment.

Corrigé après ce contrôle : numéro de commande illisible la nuit sur `/order` et `/track` (règle dans `shop.css`), mention de l'e-mail franchise retirée du texte de `/contact`, espace insécable avant « : » sur `/restaurant`, accueil épargné par les règles de `/about`.

## Non vérifié ou connu
- Safari et iOS réels, Firefox, lecteur d'écran réel, Lighthouse, WebKit en mode clair, fluidité réelle des scènes sur appareil (le serveur de dev était très chargé).
- Le bandeau « boutique fermée » n'a pas été vu à l'écran (la boutique était ouverte). Hors horaires, le bouton d'ajout dit « Fermé » : comportement du moteur.
- `/account` connecté, `/sign-up` complet, mot de passe oublié : styles écrits d'après le balisage, non vus.
- Les e-mails (AWS factice) : aucun envoi n'est parti. Le tableau de bord admin n'a pas été ouvert dans un navigateur.
- Petits défauts visuels : le bas du soleil passe sur le sol quadrillé sous la dalle de `/sign-in` ; l'en-tête de `/menu` garde un rendu proche de l'ancien style ; les grands chiffres 1, 2, 3 du club en mode clair sont détourés d'encre (décoratifs).
- Erreur d'hydratation signalée par Next sur l'accueil (source non identifiée) et sur `/cgv` (moteur).

## Besoins moteur non couverts (aucun patch local)
- En-tête de `/menu` codé en dur (« Découvrez Notre Menu »), pied de page « Tous droits réservés » et libellé « Menu » qui ignorent le CMS (la page `menu` est `rendered: false` dans `cms/pages/menu.ts`).
- Textes du moteur au vouvoiement (paiement, écran de succès, « Ne manquez rien ») alors que le site tutoie ; « Votre Box ».
- La 404 racine (adresse sans route) est rendue hors de `.storefront-theme` : impossible à habiller depuis la zone client. Seule la 404 de la vitrine l'est.
- Tirets cadratins et espaces ordinaires avant `:` et `?` dans des textes moteur (pages légales par défaut, libellés de la carte, de la connexion) : hors zone client.
- Le lien de marque de l'en-tête n'a pas de nom accessible tant que le nom du site n'est pas arrivé de Convex (environ un tiers des chargements en dev).
- Pas de créneau de retrait (commande « maintenant » seulement), pas de programme de points (le Club est du texte), pas de bloc FAQ dans le CMS.
- Boutons icône du moteur sans libellé (fermeture de fiche, flèches du carrousel, retour du panier) : un nom français leur est ajouté par `SiteEffects.tsx`, correctif moteur souhaité.
- Le moteur ne fournit pas `sizes` sur ses images `fill` ; des clés i18n manquent (`nav.*`, `cart.*`) en console.
- `tests/storefront/site-nav.test.tsx` échoue en mode lien (deux copies de React) ; les tests du catalogue (`templates/`) échouent parce que `templates/` est vidé.
- Le HEAD du moteur est en avance sur le miroir boilerplate : lier le moteur exige le bon commit.
