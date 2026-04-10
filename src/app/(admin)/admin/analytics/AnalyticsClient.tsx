'use client'

import {
    LineChart, Line, BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import type { Reservation } from '@/components/admin/Reservations/reservations.types'

const GOLD = '#C9A96E'
const GREEN = '#1D9E75'
const RED = '#E24B4A'
const AMBER = '#EF9F27'
const DIM = 'rgba(250,248,245,0.06)'

const AVERAGE_TICKET = 258

const toDate = (value: string) => {
    const [y, m, d] = value.split('-').map(Number)
    return new Date(y, (m ?? 1) - 1, d ?? 1)
}

const getLastDays = (count: number) => {
    const days: Date[] = []
    const today = new Date()
    for (let i = count - 1; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        days.push(d)
    }
    return days
}

const formatKey = (value: Date) => {
    const y = value.getFullYear()
    const m = String(value.getMonth() + 1).padStart(2, '0')
    const d = String(value.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

const formatDay = (value: Date) => value.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
        <div className="px-4 py-3 rounded-sm" style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs tracking-widest uppercase font-light mb-1" style={{ color: 'rgba(250,248,245,0.4)' }}>{label}</p>
            <p className="text-sm font-light" style={{ color: '#FAF8F5' }}>{payload[0].value}</p>
        </div>
    )
}

const AnalyticsClient = ({ reservations }: { reservations: Reservation[] }) => {
    const confirmed = reservations.filter(r => r.status === 'confirmed').length
    const cancelled = reservations.filter(r => r.status === 'cancelled').length
    const pending = reservations.filter(r => r.status === 'pending').length
    const total = reservations.length

    const monthRevenue = reservations
        .filter((r) => r.status === 'confirmed')
        .reduce((acc, r) => acc + ((r.guests ?? 0) * AVERAGE_TICKET), 0)

    const averageTicket = confirmed
        ? Math.round(monthRevenue / confirmed)
        : 0

    const conversionRate = total
        ? Math.round((confirmed / total) * 100)
        : 0

    const last10Days = getLastDays(10)
    const confirmedByDate = reservations
        .filter((r) => r.status === 'confirmed')
        .reduce<Record<string, number>>((acc, r) => {
            acc[r.date] = (acc[r.date] ?? 0) + (r.guests ?? 0)
            return acc
        }, {})

    const revenueSeries = last10Days.map((day) => {
        const key = formatKey(day)
        return {
            day: formatDay(day),
            ca: (confirmedByDate[key] ?? 0) * AVERAGE_TICKET,
        }
    })

    const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    const reservationsByWeekday = weekdays.map((day, index) => ({
        day,
        count: reservations.filter((r) => toDate(r.date).getDay() === index).length,
    }))

    const kpis = [
        { label: 'CA estimé', value: `€${monthRevenue.toLocaleString('fr-FR')}` },
        { label: 'Réservations', value: `${total}` },
        { label: 'Taux conversion', value: `${conversionRate}%` },
        { label: 'Panier moyen', value: `€${averageTicket.toLocaleString('fr-FR')}` },
        { label: 'Couverts confirmés', value: `${reservations.filter((r) => r.status === 'confirmed').reduce((acc, r) => acc + (r.guests ?? 0), 0)}` },
    ]

    const pieData = [
        { name: 'Confirmées', value: confirmed || 1, color: GREEN },
        { name: 'Annulées', value: cancelled || 0, color: RED },
        { name: 'En attente', value: pending || 0, color: AMBER },
    ]

    return (
        <div>
            <div className="mb-10">
                <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>Analytics</h1>
                <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                    Données en temps réel
                </p>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-8">
                {kpis.map((kpi, i) => (
                    <div key={i} className="p-5 rounded-sm" style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-xs tracking-widest uppercase font-light mb-3" style={{ color: 'rgba(250,248,245,0.4)' }}>
                            {kpi.label}
                        </p>
                        <p className="font-serif font-light text-3xl mb-2" style={{ color: '#FAF8F5' }}>
                            {kpi.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="rounded-sm p-6 mb-6" style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: 'rgba(250,248,245,0.4)' }}>
                    Chiffre d'affaires — 10 derniers jours
                </p>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={revenueSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke={DIM} />
                        <XAxis dataKey="day" tick={{ fill: 'rgba(250,248,245,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'rgba(250,248,245,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `€${v}`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="ca" stroke={GOLD} strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="rounded-sm p-6" style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: 'rgba(250,248,245,0.4)' }}>
                        Réservations par jour
                    </p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={reservationsByWeekday}>
                            <CartesianGrid strokeDasharray="3 3" stroke={DIM} />
                            <XAxis dataKey="day" tick={{ fill: 'rgba(250,248,245,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'rgba(250,248,245,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill={GOLD} radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-sm p-6" style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: 'rgba(250,248,245,0.4)' }}>
                        Statuts des réservations
                    </p>
                    <div className="flex items-center gap-8">
                        <ResponsiveContainer width={160} height={160}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                                    {pieData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col gap-4">
                            {pieData.map((entry, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <div>
                                        <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                                            {entry.name}
                                        </p>
                                        <p className="text-lg font-serif font-light" style={{ color: '#FAF8F5' }}>
                                            {entry.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsClient