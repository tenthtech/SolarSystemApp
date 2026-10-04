import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../components/navigation/AdminSidebar'
import { AdminTopBar } from '../components/navigation/AdminTopBar'
import { DemoNavigation } from '../components/navigation/DemoNavigation'

export function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mobileNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!mobileNavOpen) return
    mobileNavRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [mobileNavOpen])

  return (
    <div className="min-h-screen bg-admin-canvas text-ink">
      <a href="#admin-main" className="skip-link">Skip to dashboard content</a>
      <DemoNavigation />
      <div className="flex min-h-[calc(100vh-66px)]">
        <aside className="hidden w-64 shrink-0 lg:block" aria-label="Admin workspace navigation">
          <div className="sticky top-0 h-[calc(100vh-66px)]">
            <AdminSidebar />
          </div>
        </aside>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button type="button" className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation overlay" />
            <aside ref={mobileNavRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Admin navigation" className="relative h-full w-[min(19rem,88vw)] outline-none shadow-2xl">
              <AdminSidebar onClose={() => setMobileNavOpen(false)} />
            </aside>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <AdminTopBar onOpenNavigation={() => setMobileNavOpen(true)} />
          <main id="admin-main" tabIndex={-1} className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
