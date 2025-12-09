import { useState } from 'react'
import { contactAPI } from '../api/axiosInstance'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  })
  const [status, setStatus] = useState('idle') 
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await contactAPI.submit(formData)
      setStatus('success')
      setMessage('Thank you! Your message has been sent successfully.')
      setFormData({ fullName: '', email: '', mobile: '', city: '' })

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage(error.response?.data?.message || 'Failed to send message. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-gradient max-w-md w-full">
      <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg flex gap-2 items-center">
          <CheckCircle size={20} className="text-green-400" />
          <p className="text-green-400 text-sm">{message}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg flex gap-2 items-center">
          <AlertCircle size={20} className="text-red-400" />
          <p className="text-red-400 text-sm">{message}</p>
        </div>
      )}

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-dark-200 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-dark-200 mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="john@example.com"
        />
      </div>

      {/* Mobile */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-dark-200 mb-2">
          Mobile *
        </label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* City */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-dark-200 mb-2">
          City *
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="New York"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
