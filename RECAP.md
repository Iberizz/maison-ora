# Maison Ōra — Récap projet

## Stack
Next.js 16.2.2 — TypeScript — Tailwind v4 — Supabase — Framer Motion — Recharts

## Décisions clés
- Tailwind v4 : config dans globals.css via @theme, plus de tailwind.config.ts
- Couleurs custom : utiliser les valeurs hex directement pour les hover
- Opacité : utiliser style={{ opacity }} au lieu de text-cream/70
- Structure : src/ directory, App Router, groupes de routes (public)(auth)(admin)
- Noms couleurs : cream, cream-alt, dark, gold, stone, border
- Calendrier : custom from scratch (Calendar.tsx) — react-day-picker incompatible Tailwind v4
- Modal : composant réutilisable dans ui/Modal/
- Server Actions : allowedOrigins requis sur Vercel dans next.config.ts
- Supabase Auth : Site URL + Redirect URLs à configurer dans Authentication > URL Configuration

## Architecture composants
- Chaque section a : Component.tsx + Component.types.ts + useComponent.ts
- Logique dans use[Name].ts, JSX uniquement dans Component.tsx
- Styles inline hex pour les hover (Tailwind v4 ne génère pas les hover sur couleurs custom)

## Composants UI terminés
- Button — variants: primary, secondary, ghost
- Badge
- Input
- Modal — réutilisable partout
- Calendar — custom from scratch

## Layout
- Navbar — scroll + hover underline gold animé
- Footer — cream, MAISON ŌRA filigrane, newsletter, horaires, nav, réseaux

## Sections Homepage
- Hero — image plein écran, overlay, CTA ✅
- Philosophy — parallax image + mots animés ✅
- Menu — cards horizontales scroll parallax ✅
- Press — citations animées mot par mot + récompenses ✅
- Stats — compteurs animés Framer Motion ✅ (à repositionner)
- Reservation — formulaire 4 étapes, calendrier custom, modal confirmation ✅

## Back-office Admin
- Layout sidebar fixe dark #111110
- Login — /login protégé par middleware
- Dashboard — KPIs enrichis (8 métriques), tableau réservations récentes ✅
- Réservations — filtres statut/date/recherche, modal confirmation/annulation ✅
- Clients — tableau + fiche client slide-in ✅
- Menu — CRUD complet, toggle disponibilité, miniatures images ✅
- Analytics — KPIs, courbe CA, barres réservations/jour, donut statuts ✅
- Logs — filtres, actions automatiques menu + réservations ✅
- Paramètres — site, horaires, taxes (3 onglets) ✅
- Commandes — à faire

## Base de données Supabase
Tables :
- reservations (id, guests, date, time, name, email, phone, status, notes)
- profiles (id, email, role, first_name, last_name, avatar_url)
- menu_items (id, title, description, category, price, image, available, position)
- logs (id, action, entity, entity_id, user_email, metadata)

RLS activé sur toutes les tables.
Policies :
- reservations : insert public, all admin
- profiles : select own
- menu_items : select public, all admin
- logs : select admin, insert public

Trigger : handle_new_user → crée profil à chaque inscription

## Auth
- Admin : admin@ora.fr
- Middleware protège /admin → redirect /login si non connecté
- Logger : src/lib/supabase/logger.ts — logAction() à appeler après chaque mutation

## Variables d'environnement
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

À configurer dans Vercel → Settings → Environment Variables
Puis Redeploy obligatoire.

## Images
- public/images/hero.png
- public/images/philosophy.png
- public/images/menu-fish.png
- public/images/menu-vegetal.png
- public/images/menu-dessert.png

## Prochaines étapes
1. Fix Vercel — connexion + modal réservation
2. Commandes (page admin)
3. Page publique /menu
4. Page publique /reservation
5. Polish homepage (Stats repositionnées, transitions)
6. Responsive mobile
7. Deploy final Vercel