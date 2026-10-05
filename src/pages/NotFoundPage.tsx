import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
      <EmptyState
        icon={Compass}
        title="That demo page isn’t available"
        description="Return to the platform overview to continue exploring the connected demo."
        action={<Link to="/" className="inline-flex min-h-11 items-center rounded-xl bg-ink px-4 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy focus-visible:ring-offset-2">Back to overview</Link>}
      />
    </div>
  )
}
