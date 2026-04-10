import { useState } from 'react'
import { ReservationStep, ReservationData } from './Reservation.types'
import { createReservation } from '@/lib/supabase/actions/reservation'

type ReservationField = 'name' | 'email' | 'phone'

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

    const validateField = (field: ReservationField, value: string) => {
        const trimmedValue = value.trim()

        if (field === 'name') {
            if (!trimmedValue) return 'Le nom est obligatoire.'
            if (trimmedValue.length < 2) return 'Le nom doit contenir au moins 2 caracteres.'
            return null
        }

        if (field === 'email') {
            if (!trimmedValue) return "L'email est obligatoire."
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(trimmedValue)) return "Le format de l'email est invalide."
            return null
        }

        if (!trimmedValue) return 'Le telephone est obligatoire.'
        const phoneRegex = /^[+\d\s().-]{8,20}$/
        if (!phoneRegex.test(trimmedValue)) return 'Le format du telephone est invalide.'
        return null
    }

    const getFieldError = (field: ReservationField) => validateField(field, data[field])

    const getStep3Errors = () => ({
        name: getFieldError('name'),
        email: getFieldError('email'),
        phone: getFieldError('phone'),
    })

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4) as ReservationStep)
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1) as ReservationStep)

    const update = (fields: Partial<ReservationData>) => {
        setData(prev => ({ ...prev, ...fields }))
    }

    const canProceed = () => {
        if (step === 1) return data.guests !== null
        if (step === 2) return data.date !== '' && data.time !== ''
        if (step === 3) {
            const step3Errors = getStep3Errors()
            return !step3Errors.name && !step3Errors.email && !step3Errors.phone
        }
        return true
    }

    const confirm = async () => {
        if (!canProceed()) return false
        setLoading(true)
        setError(null)
        try {
            await createReservation({
                ...data,
                name: data.name.trim(),
                email: data.email.trim(),
                phone: data.phone.trim(),
            })
            return true
        } catch {
            setError('Une erreur est survenue. Veuillez réessayer.')
            return false
        } finally {
            setLoading(false)
        }
    }

    return { step, data, update, nextStep, prevStep, canProceed, confirm, loading, error, getFieldError }
}