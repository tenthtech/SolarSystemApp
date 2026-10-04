import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ className = '', interactive = false, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white shadow-card ${
        interactive ? 'transition duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card-hover' : ''
      } ${className}`}
      {...props}
    />
  )
}
