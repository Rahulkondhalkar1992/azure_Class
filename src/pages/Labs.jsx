import { SiMysql, SiPython } from 'react-icons/si'

const labs = [
  {
    title: 'SQL Lab',
    icon: SiMysql,
    color: '#4479A1',
    description:
      'Write and run SQL queries against realistic business datasets. Practice joins, CTEs, window functions, optimization, and interview-style problems with immediate results.',
    scenarios: ['Customer order analysis', 'SCD Type 2 validation', 'Duplicate and data-quality checks'],
    sample: 'SELECT customer_id, SUM(amount)\nFROM orders\nGROUP BY customer_id;',
  },
  {
    title: 'Python Lab',
    icon: SiPython,
    color: '#3776AB',
    description:
      'Execute Python in the browser and solve data engineering scenarios using files, JSON, APIs, transformations, exception handling, and reusable functions.',
    scenarios: ['Parse nested API responses', 'Clean malformed files', 'Build reusable ingestion utilities'],
    sample: 'records = load_json("orders.json")\ncleaned = transform(records)\nprint(cleaned[:5])',
  },
]

export default function Labs() {
  return (
    <div className="container-page py-12 sm:py-14">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Practice labs
        </p>
        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
          Upcoming
        </span>
      </div>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
        Try your query and code execution here.
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        Browser-based SQL and Python workspaces are coming soon. You will practice real-time scenarios,
        run solutions, inspect output, and work through questions used in data engineering interviews.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {labs.map(({ title, icon: Icon, color, description, scenarios, sample }) => (
          <article key={title} className="card overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <Icon size={28} color={color} />
                  <h2 className="font-display text-2xl font-semibold">{title}</h2>
                </span>
                <span className="rounded-full border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  Coming soon
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {scenarios.map((scenario) => (
                  <li key={scenario} className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    {scenario}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-slate-200 bg-ink-900 p-5 font-mono text-xs text-slate-300 dark:border-white/10">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap">{sample}</pre>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
