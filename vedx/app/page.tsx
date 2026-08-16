import Link from 'next/link'
import { ArrowRight, FileCode2, Gauge, Phone, Search, ShieldCheck, Smartphone, Sparkles } from 'lucide-react'
import AnimatedStats from '@/components/AnimatedStats'
import ChatDemos from '@/components/ChatDemos'
import ContactForm from '@/components/ContactForm'
import FounderPhoto from '@/components/FounderPhoto'
import HeroVisual from '@/components/HeroVisual'
import MotionReveal from '@/components/MotionReveal'
import PortfolioPreview from '@/components/PortfolioPreview'
import { growthPlays, portfolio, products, services, stats, testimonials, valueProps } from '@/data/site'

export default function Home() {
  return (
    <>
      <section className="hero grid-bg">
        <div className="shell">
          <div className="hero-layout">
            <div>
              <span className="eyebrow hero-kicker"><i className="live-dot"/> AI chatbots for small businesses</span>
              <h1>AI Chatbots That Help Small Businesses <span className="gradient-text">Capture Leads and Grow.</span></h1>
              <p className="hero-copy">VedX builds WhatsApp and website chatbots that answer customers instantly, book appointments, and send you ready-to-close enquiries—so a small team can sell more.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/contact/">Book Free Consultation <ArrowRight size={16} /></Link>
                <Link className="btn btn-secondary" href="#ai-demo">Try AI Chatbot</Link>
                <Link className="btn btn-secondary" href="/solutions/">How we help you grow</Link>
              </div>
            </div>
            <HeroVisual />
          </div>
          <div className="trust-row trust-row-five">
            <div className="trust-item"><strong>13+</strong><span>Years Experience</span></div>
            <div className="trust-item"><strong>100+</strong><span>Projects Delivered</span></div>
            <div className="trust-item"><strong>AI</strong><span>Solutions & Agents</span></div>
            <div className="trust-item"><strong>SaaS</strong><span>Products & Automation</span></div>
            <div className="trust-item"><strong>24/7</strong><span>Business Automation</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <MotionReveal>
            <span className="eyebrow">Services</span>
            <h2 className="section-title">Chatbots first. Then the digital stack around them.</h2>
            <p className="section-copy">Start with an AI chatbot. Add ads, landing pages, or automation only when they help you get more conversations and more sales.</p>
          </MotionReveal>
          <div className="cards-3">
            {services.map(({ slug, title, short, icon: Icon }) => (
              <MotionReveal key={slug}>
                <Link href={`/services/${slug}/`} className="service-card card">
                  <span className="icon-box"><Icon size={22} /></span>
                  <h3>{title}</h3><p>{short}</p>
                  <span className="text-link">Explore service <ArrowRight size={14} style={{ verticalAlign: 'middle' }} /></span>
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f5f8fc' }}>
        <div className="shell">
          <MotionReveal>
            <span className="eyebrow">How we help businesses grow</span>
            <h2 className="section-title">Your customers get answers. You get more bookings.</h2>
            <p className="section-copy">This is the VedX growth model for clinics, gyms, coaches, shops, and local service brands.</p>
          </MotionReveal>
          <div className="cards-3">
            {growthPlays.slice(0, 6).map(({ title, copy, result, icon: Icon }) => (
              <article className="growth-card card" key={title}>
                <span className="icon-box"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <strong className="growth-result">{result}</strong>
              </article>
            ))}
          </div>
          <Link className="btn btn-primary" href="/solutions/" style={{ marginTop: 28 }}>See the full growth path <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section dark-section" id="ai-demo">
        <div className="shell">
          <span className="eyebrow">AI in action</span>
          <h2 className="section-title">Try a working AI chatbot simulation.</h2>
          <p className="section-copy">Choose an education or appointment-booking scenario, then click customer questions to watch the conversation develop.</p>
          <ChatDemos />
        </div>
      </section>

      <section className="section" style={{ background: '#f5f8fc' }}>
        <div className="shell">
          <span className="eyebrow">Product engineering</span>
          <h2 className="section-title">SaaS products built for real operating teams.</h2>
          <div className="cards-3">
            {products.map(({ slug, title, audience, features, icon: Icon }, idx) => (
              <Link key={slug} href={`/products/${slug}/`} className="product-card card">
                <span className="icon-box"><Icon size={22} /></span>
                <h3>{title}</h3><p>{audience}</p>
                <div className="dashboard">
                  <small>Live product preview</small>
                  <div className="dashboard-bars">{[45,72,55,88,64,78].map((height, i) => <span key={i} style={{ height: `${height + idx * 3}%` }} />)}</div>
                </div>
                <div className="logo-cloud">{features.slice(0, 4).map((f) => <span key={f}>{f}</span>)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="eyebrow">Why VedX</span>
          <h2 className="section-title">Built for outcomes, trust, and scale.</h2>
          <div className="cards-3">
            {valueProps.map(([label, Icon]) => (
              <div className="card" key={label} style={{ padding: 22, display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="icon-box" style={{ flex: '0 0 auto' }}><Icon size={20} /></span><strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#07111f', color: 'white' }}>
        <div className="shell">
          <span className="eyebrow">SEO + performance</span>
          <h2 className="section-title">Visibility is engineered—not added at launch.</h2>
          <div className="cards-3">
            {[
              [Search, 'Technical SEO', 'Crawlable architecture, clean URLs, canonicals, metadata, and indexation safeguards.'],
              [FileCode2, 'On-page SEO', 'Semantic headings, intent-focused copy, internal links, and structured page content.'],
              [Smartphone, 'Mobile Optimization', 'Mobile-first layouts, readable content, touch targets, and frictionless conversion paths.'],
              [Sparkles, 'Core Web Vitals', 'Performance budgets, lazy 3D, optimized assets, and stable loading behavior.'],
              [Gauge, 'Performance Optimization', 'Static generation, lean interactions, code splitting, and measurable loading improvements.'],
              [ShieldCheck, 'Schema Markup', 'Organization, service, founder, and page metadata that search engines can understand.'],
            ].map(([Icon, title, copy]) => {
              const I = Icon as typeof Search
              return <div className="card" key={String(title)} style={{ padding: 27 }}><I size={24} color="#38bdf8" /><h3 className="display">{String(title)}</h3><p style={{ color: '#aab8c8', lineHeight: 1.7 }}>{String(copy)}</p></div>
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="eyebrow">Landing page portfolio</span>
          <h2 className="section-title">Five industries. Five believable digital experiences.</h2>
          <div className="cards-3">
            {portfolio.map((item) => (
              <Link href={`/portfolio/${item.slug}/`} className="portfolio-card card" key={item.slug}>
                <PortfolioPreview item={item} />
                <div className="portfolio-body"><span className="pill">{item.category}</span><h3 className="display">{item.title}</h3><span className="text-link">View realistic preview →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f5f8fc' }}>
        <div className="shell">
          <span className="eyebrow">Client stories</span>
          <h2 className="section-title">Trusted by owners, founders, and operating teams.</h2>
          <div className="cards-3">
            {testimonials.map(([name, role, quote]) => <blockquote key={name} className="quote card"><q>{quote}</q><footer>{name}<small style={{ display: 'block', color: '#6b7888', fontWeight: 500 }}>{role}</small></footer></blockquote>)}
          </div>
          <AnimatedStats stats={stats} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <span className="eyebrow">Founder</span>
          <div className="founder">
            <FounderPhoto />
            <div><h2 className="section-title">Rahul Kondhalkar</h2><p className="section-copy">Founder of Ved-X AI with 13+ years across AI solutions, data engineering, cloud, SaaS, and automation. He now focuses on building and selling AI chatbots that help small businesses grow.</p><div className="logo-cloud">{['AI Chatbots','Small Business','WhatsApp','Digital Ads','SaaS','Cloud'].map(x=><span key={x}>{x}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="contact" style={{ background: '#f5f8fc' }}>
        <div className="shell">
          <span className="eyebrow">Start a conversation</span>
          <h2 className="section-title">Tell us the growth problem. We’ll map the digital solution.</h2>
          <div className="contact-grid">
            <div className="contact-card card"><span className="pill">Founder-led consultation</span><h3 className="display" style={{ fontSize: 32 }}>Book a free discovery call.</h3><p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Share your business, bottleneck, and goal. We’ll recommend the shortest credible path.</p><div className="contact-actions"><a className="btn btn-primary" href="https://wa.me/918655448143"><Phone size={16} /> WhatsApp Now</a><a className="btn btn-secondary" href="mailto:Rahul.kondhalkar77@gmail.com?subject=VedX%20AI%20Consultation">Book Consultation</a><a className="btn btn-secondary" href="tel:+918655448143">Call Us</a></div></div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
