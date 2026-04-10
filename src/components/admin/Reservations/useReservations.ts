'use client'

import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { logAction } from '@/lib/supabase/logger'
import type { Reservation, ReservationMetrics, ReservationStatus } from './reservations.types'

const toIsoDate = (value: Date) => {
    const y = value.getFullYear()
    const m = String(value.getMonth() + 1).padStart(2, '0')
    const d = String(value.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

const computeMetrics = (reservations: Reservation[]): ReservationMetrics => {
    const today = toIsoDate(new Date())
    const pending = reservations.filter((r) => r.status === 'pending').length
    const confirmed = reservations.filter((r) => r.status === 'confirmed').length
    const cancelled = reservations.filter((r) => r.status === 'cancelled').length
    const total = reservations.length
    const totalGuests = reservations.reduce((acc, r) => acc + (r.guests ?? 0), 0)
    const todayCount = reservations.filter((r) => r.date === today).length

    return {
        today: todayCount,
        pending,
        confirmed,
        cancelled,
        total,
        totalGuests,
        conversionRate: total ? Math.round((confirmed / total) * 100) : 0,
    }
}

export const useReservations = (initialReservations: Reservation[]) => {
    const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const metrics = useMemo(() => computeMetrics(reservations), [reservations])

    const updateReservationStatus = async (
        id: string,
        status: ReservationStatus,
        context?: { userEmail?: string }
    ) => {
        const current = reservations.find((r) => r.id === id)
        if (!current || current.status === status) return true

        setError(null)
        setUpdatingId(id)

        setReservations((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r))
        )

        const supabase = createClient()
        const { error: updateError } = await supabase
            .from('reservations')
            .update({ status })
            .eq('id', id)

        if (updateError) {
            setReservations((prev) =>
                prev.map((r) => (r.id === id ? { ...r, status: current.status } : r))
            )
            setError('Impossible de mettre à jour la réservation. Veuillez réessayer.')
            setUpdatingId(null)
            return false
        }

        await logAction({
            action: `Réservation ${status === 'confirmed' ? 'confirmée' : 'annulée'}`,
            entity: 'reservation',
            entity_id: id,
            user_email: context?.userEmail ?? 'admin@ora.fr',
            metadata: { name: current.name, date: current.date, status },
        })

        setUpdatingId(null)
        return true
    }

    return {
        reservations,
        setReservations,
        metrics,
        updatingId,
        error,
        updateReservationStatus,
    }
}
