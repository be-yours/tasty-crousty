# Démo en ligne (privée)

Mise en ligne le 3 novembre 2026, à la demande de l'utilisateur, pour que l'équipe explore le site. Démonstration privée : données fictives, commandes réelles impossibles, aucun secret dans ce dossier.

## Adresses

| Élément | Valeur |
| --- | --- |
| Site (production) | https://tasty-crousty-beyours.vercel.app (alias aussi `tasty-crousty-two.vercel.app`) |
| Hébergement | Vercel, équipe « Be Yours » (`beyours`, offre Hobby), projet `tasty-crousty`. Aucun dépôt Git relié, aucun domaine personnalisé. |
| Backend | Convex, équipe `be-yours`, projet `tasty-crousty`, déploiement de **développement** dans le cloud `accomplished-possum-297` : `https://accomplished-possum-297.convex.cloud`, site HTTP `https://accomplished-possum-297.convex.site`. Règle du dossier : un Convex `dev` cloud, jamais de production avant la signature du client. |
| Dépôt GitHub | https://github.com/be-yours/tasty-crousty, **public**, une seule photo de l'état au 3 novembre 2026 (un commit). Il ne contient ni secret ni `site/source/` (donc pas les 4 images de référence de la marque). Il n'est relié ni à Vercel ni au poste : une copie, pas une source synchronisée. |

## Accès privé

Vercel Authentication couvre tous les déploiements (`ssoProtection: all`). Sans session Vercel de l'équipe, chaque adresse répond 302 vers `vercel.com/sso-api`.

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://tasty-crousty-beyours.vercel.app/   # 302 attendu
```

### Lien de partage pour les collègues

Secret « Protection Bypass for Automation » posé sur le PROJET. Lien : `https://tasty-crousty-beyours.vercel.app/?x-vercel-protection-bypass=<secret>&x-vercel-set-bypass-cookie=true` (dépose le cookie `_vercel_jwt`, 7 jours). Le secret ne figure dans aucun fichier suivi : il a été donné dans le chat. Le retrouver ou le révoquer : Vercel, projet `tasty-crousty`, Settings, Deployment Protection, Protection Bypass for Automation. Révoquer après la démo. Un en-tête HTTP `x-vercel-protection-bypass: <secret>` fonctionne aussi pour les scripts (quelques secondes de délai après la création).

## Redéployer

Le site se construit sur le poste. Le mode « moteur lié » (`pnpm engine:link`) casse le build Vercel (la racine de traçage sort du projet) : il faut le mode registre (`pnpm engine:unlink`, puis `pnpm install`, qui demande un `NODE_AUTH_TOKEN` ou, hors ligne, le store pnpm local avec `--offline --frozen-lockfile`).

```bash
vercel pull --yes --environment=production --scope beyours
# Les variables « Secret » sont tirées comme « [SENSITIVE] » : remplacer les valeurs de
# .vercel/.env.production.local par les vraies (le build en a besoin : next.config.ts valide
# AWS_S3_PUBLIC_BASE_URL, NEXT_PUBLIC_* est figé au build).
SKIP_NODE_AUTH_TOKEN_CHECK=1 vercel build --prod --scope beyours
python3 - <<'EOF'                                    # retirer les .env* tracés par Next
import json, glob, os
for f in glob.glob('.vercel/output/functions/**/.vc-config.json', recursive=True):
    if os.path.islink(f): continue
    d = json.load(open(f)); m = d.get('filePathMap') or {}
    bad = [k for k in m if os.path.basename(k).startswith('.env')]
    for k in bad: del m[k]
    if bad: json.dump(d, open(f, 'w'))
EOF
vercel deploy --prebuilt --prod --scope beyours
```

`.vercelignore` exclut `.work`, `site/source`, `.env*` de l'envoi. Si le code Convex change (`convex/`), pousser les fonctions : `npx convex dev --once` (déploiement `dev:accomplished-possum-297`, jamais `convex deploy`).

## Recharger le contenu

Le seed vise le déploiement Convex `dev` cloud et crée le compte admin par HTTP sur le site protégé : il lui faut donc l'en-tête de contournement.

```bash
CONVEX_DEPLOYMENT=dev:accomplished-possum-297 \
BETTER_AUTH_URL=https://tasty-crousty-beyours.vercel.app \
NEXT_PUBLIC_CONVEX_URL=https://accomplished-possum-297.convex.cloud \
node --import <préchargement qui ajoute x-vercel-protection-bypass à fetch> site/seed/run.mjs   # ou --only=pages,blog
```

Le `CONVEX_DEPLOYMENT` de `.env.local` porte un commentaire (`# team: …`) que le seed lit mal : le passer sur la ligne de commande. Contenu attendu : 1 boutique (Strasbourg Esplanade), 8 produits, 9 pages CMS, 4 articles, 2 comptes de démo (mots de passe `TASTY_SEED_*` dans `.env.local`).

## Variables d'environnement

Posées dans Vercel (Production, en « Secret ») et dans Convex (`dev` cloud). Les secrets (`BETTER_AUTH_SECRET`, `EMAIL_API_SECRET`, `ADMIN_BOOTSTRAP_TOKEN`, `ENCRYPTION_KEY`) ont été générés le 3 novembre 2026 pour la démo, différents de ceux du poste local, et ne sont écrits dans aucun fichier suivi.

Valeurs d'attente, à remplacer avant une vraie ouverture : AWS (S3 et SES) factices, `AWS_SES_FROM_EMAIL=demo@example.com` (aucun e-mail ne part, aucun fichier ne s'envoie), `OPENAI_API_KEY` factice, `AUTH_ALLOW_UNVERIFIED_EMAIL=true`, `NODE_OPTIONS=--experimental-require-module` (Vercel seulement : sans elle, les articles du blog répondent 500 à cause de `jsdom`). Aucune clé Stripe, PayPal, SumUp, Uber Eats ni Deliveroo : seul le paiement en espèces existe.

Hors des horaires de la boutique (lun.-jeu. et sam.-dim. 11 h-minuit, ven. 15 h-minuit, heure de Paris), le site affiche « fermé » et refuse les commandes : comportement voulu.

## Avant une vraie ouverture

Voir `site/A_COMPLETER.md` (entité légale, horaires, adresse, prix, allergènes) et la liste de `chicken-street/site/DEPLOYMENT.md` : accord écrit de la marque, secrets régénérés, AWS du client, vraie clé OpenAI ou traduction coupée, domaine personnalisé puis retrait de la protection, révocation du lien partageable.
