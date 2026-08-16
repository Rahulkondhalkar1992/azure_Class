export const mentors = [
  {
    name: 'Chetan Thorat',
    phone: '8692016111',
    wa: '918692016111',
  },
  {
    name: 'Rahul Kondhalkar',
    phone: '8655448143',
    wa: '918655448143',
  },
]

export const whatsappHref = (wa, text) =>
  `https://wa.me/${wa}?text=${encodeURIComponent(text)}`
