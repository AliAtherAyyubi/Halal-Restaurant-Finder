import { BadgeCheck } from 'lucide-react'
import { getCuisineImage, getDistanceKm } from '../utils/distance'

function RestaurantCard({ restaurant: r, isSelected, userLocation, onClick }) {
  const dist = userLocation
    ? getDistanceKm(userLocation.lat, userLocation.lng, r.latitude, r.longitude)
    : null
  const img = getCuisineImage(r.cuisine)
  const isFullyHalal = r.halal_status?.toLowerCase().includes('fully')
  const rating = r.rating || '4.0'
const reviewCount = r.review_count || ''

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 mb-8
        ${isSelected ? 'ring-2 ring-green-600 shadow-lg' : 'shadow-sm hover:shadow-md hover:-translate-y-0.5'}`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={r.image || getCuisineImage(r.cuisine)}
          alt={r.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = getCuisineImage(r.cuisine) }}
        />
        {isFullyHalal && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1
                           bg-[#0e4b3c] text-white text-[10px]  font-bold rounded-full uppercase tracking-wide">
            <BadgeCheck size={16} />
            Verified Halal
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-[15px] text-gray-900">{r.name}</h3>
          <span className="flex items-center gap-1 bg-[#b9f0aa] text-[12px] font-semibold text-black px-2 rounded-md">
            ★ {rating}
          
          </span>
        </div>
        <p className="text-[12px] text-gray-500 mb-3">
          {r.cuisine && `${r.cuisine} Cuisine`}
          {dist ? ` • ${dist.toFixed(1)}km away` : r.city ? ` • ${r.city}` : ''}
        </p>
        <div className="flex gap-2 flex-wrap">
          {r.cuisine && (
            <span className="px-2.5 py-1 bg-[#cde6c3] text-gray-600 text-[11px] font-medium rounded-md uppercase tracking-wide">
              {r.cuisine.slice(0, 10)}
            </span>
          )}
          {r.hours?.toLowerCase().includes('sun') && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-md uppercase tracking-wide">
              Dining
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RestaurantList({
  restaurants, selectedRestaurant, onSelectRestaurant,
  selectedCuisine, onCuisineChange, cuisines, userLocation, loading
}) {
  const quickFilters = ['Turkish', 'Arab', 'Pakistani','Syrian','Lebanese','Uyghur','Indian','Iraqi','Middle Eastern', 'Open Now']

  return (
    <div className="w-1/4 flex flex-col bg-[#ebf5eb] border-r border-green-100/50 flex-shrink-0 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Top Halal Restaurants</h2>

        {/* Quick filter chips */}
        <div className="flex gap-2 flex-wrap">
          {quickFilters.map(f => {
            const isActive = selectedCuisine === f
            return (
              <button
                key={f}
                onClick={() => onCuisineChange(isActive ? '' : f)}
                className={`px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-all
                  ${isActive
                    ? 'bg-black text-white'
                    : 'bg-[#e1e6e1] text-black border border-gray-200 hover:border-green-[#cdfae1] hover:text-green-700'}`}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Scrollable cards */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-green-600 rounded-full animate-spin mb-3" />
            <p className="text-sm">Loading restaurants…</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium text-gray-600 mb-1">No restaurants found</p>
            <p className="text-sm">Try a different filter</p>
          </div>
        ) : (
          restaurants.map(r => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              isSelected={selectedRestaurant?.id === r.id}
              userLocation={userLocation}
              onClick={() => onSelectRestaurant(r)}
            />
          ))
        )}
      </div>
    </div>
  )
}
