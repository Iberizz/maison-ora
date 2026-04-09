'use client'

import {
    LineChart, Line, BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

const GOLD = '#C9A96E'
const GREEN = '#1D9E75'
const RED = '#E24B4A'
const AMBER = '#EF9F27'
const DIM = 'rgba(250,248,245,0.06)'

const mockCA = [
    { day: '1 Avr', ca: 1200 }, { day: '2 Avr', ca: 980 },
    { day: '3 Avr', ca: 1450 }, { day: '4 Avr', ca: 2100 },
    { day: '5 Avr', ca: 1800 }, { day: '6 Avr', ca: 2400 },
    { day: '7 Avr', ca: 1950 }, { day: '8 Avr', ca: 2200 },
    { day: '9 Avr', ca: 1600 }, { day: '10 Avr', ca: 2800 },
]

const mockResByDay = [
    { day: 'Lun', count: 3 }, { day: 'Mar', count: 5 },
    { day: 'Mer', count: 4 }, { day: 'Jeu', count: 7 },
    { day: 'Ven', count: 9 }, { day: 'Sam', count: 12 },
    { day: 'Dim', count: 6 },
]

const kpis = [
    { label: 'CA ce mois', value: '€12 400', delta: '+18%', up: true },
    { label: 'Réservations', value: '48', delta: '+6', up: true },
    { label: 'Taux conversion', value: '78%', delta: '+4%', up: true },
    { label: 'Panier moyen', value: '€258', delta: '-€12', up: false },
    { label: 'Users actifs', value: '124', delta: '+22', up: true },
]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
        <div className="px-4 py-3 rounded-sm" style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs tracking-widest uppercase font-light mb-1" style={{ color: 'rgba(250,248,245,0.4)' }}>{label}</p>
            <p className="text-sm font-light" style={{ color: '#FAF8F5' }}>{payload[0].value}</p>
        </div>
    )
}

const AnalyticsClient = ({ reservations }: { reservations: any[] }) => {
    const confirmed = reservations.filter(r => r.status === 'confirmed').length
    const cancelled = reservations.filter(r => r.status === 'cancelled').length
    const pending = reservations.filter(r => r.status === 'pending').length

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
                    Avril 2026
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
                        <p className="text-xs font-light" style={{ color: kpi.up ? GREEN : RED }}>
                            {kpi.up ? '↑' : '↓'} {kpi.delta} vs mois dernier
                        </p>
                    </div>
                ))}
            </div>

            <div className="rounded-sm p-6 mb-6" style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: 'rgba(250,248,245,0.4)' }}>
                    Chiffre d'affaires — 10 derniers jours
                </p>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={mockCA}>
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
                        <BarChart data={mockResByDay}>
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