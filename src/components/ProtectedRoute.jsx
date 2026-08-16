import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { configured, loading, user, profile, isAdmin, isActive } = useAuth()
  const location = useLocation()

  if (!configured) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (loading) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <div className="card px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Checking access…</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (profile && !isActive) {
    return <Navigate to="/inactive" replace />
  }

  if (!profile) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <div className="card max-w-md px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
          Your account is signed in, but no profile was found. Ask an admin to recreate your profile.
        </div>
      </div>
    )
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}
