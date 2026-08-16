'use client'

export default function ContactForm() {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = `Hi Ved-X AI, I am ${data.get('name')} from ${data.get('company') || 'my business'}. I am interested in ${data.get('service')}. ${data.get('message') || ''} Contact: ${data.get('phone')} / ${data.get('email')}`
    window.open(`https://wa.me/918655448143?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="contact-card card" onSubmit={submit}>
      <div className="form-grid">
        <div className="field"><label>Name</label><input name="name" required placeholder="Your name" /></div>
        <div className="field"><label>Company Name</label><input name="company" placeholder="Business / startup" /></div>
        <div className="field"><label>Email</label><input name="email" type="email" required placeholder="you@company.com" /></div>
        <div className="field"><label>Phone</label><input name="phone" required placeholder="+91" /></div>
        <div className="field field-full"><label>Service Interested</label><select name="service" defaultValue="AI Chatbot"><option>AI Chatbot</option><option>SaaS Product</option><option>Mobile App</option><option>Landing Page</option><option>Business Automation</option></select></div>
        <div className="field field-full"><label>Message</label><textarea name="message" rows={5} placeholder="Tell us the business goal, not only the feature list." /></div>
      </div>
      <button className="btn btn-primary" type="submit" style={{ marginTop: 18 }}>Send via WhatsApp</button>
    </form>
  )
}
