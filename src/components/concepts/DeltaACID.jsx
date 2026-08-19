import { useEffect, useState } from 'react'

const acidProps = [
  { letter: 'A', title: 'Atomicity', desc: 'All or nothing. Either all operations succeed or none.', color: 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20' },
  { letter: 'C', title: 'Consistency', desc: 'Data remains consistent before and after the transaction.', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20' },
  { letter: 'I', title: 'Isolation', desc: 'Concurrent operations do not interfere with each other.', color: 'text-azure-600 dark:text-azure-400 bg-azure-100 dark:bg-azure-500/20' },
  { letter: 'D', title: 'Durability', desc: 'Once committed, data is saved permanently even in failure.', color: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20' },
]

const versions = [
  { v: 0, time: '10:00 AM', action: 'Initial load — 1000 rows', rows: 1000 },
  { v: 1, time: '11:00 AM', action: 'INSERT 200 rows', rows: 1200 },
  { v: 2, time: '12:00 PM', action: 'UPDATE 50 rows', rows: 1200 },
  { v: 3, time: '01:00 PM', action: 'DELETE 30 rows', rows: 1170 },
]

export default function DeltaACID() {
  const [activeAcid, setActiveAcid] = useState(0)
  const [activeVersion, setActiveVersion] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setActiveAcid((a) => (a + 1) % acidProps.length), 2200)
    const t2 = setInterval(() => setActiveVersion((v) => (v + 1) % versions.length), 3000)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 6</p>
        <h3 className="font-display text-lg font-semibold">Delta Lake — ACID Transactions & Time Travel</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Delta Lake adds ACID guarantees and version history to your data lake.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* ACID */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">ACID Properties</p>
          <div className="grid grid-cols-2 gap-3">
            {acidProps.map((a, i) => (
              <div key={a.letter} className={`rounded-xl p-3 transition-all duration-500 ${i === activeAcid ? 'ring-2 ring-azure-500 scale-[1.02]' : ''} bg-white dark:bg-white/5`}>
                <span className={`inline-grid h-8 w-8 place-items-center rounded-lg text-sm font-bold ${a.color}`}>{a.letter}</span>
                <p className="mt-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">{a.title}</p>
                <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time Travel */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Time Travel — Version History</p>
            <div className="space-y-2">
              {versions.map((ver) => {
                const active = ver.v === activeVersion
                return (
                  <div key={ver.v} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-mono transition-all duration-500 ${
                    active ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' : 'opacity-60'
                  }`}>
                    <span className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg text-[10px] font-bold ${
                      active ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                    }`}>v{ver.v}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold ${active ? 'text-azure-700 dark:text-azure-300' : 'text-slate-500'}`}>{ver.action}</p>
                      <p className="text-[10px] text-slate-400">{ver.time} · {ver.rows} rows</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-azure-500 bg-azure-500/5 p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-azure-600 dark:text-azure-400">Query</p>
            <pre className="font-mono text-[11px] text-slate-600 dark:text-slate-300">
{`SELECT * FROM sales
VERSION AS OF ${activeVersion}
-- ${versions[activeVersion].rows} rows at ${versions[activeVersion].time}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
