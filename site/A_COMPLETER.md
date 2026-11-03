# À compléter

| Sujet | Où | Statut | Source/raison |
| --- | --- | --- | --- |
| Entité légale (dénomination, forme, RCS/SIREN, siège) | Admin, Paramètres, Facturation ; `site/seed/data.mjs` (`GLOBAL_SETTINGS.seller`) | À confirmer | Trois pistes contradictoires, non tranchées. Siège laissé vide (page : « non communiqué ») |
| Directeur de la publication, hébergeur | Admin, Paramètres, Mentions légales ; `siteLegal` | À confirmer | Inconnus |
| Médiateur de la consommation | Admin, Paramètres, Mentions légales | À confirmer | Inconnu (la page affiche « non communiqué ») |
| Adresse de la boutique Strasbourg (12 rue de Rome, 67000) | Boutique `strasbourg-esplanade` | À confirmer | Source presse |
| Téléphone boutique +33 7 49 28 02 76 | Boutique `strasbourg-esplanade` | À confirmer | Source presse |
| Horaires (lun.-jeu. 11 h-minuit, ven. 15 h-minuit, sam.-dim. 11 h-minuit) | Boutique + réglages généraux | À confirmer | Presse, avril 2026 |
| Prix barquette sauce blanche 9 € | Produit `crousty-sauce-blanche-maison` | À confirmer | Presse, Strasbourg, avril 2026 |
| Prix curry 9,50 €, mixte 9,50 €, nems 5 €, tenders 6,50 €, tiramisu 4,50 €, boissons 3,50 € | `PLACEHOLDER_PRICES` dans `site/seed/data.mjs` | PLACEHOLDER | Prix de démonstration, aucun prix public |
| Taux de TVA (10 % partout) | Produits | À confirmer | Choix par défaut (consommation immédiate) |
| Grammage des barquettes (400 à 730 g cités) | Fiches produits | À confirmer | Presse, non confirmé : aucun chiffre affiché |
| Formules | Carte | À confirmer | Non publiées, rien créé |
| Allergènes | Fiches produits | À confirmer | Non publiés : liste vide, texte « à confirmer » |
| Contenance des boissons | Fiches Dada Mojito, Calypso Ocean Blue | À confirmer | Inconnue |
| Coordonnées GPS de la boutique | Boutique | À confirmer | Non fournies, non inventées (pas de géolocalisation) |
| Club Crousty (seuils de points, récompenses) | Texte uniquement | À confirmer | Seuils non publiés ; le moteur n'a pas de programme de points |
| Jeu QR sur la barquette (dessert ou sauce) | Non paramétré | À confirmer | Le moteur a un jeu (roue / grattage + QR) mais probabilités et lots inconnus |
| FAQ « Est-ce halal ? » | Non créée | À confirmer | Le moteur n'a pas de bloc FAQ dans le CMS |
| Politique d'annulation et de réclamation | CGV, bloc `clauses.cancellation` | À confirmer | Inconnue |
| Responsable du traitement (RGPD) | Politique de confidentialité | À confirmer | Entité légale inconnue |
| Dates des articles de blog | Blog | À vérifier | Datés du jour du premier seed : le moteur fixe `publishedAt` à la publication |
| Page /franchise : conditions financières, zones disponibles | `site/components/pages/FranchisePage.tsx` | À confirmer | Aucun montant ni nombre de boutiques publié ; rien affiché |
| Page /franchise : durée et lieu de la formation | `FranchisePage.tsx` (étape 3) | À confirmer | Inconnus |
| Page /franchise : apport, expérience exigée, critères exacts du profil | `FranchisePage.tsx` (profil recherché) | À confirmer | Inconnus ; profil rédigé en termes généraux |
| Page /franchise : formulaire de candidature | `site/components/pages/FranchiseForm.tsx` | Démo | Validation navigateur seulement, rien n'est envoyé ni stocké ; contact réel = franchise@tastycrousty.io (adresse à confirmer par la marque) |
| Page /club-crousty : points par commande, seuil du dessert offert, autres récompenses, validité des points, nombre de cases de la carte | `site/components/pages/ClubCroustyPage.tsx` | À confirmer | Barème non publié ; page marquée « programme de démonstration » |
| Page /club-crousty : règlement et fréquence des gains du jeu QR | `ClubCroustyPage.tsx` | À confirmer | Inconnus |
| Page /restaurant : téléphone et horaires affichés | `site/components/pages/RestaurantPage.tsx`, `OpeningHours.tsx` (codés en dur, pas lus du CMS) | À confirmer | Presse, avril 2026 ; à aligner si la boutique change dans l'admin |
| Page /restaurant : photo réelle de la façade | `Facade.tsx` (`/brand/scenes/devanture.webp`, illustration générée par IA) | À fournir | Aucune photo de la marque |
| Page /commander : paiement en espèces au retrait uniquement | `site/components/pages/CommanderPage.tsx` | Démo | Mention « aucune vraie commande » affichée |
