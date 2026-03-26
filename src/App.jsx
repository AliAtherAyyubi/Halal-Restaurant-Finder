import { useState, useMemo } from 'react'
import { useRestaurants } from './hooks/useRestaurants'
import { getDistanceKm } from './utils/distance'
import Sidebar from './components/Sidebar'
import MapView from './components/MapView'
import RestaurantDetail from './components/RestaurantDetail'

export default function App() {
  const { restaurants, loading } = useRestaurants()
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const cuisines = useMemo(() => {
    const set = new Set(restaurants.map(r => r.cuisine).filter(Boolean))
    return [...set].sort()
  }, [restaurants])

  const filteredRestaurants = useMemo(() => {
    let list = restaurants
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(r =>
        r.name?.toLowerCase().includes(q) ||
        r.city?.toLowerCase().includes(q) ||
        r.cuisine?.toLowerCase().includes(q)
      )
    }
    if (selectedCuisine) {
      list = list.filter(r =>
        r.cuisine?.toLowerCase() === selectedCuisine.toLowerCase()
      )
    }
    if (userLocation) {
      list = [...list].sort((a, b) => {
        const da = getDistanceKm(userLocation.lat, userLocation.lng, a.latitude, a.longitude)
        const db = getDistanceKm(userLocation.lat, userLocation.lng, b.latitude, b.longitude)
        return da - db
      })
    }
    return list
  }, [restaurants, searchQuery, selectedCuisine, userLocation])

  const handleSelectRestaurant = (r) => {
    setSelectedRestaurant(r)
    setShowDetail(true)
  }

  const handleNearMe = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported.')
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      ()  => alert('Unable to retrieve your location.')
    )
  }

  return (
    <div className="grid h-screen overflow-hidden" style={{ gridTemplateColumns: '320px 1fr' }}>
      <Sidebar
        restaurants={filteredRestaurants}
        selectedRestaurant={selectedRestaurant}
        onSelectRestaurant={handleSelectRestaurant}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCuisine={selectedCuisine}
        onCuisineChange={setSelectedCuisine}
        cuisines={cuisines}
        userLocation={userLocation}
        onNearMe={handleNearMe}
        loading={loading}
      />

      <main className="relative overflow-hidden">
        <MapView
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          onSelectRestaurant={handleSelectRestaurant}
          userLocation={userLocation}
        />
        {showDetail && selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onClose={() => setShowDetail(false)}
            userLocation={userLocation}
          />
        )}
      </main>
    </div>
  )
}
