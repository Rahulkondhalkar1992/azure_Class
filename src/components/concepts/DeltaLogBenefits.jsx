import { useEffect, useState } from 'react'

const commits = [
  { v: 0, action: 'CREATE TABLE', files: ['part-00000.parquet'], add: 1, remove: 0 },
  { v: 1, action: 'INSERT 500 rows', files: ['part-00001.parquet'], add: 1, remove: 0 },
  { v: 2, action: 'UPDATE 30 rows', files: ['part-00002.parquet'], add: 1, remove: 1 },
  { v: 3, action: 'DELETE 10 rows', files: ['part-00003.parquet'], add: 1, remove: 1 },
  { v: 4, action: 'OPTIMIZE', files: ['part-00004.parquet'], add: 1, remove: 3 },
]

const benefits = [
  { icon: '⏪', title: 'Time Travel', desc: 'Query any past version' },
  { icon: '🔒', title: 'ACID Txn', desc: 'Atomic commits, no partial reads' },
  { icon: '📋', title: 'Audit Log', desc: 'Full history of who changed what' },
  { icon: '🔄', title: 'Rollback', desc: 'RESTORE TABLE to any version' },
]

export default function DeltaLogBenefits() {
  const [activeVersion, setActiveVersion] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveVersion((v) => (v + 1) % commits.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Concept</p>
        <h3 className="font-display text-lg font-semibold">Delta Log Benefits</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Every write creates a JSON commit in _delta_log/ — enabling time travel, ACID, and audit.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Delta log visualization */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">_delta_log/</p>
          <div className="space-y-2">
            {commits.map((c) => {
              const isActive = c.v === activeVersion
              const isPast = c.v < activeVersion
              return (
                <div
                  key={c.v}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 font-mono text-xs transition-all duration-500 ${
                    isActive ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' :
                    isPast ? 'opacity-80' : 'opacity-30'
                  }`}
                >
                  <div className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg text-[10px] font-bold ${
                    isActive ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                  }`}>
                    v{c.v}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate font-semibold ${isActive ? 'text-azure-700 dark:text-azure-300' : 'text-slate-600 dark:text-slate-300'}`}>
                      {c.action}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      +{c.add} add / -{c.remove} remove → {c.files[0]}
                    </p>
                  </div>
                  {isActive && (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-azure-500" />
                  )}
                </div>
              )
            })}
          </div>

          {/* File tree */}
          <div className="mt-4 rounded-lg bg-white/80 p-3 font-mono text-[10px] leading-relaxed text-slate-500 dark:bg-white/5 dark:text-slate-400">
            <p>📁 _delta_log/</p>
            {commits.filter((c) => c.v <= activeVersion).map((c) => (
              <p key={c.v} className={`pl-4 ${c.v === activeVersion ? 'font-bold text-azure-600 dark:text-azure-300' : ''}`}>
                {String(c.v).padStart(5, '0')}.json
              </p>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Why Delta Log matters</p>
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-xl bg-white p-3 dark:bg-white/5">
                  <span className="text-lg">{b.icon}</span>
                  <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-200">{b.title}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Time travel demo */}
          <div className={`rounded-xl border-2 border-dashed p-4 transition-all duration-500 ${
            activeVersion > 0 ? 'border-azure-500 bg-azure-500/5' : 'border-slate-200 dark:border-white/10'
          }`}>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-azure-600 dark:text-azure-400">Time Travel Query</p>
            <pre className="font-mono text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
{`SELECT * FROM sales
VERSION AS OF ${activeVersion}
-- reads snapshot at v${activeVersion}
-- "${commits[activeVersion].action}"`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
