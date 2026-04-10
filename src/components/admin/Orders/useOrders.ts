import { useState } from 'react'
import { Order, OrderStatus } from './Orders.types'
import { createClient } from '@/lib/supabase/client'
import { logAction } from '@/lib/supabase/logger'
import { useRouter } from 'next/navigation'

export const useOrders = (orders: Order[]) => {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<OrderStatus | 'all'>('all')
    const [selected, setSelected] = useState<Order | null>(null)
    const [loading, setLoading] = useState<string | null>(null)
    const router = useRouter()

    const filtered = orders.filter(o => {
        const matchSearch = search === '' ||
            o.client_name.toLowerCase().includes(search.toLowerCase()) ||
            o.client_email?.toLowerCase().includes(search.toLowerCase())
        const matchStatus = status === 'all' || o.status === status
        return matchSearch && matchStatus
    })

    const updateStatus = async (id: string, newStatus: OrderStatus) => {
        setLoading(id)
        const supabase = createClient()
        await supabase.from('orders').update({ status: newStatus }).eq('id', id)
        await logAction({
            action: `Commande — statut: ${newStatus}`,
            entity: 'order',
            entity_id: id,
            user_email: 'admin@ora.fr',
            metadata: { status: newStatus }
        })
        setLoading(null)
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null)
        router.refresh()
    }

    const totalRevenue = orders
        .filter(o => o.status === 'paid')
        .reduce((acc, o) => acc + o.total, 0)

    return {
        search, setSearch,
        status, setStatus,
        selected, setSelected,
        loading, filtered,
        updateStatus, totalRevenue,
    }
}