import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import LandingPage from './pages/LandingPage'
import AdminPanel from './pages/AdminPanel'
import AdminLogin from './pages/AdminLogin'
import AdminSignup from './pages/AdminSignup'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleTheme = () => setDarkMode(!darkMode)

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
          <Route path="/admin" element={<AdminPanel toggleTheme={toggleTheme} darkMode={darkMode} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
        </Routes>
      </div>
    </Router>
  )
}
