import { Bell, ChevronDown, Menu, Search, Settings, UserRound } from 'lucide-react'
import { useState } from 'react'
import { alerts, users } from '../../data/mockData'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { StatusBadge } from '../ui/StatusBadge'

interface AdminTopBarProps {
  onOpenNavigation: () => void
}

export function AdminTopBar({ onOpenNavigation }: AdminTopBarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const admin = users[0]

  function toggleNotifications() {
    setNotificationsOpen((open) => !open)
    setProfileOpen(false)
  }

  function toggleProfile() {
    setProfileOpen((open) => !open)
    setNotificationsOpen(false)
  }

  return (
    <header className="relative z-30 border-b border-line bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[72px] items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenNavigation} aria-label="Open admin navigation">
          <Menu className="size-5" aria-hidden="true" />
        </Button>

        <form className="hidden w-full max-w-md md:block" role="search" onSubmit={(event) => event.preventDefault()}>
          <Input id="admin-search" type="search" aria-label="Search customers, sites and installations" placeholder="Search customers, sites or installations" leadingIcon={<Search className="size-4" />} />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileSearchOpen((open) => !open)} aria-label="Open search" aria-expanded={mobileSearchOpen}>
            <Search className="size-5" aria-hidden="true" />
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" onClick={toggleNotifications} aria-label="View notifications, 2 new" aria-expanded={notificationsOpen}>
              <Bell className="size-5" aria-hidden="true" />
              <span className="absolute right-2.5 top-2.5 size-2 rounded-full border-2 border-white bg-red-500" aria-hidden="true" />
            </Button>
            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-white shadow-popover">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <p className="text-sm font-bold text-ink">Notifications</p>
                  <StatusBadge tone="info">2 new</StatusBadge>
                </div>
                <div className="divide-y divide-line">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 size-2 shrink-0 rounded-full ${alert.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} aria-hidden="true" />
                        <div>
                          <p className="text-sm font-semibold text-ink">{alert.title}</p>
                          <p className="mt-1 text-xs leading-5 text-muted">{alert.message}</p>
                          <p className="mt-1 text-xs text-subtle">{alert.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className="mx-1 hidden h-7 w-px bg-line sm:block" aria-hidden="true" />

          <div className="relative">
            <button type="button" onClick={toggleProfile} aria-expanded={profileOpen} className="flex min-h-11 items-center gap-2 rounded-xl px-1.5 text-left transition hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue sm:px-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-ink text-xs font-bold text-white">{admin.initials}</span>
              <span className="hidden lg:block">
                <span className="block text-sm font-bold text-ink">{admin.name}</span>
                <span className="block text-xs text-subtle">Administrator</span>
              </span>
              <ChevronDown className="hidden size-4 text-subtle lg:block" aria-hidden="true" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-2xl border border-line bg-white p-2 shadow-popover">
                <p className="px-3 py-2 text-xs text-subtle">{admin.email}</p>
                <button className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted hover:bg-canvas hover:text-ink">
                  <UserRound className="size-4" aria-hidden="true" /> Profile
                </button>
                <button className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted hover:bg-canvas hover:text-ink">
                  <Settings className="size-4" aria-hidden="true" /> Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileSearchOpen && (
        <form className="pb-4 md:hidden" role="search" onSubmit={(event) => event.preventDefault()}>
          <Input id="mobile-admin-search" type="search" aria-label="Search customers, sites and installations" placeholder="Search customers, sites or installations" leadingIcon={<Search className="size-4" />} autoFocus />
        </form>
      )}
    </header>
  )
}
