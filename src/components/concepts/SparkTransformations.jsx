import { useEffect, useState } from 'react'

const narrow = [
  { name: 'map()', desc: 'Apply function to each element', ex: 'df.rdd.map(lambda x: x*2)' },
  { name: 'filter()', desc: 'Filter rows by condition', ex: 'df.filter("age > 18")' },
  { name: 'select()', desc: 'Select specific columns', ex: 'df.select("id","name")' },
  { name: 'flatMap()', desc: 'Flatten nested data', ex: 'rdd.flatMap(lambda x: x.split())' },
]
const wide = [
  { name: 'groupBy()', desc: 'Group data by key', ex: 'df.groupBy("dept").count()' },
  { name: 'join()', desc: 'Join two datasets', ex: 'df1.join(df2, "id")' },
  { name: 'distinct()', desc: 'Remove duplicates', ex: 'df.distinct()' },
  { name: 'sort()', desc: 'Sort the data', ex: 'df.orderBy("name")' },
]

const flowSteps = [
  { label: 'Read Data', type: 'source' },
  { label: 'Transformations (Lazy)', type: 'transform' },
  { label: 'Build DAG', type: 'dag' },
  { label: 'Catalyst Optimization', type: 'optimize' },
  { label: 'Action triggered', type: 'action' },
  { label: 'Executors run tasks', type: 'execute' },
  { label: 'Output', type: 'output' },
]

export default function SparkTransformations() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % (flowSteps.length + 2)), 1400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 4</p>
        <h3 className="font-display text-lg font-semibold">Spark Transformations & Actions</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Transformations are lazy (build a plan). Actions trigger execution via the DAG.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Narrow vs Wide */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              Narrow Transformations — no shuffle
            </p>
            <div className="space-y-1.5 text-xs">
              {narrow.map((t) => (
                <div key={t.name} className="flex items-baseline gap-2">
                  <code className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{t.name}</code>
                  <span className="text-slate-500 dark:text-slate-400">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Wide Transformations — shuffle required
            </p>
            <div className="space-y-1.5 text-xs">
              {wide.map((t) => (
                <div key={t.name} className="flex items-baseline gap-2">
                  <code className="font-mono font-bold text-amber-700 dark:text-amber-300">{t.name}</code>
                  <span className="text-slate-500 dark:text-slate-400">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Execution flow */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Execution Flow</p>
          <div className="space-y-2">
            {flowSteps.map((f, i) => {
              const active = i === step
              const done = i < step
              return (
                <div key={f.label} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-all duration-400 ${
                  active ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' : done ? 'opacity-80' : 'opacity-30'
                }`}>
                  <span className={`grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-[9px] font-bold ${
                    done ? 'bg-emerald-500 text-white' : active ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                  }`}>
                    {done ? '✓' : i + 1}
                  </span>
                  <span className={`font-medium ${active ? 'text-azure-700 dark:text-azure-300' : 'text-slate-600 dark:text-slate-300'}`}>
                    {f.label}
                  </span>
                  {f.type === 'transform' && <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">LAZY</span>}
                  {f.type === 'action' && <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-bold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">TRIGGERS</span>}
                </div>
              )
            })}
          </div>
          <p className="mt-3 text-[10px] text-slate-400 dark:text-slate-500">
            Key: Transformations define the plan. Actions (.show(), .count(), .write()) trigger execution.
          </p>
        </div>
      </div>
    </div>
  )
}
