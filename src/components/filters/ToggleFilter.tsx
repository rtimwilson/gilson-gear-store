interface ToggleFilterProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function ToggleFilter({
  label,
  description,
  checked,
  onChange,
}: ToggleFilterProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      {/* Toggle switch */}
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            checked
              ? 'bg-[var(--color-gilson-red)]'
              : 'bg-[var(--color-border-medium)] group-hover:bg-[var(--color-text-tertiary)]'
          }`}
        />
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </div>

      {/* Label and description */}
      <div className="flex-1 min-w-0">
        <span
          className={`block text-[var(--text-small)] transition-colors ${
            checked
              ? 'text-[var(--color-text-primary)] font-medium'
              : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
          }`}
        >
          {label}
        </span>
        {description && (
          <span className="block text-[var(--text-xs)] text-[var(--color-text-tertiary)] mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  )
}
