# Checklist de lancement : Tasty Crousty (démo Be yours)

Ce site est une **démonstration de prospection** (marque seule, version web). Rien n'y est publié, déployé ni partagé. Ce qu'il faut obtenir de la marque avant d'aller plus loin, par ordre d'importance. Les points inconnus sont aussi listés dans `site/A_COMPLETER.md`.

## 1. Bloquants juridiques et de marque
- [ ] **Entité légale exacte** : trois pistes contradictoires (TASTY CROUSTY HOLDING, SIREN 935088401 ; « TASTY CROUSTY BY ALTIN HOLDING » ; franchiseur TASTY CROUSTY DEVELOPPEMENT). Qui édite le site de marque, qui est le franchiseur, qui est le vendeur par boutique ? Les mentions légales, CGV et la politique de confidentialité restent en « À confirmer » tant que ce n'est pas tranché (et à faire valider par le conseil de la marque).
- [ ] **Logo vectoriel officiel** (SVG) et charte (couleurs exactes, usages), droits d'utilisation. Le logotype du site est un dessin de démonstration, pas le logo de la marque.
- [ ] **Polices de marque** (Open Sauce One, Quicksilver, Rechteck) : fichiers et licences web. Le site utilise Bagel Fat One et DM Sans en remplacement.
- [ ] **Droits sur les photos** de la marque, et photos officielles des barquettes (le site n'utilise aucune photo : uniquement des illustrations vectorielles originales).
- [ ] **Mention halal** : la presse dit « halal », le site officiel ne dit rien et aucun certificat n'est publié. Demander le certificat (organisme, validité, périmètre par boutique) avant toute mention ou logo. Aucune mention n'apparaît sur la démo ; la FAQ répond « à confirmer ».
- [ ] **Litige « inventeur du crousty »** : validation des formules de l'histoire de la marque par la marque et son conseil (le site n'emploie pas cette formule).

## 2. Carte, prix et produits
- [ ] **Carte complète et prix par boutique** (les prix de la démo sont des PLACEHOLDER, sauf la barquette originale à 9 € relevée dans la presse, Strasbourg, avril 2026, à confirmer).
- [ ] **Tailles de barquette** (400 à 730 g cités par la presse), **formules**, suppléments, sauces.
- [ ] **Allergènes et informations nutritionnelles** par produit (obligation légale ; rien d'inventé sur la démo).
- [ ] Photos et noms exacts des boissons (Dada Mojito, Calypso Ocean Blue) et des desserts.

## 3. Boutiques
- [ ] **Liste officielle des boutiques** (le locator du site officiel affiche 88 adresses dont 9 hors France, la presse parle de 50 à 60 restaurants ouverts : chiffres à ne pas publier tant qu'ils ne sont pas confirmés), avec adresses, horaires, téléphone, modes (sur place, à emporter, livraison).
- [ ] **Boutique pilote Strasbourg (Esplanade)** : confirmer adresse (12 rue de Rome, 67000), téléphone (+33 7 49 28 02 76, source presse) et horaires (lundi au jeudi 11 h à minuit ; vendredi 15 h à minuit ; samedi et dimanche 11 h à minuit, source presse, avril 2026).
- [ ] **Liens Uber Eats par boutique** (et autres plateformes) si la marque veut les relier.
- [ ] Règle de commande par boutique : créneaux, délai de préparation, jours de fermeture, paiement (espèces au retrait, carte, etc.).

## 4. Commande et fidélité
- [ ] **État du pilote d'application** existant (agence tierce, 2 boutiques : retrait avec créneau, points « Club Crousty », paiement au retrait) : périmètre, calendrier, contrat, données. La démo se présente comme une commande de marque multi-boutiques, jamais comme un remplacement de cette app ; il faut décider si les deux coexistent, fusionnent ou se relaient.
- [ ] **Programme Club Crousty** : barème des points, seuils des récompenses, récompense « dessert offert », règles d'expiration, règlement et RGPD. (La démo n'affiche aucun chiffre.)
- [ ] **Jeu QR sur la barquette** : lots (dessert, sauce), probabilités, règlement du jeu, dates, mentions légales du jeu.

## 5. Réseaux sociaux, contacts, analytics
- [ ] **Comptes officiels** (Instagram, TikTok, Facebook, autres) : aucun lien vérifié, aucun lien affiché sur la démo.
- [ ] **Chiffres publiables** : revendication « plus de 400 millions de vues » non justifiée, nombre de restaurants non confirmé : fournir des chiffres datés et sourcés, ou ne rien afficher.
- [ ] Adresses de contact à confirmer (contact@tastycrousty.io, franchise@tastycrousty.io), téléphone central (aucun connu).
- [ ] Propriétaire du domaine, comptes Google (Search Console, Analytics) et du CMP/consentement.

## 6. Franchise
- [ ] Qui répond aux candidatures, sous quel délai ; le formulaire de la démo n'envoie ni ne stocke rien. Aucun montant n'est affiché (les sources se contredisent) : à fournir par la marque ou à ne pas publier.
- [ ] Obligations de transparence précontractuelle (DIP) : validation juridique de la page Franchise avant toute publication.

## 7. Technique (avant une vraie mise en ligne)
- [ ] Vrai backend Convex de production, vraies variables d'environnement (AWS S3 et SES du client : `pnpm ses:check`), Sentry du client.
- [ ] Remplacer les identifiants de démo, supprimer le compte de démo et le seed (`site/seed/`).
- [ ] Domaine, e-mails d'expédition vérifiés (DKIM, SPF), politique de cookies.
- [ ] Revue d'accessibilité complète (lecteur d'écran réel), tests sur appareils réels (iOS, Android).
- [ ] Image de partage (Open Graph) en PNG (non fournie) et favicon PNG/ICO.
