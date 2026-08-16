import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://vedx-ai.com'),
  title: { default: 'Ved-X AI | AI-Powered Digital Solutions', template: '%s | Ved-X AI' },
  description: 'Ved-X AI builds intelligent chatbots, SaaS products, automation, mobile apps, and high-converting websites for modern businesses.',
  keywords: ['AI solutions Mumbai', 'SaaS development', 'business automation', 'AI chatbot development', 'landing page development', 'Azure data engineering training'],
  openGraph: { title: 'Ved-X AI — AI-Powered Innovation. Real Business Growth.', description: 'Intelligent digital solutions that accelerate business growth.', url: '/', siteName: 'Ved-X AI', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Ved-X AI', description: 'AI-powered innovation. Real business growth.' },
  alternates: { canonical: '/' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ved-X AI',
  url: 'https://vedx-ai.com',
  founder: { '@type': 'Person', name: 'Rahul Kondhalkar', jobTitle: 'Founder' },
  areaServed: 'IN',
  email: 'Rahul.kondhalkar77@gmail.com',
  telephone: '+91-8655448143',
  description: 'AI, SaaS, automation, mobile app, and conversion-focused web development company.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('vedx-theme')||((matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');document.documentElement.dataset.theme=t;document.addEventListener('DOMContentLoaded',function(){document.body.dataset.theme=t})}catch(e){}` }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  )
}
