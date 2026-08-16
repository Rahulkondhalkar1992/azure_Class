'use client'

import { Bot, CalendarDays, GraduationCap, Send } from 'lucide-react'
import { useState } from 'react'

const demos = [
  {
    title: 'Education Admissions Bot',
    label: 'Educational Institute',
    welcome: 'Hi! I’m the VedX admissions assistant. Ask me about fees, batches, demo classes, or career support.',
    prompts: [
      ['What are your course fees?', 'Fees depend on the program and batch. I can share the detailed brochure or connect you with an advisor.'],
      ['When does the next batch start?', 'The next mentor-led batch starts shortly. Would you prefer weekday evenings or weekends?'],
      ['Can I get placement support?', 'Yes—resume, profile, interview preparation, and career guidance are included.'],
      ['Can I attend a demo class?', 'Absolutely. Share your WhatsApp number and we will reserve your demo slot.'],
      ['How can I enroll?', 'I can collect your details now or connect you directly with the admissions mentor.'],
    ],
  },
  {
    title: 'Appointment Booking Bot',
    label: 'Business Appointment',
    welcome: 'Welcome! I can find a slot, confirm your appointment, and answer consultation questions.',
    prompts: [
      ['Book appointment', 'Available tomorrow: 11:00 AM, 2:30 PM, and 4:00 PM. Which works for you?'],
      ['Tomorrow 4 PM', 'Confirmed for tomorrow at 4:00 PM. A reminder will be sent before your appointment.'],
      ['Where is your office?', 'We are based in Mumbai. I can share the map link with your confirmation.'],
      ['Do you provide online consultation?', 'Yes, video consultations are available. Choose online while booking.'],
      ['Share contact details', 'Call or WhatsApp +91 86554 48143. We usually reply within business hours.'],
    ],
  },
]

export default function ChatDemos() {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const demo = demos[active]

  return (
    <div className="chat-demo-layout">
      <div className="chat-window card">
        <div className="chat-head">
          <span className="chat-identity"><span className="chat-avatar"><Bot size={18} /></span><span><strong>{demo.title}</strong><small>Online · replies instantly</small></span></span>
          <span className="pill">Interactive demo</span>
        </div>
        <div className="chat-transcript" aria-live="polite">
          <div className="bubble-row bot-row"><span className="mini-avatar"><Bot size={12}/></span><div className="bubble bubble-bot">{demo.welcome}</div></div>
          {selected !== null && demo.prompts.slice(0, selected + 1).map(([question, answer]) => (
            <div key={question}>
              <div className="bubble bubble-user">{question}</div>
              <div className="bubble-row bot-row"><span className="mini-avatar"><Bot size={12}/></span><div className="bubble bubble-bot">{answer}</div></div>
            </div>
          ))}
        </div>
        <div className="quick-prompts">
          {demo.prompts.map(([q], i) => (
            <button key={q} onClick={() => setSelected(i)} className="btn btn-secondary" style={{ minHeight: 36, padding: '0 12px', fontSize: 11 }}>{q}</button>
          ))}
        </div>
        <div className="chat-input"><span>Choose a question above…</span><button aria-label="Send sample message"><Send size={15}/></button></div>
      </div>
      <div className="chat-control card">
        <span className="eyebrow">Choose a live scenario</span>
        <h3 className="display">See the conversation—not a static mockup.</h3>
        <p>Pick a business, then click customer questions to build a realistic conversation. Production bots connect to WhatsApp, CRM, calendars, and your knowledge base.</p>
        <div className="scenario-list">
          {demos.map((item, i) => (
            <button key={item.title} onClick={() => { setActive(i); setSelected(null) }} className={`scenario-button ${active === i ? 'active' : ''}`}>
              {i === 0 ? <GraduationCap size={20}/> : <CalendarDays size={20}/>}
              <span><strong>{item.label}</strong><small>{item.title}</small></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
