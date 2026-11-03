# Images à générer : direction « Vice City Crousty »

Toutes les images de ce tableau sont des **illustrations générées par IA**. Crédit à afficher : « Illustration générée par IA » (la phrase est dans la notice légale du seed, `legal-notice > intellectualProperty`).

- Modèle : `openai/gpt-image-2` via le MCP `studio` (Vercel AI Gateway), `size` explicite, aucune autre source.
- Sources : `site/source/generated/*.png` + manifeste `.json` (jamais servis). Les références de marque (`site/source/reference/`) ont été lues pour l'ambiance et n'ont jamais été passées au générateur.
- Construction : `node site/tools/images.mjs` (WebP + variantes `-sm`, og-default.png).
- Référence de cohérence : la barquette `crousty-blanche` (convertie en WebP dans un dossier temporaire) a servi de référence pour curry, mixte, les deux heros, blog-1, blog-2 et about-2.
- Langage commun : fond noir chaud, contre-jour néon rose `#F578B0` à gauche et cyan `#5DD1E3` à droite, lueur violette, fumée légère, sol noir brillant, sujet centré avec marge (recadrage et inclinaison 3D). Aucun texte, logo, marque ni visage.
- Plafond d'affichage : aucune image ne remplit un écran de téléphone ou de tablette (plafond en `svh` côté CSS).

## Rôles

| Source | Rôle | Taille générée | Fichiers servis | Coût estimé (USD) |
|---|---|---|---|---|
| `crousty-blanche.png` | Produit « Crousty sauce blanche maison » + catégorie « Les Crousty » | 1024x1024 | `public/photos/crousty-blanche.webp (+ -sm)` | ~0.13 |
| `crousty-curry.png` | Produit « Crousty sauce curry maison » (référence : crousty-blanche) | 1024x1024 | `public/photos/crousty-curry.webp (+ -sm)` | ~0.13 |
| `crousty-mixte.png` | Produit « Crousty mixte » (référence : crousty-blanche) | 1024x1024 | `public/photos/crousty-mixte.webp (+ -sm)` | ~0.13 |
| `nems.png` | Produit « Nems poulet » | 1024x1024 | `public/photos/nems.webp (+ -sm)` | ~0.13 |
| `tenders.png` | Produit « Tenders de poulet » + catégorie « Les petits plus » | 1024x1024 | `public/photos/tenders.webp (+ -sm)` | ~0.13 |
| `tiramisu.png` | Produit « Tiramisu Nutella » + catégorie « Dessert » | 1024x1024 | `public/photos/tiramisu.webp (+ -sm)` | ~0.13 |
| `dada-mojito.png` | Produit « Dada Mojito » + catégorie « Boissons » | 1024x1024 | `public/photos/dada-mojito.webp (+ -sm)` | ~0.13 |
| `calypso.png` | Produit « Calypso Ocean Blue » | 1024x1024 | `public/photos/calypso.webp (+ -sm)` | ~0.13 |
| `hero-16x9.png` | Hero accueil, paysage (média CMS `hero`) + source de og-default | 2048x1152 | `public/brand/scenes/hero-16x9.webp 1920x1080 (+ -sm), public/brand/og-default.png 1200x630` | ~0.28 |
| `hero-9x16.png` | Hero accueil, portrait téléphone (plafonner en svh) | 1024x1536 | `public/brand/scenes/hero-9x16.webp 864x1536 (+ -sm)` | ~0.19 |
| `sac-kraft.png` | Scène « Commander / à emporter » : sac kraft sur comptoir LED | 1024x1024 | `public/brand/scenes/sac-kraft.webp (+ -sm)` | ~0.13 |
| `devanture.png` | Scène /restaurant : devanture noire à néon rose, sans enseigne lisible | 1536x864 | `public/brand/scenes/devanture.webp (+ -sm)` | ~0.16 |
| `about-1.png` | À propos, récit (média CMS `about1`) : panier de friteuse | 1024x1024 | `public/photos/about-1.webp (+ -sm)` | ~0.13 |
| `about-2.png` | À propos, second visuel (média CMS `about2`) : la sauce en zigzag | 1024x1024 | `public/photos/about-2.webp (+ -sm)` | ~0.13 |
| `cta.png` | Bandeau CTA accueil (média CMS `cta`) : sac passé au comptoir | 1536x864 | `public/photos/cta.webp (+ -sm)` | ~0.16 |
| `blog-1.png` | Blog « Pourquoi la barquette » (la barquette qui a fait le tour de TikTok) | 1536x864 | `public/photos/blog-1.webp (+ -sm)` | ~0.16 |
| `blog-2.png` | Blog « Blanche ou curry » | 1536x864 | `public/photos/blog-2.webp (+ -sm)` | ~0.16 |
| `blog-3.png` | Blog « Du premier resto à ton écran » | 1536x864 | `public/photos/blog-3.webp (+ -sm)` | ~0.16 |
| `blog-4.png` | Blog « Strasbourg, première boutique de la démo » | 1536x864 | `public/photos/blog-4.webp (+ -sm)` | ~0.16 |

**Total estimé : ~2.86 USD** pour 19 images, 0 reprise. Le MCP ne renvoie pas le coût réel de gpt-image-2 (tarif au jeton : 5 USD/M en entrée, 30 USD/M en sortie). L'estimation suppose une qualité haute (~4 200 jetons de sortie pour 1024x1024). Le chiffre exact est dans le tableau de bord du Gateway.

Rejets : aucun. Chaque image a été relue : pas de texte déformé, pas de logo, pas de filigrane, pas de visage, pas de copie de la vraie devanture.

Rôles volontairement non produits : stickers détourés (pas de transparence : sujets sur noir à la place), logo et mark (écrits par un autre agent), vidéo (non demandée).

## Prompts retenus

### crousty-blanche

Taille `1024x1024`, références : 0.

> Photorealistic commercial food photograph, night mood, square format. Subject: an open plain white cardboard takeaway clamshell box (lid open and standing behind), overflowing with a generous bed of fluffy white rice topped with a big heap of golden, ultra-crispy boneless fried chicken pieces with craggy crunchy batter, generously drizzled in zigzags with thick creamy white garlic sauce, a few flecks of chopped parsley. XXL generous portion, spilling slightly over the edges. Camera: three-quarter high angle about 35 degrees, 50mm, shallow depth of field. Background: deep warm black, seamless, no scenery, the box sits on a glossy black surface with soft reflections. Lighting: strong neon rim light, hot pink (#F578B0) from behind left, cyan turquoise (#5DD1E3) from behind right, a soft violet glow, light steam rising and catching the neon, crisp highlights on the batter. Composition: subject centred, occupying about 60 percent of the frame, generous empty black margin all around for cropping and tilting. No text, no letters, no logo, no brand, no print on the box, no people, no hands, no watermark.

### crousty-curry

Taille `1024x1024`, références : 1.

> Same photograph style, same plain white cardboard takeaway clamshell box, same camera angle, same black glossy set and same pink and cyan neon rim lighting as the reference image, but this version is the CURRY one: the generous bed of fluffy white rice is topped with a big heap of golden, ultra-crispy boneless fried chicken bites (distinct craggy crunchy pieces), generously drizzled in thick zigzags of glossy golden-orange curry sauce, a few flecks of chopped parsley. XXL generous portion spilling slightly over the edges, light steam rising and catching the neon. Subject centred, about 60 percent of the frame, generous empty black margin all around. Photorealistic commercial food photography. No text, no letters, no logo, no print on the box, no people, no hands, no watermark.

### crousty-mixte

Taille `1024x1024`, références : 1.

> Same photograph style, same plain white cardboard takeaway clamshell box, same camera angle, same black glossy set and same pink and cyan neon rim lighting as the reference image, but this version is the MIXED one with two sauces: the generous bed of fluffy white rice is topped with a big heap of golden, ultra-crispy boneless fried chicken bites (distinct craggy crunchy pieces), drizzled with BOTH a thick creamy white garlic sauce and a glossy golden-orange curry sauce, the white and orange zigzags crossing each other clearly visible, a few flecks of chopped parsley. XXL generous portion spilling slightly over the edges, light steam rising and catching the neon. Subject centred, about 60 percent of the frame, generous empty black margin all around. Photorealistic commercial food photography. No text, no letters, no logo, no print on the box, no people, no hands, no watermark.

### nems

Taille `1024x1024`, références : 0.

> Photorealistic commercial food photograph, night mood, square format. Subject: five golden, crispy, blistered fried chicken spring rolls (nems) piled generously on a small plain white cardboard tray, one cut in half showing the chicken and vermicelli filling, a few fresh mint and lettuce leaves on the side, a small plain dipping cup of amber sweet chili sauce. Camera: three-quarter high angle about 35 degrees, 50mm, shallow depth of field. Background: deep warm black, seamless, no scenery, glossy black surface with soft reflections. Lighting: strong neon rim light, hot pink (#F578B0) from behind left, cyan turquoise (#5DD1E3) from behind right, a soft violet glow, light steam catching the neon, crisp highlights on the crunchy skin. Composition: subject centred, about 55 to 60 percent of the frame, generous empty black margin all around for cropping and tilting. No text, no letters, no logo, no brand, no print, no people, no hands, no watermark.

### tenders

Taille `1024x1024`, références : 0.

> Photorealistic commercial food photograph, night mood, square format. Subject: a generous pile of golden, ultra-crispy breaded chicken tenders (long strips with craggy crunchy batter) stacked high in a small plain white cardboard tray, one tender broken open showing juicy white meat, a small plain cup of creamy white dipping sauce beside it. XXL generous portion. Camera: three-quarter high angle about 35 degrees, 50mm, shallow depth of field. Background: deep warm black, seamless, no scenery, glossy black surface with soft reflections. Lighting: strong neon rim light, hot pink (#F578B0) from behind left, cyan turquoise (#5DD1E3) from behind right, a soft violet glow, light steam catching the neon, crisp highlights on the batter. Composition: subject centred, about 55 to 60 percent of the frame, generous empty black margin all around for cropping and tilting. No text, no letters, no logo, no brand, no print, no people, no hands, no watermark.

### tiramisu

Taille `1024x1024`, références : 0.

> Photorealistic commercial dessert photograph, night mood, square format. Subject: a generous chocolate-hazelnut tiramisu in a clear plastic dessert cup with a plain clear lid set aside, visible layers of soaked sponge biscuits, thick white mascarpone cream and glossy chocolate-hazelnut spread, top dusted with cocoa powder and finished with a swirl of melted chocolate-hazelnut spread and a few crushed toasted hazelnuts, a small plain spoon resting beside it with a spoonful of cream. Camera: three-quarter angle about 30 degrees, 50mm, shallow depth of field. Background: deep warm black, seamless, no scenery, glossy black surface with soft reflections. Lighting: strong neon rim light, hot pink (#F578B0) from behind left, cyan turquoise (#5DD1E3) from behind right, a soft violet glow, neon highlights on the cup edge. Composition: subject centred, about 55 to 60 percent of the frame, generous empty black margin all around. No text, no letters, no logo, no brand, no jar, no label, no print, no people, no hands, no watermark.

### dada-mojito

Taille `1024x1024`, références : 0.

> Photorealistic commercial beverage photograph, night mood, square format. Subject: a tall clear glass filled with a sparkling mint-green mojito-style soft drink, lots of crushed ice, fresh mint leaves and lime wheels inside, condensation droplets on the glass, a fresh mint sprig and a lime wedge on the rim, a plain black straw, tiny bubbles rising. Camera: eye level slightly above, 85mm, shallow depth of field. Background: deep warm black, seamless, no scenery, glossy black surface with soft reflections. Lighting: strong neon rim light, hot pink (#F578B0) from behind left, cyan turquoise (#5DD1E3) from behind right, a soft violet glow, the green drink glowing as if backlit, sharp neon highlights on the glass edges and droplets. Composition: subject centred, about 55 to 60 percent of the frame height, generous empty black margin all around. No text, no letters, no logo, no brand, no can, no bottle, no label, no people, no hands, no watermark.

### calypso

Taille `1024x1024`, références : 0.

> Photorealistic commercial beverage photograph, night mood, square format. Subject: a tall clear glass filled with a vivid ocean-blue tropical soft drink (electric blue to turquoise gradient), lots of ice cubes, condensation droplets on the glass, a pineapple wedge and a small orange slice on the rim, a plain white straw, tiny bubbles rising. Camera: eye level slightly above, 85mm, shallow depth of field. Background: deep warm black, seamless, no scenery, glossy black surface with soft reflections. Lighting: strong neon rim light, hot pink (#F578B0) from behind left, cyan turquoise (#5DD1E3) from behind right, a soft violet glow, the blue drink glowing as if backlit, sharp neon highlights on the glass edges and droplets. Composition: subject centred, about 55 to 60 percent of the frame height, generous empty black margin all around. No text, no letters, no logo, no brand, no can, no bottle, no label, no people, no hands, no watermark.

### hero-16x9

Taille `2048x1152`, références : 1.

> Cinematic wide 16:9 hero photograph, Miami night synthwave mood, photorealistic. Hero subject: the same open plain white cardboard takeaway box as the reference, overflowing with fluffy white rice, a big heap of golden ultra-crispy fried chicken bites and zigzags of creamy white sauce, light steam rising, placed slightly right of centre in the foreground on a wet glossy black floor that mirrors neon reflections in pink and cyan streaks. Background: a huge soft-focus retro sunset disc on the horizon, gradient from hot pink (#F578B0) to magenta to peach-orange, with horizontal dark scan-line bands across its lower half, flanked by blurry black silhouettes of tall palm trees, a deep warm black night sky above fading to violet (#AA94FF) near the horizon, faint cyan (#5DD1E3) haze along the horizon line. Lighting: pink rim light from the sunset behind, cyan accent from the right, the box edges glowing. Composition: wide, lots of dark negative space on the left third for a title, horizon at about 55 percent height, subject about 40 percent of frame height. No text, no letters, no logo, no brand, no print on the box, no people, no watermark.

### hero-9x16

Taille `1024x1536`, références : 1.

> Cinematic vertical 9:16 hero photograph for a phone screen, Miami night synthwave mood, photorealistic. Hero subject: the same open plain white cardboard takeaway box as the reference, overflowing with fluffy white rice, a big heap of golden ultra-crispy fried chicken bites and zigzags of creamy white sauce, light steam rising, centred in the lower half on a wet glossy black floor that mirrors neon reflections in pink and cyan streaks. Background: a large soft-focus retro sunset disc on the horizon behind the box, gradient from hot pink (#F578B0) to magenta to peach-orange, with horizontal dark scan-line bands across its lower half, flanked by blurry black silhouettes of tall palm trees on both sides, deep warm black night sky in the upper third fading to violet (#AA94FF) near the horizon, faint cyan (#5DD1E3) haze along the horizon. Lighting: pink rim light from the sunset behind, cyan accent from the right. Composition: upper third mostly dark empty sky for a title, subject about 30 percent of the frame height, centred. No text, no letters, no logo, no brand, no print on the box, no people, no watermark.

### sac-kraft

Taille `1024x1024`, références : 0.

> Photorealistic commercial photograph, night mood, square format. Subject: a plain brown kraft paper takeaway bag with flat twisted paper handles, top folded open, standing on a glossy black lacquered counter top; the front face of the counter below is a glowing LED panel made of a grid of small diamond-shaped (rhombus) cells lighting up in hot pink (#F578B0), magenta, violet (#AA94FF) and cyan turquoise (#5DD1E3) in soft diagonal waves, its glow reflecting on the glossy counter and on the kraft paper. A soft warm wisp of steam escapes the top of the bag. Background: deep warm black, out of focus, a faint pink and cyan bokeh. Camera: three-quarter view, slightly low angle, 50mm, shallow depth of field. Composition: bag centred, about 55 percent of the frame, counter edge in the lower third, generous dark margin around. No text, no letters, no logo, no brand, no print on the bag, no stickers, no people, no hands, no watermark.

### devanture

Taille `1536x864`, références : 0.

> Wide 16:9 photorealistic photograph of a generic small takeaway shop front at night in a French city street, seen straight on from across the pavement. Matte black facade and black window frames, a turquoise (#5DD1E3) awning above the glass door and window, a blank black sign band above with only an abstract glowing hot pink (#F578B0) neon tube drawing (a long wavy line and a small circle like a setting sun, no letters, no palm trees), warm white interior light through the glass showing a blurred black counter with a glowing pink and cyan diamond LED panel. A few out-of-focus pink and light blue balloons inside. Wet pavement in front reflecting pink and cyan, Haussmann-style pale stone building above, cars light streaks far away. No readable text anywhere, no letters, no numbers, no logo, no brand, no posters, no people, no faces, no watermark.

### about-1

Taille `1024x1024`, références : 0.

> Photorealistic square photograph of a takeaway kitchen at night, close-up on the gesture: two hands in black nitrile gloves lift a stainless steel frying basket out of bubbling golden oil, full of golden ultra-crispy fried chicken bites, oil droplets and steam flying, sparks of light. Only forearms and gloved hands visible, a white apron edge in soft focus, no face, no head. Dark stainless kitchen with black walls; hot pink (#F578B0) neon glow from the left and cyan turquoise (#5DD1E3) glow from the right reflecting on the steel, warm orange light from the fryer. Cinematic, shallow depth of field, energetic. No text, no letters, no logo, no brand, no face, no watermark.

### about-2

Taille `1024x1024`, références : 1.

> Photorealistic square photograph of a takeaway kitchen at night, close-up on the gesture: a gloved hand (black nitrile glove) squeezes a plain unlabeled squeeze bottle, drawing a generous zigzag of thick creamy white sauce over golden crispy fried chicken bites on white rice in an open plain white cardboard takeaway box like the reference, placed on a black steel counter. Only the hand and forearm visible, the sleeve of a white top, no face, no head. Background: dark kitchen, out of focus, hot pink (#F578B0) and cyan turquoise (#5DD1E3) neon glows and bokeh, light steam rising. Cinematic, shallow depth of field. No text, no letters, no logo, no brand, no label on the bottle, no face, no watermark.

### cta

Taille `1536x864`, références : 0.

> Wide 16:9 photorealistic photograph inside a takeaway shop at night, the pick-up moment: across a glossy black lacquered counter, one hand passes a plain brown kraft paper takeaway bag with flat paper handles to another hand reaching from the right; only hands and forearms visible (one in a black t-shirt sleeve, the other in a white track jacket sleeve), no faces, no heads. The front of the counter is a glowing LED panel made of a grid of small diamond (rhombus) cells shining hot pink (#F578B0), magenta, violet (#AA94FF) and cyan (#5DD1E3). Behind, a plain turquoise (#5DD1E3) painted wall, completely blank, out of focus, black ceiling with round white spotlights, a few out-of-focus pink, light blue and white balloons on the right edge. Two more kraft bags wait on the counter on the left. Cinematic, shallow depth of field, slightly low angle. The left 40 percent of the frame is darker and calmer for a title overlay. No text, no letters, no logo, no mural, no print on the bags, no faces, no watermark.

### blog-1

Taille `1536x864`, références : 1.

> Wide 16:9 photorealistic editorial photograph, night neon mood, about a takeaway dish that went viral on social video. Subject: the same open plain white cardboard takeaway box as the reference (rice, golden crispy fried chicken bites, zigzags of white sauce), seen from directly above (flat lay), centred on a glossy black surface. Around it, floating glowing neon shapes: a few hot pink (#F578B0) neon heart outlines, cyan (#5DD1E3) neon sparkle stars and a ring light reflection circle, as if lit by a phone ring light, soft pink and cyan glows spilling onto the black surface. Deep warm black background. Composition: subject centred, generous dark margin left and right. No text, no letters, no numbers, no logo, no app icons, no brand, no people, no hands, no watermark.

### blog-2

Taille `1536x864`, références : 1.

> Wide 16:9 photorealistic food photograph, night neon mood, a friendly duel. Two identical open plain white cardboard takeaway boxes like the reference, side by side on a glossy black surface, facing each other slightly: the left one with rice and golden crispy fried chicken bites drizzled with thick creamy WHITE sauce, lit by hot pink (#F578B0) neon from the left; the right one with rice and golden crispy fried chicken bites drizzled with glossy golden-orange CURRY sauce, lit by cyan turquoise (#5DD1E3) neon from the right. A thin vertical violet (#AA94FF) neon light bar glows in the background exactly between them, like a versus split. Light steam rising from both. Deep warm black background. Composition: both boxes fully in frame, symmetrical, dark margins. No text, no letters, no logo, no brand, no print on the boxes, no people, no hands, no watermark.

### blog-3

Taille `1536x864`, références : 0.

> Wide 16:9 photorealistic editorial photograph, night neon city mood. A hand (only the hand and wrist visible, no face, no body) holds up a modern smartphone in portrait orientation, right of centre; the phone screen shows a vertical close-up photo of an open white takeaway box full of rice, golden crispy fried chicken bites and white sauce, with a soft pink glow around the screen edges. No interface, no text, no icons on the screen, just the picture. Background: blurred night street with neon bokeh in hot pink (#F578B0), cyan (#5DD1E3) and violet (#AA94FF), wet pavement reflections, warm black shadows. Composition: phone fully in frame, dark negative space on the left. No text, no letters, no numbers, no logo, no app icons, no brand, no face, no watermark.

### blog-4

Taille `1536x864`, références : 0.

> Wide 16:9 photorealistic photograph of a night street in Strasbourg, France: historic Alsatian half-timbered houses with dark wooden beams, a narrow cobblestone street wet after rain mirroring lights. On the ground floor in the middle ground, a small modern takeaway shop with a matte black facade, a turquoise (#5DD1E3) awning and a warm interior glow, a glowing hot pink (#F578B0) abstract neon tube shape above the window (a simple curved line and a small sun circle, no letters). Pink and cyan reflections streak across the wet cobblestones. Deep blue-black night sky with a faint violet tint. Cinematic, slightly low angle, shallow depth of field. No readable text anywhere, no letters on the shop, no signage text, no logo, no brand, no people, no faces, no watermark.
