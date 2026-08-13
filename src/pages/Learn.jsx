import { Link } from 'react-router-dom'
import { FiHelpCircle, FiMonitor, FiTool, FiUsers } from 'react-icons/fi'
import JoinForm from '../components/JoinForm.jsx'

const learningExperience = [
  {
    icon: FiUsers,
    title: 'Instructor-led sessions',
    body: 'Learn directly from working data professionals through a structured, mentor-led program.',
  },
  {
    icon: FiMonitor,
    title: 'Live, interactive classes',
    body: 'Follow every concept live, ask questions, and see pipelines built step by step.',
  },
  {
    icon: FiHelpCircle,
    title: 'Doubt solving',
    body: 'Resolve questions during the class instead of carrying confusion into the next module.',
  },
  {
    icon: FiTool,
    title: 'Practice in the same session',
    body: 'Apply each concept immediately with guided SQL, Azure, Spark, and Databricks exercises.',
  },
]

const audiences = [
  {
    title: 'Market Research',
    body: 'You already live in surveys, Excel, and stakeholder questions. We turn that into pipelines, models, and lakehouse tables so research data is trusted, not emailed.',
  },
  {
    title: 'Data Analyst',
    body: 'You can write SQL and build dashboards. We add ADF, Databricks, and Delta so you can own the data before it hits Power BI.',
  },
  {
    title: 'Data Domain / SME',
    body: 'Finance, retail, healthcare, ops — domain knowledge is a superpower. Pair it with engineering patterns and you become the person who can both explain the grain and ship the load.',
  },
  {
    title: 'Test Engineer',
    body: 'You already think in cases, data quality, and “what broke.” Data engineering needs that mindset for reconciliation, CDC, and pipeline assertions.',
  },
  {
    title: 'Support Engineer',
    body: 'You have seen production pain. We map that to monitoring, retries, Key Vault, and how a failed ADF run is actually diagnosed.',
  },
  {
    title: 'Students & career switchers',
    body: 'No fake 12-tool soup. One stack, in order, with labs and assignments so you can talk about a real architecture in interviews.',
  },
]

const steps = [
  { n: '01', t: 'Talk to a mentor', d: 'WhatsApp Chetan or Rahul. Tell them your background — we map a starting module, not a generic pitch.' },
  { n: '02', t: 'Follow the syllabus', d: 'Azure → Storage → ADF → SQL → modeling → Python → Spark → Databricks → Delta → project.' },
  { n: '03', t: 'Build, then break-fix', d: 'Labs and assignments first. Interview questions after you have scars, not before.' },
]

const joinUsPerks = [
  'Naukri profile update and data-engineering resume creation',
  'Interview preparation with quizzes, banks, and mentor feedback',
  'Career guidance mapped to Azure DE roles',
  'After-class support for doubts and assignments',
  'Talk with industry experts from real delivery backgrounds',
  'Small batches of 8 people for live attention',
]

export default function Learn() {
  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Learn with us
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold">
        Built for people who already work with data — and for people who want to.
      </h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        Every session combines explanation, a live walkthrough, guided practice, and time to solve doubts.
        You learn the concept and apply it before the class ends.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {learningExperience.map(({ icon: Icon, title, body }) => (
          <article key={title} className="card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-azure-500/10 text-azure-600 dark:text-azure-400">
              <Icon size={20} />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
          </article>
        ))}
      </div>

      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Who this course is for
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold">A practical next step for different backgrounds.</h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          The course starts with the fundamentals and is suitable for people already working with data,
          professionals moving from adjacent roles, and students beginning their data engineering journey.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {audiences.map((a) => (
          <article key={a.title} className="card p-5">
            <h2 className="font-display text-lg font-semibold">{a.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{a.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-dashed border-azure-500/40 p-5">
            <p className="font-display text-2xl font-bold text-azure-600">{s.n}</p>
            <p className="mt-2 font-semibold">{s.t}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 card p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Join Us
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold">More than classes — career support included.</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600 dark:text-slate-300">
          {joinUsPerks.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-emerald-500">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="btn-primary mt-6">
          Join Us
        </Link>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-2xl font-semibold">What you will actually do</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Stand up Azure resources the way a project team would.</li>
            <li>Ingest with ADF, including incremental and metadata-driven patterns.</li>
            <li>Transform in Databricks with Delta and a Bronze / Silver / Gold layout.</li>
            <li>Model facts and dimensions, including SCD Type 2.</li>
            <li>Ship with Git, environments, and interview-ready stories.</li>
          </ul>
          <Link to="/syllabus" className="btn-primary mt-6">
            Open full syllabus
          </Link>
        </div>
        <JoinForm />
      </div>
    </div>
  )
}
