import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authAPI } from '../api/axiosInstance'
import { AlertCircle, CheckCircle, Mail, Lock, User } from 'lucide-react'

export default function AdminSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match')
      return
    }

    setStatus('loading')

    try {
      const response = await authAPI.signup(formData.email, formData.password, formData.name)
      localStorage.setItem('adminToken', response.data.token)
      setStatus('success')
      setMessage('Signup successful! Redirecting...')
      setTimeout(() => navigate('/admin'), 1500)
    } catch (error) {
      setStatus('error')
      setMessage(error.response?.data?.message || 'Signup failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <div className="w-full mt-4 mb-4 max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ConBuilder
          </span>
        </Link>

        {/* Form Card */}
        <div className="card-gradient">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Admin Account</h1>
          <p className="text-dark-300 text-center mb-6">Join ConBuilder and manage your projects</p>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex gap-2 items-center">
              <CheckCircle size={20} className="text-green-400" />
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex gap-2 items-center">
              <AlertCircle size={20} className="text-red-400" />
              <p className="text-red-400 text-sm">{message}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3.5 text-dark-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3.5 text-dark-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3.5 text-dark-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark-200 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3.5 text-dark-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {status === 'loading' ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-dark-300">
              Already have an account?{' '}
              <Link to="/admin/login" className="text-primary-400 font-semibold hover:text-primary-300">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <p className="text-center text-dark-400 text-sm mt-6">
          <Link to="/" className="text-primary-400 hover:text-primary-300">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  )
}
