import { lazy, Suspense } from 'react'

const ExcalidrawCanvas = lazy(() => import('../components/ExcalidrawCanvas.jsx'))

export default function Whiteboard() {
  return (
    <div className="container-page py-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Whiteboard
          </p>
          <h1 className="font-display text-3xl font-bold">Draw the architecture.</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Same drawing surface as Excalidraw — sketch ADF, ADLS, and Databricks on a blank canvas.
          </p>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="grid h-[560px] place-items-center rounded-2xl border border-dashed border-slate-300 text-sm text-slate-500">
            Loading whiteboard…
          </div>
        }
      >
        <ExcalidrawCanvas />
      </Suspense>
    </div>
  )
}
