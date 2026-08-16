import { createClient } from '@supabase/supabase-js'

function firstEnv(...keys) {
  for (const key of keys) {
    const value = String(import.meta.env[key] || '').trim()
    if (value) return value
  }
  return ''
}

// Supports local .env (VITE_*) and Vercel ↔ Supabase integration names.
// Note: Vite only exposes env vars prefixed with VITE_ unless defined in vite.config.
// For Vercel integration vars without VITE_, also add them in Vercel as VITE_ copies,
// or set the names below via vite define/envPrefix if needed.
const url = firstEnv(
  'VITE_SUPABASE_URL',
  'VITE_NEXT_PUBLIC_SUPABASE_URL',
)
const anonKey = firstEnv(
  'VITE_SUPABASE_ANON_KEY',
  'VITE_NEXT_PUBLIC_SUPABASE_ANON_KEY',
)

const looksConfigured =
  Boolean(url && anonKey) &&
  !url.includes('YOUR_PROJECT_REF') &&
  !anonKey.includes('YOUR_SUPABASE_ANON_KEY') &&
  url.startsWith('https://') &&
  anonKey.length > 20

export const isSupabaseConfigured = looksConfigured

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

export async function invokeAdminUsers(action, payload = {}) {
  if (!supabase) throw new Error('Supabase is not configured')

  const { data: sessionData } = await supabase.auth.getSession()
  const accessToken = sessionData.session?.access_token
  if (!accessToken) throw new Error('You must be signed in as an admin')

  const { data, error } = await supabase.functions.invoke('admin-users', {
    body: { action, ...payload },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (error) {
    let message = error.message || 'Admin action failed'
    try {
      if (typeof error.context?.json === 'function') {
        const body = await error.context.json()
        if (body?.error) message = body.error
      }
    } catch {
      // ignore
    }
    throw new Error(message)
  }
  if (data?.error) throw new Error(data.error)
  return data
}
