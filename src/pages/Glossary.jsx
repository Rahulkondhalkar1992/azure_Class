import { useMemo, useState } from 'react'
import { glossaryTerms } from '../data/glossary.js'

export default function Glossary() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(glossaryTerms.map((t) => t.category))).sort()],
    [],
  )

  const filtered = glossaryTerms
    .filter((t) => (category === 'All' ? true : t.category === category))
    .filter((t) => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    })
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Tools · Glossary
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Data engineering terms, explained.</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Quick definitions for Azure, Databricks, modeling, Spark, security, and DevOps words you will
        hear in class and interviews.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          className="min-w-[220px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                category === c
                  ? 'bg-azure-500 text-white'
                  : 'border border-slate-200 dark:border-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {filtered.map((t) => (
          <article key={t.term} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg font-semibold">{t.term}</h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:bg-white/10 dark:text-slate-300">
                {t.category}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t.definition}</p>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-slate-500">No terms match that search.</p>
      )}
    </div>
  )
}
