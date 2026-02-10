import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FilterState } from '../../types/filters'
import type { FilterConfig } from '../../types/filters'

import FilterSection from './FilterSection'
import CheckboxFilter from './CheckboxFilter'
import PriceRangeSlider from './PriceRangeSlider'
import ColourSwatches from './ColourSwatches'
import SizeFilter from './SizeFilter'
import ToggleFilter from './ToggleFilter'

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  filterConfig: FilterConfig
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onClearAll: () => void
  resultCount: number
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  filterConfig,
  onFilterChange,
  onClearAll,
  resultCount,
}: MobileFilterDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[200] lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-[201] lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-light)]">
              <h2 className="font-heading font-bold text-[var(--text-title)] text-[var(--color-text-primary)]">
                Filters
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filter Sections - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6">
              {/* Categories */}
              <FilterSection title="Category" subtitle="(Select all that apply)">
                <CheckboxFilter
                  options={filterConfig.categories}
                  selected={filters.categories}
                  onChange={(values) => onFilterChange('categories', values)}
                />
              </FilterSection>

              {/* Price Range */}
              <FilterSection title="Price Range">
                <PriceRangeSlider
                  min={filterConfig.priceRange.min}
                  max={filterConfig.priceRange.max}
                  value={filters.priceRange}
                  onChange={(range) => onFilterChange('priceRange', range)}
                />
              </FilterSection>

              {/* Colours */}
              <FilterSection title="Colour">
                <ColourSwatches
                  colours={filterConfig.colours}
                  selected={filters.colours}
                  onChange={(values) => onFilterChange('colours', values)}
                  showCounts
                />
              </FilterSection>

              {/* Sizes */}
              <FilterSection title="Size">
                <SizeFilter
                  sizes={filterConfig.sizes}
                  selected={filters.sizes}
                  onChange={(values) => onFilterChange('sizes', values)}
                />
              </FilterSection>

              {/* Fit */}
              <FilterSection title="Fit">
                <CheckboxFilter
                  options={filterConfig.fits}
                  selected={filters.fit}
                  onChange={(values) => onFilterChange('fit', values)}
                />
              </FilterSection>

              {/* Material */}
              <FilterSection title="Material">
                <CheckboxFilter
                  options={filterConfig.materials}
                  selected={filters.material}
                  onChange={(values) => onFilterChange('material', values)}
                  initialVisibleCount={4}
                />
              </FilterSection>

              {/* Brand */}
              <FilterSection title="Brand">
                <CheckboxFilter
                  options={filterConfig.brands}
                  selected={filters.brands}
                  onChange={(values) => onFilterChange('brands', values)}
                  initialVisibleCount={5}
                />
              </FilterSection>

              {/* Special Filters */}
              <FilterSection title="Special">
                <div className="space-y-4">
                  <ToggleFilter
                    label="Premium Products Only"
                    description="Carhartt, YETI, Stanley, and more"
                    checked={filters.isPremium}
                    onChange={(checked) => onFilterChange('isPremium', checked)}
                  />
                  <ToggleFilter
                    label="Eco-Friendly"
                    description="Sustainable and recycled materials"
                    checked={filters.isEcoFriendly}
                    onChange={(checked) => onFilterChange('isEcoFriendly', checked)}
                  />
                  <ToggleFilter
                    label="In Stock Only"
                    checked={filters.inStock}
                    onChange={(checked) => onFilterChange('inStock', checked)}
                  />
                  <ToggleFilter
                    label="Employee Pricing Available"
                    checked={filters.employeePricingOnly}
                    onChange={(checked) => onFilterChange('employeePricingOnly', checked)}
                  />
                </div>
              </FilterSection>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[var(--color-border-light)] bg-white">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClearAll}
                  className="flex-1 btn btn-secondary"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 btn btn-primary"
                >
                  Show {resultCount} Results
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
