import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { glossaryTerms } from '../data/glossary.js'
import { getGlossaryConnection } from '../data/glossaryLinks.js'
import { scenarioQuestions } from '../data/scenarioInterviews.js'

function RelatedBlock({ term }) {
  const conn = getGlossaryConnection(term)
  if (!conn) return null

  const relatedQs = conn.conceptId
    ? scenarioQuestions.filter((q) => q.conceptId === conn.conceptId).slice(0, 3)
    : []

  return (
    <div className="mt-4 space-y-3 border-t border-slate-100 pt-3 dark:border-white/10">
      {conn.practical && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">In practice</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{conn.practical}</p>
        </div>
      )}
      {conn.relatedConcepts?.length > 0 && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Related concepts</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {conn.relatedConcepts.map((c) => (
              <span
                key={c}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-300"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
      {relatedQs.length > 0 && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Related interview questions</p>
          <ul className="mt-1.5 space-y-1">
            {relatedQs.map((q) => (
              <li key={q.id} className="text-xs leading-snug text-slate-600 dark:text-slate-300">
                · {q.scenario}
              </li>
            ))}
          </ul>
        </div>
      )}
      {conn.hubLinks?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {conn.hubLinks.map((link) => (
            <Link
              key={link.tab + link.label}
              to={`/hub?tab=${link.tab}`}
              className="rounded-full border border-azure-500/30 bg-azure-500/10 px-2.5 py-1 text-[11px] font-semibold text-azure-700 transition hover:bg-azure-500/20 dark:text-azure-300"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Glossary({ embedded = false }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [openTerm, setOpenTerm] = useState(null)

  const uniqueTerms = useMemo(() => {
    const seen = new Set()
    return glossaryTerms.filter((t) => {
      if (seen.has(t.term)) return false
      seen.add(t.term)
      return true
    })
  }, [])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(uniqueTerms.map((t) => t.category))).sort()],
    [uniqueTerms],
  )

  const filtered = uniqueTerms
    .filter((t) => (category === 'All' ? true : t.category === category))
    .filter((t) => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    })
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className={embedded ? '' : 'container-page py-10 sm:py-14'}>
      {!embedded && (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Interview Hub · Glossary
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold">Data engineering terms, explained.</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Quick definitions for Azure, Databricks, modeling, Spark, security, and DevOps words you will
            hear in class and interviews.
          </p>
        </>
      )}

      {embedded && (
        <p className="mb-6 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Search terms, open a card for practical meaning, then jump to related interview questions or assignments.
        </p>
      )}

      <div className={`${embedded ? '' : 'mt-8'} flex flex-wrap gap-3`}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          className="min-w-[220px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5"
        />
        <div className="flex max-w-full flex-wrap gap-2 overflow-x-auto">
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
        {filtered.map((t) => {
          const expanded = openTerm === t.term
          const hasConn = Boolean(getGlossaryConnection(t.term))
          return (
            <article
              key={t.term}
              className={`card p-5 transition hover:border-azure-400/50 ${expanded ? 'ring-1 ring-azure-500/30' : ''}`}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 text-left"
                onClick={() => setOpenTerm(expanded ? null : t.term)}
              >
                <h2 className="font-display text-lg font-semibold">{t.term}</h2>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:bg-white/10 dark:text-slate-300">
                  {t.category}
                </span>
              </button>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t.definition}</p>
              {hasConn && (
                <p className="mt-2 text-[11px] font-semibold text-azure-600 dark:text-azure-400">
                  {expanded ? 'Hide connections ▲' : 'Show practice links ▼'}
                </p>
              )}
              {expanded && <RelatedBlock term={t.term} />}
            </article>
          )
        })}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-slate-500">No terms match that search.</p>
      )}
    </div>
  )
}
