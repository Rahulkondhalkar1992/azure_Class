import { useState } from 'react'

function SimilarQuestions({ questions, sharedAnswer }) {
  const [openQ, setOpenQ] = useState(-1)

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Similar questions</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Same concept — different interview wording. Expand any question to see the shared answer.
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {questions.map((item, i) => {
          const open = openQ === i
          return (
            <div key={item.q} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-ink-900/40">
              <button
                type="button"
                onClick={() => setOpenQ(open ? -1 : i)}
                className="flex w-full items-start justify-between gap-3 px-3.5 py-3 text-left"
              >
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  <span className="mr-2 text-azure-600 dark:text-azure-400">Q{i + 1}.</span>
                  {item.q}
                </span>
                <span className={`mt-0.5 flex-shrink-0 text-slate-400 transition ${open ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open && (
                <div className="border-t border-slate-100 px-3.5 py-3 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:text-slate-300">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    Same underlying answer
                  </p>
                  <p className="mt-1.5">{sharedAnswer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ConceptLesson({ concept, open, onToggle }) {
  const Visual = concept.Visual

  return (
    <article
      className={`overflow-hidden rounded-2xl border transition ${
        open
          ? 'border-azure-500/40 bg-white shadow-md shadow-azure-500/5 dark:bg-ink-900/60'
          : 'border-slate-200 bg-white hover:border-azure-400/50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-azure-400/30'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-4 py-4 text-left sm:px-5"
      >
        <span
          className={`mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-sm font-bold transition ${
            open
              ? 'bg-azure-500 text-white'
              : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300'
          }`}
        >
          {open ? '−' : '+'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-display text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              {concept.title}
            </span>
            <span className="rounded-full bg-azure-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-azure-700 dark:text-azure-300">
              {concept.tag}
            </span>
          </span>
          <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{concept.summary}</span>
        </span>
      </button>

      {open && (
        <div className="space-y-5 border-t border-slate-200 px-4 pb-5 pt-4 sm:px-5 dark:border-white/10">
          <section>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">In plain words</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{concept.explanation}</p>
          </section>

          <section className="rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 dark:border-amber-500/20 dark:bg-amber-500/10">
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-amber-800 dark:text-amber-300">
              Practical Azure DE example
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-amber-950/80 dark:text-amber-100/90">{concept.example}</p>
          </section>

          <section>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Visual walkthrough
            </h4>
            <div className="concept-visual-embed rounded-xl border border-slate-200 bg-slate-50/50 p-1 dark:border-white/10 dark:bg-white/[0.02] [&_.card]:mb-0 [&_.card]:border-0 [&_.card]:bg-transparent [&_.card]:shadow-none [&_.card]:dark:bg-transparent">
              <Visual embedded />
            </div>
          </section>

          <SimilarQuestions questions={concept.similarQuestions} sharedAnswer={concept.sharedAnswer} />
        </div>
      )}
    </article>
  )
}
