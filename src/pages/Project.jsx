import { Link } from 'react-router-dom'
import PipelineAnimation from '../components/PipelineAnimation.jsx'

const stages = [
  { t: 'Ingest', d: 'ADF metadata-driven pipelines pull source systems on schedule.' },
  { t: 'Land', d: 'Bronze in ADLS — raw, replayable, partitioned by date.' },
  { t: 'Refine', d: 'Databricks notebooks clean, conform, and MERGE to Silver.' },
  { t: 'Publish', d: 'Gold star schema for BI, with quality gates before serve.' },
]

export default function Project() {
  return (
    <div className="container-page py-14">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Industry Project
        </p>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          Live
        </span>
      </div>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold">
        A production-shaped lakehouse, not a toy CSV demo.
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Build a real medallion architecture end to end — ADF ingestion, Delta lakehouse, Spark transforms,
        and Power BI reporting.
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

      <Link
        to="/concepts"
        className="card mt-10 flex items-center justify-between gap-4 p-6 transition hover:ring-2 hover:ring-azure-500"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Animated Concepts
          </p>
          <p className="mt-1 font-display text-lg font-semibold">
            See how every pattern works — CDC, SCD2, MERGE, streaming, and more
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            16 animated visualizations covering Spark, Delta Lake, DLT, Unity Catalog, joins, caching, and data patterns.
          </p>
        </div>
        <span className="text-2xl text-azure-500">→</span>
      </Link>
    </div>
  )
}
