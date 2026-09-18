import { useMemo, useState } from 'react'
import { adfAssignmentMeta, adfAssignments } from '../data/adfAssignments.js'

function LevelBadge({ level }) {
  const hard = String(level).toLowerCase().includes('hard')
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
        hard
          ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
          : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
      }`}
    >
      {level}
    </span>
  )
}

export default function Assignments({ embedded = false }) {
  const [openId, setOpenId] = useState(adfAssignments[0]?.id)
  const [hintOpen, setHintOpen] = useState({})
  const [levelFilter, setLevelFilter] = useState('All')

  const filtered = useMemo(() => {
    if (levelFilter === 'All') return adfAssignments
    if (levelFilter === 'Medium') {
      return adfAssignments.filter((a) => a.level.toLowerCase().includes('medium') && !a.level.toLowerCase().includes('hard'))
    }
    return adfAssignments.filter((a) => a.level.toLowerCase().includes('hard'))
  }, [levelFilter])

  const toggleHint = (key) =>
    setHintOpen((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className={embedded ? '' : 'container-page py-10 sm:py-14'}>
      {!embedded && (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Interview Hub · ADF Assignment
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold">ADF Assignments — build real pipelines</h1>
        </>
      )}
      {embedded && (
        <h2 className="font-display text-xl font-semibold">ADF Assignments — build real pipelines</h2>
      )}
      <p className={`${embedded ? 'mt-2' : 'mt-3'} max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base`}>
        {adfAssignmentMeta.total} scenario-based assignments ({adfAssignmentMeta.difficulty}). Practice{' '}
        {adfAssignmentMeta.activitiesCovered.join(', ')} with expression building (
        {adfAssignmentMeta.expressionSkills.slice(0, 6).join(', ')}, …).
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 3).map((a) => (
          <button
            key={`card-${a.id}`}
            type="button"
            onClick={() => setOpenId(a.id)}
            className={`card p-4 text-left transition hover:border-azure-400 ${
              openId === a.id ? 'ring-2 ring-azure-500/35' : ''
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <LevelBadge level={a.level} />
              <span className="text-[11px] font-semibold text-slate-500">{a.tasks.length} tasks</span>
            </div>
            <p className="mt-2 font-display text-base font-semibold">{a.title}</p>
            <p className="mt-1 line-clamp-2 text-xs text-slate-500">{a.scenario}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {a.activities.slice(0, 3).map((act) => (
                <span key={act} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] dark:bg-white/10">
                  {act}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-azure-600 dark:text-azure-400">
              {openId === a.id ? 'Continue ↓' : 'Start →'}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {['All', 'Medium', 'Hard'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setLevelFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              levelFilter === f
                ? 'bg-azure-500 text-white'
                : 'border border-slate-200 dark:border-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="card h-fit space-y-1 p-2 lg:sticky lg:top-24">
          {filtered.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setOpenId(a.id)}
              className={`flex w-full items-start justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                openId === a.id
                  ? 'bg-azure-500 text-white'
                  : 'hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <span>
                <span className="font-semibold">A{a.number}.</span> {a.title}
              </span>
            </button>
          ))}
        </aside>

        <div className="space-y-4">
          {filtered.map((a) => {
            if (a.id !== openId) return null
            return (
              <article key={a.id} className="card overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-4 dark:border-white/10 dark:bg-white/5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-azure-600 dark:text-azure-400">
                      Assignment {a.number}
                    </span>
                    <LevelBadge level={a.level} />
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-semibold">{a.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{a.scenario}</p>
                  <p className="mt-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                    Business goal: <span className="font-normal text-slate-600 dark:text-slate-300">{a.businessGoal}</span>
                  </p>
                </div>

                <div className="space-y-6 p-5">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Required activities</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.activities.map((act) => (
                        <span
                          key={act}
                          className="rounded-full border border-azure-500/30 bg-azure-500/10 px-3 py-1 text-xs font-semibold text-azure-700 dark:text-azure-300"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Expression focus</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                      {a.expressionsFocus.map((ex) => (
                        <li key={ex} className="flex gap-2">
                          <span className="text-azure-500">▹</span>
                          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] dark:bg-white/10">{ex}</code>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">What you must build</h3>
                    <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {a.tasks.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ol>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Expression challenges</h3>
                    <div className="mt-3 space-y-3">
                      {a.expressionChallenges.map((ch, i) => {
                        const key = `${a.id}-h${i}`
                        return (
                          <div key={key} className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                              {i + 1}. {ch.prompt}
                            </p>
                            <button
                              type="button"
                              onClick={() => toggleHint(key)}
                              className="mt-2 text-xs font-semibold text-azure-600 hover:underline dark:text-azure-400"
                            >
                              {hintOpen[key] ? 'Hide hint' : 'Show hint'}
                            </button>
                            {hintOpen[key] && (
                              <p className="mt-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
                                {ch.hint}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Acceptance criteria</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                      {a.acceptance.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-emerald-500">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-white/15 dark:bg-white/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Stretch goal</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{a.stretch}</p>
                  </section>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
