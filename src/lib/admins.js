export const ADMIN_EMAILS = [
  'chetan421301@gmail.com',
  'rahul.kondhalkar77@gmail.com',
]

export function isAdminEmail(email) {
  return ADMIN_EMAILS.includes(String(email || '').trim().toLowerCase())
}

export function isAdminProfile(profile) {
  if (!profile) return false
  return (
    profile.role === 'admin' &&
    profile.is_active !== false &&
    isAdminEmail(profile.email)
  )
}
