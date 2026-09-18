import { useEffect, useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Glossary from './Glossary.jsx'
import Interview from './Interview.jsx'
import Quiz from './Quiz.jsx'
import Assignments from './Assignments.jsx'
import { adfAssignments } from '../data/adfAssignments.js'
import { scenarioQuestions } from '../data/scenarioInterviews.js'

const HUB_TABS = [
  { id: 'glossary', label: 'Glossary', hint: 'Terms & definitions', auth: false },
  { id: 'questions', label: 'Interview Questions', hint: 'Theory + scenarios', auth: false },
  { id: 'quiz', label: 'Self-Assessment', hint: 'Timed practice quiz', auth: true },
  { id: 'adf', label: 'ADF Assignment', hint: 'Pipeline build tasks', auth: true },
  { id: 'databricks', label: 'Databricks Assignment', hint: 'Delta & Spark tasks', auth: true },
  { id: 'sql', label: 'SQL Assignment', hint: 'Business SQL scenarios', auth: true },
  { id: 'other', label: 'Other Practice', hint: 'Labs & more', auth: false },
]

function AuthGate({ title }) {
  return (
    <div className="card mx-auto mt-8 max-w-lg p-8 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-azure-600 dark:text-azure-400">Sign in required</p>
      <h2 className="mt-2 font-display text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Sign in to track practice and access assignments / self-assessment inside Interview Hub.
      </p>
      <Link to="/login" className="btn-primary mt-6 inline-flex">
        Sign in
      </Link>
    </div>
  )
}

function InactiveGate() {
  return (
    <div className="card mx-auto mt-8 max-w-lg p-8 text-center">
      <h2 className="font-display text-2xl font-semibold">Account inactive</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Your profile is signed in but not active yet. Contact your mentor to unlock practice tabs.
      </p>
      <Link to="/inactive" className="btn-ghost mt-6 inline-flex">
        Account status
      </Link>
    </div>
  )
}

function ComingAssignmentPack({ tech, description, topics, relatedCategory }) {
  const related = useMemo(
    () => scenarioQuestions.filter((q) => q.category === relatedCategory).slice(0, 5),
    [relatedCategory],
  )

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 bg-gradient-to-r from-azure-500/10 to-transparent px-6 py-5 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300">
              Building out
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
              Medium → Hard
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold">{tech} Assignment</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topics.map((t) => (
              <span key={t} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs dark:border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Status</p>
            <p className="mt-1 font-semibold">Coming soon</p>
            <p className="mt-1 text-xs text-slate-500">Full task packs like ADF assignments</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Practice now</p>
            <p className="mt-1 font-semibold">Scenario questions</p>
            <p className="mt-1 text-xs text-slate-500">Use Interview Questions tab meanwhile</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4 dark:border-white/10">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Learn first</p>
            <Link to="/concepts" className="mt-1 inline-block font-semibold text-azure-600 dark:text-azure-400">
              Open Concepts →
            </Link>
            <p className="mt-1 text-xs text-slate-500">Visual walkthroughs for core ideas</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="font-display text-lg font-semibold">Related interview scenarios</h3>
          <p className="mt-1 text-sm text-slate-500">Practice these while the full assignment pack ships.</p>
          <div className="mt-3 space-y-2">
            {related.map((q) => (
              <div key={q.id} className="card px-4 py-3 text-sm">
                <span className="text-[11px] font-bold uppercase text-azure-600 dark:text-azure-400">{q.difficulty}</span>
                <p className="mt-1 font-medium text-slate-800 dark:text-slate-100">{q.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function OtherPractice() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Link to="/labs" className="card group p-5 transition hover:border-azure-400">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Labs</p>
        <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-azure-600">SQL & Python Labs</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Hands-on query and code practice (workspace expanding).</p>
        <p className="mt-4 text-sm font-semibold text-azure-600 dark:text-azure-400">Open labs →</p>
      </Link>
      <Link to="/concepts" className="card group p-5 transition hover:border-azure-400">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Concepts</p>
        <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-azure-600">Animated concept lessons</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Explanation + example + visual + similar interview questions.</p>
        <p className="mt-4 text-sm font-semibold text-azure-600 dark:text-azure-400">Open concepts →</p>
      </Link>
      <Link to="/project" className="card group p-5 transition hover:border-azure-400">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Project</p>
        <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-azure-600">Industry project</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">End-to-end lakehouse walkthrough for interview stories.</p>
        <p className="mt-4 text-sm font-semibold text-azure-600 dark:text-azure-400">Open project →</p>
      </Link>
      <div className="card p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">ADF pack</p>
        <h3 className="mt-2 font-display text-xl font-semibold">{adfAssignments.length} live assignments</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Full ADF scenario tasks are in the ADF Assignment tab.</p>
      </div>
    </div>
  )
}

export default function InterviewHub() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, isActive } = useAuth()
  const tab = HUB_TABS.some((t) => t.id === params.get('tab')) ? params.get('tab') : 'questions'
  const active = HUB_TABS.find((t) => t.id === tab) || HUB_TABS[1]

  useEffect(() => {
    if (!params.get('tab')) {
      setParams({ tab: 'questions' }, { replace: true })
    }
  }, [params, setParams])

  const setTab = (id) => {
    setParams({ tab: id })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const needsAuth = active.auth && !user
  const needsActive = active.auth && user && !isActive

  return (
    <div className="min-h-[70vh]">
      <div className="border-b border-slate-200/80 bg-gradient-to-b from-azure-500/[0.07] to-transparent dark:border-white/10 dark:from-azure-500/10">
        <div className="container-page pt-10 pb-4 sm:pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
            Interview Hub
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold sm:text-4xl">
            One workspace for glossary, questions, quizzes, and assignments.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            Choose what you want to practice. Content is connected — learn a term, answer scenarios, then stress-test with quizzes and build tasks.
          </p>
        </div>

        {/* Horizontal scroll tabs */}
        <div className="container-page pb-0">
          <div
            role="tablist"
            aria-label="Interview Hub sections"
            className="-mx-1 flex gap-1 overflow-x-auto pb-px scrollbar-thin"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {HUB_TABS.map((t) => {
              const isActive = t.id === tab
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(t.id)}
                  className={`relative flex min-w-max flex-col rounded-t-xl px-4 py-3 text-left transition ${
                    isActive
                      ? 'bg-white text-ink-900 shadow-sm dark:bg-ink-900 dark:text-white'
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-800 dark:hover:bg-white/5 dark:hover:text-slate-200'
                  }`}
                >
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className={`text-[11px] ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>{t.hint}</span>
                  {isActive && (
                    <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-azure-500" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container-page py-8 sm:py-10">
        <div
          key={tab}
          className="animate-[fadeSlideIn_0.28s_ease]"
          role="tabpanel"
        >
          {needsAuth ? (
            <AuthGate title={active.label} />
          ) : needsActive ? (
            <InactiveGate />
          ) : (
            <>
              {tab === 'glossary' && <Glossary embedded />}
              {tab === 'questions' && <Interview embedded />}
              {tab === 'quiz' && <Quiz embedded />}
              {tab === 'adf' && <Assignments embedded />}
              {tab === 'databricks' && (
                <ComingAssignmentPack
                  tech="Databricks"
                  description="Build incremental Delta pipelines, OPTIMIZE/VACUUM routines, Unity Catalog grants, and job-cluster production patterns."
                  topics={['Delta MERGE', 'Time Travel', 'OPTIMIZE', 'Unity Catalog', 'Job clusters']}
                  relatedCategory="databricks"
                />
              )}
              {tab === 'sql' && (
                <ComingAssignmentPack
                  tech="SQL"
                  description="Solve advanced business SQL: window functions, YoY compares, table diffs, and join-performance troubleshooting."
                  topics={['Window functions', 'Performance', 'CTEs', 'Top-N', 'Reconciliation']}
                  relatedCategory="sql"
                />
              )}
              {tab === 'other' && <OtherPractice />}
            </>
          )}
        </div>

        {/* Cross-links footer strip */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Connected learning</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Glossary → Interview Questions → Self-Assessment → Assignments. Stuck on a concept? Open{' '}
            <button type="button" className="font-semibold text-azure-600 dark:text-azure-400" onClick={() => navigate('/concepts')}>
              Concepts
            </button>{' '}
            for a visual walkthrough.
          </p>
        </div>
      </div>
    </div>
  )
}
