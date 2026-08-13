import { FaWhatsapp } from 'react-icons/fa'
import JoinForm from '../components/JoinForm.jsx'
import { mentors, whatsappHref } from '../data/contacts.js'

const intro = 'Hi, I want to join AZ Learning — Azure Data Engineering Master Program.'

export default function Contact() {
  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Contact us
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Talk to the people who teach it.</h1>
      <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">
        Two mentors, two numbers, WhatsApp on both. Pick a person or send the join form.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {mentors.map((m) => (
            <article key={m.phone} className="card p-6">
              <h2 className="font-display text-xl font-semibold">{m.name}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {m.role}, {m.company}
              </p>
              <p className="mt-3 font-mono text-lg">{m.phone}</p>
              <a
                href={whatsappHref(m.wa, intro)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-4 !bg-emerald-600 hover:!bg-emerald-700"
              >
                <FaWhatsapp size={18} />
                WhatsApp {m.name.split(' ')[0]}
              </a>
            </article>
          ))}
        </div>
        <JoinForm />
      </div>
    </div>
  )
}
