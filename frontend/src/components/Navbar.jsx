import { Menu, X, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ toggleTheme, darkMode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-dark-900/80 backdrop-blur-md border-b border-dark-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="hidden sm:block font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              ConBuilder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#projects" className="text-dark-300 hover:text-primary-400 transition">
              Projects
            </a>
            <a href="#clients" className="text-dark-300 hover:text-primary-400 transition">
              Clients
            </a>
            <a href="#contact" className="text-dark-300 hover:text-primary-400 transition">
              Contact
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              to="/admin/login"
              className="btn-primary text-sm"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#projects" className="block px-4 py-2 text-dark-300 hover:text-primary-400">
              Projects
            </a>
            <a href="#clients" className="block px-4 py-2 text-dark-300 hover:text-primary-400">
              Clients
            </a>
            <a href="#contact" className="block px-4 py-2 text-dark-300 hover:text-primary-400">
              Contact
            </a>
            <Link
              to="/admin/login"
              className="block px-4 py-2 text-primary-400 font-semibold"
            >
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
