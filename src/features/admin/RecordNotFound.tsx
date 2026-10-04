import { SearchX } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { LinkButton } from '../../components/ui/Button'

interface RecordNotFoundProps {
  title: string
  description: string
  backTo: string
  backLabel: string
}

export function RecordNotFound({ title, description, backTo, backLabel }: RecordNotFoundProps) {
  return (
    <Card>
      <EmptyState icon={SearchX} title={title} description={description} action={<LinkButton to={backTo} variant="outline">{backLabel}</LinkButton>} />
    </Card>
  )
}
