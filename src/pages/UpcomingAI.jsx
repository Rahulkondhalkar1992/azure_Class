const items = [
  {
    t: 'LLMs on Databricks',
    d: 'Foundation models, serving endpoints, and how a data engineer prepares feature tables and eval sets — not just “call an API.”',
  },
  {
    t: 'RAG on the lakehouse',
    d: 'Chunk Gold documents, store embeddings, retrieve with governance. Unity Catalog stays in the path so AI does not bypass security.',
  },
  {
    t: 'AI + pipelines',
    d: 'Use models for classification, data quality hints, and notebook assist — still orchestrated by ADF and Databricks Jobs.',
  },
]

export default function UpcomingAI() {
  return (
    <div className="container-page py-14">
      <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-600 dark:text-violet-300">
        Upcoming
      </span>
      <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold">
        LLM, RAG, and AI — on Databricks, after the lakehouse is real.
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        This track lands after the core program. You will already know Delta, Unity Catalog, and jobs.
        Then we add retrieval and models on the same data you built.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <article key={i.t} className="card p-6">
            <h2 className="font-display text-lg font-semibold">{i.t}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{i.d}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
