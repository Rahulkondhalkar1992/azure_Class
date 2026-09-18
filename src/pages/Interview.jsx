import { useState } from 'react'
import ScenarioInterviewLab from '../components/ScenarioInterviewLab.jsx'
import { interviewTracks } from '../data/interviews.js'
import { scenarioQuestions } from '../data/scenarioInterviews.js'
import { top100Categories } from '../data/top100.js'

const allTabs = [
  ...top100Categories.map((c) => ({
    id: c.id,
    label: c.label,
    count: c.questions.length,
    questions: c.questions,
  })),
  ...interviewTracks.map((t) => ({
    id: t.id,
    label: t.label + ' (Mentor)',
    count: t.count,
    questions: t.questions,
  })),
]

function TheoryInterview() {
  const [tab, setTab] = useState(allTabs[0].id)
  const [openSet, setOpenSet] = useState(new Set())
  const current = allTabs.find((t) => t.id === tab)

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const switchTab = (id) => {
    setTab(id)
    setOpenSet(new Set())
  }

  const totalTop100 = top100Categories.reduce((sum, c) => sum + c.questions.length, 0)

  return (
    <>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        SQL, PySpark, Databricks, ADF, Azure Storage, Delta Lake, Data Modeling, Security, and System Design —
        classic Q&amp;A. Click a question to reveal the answer.
      </p>
      <p className="mt-3 text-sm font-medium text-amber-600 dark:text-amber-400">
        Hot topics: Delta optimization, Unity Catalog, ZORDER, VACUUM, Workflows, Liquid Clustering, SCD.
      </p>
      <p className="mt-2 text-xs text-slate-500">{totalTop100}+ theory questions across curated tracks</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {allTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => switchTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? 'bg-azure-500 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5'
            }`}
          >
            {t.label} · {t.count}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpenSet(new Set(current.questions.map((_, i) => i)))}
          className="text-xs font-semibold text-azure-600 hover:underline dark:text-azure-400"
        >
          Expand all
        </button>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <button
          type="button"
          onClick={() => setOpenSet(new Set())}
          className="text-xs font-semibold text-slate-500 hover:underline dark:text-slate-400"
        >
          Collapse all
        </button>
        <span className="ml-auto text-xs text-slate-400">{current.questions.length} questions</span>
      </div>

      <div className="mt-4 space-y-3">
        {current.questions.map((item, i) => {
          const isOpen = openSet.has(i)
          return (
            <article key={item.q} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium">
                  <span className="mr-2 text-azure-600 dark:text-azure-400">{i + 1}.</span>
                  {item.q}
                </span>
                <span className={`flex-shrink-0 text-lg text-slate-400 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-slate-200 px-5 py-4 dark:border-white/10">
                  <div className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.a}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}

export default function Interview({ embedded = false }) {
  const [mode, setMode] = useState('scenarios')

  return (
    <div className={embedded ? '' : 'container-page py-10 sm:py-14'}>
      {!embedded && (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Interview Hub · Questions
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold">
            {mode === 'scenarios' ? 'Scenario-based interview lab' : 'Theory Q&A bank'}
          </h1>
        </>
      )}

      {embedded && (
        <div className="mb-4">
          <h2 className="font-display text-xl font-semibold">
            {mode === 'scenarios' ? 'Scenario-based interview lab' : 'Theory Q&A bank'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Filter by technology, difficulty, and search — then drill into related questions.
          </p>
        </div>
      )}

      <div className={`${embedded ? 'mt-2' : 'mt-6'} inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-white/5`}>
        <button
          type="button"
          onClick={() => setMode('scenarios')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === 'scenarios' ? 'bg-azure-500 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Scenario lab · {scenarioQuestions.length}
        </button>
        <button
          type="button"
          onClick={() => setMode('theory')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            mode === 'theory' ? 'bg-azure-500 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Theory Q&amp;A
        </button>
      </div>

      {mode === 'scenarios' ? <ScenarioInterviewLab /> : <TheoryInterview />}
    </div>
  )
}
