import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getCuisineColor, getDistanceKm } from '../utils/distance'
import { CarFront, Clock, Navigation, Phone, UtensilsCrossed } from 'lucide-react'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createPin(color, isSelected, name) {
  const size = isSelected ? 36 : 28
  const svg = isSelected
    ? `<div style="display:flex;align-items:center;gap:6px;background:#1a3d1a;color:white;
                  padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;
                  white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-family:sans-serif;">
         <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
         </svg>
         ${name}
       </div>`
    : `<svg width="${size}" height="${size+8}" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
         <filter id="s${size}"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.25"/></filter>
         <path d="M15 2C9.48 2 5 6.48 5 12c0 7.5 10 22 10 22s10-14.5 10-22c0-5.52-4.48-10-10-10z"
           fill="${color}" stroke="white" stroke-width="1.5" filter="url(#s${size})"/>
         <circle cx="15" cy="12" r="4" fill="white" opacity="0.95"/>
       </svg>`

  const w = isSelected ? 160 : size
  const h = isSelected ? 32 : size + 8
  return L.divIcon({
    html: svg, className: '',
    iconSize: [w, h],
    iconAnchor: isSelected ? [80, h] : [w / 2, h],
    popupAnchor: [0, -h],
  })
}

function FlyTo({ restaurant, userLocation }) {
  const map = useMap()
  useEffect(() => {
    if (restaurant) map.flyTo([restaurant.latitude, restaurant.longitude], 14, { duration: 1 })
  }, [restaurant, map])
  useEffect(() => {
    if (userLocation) map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.5 })
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
        className="w-9 h-9 bg-green-700 rounded-lg shadow flex items-center justify-center
                   text-white hover:bg-green-800 mt-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06z"/>
        </svg>
      </button>
    </div>
  )
}

function SelectedCard({ restaurant, userLocation, onSelect }) {
  if (!restaurant) return null
  const dist = userLocation
    ? getDistanceKm(userLocation.lat, userLocation.lng, restaurant.latitude, restaurant.longitude)
    : null

  return (
    <div className="absolute top-4 right-4 z-[1000] w-74 bg-[#e1e6e1]/90 rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className='bg-black p-3 rounded-xl shadow-lg '>
          <UtensilsCrossed size={25} color='white' />
        </div>
        <div>
          <p className="text-[9px] font-bold tracking-widest text-gray-700 uppercase mb-1">Selected Result</p>
          <h3 className="font-bold text-[16px] text-gray-900">{restaurant.name}</h3>
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
            <Phone size={16} color='black'/>
            <span>{restaurant.phone}</span>
          </div>
        )}
        {dist && (
          <div className="flex items-center gap-2 text-[12px] text-gray-600">
            <CarFront size={16} color='black' />
            <span>4 min • {dist.toFixed(1)}km</span>
          </div>
        )}
      </div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-black text-white
                   text-[14px] font-semibold rounded-xl shadow-lg no-underline"
      >
        <Navigation size={16} color='white'/>
        Get Directions
      </a>
    </div>
  )
}

export default function MapView({ restaurants, selectedRestaurant, onSelectRestaurant, userLocation, onNearMe }) {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[64.9631, 27.5959]} zoom={6}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          maxZoom={19}
        />

        {restaurants.map(r => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
            icon={createPin(getCuisineColor(r.cuisine), selectedRestaurant?.id === r.id, r.name)}
            eventHandlers={{ click: () => onSelectRestaurant(r) }}
          />
        ))}

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              html: `<div style="width:14px;height:14px;background:#3b82f6;border:3px solid white;
                     border-radius:50%;box-shadow:0 0 0 4px rgba(59,130,246,0.25)"></div>`,
              className: '', iconSize: [14, 14], iconAnchor: [7, 7],
            })}
          />
        )}

        <FlyTo restaurant={selectedRestaurant} userLocation={userLocation} />
        <ZoomControls onNearMe={onNearMe} />
      </MapContainer>

      {/* Selected restaurant card overlay */}
      <SelectedCard
        restaurant={selectedRestaurant}
        userLocation={userLocation}
        onSelect={onSelectRestaurant}
      />
    </div>
  )
}
