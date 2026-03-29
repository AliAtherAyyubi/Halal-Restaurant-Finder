import { Navigation, Search } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ searchQuery, onSearchChange, onNearMe }) {
  const [activeNav, setActiveNav] = useState('discover')
  const tabs = ['Discover', 'Favorites', 'Recent']

  return (
    <nav className="flex items-center justify-between px-6 h-14 bg-[#ebfaf5] flex-shrink-0">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-10">
        <span className="font-serif text-[17px] font-semibold text-gray-900 tracking-tight">
          Verdant Halal
        </span>

        <div className="flex items-center gap-1">
          {tabs.map(tab => {
            const key = tab.toLowerCase()
            const isActive = activeNav === key
            return (
              <button
                key={tab}
                onClick={() => setActiveNav(key)}
                className={`relative px-3 py-1.5 text-[13px] font-medium transition-colors
                  ${isActive ? 'text-[#3b6649' : 'text-[#84bfad] hover:text-gray-700'}`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-green-700 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: Search + Near Me + Profile */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Helsinki..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-56 pl-3 pr-8 py-1.5 text-sm bg-[#ebf5eb] border
                       rounded-full placeholder-gray-400 text-gray-800 outline-none
                       focus:bg-white focus:border-green-300 transition-all"
          />
          <Search size={16} className='absolute right-3'/>
          
          {searchQuery && (
            <button onClick={() => onSearchChange('')}
              className="absolute right-2 text-gray-400 hover:text-gray-600 text-base leading-none">×</button>
          )}
        </div>

        {/* Near Me */}
        <button
          onClick={onNearMe}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#14410f] text-white text-[15px]
                     font-semibold rounded-full hover:bg-green-800 active:scale-95 transition-all"
        >
          <Navigation size={16}/>
          Near Me
        </button>

        {/* Profile */}
        <button className="w-8 h-8 bg-white/80 border border-white rounded-full flex items-center
                           justify-center text-gray-600 hover:bg-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}
