import { useEffect, useState } from 'react'

const rows = [
  { id: 1, name: 'Order-1001', ts: '2024-01-10', status: 'old' },
  { id: 2, name: 'Order-1002', ts: '2024-01-10', status: 'old' },
  { id: 3, name: 'Order-1003', ts: '2024-01-11', status: 'old' },
]
const newRows = [
  { id: 4, name: 'Order-1004', ts: '2024-01-12', status: 'new' },
  { id: 5, name: 'Order-1005', ts: '2024-01-12', status: 'new' },
]

export default function IncrementalLoad() {
  const [step, setStep] = useState(0)
  const [watermark, setWatermark] = useState('2024-01-10')

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % 4
        if (next >= 2) setWatermark('2024-01-12')
        else setWatermark('2024-01-10')
        return next
      })
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  const showNew = step >= 2
  const scanning = step === 1
  const landed = step === 3

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Concept
        </p>
        <h3 className="font-display text-lg font-semibold">Incremental Load</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Only fetch rows newer than the last watermark — skip what's already loaded.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Source table */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Source Table</p>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10">
                <th className="pb-1.5 pr-3">ID</th>
                <th className="pb-1.5 pr-3">Order</th>
                <th className="pb-1.5">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-white/5">
                  <td className="py-1.5 pr-3 font-mono">{r.id}</td>
                  <td className="py-1.5 pr-3">{r.name}</td>
                  <td className="py-1.5 font-mono text-slate-400">{r.ts}</td>
                </tr>
              ))}
              {showNew && newRows.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
                  style={{ animation: 'fadeSlideIn 0.5s ease-out' }}
                >
                  <td className="py-1.5 pr-3 font-mono font-bold text-emerald-700 dark:text-emerald-300">{r.id}</td>
                  <td className="py-1.5 pr-3 font-bold text-emerald-700 dark:text-emerald-300">{r.name}</td>
                  <td className="py-1.5 font-mono font-bold text-emerald-700 dark:text-emerald-300">{r.ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Target / Watermark */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Watermark</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-azure-600 dark:text-azure-400">
                last_modified &gt; '{watermark}'
              </span>
              {scanning && (
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-400" />
              )}
            </div>
          </div>

          <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Target (Bronze)</p>
            <div className="space-y-1 text-xs">
              {rows.map((r) => (
                <div key={r.id} className="flex gap-2 font-mono text-slate-400">
                  <span>{r.name}</span>
                  <span className="rounded bg-slate-200 px-1.5 dark:bg-white/10">loaded</span>
                </div>
              ))}
              {landed && newRows.map((r) => (
                <div
                  key={r.id}
                  className="flex gap-2 font-mono text-emerald-600 dark:text-emerald-400"
                  style={{ animation: 'fadeSlideIn 0.5s ease-out' }}
                >
                  <span>{r.name}</span>
                  <span className="rounded bg-emerald-100 px-1.5 dark:bg-emerald-500/20">new ✓</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${scanning ? 'animate-pulse bg-amber-400' : landed ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <span className="text-slate-500 dark:text-slate-400">
              {step === 0 && 'Idle — last load complete'}
              {step === 1 && 'Scanning for rows after watermark…'}
              {step === 2 && 'New rows found! Extracting…'}
              {step === 3 && 'Loaded. Watermark advanced to 2024-01-12'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
