import { useState } from 'react'
import { newsletterAPI } from '../api/axiosInstance'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await newsletterAPI.subscribe(email)
      setStatus('success')
      setMessage('Successfully subscribed to our newsletter!')
      setEmail('')

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage(error.response?.data?.message || 'Failed to subscribe. Please try again.')
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <Mail size={24} className="text-primary-400" />
        <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
      </div>
      <p className="text-dark-300 mb-6">Get the latest updates delivered to your inbox.</p>

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

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="input-field flex-grow"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}
