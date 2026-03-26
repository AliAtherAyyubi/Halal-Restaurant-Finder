export default function CuisineFilter({ cuisines, selected, onChange }) {
  const base = "flex-shrink-0 px-3 py-1 rounded-full border text-xs font-medium cursor-pointer transition-all whitespace-nowrap"
  const active = "bg-green-700 border-green-700 text-white"
  const inactive = "bg-white border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700"

  return (
    <div className="flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-hide flex-shrink-0">
      <button
        className={`${base} ${!selected ? active : inactive}`}
        onClick={() => onChange('')}
      >
        All
      </button>
      {cuisines.map(c => (
        <button
          key={c}
          className={`${base} ${selected === c ? active : inactive}`}
          onClick={() => onChange(selected === c ? '' : c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
