import { ExternalLink } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { DemoNavigation } from '../components/navigation/DemoNavigation'

export function PresentationLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <DemoNavigation />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="border-t border-line bg-white/70 px-4 py-6 sm:px-6" aria-label="Presentation credit">
        <div className="mx-auto flex max-w-[1320px] justify-center">
          <a
            href="https://www.thetenthtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Prepared by Tenth Tech for Harry Galvin — opens in a new tab"
            className="group inline-flex min-h-11 max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-line-strong bg-white px-4 py-2.5 text-center text-xs font-semibold text-muted shadow-sm transition hover:border-energy/60 hover:text-ink hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-energy" aria-hidden="true" />
            <span>Prepared by <span className="font-bold text-ink">Tenth Tech</span> for Harry Galvin</span>
            <ExternalLink className="size-3.5 shrink-0 text-subtle transition-colors group-hover:text-energy-deep" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  )
}
