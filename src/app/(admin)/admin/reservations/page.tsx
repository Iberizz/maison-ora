import { createServerSupabaseClient } from '@/lib/supabase/server'
import ReservationsClient from "@/app/(admin)/admin/reservations/ReservationsClient";

export default async function ReservationsPage() {
    const supabase = await createServerSupabaseClient()

    const { data: reservations } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: true })

    return <ReservationsClient reservations={reservations ?? []} />
}