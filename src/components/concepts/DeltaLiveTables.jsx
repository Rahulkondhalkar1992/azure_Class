import { useEffect, useState } from 'react'

const pipeline = [
  { id: 'bronze', label: 'Bronze (Raw)', type: '@dlt.table', deps: [], color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30' },
  { id: 'silver', label: 'Silver (Clean)', type: '@dlt.table', deps: ['bronze'], color: 'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10' },
  { id: 'gold', label: 'Gold (Curated)', type: '@dlt.table', deps: ['silver'], color: 'text-amber-800 dark:text-amber-200 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/30' },
]

const expectations = [
  { name: 'valid_amount', rule: 'amount > 0', action: 'DROP' },
  { name: 'not_null_id', rule: 'id IS NOT NULL', action: 'FAIL' },
  { name: 'valid_date', rule: 'date <= current_date()', action: 'WARN' },
]

export default function DeltaLiveTables() {
  const [activeNode, setActiveNode] = useState(0)
  const [qualityStep, setQualityStep] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setActiveNode((n) => (n + 1) % pipeline.length), 2500)
    const t2 = setInterval(() => setQualityStep((q) => (q + 1) % (expectations.length + 1)), 2000)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 9</p>
        <h3 className="font-display text-lg font-semibold">Delta Live Tables (DLT)</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Declarative pipelines — define what you want, DLT handles orchestration, monitoring, and quality.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Pipeline graph */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">DLT Pipeline</p>
          <div className="space-y-3">
            {pipeline.map((node, i) => (
              <div key={node.id}>
                <div className={`rounded-xl border-2 px-3 py-2.5 transition-all duration-500 ${node.color} ${
                  i === activeNode ? 'ring-2 ring-azure-500 scale-[1.02]' : ''
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{node.label}</span>
                    <code className="rounded bg-white/60 px-1.5 py-0.5 text-[9px] font-mono font-bold dark:bg-white/10">{node.type}</code>
                  </div>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg viewBox="0 0 20 16" className="h-3 w-4">
                      <line x1="10" y1="0" x2="10" y2="12" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                      <polygon points="6,10 14,10 10,16" fill="#94a3b8" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Expectations / Quality */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Quality Expectations</p>
          <div className="space-y-2">
            {expectations.map((e, i) => {
              const active = i === qualityStep
              const done = i < qualityStep
              return (
                <div key={e.name} className={`rounded-lg px-3 py-2 text-xs transition-all duration-400 ${
                  active ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' : done ? 'opacity-60' : 'opacity-30'
                }`}>
                  <div className="flex items-center justify-between">
                    <code className="font-mono font-bold text-slate-700 dark:text-slate-200">{e.name}</code>
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                      e.action === 'DROP' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' :
                      e.action === 'FAIL' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300' :
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                    }`}>{e.action}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-slate-400">{e.rule}</p>
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-[10px] text-slate-400">DLT automatically monitors and enforces quality gates.</p>
        </div>

        {/* Code + features */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Code (Python)</p>
            <pre className="font-mono text-[10px] leading-relaxed text-slate-600 dark:text-slate-300">
{`import dlt

@dlt.table
def bronze_orders():
  return (spark.readStream
    .format("cloudFiles")
    .load("/data/raw/"))

@dlt.table
@dlt.expect_or_drop(
  "valid_amount", "amount > 0")
def silver_orders():
  return dlt.read_stream("bronze_orders")
    .withColumn("clean_date",
      to_date("order_date"))`}
            </pre>
          </div>
          <div className="rounded-xl bg-violet-50 p-3 dark:bg-violet-500/10">
            <p className="text-[10px] font-bold text-violet-700 dark:text-violet-300">Key Features</p>
            <div className="mt-1 space-y-0.5 text-[10px] text-violet-600 dark:text-violet-400">
              <p>• Declarative — define tables, DLT handles how</p>
              <p>• Auto schema management & dependency ordering</p>
              <p>• Built-in quality expectations</p>
              <p>• Incremental processing — only changed data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
