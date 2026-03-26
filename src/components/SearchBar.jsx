export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex flex-1 items-center">
      <svg
        className="absolute left-2.5 text-gray-400 pointer-events-none"
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        type="text"
        placeholder="Search city or restaurant…"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-8 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg
                   text-gray-900 placeholder-gray-400 outline-none
                   focus:border-green-500 focus:bg-white transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  )
}
