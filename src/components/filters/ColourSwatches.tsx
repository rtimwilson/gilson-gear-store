import { Check } from 'lucide-react'
import type { ColourOption } from '../../types/filters'

interface ColourSwatchesProps {
  colours: ColourOption[]
  selected: string[]
  onChange: (values: string[]) => void
  showCounts?: boolean
}

export default function ColourSwatches({
  colours,
  selected,
  onChange,
  showCounts = false,
}: ColourSwatchesProps) {
  const handleToggle = (colour: string) => {
    if (selected.includes(colour)) {
      onChange(selected.filter((c) => c !== colour))
    } else {
      onChange([...selected, colour])
    }
  }

  // Helper to determine if colour is light (needs dark checkmark)
  const isLightColour = (hex: string): boolean => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.6
  }

  return (
    <div className="flex flex-wrap gap-2">
      {colours.map((colour) => {
        const isSelected = selected.includes(colour.name)
        const isLight = isLightColour(colour.hex)
        const isWhite = colour.hex.toUpperCase() === '#FFFFFF'

        return (
          <button
            key={colour.name}
            type="button"
            onClick={() => handleToggle(colour.name)}
            className={`group relative w-8 h-8 rounded-full transition-all ${
              isSelected
                ? 'ring-2 ring-[var(--color-gilson-red)] ring-offset-2'
                : 'hover:scale-110'
            } ${isWhite ? 'border border-[var(--color-border-light)]' : ''}`}
            style={{ backgroundColor: colour.hex }}
            title={`${colour.name}${showCounts ? ` (${colour.count})` : ''}`}
          >
            {/* Selected checkmark */}
            {isSelected && (
              <span
                className={`absolute inset-0 flex items-center justify-center ${
                  isLight ? 'text-[var(--color-text-primary)]' : 'text-white'
                }`}
              >
                <Check size={16} strokeWidth={3} />
              </span>
            )}

            {/* Tooltip on hover */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--color-surface-dark)] text-white text-[var(--text-xs)] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {colour.name}
              {showCounts && ` (${colour.count})`}
            </span>
          </button>
        )
      })}
    </div>
  )
}
