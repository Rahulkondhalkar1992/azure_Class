import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { growthPlays, products } from '@/data/site'

export const metadata = {
  title: 'How VedX Helps Businesses Grow',
  description: 'AI chatbots, appointment booking, and lead conversion systems that help small businesses grow without extra staff.',
}

export default function Solutions() {
  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Solutions</span>
          <h1>How we help small businesses grow.</h1>
          <p className="section-copy">VedX is built around one job: put an AI chatbot in front of your customers so you never miss an enquiry, book more appointments, and close more sales—without hiring a bigger team.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <span className="eyebrow">Growth outcomes</span>
          <h2 className="section-title">The chatbot does the talking. You do the business.</h2>
          <div className="cards-3">
            {growthPlays.map(({ title, copy, result, icon: Icon }) => (
              <article className="growth-card card" key={title}>
                <span className="icon-box"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <strong className="growth-result">{result}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="shell">
          <span className="eyebrow">A typical 30-day path</span>
          <h2 className="section-title">From first WhatsApp to a working sales bot.</h2>
          <div className="process">
            {[
              'We map how customers currently enquire and where leads drop.',
              'We train a chatbot on your services, prices, hours, and FAQs.',
              'We put it on WhatsApp and your website, then watch real chats.',
              'We tighten replies, add booking, and connect ads if you want more traffic.',
            ].map((step) => <article key={step}><h3>{step}</h3></article>)}
          </div>
          <Link className="btn btn-primary" style={{ marginTop: 36 }} href="/contact/">Book a free chatbot consult <ArrowRight size={16} /></Link>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <span className="eyebrow">If you also need software</span>
          <h2 className="section-title">Ready products for clinics, institutes, and societies.</h2>
          <div className="cards-3">
            {products.map((p) => (
              <Link className="product-card card" href={`/products/${p.slug}/`} key={p.slug}>
                <p.icon size={24} color="#1769e0" />
                <h3>{p.title}</h3>
                <p>{p.audience}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
