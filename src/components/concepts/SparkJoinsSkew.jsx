import { useEffect, useState } from 'react'

const joinTypes = [
  { name: 'Inner', desc: 'Matching rows from both sides', left: [1,2,3], right: [2,3,4], result: [2,3] },
  { name: 'Left', desc: 'All from left + matching right', left: [1,2,3], right: [2,3,4], result: [1,2,3] },
  { name: 'Full Outer', desc: 'All from both sides', left: [1,2,3], right: [2,3,4], result: [1,2,3,4] },
]

const skewBars = [
  { key: 'A', count: 10 },
  { key: 'B', count: 20 },
  { key: 'C', count: 10000 },
]

const fixes = [
  { name: 'Broadcast Join', desc: 'Ship small table to all executors' },
  { name: 'Salting', desc: 'Add random salt to hot keys to distribute' },
  { name: 'AQE', desc: 'Adaptive Query Execution auto-handles skew' },
  { name: 'Repartition', desc: 'Repartition on join key before join' },
]

export default function SparkJoinsSkew() {
  const [activeJoin, setActiveJoin] = useState(0)
  const [showFix, setShowFix] = useState(false)

  useEffect(() => {
    const t1 = setInterval(() => setActiveJoin((j) => (j + 1) % joinTypes.length), 3000)
    const t2 = setInterval(() => setShowFix((f) => !f), 4000)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  const join = joinTypes[activeJoin]

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 11</p>
        <h3 className="font-display text-lg font-semibold">Spark Joins & Data Skew</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Join types, skew detection, and practical fixes for production pipelines.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Join types */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Join Types</p>
          <div className="space-y-2">
            {joinTypes.map((j, i) => (
              <div key={j.name} className={`rounded-lg px-3 py-2 transition-all duration-500 ${
                i === activeJoin ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' : 'opacity-40'
              }`}>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{j.name} Join</p>
                <p className="text-[10px] text-slate-400">{j.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <div>
              <p className="text-[9px] font-bold text-slate-400">Left</p>
              <div className="mt-1 flex gap-1">
                {join.left.map((v) => (
                  <span key={v} className={`grid h-6 w-6 place-items-center rounded text-[10px] font-bold ${
                    join.result.includes(v) ? 'bg-azure-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                  }`}>{v}</span>
                ))}
              </div>
            </div>
            <span className="text-slate-300">⋈</span>
            <div>
              <p className="text-[9px] font-bold text-slate-400">Right</p>
              <div className="mt-1 flex gap-1">
                {join.right.map((v) => (
                  <span key={v} className={`grid h-6 w-6 place-items-center rounded text-[10px] font-bold ${
                    join.result.includes(v) ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                  }`}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skew */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">Data Skew</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-3">
            When some join keys have significantly more records than others.
          </p>
          <div className="flex items-end gap-3 h-28">
            {skewBars.map((b) => {
              const height = Math.min((b.count / 10000) * 100, 100)
              const isSalted = showFix && b.key === 'C'
              return (
                <div key={b.key} className="flex flex-col items-center gap-1 flex-1">
                  <div className="relative w-full flex justify-center" style={{ height: '100px' }}>
                    <div
                      className={`w-8 rounded-t transition-all duration-700 ${
                        b.count > 1000
                          ? isSalted ? 'bg-emerald-500' : 'bg-rose-500'
                          : 'bg-azure-400'
                      }`}
                      style={{
                        height: isSalted ? '33%' : `${height}%`,
                        position: 'absolute',
                        bottom: 0,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{b.key}</span>
                  <span className="text-[9px] text-slate-400">
                    {isSalted ? '~3.3K' : b.count.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-2 text-center text-[9px] text-slate-400">
            {showFix ? 'After salting — key C split into 3 partitions' : 'Key C is skewed — straggler task!'}
          </p>
        </div>

        {/* Fixes */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Skew Fixes</p>
          <div className="space-y-2">
            {fixes.map((f) => (
              <div key={f.name} className="rounded-lg bg-white px-3 py-2 dark:bg-white/5">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{f.name}</p>
                <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-slate-100 p-2 dark:bg-white/5">
            <p className="text-[9px] font-bold text-slate-500">Useful Configs</p>
            <pre className="mt-1 font-mono text-[9px] text-slate-400">
{`spark.sql.adaptive.enabled = true
spark.sql.adaptive.skewJoin.enabled = true
spark.sql.shuffle.partitions = 200`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
