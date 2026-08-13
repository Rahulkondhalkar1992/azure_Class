import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn with us' },
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/project', label: 'Project' },
  { to: '/interview', label: 'Interview' },
  { to: '/labs', label: 'Labs' },
  { to: '/whiteboard', label: 'Whiteboard' },
  { to: '/ai', label: 'AI + Databricks' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-azure-500 font-display text-sm font-bold text-white">
            AZ
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Learning
          </span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
                    : 'text-slate-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/15 dark:text-slate-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link to="/contact" className="btn-primary hidden sm:inline-flex !px-4 !py-2">
            Join
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-200/70 xl:hidden dark:border-white/10">
        <div className="container-page overflow-x-auto">
          <nav className="flex min-w-max items-center gap-1 py-2" aria-label="Program sections">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
                      : 'text-slate-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
