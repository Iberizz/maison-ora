import { cn } from '@/lib/utils'
import { InputProps } from './Input.types'

const Input = ({
                   label,
                   placeholder,
                   value,
                   onChange,
                   type = 'text',
                   error,
                   disabled = false,
                   fullWidth = false,
               }: InputProps) => {
    return (
        <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
            {label && (
                <label className="text-xs tracking-widest uppercase text-stone font-light">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    'bg-transparent border-b border-border py-3 text-sm font-light text-dark',
                    'placeholder:text-stone/50 outline-none transition-all duration-400',
                    'focus:border-dark',
                    error && 'border-red-400',
                    disabled && 'opacity-40 cursor-not-allowed',
                    fullWidth && 'w-full'
                )}
            />
            {error && (
                <span className="text-xs text-red-400 font-light">{error}</span>
            )}
        </div>
    )
}

export default Input