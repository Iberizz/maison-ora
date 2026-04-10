import { createServerSupabaseClient } from '@/lib/supabase/server'
import OrdersClient from '@/components/admin/Orders/OrdersClient'

export default async function CommandesPage() {
    const supabase = await createServerSupabaseClient()

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

    return <OrdersClient orders={orders ?? []} />
}