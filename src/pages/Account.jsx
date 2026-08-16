import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Account() {
  const { profile, changePassword, signOut } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setSaving(true)
    try {
      await changePassword(password)
      setPassword('')
      setConfirm('')
      setMessage('Password updated.')
    } catch (err) {
      setError(err.message || 'Could not update password')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="container-page py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-3xl font-semibold">Account</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Manage your login details.</p>

        <div className="card mt-6 space-y-2 p-5 text-sm">
          <p><span className="text-slate-500">Name:</span> {profile?.full_name || '—'}</p>
          <p><span className="text-slate-500">Email:</span> {profile?.email}</p>
          <p><span className="text-slate-500">Phone:</span> {profile?.phone || '—'}</p>
          <p><span className="text-slate-500">Role:</span> {profile?.role}</p>
        </div>

        <form className="card mt-6 space-y-4 p-5" onSubmit={onSubmit}>
          <h2 className="font-display text-lg font-semibold">Change password</h2>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">New password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-azure-500 focus:ring-2 dark:border-white/15 dark:bg-ink-950"
              required
              minLength={6}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Confirm password</span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-azure-500 focus:ring-2 dark:border-white/15 dark:bg-ink-950"
              required
              minLength={6}
            />
          </label>
          {error && <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>}
          {message && <p className="text-sm text-emerald-600 dark:text-emerald-300">{message}</p>}
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Update password'}
            </button>
            <button type="button" className="btn-ghost" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
