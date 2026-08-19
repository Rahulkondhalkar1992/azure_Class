import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Syllabus from './pages/Syllabus.jsx'
import Project from './pages/Project.jsx'
import Interview from './pages/Interview.jsx'
import Whiteboard from './pages/Whiteboard.jsx'
import Contact from './pages/Contact.jsx'
import UpcomingAI from './pages/UpcomingAI.jsx'
import Labs from './pages/Labs.jsx'
import ResumeBuilder from './pages/ResumeBuilder.jsx'
import Quiz from './pages/Quiz.jsx'
import Faq from './pages/Faq.jsx'
import Glossary from './pages/Glossary.jsx'
import Login from './pages/Login.jsx'
import Inactive from './pages/Inactive.jsx'
import Account from './pages/Account.jsx'
import AdminUsers from './pages/AdminUsers.jsx'
import Concepts from './pages/Concepts.jsx'
import { useAuth } from './context/AuthContext.jsx'

function Shell({ children, hideChrome = false }) {
  const { pathname } = useLocation()
  const hideFooter = hideChrome || pathname === '/whiteboard' || pathname === '/resume' || pathname === '/login'

  return (
    <div className="flex min-h-screen flex-col">
      {!hideChrome && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}

function Guarded({ children, adminOnly = false }) {
  return (
    <ProtectedRoute adminOnly={adminOnly}>
      <Shell>{children}</Shell>
    </ProtectedRoute>
  )
}

function ContactRoute() {
  const { user, isActive } = useAuth()
  const hideChrome = !(user && isActive)
  return (
    <Shell hideChrome={hideChrome}>
      <Contact guest={hideChrome} />
    </Shell>
  )
}

export default function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-600 dark:text-slate-300">
        Loading Azure Learning…
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={(
          <Shell hideChrome>
            <Login />
          </Shell>
        )}
      />
      <Route
        path="/inactive"
        element={(
          <Shell hideChrome>
            <Inactive />
          </Shell>
        )}
      />

      {/* Public pages — no login required */}
      <Route path="/" element={<Shell><Home /></Shell>} />
      <Route path="/learn" element={<Shell><Learn /></Shell>} />
      <Route path="/syllabus" element={<Shell><Syllabus /></Shell>} />
      <Route path="/interview" element={<Shell><Interview /></Shell>} />
      <Route path="/ai" element={<Shell><UpcomingAI /></Shell>} />
      <Route path="/glossary" element={<Shell><Glossary /></Shell>} />
      <Route path="/contact" element={<ContactRoute />} />
      <Route path="/faq" element={<Shell><Faq /></Shell>} />

      {/* Tools — login required */}
      <Route path="/quiz" element={<Guarded><Quiz /></Guarded>} />
      <Route path="/labs" element={<Guarded><Labs /></Guarded>} />
      <Route path="/whiteboard" element={<Guarded><Whiteboard /></Guarded>} />
      <Route path="/resume" element={<Guarded><ResumeBuilder /></Guarded>} />
      <Route path="/project" element={<Guarded><Project /></Guarded>} />
      <Route path="/concepts" element={<Guarded><Concepts /></Guarded>} />

      {/* Account / Admin — login required */}
      <Route path="/account" element={<Guarded><Account /></Guarded>} />
      <Route path="/admin/users" element={<Guarded adminOnly><AdminUsers /></Guarded>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
