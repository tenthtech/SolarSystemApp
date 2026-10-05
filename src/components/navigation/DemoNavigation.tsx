import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, MonitorCog, RotateCcw, Smartphone, TabletSmartphone, TriangleAlert } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { useDemoData } from '../../features/demo-data/DemoDataContext'
import { Button } from '../ui/Button'

const presentationLinks = [
  { label: 'Overview', to: '/' },
  { label: 'MVP Journey', to: '/mvp-journey' },
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
  const navigate = useNavigate()
  const { resetDemoData } = useDemoData()
  const [resetOpen, setResetOpen] = useState(false)
  const [resetComplete, setResetComplete] = useState(false)
  const resetTriggerRef = useRef<HTMLButtonElement>(null)
  const confirmResetRef = useRef<HTMLButtonElement>(null)
  const resetDialogRef = useRef<HTMLElement>(null)
  const activePresentationRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    activePresentationRef.current?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [location.pathname])

  useEffect(() => {
    if (!resetOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    confirmResetRef.current?.focus()
    const handleDialogKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setResetOpen(false)
        requestAnimationFrame(() => resetTriggerRef.current?.focus())
        return
      }
      if (event.key !== 'Tab') return

      const focusable = Array.from(resetDialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleDialogKeyboard)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleDialogKeyboard)
    }
  }, [resetOpen])

  useEffect(() => {
    if (!resetComplete) return
    const timeout = window.setTimeout(() => setResetComplete(false), 3500)
    return () => window.clearTimeout(timeout)
  }, [resetComplete])

  const closeReset = () => {
    setResetOpen(false)
    requestAnimationFrame(() => resetTriggerRef.current?.focus())
  }

  const confirmReset = () => {
    resetDemoData()
    setResetOpen(false)
    setResetComplete(true)
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'auto' })
    requestAnimationFrame(() => resetTriggerRef.current?.focus())
  }

  return (
    <>
      <header className="relative z-40 border-b border-line bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-5 px-4 py-2.5 sm:px-6 lg:px-8 xl:flex-nowrap">
          <div className="shrink-0">
            <Logo />
          </div>

          <nav className="order-3 -mx-4 mt-2 flex w-[calc(100%+2rem)] gap-1 overflow-x-auto border-t border-line px-4 pt-2 xl:order-none xl:mx-0 xl:mt-0 xl:w-auto xl:flex-1 xl:justify-center xl:border-0 xl:px-0 xl:pt-0" aria-label="Demo pages">
            {presentationLinks.map((item) => {
              const active = item.to === '/'
                ? location.pathname === '/' || location.pathname === '/overview'
                : location.pathname.startsWith(item.to)

              return (
                <Link
                key={item.to}
                to={item.to}
                ref={active ? activePresentationRef : undefined}
                aria-current={active ? 'page' : undefined}
                  className={`flex min-h-10 shrink-0 items-center rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                    active ? 'bg-canvas text-ink' : 'text-muted hover:bg-canvas/70 hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 rounded-xl border border-dashed border-line-strong bg-canvas p-1 pl-2" role="group" aria-label="Demo role switcher">
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.13em] text-muted sm:inline">Demo view</span>
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

          <button
            ref={resetTriggerRef}
            type="button"
            onClick={() => setResetOpen(true)}
            className="flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-bold text-muted transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 xl:px-3"
            aria-haspopup="dialog"
            aria-label="Reset Demo"
            title="Reset Demo"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="hidden xl:inline">Reset Demo</span>
          </button>
        </div>
      </header>

      {resetOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]" onClick={closeReset} aria-hidden="true" />
          <section ref={resetDialogRef} role="alertdialog" aria-modal="true" aria-labelledby="reset-demo-title" aria-describedby="reset-demo-description" className="relative w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-popover sm:p-7">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-700"><TriangleAlert className="size-6" aria-hidden="true" /></span>
            <h2 id="reset-demo-title" className="mt-5 text-2xl font-bold tracking-[-0.03em] text-ink">Reset this demo?</h2>
            <p id="reset-demo-description" className="mt-3 text-sm leading-6 text-muted">This removes locally created customers and installations, then restores the original SunGrid presentation data and workflow statuses.</p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={closeReset}>Cancel</Button>
              <Button ref={confirmResetRef} variant="danger" leadingIcon={<RotateCcw className="size-4" aria-hidden="true" />} onClick={confirmReset}>Reset Demo</Button>
            </div>
          </section>
        </div>,
        document.body,
      )}

      {resetComplete && createPortal(
        <div className="fixed bottom-4 right-4 z-[90] flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-bold text-emerald-800 shadow-popover" role="status" aria-live="polite">
          <CheckCircle2 className="size-5" aria-hidden="true" /> Demo restored
        </div>,
        document.body,
      )}
    </>
  )
}
