import { ButtonProps } from './Button.types'

const variants = {
    primary:   'bg-dark text-cream border border-dark hover:bg-gold hover:border-gold hover:text-dark',
    secondary: 'bg-transparent text-cream border border-cream hover:bg-cream hover:text-dark',
    ghost:     'bg-transparent text-stone border-none hover:text-dark',
}

const sizes = {
    sm: 'px-4 py-2 text-xs tracking-widest',
    md: 'px-6 py-3 text-xs tracking-widest',
    lg: 'px-8 py-4 text-sm tracking-widest',
}

const Button = ({
                    variant = 'primary',
                    size = 'md',
                    label,
                    onClick,
                    disabled = false,
                    type = 'button',
                    fullWidth = false,
                }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        font-sans font-light uppercase transition-all duration-400 ease-out-expo
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
        >
            {label}
        </button>
    )
}

export default Button