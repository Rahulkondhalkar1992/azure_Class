import { useState } from 'react'
import { interviewTracks } from '../data/interviews.js'

export default function Interview() {
  const [track, setTrack] = useState(interviewTracks[0].id)
  const [open, setOpen] = useState(0)
  const current = interviewTracks.find((t) => t.id === track)

  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Interview questions
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Forty questions. Real answers.</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        ADF, Databricks, SQL, and PySpark — the set mentors actually drill before a client interview.
        Open a question to reveal the answer.
      </p>
      <p className="mt-4 inline-flex rounded-full bg-azure-500/10 px-4 py-2 text-sm font-semibold text-azure-700 dark:text-azure-400">
        More real-world interview questions are coming. Stay tuned.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {interviewTracks.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTrack(t.id)
              setOpen(0)
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              track === t.id
                ? 'bg-azure-500 text-white'
                : 'border border-slate-200 dark:border-white/10'
            }`}
          >
            {t.label} · {t.count}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {current.questions.map((item, i) => (
          <article key={item.q} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium">
                <span className="mr-2 text-azure-600 dark:text-azure-400">{i + 1}.</span>
                {item.q}
              </span>
              <span className="text-slate-400">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <p className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:text-slate-300">
                {item.a}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
