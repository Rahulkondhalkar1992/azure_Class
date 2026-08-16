import Link from 'next/link'
import { products } from '@/data/site'

export const metadata = { title: 'SaaS Product Showcase', description: 'Ved-X AI SaaS products for societies, coaching institutes, and clinics.' }

export default function ProductsPage() {
  return <><section className="page-hero"><div className="shell"><span className="eyebrow">SaaS products</span><h1>Operational software designed around real teams.</h1><p className="section-copy">Product foundations for high-frequency workflows, payments, communication, and reporting.</p></div></section><section className="section"><div className="shell"><div className="cards-3">{products.map(({slug,title,audience,features,icon:Icon})=><Link className="product-card card" href={`/products/${slug}/`} key={slug}><span className="icon-box"><Icon size={22}/></span><h3>{title}</h3><p>{audience}</p><div className="logo-cloud">{features.map(x=><span key={x}>{x}</span>)}</div></Link>)}</div></div></section></>
}
