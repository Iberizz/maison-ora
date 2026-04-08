export interface InputProps {
    label?: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    type?: 'text' | 'email' | 'tel' | 'password'
    error?: string
    disabled?: boolean
    fullWidth?: boolean
}