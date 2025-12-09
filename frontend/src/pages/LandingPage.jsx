import { useState, useEffect } from 'react'
import { ArrowRight, Zap, Users, Palette } from 'lucide-react'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import ClientCard from '../components/ClientCard'
import ContactForm from '../components/ContactForm'
import NewsletterSubscription from '../components/NewsletterSubscription'
import { projectAPI, clientAPI } from '../api/axiosInstance'

export default function LandingPage({ toggleTheme, darkMode }) {
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [loadingClients, setLoadingClients] = useState(true)

  useEffect(() => {
    // Fetch projects
    projectAPI.getAll()
      .then(res => setProjects(res.data))
      .catch(err => console.error('Failed to fetch projects:', err))
      .finally(() => setLoadingProjects(false))

    // Fetch clients
    clientAPI.getAll()
      .then(res => setClients(res.data))
      .catch(err => console.error('Failed to fetch clients:', err))
      .finally(() => setLoadingClients(false))
  }, [])

  const handleReadMore = (projectId) => {
    alert(`Project ID: ${projectId}`)
  }

  return (
    <div className="bg-dark-900 text-dark-50 min-h-screen">
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Build Your Digital
                </span>
                <br />
                <span className="text-white">Presence</span>
              </h1>
              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-dark-300 mb-6 sm:mb-8 leading-relaxed">
                Create stunning projects, manage clients, and grow your business with our modern platform. 
                Professional design meets powerful functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="btn-primary flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={20} />
                </button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-primary-500/30 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=800&fit=crop" 
                  alt="Construction site" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent text-center mb-2 sm:mb-4">Why Choose Us</h2>
          <p className="text-sm sm:text-base md:text-lg text-dark-300 max-w-2xl mx-auto text-center mb-8 sm:mb-12">
            Everything you need to succeed in one platform
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized performance for the best user experience'
              },
              {
                icon: Users,
                title: 'Client Focused',
                description: 'Manage all your client relationships in one place'
              },
              {
                icon: Palette,
                title: 'Beautiful Design',
                description: 'Modern, responsive interfaces that impress'
              }
            ].map((feature, idx) => (
              <div key={idx} className="card-gradient text-center">
                <feature.icon size={48} className="text-primary-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-dark-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="section-subtitle mb-12">
            Explore our latest work and success stories
          </p>

          {loadingProjects ? (
            <div className="text-center py-12">
              <p className="text-dark-300">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="card-gradient text-center py-12">
              <p className="text-dark-300">No projects available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {projects.map(project => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-4">Happy Clients</h2>
          <p className="text-sm sm:text-base md:text-lg text-dark-300 max-w-2xl mx-auto text-center mb-8 sm:mb-12">
            What our clients say about working with us
          </p>

          {loadingClients ? (
            <div className="text-center py-12">
              <p className="text-dark-300">Loading clients...</p>
            </div>
          ) : clients.length === 0 ? (
            <div className="card-gradient text-center py-12">
              <p className="text-dark-300">No client testimonials yet. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {clients.map(client => (
                <ClientCard key={client._id} client={client} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3 sm:mb-4">Get In Touch</h2>
              <p className="text-sm sm:text-base md:text-lg text-dark-300 max-w-2xl mb-6 sm:mb-8">
                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-dark-300 text-xs sm:text-sm">📧 Email</p>
                  <p className="text-white font-semibold text-sm sm:text-base">hello@conbuilder.com</p>
                </div>
                <div>
                  <p className="text-dark-300 text-xs sm:text-sm">📱 Phone</p>
                  <p className="text-white font-semibold text-sm sm:text-base">+1 (555) 000-0000</p>
                </div>
                <div>
                  <p className="text-dark-300 text-xs sm:text-sm">📍 Location</p>
                  <p className="text-white font-semibold text-sm sm:text-base">San Francisco, CA</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-2 flex justify-center">
          <NewsletterSubscription />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8 sm:py-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-white mb-3">ConBuilder</h4>
              <p className="text-dark-300 text-xs sm:text-sm">Your platform for digital excellence</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-white mb-3">Products</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-dark-300">
                <li><a href="#" className="hover:text-primary-400">Features</a></li>
                <li><a href="#" className="hover:text-primary-400">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-400">Security</a></li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-dark-300">
                <li><a href="#" className="hover:text-primary-400">About</a></li>
                <li><a href="#" className="hover:text-primary-400">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400">Careers</a></li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-dark-300">
                <li><a href="#" className="hover:text-primary-400">Privacy</a></li>
                <li><a href="#" className="hover:text-primary-400">Terms</a></li>
                <li><a href="#" className="hover:text-primary-400">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-800 pt-6 sm:pt-8 text-center text-dark-400 text-xs sm:text-sm">
            <p>&copy; 2024 ConBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
