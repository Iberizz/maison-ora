'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'

type ContactPayload = {
    name: string
    email: string
    message: string
}

export const createContactMessage = async (data: ContactPayload) => {
    const supabase = await createServerSupabaseClient()

    const { error } = await supabase
        .from('contact_messages')
        .insert({
            name: data.name,
            email: data.email,
            message: data.message,
        })

    if (error) throw new Error(error.message)

    return { success: true }
}
