import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard, FileText, Users, Mail, Plus, Edit2, Trash2, Eye, EyeOff, Moon, Sun } from 'lucide-react'
import { projectAPI, clientAPI, contactAPI, newsletterAPI, authAPI, uploadAPI } from '../api/axiosInstance'

export default function AdminPanel({ toggleTheme, darkMode }) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [contacts, setContacts] = useState([])
  const [newsletters, setNewsletters] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showClientModal, setShowClientModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingClient, setEditingClient] = useState(null)

  // Form states
  const [projectForm, setProjectForm] = useState({ name: '', description: '', image: '' })
  const [clientForm, setClientForm] = useState({ name: '', designation: '', description: '', image: '' })
  const [projectImageUploading, setProjectImageUploading] = useState(false)
  const [clientImageUploading, setClientImageUploading] = useState(false)

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authAPI.verify()
        loadData()
      } catch (error) {
        navigate('/admin/login')
      }
    }
    checkAuth()
  }, [navigate])

  const loadData = async () => {
    try {
      setLoading(true)
      const [proj, cli, cont, news] = await Promise.all([
        projectAPI.getAll(),
        clientAPI.getAll(),
        contactAPI.getAll(),
        newsletterAPI.getAll()
      ])
      setProjects(proj.data)
      setClients(cli.data)
      setContacts(cont.data)
      setNewsletters(news.data)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImageAndSet = async (file, setUploading, onSuccess) => {
    if (!file) return
    try {
      setUploading(true)
      const res = await uploadAPI.uploadImage(file)
      onSuccess(res.data.url)
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Failed to upload and crop image. Please try again with a valid image file.')
    } finally {
      setUploading(false)
    }
  }

  const handleProjectImageUpload = (file) =>
    uploadImageAndSet(file, setProjectImageUploading, (url) =>
      setProjectForm((prev) => ({ ...prev, image: url }))
    )

  const handleClientImageUpload = (file) =>
    uploadImageAndSet(file, setClientImageUploading, (url) =>
      setClientForm((prev) => ({ ...prev, image: url }))
    )

  // Project handlers
  const handleAddProject = () => {
    setEditingProject(null)
    setProjectForm({ name: '', description: '', image: '' })
    setShowProjectModal(true)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setProjectForm(project)
    setShowProjectModal(true)
  }

  const handleSaveProject = async () => {
    try {
      if (editingProject) {
        await projectAPI.update(editingProject._id, projectForm)
      } else {
        await projectAPI.create(projectForm)
      }
      setShowProjectModal(false)
      loadData()
    } catch (error) {
      alert('Failed to save project')
    }
  }

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id)
        loadData()
      } catch (error) {
        alert('Failed to delete project')
      }
    }
  }

  // Client handlers
  const handleAddClient = () => {
    setEditingClient(null)
    setClientForm({ name: '', designation: '', description: '', image: '' })
    setShowClientModal(true)
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setClientForm(client)
    setShowClientModal(true)
  }

  const handleSaveClient = async () => {
    try {
      if (editingClient) {
        await clientAPI.update(editingClient._id, clientForm)
      } else {
        await clientAPI.create(clientForm)
      }
      setShowClientModal(false)
      loadData()
    } catch (error) {
      alert('Failed to save client')
    }
  }

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientAPI.delete(id)
        loadData()
      } catch (error) {
        alert('Failed to delete client')
      }
    }
  }

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactAPI.delete(id)
        loadData()
      } catch (error) {
        alert('Failed to delete contact')
      }
    }
  }

  const handleDeleteNewsletter = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await newsletterAPI.delete(id)
        loadData()
      } catch (error) {
        alert('Failed to delete subscriber')
      }
    }
  }

  const handleLogout = () => {
    authAPI.logout()
    navigate('/admin/login')
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'newsletters', label: 'Newsletters', icon: Mail }
  ]

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <p className="text-dark-300">Loading admin panel...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 text-dark-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-full sm:w-64 bg-dark-800 border-r border-dark-700 transform transition-transform duration-300 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 p-4 sm:p-6 border-b border-dark-700">
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm sm:text-base">C</span>
          </div>
          <span className="font-bold text-sm sm:text-lg text-white">ConBuilder</span>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base ${
                activeTab === item.id
                  ? 'bg-gradient-primary text-white'
                  : 'text-dark-300 hover:bg-dark-700'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-dark-700 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-dark-300 hover:bg-dark-700 transition text-sm sm:text-base"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>Toggle Theme</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition text-sm sm:text-base"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-dark-800 border-b border-dark-700 p-3 sm:p-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-dark-700 hover:bg-dark-600 flex-shrink-0"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent truncate">
            {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
          </h1>
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 text-xs sm:text-base">
            <span className="font-bold">A</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                <div className="card-gradient p-3 sm:p-4">
                  <p className="text-dark-300 text-xs sm:text-sm mb-1 sm:mb-2">Total Projects</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-400">{projects.length}</p>
                </div>
                <div className="card-gradient p-3 sm:p-4">
                  <p className="text-dark-300 text-xs sm:text-sm mb-1 sm:mb-2">Happy Clients</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-500">{clients.length}</p>
                </div>
                <div className="card-gradient p-3 sm:p-4">
                  <p className="text-dark-300 text-xs sm:text-sm mb-1 sm:mb-2">Contact Submissions</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400">{contacts.length}</p>
                </div>
                <div className="card-gradient p-3 sm:p-4">
                  <p className="text-dark-300 text-xs sm:text-sm mb-1 sm:mb-2">Newsletter Subscribers</p>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400">{newsletters.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="card-gradient p-3 sm:p-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Recent Projects</h3>
                  <div className="space-y-2">
                    {projects.slice(0, 5).map(project => (
                      <div key={project._id} className="p-2 sm:p-3 bg-dark-700 rounded-lg">
                        <p className="font-semibold text-white text-sm sm:text-base">{project.name}</p>
                        <p className="text-xs sm:text-sm text-dark-300 line-clamp-2">{project.description}</p>
                      </div>
                    ))}
                    {projects.length === 0 && <p className="text-dark-300 text-sm">No projects yet</p>}
                  </div>
                </div>

                <div className="card-gradient p-3 sm:p-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Recent Contacts</h3>
                  <div className="space-y-2">
                    {contacts.slice(0, 5).map(contact => (
                      <div key={contact._id} className="p-2 sm:p-3 bg-dark-700 rounded-lg">
                        <p className="font-semibold text-white text-sm sm:text-base">{contact.fullName}</p>
                        <p className="text-xs sm:text-sm text-dark-300">{contact.email}</p>
                      </div>
                    ))}
                    {contacts.length === 0 && <p className="text-dark-300 text-sm">No contacts yet</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Projects Management</h2>
                <button
                  onClick={handleAddProject}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base"
                >
                  <Plus size={20} />
                  Add Project
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="card-gradient text-center py-8 sm:py-12">
                  <p className="text-dark-300 mb-4 text-sm sm:text-base">No projects yet. Create your first project!</p>
                  <button
                    onClick={handleAddProject}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Create Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {projects.map(project => (
                    <div key={project._id} className="card-gradient p-3 sm:p-4">
                      <img
                        src={project.image || 'https://via.placeholder.com/400x300?text=Project'}
                        alt={project.name}
                        className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4"
                      />
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">{project.name}</h3>
                      <p className="text-dark-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="flex-1 flex items-center justify-center gap-2 px-2 sm:px-3 py-2 bg-primary-600/20 border border-primary-500/50 text-primary-400 rounded-lg hover:bg-primary-600/40 transition text-xs sm:text-sm"
                        >
                          <Edit2 size={16} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/40 transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Clients */}
          {activeTab === 'clients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Clients Management</h2>
                <button
                  onClick={handleAddClient}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={20} />
                  Add Client
                </button>
              </div>

              {clients.length === 0 ? (
                <div className="card-gradient text-center py-12">
                  <p className="text-dark-300 mb-4">No clients yet. Add your first client!</p>
                  <button
                    onClick={handleAddClient}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add Client
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clients.map(client => (
                    <div key={client._id} className="card-gradient text-center">
                      <img
                        src={client.image || 'https://via.placeholder.com/80x80?text=Client'}
                        alt={client.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-primary-500"
                      />
                      <h3 className="text-lg font-bold text-white mb-1">{client.name}</h3>
                      <p className="text-primary-400 text-sm font-semibold mb-3">{client.designation}</p>
                      <p className="text-dark-300 text-sm mb-4 italic">{client.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClient(client)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-600/20 border border-primary-500/50 text-primary-400 rounded-lg hover:bg-primary-600/40 transition"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client._id)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-600/40 transition"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Contacts */}
          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>

              {contacts.length === 0 ? (
                <div className="card-gradient text-center py-12">
                  <p className="text-dark-300">No contact submissions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Email</th>
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Mobile</th>
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">City</th>
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Date</th>
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map(contact => (
                        <tr key={contact._id} className="border-b border-dark-700 hover:bg-dark-800/50 transition">
                          <td className="px-4 py-3">{contact.fullName}</td>
                          <td className="px-4 py-3 text-primary-400">{contact.email}</td>
                          <td className="px-4 py-3">{contact.mobile}</td>
                          <td className="px-4 py-3">{contact.city}</td>
                          <td className="px-4 py-3 text-sm text-dark-300">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDeleteContact(contact._id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Newsletters */}
          {activeTab === 'newsletters' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Newsletter Subscribers</h2>

              {newsletters.length === 0 ? (
                <div className="card-gradient text-center py-12">
                  <p className="text-dark-300">No newsletter subscribers yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Email</th>
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Subscribed Date</th>
                        <th className="px-4 py-3 text-left text-dark-200 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsletters.map(newsletter => (
                        <tr key={newsletter._id} className="border-b border-dark-700 hover:bg-dark-800/50 transition">
                          <td className="px-4 py-3 text-primary-400">{newsletter.email}</td>
                          <td className="px-4 py-3 text-sm text-dark-300">
                            {new Date(newsletter.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDeleteNewsletter(newsletter._id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="card-gradient max-w-md w-full max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <div className="space-y-4 pb-2">
              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Project Name *</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Description *</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="input-field resize-none h-24"
                  placeholder="Project description"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-dark-200 mb-2">Upload & Crop (450x350)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProjectImageUpload(e.target.files?.[0])}
                    className="input-field"
                  />
                  {projectImageUploading && (
                    <p className="text-xs text-dark-300 mt-1">Uploading & cropping...</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-200 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-dark-400 mt-1">Upload to enforce 450x350 crop; URLs are saved as provided.</p>
                </div>

                {projectForm.image && (
                  <img
                    src={projectForm.image}
                    alt="Project preview"
                    className="w-full h-44 object-cover rounded-lg border border-dark-700"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="flex-1 btn-primary"
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="card-gradient max-w-md w-full max-h-[85vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingClient ? 'Edit Client' : 'Add New Client'}
            </h2>

            <div className="space-y-4 pb-2">
              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Client Name *</label>
                <input
                  type="text"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Designation *</label>
                <input
                  type="text"
                  value={clientForm.designation}
                  onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                  className="input-field"
                  placeholder="Job title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-dark-200 mb-2">Testimonial *</label>
                <textarea
                  value={clientForm.description}
                  onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                  className="input-field resize-none h-24"
                  placeholder="Client testimonial"
                />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-dark-200 mb-2">Upload & Crop (450x350)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleClientImageUpload(e.target.files?.[0])}
                    className="input-field"
                  />
                  {clientImageUploading && (
                    <p className="text-xs text-dark-300 mt-1">Uploading & cropping...</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-200 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={clientForm.image}
                    onChange={(e) => setClientForm({ ...clientForm, image: e.target.value })}
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-dark-400 mt-1">Upload to enforce 450x350 crop; URLs are saved as provided.</p>
                </div>

                {clientForm.image && (
                  <img
                    src={clientForm.image}
                    alt="Client preview"
                    className="w-full h-36 object-cover rounded-lg border border-dark-700"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowClientModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClient}
                  className="flex-1 btn-primary"
                >
                  Save Client
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
