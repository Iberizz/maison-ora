import { cn } from '@/lib/utils'
import { BadgeProps } from './Badge.types'

const variants = {
    default: 'bg-bg-alt text-stone border border-border',
    gold:    'bg-gold/10 text-gold border border-gold/30',
    dark:    'bg-dark text-bg border border-dark',
}

const Badge = ({ label, variant = 'default' }: BadgeProps) => {
    return (
        <span className={cn(
            'inline-flex items-center px-3 py-1 text-xs tracking-widest uppercase font-light',
            variants[variant]
        )}>
      {label}
    </span>
    )
}

export default Badge