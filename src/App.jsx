import { useState, useMemo, useEffect } from 'react'
import { useRestaurants } from './hooks/useRestaurants'
import { getDistanceKm } from './utils/distance'
import Navbar from './components/Navbar'
import MenuSidebar from './components/MenuSidebar'
import RestaurantList from './components/RestaurantList'
import MapView from './components/MapView'
import DetailPage from './components/DetailPage'

export default function App() {
  const { restaurants, loading } = useRestaurants()
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const [activeMenu, setActiveMenu] = useState('restaurants')
  const [userLocation, setUserLocation] = useState(null)

  const cuisines = useMemo(() => {
    const set = new Set(restaurants.map(r => r.cuisine).filter(Boolean))
    return [...set].sort()
  }, [restaurants])
  ///////////
  // get permission to access user location
useEffect(() => {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    () => console.log('Location permission denied.')
  )
}, []) 
////////////
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

  const handleNearMe = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported.')
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert('Unable to retrieve your location.')
    )
  }

  // Click on card → only selects + flies map, no detail page
  const handleSelectRestaurant = (r) => {
    setSelectedRestaurant(r)
  }

  // Click "View Full Details" inside SelectedCard → opens DetailPage
  const handleViewDetail = (r) => {
    setSelectedRestaurant(r)
    setShowDetail(true)
  }

  // Full screen detail page
  if (showDetail && selectedRestaurant) {
    return (
      <DetailPage
        restaurant={selectedRestaurant}
        onBack={() => setShowDetail(false)}
        userLocation={userLocation}
      />
    )
  }


  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#e8f0e8]">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNearMe={handleNearMe}
      />

      <div className="flex flex-1 overflow-hidden">
        <MenuSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        <RestaurantList
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          onSelectRestaurant={handleSelectRestaurant}
          selectedCuisine={selectedCuisine}
          onCuisineChange={setSelectedCuisine}
          cuisines={cuisines}
          userLocation={userLocation}
          loading={loading}
        />

        <div className="flex-1 relative overflow-hidden">
          <MapView
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={handleSelectRestaurant}
            userLocation={userLocation}
            onNearMe={handleNearMe}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>
    </div>
  )
}