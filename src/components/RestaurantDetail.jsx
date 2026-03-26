import { getCuisineImage, getDistanceKm } from '../utils/distance'

export default function RestaurantDetail({ restaurant: r, onClose, userLocation }) {
  if (!r) return null

  const img = getCuisineImage(r.cuisine)
  const isFullyHalal = r.halal_status?.toLowerCase().includes('fully')
  const dist = userLocation
    ? getDistanceKm(userLocation.lat, userLocation.lng, r.latitude, r.longitude)
    : null

  const hourLines = r.hours
    ? r.hours.split(/[,;]/).map(h => h.trim()).filter(Boolean)
    : []

  return (
    <div className="absolute top-0 right-0 w-full max-w-[420px] h-full bg-white z-[900]
                    overflow-y-auto shadow-[-4px_0_24px_rgba(0,0,0,0.12)] animate-slide-in">

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3.5 left-3.5 z-10 w-9 h-9 bg-white border border-gray-200
                   rounded-full flex items-center justify-center shadow-sm
                   hover:bg-gray-50 transition-colors"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </button>

      {/* Hero image */}
      <div className="relative h-56 overflow-hidden">
        <img src={img} alt={r.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3
                        bg-gradient-to-t from-black/55 to-transparent
                        flex justify-between items-end">
          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white
            ${isFullyHalal ? 'bg-green-700/90' : 'bg-amber-700/90'}`}>
            {isFullyHalal ? '✓ Verified Halal' : '✓ Halal Options'}
          </span>
          <div className="text-white text-[13px] font-semibold">
            ★ 4.{Math.floor(Math.random() * 3 + 6)}
            <span className="font-normal opacity-75 ml-1">(124 reviews)</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4.5 px-[18px] py-4">

        {/* Title row */}
        <div className="flex justify-between items-start gap-3 mb-4">
          <div>
            <h2 className="font-serif text-2xl text-gray-900 leading-tight">{r.name}</h2>
            <p className="flex items-center gap-1.5 text-[13px] text-gray-400 mt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                </svg>
                {r.cuisine}
              </span>
              <span className="text-gray-200">•</span>
              <span>$$</span>
              {dist && <><span className="text-gray-200">•</span><span>{dist.toFixed(1)}km away</span></>}
            </p>
          </div>

          <div className="flex gap-1.5 flex-shrink-0">
            {[
              { title: 'Save', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
              { title: 'Share', path: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z' },
            ].map(({ title, path }) => (
              <button
                key={title} title={title}
                className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center
                           text-gray-500 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={path}/></svg>
              </button>
            ))}
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-3.5">

          {/* Location card */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
            <p className="text-[9px] font-bold tracking-widest text-gray-400 mb-1.5">LOCATION</p>
            <p className="text-[13px] text-gray-900 leading-snug">{r.address}</p>
            <p className="text-[13px] text-gray-400">{r.city}, Finland</p>
            <div className="flex flex-col gap-1.5 mt-2.5">
              <a
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-green-700 text-white
                           text-xs font-semibold rounded-lg hover:bg-green-800 transition-colors no-underline"
                href={`https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}`}
                target="_blank" rel="noopener noreferrer"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Open in Maps
              </a>
              {r.phone && (
                <a
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white
                             border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg
                             hover:border-green-400 hover:text-green-700 transition-colors no-underline"
                  href={`tel:${r.phone}`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call
                </a>
              )}
            </div>
          </div>

          {/* Hours card */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
            <p className="text-[9px] font-bold tracking-widest text-gray-400 mb-1.5">OPENING HOURS</p>
            {hourLines.length > 0 ? (
              hourLines.map((line, i) => (
                <p key={i} className="text-[13px] text-gray-900 leading-snug">{line}</p>
              ))
            ) : (
              <p className="text-[13px] text-gray-400">Hours not available</p>
            )}
            {r.website && (
              <a
                className="flex items-center justify-center mt-2.5 px-2.5 py-1.5 border border-green-500
                           text-green-700 text-xs font-semibold rounded-lg hover:bg-green-50
                           transition-colors no-underline"
                href={r.website.startsWith('http') ? r.website : `https://${r.website}`}
                target="_blank" rel="noopener noreferrer"
              >
                Visit Website →
              </a>
            )}
          </div>
        </div>

        {/* Phone row */}
        {r.phone && (
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-[13px] text-gray-600">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            {r.phone}
          </div>
        )}
      </div>
    </div>
  )
}
