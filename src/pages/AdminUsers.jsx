import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { adminUsers, supabase } from '../lib/supabase.js'

const emptyForm = {
  email: '',
  full_name: '',
  phone: '',
  password: '',
  is_active: true,
}

export default function AdminUsers() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: listError } = await supabase
        .from('profiles')
        .select('id, email, full_name, phone, role, is_active, created_at')
        .order('created_at', { ascending: false })
      if (listError) throw listError
      setUsers(data || [])
    } catch (err) {
      setError(err.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const onCreate = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await adminUsers.create({
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        phone: form.phone,
        is_active: form.is_active,
      })
      setForm(emptyForm)
      await loadUsers()
    } catch (err) {
      setError(err.message || 'Could not create user')
    } finally {
      setSaving(false)
    }
  }

  const onSaveEdit = async (event) => {
    event.preventDefault()
    if (!editing) return
    setSaving(true)
    setError('')
    try {
      await adminUsers.update({
        id: editing.id,
        full_name: editing.full_name,
        phone: editing.phone,
        is_active: editing.is_active,
      })
      setEditing(null)
      await loadUsers()
    } catch (err) {
      setError(err.message || 'Could not update user')
    } finally {
      setSaving(false)
    }
  }

  const onToggleActive = async (row) => {
    if (row.role === 'admin' && row.id !== user?.id) {
      setError('Cannot deactivate another admin')
      return
    }
    setError('')
    try {
      await adminUsers.update({
        id: row.id,
        is_active: !row.is_active,
      })
      await loadUsers()
    } catch (err) {
      setError(err.message || 'Could not update status')
    }
  }

  const onDelete = async (row) => {
    if (row.role === 'admin') {
      setError('Cannot delete admin accounts')
      return
    }
    if (!window.confirm(`Remove ${row.email}? This deletes their login.`)) return
    setError('')
    try {
      await adminUsers.remove({ id: row.id })
      await loadUsers()
    } catch (err) {
      setError(err.message || 'Could not delete user')
    }
  }

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azure-600 dark:text-azure-400">Admin</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">Users</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Add learners, update name/phone, activate or deactivate access, and remove accounts.
          </p>
        </div>
        <button type="button" className="btn-ghost" onClick={loadUsers}>
          Refresh
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </p>
      )}

      <form className="card mt-6 grid gap-3 p-5 md:grid-cols-2" onSubmit={onCreate}>
        <h2 className="font-display text-lg font-semibold md:col-span-2">Add learner</h2>
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/15 dark:bg-ink-950"
        />
        <input
          required
          type="password"
          placeholder="Temp password (min 6)"
          minLength={6}
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/15 dark:bg-ink-950"
        />
        <input
          required
          type="text"
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/15 dark:bg-ink-950"
        />
        <input
          type="tel"
          placeholder="Phone / WhatsApp"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/15 dark:bg-ink-950"
        />
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
          />
          Active on create
        </label>
        <button type="submit" className="btn-primary md:col-span-2 md:w-fit" disabled={saving}>
          {saving ? 'Saving…' : 'Create user'}
        </button>
      </form>

      <div className="card mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-white/10">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-slate-500">Loading…</td>
              </tr>
            )}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-slate-500">No users yet.</td>
              </tr>
            )}
            {users.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 dark:border-white/5">
                <td className="px-4 py-3 font-medium">{row.full_name || '—'}</td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3">{row.phone || '—'}</td>
                <td className="px-4 py-3 capitalize">{row.role}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${row.is_active ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-slate-500/15 text-slate-600 dark:text-slate-300'}`}>
                    {row.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => setEditing({ ...row, password: '' })}>
                      Edit
                    </button>
                    <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs" onClick={() => onToggleActive(row)}>
                      {row.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    {row.role !== 'admin' && (
                      <button type="button" className="btn-ghost !px-3 !py-1.5 text-xs text-rose-600 dark:text-rose-300" onClick={() => onDelete(row)}>
                        Remove
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/50 p-4">
          <form className="card w-full max-w-md space-y-3 p-5" onSubmit={onSaveEdit}>
            <h3 className="font-display text-lg font-semibold">Edit {editing.email}</h3>
            <input
              type="text"
              value={editing.full_name || ''}
              onChange={(e) => setEditing((u) => ({ ...u, full_name: e.target.value }))}
              placeholder="Full name"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/15 dark:bg-ink-950"
            />
            <input
              type="tel"
              value={editing.phone || ''}
              onChange={(e) => setEditing((u) => ({ ...u, phone: e.target.value }))}
              placeholder="Phone"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/15 dark:bg-ink-950"
            />
            <input
              type="password"
              value={editing.password || ''}
              onChange={(e) => setEditing((u) => ({ ...u, password: e.target.value }))}
              placeholder="New password (optional)"
              minLength={6}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/15 dark:bg-ink-950"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={Boolean(editing.is_active)}
                onChange={(e) => setEditing((u) => ({ ...u, is_active: e.target.checked }))}
              />
              Active
            </label>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="btn-primary" disabled={saving}>
                Save
              </button>
              <button type="button" className="btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
