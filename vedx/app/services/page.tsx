import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data/site'

export const metadata = {
  title: 'AI & Digital Services',
  description: 'Ved-X AI chatbots, digital ads, landing pages, automation, SaaS, and mobile apps for small businesses.',
}

export default function ServicesPage() {
  const featured = services.find((item) => item.slug === 'ai-chatbot')
  const rest = services.filter((item) => item.slug !== 'ai-chatbot')

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">Services</span>
          <h1>What you can buy from VedX.</h1>
          <p className="section-copy">Our core offer is AI chatbots for small businesses. Around that, we add ads, landing pages, and automation so those chats turn into revenue.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          {featured && (
            <Link className="featured-service card" href={`/services/${featured.slug}/`}>
              <span className="pill">Core offer</span>
              <h2 className="section-title">{featured.title}</h2>
              <p className="section-copy">{featured.short}</p>
              <span className="text-link">View chatbot service <ArrowRight size={14} /></span>
            </Link>
          )}
          <div className="cards-3">
            {rest.map(({ slug, title, short, icon: Icon }) => (
              <Link className="service-card card" href={`/services/${slug}/`} key={slug}>
                <span className="icon-box"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{short}</p>
                <span className="text-link">View service <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
