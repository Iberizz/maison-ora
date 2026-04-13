'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'

export type ContactFormState = {
    status: 'idle' | 'success' | 'error'
    message?: string
}

export async function submitContact(
    _prev: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const name    = formData.get('name')?.toString().trim() ?? ''
    const email   = formData.get('email')?.toString().trim() ?? ''
    const message = formData.get('message')?.toString().trim() ?? ''

    // Validation basique
    if (!name || !email || !message) {
        return { status: 'error', message: 'Tous les champs sont requis.' }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { status: 'error', message: 'Adresse email invalide.' }
    }
    if (message.length < 10) {
        return { status: 'error', message: 'Message trop court.' }
    }

    try {
        const supabase = await createServerSupabaseClient()
        const { error } = await supabase
            .from('contact_messages')
            .insert({ name, email, message, status: 'new' })

        if (error) throw error

        return { status: 'success' }
    } catch {
        return { status: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' }
    }
}