export default function PipelineAnimation() {
  return (
    <div className="card overflow-hidden p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            🏗 End-to-End Project Architecture
          </p>
          <h3 className="font-display text-lg font-semibold">
            The pipeline you'll build, layer by layer
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A sample reference architecture — the same shape you'll implement live in Sessions 13–14.
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Running
        </span>
      </div>

      <div className="relative overflow-x-auto rounded-2xl border border-white/[0.09] bg-[#111A2C] p-5 sm:p-8">
        <svg viewBox="0 0 920 300" className="block h-auto min-w-[720px] w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <style>{`
              .flow-line{fill:none;stroke:#2FD9E8;stroke-width:1.6;stroke-dasharray:6 7;opacity:0.75;animation:dash 2.4s linear infinite}
              .flow-line.violet{stroke:#9B8CFB;animation-duration:3s}
              @keyframes dash{to{stroke-dashoffset:-130}}
              @media(prefers-reduced-motion:reduce){.flow-line{animation:none}}
            `}</style>
          </defs>

          {/* Column headers */}
          <text x="30" y="24" fill="#5C687E" fontFamily="'JetBrains Mono', monospace" fontSize="11">INGEST</text>
          <text x="230" y="24" fill="#5C687E" fontFamily="'JetBrains Mono', monospace" fontSize="11">BRONZE</text>
          <text x="430" y="24" fill="#5C687E" fontFamily="'JetBrains Mono', monospace" fontSize="11">SILVER</text>
          <text x="630" y="24" fill="#5C687E" fontFamily="'JetBrains Mono', monospace" fontSize="11">GOLD</text>
          <text x="800" y="24" fill="#5C687E" fontFamily="'JetBrains Mono', monospace" fontSize="11">SERVE</text>

          {/* Source Systems */}
          <rect x="20" y="60" width="150" height="52" rx="10" fill="#152238" stroke="#232E45" />
          <text x="36" y="82" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="600">Source Systems</text>
          <text x="36" y="99" fill="#8B96AC" fontFamily="'JetBrains Mono', monospace" fontSize="10.5">SQL DB · REST API · Files</text>

          {/* ADF Metadata-driven */}
          <rect x="20" y="150" width="150" height="52" rx="10" fill="#152238" stroke="#232E45" />
          <text x="36" y="172" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="600">Azure Data Factory</text>
          <text x="36" y="189" fill="#8B96AC" fontFamily="'JetBrains Mono', monospace" fontSize="10.5">Metadata-driven pipelines</text>

          {/* Bronze */}
          <rect x="220" y="105" width="150" height="52" rx="10" fill="#1a1408" stroke="#3a2a12" />
          <text x="236" y="127" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="600">Bronze Layer</text>
          <text x="236" y="144" fill="#C9834A" fontFamily="'JetBrains Mono', monospace" fontSize="10.5">Raw · ADLS Gen2</text>

          {/* Silver */}
          <rect x="420" y="105" width="150" height="52" rx="10" fill="#0f1620" stroke="#232E45" />
          <text x="436" y="127" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="600">Silver Layer</text>
          <text x="436" y="144" fill="#AEB7C4" fontFamily="'JetBrains Mono', monospace" fontSize="10.5">Cleansed · Databricks</text>

          {/* Gold */}
          <rect x="620" y="105" width="150" height="52" rx="10" fill="#1c1608" stroke="#3a2f12" />
          <text x="636" y="127" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="600">Gold Layer</text>
          <text x="636" y="144" fill="#E4C570" fontFamily="'JetBrains Mono', monospace" fontSize="10.5">Star schema · Delta</text>

          {/* Power BI */}
          <rect x="790" y="105" width="115" height="52" rx="10" fill="#152238" stroke="#232E45" />
          <text x="806" y="127" fill="#fff" fontFamily="'Space Grotesk', sans-serif" fontSize="13" fontWeight="600">Power BI</text>
          <text x="806" y="144" fill="#8B96AC" fontFamily="'JetBrains Mono', monospace" fontSize="10.5">Reporting</text>

          {/* Unity Catalog */}
          <rect x="220" y="220" width="520" height="42" rx="10" fill="none" stroke="#9B8CFB" strokeDasharray="4 4" opacity="0.55" />
          <text x="236" y="245" fill="#9B8CFB" fontFamily="'JetBrains Mono', monospace" fontSize="11">
            Unity Catalog — governance, schemas &amp; RBAC across Bronze → Silver → Gold
          </text>

          {/* Flow lines: Source → ADF → Bronze */}
          <path className="flow-line" d="M170,86 L220,131" />
          <path className="flow-line" d="M170,176 L220,131" />

          {/* Bronze → Silver */}
          <path className="flow-line" d="M370,131 L420,131" />

          {/* Silver → Gold */}
          <path className="flow-line" d="M570,131 L620,131" />

          {/* Gold → Power BI */}
          <path className="flow-line violet" d="M770,131 L790,131" />
        </svg>
        <p className="mt-3 text-center font-mono text-xs text-[#5C687E]">
          Sample architecture for illustration — the exact schema and sources are defined together during Sessions 13–14.
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { t: 'Extract', d: 'ADF metadata-driven Copy from SQL, files, and APIs into ADLS Bronze.' },
          { t: 'Load', d: 'Land Bronze as-is. No business rules yet — raw and replayable.' },
          { t: 'Transform', d: 'Databricks + Delta MERGE build Silver and Gold star schema.' },
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
