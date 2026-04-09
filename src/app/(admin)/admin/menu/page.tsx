import { createServerSupabaseClient } from '@/lib/supabase/server'
import MenuClient from '@/components/admin/Menu/MenuClient'

export default async function MenuPage() {
    const supabase = await createServerSupabaseClient()

    const { data: items } = await supabase
        .from('menu_items')
        .select('*')
        .order('position', { ascending: true })

    return <MenuClient items={items ?? []} />
}