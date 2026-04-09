'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Modal from '@/components/ui/Modal/Modal'
import { logAction } from '@/lib/supabase/logger'

const statusConfig: Record<string, { label: string, color: string, bg: string }> = {
    pending:   { label: 'En attente',  color: '#EF9F27', bg: 'rgba(239,159,39,0.1)' },
    confirmed: { label: 'Confirmée',   color: '#1D9E75', bg: 'rgba(29,158,117,0.1)' },
    cancelled: { label: 'Annulée',     color: '#E24B4A', bg: 'rgba(226,75,74,0.1)' },
}

interface ModalState {
    open: boolean
    id: string | null
    action: 'confirmed' | 'cancelled' | null
}

const ReservationTable = ({ reservations }: { reservations: any[] }) => {
    const [loading, setLoading] = useState<string | null>(null)
    const [modal, setModal] = useState<ModalState>({ open: false, id: null, action: null })
    const router = useRouter()

    const openModal = (id: string, action: 'confirmed' | 'cancelled') => {
        setModal({ open: true, id, action })
    }

    const closeModal = () => {
        setModal({ open: false, id: null, action: null })
    }

    const handleConfirm = async () => {
        if (!modal.id || !modal.action) return
        setLoading(modal.id)
        const supabase = createClient()
        await supabase.from('reservations').update({ status: modal.action }).eq('id', modal.id)
        await logAction({
            action: `Réservation ${modal.action === 'confirmed' ? 'confirmée' : 'annulée'}`,
            entity: 'reservation',
            entity_id: modal.id ?? undefined,
            user_email: 'admin@ora.fr',
            metadata: { name: reservation?.name, date: reservation?.date }
        })
        setLoading(null)
        closeModal()
        router.refresh()
    }

    if (!reservations.length) return (
        <p className="text-xs font-light" style={{ color: 'rgba(250,248,245,0.3)' }}>
            Aucune réservation pour le moment.
        </p>
    )

    const actionLabel = modal.action === 'confirmed' ? 'confirmer' : 'annuler'
    const reservation = reservations.find(r => r.id === modal.id)

    return (
        <>
            <table className="w-full">
                <thead>
                <tr style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
                    {['Nom', 'Date', 'Heure', 'Personnes', 'Statut', 'Actions'].map(h => (
                        <th key={h} className="text-left pb-4 text-xs tracking-widest uppercase font-light"
                            style={{ color: 'rgba(250,248,245,0.3)' }}>
                            {h}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {reservations.map(r => {
                    const s = statusConfig[r.status] ?? statusConfig.pending
                    return (
                        <tr key={r.id} style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
                            <td className="py-4 text-sm font-light" style={{ color: '#FAF8F5' }}>{r.name}</td>
                            <td className="py-4 text-sm font-light" style={{ color: 'rgba(250,248,245,0.6)' }}>{r.date}</td>
                            <td className="py-4 text-sm font-light" style={{ color: 'rgba(250,248,245,0.6)' }}>{r.time}</td>
                            <td className="py-4 text-sm font-light" style={{ color: 'rgba(250,248,245,0.6)' }}>{r.guests}</td>
                            <td className="py-4">
                  <span className="text-xs tracking-widest uppercase font-light px-3 py-1 rounded-sm"
                        style={{ color: s.color, backgroundColor: s.bg }}>
                    {s.label}
                  </span>
                            </td>
                            <td className="py-4">
                                <div className="flex gap-3">
                                    {r.status !== 'confirmed' && (
                                        <button
                                            onClick={() => openModal(r.id, 'confirmed')}
                                            disabled={loading === r.id}
                                            className="text-xs tracking-widest uppercase font-light transition-all duration-200"
                                            style={{ color: '#1D9E75' }}
                                        >
                                            Confirmer
                                        </button>
                                    )}
                                    {r.status !== 'cancelled' && (
                                        <button
                                            onClick={() => openModal(r.id, 'cancelled')}
                                            disabled={loading === r.id}
                                            className="text-xs tracking-widest uppercase font-light transition-all duration-200"
                                            style={{ color: '#E24B4A' }}
                                        >
                                            Annuler
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>

            <Modal
                isOpen={modal.open}
                onClose={closeModal}
                title="Confirmation"
            >
                <div style={{ color: '#0F0E0D' }}>
                    <p className="font-serif font-light text-xl mb-3">
                        {modal.action === 'confirmed' ? 'Confirmer la réservation' : 'Annuler la réservation'}
                    </p>
                    {reservation && (
                        <p className="text-sm font-light leading-relaxed mb-8" style={{ color: '#6B6560' }}>
                            Voulez-vous vraiment {actionLabel} la réservation de {reservation.name} le {reservation.date} à {reservation.time} ?
                        </p>
                    )}
                    <div className="flex gap-4">
                        <button
                            onClick={handleConfirm}
                            disabled={!!loading}
                            className="px-6 py-3 text-xs tracking-widest uppercase font-light transition-all duration-200"
                            style={{
                                backgroundColor: modal.action === 'confirmed' ? '#1D9E75' : '#E24B4A',
                                color: '#FAF8F5',
                            }}
                        >
                            {loading ? 'En cours...' : `Oui, ${actionLabel}`}
                        </button>
                        <button
                            onClick={closeModal}
                            className="px-6 py-3 text-xs tracking-widest uppercase font-light transition-all duration-200"
                            style={{ border: '0.5px solid #E0DDD7', color: '#6B6560' }}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ReservationTable