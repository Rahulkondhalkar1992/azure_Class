import { Link } from 'react-router-dom'
import {
  SiDatabricks,
  SiPython,
  SiGit,
  SiApachespark,
  SiMysql,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import PipelineAnimation from '../components/PipelineAnimation.jsx'
import { syllabus } from '../data/syllabus.js'

const stack = [
  { icon: VscAzure, label: 'Azure', color: '#0078D4' },
  { icon: SiDatabricks, label: 'Databricks', color: '#FF3621' },
  { icon: SiMysql, label: 'SQL', color: '#4479A1' },
  { icon: SiApachespark, label: 'Spark', color: '#E25A1C' },
  { icon: SiPython, label: 'Python', color: '#3776AB' },
  { icon: SiGit, label: 'Git', color: '#F05032' },
]

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden grid-bg">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-azure-500/10 via-transparent to-transparent" />
        <div className="container-page relative py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-azure-600 dark:text-azure-400">
            Azure Data Engineering Master Program
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            Learn. Build.
            <br />
            Debug. Optimize.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Practice Azure, Databricks, SQL, Spark, and Python the way production teams do — pipelines,
            lakehouse layers, and the messy middle in between.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Join the program
            </Link>
            <Link to="/syllabus" className="btn-ghost">
              View syllabus →
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {['Mentor-led', 'Industry syllabus', 'Interview ready', 'WhatsApp support'].map((t) => (
              <span key={t} className="rounded-full border border-slate-200 px-3 py-1 dark:border-white/10">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            {stack.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium">
                <Icon size={22} color={color} />
                {label}
              </div>
            ))}
            <span className="text-sm text-slate-400">and more</span>
          </div>

          <div className="mt-12">
            <PipelineAnimation />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
          Skills, careers, certifications
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold">Fifteen modules. One lakehouse path.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {syllabus.slice(0, 6).map((m) => (
            <Link key={m.id} to="/syllabus" className="card p-5 transition hover:-translate-y-0.5">
              <p className="text-2xl">{m.emoji}</p>
              <p className="mt-3 font-display font-semibold">{m.title.replace('MODULE 0', 'M').replace('MODULE ', 'M')}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{m.summary}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/learn" className="btn-ghost">
            Who this is for
          </Link>
        </div>
      </section>
    </div>
  )
}
