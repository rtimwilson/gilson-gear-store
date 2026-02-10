import { useState } from 'react'
import { Check } from 'lucide-react'
import type { FilterOption } from '../../types/filters'

interface CheckboxFilterProps {
  options: FilterOption[]
  selected: string[]
  onChange: (values: string[]) => void
  showCounts?: boolean
  initialVisibleCount?: number
}

export default function CheckboxFilter({
  options,
  selected,
  onChange,
  showCounts = true,
  initialVisibleCount = 5,
}: CheckboxFilterProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleOptions = showAll ? options : options.slice(0, initialVisibleCount)
  const hasMore = options.length > initialVisibleCount

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="space-y-2">
      {visibleOptions.map((option) => {
        const isSelected = selected.includes(option.value)
        return (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={`w-5 h-5 rounded-[var(--radius-sm)] border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-[var(--color-gilson-red)] border-[var(--color-gilson-red)]'
                  : 'border-[var(--color-border-medium)] group-hover:border-[var(--color-gilson-red)]'
              }`}
            >
              {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
            </div>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleToggle(option.value)}
              className="sr-only"
            />
            <span
              className={`flex-1 text-[var(--text-small)] transition-colors ${
                isSelected
                  ? 'text-[var(--color-text-primary)] font-medium'
                  : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
              }`}
            >
              {option.label}
            </span>
            {showCounts && (
              <span className="text-[var(--text-xs)] text-[var(--color-text-tertiary)]">
                ({option.count})
              </span>
            )}
          </label>
        )
      })}

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-[var(--text-small)] text-[var(--color-gilson-red)] font-medium hover:underline mt-2"
        >
          {showAll ? 'Show Less' : `See All (${options.length})`}
        </button>
      )}
    </div>
  )
}
