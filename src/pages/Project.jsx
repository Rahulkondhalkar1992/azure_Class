import PipelineAnimation from '../components/PipelineAnimation.jsx'

const stages = [
  { t: 'Ingest', d: 'ADF pulls source systems on a schedule and on events.' },
  { t: 'Land', d: 'Bronze in ADLS — raw, replayable, partitioned by date.' },
  { t: 'Refine', d: 'Databricks notebooks clean, conform, and MERGE to Silver.' },
  { t: 'Publish', d: 'Gold star schema for BI, with quality gates before serve.' },
]

export default function Project() {
  return (
    <div className="container-page py-14">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Realtime industry project
        </p>
        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          Coming soon
        </span>
      </div>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold">
        A production-shaped lakehouse, not a toy CSV demo.
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        The capstone is being wired as a live walkthrough: pipeline run, Spark job, Delta MERGE, then Gold.
        Until it ships, this is the execution story you will build in class.
      </p>

      <div className="mt-10">
        <PipelineAnimation />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s, i) => (
          <article key={s.t} className="card p-5">
            <div className="mb-3 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div
                className="spark-bar h-full bg-azure-500"
                style={{ animationDelay: `${i * 0.35}s` }}
              />
            </div>
            <p className="font-display font-semibold">{s.t}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.d}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
