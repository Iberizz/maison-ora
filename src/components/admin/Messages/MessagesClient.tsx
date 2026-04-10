'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type MessageStatus = 'new' | 'read' | 'handled'

type ContactMessage = {
    id: string
    name: string
    email: string
    message: string
    created_at: string
    status?: MessageStatus | null
}

const statusFilters: Array<{ key: MessageStatus | 'all'; label: string }> = [
    { key: 'all', label: 'Tous' },
    { key: 'new', label: 'Nouveaux' },
    { key: 'read', label: 'Lus' },
    { key: 'handled', label: 'Traités' },
]

const statusStyles: Record<MessageStatus, { color: string; bg: string }> = {
    new: { color: '#EF9F27', bg: 'rgba(239,159,39,0.1)' },
    read: { color: '#378ADD', bg: 'rgba(55,138,221,0.1)' },
    handled: { color: '#1D9E75', bg: 'rgba(29,158,117,0.1)' },
}

const getStatus = (message: ContactMessage): MessageStatus => {
    if (message.status === 'read' || message.status === 'handled') return message.status
    return 'new'
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

const MessagesClient = ({ messages }: { messages: ContactMessage[] }) => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<MessageStatus | 'all'>('all')
    const [selectedId, setSelectedId] = useState<string | null>(messages[0]?.id ?? null)
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const filtered = useMemo(() => {
        return messages.filter((m) => {
            const status = getStatus(m)
            const matchStatus = statusFilter === 'all' || status === statusFilter
            const q = search.toLowerCase()
            const matchSearch =
                q === '' ||
                m.name.toLowerCase().includes(q) ||
                m.email.toLowerCase().includes(q) ||
                m.message.toLowerCase().includes(q)
            return matchStatus && matchSearch
        })
    }, [messages, search, statusFilter])

    const selected = filtered.find((m) => m.id === selectedId) ?? filtered[0] ?? null

    const updateStatus = async (id: string, status: MessageStatus) => {
        setLoadingId(id)
        setError(null)
        const supabase = createClient()
        const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id)
        setLoadingId(null)

        if (error) {
            setError("Impossible de mettre à jour le statut. Vérifie la colonne 'status'.")
            return
        }
        router.refresh()
    }

    const deleteMessage = async (id: string) => {
        setLoadingId(id)
        setError(null)
        const supabase = createClient()
        const { error } = await supabase.from('contact_messages').delete().eq('id', id)
        setLoadingId(null)

        if (error) {
            setError('Impossible de supprimer ce message.')
            return
        }
        router.refresh()
    }

    return (
        <div className="flex gap-6 h-full">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="font-serif font-light text-3xl mb-1" style={{ color: '#FAF8F5' }}>
                            Messages
                        </h1>
                        <p className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(250,248,245,0.4)' }}>
                            {filtered.length} message{filtered.length > 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                <div
                    className="flex items-center gap-4 mb-4 px-4 py-3 rounded-sm"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                >
                    <input
                        type="text"
                        placeholder="Rechercher nom, email, message..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent text-sm font-light outline-none flex-1"
                        style={{ color: '#FAF8F5' }}
                    />
                </div>

                <div className="flex gap-2 mb-6">
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setStatusFilter(filter.key)}
                            className="px-4 py-1.5 text-xs tracking-widest uppercase font-light transition-all duration-200 rounded-sm"
                            style={{
                                backgroundColor: statusFilter === filter.key ? 'rgba(201,169,110,0.15)' : 'transparent',
                                color: statusFilter === filter.key ? '#C9A96E' : 'rgba(250,248,245,0.4)',
                                border: statusFilter === filter.key ? '0.5px solid rgba(201,169,110,0.3)' : '0.5px solid transparent',
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {error && (
                    <p className="mb-4 text-sm" style={{ color: '#E24B4A' }}>
                        {error}
                    </p>
                )}

                <div
                    className="rounded-sm overflow-hidden"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)' }}
                >
                    <table className="w-full">
                        <thead>
                            <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                                {['Date', 'Nom', 'Email', 'Statut', ''].map((h) => (
                                    <th
                                        key={h}
                                        className="text-left px-6 py-4 text-xs tracking-widest uppercase font-light"
                                        style={{ color: 'rgba(250,248,245,0.3)' }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((m, i) => {
                                const status = getStatus(m)
                                const style = statusStyles[status]
                                return (
                                    <motion.tr
                                        key={m.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: i * 0.02 }}
                                        onClick={() => setSelectedId(m.id)}
                                        className="cursor-pointer"
                                        style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}
                                    >
                                        <td className="px-6 py-4 text-xs font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>
                                            {formatDate(m.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light" style={{ color: '#FAF8F5' }}>
                                            {m.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light" style={{ color: 'rgba(250,248,245,0.5)' }}>
                                            {m.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className="text-xs tracking-widest uppercase font-light px-3 py-1 rounded-sm"
                                                style={{ color: style.color, backgroundColor: style.bg }}
                                            >
                                                {status === 'new' ? 'Nouveau' : status === 'read' ? 'Lu' : 'Traité'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs tracking-widest uppercase font-light" style={{ color: '#C9A96E' }}>
                                            Voir →
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {selected && (
                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-96 rounded-sm p-6"
                    style={{ backgroundColor: '#1C1C1A', border: '0.5px solid rgba(255,255,255,0.06)', height: 'fit-content' }}
                >
                    <p className="text-xs tracking-widest uppercase font-light mb-2" style={{ color: '#C9A96E' }}>
                        Message client
                    </p>
                    <h2 className="font-serif font-light text-2xl mb-1" style={{ color: '#FAF8F5' }}>
                        {selected.name}
                    </h2>
                    <p className="text-sm mb-6" style={{ color: 'rgba(250,248,245,0.5)' }}>
                        {selected.email}
                    </p>

                    <p className="text-sm leading-relaxed whitespace-pre-wrap mb-8" style={{ color: '#FAF8F5' }}>
                        {selected.message}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <button
                            disabled={loadingId === selected.id}
                            onClick={() => updateStatus(selected.id, 'read')}
                            className="px-4 py-2 text-xs tracking-widest uppercase font-light"
                            style={{ border: '0.5px solid #378ADD', color: '#378ADD' }}
                        >
                            Marquer lu
                        </button>
                        <button
                            disabled={loadingId === selected.id}
                            onClick={() => updateStatus(selected.id, 'handled')}
                            className="px-4 py-2 text-xs tracking-widest uppercase font-light"
                            style={{ border: '0.5px solid #1D9E75', color: '#1D9E75' }}
                        >
                            Marquer traité
                        </button>
                        <button
                            disabled={loadingId === selected.id}
                            onClick={() => deleteMessage(selected.id)}
                            className="px-4 py-2 text-xs tracking-widest uppercase font-light"
                            style={{ border: '0.5px solid #E24B4A', color: '#E24B4A' }}
                        >
                            Supprimer
                        </button>
                    </div>
                </motion.aside>
            )}
        </div>
    )
}

export default MessagesClient
