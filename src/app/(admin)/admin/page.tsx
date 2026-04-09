import { createServerSupabaseClient } from '@/lib/supabase/server'
import DashboardClient from "@/components/admin/Dashboard/DashboardClient";

export default async function AdminPage() {
    const supabase = await createServerSupabaseClient()

    const today = new Date().toISOString().split('T')[0]

    const { data: reservations } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

    const { data: menuItems } = await supabase
        .from('menu_items')
        .select('id, available')

    const todayRes = reservations?.filter(r => r.date === today) ?? []
    const pending = reservations?.filter(r => r.status === 'pending') ?? []
    const confirmed = reservations?.filter(r => r.status === 'confirmed') ?? []
    const cancelled = reservations?.filter(r => r.status === 'cancelled') ?? []
    const totalGuests = reservations?.reduce((acc, r) => acc + (r.guests ?? 0), 0) ?? 0
    const availableItems = menuItems?.filter(i => i.available).length ?? 0

    return (
        <DashboardClient
            reservations={reservations ?? []}
            kpis={{
                today: todayRes.length,
                pending: pending.length,
                confirmed: confirmed.length,
                cancelled: cancelled.length,
                total: reservations?.length ?? 0,
                totalGuests,
                availableItems,
                conversionRate: reservations?.length
                    ? Math.round((confirmed.length / reservations.length) * 100)
                    : 0,
            }}
        />
    )
}