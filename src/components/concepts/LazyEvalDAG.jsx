import { useEffect, useState } from 'react'

const codeLines = [
  { code: '# Transformations (Lazy)', type: 'comment' },
  { code: 'df = spark.read.csv("employees.csv")', type: 'read' },
  { code: 'df = df.filter(df.salary > 50000)', type: 'transform' },
  { code: 'df = df.select("id", "name", "salary")', type: 'transform' },
  { code: 'df = df.groupBy("department").count()', type: 'transform' },
  { code: '', type: 'blank' },
  { code: '# Action (Triggers Execution)', type: 'comment' },
  { code: 'df.show()  # DAG executes HERE!', type: 'action' },
]

const dagNodes = [
  { id: 'read', label: 'Read CSV', x: 60, y: 30 },
  { id: 'filter', label: 'Filter', x: 60, y: 75 },
  { id: 'select', label: 'Select', x: 60, y: 120 },
  { id: 'groupby', label: 'GroupBy', x: 60, y: 165 },
  { id: 'output', label: 'Output', x: 60, y: 210 },
]

export default function LazyEvalDAG() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 10), 1600)
    return () => clearInterval(timer)
  }, [])

  const codeHighlight = Math.min(step, codeLines.length - 1)
  const dagBuilding = step >= 1 && step <= 4
  const dagComplete = step >= 5
  const executing = step >= 7
  const done = step >= 9

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 5</p>
        <h3 className="font-display text-lg font-semibold">Lazy Evaluation & DAG</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Spark builds an optimized DAG from transformations. Nothing executes until an Action is called.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Code */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">PySpark Code</p>
          <div className="space-y-1 font-mono text-[11px] leading-relaxed">
            {codeLines.map((l, i) => {
              if (l.type === 'blank') return <div key={i} className="h-2" />
              const active = i === codeHighlight
              return (
                <div key={i} className={`rounded px-2 py-0.5 transition-all duration-300 ${
                  active ? 'bg-azure-100 dark:bg-azure-500/15' : ''
                } ${l.type === 'comment' ? 'text-slate-400 dark:text-slate-500' :
                    l.type === 'action' ? 'font-bold text-rose-600 dark:text-rose-400' :
                    l.type === 'transform' ? 'text-amber-700 dark:text-amber-300' :
                    'text-slate-600 dark:text-slate-300'}`}>
                  {l.code}
                </div>
              )
            })}
          </div>
          <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[10px] text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            {step < 7 ? 'Nothing executes yet — transformations are lazy!' : 'df.show() triggers the entire DAG!'}
          </div>
        </div>

        {/* DAG */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">DAG (Execution Plan)</p>
          <svg viewBox="0 0 120 245" className="mx-auto block h-56 w-24">
            {dagNodes.map((n, i) => {
              const visible = dagBuilding ? i <= step : dagComplete
              const running = executing && i <= step - 5
              return (
                <g key={n.id} style={{ opacity: visible ? 1 : 0.15, transition: 'opacity 0.4s' }}>
                  <rect x={n.x - 45} y={n.y - 12} width="90" height="26" rx="6"
                    className={running ? 'fill-emerald-500/20 stroke-emerald-500' : 'fill-white stroke-slate-200 dark:fill-white/5 dark:stroke-white/10'}
                  />
                  <text x={n.x} y={n.y + 4} textAnchor="middle"
                    className={`text-[10px] font-semibold ${running ? 'fill-emerald-700 dark:fill-emerald-300' : 'fill-slate-700 dark:fill-slate-200'}`}>
                    {n.label}
                  </text>
                  {i < dagNodes.length - 1 && (
                    <line x1={n.x} y1={n.y + 14} x2={dagNodes[i + 1].x} y2={dagNodes[i + 1].y - 12}
                      stroke={running ? '#22c55e' : '#cbd5e1'} strokeWidth="1.5"
                      strokeDasharray={running ? 'none' : '3 3'}
                    />
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Why Lazy?</p>
            {[
              'Better Optimization — Catalyst rewrites the plan',
              'Faster Execution — unnecessary steps eliminated',
              'Less Memory — only compute what\'s needed',
              'Reduced Shuffle — optimizer minimizes data movement',
            ].map((b) => (
              <div key={b} className="mt-1.5 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="mt-0.5 text-emerald-500">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${done ? 'bg-emerald-500' : executing ? 'animate-pulse bg-azure-500' : dagBuilding ? 'animate-pulse bg-amber-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <span className="text-slate-500 dark:text-slate-400">
              {step < 1 && 'Reading source data…'}
              {dagBuilding && 'Building DAG — no execution yet'}
              {dagComplete && !executing && 'DAG ready. Waiting for Action…'}
              {executing && !done && 'Action called! Executing stages…'}
              {done && 'Execution complete ✓'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
