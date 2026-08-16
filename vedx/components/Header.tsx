'use client'

import { ArrowLeft, Menu, Moon, Sun, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BrandLockup from './BrandLockup'

const links = [
  ['Home', '/'],
  ['Services', '/services/'],
  ['Solutions', '/solutions/'],
  ['Portfolio', '/portfolio/'],
  ['About', '/about/'],
  ['Testimonials', '/testimonials/'],
  ['Contact', '/contact/'],
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const saved = localStorage.getItem('vedx-theme')
    const initial = saved === 'dark' || saved === 'light'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(initial)
    document.documentElement.dataset.theme = initial
    document.body.dataset.theme = initial
    const onScroll = () => setSolid(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    document.body.dataset.theme = next
    localStorage.setItem('vedx-theme', next)
  }

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''))
  const showBack = pathname !== '/'

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) router.back()
    else router.push('/')
  }

  return (
    <header className={`topbar ${solid ? 'topbar-solid' : ''} ${showBack ? 'topbar-with-back' : ''}`}>
      <div className="shell topbar-inner">
        <div className="brand-block">
          <Link className="brand-link" href="/" aria-label="Ved-X AI home">
            <BrandLockup />
          </Link>
          {showBack && (
            <button className="back-button" type="button" onClick={goBack} aria-label="Go back">
              <ArrowLeft size={13} strokeWidth={2.2} />
              Back
            </button>
          )}
        </div>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={isActive(href) ? 'nav-active' : ''}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="topbar-actions">
          <button className="theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link className="portal-link" href="/azure-learning/">
            <span className="pill">Training</span>
            Azure Learning
          </Link>
          <button className="menu-button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link onClick={() => setOpen(false)} key={href} href={href} className={isActive(href) ? 'nav-active' : ''}>{label}</Link>
          ))}
          <Link onClick={() => setOpen(false)} href="/azure-learning/">Azure Learning Portal</Link>
        </nav>
      )}
    </header>
  )
}
