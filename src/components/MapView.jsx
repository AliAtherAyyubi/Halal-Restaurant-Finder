import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { getCuisineColor } from '../utils/distance'

// Fix Leaflet default icon paths in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createColoredPin(color, isSelected = false) {
  const size = isSelected ? 38 : 30
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 30 38" xmlns="http://www.w3.org/2000/svg">
      <filter id="shadow"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/></filter>
      <path d="M15 2C9.48 2 5 6.48 5 12c0 7.5 10 22 10 22s10-14.5 10-22c0-5.52-4.48-10-10-10z"
        fill="${color}" stroke="white" stroke-width="2" filter="url(#shadow)"/>
      <circle cx="15" cy="12" r="4" fill="white" opacity="0.9"/>
    </svg>`
  return L.divIcon({
    html: svg, className: '',
    iconSize: [size, size + 8], iconAnchor: [size / 2, size + 8], popupAnchor: [0, -(size + 8)],
  })
}

function FlyToRestaurant({ restaurant }) {
  const map = useMap()
  useEffect(() => {
    if (restaurant) map.flyTo([restaurant.latitude, restaurant.longitude], 14, { duration: 1 })
  }, [restaurant, map])
  return null
}

function FlyToUser({ userLocation }) {
  const map = useMap()
  useEffect(() => {
    if (userLocation) map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.5 })
  }, [userLocation, map])
  return null
}

function UserMarker({ userLocation }) {
  const icon = L.divIcon({
    html: `<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(59,130,246,0.3)"></div>`,
    className: '', iconSize: [16, 16], iconAnchor: [8, 8],
  })
  if (!userLocation) return null
  return <Marker position={[userLocation.lat, userLocation.lng]} icon={icon} />
}

function ZoomControl() {
  const map = useMap()
  return (
    <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-1">
      {[
        { label: '+', action: () => map.zoomIn() },
        { label: '−', action: () => map.zoomOut() },
        { label: null, action: () => map.flyTo([64.9631, 27.5959], 6, { duration: 1 }) },
      ].map(({ label, action }, i) => (
        <button
          key={i} onClick={action}
          className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center
                     text-gray-600 text-xl font-light shadow-sm
                     hover:bg-green-50 hover:border-green-400 transition-colors"
          style={i === 2 ? { marginTop: '4px' } : {}}
        >
          {label ?? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06z"/>
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

export default function MapView({ restaurants, selectedRestaurant, onSelectRestaurant, userLocation }) {
  return (
    <div className="w-full h-full">
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
        <ZoomControl />

        {restaurants.map(r => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
            icon={createColoredPin(getCuisineColor(r.cuisine), selectedRestaurant?.id === r.id)}
            eventHandlers={{ click: () => onSelectRestaurant(r) }}
          >
            <Popup>
              <div className="p-3 min-w-[150px]">
                <strong className="block text-sm text-gray-900 mb-0.5">{r.name}</strong>
                <span className="block text-xs text-gray-400 mb-2">{r.city}</span>
                <button
                  onClick={() => onSelectRestaurant(r)}
                  className="w-full py-1.5 bg-green-700 text-white text-xs font-semibold
                             rounded-lg hover:bg-green-800 transition-colors"
                >
                  View details →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <UserMarker userLocation={userLocation} />
        <FlyToRestaurant restaurant={selectedRestaurant} />
        <FlyToUser userLocation={userLocation} />
      </MapContainer>
    </div>
  )
}
