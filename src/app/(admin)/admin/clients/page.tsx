import { createServerSupabaseClient } from '@/lib/supabase/server'
import ClientsClient from "@/components/admin/Clients/ClientsClient";

export default async function ClientsPage() {
    const supabase = await createServerSupabaseClient()

    const { data: reservations } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

    const clientsMap = new Map()
    reservations?.forEach(r => {
        if (clientsMap.has(r.email)) {
            const existing = clientsMap.get(r.email)
            existing.reservations += 1
            existing.totalSpent += 258
        } else {
            clientsMap.set(r.email, {
                id: r.id,
                name: r.name,
                email: r.email,
                phone: r.phone,
                reservations: 1,
                totalSpent: 258,
                lastVisit: r.date,
                status: 'actif',
            })
        }
    })

    const clients = Array.from(clientsMap.values())

    return <ClientsClient clients={clients} />
}