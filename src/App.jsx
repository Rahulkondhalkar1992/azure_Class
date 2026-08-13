import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
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

export default function App() {
  const { pathname } = useLocation()
  const hideFooter = pathname === '/whiteboard' || pathname === '/resume'

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/project" element={<Project />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai" element={<UpcomingAI />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}
