import type { ReactNode } from 'react'

type StatusTone = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface StatusBadgeProps {
  children: ReactNode
  tone?: StatusTone
  showDot?: boolean
  className?: string
}

const toneClasses: Record<StatusTone, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  neutral: 'border-line bg-canvas text-muted',
}

const dotClasses: Record<StatusTone, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-slate-400',
}

export function StatusBadge({ children, tone = 'neutral', showDot = false, className = '' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold leading-none ${toneClasses[tone]} ${className}`}>
      {showDot && <span className={`size-1.5 rounded-full ${dotClasses[tone]}`} aria-hidden="true" />}
      {children}
    </span>
  )
}
