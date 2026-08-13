import { lazy, Suspense, useMemo, useState } from 'react'
import { lakehouseDiagrams } from '../data/diagrams.js'

const ExcalidrawCanvas = lazy(() => import('../components/ExcalidrawCanvas.jsx'))

function DiagramPreview({ diagram, selected }) {
  return (
    <svg viewBox="0 0 620 280" className="h-36 w-full rounded-xl bg-slate-50 dark:bg-ink-950">
      {diagram.edges.map(([from, to]) => {
        const a = diagram.nodes.find((n) => n.id === from)
        const b = diagram.nodes.find((n) => n.id === to)
        if (!a || !b) return null
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x + 70}
            y1={a.y + 28}
            x2={b.x + 70}
            y2={b.y + 28}
            stroke={diagram.accent}
            strokeWidth="2"
            strokeOpacity="0.55"
          />
        )
      })}
      {diagram.nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width="140"
            height="56"
            rx="12"
            fill={selected ? '#fff' : '#fff'}
            stroke={diagram.accent}
            strokeWidth="2"
          />
          <text x={n.x + 70} y={n.y + 24} textAnchor="middle" className="fill-slate-900 text-[12px] font-semibold">
            {n.label}
          </text>
          <text x={n.x + 70} y={n.y + 40} textAnchor="middle" className="fill-slate-500 text-[9px]">
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function Whiteboard() {
  const [activeId, setActiveId] = useState(null)
  const [previewId, setPreviewId] = useState(lakehouseDiagrams[0].id)
  const [canvasKey, setCanvasKey] = useState(0)

  const preview = useMemo(
    () => lakehouseDiagrams.find((d) => d.id === previewId) || lakehouseDiagrams[0],
    [previewId],
  )

  const openInWhiteboard = (id) => {
    setActiveId(id)
    setPreviewId(id)
    setCanvasKey((k) => k + 1)
  }

  return (
    <div className="container-page py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Whiteboard
          </p>
          <h1 className="font-display text-3xl font-bold">Draw the architecture.</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Browse curated lakehouse diagrams, view them as static images, or open one on the canvas to
            edit and teach.
          </p>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="font-display text-lg font-semibold">Curated lakehouse diagrams</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {lakehouseDiagrams.map((diagram) => (
            <article
              key={diagram.id}
              className={`card overflow-hidden ${previewId === diagram.id ? 'ring-2 ring-azure-500/30' : ''}`}
            >
              <button type="button" className="w-full p-4 text-left" onClick={() => setPreviewId(diagram.id)}>
                <DiagramPreview diagram={diagram} selected={previewId === diagram.id} />
                <p className="mt-3 font-display font-semibold">{diagram.title}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{diagram.summary}</p>
              </button>
              <div className="flex flex-wrap gap-2 border-t border-slate-200 px-4 py-3 dark:border-white/10">
                <button
                  type="button"
                  className="btn-ghost !px-3 !py-1.5 text-xs"
                  onClick={() => setPreviewId(diagram.id)}
                >
                  View static
                </button>
                <button
                  type="button"
                  className="btn-primary !px-3 !py-1.5 text-xs"
                  onClick={() => openInWhiteboard(diagram.id)}
                >
                  Open in whiteboard
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="card mb-6 overflow-hidden p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold">Static preview · {preview.title}</p>
          <button type="button" className="btn-primary !px-3 !py-1.5 text-xs" onClick={() => openInWhiteboard(preview.id)}>
            Edit on canvas
          </button>
        </div>
        <DiagramPreview diagram={preview} selected />
      </section>

      <Suspense
        fallback={
          <div className="grid h-[560px] place-items-center rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500">
            Loading whiteboard…
          </div>
        }
      >
        <ExcalidrawCanvas key={canvasKey} diagramId={activeId} />
      </Suspense>
    </div>
  )
}
