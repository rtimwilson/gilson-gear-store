import { Link, useSearchParams } from 'react-router'
import { Filter, ChevronDown, Grid3x3, LayoutList, SlidersHorizontal } from 'lucide-react'
import { useState, useMemo, useCallback, useEffect } from 'react'

import type { FilterState, SortOption } from '../types/filters'
import type { Product } from '../types/product'
import { defaultFilterState, sortOptions } from '../types/filters'
import { products as allProducts, filterConfig, colourOptions } from '../data/products'

// Filter Components
import FilterSection from '../components/filters/FilterSection'
import CheckboxFilter from '../components/filters/CheckboxFilter'
import PriceRangeSlider from '../components/filters/PriceRangeSlider'
import ColourSwatches from '../components/filters/ColourSwatches'
import SizeFilter from '../components/filters/SizeFilter'
import ToggleFilter from '../components/filters/ToggleFilter'
import ActiveFilters from '../components/filters/ActiveFilters'
import MobileFilterDrawer from '../components/filters/MobileFilterDrawer'

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const badgeClass = product.badge === 'new' ? 'badge-new' :
    product.badge === 'best-seller' ? 'badge-sale' :
    product.badge === 'premium' ? 'badge-premium' :
    product.badge === 'popular' ? 'badge-employee' : ''

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group card card-bordered"
    >
      {/* Image */}
      <div className="relative aspect-square bg-[var(--color-surface-tertiary)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gilson-blue)]/20 to-[var(--color-gilson-red)]/20" />

        {product.badge && (
          <span className={`absolute top-3 left-3 badge ${badgeClass}`}>
            {product.badge === 'best-seller' ? 'Best Seller' :
             product.badge === 'new' ? 'New' :
             product.badge === 'premium' ? 'Premium' :
             product.badge === 'popular' ? 'Popular' : product.badge}
          </span>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="btn btn-primary btn-sm">Quick View</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-[var(--text-xs)] text-[var(--color-text-tertiary)] mb-1">
          {product.brand}
        </p>
        <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-gilson-red)] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[var(--text-small)] text-[var(--color-text-secondary)] mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-[var(--color-gilson-red)]">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[var(--text-xs)] text-[var(--color-text-tertiary)]">
            Emp: ${product.employeePrice.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[var(--text-xs)] text-[var(--color-text-tertiary)]">
              ({product.reviewCount})
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState<FilterState>(() => {
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || []
    const colours = searchParams.get('colours')?.split(',').filter(Boolean) || []
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) || []
    const fit = searchParams.get('fit')?.split(',').filter(Boolean) || []
    const material = searchParams.get('material')?.split(',').filter(Boolean) || []
    const brands = searchParams.get('brands')?.split(',').filter(Boolean) || []
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sortBy = searchParams.get('sort') as SortOption || 'featured'

    return {
      ...defaultFilterState,
      categories,
      colours,
      sizes,
      fit,
      material,
      brands,
      priceRange: {
        min: minPrice ? parseInt(minPrice) : filterConfig.priceRange.min,
        max: maxPrice ? parseInt(maxPrice) : filterConfig.priceRange.max,
      },
      isPremium: searchParams.get('premium') === 'true',
      isEcoFriendly: searchParams.get('eco') === 'true',
      inStock: searchParams.get('inStock') === 'true',
      employeePricingOnly: searchParams.get('employee') === 'true',
      sortBy,
    }
  })

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.categories.length) params.set('categories', filters.categories.join(','))
    if (filters.colours.length) params.set('colours', filters.colours.join(','))
    if (filters.sizes.length) params.set('sizes', filters.sizes.join(','))
    if (filters.fit.length) params.set('fit', filters.fit.join(','))
    if (filters.material.length) params.set('material', filters.material.join(','))
    if (filters.brands.length) params.set('brands', filters.brands.join(','))
    if (filters.priceRange.min > filterConfig.priceRange.min) params.set('minPrice', filters.priceRange.min.toString())
    if (filters.priceRange.max < filterConfig.priceRange.max) params.set('maxPrice', filters.priceRange.max.toString())
    if (filters.isPremium) params.set('premium', 'true')
    if (filters.isEcoFriendly) params.set('eco', 'true')
    if (filters.inStock) params.set('inStock', 'true')
    if (filters.employeePricingOnly) params.set('employee', 'true')
    if (filters.sortBy !== 'featured') params.set('sort', filters.sortBy)

    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  // Handle filter changes
  const handleFilterChange = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  // Clear all filters
  const handleClearAll = useCallback(() => {
    setFilters({
      ...defaultFilterState,
      priceRange: { min: filterConfig.priceRange.min, max: filterConfig.priceRange.max },
    })
  }, [])

  // Remove a single filter
  const handleRemoveFilter = useCallback((key: keyof FilterState, value?: string) => {
    setFilters(prev => {
      const newFilters = { ...prev }

      if (key === 'priceRange') {
        newFilters.priceRange = { min: filterConfig.priceRange.min, max: filterConfig.priceRange.max }
      } else if (key === 'isPremium' || key === 'isEcoFriendly' || key === 'inStock' || key === 'employeePricingOnly') {
        newFilters[key] = false
      } else if (Array.isArray(newFilters[key]) && value) {
        (newFilters[key] as string[]) = (prev[key] as string[]).filter(v => v !== value)
      }

      return newFilters
    })
  }, [])

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts]

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    // Price filter
    result = result.filter(p =>
      p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    )

    // Colour filter
    if (filters.colours.length > 0) {
      result = result.filter(p =>
        p.colours.some(c => filters.colours.includes(c))
      )
    }

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter(p =>
        p.sizes.some(s => filters.sizes.includes(s))
      )
    }

    // Fit filter
    if (filters.fit.length > 0) {
      result = result.filter(p => filters.fit.includes(p.fit))
    }

    // Material filter
    if (filters.material.length > 0) {
      result = result.filter(p => filters.material.includes(p.material))
    }

    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand))
    }

    // Premium filter
    if (filters.isPremium) {
      result = result.filter(p => p.isPremium)
    }

    // Eco-friendly filter
    if (filters.isEcoFriendly) {
      result = result.filter(p => p.isEcoFriendly)
    }

    // In stock filter
    if (filters.inStock) {
      result = result.filter(p => p.inStock)
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'best-selling':
        result.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        break
      case 'top-rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'featured':
      default:
        // Keep original order for featured
        break
    }

    return result
  }, [filters])

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.categories.length > 0 ||
      filters.colours.length > 0 ||
      filters.sizes.length > 0 ||
      filters.fit.length > 0 ||
      filters.material.length > 0 ||
      filters.brands.length > 0 ||
      filters.priceRange.min > filterConfig.priceRange.min ||
      filters.priceRange.max < filterConfig.priceRange.max ||
      filters.isPremium ||
      filters.isEcoFriendly ||
      filters.inStock ||
      filters.employeePricingOnly
    )
  }, [filters])

  return (
    <div className="section-light min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-border-light)]">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-[var(--text-small)]">
            <Link to="/" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-gilson-red)]">
              Home
            </Link>
            <span className="text-[var(--color-text-tertiary)]">/</span>
            <span className="text-[var(--color-text-primary)] font-medium">Shop All</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-headline text-[var(--color-text-primary)] mb-2">
            SHOP ALL
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Premium Gil-Son branded merchandise for the whole team
          </p>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="mb-6">
            <ActiveFilters
              filters={filters}
              priceRange={filterConfig.priceRange}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAll}
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-bold text-[var(--text-title)] text-[var(--color-text-primary)] flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAll}
                    className="text-[var(--text-small)] text-[var(--color-gilson-red)] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-0">
                {/* Categories */}
                <FilterSection title="Category" subtitle="(Select all that apply)">
                  <CheckboxFilter
                    options={filterConfig.categories}
                    selected={filters.categories}
                    onChange={(values) => handleFilterChange('categories', values)}
                  />
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range">
                  <PriceRangeSlider
                    min={filterConfig.priceRange.min}
                    max={filterConfig.priceRange.max}
                    value={filters.priceRange}
                    onChange={(range) => handleFilterChange('priceRange', range)}
                  />
                </FilterSection>

                {/* Colours */}
                <FilterSection title="Colour">
                  <ColourSwatches
                    colours={colourOptions}
                    selected={filters.colours}
                    onChange={(values) => handleFilterChange('colours', values)}
                    showCounts
                  />
                </FilterSection>

                {/* Sizes */}
                <FilterSection title="Size">
                  <SizeFilter
                    sizes={filterConfig.sizes}
                    selected={filters.sizes}
                    onChange={(values) => handleFilterChange('sizes', values)}
                  />
                </FilterSection>

                {/* Fit */}
                <FilterSection title="Fit">
                  <CheckboxFilter
                    options={filterConfig.fits}
                    selected={filters.fit}
                    onChange={(values) => handleFilterChange('fit', values)}
                  />
                </FilterSection>

                {/* Material */}
                <FilterSection title="Material">
                  <CheckboxFilter
                    options={filterConfig.materials}
                    selected={filters.material}
                    onChange={(values) => handleFilterChange('material', values)}
                    initialVisibleCount={4}
                  />
                </FilterSection>

                {/* Brand */}
                <FilterSection title="Brand">
                  <CheckboxFilter
                    options={filterConfig.brands}
                    selected={filters.brands}
                    onChange={(values) => handleFilterChange('brands', values)}
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
                      onChange={(checked) => handleFilterChange('isPremium', checked)}
                    />
                    <ToggleFilter
                      label="Eco-Friendly"
                      description="Sustainable and recycled materials"
                      checked={filters.isEcoFriendly}
                      onChange={(checked) => handleFilterChange('isEcoFriendly', checked)}
                    />
                    <ToggleFilter
                      label="In Stock Only"
                      checked={filters.inStock}
                      onChange={(checked) => handleFilterChange('inStock', checked)}
                    />
                    <ToggleFilter
                      label="Employee Pricing Available"
                      checked={filters.employeePricingOnly}
                      onChange={(checked) => handleFilterChange('employeePricingOnly', checked)}
                    />
                  </div>
                </FilterSection>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border-light)]">
              <p className="text-[var(--color-text-secondary)] text-[var(--text-small)]">
                Showing <span className="font-semibold text-[var(--color-text-primary)]">{filteredProducts.length}</span> products
              </p>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden btn btn-secondary btn-sm flex-1 sm:flex-none"
                >
                  <Filter size={16} />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 px-1.5 py-0.5 bg-[var(--color-gilson-red)] text-white text-[10px] rounded-full">
                      {filters.categories.length + filters.colours.length + filters.sizes.length + filters.brands.length + (filters.isPremium ? 1 : 0) + (filters.isEcoFriendly ? 1 : 0)}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value as SortOption)}
                    className="w-full sm:w-auto appearance-none bg-white border border-[var(--color-border-light)] rounded-[var(--radius-md)] px-4 py-2 pr-10 font-heading text-[var(--text-small)] cursor-pointer hover:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gilson-red)]/20 focus:border-[var(--color-gilson-red)]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-[var(--color-border-light)] rounded-[var(--radius-md)] overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[var(--color-gilson-red)] text-white'
                        : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-secondary)]'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[var(--color-gilson-red)] text-white'
                        : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-secondary)]'
                    }`}
                    aria-label="List view"
                  >
                    <LayoutList size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-4 lg:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-[var(--color-surface-secondary)] rounded-full flex items-center justify-center">
                  <Filter size={40} className="text-[var(--color-text-tertiary)]" />
                </div>
                <h3 className="font-heading font-bold text-[var(--text-title)] text-[var(--color-text-primary)] mb-2">
                  No products found
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your filters. Try adjusting your selections or clear all filters to see our full catalogue.
                </p>
                <button
                  onClick={handleClearAll}
                  className="btn btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        filterConfig={filterConfig}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        resultCount={filteredProducts.length}
      />
    </div>
  )
}
