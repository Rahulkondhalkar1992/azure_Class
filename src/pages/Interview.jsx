import { useState } from 'react'
import { interviewTracks } from '../data/interviews.js'
import { top100Categories } from '../data/top100.js'

const allTabs = [
  ...top100Categories.map((c) => ({ id: c.id, label: c.label, count: c.questions.length, questions: c.questions, isTop100: true })),
  ...interviewTracks.map((t) => ({ id: t.id, label: t.label + ' (Mentor)', count: t.count, questions: t.questions, isTop100: false })),
]

export default function Interview() {
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

  const expandAll = () => {
    setOpenSet(new Set(current.questions.map((_, i) => i)))
  }

  const collapseAll = () => setOpenSet(new Set())

  const switchTab = (id) => {
    setTab(id)
    setOpenSet(new Set())
  }

  const totalTop100 = top100Categories.reduce((sum, c) => sum + c.questions.length, 0)

  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Interview Preparation
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">
        Top {totalTop100} Interview Questions
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        SQL, PySpark, Databricks, ADF, Azure Storage, Delta Lake, Data Modeling, Security, and System Design —
        every question asked in recent Azure Data Engineering interviews. Click a question to reveal the answer.
      </p>
      <p className="mt-3 text-sm text-amber-600 dark:text-amber-400 font-medium">
        Recent interviews consistently mention: Delta Lake optimization, Unity Catalog, ZORDER, VACUUM,
        Workflows, Liquid Clustering, and SCD implementation.
      </p>

      {/* Category tabs */}
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

      {/* Controls */}
      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={expandAll}
          className="text-xs font-semibold text-azure-600 hover:underline dark:text-azure-400">
          Expand all
        </button>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <button type="button" onClick={collapseAll}
          className="text-xs font-semibold text-slate-500 hover:underline dark:text-slate-400">
          Collapse all
        </button>
        <span className="ml-auto text-xs text-slate-400">
          {current.questions.length} questions
        </span>
      </div>

      {/* Questions */}
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
                <span className={`flex-shrink-0 text-lg text-slate-400 transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
              {isOpen && (
                <div className="border-t border-slate-200 px-5 py-4 dark:border-white/10">
                  <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                    {item.a}
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
