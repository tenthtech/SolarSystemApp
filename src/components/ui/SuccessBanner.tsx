import { CheckCircle2, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'

interface SuccessBannerProps {
  title: string
  description: string
}

export function SuccessBanner({ title, description }: SuccessBannerProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div role="status" className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="flex-1"><p className="text-sm font-bold">{title}</p><p className="mt-1 text-sm leading-6 text-emerald-800">{description}</p></div>
      <Button variant="ghost" size="icon" className="-m-2 text-emerald-800 hover:bg-emerald-100" onClick={() => setVisible(false)} aria-label="Dismiss success message"><X className="size-4" aria-hidden="true" /></Button>
    </div>
  )
}
