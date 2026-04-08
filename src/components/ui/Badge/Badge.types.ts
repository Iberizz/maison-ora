export type BadgeVariant = 'default' | 'gold' | 'dark'

export interface BadgeProps {
    label: string
    variant?: BadgeVariant
}