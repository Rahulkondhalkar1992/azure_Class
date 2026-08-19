import { useEffect, useState } from 'react'

const batches = [
  { id: 'B1', rows: 1200, files: ['sales_01.parquet', 'sales_02.parquet'] },
  { id: 'B2', rows: 980, files: ['sales_03.parquet'] },
  { id: 'B3', rows: 1540, files: ['sales_04.parquet', 'sales_05.parquet', 'sales_06.parquet'] },
]

export default function BatchProcessing() {
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState('queue') // queue → process → done

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => {
        if (p === 'queue') return 'process'
        if (p === 'process') return 'done'
        setActive((a) => (a + 1) % batches.length)
        return 'queue'
      })
    }, 1600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Concept</p>
        <h3 className="font-display text-lg font-semibold">Batch Processing</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Accumulate data, process in scheduled windows — high throughput, bounded latency.
        </p>
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 700 160" className="block h-auto min-w-[500px] w-full">
          {/* Queue */}
          <rect x="10" y="20" width="180" height="120" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
          <text x="100" y="16" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold uppercase dark:fill-slate-400">Queue</text>
          {batches.map((b, i) => {
            const y = 35 + i * 34
            const isCurrent = i === active
            return (
              <g key={b.id}>
                <rect
                  x="20" y={y} width="160" height="28" rx="6"
                  className={
                    isCurrent && phase !== 'queue'
                      ? 'fill-azure-500/20 stroke-azure-500/50'
                      : 'fill-white stroke-slate-200 dark:fill-white/5 dark:stroke-white/10'
                  }
                />
                <text x="32" y={y + 18} className={`text-[11px] font-semibold ${isCurrent && phase !== 'queue' ? 'fill-azure-600 dark:fill-azure-300' : 'fill-slate-700 dark:fill-slate-200'}`}>
                  {b.id}
                </text>
                <text x="58" y={y + 18} className="fill-slate-400 text-[10px] dark:fill-slate-500">
                  {b.rows} rows · {b.files.length} files
                </text>
              </g>
            )
          })}

          {/* Arrow */}
          <g>
            <line x1="200" y1="80" x2="280" y2="80" stroke="#0078D4" strokeWidth="2" strokeDasharray="5 4" opacity={phase === 'process' ? 1 : 0.3}>
              {phase === 'process' && (
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.6s" repeatCount="indefinite" />
              )}
            </line>
            <polygon points="278,74 290,80 278,86" fill="#0078D4" opacity={phase === 'process' ? 1 : 0.3} />
          </g>

          {/* Spark engine */}
          <rect x="300" y="40" width="150" height="80" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
          <text x="375" y="36" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold uppercase dark:fill-slate-400">Spark Engine</text>
          {[0, 1, 2, 3].map((j) => {
            const bx = 315 + j * 32
            return (
              <g key={j}>
                <rect x={bx} y="58" width="24" height="48" rx="4" className="fill-white stroke-slate-200 dark:fill-white/5 dark:stroke-white/10" />
                {phase === 'process' && (
                  <rect x={bx + 3} y="88" width="18" rx="3" className="fill-azure-500" opacity="0.9">
                    <animate attributeName="height" values="0;30;18;26" dur="1.2s" begin={`${j * 0.15}s`} repeatCount="indefinite" />
                    <animate attributeName="y" values="88;58;70;62" dur="1.2s" begin={`${j * 0.15}s`} repeatCount="indefinite" />
                  </rect>
                )}
                <text x={bx + 12} y="116" textAnchor="middle" className="fill-slate-400 text-[8px] dark:fill-slate-500">E{j}</text>
              </g>
            )
          })}

          {/* Arrow out */}
          <g>
            <line x1="460" y1="80" x2="530" y2="80" stroke="#22c55e" strokeWidth="2" strokeDasharray="5 4" opacity={phase === 'done' ? 1 : 0.3}>
              {phase === 'done' && (
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.6s" repeatCount="indefinite" />
              )}
            </line>
            <polygon points="528,74 540,80 528,86" fill="#22c55e" opacity={phase === 'done' ? 1 : 0.3} />
          </g>

          {/* Output */}
          <rect x="550" y="50" width="130" height="60" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
          <text x="615" y="46" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold uppercase dark:fill-slate-400">Delta Table</text>
          <text x="615" y="78" textAnchor="middle" className="fill-emerald-600 text-[12px] font-bold dark:fill-emerald-400">
            {phase === 'done' ? `${batches[active].rows} rows ✓` : '…'}
          </text>
          <text x="615" y="97" textAnchor="middle" className="fill-slate-400 text-[10px] dark:fill-slate-500">
            {phase === 'done' ? 'committed' : 'waiting'}
          </text>
        </svg>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className={`h-2 w-2 rounded-full ${phase === 'process' ? 'animate-pulse bg-azure-500' : phase === 'done' ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
        <span className="text-slate-500 dark:text-slate-400">
          {phase === 'queue' && `Batch ${batches[active].id} queued — waiting for schedule`}
          {phase === 'process' && `Processing ${batches[active].id} across 4 executors…`}
          {phase === 'done' && `Batch ${batches[active].id} committed to Delta — ${batches[active].rows} rows`}
        </span>
      </div>
    </div>
  )
}
