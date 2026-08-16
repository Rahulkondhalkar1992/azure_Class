import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { services } from '@/data/site'

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  return service ? { title: service.title, description: service.short, alternates: { canonical: `/services/${slug}/` } } : {}
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  if (!service) notFound()
  const Icon = service.icon
  return <>
    <section className="page-hero"><div className="shell"><span className="eyebrow">VedX service</span><h1>{service.title}</h1><p className="section-copy">{service.short}</p><div className="hero-actions"><Link className="btn btn-primary" href="/contact/">Discuss your project <ArrowRight size={16}/></Link></div></div></section>
    <section className="section"><div className="shell"><div className="cards-2"><article className="card" style={{padding:30}}><span className="icon-box"><Icon size={24}/></span><h2 className="display" style={{fontSize:34}}>What we deliver</h2><ul className="feature-list">{service.features.map(x=><li key={x}><Check size={14} color="#1769e0"/> {x}</li>)}</ul></article><article className="card" style={{padding:30}}><span className="eyebrow">Business benefits</span><h2 className="display" style={{fontSize:34}}>Built around measurable value.</h2><ul className="feature-list">{service.benefits.map(x=><li key={x}>{x}</li>)}</ul></article></div></div></section>
    <section className="section" style={{background:'#f5f8fc'}}><div className="shell"><span className="eyebrow">Our process</span><h2 className="section-title">Clarity at every stage.</h2><div className="process">{['Discover the goal and operating context','Design the journey and technical architecture','Build, integrate, and validate','Launch, measure, and improve'].map(x=><article key={x}><h3>{x}</h3></article>)}</div></div></section>
    <section className="section"><div className="shell"><span className="eyebrow">Technology</span><h2 className="section-title">A modern stack, selected for the problem.</h2><div className="logo-cloud">{service.technologies.map(x=><span key={x}>{x}</span>)}</div><div className="card" style={{padding:30,marginTop:45}}><span className="pill">Representative case study</span><h2 className="display" style={{fontSize:38}}>From manual handoffs to a connected digital workflow.</h2><p className="section-copy">We map the customer journey, remove repetitive steps, create a measurable conversion path, and give the operating team visibility after launch.</p></div></div></section>
    <section className="section dark-section"><div className="shell"><span className="eyebrow">FAQ</span><h2 className="section-title">Common questions</h2><div className="cards-3">{[['How quickly can we start?','Discovery can begin within days once goals and stakeholders are aligned.'],['Will it scale?','Architecture is designed around current demand and credible growth, not premature complexity.'],['What happens after launch?','We monitor, fix launch issues, and plan iterations from real usage data.']].map(([q,a])=><article className="card" style={{padding:25}} key={q}><h3>{q}</h3><p style={{color:'#aab8c8',lineHeight:1.7}}>{a}</p></article>)}</div><Link className="btn btn-primary" style={{marginTop:35,background:'#1769e0'}} href="/contact/">Book free consultation</Link></div></section>
  </>
}
