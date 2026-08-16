import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  SiApachespark,
  SiDatabricks,
  SiGit,
  SiMysql,
  SiPython,
} from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import {
  FiBookOpen,
  FiCheckCircle,
  FiClipboard,
  FiCode,
  FiEdit3,
  FiHelpCircle,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'

const stack = [
  { icon: VscAzure, label: 'Azure', color: '#5CC2FF' },
  { icon: SiDatabricks, label: 'Databricks', color: '#FF6B57' },
  { icon: SiMysql, label: 'SQL', color: '#7EB6D9' },
  { icon: SiApachespark, label: 'Spark', color: '#F08A4B' },
  { icon: SiPython, label: 'Python', color: '#6FA8DC' },
  { icon: SiGit, label: 'Git', color: '#F08060' },
]

const tools = [
  { icon: FiClipboard, label: 'Quiz' },
  { icon: FiCode, label: 'Labs' },
  { icon: FiEdit3, label: 'Whiteboard' },
  { icon: FiBookOpen, label: 'Syllabus' },
  { icon: FiHelpCircle, label: 'FAQ' },
  { icon: FiCheckCircle, label: 'Interview' },
]

export default function Login() {
  const { configured, loading, user, isActive, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!loading && user && isActive) {
    const dest = location.state?.from && location.state.from !== '/login' ? location.state.from : '/'
    return <Navigate to={dest} replace />
  }

  if (!loading && user && !isActive) {
    return <Navigate to="/inactive" replace />
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await signIn(email, password)
      const dest = location.state?.from && location.state.from !== '/login' ? location.state.from : '/'
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message || 'Sign-in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel */}
      <aside className="relative hidden overflow-hidden bg-[#061525] text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-azure-500/25 blur-3xl" />
          <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(92,194,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(92,194,255,.35) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-azure-200">
            <VscAzure size={14} />
            Master Class
          </div>
          <h1 className="mt-6 max-w-md font-display text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Azure Data Engineering
            <span className="block text-azure-300">Master Class</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 xl:text-base">
            Learn pipelines, lakehouse layers, Spark, SQL, and Databricks the way production teams ship —
            then practice with labs, quizzes, and interview drills.
          </p>
        </div>

        <div className="relative z-10 mt-10 space-y-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Stack you will master</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {stack.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm transition hover:border-azure-400/40 hover:bg-white/10"
                >
                  <Icon size={20} color={color} />
                  <span className="text-sm font-medium text-slate-100">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Portal tools</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {tools.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] px-3 py-4 text-center"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-azure-500/20 text-azure-200">
                    <Icon size={18} />
                  </span>
                  <span className="text-xs font-semibold text-slate-200">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-azure-400/25 bg-azure-500/10 px-4 py-3 text-sm text-azure-100">
            Mentor-led · Industry syllabus · Interview ready · WhatsApp support
          </div>
        </div>
      </aside>

      {/* Right panel — login */}
      <div className="relative flex items-center justify-center bg-ink-50 px-4 py-10 dark:bg-ink-950 sm:px-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-azure-500 via-cyan-400 to-azure-600 lg:hidden" />
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azure-600 dark:text-azure-400">Master Class</p>
            <h1 className="mt-1 font-display text-2xl font-bold">Azure Data Engineering</h1>
          </div>

          <div className="card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azure-600 dark:text-azure-400">Azure Learning</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Sign in</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Enrolled learners and admins only. Use the email your admin created for you.
            </p>

            {!configured && (
              <div className="mt-5 space-y-2 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
                <p className="font-semibold">Supabase keys missing</p>
                <ol className="list-decimal space-y-1 pl-4 text-xs leading-relaxed">
                  <li>Open your Supabase project → Settings → API</li>
                  <li>Copy Project URL and anon public key</li>
                  <li>
                    Put them in <code className="rounded bg-black/5 px-1 dark:bg-white/10">.env</code> as{' '}
                    <code className="rounded bg-black/5 px-1 dark:bg-white/10">VITE_SUPABASE_URL</code> and{' '}
                    <code className="rounded bg-black/5 px-1 dark:bg-white/10">VITE_SUPABASE_ANON_KEY</code>
                  </li>
                  <li>Restart the local server</li>
                </ol>
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-slate-700 dark:text-slate-200">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-azure-500 focus:ring-2 dark:border-white/15 dark:bg-ink-950"
                  placeholder="you@email.com"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-slate-700 dark:text-slate-200">Password</span>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-azure-500 focus:ring-2 dark:border-white/15 dark:bg-ink-950"
                  placeholder="••••••••"
                />
              </label>

              {error && (
                <p className="rounded-xl border border-rose-300/70 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200">
                  {error}
                </p>
              )}

              <button type="submit" className="btn-primary w-full" disabled={!configured || submitting}>
                {submitting ? 'Signing in…' : 'Sign in to Master Class'}
              </button>
            </form>

            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Admin emails need a password set in Supabase first
              (Authentication → Users → Add user / Reset password).
            </p>
            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              New to the program?{' '}
              <Link to="/contact" className="text-azure-600 hover:underline dark:text-azure-400">
                Join Us
              </Link>
              {' '}(WhatsApp mentors — not a signup form)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
