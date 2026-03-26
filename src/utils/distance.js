/**
 * Haversine formula – returns distance in km between two lat/lng points
 */
export function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Returns cuisine-based pin colour for map markers
 */
export function getCuisineColor(cuisine) {
  const map = {
    turkish:   '#16a34a',
    arab:      '#0369a1',
    arabic:    '#0369a1',
    pakistani: '#7c3aed',
    indian:    '#d97706',
    afghan:    '#b45309',
    somali:    '#dc2626',
    lebanese:  '#0891b2',
    persian:   '#9333ea',
    iraqi:     '#c2410c',
    moroccan:  '#ca8a04',
    mediterranean: '#0284c7',
  }
  const key = (cuisine || '').toLowerCase().trim()
  for (const [k, v] of Object.entries(map)) {
    if (key.includes(k)) return v
  }
  return '#15803d' // default green
}

/**
 * Restaurant food images mapped by cuisine (Unsplash free photos)
 */
export function getCuisineImage(cuisine, name) {
  const images = {
    turkish: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
    arab: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    arabic: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    pakistani: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&q=80',
    indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
    somali: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80',
    lebanese: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80',
    afghan: 'https://images.unsplash.com/photo-1630093768268-4b0dbc44c0fc?w=600&q=80',
    moroccan: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&q=80',
    mediterranean: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
  }
  const key = (cuisine || '').toLowerCase()
  for (const [k, v] of Object.entries(images)) {
    if (key.includes(k)) return v
  }
  return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'
}
