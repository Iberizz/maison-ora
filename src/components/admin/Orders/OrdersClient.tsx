'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useOrders } from './useOrders'
import { Order, OrderStatus } from './Orders.types'

const statusConfig: Record<string, { label: string, color: string, bg: string }> = {
    pending:    { label: 'En attente',   color: '#EF9F27', bg: 'rgba(239,159,39,0.1)' },
    preparing:  { label: 'En préparation', color: '#378ADD', bg: 'rgba(55,138,221,0.1)' },
    served:     { label: 'Servi',        color: '#C9A96E', bg: 'rgba(201,169,110,0.1)' },
    paid:       { label: 'Payé',         color: '#1D9E75', bg: 'rgba(29,158,117,0.1)' },
    cancelled:  { label: 'Annulé',       color: '#E24B4A', bg: 'rgba(226,75,74,0.1)' },
}

const statusFlow: OrderStatus[] = ['pending', 'preparing', 'served', 'paid']

const statusFilters = [
    { key: 'all', label: 'Toutes' },
    ...Object.entries(statusConfig).map(([key, val]) => ({ key, label: val.label }))
]

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
})

const OrdersClient = ({ orders }: { orders: Order[] }) => {
    const {
        search, setSearch,
        status, setStatus,
        selected, setSelected,
        loading, filtered,
        updateStatus, totalRevenue,
    } = useOrders(orders)

    const nextStatus = (current: OrderStatus): OrderStatus | null => {
        const idx = statusFlow.indexOf(current)
        return idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null
    }

    return (
        <div className="flex gap-6">
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                            Commandes
                        </h1>
                        <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                            {filtered.length} commande{filtered.length > 1 ? 's' : ''} · CA encaissé : €{totalRevenue.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-4 mb-6 px-4 py-3 rounded-sm"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                >
                    <input
                        type="text"
                        placeholder="Rechercher un client..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent text-sm font-light outline-none flex-1"
                        style={{ color: '#FAF8F5' }}
                    />
                    <div className="flex gap-2 flex-wrap">
                        {statusFilters.map(f => (
                            <button
                                key={f.key}
                                onClick={() => setStatus(f.key as any)}
                                className="px-3 py-1 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                                style={{
                                    backgroundColor: status === f.key ? 'rgba(201,169,110,0.15)' : 'transparent',
                                    color: status === f.key ? '#C9A96E' : 'rgba(250,248,245,0.4)',
                                    border: status === f.key ? '0.5px solid rgba(201,169,110,0.3)' : '0.5px solid transparent',
                                }}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    className="rounded-sm overflow-hidden"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                >
                    {filtered.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-sm font-light" style={{ color: 'rgba(250,248,245,0.3)' }}>
                                Aucune commande pour le moment.
                            </p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                            <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                                {['Date', 'Client', 'Table', 'Total', 'Statut', 'Action'].map(h => (
                                    <th key={h} className="text-left px-6 py-4 text-xs tracking-widest uppercase font-light"
                                        style={{ color: 'rgba(250,248,245,0.3)' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            <AnimatePresence>
                                {filtered.map((order, i) => {
                                    const s = statusConfig[order.status]
                                    const next = nextStatus(order.status)
                                    return (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2, delay: i * 0.03 }}
                                            onClick={() => setSelected(order)}
                                            className="cursor-pointer transition-all duration-200"
                                            style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}
                                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                        >
                                            <td className="px-6 py-4 text-xs font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                                                {formatDate(order.created_at)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-light" style={{ color: '#FAF8F5' }}>{order.client_name}</p>
                                                {order.client_email && (
                                                    <p className="text-xs font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>{order.client_email}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-light" style={{ color: 'rgba(250,248,245,0.6)' }}>
                                                {order.table_number ? `Table ${order.table_number}` : '—'}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-light" style={{ color: '#C9A96E' }}>
                                                €{order.total.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                          <span
                              className="text-xs tracking-widest uppercase font-light px-3 py-1 rounded-sm"
                              style={{ color: s.color, backgroundColor: s.bg }}
                          >
                            {s.label}
                          </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {next && order.status !== 'cancelled' && (
                                                    <button
                                                        onClick={e => { e.stopPropagation(); updateStatus(order.id, next) }}
                                                        disabled={loading === order.id}
                                                        className="text-xs tracking-widest uppercase font-light transition-all duration-200"
                                                        style={{ color: statusConfig[next].color }}
                                                    >
                                                        {loading === order.id ? '...' : `→ ${statusConfig[next].label}`}
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                            </AnimatePresence>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-80 flex-shrink-0 rounded-sm p-6"
                        style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)', height: 'fit-content' }}
                    >
                        <div className="flex items-center justify-between mb-6">
              <span className="text-xs tracking-widest uppercase font-light" style={{ color: '#C9A96E' }}>
                Détail commande
              </span>
                            <button onClick={() => setSelected(null)} style={{ color: 'rgba(250,248,245,0.3)', fontSize: '12px' }}>✕</button>
                        </div>

                        <div className="mb-6 pb-6" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                            <p className="text-sm font-light mb-1" style={{ color: '#FAF8F5' }}>{selected.client_name}</p>
                            <p className="text-xs font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>{selected.client_email ?? '—'}</p>
                            {selected.table_number && (
                                <p className="text-xs font-light mt-1" style={{ color: '#C9A96E' }}>Table {selected.table_number}</p>
                            )}
                        </div>

                        <div className="mb-6 pb-6" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                            <p className="text-xs tracking-widest uppercase font-light mb-4" style={{ color: 'rgba(250,248,245,0.3)' }}>
                                Articles
                            </p>
                            {selected.items.length === 0 ? (
                                <p className="text-xs font-light" style={{ color: 'rgba(250,248,245,0.3)' }}>Aucun article</p>
                            ) : (
                                selected.items.map((item, i) => (
                                    <div key={i} className="flex justify-between mb-3">
                                        <div>
                                            <p className="text-sm font-light" style={{ color: '#FAF8F5' }}>{item.title}</p>
                                            <p className="text-xs font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>x{item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-light" style={{ color: '#C9A96E' }}>€{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex justify-between mb-6">
                            <p className="text-sm font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>Total</p>
                            <p className="text-lg font-serif font-light" style={{ color: '#C9A96E' }}>€{selected.total.toFixed(2)}</p>
                        </div>

                        {selected.notes && (
                            <div className="mb-6 p-3 rounded-sm" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                <p className="text-xs font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>{selected.notes}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            {statusFlow.map(s => (
                                <button
                                    key={s}
                                    onClick={() => updateStatus(selected.id, s)}
                                    disabled={selected.status === s || loading === selected.id}
                                    className="py-2 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                                    style={{
                                        backgroundColor: selected.status === s ? statusConfig[s].bg : 'transparent',
                                        color: selected.status === s ? statusConfig[s].color : 'rgba(250,248,245,0.3)',
                                        border: `0.5px solid ${selected.status === s ? statusConfig[s].color : 'rgba(255,255,255,0.06)'}`,
                                    }}
                                >
                                    {statusConfig[s].label}
                                </button>
                            ))}
                            <button
                                onClick={() => updateStatus(selected.id, 'cancelled')}
                                disabled={selected.status === 'cancelled'}
                                className="py-2 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                                style={{
                                    backgroundColor: selected.status === 'cancelled' ? 'rgba(226,75,74,0.1)' : 'transparent',
                                    color: selected.status === 'cancelled' ? '#E24B4A' : 'rgba(226,75,74,0.4)',
                                    border: `0.5px solid ${selected.status === 'cancelled' ? '#E24B4A' : 'rgba(226,75,74,0.2)'}`,
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default OrdersClient