import { useEffect, useState } from 'react'

const hierarchy = [
  { level: 0, label: 'Metastore', icon: '🏛' },
  { level: 1, label: 'Catalog (Business Unit)', icon: '📁' },
  { level: 2, label: 'Schema (Department)', icon: '📂' },
  { level: 3, label: 'Table (Dataset)', icon: '📋' },
  { level: 4, label: 'Column Level Security', icon: '🔒' },
]

const flowNodes = [
  { label: 'ADLS Gen2', sub: 'Raw storage' },
  { label: 'Bronze', sub: 'Raw data' },
  { label: 'Silver', sub: 'Cleansed' },
  { label: 'Gold', sub: 'Curated' },
  { label: 'Unity Catalog', sub: 'Governed' },
  { label: 'BI / ML', sub: 'Analytics' },
]

const benefits = [
  'Centralized Governance',
  'Consistent Security',
  'Data Transparency',
  'Compliance & Auditing',
  'Data Sharing Simplified',
  'Scalability',
]

export default function UnityCatalog() {
  const [activeLevel, setActiveLevel] = useState(0)
  const [flowStep, setFlowStep] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setActiveLevel((l) => (l + 1) % hierarchy.length), 2000)
    const t2 = setInterval(() => setFlowStep((f) => (f + 1) % (flowNodes.length + 1)), 1500)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Day 10</p>
        <h3 className="font-display text-lg font-semibold">Unity Catalog — Governance & Security</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Centralized governance for all your data and AI assets in Databricks.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Hierarchy */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Metastore Hierarchy</p>
          <div className="space-y-1">
            {hierarchy.map((h, i) => (
              <div
                key={h.label}
                className={`flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-400 ${
                  i === activeLevel ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' : i < activeLevel ? 'opacity-60' : 'opacity-30'
                }`}
                style={{ paddingLeft: `${h.level * 16 + 8}px` }}
              >
                <span className="text-base">{h.icon}</span>
                <span className={`text-xs font-medium ${i === activeLevel ? 'font-bold text-azure-700 dark:text-azure-300' : 'text-slate-600 dark:text-slate-300'}`}>
                  {h.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-slate-400 dark:text-slate-500">
            Manage access and permissions at catalog, schema, table, and column level.
          </p>
        </div>

        {/* Data flow */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Data Flow</p>
          <div className="space-y-1.5">
            {flowNodes.map((n, i) => {
              const active = i < flowStep
              const current = i === flowStep - 1
              return (
                <div key={n.label}>
                  <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all duration-400 ${
                    current ? 'ring-2 ring-azure-500 bg-azure-50 dark:bg-azure-500/10' : active ? 'opacity-70' : 'opacity-25'
                  }`}>
                    <span className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{n.label}</span>
                    <span className="text-slate-400">— {n.sub}</span>
                  </div>
                  {i < flowNodes.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <div className={`h-2 w-0.5 ${active ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-white/10'}`} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-400">Secure → Govern → Discover → Share</p>
        </div>

        {/* Benefits */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">Benefits</p>
          <div className="space-y-2">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="text-emerald-500">✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-azure-50 p-2.5 dark:bg-azure-500/10">
            <p className="text-[10px] font-semibold text-azure-700 dark:text-azure-300">Best Practices</p>
            <div className="mt-1 space-y-0.5 text-[10px] text-azure-600 dark:text-azure-400">
              <p>• Use meaningful catalog, schema, table names</p>
              <p>• Enable audit logs and monitor regularly</p>
              <p>• Use groups and roles for access management</p>
              <p>• Classify and tag your data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
