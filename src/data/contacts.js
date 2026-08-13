export const mentors = [
  {
    name: 'Chetan Thorat',
    role: 'Big Data Lead',
    company: 'Hexaware',
    phone: '8692016111',
    wa: '918692016111',
  },
  {
    name: 'Rahul Kondhalkar',
    role: 'Manager, Azure Data Engineer',
    company: 'Capgemini',
    phone: '8655448143',
    wa: '918655448143',
  },
]

export const whatsappHref = (wa, text) =>
  `https://wa.me/${wa}?text=${encodeURIComponent(text)}`
