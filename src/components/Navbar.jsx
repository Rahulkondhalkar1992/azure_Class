import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn with us' },
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/interview', label: 'Interview' },
  { to: '/ai', label: 'AI + Databricks' },
]

const joinLinks = [
  { to: '/contact', label: 'Join Us', hint: 'Batch info, mentor connect, and enrollment support' },
  { to: '/faq', label: 'FAQ', hint: 'Common questions about training and support' },
]

const toolLinks = [
  { to: '/concepts', label: 'Concepts', hint: 'Animated DE concept visualizations' },
  { to: '/quiz', label: 'Self-assessment Quiz', hint: 'Timed module quizzes by experience' },
  { to: '/labs', label: 'SQL & Python Labs', hint: 'Practice queries and code' },
  { to: '/whiteboard', label: 'Whiteboard', hint: 'Draw lakehouse architecture' },
  { to: '/resume', label: 'Resume Builder', hint: 'DE resume with PDF download' },
  { to: '/project', label: 'Industry Project', hint: 'Real-world lakehouse project walkthrough' },
]

const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
    isActive
      ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
      : 'text-slate-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'
  }`

function useMenuDismiss(open, setOpen) {
  const menuRef = useRef(null)

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

  return menuRef
}

function ToolsMenu({ open, setOpen, isAdmin = false, compact = false }) {
  const { pathname } = useLocation()
  const menuRef = useMenuDismiss(open, setOpen)
  const toolActive =
    toolLinks.some((t) => pathname === t.to) || (isAdmin && pathname.startsWith('/admin'))

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
          {isAdmin && (
            <>
              <div className="my-1 border-t border-slate-100 dark:border-white/10" />
              <NavLink
                to="/admin/users"
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
                <span className="block text-sm font-semibold">Admin · Users</span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                  Add, edit, or deactivate learners
                </span>
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function JoinUsMenu({ open, setOpen, compact = false }) {
  const { pathname } = useLocation()
  const menuRef = useMenuDismiss(open, setOpen)
  const joinActive = joinLinks.some((j) => pathname === j.to)

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition ${
          joinActive || open
            ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
            : 'text-slate-600 hover:text-ink-900 dark:text-slate-300 dark:hover:text-white'
        }`}
      >
        Join Us
        <span className={`text-[10px] transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute z-50 mt-2 min-w-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-ink-900 ${
            compact ? 'left-0' : 'right-0 xl:left-0 xl:right-auto'
          }`}
        >
          {joinLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
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
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{item.hint}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

function ProfileMenu({ profile, signOut }) {
  const [open, setOpen] = useState(false)
  const menuRef = useMenuDismiss(open, setOpen)
  const displayName = profile?.full_name?.trim() || profile?.email || 'Account'

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className={`grid h-9 w-9 place-items-center rounded-full border transition ${
          open
            ? 'border-azure-500/40 bg-azure-500/10 text-azure-700 dark:text-azure-400'
            : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5'
        }`}
      >
        <FiUser size={16} strokeWidth={2.25} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-ink-900"
        >
          <div className="border-b border-slate-100 px-3 py-2.5 dark:border-white/10">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{displayName}</p>
            {profile?.email && (
              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{profile.email}</p>
            )}
            {profile?.role && (
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-azure-600 dark:text-azure-400">
                {profile.role}
              </p>
            )}
          </div>

          <NavLink
            to="/account"
            role="menuitem"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-azure-500/10 text-azure-700 dark:text-azure-400'
                  : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5'
              }`
            }
          >
            <FiUser size={15} />
            Account & password
          </NavLink>

          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              setOpen(false)
              await signOut()
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10"
          >
            <FiLogOut size={15} />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { user, profile, isAdmin, signOut } = useAuth()
  const [desktopToolsOpen, setDesktopToolsOpen] = useState(false)
  const [desktopJoinOpen, setDesktopJoinOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const [mobileJoinOpen, setMobileJoinOpen] = useState(false)

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
          <ToolsMenu open={desktopToolsOpen} setOpen={setDesktopToolsOpen} isAdmin={isAdmin} />
          <JoinUsMenu open={desktopJoinOpen} setOpen={setDesktopJoinOpen} />
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
          {user ? (
            <ProfileMenu profile={profile} signOut={signOut} />
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-azure-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-azure-600"
            >
              Sign in
            </Link>
          )}
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
            <ToolsMenu open={mobileToolsOpen} setOpen={setMobileToolsOpen} isAdmin={isAdmin} compact />
            <JoinUsMenu open={mobileJoinOpen} setOpen={setMobileJoinOpen} compact />
          </nav>
        </div>
      </div>
    </header>
  )
}
