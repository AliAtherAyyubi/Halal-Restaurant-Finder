import { Heart, Menu, Plus, Settings, Utensils, X } from "lucide-react"
import { useState } from "react";

export default function MenuSidebar({ activeMenu, onMenuChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  //////
  const menuItems = [
    {
      id: 'restaurants', label: 'Restaurants',
      icon: (
        <Utensils size={18} />
      )
    },
    // {
    //   id: 'mosques', label: 'Mosques',
    //   icon: (
    //     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    //     </svg>
    //   )
    // },
    {
      id: 'favorites', label: 'Favorites',
      icon: (
        <Heart size={18} />
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
    <>
      {/* Mobile Toggle Button - Only visible on small screens */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-green-100"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay - Darkens the background when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 lg:static lg:w-1/6 
        flex flex-col bg-[#ebfaf5] border-r border-green-100/50 flex-shrink-0 py-4
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 z-10'}
      `}>
        
        {/* Brand Header */}
        <div className="px-4 mb-6 mt-10 lg:mt-0">
          <p className="text-[18px] font-semibold text-gray-800">Nordic Concierge</p>
          <p className="text-[12px] text-green-700">Halal Finder Finland</p>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1 px-2 overflow-y-auto">
          {menuItems.map(item => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onMenuChange(item.id);
                  setIsOpen(false); // Close sidebar on mobile after clicking
                }}
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
            );
          })}
        </nav>

        {/* Bottom Action */}
        <div className="mt-auto px-3 pt-4">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-black
                             text-white text-[15px] font-medium rounded-xl hover:bg-black-900 transition-colors">
            <Plus size={18} strokeWidth={2.5} />
            <span className="lg:inline">Add Restaurant</span>
          </button>
        </div>
      </aside>
    </>
  )
}
