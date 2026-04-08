export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
    variant?: ButtonVariant
    size?: ButtonSize
    label: string
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit'
    fullWidth?: boolean
}