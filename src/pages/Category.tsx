import { Link, useParams } from 'react-router'
import { ArrowRight, ChevronDown, Star, Filter } from 'lucide-react'
import { useState, useMemo } from 'react'
import { categories, getProductsByCategory } from '../data/products'
import type { Product } from '../types/product'
import type { SortOption } from '../types/filters'
import { sortOptions } from '../types/filters'

// ProductCard - matches the Shop page card style
function ProductCard({ product }: { product: Product }) {
  const badgeClass = product.badge === 'new' ? 'badge-new' :
    product.badge === 'best-seller' ? 'badge-sale' :
    product.badge === 'premium' ? 'badge-premium' :
    product.badge === 'popular' ? 'badge-employee' : ''

  const badgeLabel = product.badge === 'best-seller' ? 'Best Seller' :
    product.badge === 'new' ? 'New' :
    product.badge === 'premium' ? 'Premium' :
    product.badge === 'popular' ? 'Popular' : product.badge

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
            {badgeLabel}
          </span>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="btn btn-primary btn-sm">Quick View</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-[var(--text-xs)] text-[var(--color-text-tertiary)] mb-1 uppercase tracking-wider">
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
            ${product.price.toFixed(2)} CAD
          </span>
          <span className="text-[var(--text-xs)] text-[var(--color-text-tertiary)]">
            Emp: ${product.employeePrice.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function Category() {
  const { category: categorySlug } = useParams()
  const category = categories.find(c => c.slug === categorySlug)
  const allCategoryProducts = categorySlug ? getProductsByCategory(categorySlug) : []

  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  // Filter by subcategory and sort
  const filteredProducts = useMemo(() => {
    let result = activeSubcategory
      ? allCategoryProducts.filter(p => p.subcategory === activeSubcategory)
      : [...allCategoryProducts]

    switch (sortBy) {
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
        break
    }

    return result
  }, [allCategoryProducts, sortBy, activeSubcategory])

  // Category not found
  if (!category) {
    return (
      <div className="section-light min-h-screen">
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h1 className="font-display text-headline text-[var(--color-text-primary)] mb-4">
              CATEGORY NOT FOUND
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Sorry, we couldn't find that category. Browse our full catalogue instead.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Browse All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-light min-h-screen">
      {/* Hero Banner */}
      <div className="gradient-navy py-16">
        <div className="container">
          <nav className="flex items-center gap-2 text-[var(--text-small)] mb-6">
            <Link to="/" className="text-white/60 hover:text-white">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link to="/shop" className="text-white/60 hover:text-white">
              Shop
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">{category.name}</span>
          </nav>

          <h1 className="font-display text-hero text-white mb-4">
            {category.name.toUpperCase()}
          </h1>
          <p className="text-white/70 text-subtitle max-w-2xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        {/* Subcategory Navigation */}
        {category.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`px-4 py-2 rounded-full font-heading text-[var(--text-small)] border transition-all ${
                activeSubcategory === null
                  ? 'bg-[var(--color-gilson-red)] text-white border-[var(--color-gilson-red)]'
                  : 'bg-white text-[var(--color-text-primary)] border-[var(--color-border-light)] hover:border-[var(--color-gilson-red)]'
              }`}
            >
              All {category.name} ({allCategoryProducts.length})
            </button>
            {category.subcategories.map((sub) => {
              const subCount = allCategoryProducts.filter(p => p.subcategory === sub.slug).length
              return (
                <button
                  key={sub.slug}
                  onClick={() => setActiveSubcategory(sub.slug === activeSubcategory ? null : sub.slug)}
                  className={`px-4 py-2 rounded-full font-heading text-[var(--text-small)] border transition-all ${
                    activeSubcategory === sub.slug
                      ? 'bg-[var(--color-gilson-red)] text-white border-[var(--color-gilson-red)]'
                      : 'bg-white text-[var(--color-text-primary)] border-[var(--color-border-light)] hover:border-[var(--color-gilson-red)]'
                  }`}
                >
                  {sub.name} ({subCount})
                </button>
              )
            })}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--color-border-light)]">
          <p className="text-[var(--color-text-secondary)] text-[var(--text-small)]">
            Showing <span className="font-semibold text-[var(--color-text-primary)]">{filteredProducts.length}</span>{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-[var(--color-border-light)] rounded-[var(--radius-md)] px-4 py-2 pr-10 font-heading text-[var(--text-small)] cursor-pointer hover:border-[var(--color-border-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gilson-red)]/20 focus:border-[var(--color-gilson-red)]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
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
              No products yet
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
              We're adding products to this subcategory. Check back soon or browse all {category.name.toLowerCase()}.
            </p>
            <button
              onClick={() => setActiveSubcategory(null)}
              className="btn btn-primary"
            >
              View All {category.name}
            </button>
          </div>
        )}

        {/* Browse Other Categories */}
        <div className="mt-16 pt-16 border-t border-[var(--color-border-light)]">
          <h2 className="font-display text-headline text-[var(--color-text-primary)] mb-8">
            BROWSE OTHER CATEGORIES
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter(c => c.slug !== categorySlug)
              .slice(0, 4)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className="group relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-tertiary)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gilson-navy)] to-[var(--color-gilson-blue)] opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="font-heading font-semibold text-white text-[var(--text-title)] mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-[var(--text-small)]">
                      {cat.productCount} Products
                    </p>
                  </div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[var(--color-gilson-red)] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
