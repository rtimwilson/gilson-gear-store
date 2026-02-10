// Product Types for Gil-Son E-Commerce
// Comprehensive product model with all filterable attributes

export interface ProductVariant {
  id: string
  colour: string
  colourHex: string
  size: string
  sku: string
  inStock: boolean
  stockCount?: number
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string

  // Pricing
  price: number
  employeePrice: number
  compareAtPrice?: number // For showing "was" price
  currency: 'CAD'

  // Categorization
  category: string
  subcategory: string
  tags: string[]

  // Attributes
  brand: string
  fit: 'mens' | 'womens' | 'unisex' | 'kids'
  material: string
  features: string[]

  // Variants
  colours: string[]
  sizes: string[]
  variants: ProductVariant[]

  // Images
  images: string[]
  thumbnailUrl: string

  // Badges & Status
  badge?: 'new' | 'best-seller' | 'sale' | 'premium' | 'popular' | 'limited'
  isNew: boolean
  isBestSeller: boolean
  isPremium: boolean
  isEcoFriendly: boolean
  inStock: boolean

  // Metrics
  rating: number
  reviewCount: number
  soldCount: number

  // Dates
  createdAt: string
  updatedAt: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  subcategories: ProductSubcategory[]
}

export interface ProductSubcategory {
  id: string
  name: string
  slug: string
  productCount: number
}
