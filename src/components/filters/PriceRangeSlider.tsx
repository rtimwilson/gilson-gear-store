import { useState, useEffect, useCallback } from 'react'
import type { PriceRange } from '../../types/filters'

interface PriceRangeSliderProps {
  min: number
  max: number
  value: PriceRange
  onChange: (range: PriceRange) => void
  currency?: string
}

export default function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  currency = '$',
}: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(value.min)
  const [localMax, setLocalMax] = useState(value.max)

  // Sync with external value
  useEffect(() => {
    setLocalMin(value.min)
    setLocalMax(value.max)
  }, [value.min, value.max])

  // Debounced onChange
  const debouncedOnChange = useCallback(
    (newMin: number, newMax: number) => {
      const timer = setTimeout(() => {
        onChange({ min: newMin, max: newMax })
      }, 300)
      return () => clearTimeout(timer)
    },
    [onChange]
  )

  const handleMinChange = (newMin: number) => {
    const clampedMin = Math.min(newMin, localMax - 1)
    setLocalMin(clampedMin)
    debouncedOnChange(clampedMin, localMax)
  }

  const handleMaxChange = (newMax: number) => {
    const clampedMax = Math.max(newMax, localMin + 1)
    setLocalMax(clampedMax)
    debouncedOnChange(localMin, clampedMax)
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min
    handleMinChange(Math.max(min, Math.min(newValue, localMax - 1)))
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || max
    handleMaxChange(Math.min(max, Math.max(newValue, localMin + 1)))
  }

  // Calculate positions for the range highlight
  const minPercent = ((localMin - min) / (max - min)) * 100
  const maxPercent = ((localMax - min) / (max - min)) * 100

  return (
    <div className="space-y-4">
      {/* Dual Range Slider */}
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-2 bg-[var(--color-border-light)] rounded-full" />

        {/* Active range */}
        <div
          className="absolute h-2 bg-[var(--color-gilson-red)] rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMin}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-20
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-[var(--color-gilson-red)]
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-webkit-slider-thumb]:transition-transform
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-[var(--color-gilson-red)]
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        />

        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={localMax}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-20
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-[var(--color-gilson-red)]
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-webkit-slider-thumb]:transition-transform
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-[var(--color-gilson-red)]
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        />
      </div>

      {/* Input fields */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="sr-only">Minimum price</label>
          <div className="flex items-center border border-[var(--color-border-light)] rounded-[var(--radius-md)] overflow-hidden focus-within:border-[var(--color-gilson-red)] transition-colors">
            <span className="px-3 py-2 bg-[var(--color-surface-secondary)] text-[var(--color-text-tertiary)] text-[var(--text-small)]">
              {currency}
            </span>
            <input
              type="number"
              value={localMin}
              onChange={handleMinInputChange}
              min={min}
              max={localMax - 1}
              className="w-full px-3 py-2 text-[var(--text-small)] text-[var(--color-text-primary)] bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <span className="text-[var(--color-text-tertiary)]">—</span>

        <div className="flex-1">
          <label className="sr-only">Maximum price</label>
          <div className="flex items-center border border-[var(--color-border-light)] rounded-[var(--radius-md)] overflow-hidden focus-within:border-[var(--color-gilson-red)] transition-colors">
            <span className="px-3 py-2 bg-[var(--color-surface-secondary)] text-[var(--color-text-tertiary)] text-[var(--text-small)]">
              {currency}
            </span>
            <input
              type="number"
              value={localMax}
              onChange={handleMaxInputChange}
              min={localMin + 1}
              max={max}
              className="w-full px-3 py-2 text-[var(--text-small)] text-[var(--color-text-primary)] bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
