'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ReservationData } from '@/components/sections/Reservation/Reservation.types'

export const createReservation = async (data: ReservationData) => {
    const supabase = await createServerSupabaseClient()

    const { error } = await supabase
        .from('reservations')
        .insert({
            guests: data.guests,
            date: data.date,
            time: data.time,
            name: data.name,
            email: data.email,
            phone: data.phone,
        })

    if (error) throw new Error(error.message)

    return { success: true }
}