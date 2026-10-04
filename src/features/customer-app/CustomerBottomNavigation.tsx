import { Bell, ChartSpline, FileText, House, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useCustomerApp } from './CustomerAppContext'

const navigationItems = [
  { label: 'Home', to: '/customer', icon: House, end: true },
  { label: 'Energy', to: '/customer/energy', icon: ChartSpline },
  { label: 'Alerts', to: '/customer/alerts', icon: Bell },
  { label: 'Reports', to: '/customer/reports', icon: FileText },
  { label: 'Profile', to: '/customer/profile', icon: UserRound },
]

export function CustomerBottomNavigation() {
  const { queryString } = useCustomerApp()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 shadow-[0_-8px_32px_rgb(20_34_28_/_0.08)] backdrop-blur"
      aria-label="Customer app navigation"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
    >
      <div className="mx-auto grid max-w-3xl grid-cols-5 gap-1 px-2 pt-2 sm:px-4">
        {navigationItems.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={`${to}${queryString}`}
            end={end}
            className={({ isActive }) => `flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-1 ${
              isActive ? 'bg-energy-pale text-energy-deep' : 'text-muted hover:bg-canvas hover:text-ink'
            }`}
          >
            <Icon className="size-5 shrink-0" strokeWidth={2.1} aria-hidden="true" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
