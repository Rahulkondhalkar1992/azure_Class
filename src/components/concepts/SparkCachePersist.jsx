import { useEffect, useState } from 'react'

const storageLevels = [
  { name: 'MEMORY_ONLY', mem: true, disk: false, desc: 'Store in memory only' },
  { name: 'MEMORY_AND_DISK', mem: true, disk: true, desc: 'Memory, spill to disk' },
  { name: 'MEMORY_ONLY_SER', mem: true, disk: false, desc: 'Serialized, memory only' },
  { name: 'DISK_ONLY', mem: false, disk: true, desc: 'Store only on disk' },
]

export default function SparkCachePersist() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 8), 1800)
    return () => clearInterval(timer)
  }, [])

  const noCachePhase = step < 4
  const withCachePhase = step >= 4

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 13</p>
        <h3 className="font-display text-lg font-semibold">Spark cache() vs persist()</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Cache stores DataFrame results for reuse — no recomputation on repeat actions.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Without cache */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${noCachePhase ? 'border-rose-500 bg-rose-500/5' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5'}`}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">Without Cache</p>
          <div className="space-y-2">
            {['Read & Transform', 'Action 1: count()', 'Recompute!', 'Action 2: write()'].map((s, i) => {
              const active = noCachePhase && i === step
              const done = noCachePhase && i < step
              return (
                <div key={s} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all duration-400 ${
                  active ? 'ring-2 ring-rose-500 bg-rose-50 dark:bg-rose-500/10' : done ? 'opacity-60' : 'opacity-30'
                }`}>
                  <span className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full text-[8px] font-bold ${
                    done ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                  }`}>{done ? '✗' : i + 1}</span>
                  <span className={s === 'Recompute!' ? 'font-bold text-rose-600 dark:text-rose-300' : 'text-slate-600 dark:text-slate-300'}>
                    {s}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-2 text-[10px] text-rose-500">Every action re-executes all transformations!</p>
        </div>

        {/* With cache */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${withCachePhase ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5'}`}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">With Cache</p>
          <div className="space-y-2">
            {['Read & Transform', 'df.cache()', 'Action 1: count() ← cached', 'Action 2: write() ← cached'].map((s, i) => {
              const idx = step - 4
              const active = withCachePhase && i === idx
              const done = withCachePhase && i < idx
              return (
                <div key={s} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all duration-400 ${
                  active ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : done ? 'opacity-60' : 'opacity-30'
                }`}>
                  <span className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full text-[8px] font-bold ${
                    done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                  }`}>{done ? '✓' : i + 1}</span>
                  <span className={s.includes('cached') ? 'font-bold text-emerald-600 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-300'}>
                    {s}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-2 text-[10px] text-emerald-500">Compute once → reuse many times!</p>
        </div>

        {/* Storage levels */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Storage Levels (persist)</p>
          <div className="space-y-2">
            {storageLevels.map((l) => (
              <div key={l.name} className="rounded-lg bg-white px-3 py-2 dark:bg-white/5">
                <code className="text-[10px] font-bold text-slate-700 dark:text-slate-200">{l.name}</code>
                <div className="mt-1 flex items-center gap-3 text-[9px]">
                  <span className={l.mem ? 'text-azure-500' : 'text-slate-300'}>
                    {l.mem ? '💾 Memory' : '— No mem'}
                  </span>
                  <span className={l.disk ? 'text-amber-500' : 'text-slate-300'}>
                    {l.disk ? '💿 Disk' : '— No disk'}
                  </span>
                </div>
                <p className="mt-0.5 text-[9px] text-slate-400">{l.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-amber-50 p-2 dark:bg-amber-500/10">
            <p className="text-[9px] font-bold text-amber-700 dark:text-amber-300">When to cache?</p>
            <p className="mt-0.5 text-[9px] text-amber-600 dark:text-amber-400">
              Reuse same DataFrame for multiple actions. Always unpersist() when done.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
