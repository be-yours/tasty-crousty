# Seed de démo Tasty Crousty

Remplit le backend local avec la boutique pilote, la carte, les pages CMS et le
blog de la démo. **Rejouable** : chaque lancement met à jour ce qui existe et
crée ce qui manque, sans doublon (boutique par slug, catégories et produits par
slug, médias par URL, articles par slug, pages CMS réécrites puis republiées).

## Lancer

```bash
# le site Next (BETTER_AUTH_URL) et Convex doivent tourner
node site/seed/run.mjs        # le seed
node site/seed/verify.mjs     # vérification dans Chromium (Playwright)
SHOTS_DIR=/tmp/shots node site/seed/verify.mjs   # avec captures
```

- `data.mjs` : les données pures (textes en français, prix, horaires, pages CMS,
  articles). Un garde-fou (`assertTypography`) refuse de lancer le seed si un
  texte contient un tiret cadratin ou demi-cadratin, une espace sécable avant
  `: ; ! ? € »`, ou une mention interdite (halal, « inventeur », nombre de vues,
  lien de réseau social).
- `run.mjs` : crée le compte admin par Better Auth, lui donne le rôle
  `client_admin` (`userProfiles:internalUpsert`, fonction interne existante),
  puis passe par les mutations **publiques** du moteur avec son jeton. Les
  médias passent par `cmsSeedData:createMediaRecord` (fonction interne
  existante) : la voie publique exige un upload S3, et l'AWS local est factice.
- `verify.mjs` : la carte affiche les 8 produits, un produit va au panier, le
  client de démo se connecte et passe une commande « à emporter » payée en
  espèces. Le paiement en espèces exige un compte (règle du moteur).

## Comptes de démo

| Rôle | E-mail | Mot de passe |
| --- | --- | --- |
| Admin (`client_admin`) | `admin.demo@tasty-crousty.test` | `TASTY_SEED_ADMIN_PASSWORD` dans `.env.local` |
| Client | `client.demo@tasty-crousty.test` | `TASTY_SEED_CUSTOMER_PASSWORD` dans `.env.local` |

Les mots de passe sont générés au premier lancement et écrits dans `.env.local`
(git-ignoré) **avant** la création des comptes. Better Auth ne sait pas les
réinitialiser d'ici : garde ce fichier. Domaine `.test` (RFC 2606) : aucune
adresse ne peut recevoir de courrier. L'admin se connecte sur `/sign-in` puis
ouvre `/dashboard`.

## Commander hors horaires

Le moteur refuse une commande en dehors des horaires de la boutique, lus à
l'heure de Paris (`globalSettings.timezone = Europe/Paris`) : lun.-jeu.
11 h-minuit, ven. 15 h-minuit, sam.-dim. 11 h-minuit. Le moteur n'a pas de
créneau de retrait différé : une commande se passe « maintenant ». Pour tester
en dehors de ces heures, il faut soit attendre l'ouverture, soit ouvrir
temporairement la journée dans l'admin (Paramètres, Horaires) puis relancer
`node site/seed/run.mjs`, qui remet les horaires de la démo. `verify.mjs`
s'arrête avant de commander (code 2) quand la boutique est fermée.

## Prix PLACEHOLDER (fictifs)

Seul prix relevé : **Crousty sauce blanche maison, 9 €** (Strasbourg, avril
2026, à confirmer). Tous les autres sont des prix de remplissage
(`PLACEHOLDER_PRICES` dans `data.mjs`), affichés « Prix de démonstration » sur
la fiche :

| Produit | Prix démo |
| --- | --- |
| Crousty sauce curry maison | 9,50 € |
| Crousty mixte | 9,50 € |
| Nems poulet | 5,00 € |
| Tenders de poulet | 6,50 € |
| Tiramisu Nutella | 4,50 € |
| Dada Mojito | 3,50 € |
| Calypso Ocean Blue | 3,50 € |

TVA : 10 % sur tous les produits (vente à consommer immédiatement), à confirmer.

## Images

Les produits portent un chemin relatif (`/photos/<nom>.svg`) dans `images`, les
blocs CMS et les couvertures d'articles un média `cmsMedia` dont l'URL est ce
même chemin relatif. `next/image` sert un `.svg` local tel quel (sans
optimisation, ni `remotePatterns` ni `dangerouslyAllowSVG` nécessaires). Les
fichiers eux-mêmes vivent dans `public/` et ne sont pas créés par ce seed.
