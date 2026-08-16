import type { MetadataRoute } from 'next'
import { portfolio, products, services } from '@/data/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://vedx-ai.com'
  const staticRoutes = ['', '/services', '/solutions', '/products', '/portfolio', '/about', '/testimonials', '/contact', '/azure-learning']
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}/`, lastModified: new Date(), changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const, priority: path === '' ? 1 : .8 })),
    ...services.map((x) => ({ url: `${base}/services/${x.slug}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .8 })),
    ...products.map((x) => ({ url: `${base}/products/${x.slug}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .7 })),
    ...portfolio.map((x) => ({ url: `${base}/portfolio/${x.slug}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: .7 })),
  ]
}
