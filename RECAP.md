# Maison Ōra — Récap projet

## Stack
Next.js 16.2.2 — TypeScript — Tailwind v4 — Supabase — Framer Motion

## Décisions clés
- Tailwind v4 : config dans globals.css via @theme, plus de tailwind.config.ts
- Couleurs custom : utiliser les valeurs hex directement pour les hover (pas les classes Tailwind)
- Opacité : utiliser style={{ opacity }} au lieu de text-cream/70
- Structure : src/ directory, App Router, groupes de routes (public)(auth)(admin)
- Noms couleurs : cream, cream-alt, dark, gold, stone, border
- Calendrier : custom from scratch (Calendar.tsx) — react-day-picker incompatible Tailwind v4
- Modal : composant réutilisable dans ui/Modal/

## Composants terminés
- Button (ui) — variants: primary, secondary, ghost
- Badge (ui)
- Input (ui)
- Modal (ui) — réutilisable partout
- Navbar (layout) — scroll + hover underline gold animé
- Hero (sections) — image plein écran, overlay, CTA
- Stats (sections) — compteur animé Framer Motion, à placer plus tard
- Philosophy (sections) — parallax image + mots animés
- Menu (sections) — cards horizontales scroll parallax
- Reservation (sections) — formulaire 4 étapes, calendrier custom, modal confirmation

## Pages
- Homepage : Hero ✅ Philosophy ✅ Menu ✅ Reservation ✅ Stats (à placer)
- /menu : à faire
- /reservation : à faire
- (admin) : à faire
- (auth) : à faire

## Images
- public/images/hero.png
- public/images/philosophy.png
- public/images/menu-fish.png
- public/images/menu-vegetal.png
- public/images/menu-dessert.png

## Supabase
- Pas encore configuré
- Table reservations à créer

## Prochaines étapes
1. Push sur Git
2. Footer
3. Pages /menu et /reservation
4. Supabase — auth + table reservations
5. Dashboard admin
6. Deploy Vercel