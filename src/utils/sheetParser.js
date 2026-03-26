/**
 * sheetParser - converts raw CSV text into an array of restaurant objects
 * Handles quoted fields, trims whitespace, and normalises keys
 */
export function sheetParser(csvText) {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []

  // Parse a single CSV line respecting quoted fields
  const parseLine = (line) => {
    const result = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    result.push(current.trim())
    return result
  }

  const headers = parseLine(lines[0]).map(h => h.toLowerCase().replace(/\s+/g, '_'))

  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = parseLine(line)
      const obj = {}
      headers.forEach((header, i) => {
        obj[header] = values[i] ?? ''
      })
      // Coerce lat/lng to numbers
      obj.latitude = parseFloat(obj.latitude) || null
      obj.longitude = parseFloat(obj.longitude) || null
      return obj
    })
    .filter(r => r.latitude && r.longitude) // only restaurants with valid coords
}
