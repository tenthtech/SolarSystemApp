import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-white shadow-sm hover:bg-ink-soft focus-visible:ring-energy',
  secondary: 'bg-energy-pale text-energy-deep hover:bg-energy-soft focus-visible:ring-energy',
  outline: 'border border-line bg-white text-ink hover:border-ink/25 hover:bg-canvas focus-visible:ring-blue',
  ghost: 'text-muted hover:bg-canvas hover:text-ink focus-visible:ring-blue',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
  icon: 'size-11 justify-center',
}

function buttonClassName(variant: ButtonVariant, size: ButtonSize, className: string) {
  return `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  leadingIcon,
  type = 'button',
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName(variant, size, className)}
      {...props}
    >
      {leadingIcon}
      {children}
    </button>
  )
})

interface LinkButtonProps extends Omit<LinkProps, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  className?: string
}

export function LinkButton({ children, className = '', variant = 'primary', size = 'md', leadingIcon, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClassName(variant, size, className)} {...props}>
      {leadingIcon}
      {children}
    </Link>
  )
}
