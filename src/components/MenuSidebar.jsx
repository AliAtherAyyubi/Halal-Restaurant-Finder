import { Plus, Settings, Utensils } from "lucide-react"

export default function MenuSidebar({ activeMenu, onMenuChange }) {
  const menuItems = [
    {
      id: 'restaurants', label: 'Restaurants',
      icon: (
        <Utensils size={18} />
      )
    },
    {
      id: 'mosques', label: 'Mosques',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      )
    },
    {
      id: 'favorites', label: 'Favorites',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    },
    {
      id: 'settings', label: 'Settings',
      icon: (
        <Settings size={18} />
      )
    },
  ]

  return (
    <aside className="w-54 flex flex-col bg-[#ebfaf5] border-r border-green-100/50 flex-shrink-0 py-4">
      {/* Brand subtitle */}
      <div className="px-4 mb-6">
        <p className="text-[18px] font-semibold text-gray-800">Nordic Concierge</p>
        <p className="text-[12px] text-green-700">Halal Finder Finland</p>
      </div>

      {/* Menu items */}
      <nav className="flex flex-col gap-1 px-2">
        {menuItems.map(item => {
          const isActive = activeMenu === item.id
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium
                          text-left transition-all duration-150
                          ${isActive
                            ? 'bg-[#cdfae1] text-black shadow-sm'
                            : 'text-[#6ab7a2] hover:bg-[#ebf5eb] hover:text-gray-900'}`}
            >
              <span className={isActive ? 'text-black' : 'text-[#007855]'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Add Restaurant button at bottom */}
      <div className="mt-auto px-3">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-black
                           text-white text-[15px] font-semibold rounded-xl hover:bg-black-900 transition-colors">
          <Plus size={18} strokeWidth={1.75} />
          Add Restaurant
        </button>
      </div>
    </aside>
  )
}
