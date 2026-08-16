import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { isAdminProfile } from '../lib/admins.js'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'

const AuthContext = createContext(null)

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, phone, role, is_active, created_at, updated_at')
    .eq('id', userId)
    .maybeSingle()
  if (error) throw error
  return data
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refreshProfile = useCallback(async (userId) => {
    if (!supabase || !userId) {
      setProfile(null)
      return null
    }
    const next = await fetchProfile(userId)
    setProfile(next)
    return next
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return undefined
    }

    let mounted = true

    const boot = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError
        if (!mounted) return
        setSession(data.session)
        if (data.session?.user?.id) {
          await refreshProfile(data.session.user.id)
        } else {
          setProfile(null)
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load session')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    boot()

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession)
      if (nextSession?.user?.id) {
        try {
          await refreshProfile(nextSession.user.id)
        } catch (err) {
          setError(err.message || 'Failed to load profile')
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [refreshProfile])

  const signIn = useCallback(async (email, password) => {
    if (!supabase) throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
    setError('')
    const { data, error: signError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })
    if (signError) throw signError
    if (data.user?.id) await refreshProfile(data.user.id)
    return data
  }, [refreshProfile])

  const signOut = useCallback(async () => {
    if (!supabase) return
    setError('')
    const { error: outError } = await supabase.auth.signOut()
    if (outError) throw outError
    setSession(null)
    setProfile(null)
  }, [])

  const changePassword = useCallback(async (newPassword) => {
    if (!supabase) throw new Error('Supabase is not configured')
    const { error: pwError } = await supabase.auth.updateUser({ password: newPassword })
    if (pwError) throw pwError
  }, [])

  const value = useMemo(
    () => ({
      configured: isSupabaseConfigured,
      loading,
      error,
      session,
      user: session?.user ?? null,
      profile,
      isAdmin: isAdminProfile(profile),
      isActive: Boolean(profile?.is_active),
      signIn,
      signOut,
      changePassword,
      refreshProfile,
      setError,
    }),
    [loading, error, session, profile, signIn, signOut, changePassword, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
