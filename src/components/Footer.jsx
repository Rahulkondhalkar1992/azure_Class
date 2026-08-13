import { Link } from 'react-router-dom'
import { mentors } from '../data/contacts.js'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-ink-900">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">AZ Learning</p>
          <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            Azure Data Engineering Master Program — learn, build, and break-fix on a real lakehouse stack.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Program</p>
          <div className="mt-3 flex flex-col gap-2 text-slate-500 dark:text-slate-400">
            <Link to="/syllabus">Syllabus</Link>
            <Link to="/interview">Interview questions</Link>
            <Link to="/project">Industry project</Link>
            <p className="pt-1 font-semibold text-slate-700 dark:text-slate-200">Tools</p>
            <Link to="/labs">SQL & Python labs</Link>
            <Link to="/whiteboard">Whiteboard</Link>
            <Link to="/resume">Resume builder</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Mentors</p>
          <div className="mt-3 space-y-2 text-slate-500 dark:text-slate-400">
            {mentors.map((m) => (
              <p key={m.phone}>
                {m.name} · {m.company}
              </p>
            ))}
            <Link to="/contact" className="text-azure-600 dark:text-azure-400">
              Contact / WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
