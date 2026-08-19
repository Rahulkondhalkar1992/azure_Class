import SparkTransformations from '../components/concepts/SparkTransformations.jsx'
import LazyEvalDAG from '../components/concepts/LazyEvalDAG.jsx'
import DeltaACID from '../components/concepts/DeltaACID.jsx'
import OptimizeVacuumZOrder from '../components/concepts/OptimizeVacuumZOrder.jsx'
import AutoLoaderStreaming from '../components/concepts/AutoLoaderStreaming.jsx'
import DeltaLiveTables from '../components/concepts/DeltaLiveTables.jsx'
import UnityCatalog from '../components/concepts/UnityCatalog.jsx'
import SparkJoinsSkew from '../components/concepts/SparkJoinsSkew.jsx'
import MergeInsert from '../components/concepts/MergeInsert.jsx'
import SparkCachePersist from '../components/concepts/SparkCachePersist.jsx'
import IncrementalLoad from '../components/concepts/IncrementalLoad.jsx'
import BatchProcessing from '../components/concepts/BatchProcessing.jsx'
import CDCAnimation from '../components/concepts/CDCAnimation.jsx'
import SCDType2 from '../components/concepts/SCDType2.jsx'
import DeltaLogBenefits from '../components/concepts/DeltaLogBenefits.jsx'
import StreamingDataFlow from '../components/concepts/StreamingDataFlow.jsx'

const sections = [
  { heading: 'Spark Fundamentals', items: [SparkTransformations, LazyEvalDAG] },
  { heading: 'Delta Lake Core', items: [DeltaACID, DeltaLogBenefits, OptimizeVacuumZOrder] },
  { heading: 'Ingestion & Streaming', items: [AutoLoaderStreaming, StreamingDataFlow, IncrementalLoad, BatchProcessing] },
  { heading: 'DLT & Governance', items: [DeltaLiveTables, UnityCatalog] },
  { heading: 'Joins, Skew & Performance', items: [SparkJoinsSkew, SparkCachePersist] },
  { heading: 'Data Patterns', items: [MergeInsert, CDCAnimation, SCDType2] },
]

export default function Concepts() {
  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Animated Concepts
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold">
        See the data move before you write the code
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Every core data engineering concept — animated so you understand the flow, not just the syntax.
        Covers Spark, Delta Lake, DLT, Unity Catalog, CDC, SCD2, streaming, and more.
      </p>

      {sections.map((section) => (
        <div key={section.heading} className="mt-12">
          <h2 className="mb-6 font-display text-xl font-bold text-slate-800 dark:text-slate-100">
            {section.heading}
          </h2>
          <div className="space-y-6">
            {section.items.map((Component, i) => (
              <Component key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
