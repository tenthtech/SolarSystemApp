import { NavLink, useLocation } from 'react-router-dom'
import { MonitorCog, Smartphone, TabletSmartphone } from 'lucide-react'
import { Logo } from '../brand/Logo'

const presentationLinks = [
  { label: 'Overview', to: '/' },
  { label: 'Admin Platform', to: '/admin' },
  { label: 'Technician Portal', to: '/technician' },
  { label: 'Customer App', to: '/customer' },
  { label: 'Roadmap', to: '/roadmap' },
]

const roleLinks = [
  { label: 'Admin', to: '/admin', icon: MonitorCog },
  { label: 'Technician', to: '/technician', icon: TabletSmartphone },
  { label: 'Customer', to: '/customer', icon: Smartphone },
]

export function DemoNavigation() {
  const location = useLocation()

  return (
    <header className="relative z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-5 px-4 py-2.5 sm:px-6 lg:flex-nowrap lg:px-8">
        <div className="shrink-0">
          <Logo />
        </div>

        <nav className="order-3 -mx-4 mt-2 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto border-t border-line px-4 pt-2 lg:order-none lg:mx-0 lg:mt-0 lg:w-auto lg:flex-1 lg:justify-center lg:border-0 lg:px-0 lg:pt-0" aria-label="Demo pages">
          {presentationLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex min-h-10 shrink-0 items-center rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                  isActive ? 'bg-canvas text-ink' : 'text-muted hover:bg-canvas/70 hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 rounded-xl border border-dashed border-line-strong bg-canvas p-1 pl-2" aria-label="Demo role switcher">
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.13em] text-subtle sm:inline">Demo view</span>
          <div className="flex gap-0.5">
            {roleLinks.map((item) => {
              const Icon = item.icon
              const active = location.pathname.startsWith(item.to)
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  aria-label={`View ${item.label} demo`}
                  aria-current={active ? 'page' : undefined}
                  title={item.label}
                  className={`flex size-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                    active ? 'bg-white text-ink shadow-sm' : 'text-subtle hover:bg-white hover:text-ink'
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
