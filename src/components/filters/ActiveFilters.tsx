import { X } from 'lucide-react'
import type { FilterState, PriceRange } from '../../types/filters'

interface ActiveFiltersProps {
  filters: FilterState
  priceRange: PriceRange // The default/max range for comparison
  onRemoveFilter: (filterType: keyof FilterState, value?: string) => void
  onClearAll: () => void
}

interface FilterChip {
  type: keyof FilterState
  label: string
  value?: string
}

export default function ActiveFilters({
  filters,
  priceRange,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) {
  // Build list of active filter chips
  const chips: FilterChip[] = []

  // Categories
  filters.categories.forEach((cat) => {
    chips.push({ type: 'categories', label: cat, value: cat })
  })

  // Subcategories
  filters.subcategories.forEach((sub) => {
    chips.push({ type: 'subcategories', label: sub, value: sub })
  })

  // Price range (only if changed from default)
  if (filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max) {
    chips.push({
      type: 'priceRange',
      label: `$${filters.priceRange.min} - $${filters.priceRange.max}`,
    })
  }

  // Colours
  filters.colours.forEach((colour) => {
    chips.push({ type: 'colours', label: colour, value: colour })
  })

  // Sizes
  filters.sizes.forEach((size) => {
    chips.push({ type: 'sizes', label: `Size: ${size}`, value: size })
  })

  // Fit
  filters.fit.forEach((fit) => {
    const fitLabels: Record<string, string> = {
      unisex: 'Unisex',
      mens: "Men's",
      womens: "Women's",
      kids: 'Kids',
    }
    chips.push({ type: 'fit', label: fitLabels[fit] || fit, value: fit })
  })

  // Material
  filters.material.forEach((mat) => {
    chips.push({ type: 'material', label: mat, value: mat })
  })

  // Brands
  filters.brands.forEach((brand) => {
    chips.push({ type: 'brands', label: brand, value: brand })
  })

  // Boolean filters
  if (filters.isPremium) {
    chips.push({ type: 'isPremium', label: 'Premium' })
  }
  if (filters.isEcoFriendly) {
    chips.push({ type: 'isEcoFriendly', label: 'Eco-Friendly' })
  }
  if (filters.inStock) {
    chips.push({ type: 'inStock', label: 'In Stock' })
  }
  if (filters.employeePricingOnly) {
    chips.push({ type: 'employeePricingOnly', label: 'Employee Pricing' })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[var(--color-border-light)]">
      <span className="text-[var(--text-small)] text-[var(--color-text-tertiary)] font-medium">
        Active Filters:
      </span>

      {chips.map((chip, index) => (
        <button
          key={`${chip.type}-${chip.value || index}`}
          type="button"
          onClick={() => onRemoveFilter(chip.type, chip.value)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-gilson-red)]/10 text-[var(--color-gilson-red)] rounded-full text-[var(--text-xs)] font-medium hover:bg-[var(--color-gilson-red)]/20 transition-colors"
        >
          {chip.label}
          <X size={14} />
        </button>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-[var(--text-small)] text-[var(--color-text-tertiary)] hover:text-[var(--color-gilson-red)] font-medium ml-2 transition-colors"
      >
        Clear All
      </button>
    </div>
  )
}
