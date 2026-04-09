'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Client {
    id: string
    name: string
    email: string
    phone: string
    reservations: number
    totalSpent: number
    lastVisit: string
    status: string
}

const ClientsClient = ({ clients }: { clients: Client[] }) => {
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState<Client | null>(null)

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex gap-6 h-full">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                            Clients
                        </h1>
                        <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                            {filtered.length} client{filtered.length > 1 ? 's' : ''}
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
                </div>

                <div
                    className="rounded-sm overflow-hidden"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                >
                    <table className="w-full">
                        <thead>
                        <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                            {['Nom', 'Email', 'Réservations', 'Total dépensé', 'Dernière visite', ''].map(h => (
                                <th key={h} className="text-left px-6 py-4 text-xs tracking-widest uppercase font-light"
                                    style={{ color: 'rgba(250,248,245,0.3)' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map((client, i) => (
                            <motion.tr
                                key={client.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                onClick={() => setSelected(client)}
                                className="cursor-pointer transition-all duration-200"
                                style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <td className="px-6 py-4 text-sm font-light" style={{ color: '#FAF8F5' }}>{client.name}</td>
                                <td className="px-6 py-4 text-sm font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>{client.email}</td>
                                <td className="px-6 py-4 text-sm font-light" style={{ color: '#C9A96E' }}>{client.reservations}</td>
                                <td className="px-6 py-4 text-sm font-light" style={{ color: '#FAF8F5' }}>€{client.totalSpent}</td>
                                <td className="px-6 py-4 text-sm font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>{client.lastVisit}</td>
                                <td className="px-6 py-4 text-xs tracking-widest uppercase font-light" style={{ color: '#C9A96E' }}>
                                    Voir →
                                </td>
                            </motion.tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selected && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-80 rounded-sm p-6"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)', height: 'fit-content' }}
                >
                    <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-widest uppercase font-light" style={{ color: '#C9A96E' }}>
              Fiche client
            </span>
                        <button
                            onClick={() => setSelected(null)}
                            className="text-xs font-light"
                            style={{ color: 'rgba(250,248,245,0.3)' }}
                        >
                            ✕
                        </button>
                    </div>

                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-6 font-serif text-lg"
                        style={{ backgroundColor: 'rgba(201,169,110,0.1)', color: '#C9A96E' }}
                    >
                        {selected.name.charAt(0)}
                    </div>

                    <h3 className="font-serif font-light text-xl mb-1" style={{ color: '#FAF8F5' }}>
                        {selected.name}
                    </h3>

                    <div className="flex flex-col gap-4 mt-6">
                        {[
                            { label: 'Email', value: selected.email },
                            { label: 'Téléphone', value: selected.phone || '—' },
                            { label: 'Réservations', value: selected.reservations.toString() },
                            { label: 'Total dépensé', value: `€${selected.totalSpent}` },
                            { label: 'Dernière visite', value: selected.lastVisit },
                        ].map(row => (
                            <div key={row.label} className="pb-4" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                                <p className="text-xs tracking-widest uppercase font-light mb-1" style={{ color: 'rgba(250,248,245,0.3)' }}>
                                    {row.label}
                                </p>
                                <p className="text-sm font-light" style={{ color: '#FAF8F5' }}>
                                    {row.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default ClientsClient