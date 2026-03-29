import { getCuisineImage, getDistanceKm } from '../utils/distance'
import MapView from './MapView'

export default function DetailPage({ restaurant: r, onBack, userLocation }) {
  if (!r) return null

  const img = getCuisineImage(r.cuisine)
  const isFullyHalal = r.halal_status?.toLowerCase().includes('fully')
  const dist = userLocation
    ? getDistanceKm(userLocation.lat, userLocation.lng, r.latitude, r.longitude)
    : null
  const rating = (4.5 + Math.random() * 0.4).toFixed(1)

  const parseHours = (hours) => {
    if (!hours) return []
    return hours.split(/[,;]/).map(h => h.trim()).filter(Boolean)
  }
  const hourLines = parseHours(r.hours)

  const hoursTable = [
    { days: 'Mon – Thu', time: hourLines[0] || '11:00 – 21:00' },
    { days: 'Friday',    time: hourLines[1] || '11:00 – 23:00' },
    { days: 'Sat – Sun', time: hourLines[2] || '12:00 – 22:00' },
  ]

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#e8f0e8]">
      {/* Minimal top bar */}
      <div className="flex items-center px-6 h-14 flex-shrink-0">
        <span className="font-serif text-[17px] font-semibold text-gray-900">Verdant Halal</span>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map */}
        <div className="flex-1 relative overflow-hidden">
          <MapView
            restaurants={[r]}
            selectedRestaurant={r}
            onSelectRestaurant={() => {}}
            userLocation={userLocation}
            onNearMe={() => {}}
          />
          {/* Back button on map */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 z-[1000] w-10 h-10 bg-white rounded-full shadow-md
                       flex items-center justify-center text-gray-700
                       hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
        </div>

        {/* Right: Detail panel */}
        <div className="w-[420px] flex-shrink-0 bg-white overflow-y-auto"
             style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>

          {/* Hero image */}
          <div className="relative h-64 overflow-hidden">
            <img src={img} alt={r.name} className="w-full h-full object-cover" />
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            {/* Badges row */}
            <div className="flex items-center gap-3 mb-3">
              <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
                ${isFullyHalal ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                {isFullyHalal ? 'Verified Halal' : 'Halal Options'}
              </span>
              <span className="text-[13px] font-semibold text-gray-700">
                ★ {rating}
                <span className="font-normal text-gray-400 ml-1">(124 reviews)</span>
              </span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-4xl text-gray-900 leading-tight mb-3">{r.name}</h1>

            {/* Meta row */}
            <div className="flex items-center gap-2 mb-5">
              <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                </svg>
                {r.cuisine && `${r.cuisine}`} & Middle Eastern
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-[13px] text-gray-500">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
                $$
              </span>

              {/* Action buttons */}
              <div className="ml-auto flex gap-2">
                <button className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center
                                   text-white hover:bg-green-800 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center
                                   text-gray-600 hover:bg-gray-200 transition-colors">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Location */}
              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">Location</p>
                <p className="text-[13px] text-gray-800 font-medium leading-snug">
                  {r.address || 'Urho Kekkosen katu 1,'}<br/>
                  {r.city ? `00100 ${r.city},` : '00100 Helsinki,'}<br/>
                  Finland
                </p>
              </div>

              {/* Hours */}
              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">Opening Hours</p>
                <div className="space-y-1">
                  {hoursTable.map(({ days, time }) => (
                    <div key={days} className="flex justify-between text-[11px]">
                      <span className="text-gray-500">{days}</span>
                      <span className="text-gray-800 font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mt-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-700 text-white
                           font-semibold text-[13px] rounded-xl hover:bg-green-800 transition-colors no-underline"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
                Get Directions
              </a>
              {r.phone && (
                <a
                  href={`tel:${r.phone}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-gray-700
                             font-semibold text-[13px] rounded-xl hover:bg-gray-200 transition-colors no-underline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call
                </a>
              )}
            </div>

            {r.website && (
              <a
                href={r.website.startsWith('http') ? r.website : `https://${r.website}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center mt-3 py-2.5 border border-green-400 text-green-700
                           font-semibold text-[13px] rounded-xl hover:bg-green-50 transition-colors no-underline"
              >
                Visit Website →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
