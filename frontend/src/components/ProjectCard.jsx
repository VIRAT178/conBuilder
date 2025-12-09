export default function ProjectCard({ project, onReadMore }) {
  return (
    <div className="card-gradient group cursor-pointer h-full flex flex-col">
      <div className="relative mb-4 h-48 rounded-xl overflow-hidden">
        <img
          src={project.image || 'https://via.placeholder.com/400x300?text=Project'}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition">
        {project.name}
      </h3>
      <p className="text-dark-300 text-sm mb-4 flex-grow">
        {project.description}
      </p>

      {/* Button */}
      <button
        onClick={() => onReadMore(project._id)}
        className="w-full px-4 py-2 bg-primary-600/20 border border-primary-500/50 text-primary-400 rounded-lg font-semibold hover:bg-primary-600/40 transition duration-300"
      >
        Read More →
      </button>
    </div>
  )
}
