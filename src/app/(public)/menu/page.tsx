// app/(public)/menu/page.tsx
// Server Component — fetch Supabase côté serveur, zéro JS client ici

import { createServerSupabaseClient } from '@/lib/supabase/server'
import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer/Footer'
import MenuClient from './MenuClient'
import type { MenuItemRow } from './Menu.types'

export const metadata = {
    title: 'La Carte — Maison Ōra',
    description: 'Une cuisine de précision, ancrée dans la saison. Découvrez la carte de Maison Ōra, Paris.',
}

export default async function MenuPage() {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('position', { ascending: true })

    const items: MenuItemRow[] = error ? [] : (data ?? [])

    return (
        <>
            <Navbar />
            <main className="min-h-screen" style={{ backgroundColor: 'var(--color-dark)' }}>
                <MenuClient initialItems={items} />
            </main>
            <Footer />
        </>
    )
}
