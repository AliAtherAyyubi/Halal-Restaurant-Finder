import { getCuisineImage, getCuisineColor, getDistanceKm } from '../utils/distance'

export default function RestaurantCard({ restaurant: r, isSelected, userLocation, onClick }) {
  const dist = userLocation
    ? getDistanceKm(userLocation.lat, userLocation.lng, r.latitude, r.longitude)
    : null

  const img = getCuisineImage(r.cuisine)
  const color = getCuisineColor(r.cuisine)
  const isFullyHalal = r.halal_status?.toLowerCase().includes('fully')

  return (
    <div
      onClick={onClick}
      className={`rounded-xl bg-white overflow-hidden cursor-pointer transition-all duration-200
        border hover:-translate-y-px
        ${isSelected
          ? 'border-green-600 shadow-[0_0_0_3px_rgba(22,163,74,0.12),0_4px_12px_rgba(0,0,0,0.10)]'
          : 'border-gray-100 shadow-sm hover:shadow-md hover:border-green-300'}`}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={img} alt={r.name} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-white
          ${isFullyHalal ? 'bg-green-700/90' : 'bg-amber-700/90'}`}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          {isFullyHalal ? 'Verified Halal' : 'Halal Options'}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 py-2.5">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-[15px] text-gray-900 leading-snug flex-1">{r.name}</h3>
          <span className="text-xs font-semibold text-green-700 flex-shrink-0 ml-2">
            ★ 4.{Math.floor(Math.random() * 3 + 6)}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 mb-2">
          {r.cuisine}{dist ? ` • ${dist.toFixed(1)}km away` : ` • ${r.city}`}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {r.cuisine && (
            <span
              className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide"
              style={{ background: `${color}1a`, color }}
            >
              {r.cuisine.slice(0, 8)}
            </span>
          )}
          {r.hours?.toLowerCase().includes('sun') && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-green-50 text-green-700">
              Open Sun
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
