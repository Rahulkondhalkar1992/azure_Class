import { useEffect, useState } from 'react'

const target = [
  { id: 1, name: 'Alice', city: 'Mumbai', ver: 'v1' },
  { id: 2, name: 'Bob', city: 'Delhi', ver: 'v1' },
  { id: 3, name: 'Carol', city: 'Pune', ver: 'v1' },
]
const incoming = [
  { id: 2, name: 'Bob', city: 'Bangalore', action: 'UPDATE' },
  { id: 4, name: 'Dave', city: 'Chennai', action: 'INSERT' },
]

export default function MergeInsert() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 5), 2000)
    return () => clearInterval(timer)
  }, [])

  const matched = step >= 2
  const applied = step >= 3
  const done = step >= 4

  const getTargetRows = () => {
    if (!applied) return target
    return [
      target[0],
      { ...target[1], city: 'Bangalore', ver: 'v2' },
      target[2],
      { id: 4, name: 'Dave', city: 'Chennai', ver: 'v1' },
    ]
  }

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Concept</p>
        <h3 className="font-display text-lg font-semibold">MERGE INTO vs INSERT INTO</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          MERGE matches on key — updates existing, inserts new. INSERT only appends.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Incoming */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">Incoming (Source)</p>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10">
                <th className="pb-1.5 pr-2">ID</th>
                <th className="pb-1.5 pr-2">Name</th>
                <th className="pb-1.5 pr-2">City</th>
                <th className="pb-1.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {incoming.map((r) => (
                <tr
                  key={r.id}
                  className={`border-b border-slate-100 dark:border-white/5 transition-colors duration-500 ${
                    matched && r.action === 'UPDATE' ? 'bg-amber-50 dark:bg-amber-500/10' :
                    matched && r.action === 'INSERT' ? 'bg-emerald-50 dark:bg-emerald-500/10' : ''
                  }`}
                >
                  <td className="py-1.5 pr-2 font-mono">{r.id}</td>
                  <td className="py-1.5 pr-2">{r.name}</td>
                  <td className="py-1.5 pr-2">{r.city}</td>
                  <td className="py-1.5">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      r.action === 'UPDATE' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                    }`}>
                      {r.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MERGE logic */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className={`rounded-xl border-2 border-dashed p-4 transition-all duration-500 ${
            step === 1 ? 'border-azure-500 bg-azure-500/5' :
            step === 2 ? 'border-amber-500 bg-amber-500/5' :
            step >= 3 ? 'border-emerald-500 bg-emerald-500/5' :
            'border-slate-200 dark:border-white/10'
          }`}>
            <pre className="text-left font-mono text-[10px] leading-relaxed text-slate-600 dark:text-slate-300">
{`MERGE INTO target t
USING source s
ON t.id = s.id
WHEN MATCHED THEN
  UPDATE SET t.city = s.city
WHEN NOT MATCHED THEN
  INSERT (id, name, city)
  VALUES (s.id, s.name, s.city)`}
            </pre>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${
              step <= 1 ? 'animate-pulse bg-azure-500' : step === 2 ? 'bg-amber-500' : 'bg-emerald-500'
            }`} />
            <span className="text-slate-500 dark:text-slate-400">
              {step === 0 && 'Preparing MERGE…'}
              {step === 1 && 'Matching on t.id = s.id'}
              {step === 2 && 'id=2 MATCHED → UPDATE'}
              {step === 3 && 'id=4 NOT MATCHED → INSERT'}
              {step === 4 && 'MERGE complete ✓'}
            </span>
          </div>
        </div>

        {/* Target table */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Target (Delta)</p>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10">
                <th className="pb-1.5 pr-2">ID</th>
                <th className="pb-1.5 pr-2">Name</th>
                <th className="pb-1.5 pr-2">City</th>
                <th className="pb-1.5">Ver</th>
              </tr>
            </thead>
            <tbody>
              {getTargetRows().map((r) => (
                <tr
                  key={r.id}
                  className={`border-b border-slate-100 dark:border-white/5 transition-colors duration-500 ${
                    applied && r.id === 2 ? 'bg-amber-50 dark:bg-amber-500/10' :
                    applied && r.id === 4 ? 'bg-emerald-50 dark:bg-emerald-500/10' : ''
                  }`}
                >
                  <td className="py-1.5 pr-2 font-mono">{r.id}</td>
                  <td className="py-1.5 pr-2">{r.name}</td>
                  <td className={`py-1.5 pr-2 ${applied && r.id === 2 ? 'font-bold text-amber-700 dark:text-amber-300' : ''}`}>
                    {r.city}
                  </td>
                  <td className="py-1.5 font-mono text-slate-400">{r.ver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
