import {
  Bot,
  Building2,
  CalendarCheck,
  Code2,
  LayoutDashboard,
  LineChart,
  Megaphone,
  MessageCircleMore,
  Rocket,
  Sparkles,
  Smartphone,
  Workflow,
} from 'lucide-react'

export const services = [
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot Development',
    short: 'WhatsApp and website chatbots that capture enquiries, qualify leads, and book appointments for small businesses.',
    icon: Bot,
    features: ['WhatsApp Chatbot', 'Website Chatbot', 'Customer Support Bot', 'Lead Generation Bot', 'Appointment Booking Bot'],
    benefits: ['24x7 support', 'Faster response', 'Lead qualification', 'Increased conversion'],
    technologies: ['Azure OpenAI', 'Next.js', 'WhatsApp Cloud API', 'RAG', 'Vector Search'],
  },
  {
    slug: 'saas-development',
    title: 'SaaS Product Development',
    short: 'Secure, multi-tenant software products designed to scale from first customer to thousands.',
    icon: LayoutDashboard,
    features: ['Multi-tenant SaaS', 'Subscription Models', 'Admin Portals', 'Analytics Dashboards', 'Secure Architecture'],
    benefits: ['Faster launch', 'Recurring revenue', 'Reliable operations', 'Actionable analytics'],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Azure'],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile Application Development',
    short: 'Fast, polished mobile experiences that feel native on every device.',
    icon: Smartphone,
    features: ['Android Apps', 'iOS Apps', 'Hybrid Apps', 'Flutter Development', 'React Native Development'],
    benefits: ['Wider reach', 'Better retention', 'Push engagement', 'Unified experience'],
    technologies: ['Flutter', 'React Native', 'Firebase', 'Azure', 'App Store'],
  },
  {
    slug: 'landing-page-development',
    title: 'Landing Page Development',
    short: 'High-converting campaign experiences built around one measurable business goal.',
    icon: Rocket,
    features: ['Lead Generation', 'Product Launch Pages', 'Campaign Pages', 'Conversion Optimization'],
    benefits: ['More qualified leads', 'Faster campaigns', 'Better ad ROI', 'Clear analytics'],
    technologies: ['Next.js', 'Framer Motion', 'Analytics', 'Technical SEO', 'A/B Testing'],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    short: 'Connect teams, systems, and customer touchpoints with practical AI-powered workflows.',
    icon: Workflow,
    features: ['Workflow Automation', 'WhatsApp Automation', 'CRM Integration', 'Email Automation', 'AI Agents'],
    benefits: ['Less manual work', 'Fewer errors', 'Faster follow-up', 'Scalable operations'],
    technologies: ['Azure Functions', 'Power Automate', 'n8n', 'CRM APIs', 'AI Agents'],
  },
  {
    slug: 'digital-ads-marketing',
    title: 'Digital Ads & Marketing',
    short: 'Google, Meta, and local campaigns that send ready-to-buy enquiries into your chatbot.',
    icon: Megaphone,
    features: ['Google Ads', 'Meta Ads', 'Local SEO Campaigns', 'Landing Page Funnels', 'WhatsApp Lead Capture'],
    benefits: ['More qualified leads', 'Lower cost per enquiry', 'Clear ROI tracking', 'Chatbot conversion'],
    technologies: ['Google Ads', 'Meta Ads', 'GA4', 'WhatsApp Cloud API', 'Conversion Tracking'],
  },
] as const

export const growthPlays = [
  {
    title: 'Never miss a customer enquiry',
    copy: 'Your AI chatbot replies on the website and WhatsApp in seconds—nights, weekends, and busy hours included.',
    result: 'More conversations captured',
    icon: Bot,
  },
  {
    title: 'Turn chats into bookings',
    copy: 'Clinics, gyms, salons, and coaches get appointments booked without staff chasing the phone.',
    result: 'Fuller calendars',
    icon: CalendarCheck,
  },
  {
    title: 'Sell while you work',
    copy: 'The bot qualifies the lead, shares pricing or packages, and sends a hot enquiry to you on WhatsApp.',
    result: 'Higher close rate',
    icon: LineChart,
  },
  {
    title: 'Cut repetitive support',
    copy: 'FAQs, timings, fees, and location answers happen automatically so your team handles only real cases.',
    result: 'Hours saved every week',
    icon: MessageCircleMore,
  },
  {
    title: 'Look bigger than you are',
    copy: 'A sharp landing page plus ads send traffic; the chatbot converts visitors into conversations.',
    result: 'A professional first impression',
    icon: Rocket,
  },
  {
    title: 'Grow without extra staff',
    copy: 'Follow-ups, reminders, and lead routing run in the background so a small team can serve more customers.',
    result: 'Lower operating cost',
    icon: Workflow,
  },
] as const

export const products = [
  {
    slug: 'housing-society',
    title: 'Housing Society Management',
    audience: 'Committees and residents',
    icon: Building2,
    features: ['Maintenance Billing', 'Online Payments', 'Complaint Management', 'Notice Board', 'WhatsApp Notifications', 'Accounting'],
  },
  {
    slug: 'coaching-institute',
    title: 'Coaching Institute Management',
    audience: 'Institutes and academies',
    icon: LineChart,
    features: ['Student Management', 'Fees Tracking', 'Attendance', 'Batch Management', 'Results', 'Notifications'],
  },
  {
    slug: 'doctor-appointments',
    title: 'Doctor Appointment Management',
    audience: 'Clinics and specialists',
    icon: CalendarCheck,
    features: ['Appointment Scheduling', 'Patient Records', 'Follow-Ups', 'Billing', 'Notifications'],
  },
] as const

export const portfolio = [
  { slug: 'healthcare', title: 'MediCore Healthcare', category: 'Healthcare', pages: ['Home', 'Services', 'About', 'Contact'], tone: 'teal', tagline: 'Advanced care. Human connection.', copy: 'Trusted specialists and coordinated care for every stage of life.', cta: 'Book an appointment', services: ['Preventive Care','Specialist Consults','Diagnostics'], metric: '24/7 patient support' },
  { slug: 'skin-care', title: 'Élan Skin Studio', category: 'Skin Care', pages: ['Home', 'Products', 'About', 'Contact'], tone: 'rose', tagline: 'Healthy skin, beautifully understood.', copy: 'Dermatologist-guided rituals and clinically considered products for your skin.', cta: 'Discover your routine', services: ['Skin Analysis','Signature Facials','Clinical Products'], metric: '4.9 client rating' },
  { slug: 'dental', title: 'BrightSmile Dental', category: 'Dental Clinic', pages: ['Home', 'Treatments', 'About', 'Contact'], tone: 'blue', tagline: 'Confident smiles start with gentle care.', copy: 'Modern dentistry, transparent treatment plans, and a team that listens.', cta: 'Schedule a visit', services: ['Smile Design','Dental Implants','Family Dentistry'], metric: '10,000+ smiles cared for' },
  { slug: 'coaching', title: 'Apex Coaching', category: 'Education', pages: ['Home', 'Courses', 'About', 'Contact'], tone: 'amber', tagline: 'Learn with direction. Achieve with confidence.', copy: 'Structured courses, expert mentors, and measurable progress for ambitious students.', cta: 'Explore courses', services: ['Live Classes','Mock Tests','Mentor Support'], metric: '92% learner success' },
  { slug: 'gym', title: 'IronForge Fitness', category: 'Gym & Fitness', pages: ['Home', 'Programs', 'About', 'Contact'], tone: 'violet', tagline: 'Build strength that shows up everywhere.', copy: 'Coach-led training plans, a focused community, and progress you can measure.', cta: 'Start your trial', services: ['Strength Training','Personal Coaching','Nutrition'], metric: '500+ active members' },
] as const

export const testimonials = [
  ['Aarav Mehta', 'Business Owner', 'VedX turned our fragmented online presence into a lead engine. Enquiries became clearer and follow-up became faster.'],
  ['Dr. Neha Shah', 'Healthcare Client', 'The booking flow feels effortless for patients, and the site finally reflects the quality of our clinic.'],
  ['Sanjay Patil', 'Coaching Institute Owner', 'The new enquiry automation saves our counselors hours every week and gives parents immediate answers.'],
  ['Maya Rao', 'Startup Founder', 'VedX worked like a product partner—not an agency. They challenged assumptions and shipped a stable first release.'],
  ['Prakash Kulkarni', 'Society Chairman', 'Billing, notices, and complaints now live in one clean workflow that residents actually use.'],
  ['Anita Desai', 'Retail Business Owner', 'We gained speed, credibility, and a far better mobile buying experience without adding operational complexity.'],
] as const

export const stats = [
  ['13+', 'Years Experience'],
  ['100+', 'Projects Delivered'],
  ['50+', 'Businesses Automated'],
  ['95%', 'Client Satisfaction'],
] as const

export const valueProps = [
  ['Increase Customer Trust', MessageCircleMore],
  ['Generate More Leads', LineChart],
  ['Improve Online Presence', Code2],
  ['Faster Response Time', Bot],
  ['Better Customer Experience', Smartphone],
  ['SEO Optimized Solutions', Rocket],
  ['AI-Powered Automation', Workflow],
  ['Scalable Architecture', LayoutDashboard],
  ['Modern Design Standards', Sparkles],
] as const
