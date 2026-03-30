import { BadgeCheck, Copy, Heart, MapPin, Phone } from 'lucide-react'
import { getCuisineImage, getDistanceKm } from '../utils/distance'
import MapView from './MapView'
import { useState } from 'react'

export default function DetailPage({ restaurant: r, onBack, userLocation }) {
  if (!r) return null

  const img = getCuisineImage(r.cuisine)
  const isFullyHalal = r.halal_status?.toLowerCase().includes('fully')
  const dist = userLocation
    ? getDistanceKm(userLocation.lat, userLocation.lng, r.latitude, r.longitude)
    : null
  const rating = r.rating || '4.0'
  const reviewCount = r.review_count || ''

  const parseHours = (hours) => {
    if (!hours) return []
    return hours.split(/[,;]/).map(h => h.trim()).filter(Boolean)
  }
  const hourLines = parseHours(r.hours)

  const hoursTable = [
    { days: 'Mon – Thu', time: hourLines[0] || '11:00 – 21:00' },
    { days: 'Friday', time: hourLines[1] || '11:00 – 23:00' },
    { days: 'Sat – Sun', time: hourLines[2] || '12:00 – 22:00' },
  ]
   // states to copy address
const [copied, setCopied] = useState(false);

const handleCopyAddress = (r) => {
  const fullAddress = `${r.address || 'Urho Kekkosen katu 1'}, 00100 ${r.city || 'Helsinki'}, Finland`;
  
  navigator.clipboard.writeText(fullAddress).then(() => {
    setCopied(true);
    // Reset the icon/text after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  });
};
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#e8f0e8]">

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map */}
        <div className="flex-1 relative overflow-hidden">
          <MapView
            restaurants={[r]}
            selectedRestaurant={r}
            onSelectRestaurant={() => { }}
            userLocation={userLocation}
            hideSelectedCard={true}
            onNearMe={() => { }}
          />
          {/* Back button on map */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 z-[1000] w-10 h-10 bg-white rounded-full shadow-md
                       flex items-center justify-center text-gray-700
                       hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        {/* Right: Detail panel */}
        <div className="w-2/5 flex-shrink-0 bg-white overflow-y-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb transparent' }}>

          {/* Hero image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={r.image || getCuisineImage(r.cuisine)}
              alt={r.name}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = getCuisineImage(r.cuisine) }}
            />
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            {/* Badges row */}
            <div className="flex items-center gap-3 mb-3">
              <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
                ${isFullyHalal ? 'bg-black text-white border border-green-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                <BadgeCheck size={16} />
                {isFullyHalal ? 'Verified Halal' : 'Halal Options'}
              </span>
              <span className="text-[13px] font-semibold text-gray-700">
                ★ {rating}
                <span className="text-gray-500 ml-1">({reviewCount} reviews)</span>
              </span>
            </div>

            {/* Name */}
            <h1 className="font-serif text-4xl text-gray-900 leading-tight mb-3">{r.name}</h1>

            {/* Meta row */}
            <div className="flex items-center gap-2 mb-5">
              <span className="flex items-center gap-1.5 text-[13px] text-gray-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                </svg>
                {r.cuisine && `${r.cuisine}`} & Middle Eastern
              </span>
              <span className="text-gray-700">•</span>
              <span className="flex items-center gap-1 text-[13px] text-gray-700">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
                $$
              </span>

              {/* Action buttons */}
              <div className="ml-auto flex gap-2">
                <button className="w-10 h-10 bg-black rounded-xl flex items-center justify-center
                                   text-white hover:bg-black-400 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center
                                   text-gray-600 hover:bg-gray-200 transition-colors">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Location */}
              <div className="bg-green-50 rounded-2xl p-4 flex justify-between items-start group relative">
                <div>
                  <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">Location</p>
                  <p className="text-[15px] text-gray-800 font-medium leading-snug">
                    {r.address || 'Urho Kekkosen katu 1,'}<br />
                    {r.city ? `00100 ${r.city},` : '00100 Helsinki,'}<br />
                    Finland
                  </p>
                </div>

                <button
                  onClick={() => handleCopyAddress(r)}
                  className="p-2 hover:bg-green-100 rounded-lg transition-colors absolute bottom-2 right-2"
                  title="Copy Address"
                >
                  {copied ? (
                    <span className="text-[10px] font-bold text-green-600 absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm border border-green-200">
                      Copied!
                    </span>
                  ) : null}

                  <Copy
                    size={18}
                    className={copied ? "text-green-600" : "text-gray-400 hover:text-gray-600"}
                  />
                </button>
              </div>

              {/* Hours */}
              <div className="bg-green-50 rounded-2xl p-4">
                <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">Opening Hours</p>
                <div className="space-y-1">
                  {hoursTable.map(({ days, time }) => (
                    <div key={days} className="flex justify-between text-[12px]">
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
                href={`https://www.google.com/maps/search/?api=1&query=${r.latitude},${r.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white 
             font-semibold text-[16px] rounded-xl hover:bg-black-400 transition-colors no-underline"
              >
                <MapPin size={18} />
                Open in Maps
              </a>
              {r.phone && (
                <a
                  href={`tel:${r.phone}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 text-gray-700
                             font-semibold text-[16px] rounded-xl hover:bg-gray-200 transition-colors no-underline"
                >
                  <Phone size={18} />
                  Call
                </a>
              )}
            </div>

            {r.website && (
              <a
                href={r.website.startsWith('http') ? r.website : `https://${r.website}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center mt-3 py-2.5 border border-green-400 text-green-700
                           font-semibold text-[15px] rounded-xl hover:bg-green-50 transition-colors no-underline"
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
