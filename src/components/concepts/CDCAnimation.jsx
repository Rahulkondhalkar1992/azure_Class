import { useEffect, useState } from 'react'

const sourceLog = [
  { lsn: 101, op: 'I', id: 1, name: 'Alice', city: 'Mumbai' },
  { lsn: 102, op: 'I', id: 2, name: 'Bob', city: 'Delhi' },
  { lsn: 103, op: 'U', id: 1, name: 'Alice', city: 'Pune' },
  { lsn: 104, op: 'D', id: 2, name: 'Bob', city: 'Delhi' },
  { lsn: 105, op: 'I', id: 3, name: 'Carol', city: 'Bangalore' },
]

const opLabel = { I: 'INSERT', U: 'UPDATE', D: 'DELETE' }
const opColor = {
  I: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  U: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  D: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
}

export default function CDCAnimation() {
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCursor((c) => (c + 1) % (sourceLog.length + 2))
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  const visibleEvents = sourceLog.slice(0, Math.min(cursor, sourceLog.length))

  // Build target state from applied events
  const targetMap = new Map()
  visibleEvents.forEach((e) => {
    if (e.op === 'D') targetMap.delete(e.id)
    else targetMap.set(e.id, { id: e.id, name: e.name, city: e.city })
  })
  const targetRows = [...targetMap.values()]

  const currentEvent = cursor > 0 && cursor <= sourceLog.length ? sourceLog[cursor - 1] : null

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Concept</p>
        <h3 className="font-display text-lg font-semibold">Change Data Capture (CDC)</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Capture INSERT, UPDATE, DELETE from the transaction log — replay into the target.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Change log */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Transaction Log</p>
          <div className="space-y-1.5 text-xs">
            {sourceLog.map((e, i) => {
              const past = i < cursor
              const active = i === cursor - 1
              return (
                <div
                  key={e.lsn}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 font-mono transition-all duration-400 ${
                    active ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' :
                    past ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <span className="w-8 text-right text-slate-400">{e.lsn}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${opColor[e.op]}`}>
                    {opLabel[e.op]}
                  </span>
                  <span className="truncate text-slate-600 dark:text-slate-300">
                    id={e.id} {e.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Arrow / processor */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <svg viewBox="0 0 120 80" className="h-16 w-24">
            <rect x="10" y="10" width="100" height="60" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
            <text x="60" y="36" textAnchor="middle" className="fill-slate-700 text-[11px] font-semibold dark:fill-slate-200">CDC</text>
            <text x="60" y="52" textAnchor="middle" className="fill-slate-400 text-[9px] dark:fill-slate-500">Processor</text>
            {currentEvent && (
              <circle cx="60" cy="64" r="3" className="fill-azure-500">
                <animate attributeName="r" values="3;5;3" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
          </svg>
          <div className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${currentEvent ? 'animate-pulse bg-azure-500' : cursor > sourceLog.length ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
            <span className="text-slate-500 dark:text-slate-400">
              {currentEvent ? `Applying ${opLabel[currentEvent.op]} id=${currentEvent.id}` :
               cursor > sourceLog.length ? 'All changes applied ✓' : 'Waiting for events…'}
            </span>
          </div>
        </div>

        {/* Target state */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Target State</p>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10">
                <th className="pb-1.5 pr-2">ID</th>
                <th className="pb-1.5 pr-2">Name</th>
                <th className="pb-1.5">City</th>
              </tr>
            </thead>
            <tbody>
              {targetRows.length === 0 && (
                <tr><td colSpan={3} className="py-3 text-slate-400">Empty</td></tr>
              )}
              {targetRows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 dark:border-white/5" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
                  <td className="py-1.5 pr-2 font-mono">{r.id}</td>
                  <td className="py-1.5 pr-2">{r.name}</td>
                  <td className="py-1.5">{r.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
