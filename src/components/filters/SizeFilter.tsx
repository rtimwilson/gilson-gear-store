import type { FilterOption } from '../../types/filters'

interface SizeFilterProps {
  sizes: FilterOption[]
  selected: string[]
  onChange: (values: string[]) => void
}

export default function SizeFilter({ sizes, selected, onChange }: SizeFilterProps) {
  const handleToggle = (size: string) => {
    if (selected.includes(size)) {
      onChange(selected.filter((s) => s !== size))
    } else {
      onChange([...selected, size])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isSelected = selected.includes(size.value)
        return (
          <button
            key={size.value}
            type="button"
            onClick={() => handleToggle(size.value)}
            className={`min-w-[44px] px-3 py-2 rounded-[var(--radius-md)] text-[var(--text-small)] font-medium border transition-all ${
              isSelected
                ? 'bg-[var(--color-gilson-red)] text-white border-[var(--color-gilson-red)]'
                : 'bg-white text-[var(--color-text-secondary)] border-[var(--color-border-light)] hover:border-[var(--color-gilson-red)] hover:text-[var(--color-text-primary)]'
            }`}
            title={`${size.label} (${size.count} available)`}
          >
            {size.label}
          </button>
        )
      })}
    </div>
  )
}
