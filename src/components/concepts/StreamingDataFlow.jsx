import { useEffect, useState } from 'react'

const events = [
  { id: 'e1', user: 'u42', action: 'page_view', page: '/home' },
  { id: 'e2', user: 'u17', action: 'click', page: '/pricing' },
  { id: 'e3', user: 'u42', action: 'add_cart', page: '/product/9' },
  { id: 'e4', user: 'u88', action: 'page_view', page: '/about' },
  { id: 'e5', user: 'u17', action: 'purchase', page: '/checkout' },
  { id: 'e6', user: 'u42', action: 'page_view', page: '/thanks' },
]

export default function StreamingDataFlow() {
  const [cursor, setCursor] = useState(0)
  const [processed, setProcessed] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCursor((c) => {
        const next = (c + 1) % (events.length + 3)
        if (next === 0) {
          setProcessed([])
        } else if (next <= events.length) {
          setProcessed((p) => [...p, events[next - 1]])
        }
        return next
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  const inFlight = cursor > 0 && cursor <= events.length ? events[cursor - 1] : null

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Concept</p>
        <h3 className="font-display text-lg font-semibold">Streaming Data Flow</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Continuous ingestion — events arrive, get processed in micro-batches, and land in Delta.
        </p>
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 760 180" className="block h-auto min-w-[560px] w-full">
          {/* Event source */}
          <rect x="10" y="40" width="130" height="100" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
          <text x="75" y="34" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold uppercase dark:fill-slate-400">Event Source</text>
          {events.map((e, i) => {
            const y = 52 + i * 14
            const isActive = inFlight?.id === e.id
            return (
              <text
                key={e.id} x="22" y={y + 10}
                className={`text-[9px] font-mono transition-all ${
                  isActive ? 'fill-azure-500 font-bold' :
                  processed.some((p) => p.id === e.id) ? 'fill-slate-300 dark:fill-slate-600' :
                  'fill-slate-500 dark:fill-slate-400'
                }`}
              >
                {e.user} {e.action}
              </text>
            )
          })}

          {/* Kafka / Event Hub */}
          <rect x="190" y="60" width="120" height="60" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
          <text x="250" y="86" textAnchor="middle" className="fill-slate-700 text-[11px] font-semibold dark:fill-slate-200">Event Hub</text>
          <text x="250" y="102" textAnchor="middle" className="fill-slate-400 text-[9px] dark:fill-slate-500">Kafka / IoT Hub</text>

          {/* Spark Structured Streaming */}
          <rect x="360" y="50" width="150" height="80" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
          <text x="435" y="44" textAnchor="middle" className="fill-slate-500 text-[10px] font-semibold uppercase dark:fill-slate-400">Spark Streaming</text>

          {/* Micro-batch bars */}
          {[0, 1, 2, 3].map((j) => {
            const bx = 375 + j * 32
            return (
              <g key={j}>
                <rect x={bx} y="68" width="22" height="48" rx="4" className="fill-white stroke-slate-200 dark:fill-white/5 dark:stroke-white/10" />
                {inFlight && (
                  <rect x={bx + 3} width="16" rx="3" className="fill-cyan-500" opacity="0.8">
                    <animate attributeName="height" values="0;28;14;22" dur="0.9s" begin={`${j * 0.12}s`} repeatCount="indefinite" />
                    <animate attributeName="y" values="98;70;84;76" dur="0.9s" begin={`${j * 0.12}s`} repeatCount="indefinite" />
                  </rect>
                )}
                <text x={bx + 11} y="126" textAnchor="middle" className="fill-slate-400 text-[8px] dark:fill-slate-500">μ{j}</text>
              </g>
            )
          })}

          {/* Delta sink */}
          <rect x="560" y="60" width="130" height="60" rx="12" className="fill-slate-50 stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10" />
          <text x="625" y="86" textAnchor="middle" className="fill-emerald-600 text-[11px] font-bold dark:fill-emerald-400">Delta Lake</text>
          <text x="625" y="102" textAnchor="middle" className="fill-slate-400 text-[9px] dark:fill-slate-500">
            {processed.length} events
          </text>

          {/* Animated flow lines */}
          <line x1="142" y1="90" x2="188" y2="90" stroke="#2FD9E8" strokeWidth="1.6" strokeDasharray="5 4" opacity={inFlight ? 0.9 : 0.2}>
            {inFlight && <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.5s" repeatCount="indefinite" />}
          </line>
          <polygon points="186,85 194,90 186,95" fill="#2FD9E8" opacity={inFlight ? 0.9 : 0.2} />

          <line x1="312" y1="90" x2="358" y2="90" stroke="#2FD9E8" strokeWidth="1.6" strokeDasharray="5 4" opacity={inFlight ? 0.9 : 0.2}>
            {inFlight && <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.5s" repeatCount="indefinite" />}
          </line>
          <polygon points="356,85 364,90 356,95" fill="#2FD9E8" opacity={inFlight ? 0.9 : 0.2} />

          <line x1="512" y1="90" x2="558" y2="90" stroke="#22c55e" strokeWidth="1.6" strokeDasharray="5 4" opacity={processed.length > 0 ? 0.9 : 0.2}>
            {processed.length > 0 && <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.5s" repeatCount="indefinite" />}
          </line>
          <polygon points="556,85 564,90 556,95" fill="#22c55e" opacity={processed.length > 0 ? 0.9 : 0.2} />

          {/* Moving dot */}
          {inFlight && (
            <circle r="4" fill="#2FD9E8">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M142,90 L558,90" />
            </circle>
          )}
        </svg>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
          <p className="text-xs font-semibold text-azure-600 dark:text-azure-400">Trigger</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            processingTime="10 seconds" for micro-batch intervals.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
          <p className="text-xs font-semibold text-azure-600 dark:text-azure-400">Checkpoint</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Offset tracking ensures exactly-once delivery to Delta.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
          <p className="text-xs font-semibold text-azure-600 dark:text-azure-400">Output</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Append / Complete / Update mode to the Delta sink.
          </p>
        </div>
      </div>
    </div>
  )
}
