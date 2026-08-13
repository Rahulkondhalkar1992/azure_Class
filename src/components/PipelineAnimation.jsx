const nodes = [
  { id: 'src', label: 'Sources', sub: 'SQL · API · Files', x: 48, y: 110 },
  { id: 'adf', label: 'ADF', sub: 'Orchestrate', x: 210, y: 110 },
  { id: 'bronze', label: 'Bronze', sub: 'ADLS raw', x: 372, y: 48 },
  { id: 'silver', label: 'Silver', sub: 'Delta clean', x: 372, y: 110 },
  { id: 'gold', label: 'Gold', sub: 'Star / facts', x: 372, y: 172 },
  { id: 'dbx', label: 'Databricks', sub: 'Spark · UC', x: 560, y: 110 },
  { id: 'serve', label: 'Serve', sub: 'SQL · BI', x: 730, y: 110 },
]

export default function PipelineAnimation() {
  return (
    <div className="card overflow-hidden p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Lakehouse ELT
          </p>
          <h3 className="font-display text-lg font-semibold">Medallion pipeline in motion</h3>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Running
        </span>
      </div>

      <div className="relative overflow-x-auto">
        <svg viewBox="0 0 800 230" className="h-auto min-w-[640px] w-full">
          <defs>
            <linearGradient id="line" x1="0" x2="1">
              <stop offset="0%" stopColor="#0078D4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#0078D4" />
              <stop offset="100%" stopColor="#FF3621" stopOpacity="0.8" />
            </linearGradient>
            <path id="p1" d="M96 110 H210" />
            <path id="p2" d="M258 110 H372" />
            <path id="p3" d="M420 110 H560" />
            <path id="p4" d="M608 110 H730" />
            <path id="pB" d="M372 86 V64" />
            <path id="pG" d="M372 134 V172" />
          </defs>

          <path d="M96 110 H730" stroke="url(#line)" strokeWidth="2" fill="none" />
          <path d="M372 64 V172" stroke="#0078D4" strokeOpacity="0.35" strokeWidth="2" fill="none" />

          <circle r="5" fill="#0078D4">
            <animateMotion dur="4.8s" repeatCount="indefinite">
              <mpath href="#p1" />
            </animateMotion>
          </circle>
          <circle r="5" fill="#3aa0e8">
            <animateMotion dur="4.8s" begin="0.8s" repeatCount="indefinite">
              <mpath href="#p2" />
            </animateMotion>
          </circle>
          <circle r="5" fill="#FF3621">
            <animateMotion dur="4.8s" begin="1.4s" repeatCount="indefinite">
              <mpath href="#p3" />
            </animateMotion>
          </circle>
          <circle r="5" fill="#22c55e">
            <animateMotion dur="4.8s" begin="2s" repeatCount="indefinite">
              <mpath href="#p4" />
            </animateMotion>
          </circle>

          {nodes.map((n) => (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              <rect
                x="-48"
                y="-28"
                width="96"
                height="56"
                rx="14"
                className="fill-white stroke-slate-200 dark:fill-[#12182a] dark:stroke-white/10"
              />
              <text
                textAnchor="middle"
                y="-4"
                className="fill-slate-900 text-[12px] font-semibold dark:fill-white"
              >
                {n.label}
              </text>
              <text textAnchor="middle" y="14" className="fill-slate-500 text-[9px] dark:fill-slate-400">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { t: 'Extract', d: 'ADF Copy from SQL, files, and APIs into ADLS.' },
          { t: 'Load', d: 'Land Bronze as-is. No business rules yet.' },
          { t: 'Transform', d: 'Databricks + Delta build Silver and Gold.' },
        ].map((s, i) => (
          <div key={s.t} className="rounded-xl bg-slate-50 p-3 dark:bg-white/5">
            <p className="text-xs font-semibold text-azure-600 dark:text-azure-400">
              0{i + 1} {s.t}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
