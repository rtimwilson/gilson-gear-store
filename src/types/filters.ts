// Filter Types for Gil-Son E-Commerce
// Comprehensive filtering system matching premium e-commerce standards

export interface FilterOption {
  value: string
  label: string
  count: number
}

export interface PriceRange {
  min: number
  max: number
}

export interface ColourOption {
  name: string
  hex: string
  count: number
}

export interface FilterState {
  // Category filters
  categories: string[]
  subcategories: string[]

  // Price
  priceRange: PriceRange

  // Product attributes
  colours: string[]
  sizes: string[]
  fit: string[] // Men's, Women's, Unisex, Kids
  material: string[]

  // Brand & quality
  brands: string[]
  isPremium: boolean
  isEcoFriendly: boolean

  // Availability
  inStock: boolean
  employeePricingOnly: boolean

  // Sorting
  sortBy: SortOption
}

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-low-high'
  | 'price-high-low'
  | 'name-a-z'
  | 'name-z-a'
  | 'best-selling'
  | 'top-rated'

export interface FilterConfig {
  categories: FilterOption[]
  subcategories: Record<string, FilterOption[]>
  colours: ColourOption[]
  sizes: FilterOption[]
  fits: FilterOption[]
  materials: FilterOption[]
  brands: FilterOption[]
  priceRange: PriceRange
}

// Default filter state
export const defaultFilterState: FilterState = {
  categories: [],
  subcategories: [],
  priceRange: { min: 0, max: 500 },
  colours: [],
  sizes: [],
  fit: [],
  material: [],
  brands: [],
  isPremium: false,
  isEcoFriendly: false,
  inStock: false,
  employeePricingOnly: false,
  sortBy: 'featured',
}

// Sort options configuration
export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'name-a-z', label: 'Name: A to Z' },
  { value: 'name-z-a', label: 'Name: Z to A' },
  { value: 'top-rated', label: 'Top Rated' },
]
