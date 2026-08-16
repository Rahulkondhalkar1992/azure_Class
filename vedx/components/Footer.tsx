import Link from 'next/link'
import BrandLockup from './BrandLockup'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Link className="brand-link footer-brand" href="/" aria-label="Ved-X AI home">
              <BrandLockup />
            </Link>
            <p style={{ color: '#9fb0c3', lineHeight: 1.7, maxWidth: 330 }}>
              AI chatbots and digital growth systems for small businesses—built to capture enquiries, book appointments, and convert more customers.
            </p>
            <a className="btn btn-primary" style={{ marginTop: 14 }} href="https://wa.me/918655448143">WhatsApp Ved-X</a>
          </div>
          <div>
            <h4>Services</h4>
            <div className="footer-links">
              <Link href="/services/ai-chatbot/">AI Chatbots</Link>
              <Link href="/services/digital-ads-marketing/">Digital Ads & Marketing</Link>
              <Link href="/services/landing-page-development/">Landing Pages</Link>
              <Link href="/services/business-automation/">Automation</Link>
            </div>
          </div>
          <div>
            <h4>Solutions</h4>
            <div className="footer-links">
              <Link href="/solutions/">How we help you grow</Link>
              <Link href="/products/">SaaS Products</Link>
              <Link href="/portfolio/">Portfolio</Link>
              <Link href="/contact/">Free consultation</Link>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link href="/">Home</Link>
              <Link href="/about/">About</Link>
              <Link href="/testimonials/">Testimonials</Link>
              <Link href="/contact/">Contact</Link>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <div>
            <h4>Learning</h4>
            <div className="footer-links">
              <Link href="/azure-learning/">Azure Learning Portal</Link>
              <Link href="/azure-learning/syllabus/">Syllabus</Link>
              <Link href="/azure-learning/quiz/">Assessment Quiz</Link>
              <a href="mailto:Rahul.kondhalkar77@gmail.com">Email Rahul</a>
              <a href="tel:+918655448143">+91 86554 48143</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ved-X AI. All rights reserved.</span>
          <span>Chatbots for small business growth.</span>
        </div>
      </div>
    </footer>
  )
}
