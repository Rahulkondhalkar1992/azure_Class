import Link from 'next/link'
import PortfolioPreview from '@/components/PortfolioPreview'
import { portfolio } from '@/data/site'

export const metadata = { title: 'Portfolio', description: 'Realistic Ved-X AI landing page concepts for healthcare, beauty, dental, education, and fitness.' }
export default function PortfolioPage(){return <><section className="page-hero"><div className="shell"><span className="eyebrow">Portfolio</span><h1>Five industries. Five complete landing-page experiences.</h1><p className="section-copy">These are content-rich, responsive mini-sites—not blank placeholders. Open any concept to explore its full homepage structure.</p></div></section><section className="section"><div className="shell"><div className="cards-2">{portfolio.map(item=><Link className="portfolio-card card" href={`/portfolio/${item.slug}/`} key={item.slug}><PortfolioPreview item={item}/><div className="portfolio-body"><span className="pill">{item.category}</span><h3 className="display">{item.title}</h3><p style={{color:'var(--muted)'}}>{item.tagline}</p><span className="text-link">Open full landing page →</span></div></Link>)}</div></div></section></>}
