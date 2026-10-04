import { ArrowDownToLine, ArrowUpFromLine, CheckCircle2, Download, Eye, FileText, Gauge, Home, SunMedium, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useCustomerApp } from '../features/customer-app/CustomerAppContext'

export function CustomerReportsPage() {
  const { energy, site } = useCustomerApp()
  const [reportOpen, setReportOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const reportButtonRef = useRef<HTMLButtonElement>(null)
  const report = energy.report
  const metrics = [
    { label: 'Generated', value: report.generated, icon: SunMedium, tone: 'bg-amber-50 text-amber-700' },
    { label: 'Consumed', value: report.consumed, icon: Home, tone: 'bg-energy-pale text-energy-deep' },
    { label: 'Grid Export', value: report.exported, icon: ArrowUpFromLine, tone: 'bg-violet-50 text-violet-700' },
    { label: 'Grid Import', value: report.imported, icon: ArrowDownToLine, tone: 'bg-blue-pale text-blue-deep' },
    { label: 'Availability', value: report.availability, icon: Gauge, tone: 'bg-emerald-50 text-emerald-700' },
  ]

  const simulateDownload = () => {
    setFeedback('PDF download simulated for this presentation. No file was created.')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-energy-deep">Monthly insights</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Reports</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">A clear summary of the energy your solar system produced and shared.</p>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="bg-ink p-5 text-white sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-energy">{report.period}</p><h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">{report.title}</h2><p className="mt-2 text-sm text-white/55">{site.name}</p></div>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-energy"><FileText className="size-6" aria-hidden="true" /></span>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {metrics.map(({ label, value, icon: Icon, tone }, index) => (
              <div key={label} className={`rounded-2xl border border-line p-4 ${index === metrics.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}>
                <span className={`flex size-9 items-center justify-center rounded-xl ${tone}`}><Icon className="size-4" aria-hidden="true" /></span>
                <dt className="mt-4 text-xs font-semibold text-subtle">{label}</dt><dd className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{value}</dd>
              </div>
            ))}
          </dl>

          {reportOpen && (
            <section id="monthly-report-preview" className="mt-5 rounded-2xl border border-energy-soft bg-energy-pale p-5" aria-labelledby="report-highlights-heading">
              <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.13em] text-energy-deep">Report preview</p><h3 id="report-highlights-heading" className="mt-1 text-lg font-extrabold">September highlights</h3></div><button type="button" onClick={() => { setReportOpen(false); requestAnimationFrame(() => reportButtonRef.current?.focus()) }} className="flex size-10 items-center justify-center rounded-xl text-muted hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-energy" aria-label="Close report preview"><X className="size-5" aria-hidden="true" /></button></div>
              <ul className="mt-4 space-y-3">{report.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-muted"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-energy-deep" aria-hidden="true" />{highlight}</li>)}</ul>
            </section>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button ref={reportButtonRef} variant="outline" size="lg" leadingIcon={<Eye className="size-4" aria-hidden="true" />} aria-expanded={reportOpen} aria-controls="monthly-report-preview" onClick={() => { setReportOpen((current) => !current); setFeedback('') }}>{reportOpen ? 'Hide Report' : 'View Report'}</Button>
            <Button size="lg" leadingIcon={<Download className="size-4" aria-hidden="true" />} onClick={simulateDownload}>Download PDF</Button>
          </div>
          <p className="mt-4 min-h-5 text-center text-xs font-semibold text-energy-deep" role="status" aria-live="polite">{feedback}</p>
        </div>
      </Card>
    </div>
  )
}
