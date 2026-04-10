export type ContactDetail = {
    label: string
    value: string
    href?: string
}

export type ContactFormData = {
    name: string
    email: string
    message: string
}

export type ContactFormField = keyof ContactFormData
