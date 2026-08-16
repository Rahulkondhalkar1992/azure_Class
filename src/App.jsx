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
  // Guests: no portal navbar (avoids bouncing into guarded Home/Syllabus links).
  // Signed-in learners: normal chrome.
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

      <Route path="/" element={<Guarded><Home /></Guarded>} />
      <Route path="/learn" element={<Guarded><Learn /></Guarded>} />
      <Route path="/syllabus" element={<Guarded><Syllabus /></Guarded>} />
      <Route path="/project" element={<Guarded><Project /></Guarded>} />
      <Route path="/interview" element={<Guarded><Interview /></Guarded>} />
      <Route path="/whiteboard" element={<Guarded><Whiteboard /></Guarded>} />
      <Route path="/labs" element={<Guarded><Labs /></Guarded>} />
      <Route path="/resume" element={<Guarded><ResumeBuilder /></Guarded>} />
      <Route path="/quiz" element={<Guarded><Quiz /></Guarded>} />
      <Route path="/faq" element={<Guarded><Faq /></Guarded>} />
      <Route path="/glossary" element={<Guarded><Glossary /></Guarded>} />
      <Route path="/contact" element={<ContactRoute />} />
      <Route path="/ai" element={<Guarded><UpcomingAI /></Guarded>} />
      <Route path="/account" element={<Guarded><Account /></Guarded>} />
      <Route path="/admin/users" element={<Guarded adminOnly><AdminUsers /></Guarded>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
