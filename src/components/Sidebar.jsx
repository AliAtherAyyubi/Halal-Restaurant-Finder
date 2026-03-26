import { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import SearchBar from './SearchBar'
import CuisineFilter from './CuisineFilter'

export default function Sidebar({
  restaurants, selectedRestaurant, onSelectRestaurant,
  searchQuery, onSearchChange, selectedCuisine, onCuisineChange,
  cuisines, userLocation, onNearMe, loading,
}) {
  const [activeNav, setActiveNav] = useState('discover')
  const tabs = ['discover', 'favorites', 'recent']

  return (
    <aside className="flex flex-col bg-white border-r border-gray-100 overflow-hidden z-10">

      {/* Brand + Nav */}
      <div className="px-4 pt-3.5 pb-0 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <span className="block font-serif text-base text-gray-900 leading-tight">Verdant Halal</span>
            <span className="block text-[10px] font-semibold text-green-600 uppercase tracking-wider">Halal Finder Finland</span>
          </div>
        </div>

        <nav className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveNav(tab)}
              className={`px-2.5 py-2 text-[13px] font-medium border-b-2 transition-colors
                ${activeNav === tab
                  ? 'text-green-700 border-green-700'
                  : 'text-gray-400 border-transparent hover:text-gray-600'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Search + Near Me */}
      <div className="flex gap-2 items-center px-4 pt-3 pb-1 flex-shrink-0">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        <button
          onClick={onNearMe}
          className="flex items-center gap-1.5 px-3 py-2 bg-green-700 text-white text-xs font-semibold
                     rounded-lg whitespace-nowrap flex-shrink-0 hover:bg-green-800 active:scale-95 transition-all"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06z"/>
          </svg>
          Near Me
        </button>
      </div>

      {/* Cuisine chips */}
      <CuisineFilter cuisines={cuisines} selected={selectedCuisine} onChange={onCuisineChange} />

      {/* Section heading */}
      <div className="px-4 pb-2 flex-shrink-0">
        <h2 className="font-serif text-lg text-gray-900">
          {searchQuery || selectedCuisine ? `${restaurants.length} Results` : 'Top Halal Restaurants'}
        </h2>
      </div>

      {/* Cards list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-2.5 scrollbar-thin">
        {loading ? (
          <div className="text-center py-10 text-gray-400">
            <div className="w-7 h-7 border-2 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="font-medium text-sm">Loading restaurants…</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p className="font-medium text-sm text-gray-600 mb-1">No restaurants found.</p>
            <span className="text-xs">Try a different search or filter.</span>
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
    </aside>
  )
}
