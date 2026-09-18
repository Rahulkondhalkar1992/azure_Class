import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getConceptMeta,
  getRelatedScenarios,
  scenarioCategories,
  scenarioQuestions,
} from '../data/scenarioInterviews.js'

const difficulties = ['All', 'Medium', 'Hard', 'Advanced']

function DiffBadge({ level }) {
  const styles = {
    Medium: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    Hard: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
    Advanced: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
  }
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${styles[level] || styles.Medium}`}>
      {level}
    </span>
  )
}

function ScenarioDetail({ question, onSelectRelated }) {
  const [showAnswer, setShowAnswer] = useState(false)
  const concept = getConceptMeta(question.conceptId)
  const related = getRelatedScenarios(question)

  return (
    <div className="space-y-5 border-t border-slate-200 px-5 py-5 dark:border-white/10">
      <section>
        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Scenario</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{question.scenario}</p>
      </section>

      {concept && (
        <section className="rounded-xl border border-azure-500/20 bg-azure-500/5 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-azure-700 dark:text-azure-300">
            Core concept
          </p>
          <p className="mt-1 font-semibold text-slate-800 dark:text-slate-100">{concept.title}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{concept.summary}</p>
          <p className="mt-2 text-xs text-slate-500">
            Interviewers often rephrase this same idea — see related questions below.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              to="/hub?tab=glossary"
              className="rounded-full border border-azure-500/30 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-azure-700 dark:bg-white/10 dark:text-azure-300"
            >
              Glossary →
            </Link>
            <Link
              to="/hub?tab=quiz"
              className="rounded-full border border-azure-500/30 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-azure-700 dark:bg-white/10 dark:text-azure-300"
            >
              Self-assessment →
            </Link>
            {(question.category === 'adf' || question.category === 'adf-dbx') && (
              <Link
                to="/hub?tab=adf"
                className="rounded-full border border-azure-500/30 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-azure-700 dark:bg-white/10 dark:text-azure-300"
              >
                ADF assignment →
              </Link>
            )}
          </div>
        </section>
      )}

      <section>
        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">What the interviewer is testing</h4>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{question.testing}</p>
      </section>

      <section>
        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Skills tested</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {question.skills.map((s) => (
            <span key={s} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs dark:border-white/10">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">How to approach</h4>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {question.approach.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <div>
        <button
          type="button"
          onClick={() => setShowAnswer((v) => !v)}
          className="rounded-full bg-azure-500 px-4 py-2 text-sm font-semibold text-white hover:bg-azure-600"
        >
          {showAnswer ? 'Hide answer' : 'View answer'}
        </button>
      </div>

      {showAnswer && (
        <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <section>
            <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Expected answer
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-100/90">{question.answer}</p>
          </section>
          {question.example && (
            <section>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                Example
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/90 dark:text-emerald-100/90">{question.example}</p>
            </section>
          )}
        </div>
      )}

      {related.length > 0 && (
        <section>
          <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Related / similar questions
          </h4>
          <p className="mt-1 text-xs text-slate-500">Same core concept — different wording.</p>
          <div className="mt-3 space-y-2">
            {related.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onSelectRelated(r.id)}
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm hover:border-azure-400 dark:border-white/10 dark:bg-white/5"
              >
                <span className="mr-2 text-[11px] font-bold text-azure-600 dark:text-azure-400">{r.difficulty}</span>
                {r.scenario}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default function ScenarioInterviewLab() {
  const [category, setCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('All')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)

  const categoryLabel = (id) => scenarioCategories.find((c) => c.id === id)?.label || id

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return scenarioQuestions.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      if (difficulty !== 'All' && item.difficulty !== difficulty) return false
      if (!q) return true
      const hay = [item.scenario, item.topic, item.category, ...(item.tags || []), ...(item.skills || [])]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [category, difficulty, query])

  const counts = useMemo(() => {
    const map = { all: scenarioQuestions.length }
    scenarioQuestions.forEach((q) => {
      map[q.category] = (map[q.category] || 0) + 1
    })
    return map
  }, [])

  const openQuestion = (id) => {
    setOpenId(id)
    requestAnimationFrame(() => {
      document.getElementById(`scenario-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const topicGroups = useMemo(
    () => [
      {
        title: 'SQL',
        topics: ['Advanced SQL', 'Performance', 'Window Functions', 'Real-world Scenarios'],
        categoryId: 'sql',
      },
      {
        title: 'ADF',
        topics: ['Pipelines', 'Incremental Load', 'Metadata-driven', 'Troubleshooting'],
        categoryId: 'adf',
      },
      {
        title: 'Databricks',
        topics: ['Spark Performance', 'Delta Lake', 'Unity Catalog', 'Jobs', 'Medallion'],
        categoryId: 'databricks',
      },
      {
        title: 'Data Modeling',
        topics: ['Star Schema', 'SCD', 'Fact & Dimension', 'Schema Design'],
        categoryId: 'modeling',
      },
    ],
    [],
  )

  return (
    <div>
      <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
        Real-world problems interviewers ask: troubleshoot, design, and optimize. Filter by technology,
        open a scenario, then review related questions that test the <em>same core concept</em> with different wording.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {topicGroups.map((g) => (
          <button
            key={g.title}
            type="button"
            onClick={() => setCategory(g.categoryId)}
            className={`card p-4 text-left transition hover:border-azure-400 ${
              category === g.categoryId ? 'ring-2 ring-azure-500/40' : ''
            }`}
          >
            <p className="font-display text-base font-semibold">{g.title}</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-500">
              {g.topics.map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] font-semibold text-azure-600 dark:text-azure-400">
              {counts[g.categoryId] || 0} scenarios →
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search scenarios, tags, skills…"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5"
        />
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                difficulty === d ? 'bg-azure-500 text-white' : 'border border-slate-200 dark:border-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {scenarioCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              category === c.id
                ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900'
                : 'border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300'
            }`}
          >
            {c.label}
            <span className="ml-1 opacity-70">{counts[c.id] || 0}</span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Showing {filtered.length} of {scenarioQuestions.length} scenarios
      </p>

      <div className="mt-4 space-y-3">
        {filtered.map((item) => {
          const open = openId === item.id
          return (
            <article
              key={item.id}
              id={`scenario-${item.id}`}
              className={`card overflow-hidden transition ${open ? 'ring-2 ring-azure-500/30' : ''}`}
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-azure-600 dark:text-azure-400">
                      {categoryLabel(item.category)}
                    </span>
                    <DiffBadge level={item.difficulty} />
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                      {item.topic}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
                    {item.scenario}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-white/5 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Skills: {item.skills.slice(0, 4).join(' · ')}
                    {item.skills.length > 4 ? '…' : ''}
                  </p>
                </div>
                <span className="flex-shrink-0 text-sm font-semibold text-azure-600 dark:text-azure-400">
                  {open ? 'Close' : 'Open'} {open ? '−' : '+'}
                </span>
              </button>

              {open && (
                <ScenarioDetail
                  question={item}
                  onSelectRelated={(id) => openQuestion(id)}
                />
              )}
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-slate-500">No scenarios match your filters.</p>
      )}
    </div>
  )
}
