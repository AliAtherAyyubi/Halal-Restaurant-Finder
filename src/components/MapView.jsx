import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { formatDriveTime, getDistanceKm } from '../utils/distance'
import { CarFront, Clock, LocateFixed, Navigation, Phone, UtensilsCrossed } from 'lucide-react'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// function createPin(color, isSelected, name) {
//   const size = isSelected ? 36 : 28
//   const svg = isSelected
//     ? `<div style="display:flex;align-items:center;gap:6px;background:#1a3d1a;color:white;
//                   padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;
//                   white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-family:sans-serif;">
//          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
//            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
//          </svg>
//          ${name}
//        </div>`
//     : `<svg width="${size}" height="${size+8}" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
//          <filter id="s${size}"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter>
//          <path d="M15 2C9.48 2 5 6.48 5 12c0 7.5 10 22 10 22s10-14.5 10-22c0-5.52-4.48-10-10-10z"
//            fill="${color}" stroke="white" stroke-width="1.5" filter="url(#s${size})"/>
//          <circle cx="15" cy="12" r="4" fill="white" opacity="0.95"/>
//        </svg>`

//   const w = isSelected ? 160 : size
//   const h = isSelected ? 32 : size + 8
//   return L.divIcon({
//     html: svg, className: '',
//     iconSize: [w, h],
//     iconAnchor: isSelected ? [80, h] : [w / 2, h],
//     popupAnchor: [0, -h],
//   })
// }

// the FlyTo component with a simple useEffect inside MapView that listens to changes in selectedRestaurant and userLocation, and calls map.flyTo accordingly. This way we avoid the complexity of an extra component and potential issues with map instance access.
function FlyTo({ restaurant, userLocation }) {
  const map = useMap()

  useEffect(() => {
    if (restaurant) {
      map.flyTo([restaurant.latitude, restaurant.longitude], 14, { duration: 1 })
    }
  }, [restaurant, map])

  useEffect(() => {
    if (userLocation && !restaurant) {
      // Only fly to user location if no restaurant is selected
      map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.5 })
    }
  }, [userLocation, map])

  return null
}

function ZoomControls({ onNearMe }) {
  const map = useMap()
  return (
    <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-2">
      <button onClick={() => map.zoomIn()}
        className="w-9 h-9 bg-white rounded-lg shadow flex items-center justify-center
                   text-xl text-gray-700 hover:bg-gray-50 font-light border border-gray-200">+</button>
      <button onClick={() => map.zoomOut()}
        className="w-9 h-9 bg-white rounded-lg shadow flex items-center justify-center
                   text-xl text-gray-700 hover:bg-gray-50 font-light border border-gray-200">−</button>
      <button onClick={onNearMe}
        className="w-9 h-9 bg-black rounded-lg shadow flex items-center justify-center
                   text-white  mt-1">
        <LocateFixed size={19} />
      </button>
    </div>
  )
}

function SelectedCard({ restaurant, userLocation, onSelect, onViewDetail }) {
  if (!restaurant) return null
  const dist = userLocation
    ? getDistanceKm(userLocation.lat, userLocation.lng, restaurant.latitude, restaurant.longitude)
    : null
  const driveTime = formatDriveTime(dist)

  return (
    <div className="absolute top-4 right-4 z-[1000] min-w-72 bg-[#e1e6e1]/90 rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className='bg-black p-3 rounded-xl shadow-lg '>
          <UtensilsCrossed size={25} color='white' />
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-widest text-gray-700 uppercase mb-1">Selected Result</p>
          <h3 className="font-bold text-[20px] text-gray-900">{restaurant.name}</h3>
        </div>

      </div>

      <div className="space-y-3 mb-4">
        {restaurant.hours && (
          <div className="flex items-center gap-3 text-[14px] text-gray-600">
            <Clock size={16} color='black' />
            <span>Open until {restaurant.hours?.match(/\d+:\d+/g)?.[1] || '22:00'}</span>
          </div>
        )}
        {restaurant.phone && (
          <div className="flex items-center gap-3 text-[14px] text-gray-600">
            <Phone size={16} color='black' />
            <span>{restaurant.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[14px] text-gray-600">
          <CarFront size={16} color='black' />
          {dist !== null
            ? <span>{driveTime} • {dist.toFixed(1)} km away</span>
            : <span>{restaurant.city}, Finland</span>
          }
        </div>
      </div>
      <button
        onClick={() => onViewDetail(restaurant)}
        className="w-full py-2 mb-2 border border-green-600 text-green-700 text-[14px]
                   font-semibold rounded-xl hover:bg-green-50 transition-colors"
      >
        View Full Details
      </button>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-black text-white
                   text-[14px] font-semibold rounded-xl shadow-lg no-underline"
      >
        <Navigation size={16} color='white' />
        Get Directions
      </a>
    </div>
  )
}

export default function MapView({ restaurants, selectedRestaurant, onSelectRestaurant, userLocation, onNearMe, onViewDetail, hideSelectedCard = false }) {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[64.9631, 27.5959]} zoom={6}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {restaurants.map(r => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
            eventHandlers={{
              click: () => onSelectRestaurant(r)
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -20]}
              opacity={1}
              sticky={true} // Follows the mouse slightly for a smoother feel
            >
              <div className="">
                <div className="font-bold text-lg text-black-600">{r.name}</div>
                <div className="text-gray-500 text-sm">{r.city}</div>
              </div>
            </Tooltip>
          </Marker>
        ))}

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            

          />
        )}

        <FlyTo restaurant={selectedRestaurant} userLocation={userLocation} />
        <ZoomControls onNearMe={onNearMe} />
      </MapContainer>

      {/* Selected restaurant card overlay */}
      {!hideSelectedCard && (
        <SelectedCard
          restaurant={selectedRestaurant}
          userLocation={userLocation}
          onSelect={onSelectRestaurant}
          onViewDetail={onViewDetail}
        />
      )}
    </div>
  )
}
