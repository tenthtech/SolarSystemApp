import { Building2, Check, Smartphone, TabletSmartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProductExperience } from '../../types'
import { Card } from '../ui/Card'

const experienceStyles = {
  admin: {
    icon: Building2,
    number: '01',
    iconClass: 'bg-energy-pale text-energy-deep',
    linkClass: 'text-energy-deep',
  },
  technician: {
    icon: TabletSmartphone,
    number: '02',
    iconClass: 'bg-blue-pale text-blue-deep',
    linkClass: 'text-blue-deep',
  },
  customer: {
    icon: Smartphone,
    number: '03',
    iconClass: 'bg-violet-50 text-violet-700',
    linkClass: 'text-violet-700',
  },
}

interface ProductExperienceCardProps {
  experience: ProductExperience
}

export function ProductExperienceCard({ experience }: ProductExperienceCardProps) {
  const styles = experienceStyles[experience.id]
  const Icon = styles.icon

  return (
    <Card interactive className="group flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className={`flex size-11 items-center justify-center rounded-2xl ${styles.iconClass}`}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs font-bold tracking-[0.14em] text-subtle">{styles.number}</span>
      </div>
      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">{experience.audience}</p>
        <h3 className="mt-2 text-xl font-bold tracking-[-0.025em] text-ink">{experience.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{experience.description}</p>
      </div>
      <ul className="mt-5 grid gap-2 border-t border-line pt-5" aria-label={`${experience.name} capabilities`}>
        {experience.capabilities.map((capability) => (
          <li key={capability} className="flex items-center gap-2 text-sm text-muted">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-canvas text-subtle">
              <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
            </span>
            {capability}
          </li>
        ))}
      </ul>
      <Link to={experience.route} className={`mt-auto inline-flex min-h-11 items-center pt-6 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue ${styles.linkClass}`}>
        View experience
      </Link>
    </Card>
  )
}
