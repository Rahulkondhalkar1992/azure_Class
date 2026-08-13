import { FaWhatsapp } from 'react-icons/fa'
import { FiAward, FiHeadphones, FiLinkedin, FiUsers } from 'react-icons/fi'
import JoinForm from '../components/JoinForm.jsx'
import { mentors, whatsappHref } from '../data/contacts.js'

const intro = 'Hi, I want to join AZ Learning — Azure Data Engineering Master Program.'

const joinBenefits = [
  {
    icon: FiLinkedin,
    title: 'Naukri profile + resume',
    body: 'Get Naukri profile updates, DE-focused resume creation, and guidance on how to present ADF / Databricks projects.',
  },
  {
    icon: FiAward,
    title: 'Interview preparation',
    body: 'Timed quizzes, interview banks, and mentor feedback so you can handle SQL, ADF design, Spark, and architecture rounds.',
  },
  {
    icon: FiHeadphones,
    title: 'After-class support',
    body: 'Doubts, assignments, and follow-ups do not stop when the live session ends — mentors stay available for support.',
  },
  {
    icon: FiUsers,
    title: 'Talk with industry experts',
    body: 'Learn directly from practitioners (Hexaware / Capgemini backgrounds) and get career guidance for real Azure DE roles.',
  },
]

export default function Contact() {
  return (
    <div className="container-page py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-azure-600 dark:text-azure-400">
        Join Us
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold">Join a focused 8-person batch.</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        Small cohorts, live mentoring, and career support — Naukri profile updates, resume creation,
        interview preparation, after-class help, and conversations with industry experts.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {joinBenefits.map(({ icon: Icon, title, body }) => (
          <article key={title} className="card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-azure-500/10 text-azure-600 dark:text-azure-400">
              <Icon size={18} />
            </span>
            <h2 className="mt-3 font-display text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>
          </article>
        ))}
      </div>

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
