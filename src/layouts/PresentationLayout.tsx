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
    </div>
  )
}
