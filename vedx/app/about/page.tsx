import Link from 'next/link'
import FounderPhoto from '@/components/FounderPhoto'

export const metadata = { title: 'About Rahul & Ved-X AI', description: 'Meet Rahul Kondhalkar, founder of Ved-X AI—building AI chatbots and digital growth systems for small businesses.' }

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">About Ved-X AI</span>
          <h1>Chatbots first. Real growth for small businesses.</h1>
          <p className="section-copy">VedX helps clinics, gyms, coaches, shops, and local service brands capture every enquiry and convert more of them—without adding a large team.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="founder">
            <FounderPhoto />
            <div>
              <span className="pill">Founder · 13+ years</span>
              <h2 className="section-title">Rahul Kondhalkar</h2>
              <p className="section-copy">Rahul’s experience spans AI solutions, data engineering, Azure cloud, SaaS, and automation. His focus at VedX is practical: put an AI chatbot in front of your customers, then layer ads, websites, and workflows only where they help you grow.</p>
              <div className="logo-cloud">{['AI Chatbots', 'Small Business Growth', 'WhatsApp Automation', 'Digital Ads', 'SaaS', 'Cloud'].map((x) => <span key={x}>{x}</span>)}</div>
              <Link href="/contact/" className="btn btn-primary" style={{ marginTop: 28 }}>Talk to Rahul</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="shell">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title">Clarity before complexity.</h2>
          <div className="cards-3">
            {[
              ['Business-first', 'We start with the metric, workflow, and customer journey.'],
              ['Transparent delivery', 'Clear scope, visible progress, and honest trade-offs.'],
              ['Built to operate', 'Security, maintainability, analytics, and handover are part of the product.'],
            ].map(([t, c]) => (
              <article className="card" style={{ padding: 28 }} key={t}>
                <h3 className="display">{t}</h3>
                <p style={{ color: '#aab8c8', lineHeight: 1.7 }}>{c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
