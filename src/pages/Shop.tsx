import { Link } from 'react-router'
import { Filter, ChevronDown, Grid3x3, LayoutList } from 'lucide-react'
import { useState } from 'react'

const products = [
  { id: 1, name: 'Gil-Son Classic Tee', price: 34.99, employeePrice: 24.99, category: 'Apparel', badge: 'Best Seller' },
  { id: 2, name: 'Premium Work Jacket', price: 149.99, employeePrice: 119.99, category: 'Apparel', badge: 'New' },
  { id: 3, name: 'Stanley Tumbler 40oz', price: 59.99, employeePrice: 44.99, category: 'Drinkware', badge: null },
  { id: 4, name: 'Branded Hockey Stick', price: 89.99, employeePrice: 69.99, category: 'Hockey', badge: 'Popular' },
  { id: 5, name: 'Gil-Son Hoodie', price: 74.99, employeePrice: 54.99, category: 'Apparel', badge: null },
  { id: 6, name: 'Leather Patch Cap', price: 39.99, employeePrice: 29.99, category: 'Headwear', badge: 'New' },
  { id: 7, name: 'Kids Hockey Jersey', price: 49.99, employeePrice: 34.99, category: 'Kids', badge: null },
  { id: 8, name: 'YETI Rambler 26oz', price: 44.99, employeePrice: 34.99, category: 'Drinkware', badge: 'Premium' },
]

const categories = ['All', 'Apparel', 'Headwear', 'Drinkware', 'Hockey', 'Kids', 'Premium']

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory)

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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h2 className="font-heading font-bold text-[var(--text-title)] mb-6">
                Filters
              </h2>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-4">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-[var(--radius-md)] transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[var(--color-gilson-red)] text-white'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-4">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-[var(--color-gilson-red)]" />
                    <span className="text-[var(--color-text-secondary)]">Under $50</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-[var(--color-gilson-red)]" />
                    <span className="text-[var(--color-text-secondary)]">$50 - $100</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-[var(--color-gilson-red)]" />
                    <span className="text-[var(--color-text-secondary)]">$100+</span>
                  </label>
                </div>
              </div>

              {/* Employee Pricing Toggle */}
              <div className="p-4 bg-[var(--color-surface-secondary)] rounded-[var(--radius-lg)]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-heading font-semibold text-[var(--color-text-primary)]">
                    Show Employee Prices
                  </span>
                  <input type="checkbox" className="w-5 h-5 accent-[var(--color-gilson-red)]" />
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-headline text-[var(--color-text-primary)]">
                  SHOP ALL
                </h1>
                <p className="text-[var(--color-text-secondary)]">
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn btn-secondary btn-sm"
                >
                  <Filter size={16} />
                  Filters
                </button>

                {/* Sort */}
                <div className="relative">
                  <select className="appearance-none bg-[var(--color-surface-secondary)] border border-[var(--color-border-light)] rounded-[var(--radius-md)] px-4 py-2 pr-10 font-heading text-[var(--text-small)] cursor-pointer">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-[var(--color-border-light)] rounded-[var(--radius-md)] overflow-hidden">
                  <button className="p-2 bg-[var(--color-gilson-red)] text-white">
                    <Grid3x3 size={18} />
                  </button>
                  <button className="p-2 text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-secondary)]">
                    <LayoutList size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-[var(--color-surface-secondary)] rounded-[var(--radius-lg)]">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[var(--text-small)] font-heading transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[var(--color-gilson-red)] text-white'
                          : 'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border-light)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group card card-bordered"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-[var(--color-surface-tertiary)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gilson-blue)]/20 to-[var(--color-gilson-red)]/20" />

                    {product.badge && (
                      <span className={`absolute top-3 left-3 badge ${
                        product.badge === 'New' ? 'badge-new' :
                        product.badge === 'Best Seller' ? 'badge-sale' :
                        product.badge === 'Premium' ? 'badge-premium' :
                        'badge-employee'
                      }`}>
                        {product.badge}
                      </span>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="btn btn-primary btn-sm">Quick View</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <p className="text-[var(--text-xs)] text-[var(--color-text-tertiary)] mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-gilson-red)] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-[var(--color-gilson-red)]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-[var(--text-xs)] text-[var(--color-text-tertiary)]">
                        Emp: ${product.employeePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
