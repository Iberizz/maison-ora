import { useState } from 'react'
import { ReservationStep, ReservationData } from './Reservation.types'
import { createReservation } from '@/lib/supabase/actions/reservation'

const initialData: ReservationData = {
    guests: null,
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
}

export const useReservation = () => {
    const [step, setStep] = useState<ReservationStep>(1)
    const [data, setData] = useState<ReservationData>(initialData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4) as ReservationStep)
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as ReservationStep)

    const update = (fields: Partial<ReservationData>) => {
        setData(prev => ({ ...prev, ...fields }))
    }

    const canProceed = () => {
        if (step === 1) return data.guests !== null
        if (step === 2) return data.date !== '' && data.time !== ''
        if (step === 3) return data.name !== '' && data.email !== ''
        return true
    }

    const confirm = async () => {
        setLoading(true)
        setError(null)
        try {
            await createReservation(data)
            return true
        } catch (e) {
            setError('Une erreur est survenue. Veuillez réessayer.')
            return false
        } finally {
            setLoading(false)
        }
    }

    return { step, data, update, nextStep, prevStep, canProceed, confirm, loading, error }
}