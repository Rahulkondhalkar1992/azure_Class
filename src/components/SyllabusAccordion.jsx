import { useState } from 'react'

function Topic({ topic, depth = 0 }) {
  const [open, setOpen] = useState(false)
  const hasKids = topic.children?.length > 0

  return (
    <div className={depth ? 'ml-4 border-l border-slate-200 pl-3 dark:border-white/10' : ''}>
      <button
        type="button"
        onClick={() => hasKids && setOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
          hasKids ? 'hover:bg-slate-50 dark:hover:bg-white/5' : ''
        }`}
      >
        <span className="flex items-center gap-2">
          {topic.title}
          {topic.highlight && (
            <span
              className="text-sm text-amber-500"
              title="Important topic"
              aria-label="Important topic"
            >
              ★
            </span>
          )}
        </span>
        {hasKids && (
          <span className="text-xs text-slate-400">{open ? '−' : '+'}</span>
        )}
      </button>
      {open &&
        hasKids &&
        topic.children.map((c) => <Topic key={c.title} topic={c} depth={depth + 1} />)}
    </div>
  )
}

export default function SyllabusAccordion({ modules }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="space-y-3">
      {modules.map((mod) => {
        const open = openId === mod.id
        return (
          <article key={mod.id} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : mod.id)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left"
            >
              <div>
                <p className="font-display text-lg font-semibold">
                  {mod.emoji} {mod.title}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{mod.summary}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs font-semibold text-azure-600 dark:text-azure-400">{mod.hours}</p>
                <p className="mt-2 text-sm text-slate-400">{open ? 'Hide' : 'Open'}</p>
              </div>
            </button>
            {open && (
              <div className="border-t border-slate-200 px-3 pb-4 pt-2 dark:border-white/10">
                {mod.groups
                  ? mod.groups.map((g) => (
                      <div key={g.title} className="mt-3">
                        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-azure-600 dark:text-azure-400">
                          {g.title}
                        </p>
                        {g.topics.map((t) => (
                          <Topic key={t.title} topic={t} />
                        ))}
                      </div>
                    ))
                  : mod.topics.map((t) => <Topic key={t.title} topic={t} />)}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
