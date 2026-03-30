import { CircleUserRound, Search } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ searchQuery, onSearchChange, onNearMe }) {
  const [activeNav, setActiveNav] = useState('discover')
  const tabs = ['Discover', 'Favorites', 'Recent']

  return (
    <nav className="flex items-center justify-between px-6 h-14 bg-[#ebfaf5] flex-shrink-0">
      {/* Left: Logo + Nav */}
      <div className="flex items-center gap-10">
        <a href="/">
          <span className="font-serif text-[26px] font-normal text-black tracking-tight">
          Verdant Halal
        </span>
        </a>

        <div className="flex items-center gap-1">
          {tabs.map(tab => {
            const key = tab.toLowerCase()
            const isActive = activeNav === key
            return (
              <button
              key={tab}
              onClick={() => setActiveNav(key)}
              className={`relative px-3 py-1.5 text-[15px] font-medium transition-colors
                ${isActive ? 'text-[#3b6649' : 'text-[#84bfad] hover:text-gray-700'}`}
              >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700" />
              )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: Search + Near Me + Profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Helsinki..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="min-w-80 pl-3 pr-8 py-1.5 text-sm bg-[#ebf5eb] border
                       rounded-full placeholder-gray-400 text-gray-800 outline-none
                       focus:bg-white focus:border-green-300 transition-all"
          />
          <Search size={16} className='absolute right-3'/>
          
          {/* {searchQuery && (
            <button onClick={() => onSearchChange('')}
              className="absolute right-2 text-gray-400 hover:text-gray-600 text-base leading-none">×</button>
          )} */}
        </div>

        {/* Near Me */}
        {/* <button
          onClick={onNearMe}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#14410f] text-white text-[15px]
                     font-semibold rounded-full hover:bg-green-800 active:scale-95 transition-all"
        >
          <Navigation size={16}/>
          Near Me
        </button> */}

        {/* Profile */}
                 <CircleUserRound className='cursor-pointer' />

      </div>
    </nav>
  )
}
