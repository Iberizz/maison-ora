import { createServerSupabaseClient } from '@/lib/supabase/server'
import DashboardClient from "@/components/admin/Dashboard/DashboardClient";

export default async function AdminPage() {
    const supabase = await createServerSupabaseClient()

    const today = new Date().toISOString().split('T')[0]

    const { data: reservations } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

    const todayRes = reservations?.filter(r => r.date === today) ?? []
    const pending = reservations?.filter(r => r.status === 'pending') ?? []
    const confirmed = reservations?.filter(r => r.status === 'confirmed') ?? []

    return (
        <DashboardClient
            reservations={reservations ?? []}
            kpis={{
                today: todayRes.length,
                pending: pending.length,
                confirmed: confirmed.length,
                total: reservations?.length ?? 0,
            }}
        />
    )
}