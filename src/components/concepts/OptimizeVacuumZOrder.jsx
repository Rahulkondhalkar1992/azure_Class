import { useEffect, useState } from 'react'

export default function OptimizeVacuumZOrder() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 12), 1800)
    return () => clearInterval(timer)
  }, [])

  const optimizePhase = step < 4
  const vacuumPhase = step >= 4 && step < 8
  const zorderPhase = step >= 8

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 7</p>
        <h3 className="font-display text-lg font-semibold">OPTIMIZE, VACUUM & Z-ORDER</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Keep Delta tables clean, small, and super fast.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* OPTIMIZE */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${optimizePhase ? 'border-azure-500 bg-azure-500/5' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5'}`}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-azure-600 dark:text-azure-400">OPTIMIZE</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Compacts small files into fewer large files.</p>
          <div className="mt-3 flex items-center gap-4">
            <div className="text-center">
              <p className="text-[9px] font-bold uppercase text-slate-400">Before</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`h-4 w-3 rounded-sm transition-all duration-500 ${
                    optimizePhase && step >= 2 ? 'scale-0 opacity-0' : 'bg-azure-400/60'
                  }`} />
                ))}
              </div>
            </div>
            <span className="text-lg text-slate-300">→</span>
            <div className="text-center">
              <p className="text-[9px] font-bold uppercase text-slate-400">After</p>
              <div className="mt-1 flex gap-1">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className={`h-6 w-6 rounded-sm transition-all duration-500 ${
                    optimizePhase && step >= 2 ? 'bg-azure-500 scale-100' : 'bg-azure-200/30 scale-75'
                  }`} />
                ))}
              </div>
            </div>
          </div>
          <code className="mt-3 block text-[10px] text-slate-500">OPTIMIZE my_table;</code>
          <div className="mt-2 space-y-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
            <p>✓ Fewer files</p><p>✓ Faster queries</p><p>✓ Better data skipping</p>
          </div>
        </div>

        {/* VACUUM */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${vacuumPhase ? 'border-rose-500 bg-rose-500/5' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5'}`}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">VACUUM</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Removes old files no longer needed by Delta.</p>
          <div className="mt-3 space-y-1.5">
            {['part-old-001', 'part-old-002', 'part-old-003', 'part-current'].map((f, i) => {
              const isOld = i < 3
              const removed = vacuumPhase && step >= 6 && isOld
              return (
                <div key={f} className={`flex items-center gap-2 rounded px-2 py-1 font-mono text-[10px] transition-all duration-500 ${
                  removed ? 'line-through opacity-30 bg-rose-50 dark:bg-rose-500/5' :
                  isOld && vacuumPhase ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300' :
                  'text-slate-500'
                }`}>
                  <span>{isOld ? '🗑' : '📄'}</span>
                  <span>{f}.parquet</span>
                  {removed && <span className="text-rose-500">deleted</span>}
                </div>
              )
            })}
          </div>
          <code className="mt-3 block text-[10px] text-slate-500">VACUUM my_table RETAIN 168 HOURS;</code>
          <p className="mt-1 text-[9px] text-rose-500">⚠ Do not run with 0 hours retention in production!</p>
        </div>

        {/* Z-ORDER */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${zorderPhase ? 'border-violet-500 bg-violet-500/5' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5'}`}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400">Z-ORDER</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Co-locates related data within files for faster filtering.</p>
          <div className="mt-3 flex items-center gap-4">
            <div className="text-center">
              <p className="text-[9px] font-bold uppercase text-slate-400">Scattered</p>
              <div className="mt-1 grid grid-cols-4 gap-0.5">
                {['r','b','g','r','g','r','b','g','b','g','r','b','r','b','g','r'].map((c, i) => (
                  <div key={i} className={`h-3 w-3 rounded-sm transition-all duration-700 ${
                    zorderPhase && step >= 10 ? 'opacity-20' : ''
                  } ${c === 'r' ? 'bg-rose-400' : c === 'b' ? 'bg-azure-400' : 'bg-emerald-400'}`} />
                ))}
              </div>
            </div>
            <span className="text-lg text-slate-300">→</span>
            <div className="text-center">
              <p className="text-[9px] font-bold uppercase text-slate-400">Z-Ordered</p>
              <div className="mt-1 grid grid-cols-4 gap-0.5">
                {['r','r','r','r','r','b','b','b','b','b','g','g','g','g','g','g'].map((c, i) => (
                  <div key={i} className={`h-3 w-3 rounded-sm transition-all duration-700 ${
                    zorderPhase && step >= 10 ? 'scale-100 opacity-100' : 'opacity-40'
                  } ${c === 'r' ? 'bg-rose-400' : c === 'b' ? 'bg-azure-400' : 'bg-emerald-400'}`} />
                ))}
              </div>
            </div>
          </div>
          <code className="mt-3 block text-[10px] text-slate-500">OPTIMIZE my_table ZORDER BY (customer_id, order_date);</code>
          <div className="mt-2 space-y-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
            <p>✓ Better data skipping</p><p>✓ Faster filtering on selective columns</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className={`h-2 w-2 rounded-full ${optimizePhase ? 'animate-pulse bg-azure-500' : vacuumPhase ? 'animate-pulse bg-rose-500' : 'animate-pulse bg-violet-500'}`} />
        <span className="text-slate-500 dark:text-slate-400">
          {optimizePhase && 'OPTIMIZE: compacting small files…'}
          {vacuumPhase && 'VACUUM: cleaning old files after retention…'}
          {zorderPhase && 'Z-ORDER: co-locating data for faster queries…'}
        </span>
      </div>
    </div>
  )
}
