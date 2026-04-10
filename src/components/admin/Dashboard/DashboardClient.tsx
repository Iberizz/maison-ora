'use client'

import { motion } from 'framer-motion'
import ReservationTable from '@/components/admin/ReservationTable/ReservationTable'
import { useReservations } from '@/components/admin/Reservations/useReservations'
import type { Reservation } from '@/components/admin/Reservations/reservations.types'

interface Props {
    reservations: Reservation[]
    overview: {
        totalMessages: number
        newMessages: number
        totalOrders: number
        pendingOrders: number
        totalMenuItems: number
        availableMenuItems: number
    }
}

const kpiConfig = [
    { key: 'today',          label: 'Ce soir',           color: '#C9A96E' },
    { key: 'pending',        label: 'En attente',         color: '#EF9F27' },
    { key: 'confirmed',      label: 'Confirmées',         color: '#1D9E75' },
    { key: 'cancelled',      label: 'Annulées',           color: '#E24B4A' },
    { key: 'total',          label: 'Total réservations', color: 'rgba(250,248,245,0.5)' },
    { key: 'totalGuests',    label: 'Couverts total',     color: '#C9A96E' },
    { key: 'conversionRate', label: 'Taux confirmation',  color: '#1D9E75' },
]

const DashboardClient = ({ reservations: initialReservations, overview }: Props) => {
    const { reservations, metrics, updatingId, error, updateReservationStatus } = useReservations(initialReservations)
    const recentReservations = reservations.slice(0, 10)
    const today = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                        Dashboard
                    </h1>
                    <p className="text-xs tracking-widest capitalize font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                        {today}
                    </p>
                </div>

                <div className="flex gap-3">
                <a
                    href="/admin/reservations/new"
                    className="px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-200"
                    style={{ border: '0.5px solid #C9A96E', color: '#C9A96E' }}
                    onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#C9A96E'
                    e.currentTarget.style.color = '#0F0E0D'
                }}
                    onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#C9A96E'
                }}
                    >
                    Nouvelle réservation
                </a>
                <a
                href="/admin/menu/new"
                className="px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-200"
                style={{ border: '0.5px solid #C9A96E', color: '#C9A96E' }}
                onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#C9A96E'
                e.currentTarget.style.color = '#0F0E0D'
            }}
                onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#C9A96E'
            }}
                >
                Ajouter un plat
            </a>
        </div>
</div>

    <div className="grid grid-cols-4 gap-4 mb-10">
        {kpiConfig.map((kpi, i) => (
            <motion.div
                key={kpi.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-sm"
                style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
            >
                <p className="text-xs tracking-widest uppercase font-light mb-3" style={{ color: 'rgba(250,248,245,0.4)' }}>
                    {kpi.label}
                </p>
                <p className="font-serif font-light text-4xl" style={{color: kpi.color}}>
                    {metrics[kpi.key as keyof typeof metrics]}{kpi.key === 'conversionRate' ? '%' : ''}
                </p>
            </motion.div>
        ))}
    </div>

            <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                    { label: 'Messages', value: `${overview.totalMessages}`, hint: `${overview.newMessages} nouveaux`, color: '#EF9F27' },
                    { label: 'Commandes', value: `${overview.totalOrders}`, hint: `${overview.pendingOrders} en attente`, color: '#378ADD' },
                    { label: 'Menu', value: `${overview.availableMenuItems}/${overview.totalMenuItems}`, hint: 'plats disponibles', color: '#1D9E75' },
                ].map((item) => (
                    <div
                        key={item.label}
                        className="p-5 rounded-sm"
                        style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                    >
                        <p className="text-xs tracking-widest uppercase font-light mb-2" style={{ color: 'rgba(250,248,245,0.4)' }}>
                            {item.label}
                        </p>
                        <p className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                            {item.value}
                        </p>
                        <p className="text-xs font-light" style={{ color: item.color }}>
                            {item.hint}
                        </p>
                    </div>
                ))}
            </div>

            <div
                className="rounded-sm p-6"
                style={{backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
    >
        <p className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: 'rgba(250,248,245,0.4)' }}>
            Réservations récentes
        </p>
        {error && (
            <p className="mb-4 text-sm" style={{ color: '#E24B4A' }}>
                {error}
            </p>
        )}
        <ReservationTable
            reservations={recentReservations}
            loadingId={updatingId}
            onStatusChange={updateReservationStatus}
        />
    </div>
</div>
)
}

export default DashboardClient