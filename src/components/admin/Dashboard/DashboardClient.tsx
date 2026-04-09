'use client'

import { motion } from 'framer-motion'
import ReservationTable from '@/components/admin/ReservationTable/ReservationTable'

interface KPIs {
    today: number
    pending: number
    confirmed: number
    cancelled: number
    total: number
    totalGuests: number
    conversionRate: number
    availableItems: number
}

interface Props {
    reservations: any[]
    kpis: KPIs
}

const kpiConfig = [
    { key: 'today',          label: 'Ce soir',           color: '#C9A96E' },
    { key: 'pending',        label: 'En attente',         color: '#EF9F27' },
    { key: 'confirmed',      label: 'Confirmées',         color: '#1D9E75' },
    { key: 'cancelled',      label: 'Annulées',           color: '#E24B4A' },
    { key: 'total',          label: 'Total réservations', color: 'rgba(250,248,245,0.5)' },
    { key: 'totalGuests',    label: 'Couverts total',     color: '#C9A96E' },
    { key: 'conversionRate', label: 'Taux confirmation',  color: '#1D9E75' },
    { key: 'availableItems', label: 'Plats disponibles',  color: 'rgba(250,248,245,0.5)' },
]

const DashboardClient = ({ reservations, kpis }: Props) => {
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
                    <p className="text-xs tracking-widest uppercase font-light capitalize" style={{ color: 'rgba(250,248,245,0.4)' }}>
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
                    {kpis[kpi.key as keyof KPIs]}{kpi.key === 'conversionRate' ? '%' : ''}
                </p>
            </motion.div>
        ))}
    </div>

            <div
                className="rounded-sm p-6"
                style={{backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
    >
        <p className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: 'rgba(250,248,245,0.4)' }}>
            Réservations récentes
        </p>
        <ReservationTable reservations={reservations} />
    </div>
</div>
)
}

export default DashboardClient