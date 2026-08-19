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

export const adminUsers = {
  async create({ email, password, full_name, phone, is_active }) {
    if (!supabase) throw new Error('Supabase is not configured')
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !password || password.length < 6) {
      throw new Error('Email and password (min 6 chars) are required')
    }

    // Use signUp to create the Auth user (works with anon key).
    // We save/restore the current admin session so signUp doesn't log us out.
    const { data: adminSession } = await supabase.auth.getSession()

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: { full_name: full_name || '', phone: phone || '' },
        emailRedirectTo: window.location.origin + '/azure-learning/login',
      },
    })

    // Restore admin session immediately
    if (adminSession?.session) {
      await supabase.auth.setSession(adminSession.session)
    }

    if (signUpError) throw new Error(signUpError.message)
    const newUser = signUpData.user
    if (!newUser) throw new Error('User creation failed — check if email already exists')

    // Upsert profile (trigger may have already created it)
    const { error: profileError } = await supabase.from('profiles').upsert({
      id: newUser.id,
      email: trimmedEmail,
      full_name: (full_name || '').trim(),
      phone: (phone || '').trim(),
      role: 'learner',
      is_active: is_active !== false,
    })
    if (profileError) throw new Error(profileError.message)

    return { user: { id: newUser.id, email: trimmedEmail } }
  },

  async update({ id, full_name, phone, is_active }) {
    if (!supabase) throw new Error('Supabase is not configured')
    if (!id) throw new Error('User id required')

    const updates = {}
    if (typeof full_name === 'string') updates.full_name = full_name.trim()
    if (typeof phone === 'string') updates.phone = phone.trim()
    if (typeof is_active === 'boolean') updates.is_active = is_active

    if (Object.keys(updates).length === 0) return { ok: true }

    const { error } = await supabase.from('profiles').update(updates).eq('id', id)
    if (error) throw new Error(error.message)
    return { ok: true }
  },

  async remove({ id }) {
    if (!supabase) throw new Error('Supabase is not configured')
    if (!id) throw new Error('User id required')

    // Delete profile (auth user remains but can't access with no active profile)
    const { error } = await supabase.from('profiles').delete().eq('id', id).eq('role', 'learner')
    if (error) throw new Error(error.message)
    return { ok: true }
  },
}
