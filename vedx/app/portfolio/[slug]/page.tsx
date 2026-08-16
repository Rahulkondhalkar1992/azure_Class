import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PortfolioPreview from '@/components/PortfolioPreview'
import { portfolio } from '@/data/site'

export function generateStaticParams() {
  return portfolio.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const item = portfolio.find((x) => x.slug === slug)
  return item
    ? {
        title: `${item.title} — ${item.category} Website Concept`,
        description: `${item.tagline} A realistic ${item.category.toLowerCase()} landing-page concept by Ved-X AI.`,
        alternates: { canonical: `/portfolio/${slug}/` },
      }
    : {}
}

export default async function PortfolioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = portfolio.find((x) => x.slug === slug)
  if (!item) notFound()

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="pill">{item.category} · interactive concept</span>
          <h1>{item.title}</h1>
          <p className="section-copy">Click slots, products, programs, and treatments. Each industry uses a different layout, motion, and conversion pattern.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <PortfolioPreview item={item} full />
          <div className="cards-3">
            {item.pages.map((page, i) => (
              <article className="card" style={{ padding: 24 }} key={page}>
                <span className="pill">0{i + 1}</span>
                <h3 className="display">{page}</h3>
                <p style={{ color: 'var(--muted)' }}>A dedicated {page.toLowerCase()} view with industry copy and a clear next action.</p>
              </article>
            ))}
          </div>
          <Link className="btn btn-primary" style={{ marginTop: 36 }} href="/contact/">Build a site like this</Link>
        </div>
      </section>
    </>
  )
}
