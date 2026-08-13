import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn with us' },
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/project', label: 'Project' },
  { to: '/interview', label: 'Interview' },
  { to: '/ai', label: 'AI + Databricks' },
  { to: '/contact', label: 'Contact' },
]

const toolLinks = [
  { to: '/labs', label: 'SQL & Python Labs', hint: 'Practice queries and code' },
  { to: '/whiteboard', label: 'Whiteboard', hint: 'Draw lakehouse architecture' },
  { to: '/resume', label: 'Resume Builder', hint: 'DE resume with PDF download' },
]

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
    isActive
      ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
      : 'text-slate-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'
  }`

function ToolsMenu({ open, setOpen, compact = false }) {
  const { pathname } = useLocation()
  const menuRef = useRef(null)
  const toolActive = toolLinks.some((t) => pathname === t.to)

  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, setOpen])

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${
          toolActive || open
            ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
            : 'text-slate-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'
        }`}
      >
        Tools
        <span className={`text-[10px] transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-50 mt-2 min-w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-ink-900 ${
            compact ? 'left-0' : 'right-0 xl:left-0 xl:right-auto'
          }`}
        >
          {toolLinks.map((tool) => (
            <NavLink
              key={tool.to}
              to={tool.to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2.5 transition ${
                  isActive
                    ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5'
                }`
              }
            >
              <span className="block text-sm font-semibold">{tool.label}</span>
              <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{tool.hint}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [desktopToolsOpen, setDesktopToolsOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/80">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-azure-500 font-display text-sm font-bold text-white">
            Azure
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Learning</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <ToolsMenu open={desktopToolsOpen} setOpen={setDesktopToolsOpen} />
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

      <div className="border-t border-slate-200/70 lg:hidden dark:border-white/10">
        <div className="container-page overflow-x-auto">
          <nav className="flex min-w-max items-center gap-1 py-2" aria-label="Program sections">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <ToolsMenu open={mobileToolsOpen} setOpen={setMobileToolsOpen} compact />
          </nav>
        </div>
      </div>
    </header>
  )
}
