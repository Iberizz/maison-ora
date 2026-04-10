'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ContactDetail, ContactFormData, ContactFormField } from './Contact.types'
import { createContactMessage } from '@/lib/supabase/actions/contact'

const CONTACT_DETAILS: ContactDetail[] = [
    { label: 'Telephone', value: '+33 1 42 00 00 00', href: 'tel:+33142000000' },
    { label: 'Email', value: 'contact@maison-ora.fr', href: 'mailto:contact@maison-ora.fr' },
    { label: 'Adresse', value: '12 rue du Faubourg Saint-Honore, 75008 Paris' },
]

const INITIAL_FORM: ContactFormData = {
    name: '',
    email: '',
    message: '',
}

export function useContact() {
    const [form, setForm] = useState<ContactFormData>(INITIAL_FORM)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateField = (field: ContactFormField, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await createContactMessage(form)
            setIsSubmitted(true)
            setForm(INITIAL_FORM)
        } catch (e) {
            setError('Une erreur est survenue. Veuillez réessayer.')
            setIsSubmitted(false)
        } finally {
            setLoading(false)
        }
    }

    return {
        contactDetails: CONTACT_DETAILS,
        form,
        isSubmitted,
        loading,
        error,
        updateField,
        submitForm,
    }
}
