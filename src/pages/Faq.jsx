import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqs } from '../data/faqs.js'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <div className="container-page py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Tools · FAQ
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Answers before you WhatsApp us.</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Batches stay small (8 people), support continues after class, and Join Us includes career help —
        Naukri profile, resume, interviews, and mentor guidance.
      </p>

      <div className="mt-8 space-y-3">
        {faqs.map((item, i) => (
          <article key={item.q} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium">
                <span className="mr-2 text-azure-600 dark:text-azure-400">{i + 1}.</span>
                {item.q}
              </span>
              <span className="text-slate-400">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <p className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:border-white/10 dark:text-slate-300">
                {item.a}
              </p>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8">
        <Link to="/contact" className="btn-primary">
          Join Us / WhatsApp mentors
        </Link>
      </div>
    </div>
  )
}
