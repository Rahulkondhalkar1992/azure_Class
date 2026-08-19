import { useEffect, useState } from 'react'

const initial = [
  { id: 1, name: 'Alice', city: 'Mumbai', start: '2024-01-01', end: '9999-12-31', current: true },
  { id: 2, name: 'Bob', city: 'Delhi', start: '2024-01-01', end: '9999-12-31', current: true },
]

const changeEvent = { id: 1, name: 'Alice', city: 'Pune', date: '2024-03-15' }

export default function SCDType2() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 6), 2200)
    return () => clearInterval(timer)
  }, [])

  const getRows = () => {
    if (step < 3) return initial
    return [
      { ...initial[0], end: '2024-03-14', current: false },
      { id: 1, name: 'Alice', city: 'Pune', start: '2024-03-15', end: '9999-12-31', current: true },
      initial[1],
    ]
  }

  const rows = getRows()

  return (
    <div className="card overflow-hidden p-5 sm:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">Concept</p>
        <h3 className="font-display text-lg font-semibold">SCD Type 2</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Keep full history — expire old row, insert new row with updated values.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Change event */}
        <div className="space-y-3">
          <div className={`rounded-xl border-2 border-dashed p-4 transition-all duration-500 ${
            step >= 1 && step <= 2 ? 'border-amber-500 bg-amber-500/5' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5'
          }`}>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">Incoming Change</p>
            <div className="font-mono text-sm text-slate-700 dark:text-slate-200">
              <p>id=<span className="font-bold">1</span> (Alice)</p>
              <p>city: Mumbai → <span className="font-bold text-amber-600 dark:text-amber-400">Pune</span></p>
              <p className="text-xs text-slate-400">effective: {changeEvent.date}</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">SCD2 Steps</p>
            <div className="space-y-2 text-xs">
              {[
                'Detect change: city differs for id=1',
                'Expire old row: set end_date = 2024-03-14, is_current = false',
                'Insert new row: city=Pune, start_date=2024-03-15, is_current = true',
              ].map((s, i) => (
                <div key={i} className={`flex items-start gap-2 rounded-lg px-2 py-1.5 transition-all duration-400 ${
                  step === i + 1 ? 'bg-azure-50 ring-1 ring-azure-400 dark:bg-azure-500/10' :
                  step > i + 1 ? 'opacity-100' : 'opacity-40'
                }`}>
                  <span className={`mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full text-[9px] font-bold ${
                    step > i + 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                  }`}>
                    {step > i + 1 ? '✓' : i + 1}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dimension table */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Dimension Table (customer_dim)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th className="pb-1.5 pr-2">ID</th>
                  <th className="pb-1.5 pr-2">Name</th>
                  <th className="pb-1.5 pr-2">City</th>
                  <th className="pb-1.5 pr-2">Start</th>
                  <th className="pb-1.5 pr-2">End</th>
                  <th className="pb-1.5">Current</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const isExpired = step >= 3 && r.id === 1 && !r.current
                  const isNew = step >= 3 && r.id === 1 && r.current && r.city === 'Pune'
                  return (
                    <tr
                      key={`${r.id}-${r.start}`}
                      className={`border-b border-slate-100 dark:border-white/5 transition-all duration-500 ${
                        isExpired ? 'bg-rose-50 dark:bg-rose-500/10' :
                        isNew ? 'bg-emerald-50 dark:bg-emerald-500/10' : ''
                      }`}
                      style={isNew ? { animation: 'fadeSlideIn 0.5s ease-out' } : undefined}
                    >
                      <td className="py-1.5 pr-2 font-mono">{r.id}</td>
                      <td className="py-1.5 pr-2">{r.name}</td>
                      <td className={`py-1.5 pr-2 ${isNew ? 'font-bold text-emerald-700 dark:text-emerald-300' : isExpired ? 'line-through text-slate-400' : ''}`}>
                        {r.city}
                      </td>
                      <td className="py-1.5 pr-2 font-mono text-slate-400">{r.start}</td>
                      <td className={`py-1.5 pr-2 font-mono ${isExpired ? 'font-bold text-rose-600 dark:text-rose-300' : 'text-slate-400'}`}>
                        {r.end}
                      </td>
                      <td className="py-1.5">
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          r.current ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400'
                        }`}>
                          {r.current ? 'YES' : 'NO'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
