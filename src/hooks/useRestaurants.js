import { useState, useEffect } from 'react'
import { sheetParser } from '../utils/sheetParser'

// Public Google Sheet published as CSV
const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTnc9eiVWZjSzUSpkknmeam7EH4lWxIweFxj3BX9MuckLfuvFy-vIhGUkz6BTT7K0rJMs4lQXeZG7fs/pub?gid=1099152996&single=true&output=csv'

/**
 * useRestaurants – custom hook that fetches and parses the restaurant CSV
 * Returns: { restaurants, loading, error }
 */
export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(SHEET_CSV_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch data`)
        const text = await res.text()
        const parsed = sheetParser(text)
        if (!cancelled) {
          // Add a unique id to each restaurant
          const withIds = parsed.map((r, i) => ({ ...r, id: i + 1 }))
          setRestaurants(withIds)
        }
      } catch (err) {
        if (!cancelled) {
          // Fallback to sample data so the UI still works
          setError(err.message)
          setRestaurants(FALLBACK_DATA)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [])

  return { restaurants, loading, error }
}

// Fallback sample data in case the sheet is unavailable
const FALLBACK_DATA = [
  { id: 1, name: "Sultan's Feast Helsinki", address: "Aleksanterinkatu 15", city: "Helsinki", latitude: 60.1699, longitude: 24.9384, cuisine: "Turkish", halal_status: "Fully Halal", phone: "+358 40 123 4567", website: "https://google.com", hours: "Mon–Sun 11:00–22:00" },
  { id: 2, name: "Petra Oasis", address: "Mannerheimintie 20", city: "Helsinki", latitude: 60.1715, longitude: 24.9310, cuisine: "Arab", halal_status: "Fully Halal", phone: "+358 40 234 5678", website: "", hours: "Mon–Sat 12:00–21:00" },
  { id: 3, name: "Habibi Helsinki", address: "Urho Kekkosen katu 1", city: "Helsinki", latitude: 60.1672, longitude: 24.9320, cuisine: "Lebanese", halal_status: "Fully Halal", phone: "+358 40 345 6789", website: "https://example.com", hours: "Mon–Thu 11:00–21:00, Fri 11:00–23:00, Sat–Sun 12:00–22:00" },
  { id: 4, name: "Spice Garden", address: "Hämeenkatu 10", city: "Tampere", latitude: 61.4978, longitude: 23.7610, cuisine: "Indian", halal_status: "Halal Options", phone: "+358 50 111 2222", website: "", hours: "Tue–Sun 12:00–21:00" },
  { id: 5, name: "Karachi Kitchen", address: "Yliopistonkatu 5", city: "Turku", latitude: 60.4518, longitude: 22.2666, cuisine: "Pakistani", halal_status: "Fully Halal", phone: "+358 50 333 4444", website: "https://example.com", hours: "Mon–Sun 11:00–22:00" },
  { id: 6, name: "Afghan Palace", address: "Kauppakatu 8", city: "Jyväskylä", latitude: 62.2426, longitude: 25.7473, cuisine: "Afghan", halal_status: "Fully Halal", phone: "+358 50 555 6666", website: "", hours: "Wed–Mon 12:00–21:00" },
  { id: 7, name: "Somali Kitchen Oulu", address: "Isokatu 3", city: "Oulu", latitude: 65.0121, longitude: 25.4651, cuisine: "Somali", halal_status: "Fully Halal", phone: "+358 50 777 8888", website: "", hours: "Mon–Sat 11:00–20:00" },
  { id: 8, name: "Al-Sham Damascus", address: "Kauppatori 1", city: "Espoo", latitude: 60.2052, longitude: 24.6522, cuisine: "Arabic", halal_status: "Fully Halal", phone: "+358 50 999 0000", website: "https://example.com", hours: "Mon–Sun 12:00–22:00" },
]
