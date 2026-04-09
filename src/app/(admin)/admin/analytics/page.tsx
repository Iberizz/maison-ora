import { createServerSupabaseClient } from '@/lib/supabase/server'
import AnalyticsClient from "@/app/(admin)/admin/analytics/AnalyticsClient";

export default async function AnalyticsPage() {
    const supabase = await createServerSupabaseClient()

    const { data: reservations } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: true })

    return <AnalyticsClient reservations={reservations ?? []} />
}