import PipelineAnimation from '../components/PipelineAnimation.jsx'
import IncrementalLoad from '../components/concepts/IncrementalLoad.jsx'
import BatchProcessing from '../components/concepts/BatchProcessing.jsx'
import MergeInsert from '../components/concepts/MergeInsert.jsx'
import CDCAnimation from '../components/concepts/CDCAnimation.jsx'
import SCDType2 from '../components/concepts/SCDType2.jsx'
import DeltaLogBenefits from '../components/concepts/DeltaLogBenefits.jsx'
import StreamingDataFlow from '../components/concepts/StreamingDataFlow.jsx'

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
        and Power BI reporting. Every concept below is animated so you see the data flow before writing code.
      </p>

      {/* Architecture diagram */}
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

      {/* Concept animations */}
      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Core Concepts — Animated
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold">
          See the data move before you write the code
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Each animation below shows exactly how a key lakehouse pattern works — watch the rows flow,
          the logs commit, and the dimensions evolve in real time.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <IncrementalLoad />
        <BatchProcessing />
        <MergeInsert />
        <CDCAnimation />
        <SCDType2 />
        <DeltaLogBenefits />
        <StreamingDataFlow />
      </div>
    </div>
  )
}
