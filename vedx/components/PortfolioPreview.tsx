'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Check,
  Dumbbell,
  Flower2,
  GraduationCap,
  HeartPulse,
  Star,
  Stethoscope,
} from 'lucide-react'
import { useState } from 'react'

type PortfolioItem = {
  slug: string
  title: string
  category: string
  pages: readonly string[]
  tone: string
  tagline: string
  copy: string
  cta: string
  services: readonly string[]
  metric: string
}

function Chrome({ item, children }: { item: PortfolioItem; children: React.ReactNode }) {
  return (
    <div className={`tpl tpl-${item.slug}`}>
      <div className="tpl-chrome">
        <i /><i /><i />
        <span>{item.slug}.demo.vedx-ai.com</span>
      </div>
      {children}
    </div>
  )
}

function Healthcare({ item, full }: { item: PortfolioItem; full: boolean }) {
  const slots = ['Today 4:30 PM', 'Tomorrow 11:00 AM', 'Wed 2:15 PM']
  const [slot, setSlot] = useState(0)
  const [booked, setBooked] = useState(false)
  return (
    <Chrome item={item}>
      <header className="tpl-nav">
        <strong><HeartPulse size={16} /> MediCore</strong>
        <nav>{item.pages.map((p) => <span key={p}>{p}</span>)}</nav>
      </header>
      <section className="tpl-hero hc-hero">
        <div>
          <small>Multispeciality clinic · Mumbai</small>
          <h3>{item.tagline}</h3>
          <p>{item.copy}</p>
          <div className="hc-doctors">
            {['Dr. Shah · Cardiology', 'Dr. Iyer · Pediatrics', 'Dr. Khan · Diagnostics'].map((d) => (
              <button key={d} type="button">{d}</button>
            ))}
          </div>
        </div>
        <aside className="hc-book">
          <p>Next available</p>
          {slots.map((s, i) => (
            <button key={s} type="button" className={slot === i ? 'on' : ''} onClick={() => { setSlot(i); setBooked(false) }}>{s}</button>
          ))}
          <button type="button" className="tpl-cta" onClick={() => setBooked(true)}>
            {booked ? 'Appointment reserved' : item.cta}
          </button>
          <small>{item.metric}</small>
        </aside>
      </section>
      {full && (
        <section className="hc-grid">
          {item.services.map((s, i) => (
            <article key={s}><Stethoscope size={18} /><strong>{s}</strong><p>Consult, diagnostics, and follow-up in one care path.</p><em>0{i + 1}</em></article>
          ))}
        </section>
      )}
    </Chrome>
  )
}

function SkinCare({ item, full }: { item: PortfolioItem; full: boolean }) {
  const products = [
    { name: 'Calm Serum', note: 'Barrier repair' },
    { name: 'Glow Essence', note: 'Vitamin C' },
    { name: 'Night Restore', note: 'Retinol 0.3%' },
  ]
  const [active, setActive] = useState(0)
  const [shade, setShade] = useState(1)
  return (
    <Chrome item={item}>
      <header className="tpl-nav elan-nav">
        <strong><Flower2 size={16} /> Élan</strong>
        <nav>{item.pages.map((p) => <span key={p}>{p}</span>)}</nav>
      </header>
      <section className="elan-hero">
        <div>
          <small>Clinical skin studio</small>
          <h3>{item.tagline}</h3>
          <p>{item.copy}</p>
          <div className="elan-shades">
            {['#f3d3c4', '#e8b89a', '#c98a68', '#8d5a3c'].map((c, i) => (
              <button key={c} type="button" className={shade === i ? 'on' : ''} style={{ background: c }} onClick={() => setShade(i)} aria-label={`Shade ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="elan-card">
          <motion.div className="elan-visual" animate={{ rotate: shade * 4, scale: 1 + shade * 0.02 }} />
          <strong>{products[active].name}</strong>
          <span>{products[active].note}</span>
        </div>
      </section>
      <div className="elan-products">
        {products.map((p, i) => (
          <button key={p.name} type="button" className={active === i ? 'on' : ''} onClick={() => setActive(i)}>
            {p.name}<small>{p.note}</small>
          </button>
        ))}
      </div>
      {full && <p className="elan-metric">{item.metric} · Dermatologist-guided rituals</p>}
    </Chrome>
  )
}

function Dental({ item, full }: { item: PortfolioItem; full: boolean }) {
  const treatments = [
    { name: 'Smile Design', price: '₹18,000', note: 'Digital preview in 45 minutes' },
    { name: 'Dental Implants', price: '₹32,000', note: 'Same-week consultation' },
    { name: 'Family Dentistry', price: '₹2,400', note: 'Kids + adults, one visit' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <Chrome item={item}>
      <div className="dental-split">
        <section>
          <strong>BrightSmile</strong>
          <h3>{item.tagline}</h3>
          <p>{item.copy}</p>
          <button type="button" className="tpl-cta">{item.cta}</button>
        </section>
        <section>
          {treatments.map((t, i) => (
            <article key={t.name} className={open === i ? 'on' : ''} onClick={() => setOpen(i)}>
              <header><span>{t.name}</span><b>{t.price}</b></header>
              {open === i && <p>{t.note}</p>}
            </article>
          ))}
        </section>
      </div>
      {full && (
        <div className="dental-proof">
          <Star size={16} fill="currentColor" /> {item.metric}
          <span>Transparent plans. Gentle chairs. Zero surprise bills.</span>
        </div>
      )}
    </Chrome>
  )
}

function Coaching({ item, full }: { item: PortfolioItem; full: boolean }) {
  const courses = [
    { name: 'JEE Accelerator', seats: 12, progress: 78 },
    { name: 'NEET Focus', seats: 8, progress: 64 },
    { name: 'Foundation IX–X', seats: 16, progress: 91 },
  ]
  const [course, setCourse] = useState(0)
  return (
    <Chrome item={item}>
      <header className="tpl-nav apex-nav">
        <strong><GraduationCap size={16} /> Apex</strong>
        <span className="apex-live">Live batch filling</span>
      </header>
      <section className="apex-hero">
        <div>
          <h3>{item.tagline}</h3>
          <p>{item.copy}</p>
        </div>
        <aside>
          <small>Selected program</small>
          <strong>{courses[course].name}</strong>
          <div className="apex-bar"><i style={{ width: `${courses[course].progress}%` }} /></div>
          <p>{courses[course].seats} seats left · {courses[course].progress}% completion rate</p>
          <button type="button" className="tpl-cta">{item.cta}</button>
        </aside>
      </section>
      <div className="apex-tabs">
        {courses.map((c, i) => (
          <button key={c.name} type="button" className={course === i ? 'on' : ''} onClick={() => setCourse(i)}>{c.name}</button>
        ))}
      </div>
      {full && (
        <div className="apex-feats">
          {item.services.map((s) => <span key={s}><Check size={12} /> {s}</span>)}
        </div>
      )}
    </Chrome>
  )
}

function Gym({ item, full }: { item: PortfolioItem; full: boolean }) {
  const programs = [
    { name: 'Strength Engine', intensity: 86 },
    { name: 'Hypertrophy Lab', intensity: 72 },
    { name: 'Athletic Conditioning', intensity: 94 },
  ]
  const [program, setProgram] = useState(0)
  const [day, setDay] = useState('Mon')
  const classes: Record<string, string[]> = {
    Mon: ['5:30 AM Power', '7:00 PM Strength'],
    Wed: ['6:00 AM HIIT', '8:00 PM Hypertrophy'],
    Sat: ['8:00 AM Athletic', '11:00 AM Mobility'],
  }
  return (
    <Chrome item={item}>
      <header className="tpl-nav gym-nav">
        <strong><Dumbbell size={16} /> IronForge</strong>
        <nav>{item.pages.map((p) => <span key={p}>{p}</span>)}</nav>
      </header>
      <section className="gym-hero">
        <div>
          <small>{item.metric}</small>
          <h3>{item.tagline}</h3>
          <p>{item.copy}</p>
        </div>
        <div className="gym-meter">
          <Activity size={18} />
          <strong>{programs[program].name}</strong>
          <div className="gym-intensity"><i style={{ width: `${programs[program].intensity}%` }} /></div>
          <em>{programs[program].intensity} intensity</em>
        </div>
      </section>
      <div className="gym-programs">
        {programs.map((p, i) => (
          <button key={p.name} type="button" className={program === i ? 'on' : ''} onClick={() => setProgram(i)}>{p.name}</button>
        ))}
      </div>
      {full && (
        <div className="gym-schedule">
          <div>{['Mon', 'Wed', 'Sat'].map((d) => <button key={d} type="button" className={day === d ? 'on' : ''} onClick={() => setDay(d)}>{d}</button>)}</div>
          <ul>{classes[day].map((c) => <li key={c}>{c}</li>)}</ul>
          <button type="button" className="tpl-cta">{item.cta} <ArrowRight size={14} /></button>
        </div>
      )}
    </Chrome>
  )
}

const templates = {
  healthcare: Healthcare,
  'skin-care': SkinCare,
  dental: Dental,
  coaching: Coaching,
  gym: Gym,
}

export default function PortfolioPreview({ item, full = false }: { item: PortfolioItem; full?: boolean }) {
  const Template = templates[item.slug as keyof typeof templates]
  if (!Template) return null
  return (
    <div className={full ? 'tpl-wrap-full' : 'tpl-wrap'}>
      <Template item={item} full={full} />
    </div>
  )
}

export type { PortfolioItem }
