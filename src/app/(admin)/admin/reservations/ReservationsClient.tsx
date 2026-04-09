'use client'

import { useState } from 'react'
import ReservationTable from '@/components/admin/ReservationTable/ReservationTable'

const statusFilters = [
    { key: 'all', label: 'Toutes' },
    { key: 'pending', label: 'En attente' },
    { key: 'confirmed', label: 'Confirmées' },
    { key: 'cancelled', label: 'Annulées' },
]

const ReservationsClient = ({ reservations }: { reservations: any[] }) => {
    const [status, setStatus] = useState('all')
    const [search, setSearch] = useState('')
    const [date, setDate] = useState('')

    const filtered = reservations.filter(r => {
        const matchStatus = status === 'all' || r.status === status
        const matchSearch = search === '' ||
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase())
        const matchDate = date === '' || r.date === date
        return matchStatus && matchSearch && matchDate
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                        Réservations
                    </h1>
                    <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                        {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <div
                className="flex items-center gap-6 mb-8 p-4 rounded-sm"
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

                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="bg-transparent text-sm font-light outline-none"
                    style={{ color: 'rgba(250,248,245,0.5)', colorScheme: 'dark' }}
                />

                <div className="flex gap-2">
                    {statusFilters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setStatus(f.key)}
                            className="px-4 py-1.5 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
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
                className="rounded-sm p-6"
                style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
            >
                <ReservationTable reservations={filtered} />
            </div>
        </div>
    )
}

export default ReservationsClient