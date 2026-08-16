import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/data/site'

export function generateStaticParams(){ return products.map(({slug})=>({slug})) }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const product=products.find(x=>x.slug===slug)
  return product ? {title:product.title,description:`Ved-X AI ${product.title} SaaS for ${product.audience.toLowerCase()}.`,alternates:{canonical:`/products/${slug}/`}} : {}
}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params
  const product=products.find(x=>x.slug===slug)
  if(!product) notFound()
  const Icon=product.icon
  return <><section className="page-hero"><div className="shell"><span className="eyebrow">VedX SaaS</span><h1>{product.title}</h1><p className="section-copy">A focused SaaS foundation for {product.audience.toLowerCase()}—customized to your workflow, brand, and operating model.</p><Link href="/contact/" className="btn btn-primary" style={{marginTop:28}}>Request product demo</Link></div></section><section className="section"><div className="shell"><div className="cards-2"><article className="card" style={{padding:30}}><span className="icon-box"><Icon size={24}/></span><h2 className="display" style={{fontSize:34}}>Core modules</h2><ul className="feature-list">{product.features.map(x=><li key={x}>{x}</li>)}</ul></article><article className="dashboard" style={{minHeight:370,padding:30}}><strong>Interactive dashboard concept</strong><div className="dashboard-bars" style={{height:230}}>{[45,82,61,95,72,88,58].map((x,i)=><span key={i} style={{height:`${x}%`}}/>)}</div><p style={{color:'#9fb0c3'}}>Payments · activity · pending items · notifications</p></article></div></div></section></>
}
