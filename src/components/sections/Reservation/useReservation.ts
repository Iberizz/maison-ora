import { useState } from 'react'
import { ReservationStep, ReservationData } from './Reservation.types'

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

    return { step, data, update, nextStep, prevStep, canProceed }
}