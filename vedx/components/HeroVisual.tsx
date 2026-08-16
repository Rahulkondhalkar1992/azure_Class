'use client'

import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="hero-canvas"><div className="hero-fallback"><strong>Loading AI mind…</strong></div></div>,
})

export default function HeroVisual() {
  return <HeroScene />
}
