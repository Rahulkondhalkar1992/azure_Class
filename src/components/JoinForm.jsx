import { useState } from 'react'
import { mentors, whatsappHref } from '../data/contacts.js'

const defaultText = 'Hi, I want to join the Azure Data Engineering Master Program.'

export default function JoinForm() {
  const [form, setForm] = useState({ name: '', email: '', background: 'Data Analyst', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const message = `Hi, I am ${form.name || 'a learner'} (${form.email || 'no email'}). Background: ${form.background}. ${form.message || defaultText}`

  return (
    <div className="card p-6">
      <h3 className="font-display text-xl font-semibold">Join the program</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        No backend yet — submit opens WhatsApp with your details filled in.
      </p>
      <form
        className="mt-5 grid gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
          window.open(whatsappHref(mentors[0].wa, message), '_blank', 'noopener')
        }}
      >
        <input
          name="name"
          required
          placeholder="Your name"
          value={form.name}
          onChange={onChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5"
        />
        <select
          name="background"
          value={form.background}
          onChange={onChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-ink-900"
        >
          <option>Market Research</option>
          <option>Data Analyst</option>
          <option>Data Domain</option>
          <option>Test Engineer</option>
          <option>Support Engineer</option>
          <option>Fresher / Student</option>
          <option>Other</option>
        </select>
        <textarea
          name="message"
          rows={3}
          placeholder="What do you want to learn?"
          value={form.message}
          onChange={onChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-azure-500 dark:border-white/10 dark:bg-white/5"
        />
        <button type="submit" className="btn-primary">
          Send on WhatsApp
        </button>
        {sent && <p className="text-sm text-emerald-600">Opening WhatsApp…</p>}
      </form>
    </div>
  )
}
