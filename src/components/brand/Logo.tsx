import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

interface LogoProps {
  compact?: boolean
  inverse?: boolean
}

export function Logo({ compact = false, inverse = false }: LogoProps) {
  return (
    <Link to="/" className="group inline-flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2" aria-label="SunGrid Energy Platform overview">
      <span className={`flex size-9 items-center justify-center rounded-xl ${inverse ? 'bg-energy text-ink' : 'bg-ink text-energy'}`}>
        <Zap className="size-5 fill-current" strokeWidth={2.4} aria-hidden="true" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className={`block text-sm font-extrabold tracking-[-0.02em] ${inverse ? 'text-white' : 'text-ink'}`}>SunGrid</span>
          <span className={`block text-xs font-medium ${inverse ? 'text-white/55' : 'text-subtle'}`}>Energy Platform</span>
        </span>
      )}
    </Link>
  )
}
