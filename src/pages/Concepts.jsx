import { useMemo, useState } from 'react'
import ConceptLesson from '../components/ConceptLesson.jsx'
import { conceptSections } from '../data/conceptsContent.js'

export default function Concepts() {
  const [openId, setOpenId] = useState(null)
  const [query, setQuery] = useState('')
  const [sectionFilter, setSectionFilter] = useState('All')

  const totalConcepts = useMemo(
    () => conceptSections.reduce((n, s) => n + s.concepts.length, 0),
    [],
  )

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase()
    return conceptSections
      .filter((s) => (sectionFilter === 'All' ? true : s.id === sectionFilter))
      .map((s) => ({
        ...s,
        concepts: s.concepts.filter((c) => {
          if (!q) return true
          const hay = [c.title, c.summary, c.explanation, c.tag, ...(c.similarQuestions?.map((x) => x.q) || [])]
            .join(' ')
            .toLowerCase()
          return hay.includes(q)
        }),
      }))
      .filter((s) => s.concepts.length > 0)
  }, [query, sectionFilter])

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Tools · Concepts
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold">
        Learn the idea. See it move. Spot the interview angle.
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Start with topic headers. Open a concept for a short explanation, a real Azure Data Engineering
        example, a supporting animation, and similar interview questions that share one underlying answer.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-azure-500/10 px-3 py-1 text-xs font-semibold text-azure-700 dark:text-azure-300">
          {totalConcepts} concepts
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
          Click a topic to expand
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts or interview questions…"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSectionFilter('All')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              sectionFilter === 'All'
                ? 'bg-azure-500 text-white'
                : 'border border-slate-200 dark:border-white/10'
            }`}
          >
            All
          </button>
          {conceptSections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSectionFilter(s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                sectionFilter === s.id
                  ? 'bg-azure-500 text-white'
                  : 'border border-slate-200 dark:border-white/10'
              }`}
            >
              {s.heading}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {filteredSections.map((section) => (
          <section key={section.id}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-800 dark:text-slate-100">
                  {section.heading}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{section.blurb}</p>
              </div>
              <p className="text-xs font-semibold text-slate-400">{section.concepts.length} topics</p>
            </div>

            <div className="space-y-3">
              {section.concepts.map((concept) => (
                <ConceptLesson
                  key={concept.id}
                  concept={concept}
                  open={openId === concept.id}
                  onToggle={() => toggle(concept.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <p className="mt-10 text-sm text-slate-500">No concepts match that search.</p>
      )}
    </div>
  )
}
