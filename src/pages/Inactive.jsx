import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Inactive() {
  const { profile, signOut } = useAuth()

  return (
    <section className="container-page flex min-h-[60vh] items-center justify-center py-12">
      <div className="card max-w-lg p-6 sm:p-8 text-center">
        <h1 className="font-display text-2xl font-semibold">Account deactivated</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {profile?.full_name || profile?.email || 'Your account'} is currently inactive. Contact an admin to restore access.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="btn-primary" onClick={() => signOut()}>
            Sign out
          </button>
          <Link to="/contact" className="btn-ghost">
            Contact support
          </Link>
        </div>
      </div>
    </section>
  )
}
