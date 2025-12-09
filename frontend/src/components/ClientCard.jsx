import { Star } from 'lucide-react'

export default function ClientCard({ client }) {
  return (
    <div className="card-gradient flex flex-col">
      {/* Image */}
      <div className="mb-4 w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-primary-500">
        <img
          src={client.image || 'https://via.placeholder.com/80x80?text=Client'}
          alt={client.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <h4 className="text-lg font-bold text-white text-center mb-1">
        {client.name}
      </h4>
      <p className="text-primary-400 text-sm text-center mb-3 font-semibold">
        {client.designation}
      </p>

      {/* Rating */}
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-accent-500 text-accent-500" />
        ))}
      </div>

      {/* Testimonial */}
      <p className="text-dark-300 text-sm text-center italic flex-grow">
        "{client.testimonial || client.description}"
      </p>
    </div>
  )
}
