# Direction artistique : « Vice City Crousty »

Contrat pour tous les agents qui écrivent une feuille de `site/pages/`, un composant de `site/components/` ou le seed. Écrit le 2026-11-03 (phase 3, fondations) après le rejet de « Barquette Pop » (archivée dans `site/source/archive/barquette-pop/`, jamais remise en service). Sources lues : `site/REFONTE_BRIEF.md`, `site/BRAND_RESEARCH.md`, les 4 images de `site/source/reference/`.

Fichiers socle : `site/theme.css` (jetons), `site/fonts.ts`, `site/layout.ts`, `site/pages/base.css` (composants communs), `public/brand/*.svg`. Ne les réécrivez pas : ajoutez vos règles dans votre propre feuille et réutilisez les jetons ci-dessous.

## 1. Le concept en une phrase

**Tasty Crousty, c'est la rue la nuit à Miami version Paris 19 :** façade noire, enseigne néon rose, soleil couchant à trois palmiers, auvent et mur turquoise, comptoir LED en losanges, ballons, sacs kraft, et une bande qui parle comme sur TikTok. Le site est **de nuit par défaut**. Le mode clair, c'est **l'intérieur de la boutique** : mur turquoise plein, plafond noir, rose, blanc. Jamais de pastel, jamais de fond crème.

Ce que le site n'est pas : un fast-food propre et fade, un bistrot, une affiche pastel à plat, un thème sombre générique « néon gaming ». Les néons viennent de l'enseigne réelle, le turquoise du mur réel, le kraft des sacs réels.

## 2. Ce qui a été supposé (sans demander)

- La nuit est le mode par défaut : `site.config.ts` passe `theme.default` à `"dark"` (une ligne, zone client). Le visiteur garde le sélecteur de thème dans l'en-tête.
- Le logotype est un **dessin de démonstration** : « Tasty » en Yellowtail (OFL) vectorisé, rose à liseré blanc et contour encre ; soleil rayé à trois palmiers dessiné à la main ; « CROUSTY » en Anton (OFL) vectorisé, blanc à contour encre. Il ne copie pas le logo officiel et le seed le dit déjà dans les mentions.
- Les polices du site sont des Google Fonts libres proches de l'esprit des enseignes (les polices de la marque ne sont pas libres).
- Pas de logo dans le CMS pour l'instant : l'en-tête affiche le nom en texte, `base.css` le cache visuellement (il reste le nom accessible du lien) et peint `public/brand/logo.svg` derrière. Si le seed pose un logo CMS, la règle `:has(img)` prend le relais.
- Le rose de marque `#F578B0` n'est jamais un texte sur blanc ni sur turquoise (2,56:1 et 1,43:1). Sur fond clair, un mot rose s'écrit en `--tc-pink-deep` `#D41F7C` (4,90:1 sur blanc) ou devient une pastille rose à texte encre.
- Le bouton « pilule blanche à texte rose » du site officiel est rendu en `#D41F7C` sur blanc (4,90:1), pas en `#F578B0`.

## 3. Matière

- **Nuit** : noir chaud mat (`#141015`, la façade), dalles un cran plus claires (`#1C1917`), pied de page plus profond (`#0B080C`). Brume violette en haut de l'écran comme le reflet d'une enseigne.
- **Néon** : tubes rose, cyan, violet. Un tube = couleur pleine + halo en couches (`--tc-halo-*`), jamais un flou sur une grande surface.
- **Mur turquoise** (mode clair) : à plat, sans dégradé, comme la peinture du mur. Les dalles posées dessus sont blanches, avec une ombre sarcelle douce, sans cadre.
- **Panneau LED** : grille de losanges qui laisse passer un dégradé rose, violet, cyan (`.tc-led`).
- **Kraft** : le sac en papier, seule couleur chaude non néon (`.tc-kraft`).
- **Pastilles TikTok** : texte gras sur rose vif, bords arrondis, une ligne par pastille (`.tc-caption`).
- **Pilules** partout : barre de navigation, boutons, champs du pied de page.

Règles de forme : pas de cadre autour d'un élément rond ordinaire (boutons ronds de l'en-tête sans bordure) ; des dalles sur le fond, pas des feuilles encadrées ; tout cadre est entier (rien n'est coupé à ras de sa boîte : un soleil est toujours un disque complet) ; aucune chaîne de perles ni séparateur en perles (le séparateur du bandeau est le petit soleil `mark.svg`).

## 4. Palette (jetons) et contrastes AA calculés

Formule WCAG 2.1 (luminance relative). Tous les couples du moteur passent `pnpm design:check`.

### Couleurs brutes (identiques dans les deux modes, `theme.css`)

| Jeton | Valeur | Rôle |
| --- | --- | --- |
| `--tc-night` / `--tc-ink` | `#141015` | sol de nuit, encre |
| `--tc-night-2` | `#1C1917` | noir chaud de marque, dalles de nuit |
| `--tc-night-3` | `#0B080C` | pied de page, îlots très profonds |
| `--tc-white` | `#FFF5FA` | blanc des lettres |
| `--tc-pink` | `#F578B0` | rose néon de marque (remplissage sous encre, ou texte sur nuit) |
| `--tc-pink-deep` | `#D41F7C` | rose lisible sur blanc, fond du bandeau à texte blanc |
| `--tc-pink-soft` | `#FFA8F2` | rose clair (survol, haut du soleil) |
| `--tc-magenta` | `#FF2E9A` | lueur seulement, jamais un texte |
| `--tc-cyan` | `#5DD1E3` | turquoise de l'auvent et du mur |
| `--tc-blue-soft` | `#BAEEFF` | ballons bleu clair |
| `--tc-violet` | `#AA94FF` | violet des LED et des ballons |
| `--tc-violet-deep` | `#4A2AB0` | violet lisible sur clair |
| `--tc-peach` | `#FFB38A` | bas du soleil couchant |
| `--tc-kraft` / `--tc-kraft-dark` | `#C9955B` / `#8A5A2B` | sac kraft |

### Couleurs par mode

| Jeton | Nuit (défaut) | Clair « l'intérieur » |
| --- | --- | --- |
| `--tc-ground` (= `--background`) | `#141015` | `#5DD1E3` |
| `--tc-slab` (= `--card`) | `#1C1917` | `#FFFFFF` |
| `--tc-slab-2` (= `--secondary`) | `#272027` | `#A9E8F1` |
| `--tc-text` (= `--foreground`) | `#FFF5FA` | `#141015` |
| `--tc-text-2` (= `--muted-foreground`) | `#C9BCC5` | `#0E3A42` |
| `--tc-word` (= `--primary-ink`, un mot en couleur) | `#F784B8` | `#8A0B4C` |
| `--primary` (remplissage du moteur) | `#F578B0` | `#B3115F` |
| `--accent-solid` | `#AA94FF` | `#4A2AB0` |
| `--ring` (focus) | `#5DD1E3` | `#141015` |
| `--tc-bar-bg` / `--tc-bar-fg` (pilule d'en-tête) | cyan / encre | encre / blanc |
| `--tc-line` (filet) | blanc 14 % | encre 85 % |
| `--tc-glow` (0 à 1, multiplie les lueurs) | 1 | 0,45 |

L'administration reste blanche en mode clair (`:root`), seul `.storefront-theme` devient turquoise.

### Ratios clés (calculés)

Nuit, sur `#141015` : blanc `#FFF5FA` 17,67:1 · gris `#C9BCC5` 10,30:1 · rose `#F578B0` 7,35:1 · mot `#F784B8` 8,03:1 · cyan 10,49:1 · violet 7,53:1 · kraft 7,12:1 · bleu clair 15,04:1 · rose clair 10,89:1.
Nuit, sur dalle `#1C1917` : blanc 16,40:1 · rose 6,83:1 · cyan 9,74:1.
Pied de page `#0B080C` : blanc 18,68:1 · gris `#E9DDE4` 15,11:1 · gris discret `#B9AEB5` 9,28:1 · rose 7,77:1 · cyan 11,09:1 · contour de champ `#8E7F8A` 5,27:1.
Encre `#141015` sur rose `#F578B0` 7,35:1 · sur cyan 10,49:1 · sur rose clair 10,89:1 · sur violet 7,53:1 · sur kraft 7,12:1 · sur bleu clair 15,04:1.
Blanc sur `#D41F7C` 4,90:1 (et `#D41F7C` sur blanc 4,90:1) · blanc sur `#B3115F` 6,64:1 · blanc sur `#4A2AB0` 9,34:1.
Clair, sur turquoise `#5DD1E3` : encre 10,49:1 · `#0E3A42` 6,87:1 · `#8A0B4C` 5,24:1 · `#4A2AB0` 5,20:1 · `#B3115F` (bouton, non-texte) 3,70:1 · champ `#1F5C66` 4,21:1.
Interdits mesurés : `#F578B0` sur blanc 2,56:1, sur turquoise 1,43:1 ; `#D41F7C` sur turquoise 2,73:1 (sur le mur, un mot rose passe en pastille encre sur rose).

## 5. Polices (`site/fonts.ts`)

| Variable | Police | Usage |
| --- | --- | --- |
| `--font-poppins` (titres, imposée par le moteur) → `--tc-font-display` | **Sofia Sans Extra Condensed**, variable 1 à 1000, romain et italique | titres en capitales condensées très grasses (900 à 950), boutons, liens d'en-tête, prix. Le `h1` des pages penche (italique) ; les `h2` restent droits. |
| `--font-inter` (texte, imposée par le moteur) → `--tc-font-text` | **Plus Jakarta Sans**, variable 200 à 800 | paragraphes, champs, pastilles TikTok (800) |
| `--font-tc-script` → `--tc-font-script` | **Yellowtail** | un ou deux mots façon enseigne (« Tasty », « Merci ! », « la bande »). Jamais un paragraphe, jamais un bouton, jamais sous 28 px. |

Essai visuel : Anton et Bebas Neue écartés (déjà portés par deux sites frères) ; Sofia Sans Extra Condensed donne l'affiche « L'ORIGINAL. » du site officiel avec en plus l'italique Vice City. `layout.ts` met `up: "1"` : `h1` à `h3` en capitales.

## 6. Formes

`--tc-r-pill` 999px (boutons, barre, champs du pied de page) · `--tc-r-slab` 2rem (grandes dalles) · `--tc-r-card` 1,375rem (cartes) · `--tc-r-field` 0,875rem (champs) · `--tc-bar-h` 64px et `--tc-bar-top` 12px (pilule d'en-tête : réservez `calc(var(--tc-bar-h) + var(--tc-bar-top) + 1rem)` en haut de page, plus 40px quand le bandeau « fermé » est là).

Angles : le bandeau penche à -4° ; une pastille penchée à -2,5° ; jamais plus de 6° sur un bloc de texte.

## 7. Grammaire de mouvement

| Nom | Quoi | Durée, courbe | Où |
| --- | --- | --- | --- |
| `tc-flicker-on` (`.tc-flicker-on`) | un tube qui s'allume en vacillant, une seule fois | 1,2 s linéaire, délai 0,2 s, fini | titres néon, enseigne |
| `tc-rise` (`.tc-reveal`) | montée de 2,25rem + fondu, au défilement (`view()`) | plage `entry 0% 60%` | dalles, cartes, titres |
| `tc-rise-tilt` (`.tc-reveal--tilt`) | même chose avec -3° qui se redresse | plage `entry 0% 70%` | photos, cartes de la bande |
| `tc-pop` (`.tc-caption--pop`) | une pastille TikTok qui « tombe » à l'écran | plage `entry 10% 70%` | sous-titres |
| `tc-ribbon-run` (`.tc-ribbon`) | le bandeau qui défile | 40 s linéaire en boucle, pause au survol, au focus, au bouton | une fois par page au plus |
| `tc-ribbon-run` lié au défilement (`.tc-ribbon--scroll`) | le bandeau avance avec le défilement, sans boucle | plage `cover 0% 100%` | variante sans pause nécessaire |
| `tc-led-sweep` (`.tc-led--sweep`) | balayage rose, violet, cyan du panneau LED, une fois | 2,4 s `--tc-ease-io` | en-têtes de catégories, comptoir |
| `tc-basket-pop` (`button.tc-pop`) | le panier qui rebondit à l'ajout (classe posée par SiteEffects) | 0,6 s `--tc-ease-snap` | en-tête |

Courbes : `--tc-ease-out` `cubic-bezier(.16,1,.3,1)` (entrées) · `--tc-ease-snap` `cubic-bezier(.34,1.56,.64,1)` (rebonds, survols) · `--tc-ease-io` `cubic-bezier(.65,0,.35,1)` (balayages) · `--tc-ease-neon` `steps(1,end)` (allumage). Durées : `--tc-dur-1` 140 ms (couleur), `--tc-dur-2` 280 ms (survol), `--tc-dur-3` 600 ms (entrée), `--tc-dur-4` 1200 ms (allumage).

Règles :
1. **L'état de repos est la composition finale.** Une animation part de son état « avant » seulement si le mouvement est permis (`@media (prefers-reduced-motion: no-preference)` et `@supports (animation-timeline: view())`). `base.css` coupe toutes les animations sous `reduce`.
2. Le raccourci `animation` remet `animation-timeline` à zéro : écrivez la timeline **après**.
3. Une boucle infinie (bandeau) doit pouvoir s'arrêter (WCAG 2.2.2) : survol, focus, bouton `.tc-ribbon__toggle`, et rien sous `reduce`. Les vacillements de néon sont finis (une fois).
4. `position: sticky` meurt sous `overflow: hidden|auto` : utilisez `overflow: clip`.
5. 3D : `perspective(…)` dans le `transform` de l'élément, pas sur le parent ; pas de plan CSS en `rotateX` pour un sol (WebKit le peint hors de sa boîte : sol animé = canvas, sol fixe = `floor.svg`) ; `filter`, `opacity < 1`, `mask` et `overflow` aplatissent un contexte 3D. Toute scène 3D se vérifie dans WebKit. Voir `/Users/admin/Desktop/Dev/beyours-clients/o-crousti-poulet/site/FX_GUIDE.md`.
6. Une boucle `requestAnimationFrame` ne tourne que si la scène est à l'écran ; un canvas par scène ; `devicePixelRatio` plafonné à 2 (1,5 sur téléphone).
7. Survol : une couleur change et l'élément bouge de quelques pixels. Une inclinaison au pointeur n'existe que sur la carte (6° au plus, appareils à survol seulement).

## 8. Scènes « waouh » prévues, page par page

Une scène signature par page, courte, plus des effets d'ambiance du socle (bandeau, pastilles, néons, LED). Une scène épinglée dure deux écrans au plus et a une version non épinglée sous 900 px. Aucune image ne remplit un écran de téléphone ou de tablette (plafond en `svh`, par exemple `max-height: 62svh`).

| Page | Scène | Technique | Repli `prefers-reduced-motion` (et sans JS) |
| --- | --- | --- | --- |
| Accueil `/` | **Le coucher de soleil** : sol quadrillé qui file vers l'horizon sous le soleil rayé à trois palmiers, le logotype s'allume (néon), la barquette en avant-plan en parallaxe de 3 couches ; au défilement le soleil descend et le sol accélère ; le bandeau rose « GÉNÉROSITÉ SANS LIMITES » traverse sous le héros | canvas 2D pour le sol, `sun.svg`, couches en `translate` liées au défilement, `.tc-ribbon` | sol fixe (`floor.svg`), soleil en place, logotype allumé, bandeau à l'arrêt |
| Carte `/menu` | **Le comptoir LED** : chaque en-tête de famille est un panneau LED qui balaie rose, violet, cyan à son entrée ; les cartes produit allument un liseré néon au survol et s'inclinent de 6° au plus vers le pointeur | `.tc-led--sweep` en `view()`, inclinaison en JS limitée aux appareils à survol | panneaux LED fixes au dégradé final, aucune inclinaison |
| Boutique `/restaurant` | **La devanture la nuit** : le nom de la boutique écrit en tube néon qui s'allume lettre par lettre, un panneau « OUVERT » qui s'allume selon l'état réel, photo `scenes/devanture` en parallaxe légère | spans par lettre, `tc-flicker-on` décalé | enseigne allumée, statut en texte |
| Commander `/commander` | **Le sac kraft** : un sac kraft en volume (faces 2D simulées) qui se remplit des trois étapes (choisis, paie, récupère) au défilement | `scenes/sac-kraft`, `.tc-kraft`, `view()` | sac plein, trois étapes listées |
| Club `/club-crousty` | **Les ballons** : ballons rose, bleu clair, blanc, violet qui montent une fois et se posent autour d'une carte de membre irisée (reflet qui suit le pointeur, sans inclinaison) | SVG/CSS, montée finie, balancement de 3 cycles au plus | ballons posés, carte sans reflet animé |
| Franchise `/franchise` | **La façade qui s'assemble** : auvent turquoise, façade noire, enseigne rose posés couche par couche, épinglé moins de 2 écrans ; aucun montant, aucun chiffre non sourcé | couches en `translate`, `position: sticky` sous `overflow: clip` | façade assemblée |
| À propos `/about` | **La bande** : cadres verticaux 9:16 en éventail qui s'ouvrent au défilement, chacun avec sa pastille TikTok qui tombe (`tc-pop`) ; pas de visage d'équipe reproduit | `.tc-caption--pop`, `rotate` + `translate` en `view()` | grille de cadres, pastilles en place |
| Blog `/blog` | **Le fil** : titres d'articles en pastilles TikTok, cartes qui montent (`tc-reveal`), en-tête « LE JOURNAL » en néon qui s'allume | `.tc-caption`, `.tc-reveal`, `.tc-flicker-on` | cartes en place, néon allumé |
| Contact `/contact` | **L'enseigne « ON T'ÉCOUTE »** : titre néon qui s'allume, champs qui s'éclairent en cyan au focus, petit soleil qui se lève derrière le formulaire | `.tc-flicker-on`, focus de `base.css`, `sun.svg` | titre allumé, soleil en place |
| Panier (tiroir) | **La barquette qui déborde** : liseré rose néon du tiroir, en-tête en capitales, le bouton panier rebondit à chaque ajout (`tc-basket-pop`) | `base.css` §10, SiteEffects | pas de rebond |

## 9. En-tête, menu mobile, pied de page (déjà faits dans `base.css`)

- **En-tête** : une seule rangée, une pilule flottante (cyan la nuit, encre en clair) à 12 px du haut. Le logotype est sur l'axe, jamais au-dessus du menu, sans slogan à côté. Dès 1024 px : Carte et À propos à gauche, Blog et Contact à droite (l'accueil, c'est le logotype) ; le sélecteur de thème équilibre à gauche ; le panier (disque rose) et le compte (pilule blanche à texte rose) ferment à droite. Sous 1024 px : burger à gauche, logotype au centre, panier à droite. Franchise n'y est jamais.
- **Menu mobile** : plein écran de nuit, soleil et sol quadrillé en bas, pièces en très grandes capitales penchées, page active en néon rose.
- **Pied de page** : nuit profonde dans les deux modes, tube néon rose-violet-cyan sur le bord haut, logotype au-dessus du nom de la boutique. **Le lien Franchise n'existe qu'ici**, en petites capitales grises, sans couleur ni pilule.

## 10. Jetons et composants à réutiliser

Toutes les classes sont dans `site/pages/base.css`, toutes limitées à `.storefront-theme`.

| Classe | Rôle | Remarques |
| --- | --- | --- |
| `.tc-display`, `.tc-display--lean` | capitales d'affiche (950), penchées | |
| `.tc-script` | script d'enseigne | un ou deux mots |
| `.tc-neon`, `--cyan`, `--violet`, `--white` | mot en tube néon | en clair, devient encre sauf dans `.tc-on-night` |
| `.tc-on-night` | îlot de nuit dans une page claire | redéfinit `--tc-text`, `--tc-slab`, halos |
| `.tc-flicker-on` | allumage unique | fini |
| `.tc-caption`, `--white`, `--cyan`, `--tilt`, `--pop` | pastille de sous-titre TikTok | encre sur rose 7,35:1 ; `--white` = blanc sur rose profond 4,90:1, gros et gras seulement |
| `.tc-ribbon` (+ `__track`, `__toggle`), `--cyan`, `--scroll` | bandeau incliné qui défile | balisage et règles WCAG en commentaire dans `base.css` ; `--tc-ribbon-tilt`, `--tc-ribbon-speed` ; parent en `overflow: clip` |
| `.tc-sun` | soleil rayé à palmiers (`/brand/sun.svg`) | toujours entier |
| `.tc-floor` | sol quadrillé fixe (`/brand/floor.svg`) | hauteur plafonnée en `svh` |
| `.tc-led`, `.tc-led--sweep` | panneau LED à losanges (`/brand/led.svg` sur dégradé) | le texte posé dessus va sur une plaque encre |
| `.tc-kraft` | surface de sac kraft | encre 7,12:1 |
| `.tc-slab` | dalle sans cadre | |
| `.tc-rule` | filet néon | |
| `.tc-btn`, `.tc-btn--white`, `.tc-btn--round` | boutons hors moteur | mêmes rendus que les boutons du moteur |
| `.tc-reveal`, `.tc-reveal--tilt` | entrées liées au défilement | |

Les boutons du moteur (`[data-slot="button"]`) sont déjà peints : `default` = pilule rose à texte encre, survol néon ; `outline` et `secondary` = pilule blanche à texte rose profond ; `ghost` = transparent. Champs : bord `--input` 2 px, focus cyan lumineux. Cartes `[data-slot="card"]` : dalles sans cadre.

Fichiers de `public/brand/` : `logo.svg` (logotype de démonstration, 412 × 148, lisible sur noir, cyan et blanc), `mark.svg` (soleil à palmiers carré, favicon et séparateur), `sun.svg`, `floor.svg`, `palm.svg` (un palmier encre), `led.svg` (tuile de losange). Les photos sont dans `public/photos/` et `public/brand/scenes/` (autre agent).

## 11. Ce qu'on ne fait pas

- Pas de pastel, pas de fond crème, pas de goutte de sauce, rien de « Barquette Pop ».
- Pas de rose `#F578B0` en texte sur clair ; pas de blanc sur `#F578B0`.
- Pas de bistrot, de brasserie, d'ardoise, de « fait maison » à l'ancienne.
- Pas de 3D partout : une scène par page ; titres plats (pas d'extrusion, pas d'ombre portée qui suit la souris).
- Pas de flou sur de grandes surfaces, pas de `filter` sur un parent 3D.
- Pas de cadre autour des éléments ronds, pas de cadre coupé, pas de perles.
- Pas de franchise dans l'en-tête, sur l'accueil, la carte ou la commande ; aucun montant ; aucune mention « halal » ; aucun chiffre d'abonnés ou de vues ; aucun numéro WhatsApp.
- Pas de tiret cadratin ni demi-cadratin dans un texte lu par le visiteur ; espaces insécables avant `: ; ? ! €` ; guillemets « ».
- Pas d'image qui remplit un écran de téléphone ou de tablette.

## 12. Une ligne par type de page

- **Accueil** : la nuit à Miami, le soleil qui se couche sur le sol quadrillé, la barquette qui déborde, le bandeau rose.
- **Carte** : le comptoir LED, des familles en panneaux lumineux, des cartes produit en dalles sombres à liseré néon.
- **Pages intérieures** (à propos, blog, contact, club, commander, boutique) : même nuit, un grand titre penché et une scène signature, des dalles sur le sol, jamais une page fade.
- **Authentification** (connexion, compte) : une dalle sur la nuit (ou sur le mur turquoise), un titre néon, rien d'autre qui distraie.
- **Pages légales** : texte lisible sur dalle, titres en capitales condensées, un filet néon, aucune animation au-delà de l'entrée.
- **Réseau** (boutiques, franchise) : la façade (auvent turquoise, enseigne rose) comme motif, une seule scène, aucun chiffre non sourcé ; la franchise n'est liée que du pied de page.
