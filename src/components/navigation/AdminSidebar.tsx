import {
  BellRing,
  Boxes,
  FileChartColumn,
  Gauge,
  HousePlug,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'

const adminLinks = [
  { label: 'Dashboard', to: '/admin', icon: Gauge, end: true },
  { label: 'Customers', to: '/admin/customers', icon: Users },
  { label: 'Installations', to: '/admin/installations', icon: Wrench },
  { label: 'Sites', to: '/admin/sites', icon: HousePlug },
  { label: 'Devices', to: '/admin/devices', icon: Boxes },
  { label: 'Staff', to: '/admin/staff', icon: ShieldCheck },
  { label: 'Alerts', to: '/admin/alerts', icon: BellRing, count: 4 },
  { label: 'Reports', to: '/admin/reports', icon: FileChartColumn },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-ink px-3 py-4 text-white">
      <div className="flex items-center justify-between px-3 pb-5 pt-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Workspace</p>
          <p className="mt-1 text-sm font-bold">Admin Platform</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Close navigation">
            <X className="size-5" aria-hidden="true" />
          </Button>
        )}
      </div>

      <nav aria-label="Admin navigation" className="flex-1 space-y-1">
        {adminLinks.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy ${
                  isActive ? 'bg-white/11 text-white' : 'text-white/62 hover:bg-white/7 hover:text-white'
                }`
              }
            >
              <Icon className="size-[18px] shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {item.count && (
                <span className="flex min-w-6 items-center justify-center rounded-full bg-energy px-1.5 py-0.5 text-xs font-bold text-ink" aria-label={`${item.count} open alerts`}>
                  {item.count}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/65">
          <span className="size-2 rounded-full bg-energy" aria-hidden="true" />
          Platform status
        </div>
        <p className="mt-2 text-sm font-bold">All services operational</p>
        <p className="mt-1 text-xs leading-5 text-white/45">Last checked moments ago</p>
      </div>
    </div>
  )
}
