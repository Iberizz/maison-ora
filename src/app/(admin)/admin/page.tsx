import { createServerSupabaseClient } from '@/lib/supabase/server'
import DashboardClient from "@/components/admin/Dashboard/DashboardClient";

export default async function AdminPage() {
    const supabase = await createServerSupabaseClient()

    const { data: reservations } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

    const [{ count: totalMessages }, { count: newMessages }, { count: totalOrders }, { count: pendingOrders }, { count: totalMenuItems }, { count: availableMenuItems }] = await Promise.all([
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('menu_items').select('*', { count: 'exact', head: true }),
        supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('available', true),
    ])

    return (
        <DashboardClient
            reservations={reservations ?? []}
            overview={{
                totalMessages: totalMessages ?? 0,
                newMessages: newMessages ?? 0,
                totalOrders: totalOrders ?? 0,
                pendingOrders: pendingOrders ?? 0,
                totalMenuItems: totalMenuItems ?? 0,
                availableMenuItems: availableMenuItems ?? 0,
            }}
        />
    )
}