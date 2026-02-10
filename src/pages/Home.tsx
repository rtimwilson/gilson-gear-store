import { Link } from 'react-router'
import { ArrowRight, Truck, Shield, Heart, Award, Star } from 'lucide-react'
import { categories, bundles, getFeaturedProducts, getBundleProducts } from '../data/products'
import type { Product } from '../types/product'

// Map badge types to display styles
function getBadgeClass(badge: Product['badge']): string {
  switch (badge) {
    case 'new':
      return 'badge badge-new'
    case 'best-seller':
      return 'badge badge-sale'
    case 'premium':
      return 'badge badge-employee'
    case 'popular':
      return 'badge badge-new'
    case 'sale':
      return 'badge badge-sale'
    default:
      return 'badge'
  }
}

function getBadgeLabel(badge: Product['badge']): string {
  switch (badge) {
    case 'new':
      return 'New'
    case 'best-seller':
      return 'Best Seller'
    case 'premium':
      return 'Premium'
    case 'popular':
      return 'Popular'
    case 'sale':
      return 'Sale'
    default:
      return ''
  }
}

const featuredProducts = getFeaturedProducts(4)

// Use first 3 bundles for homepage display
const displayBundles = bundles.slice(0, 3)

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-dark relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Red Gradient Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-gilson-red)]/20 to-transparent" />

        <div className="container relative">
          <div className="py-24 lg:py-32 max-w-3xl">
            <span className="inline-block badge badge-new mb-6">Official Merchandise</span>
            <h1 className="font-display text-hero text-white mb-6">
              GEAR UP WITH
              <span className="block gradient-text-red">GIL-SON</span>
            </h1>
            <p className="text-[var(--color-text-on-dark-secondary)] text-subtitle max-w-xl mb-8">
              Premium apparel, drinkware, and accessories for the Gil-Son family. Built to last, just like everything we do.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop All Products
                <ArrowRight size={20} />
              </Link>
              <Link to="/shop/premium" className="btn btn-ghost-light btn-lg">
                View Premium Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="section-light py-[var(--spacing-section)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-headline text-[var(--color-text-primary)] mb-4">
              FIND YOUR GEAR
            </h2>
            <p className="text-[var(--color-text-secondary)] text-subtitle max-w-2xl mx-auto">
              Browse by category to find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/shop/${category.slug}`}
                className="group relative aspect-square rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-surface-tertiary)]"
              >
                {/* Placeholder gradient - replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gilson-navy)] to-[var(--color-gilson-blue)] opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="font-heading font-semibold text-white text-[var(--text-title)] mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-[var(--text-small)]">
                    {category.productCount} Products
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[var(--color-gilson-red)] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-light-alt py-[var(--spacing-section)]">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-headline text-[var(--color-text-primary)] mb-2">
                FEATURED PRODUCTS
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Our most popular gear, picked by the team
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-[var(--color-gilson-red)] font-heading font-semibold hover:gap-3 transition-all"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group card card-bordered"
              >
                {/* Image */}
                <div className="relative aspect-square bg-[var(--color-surface-tertiary)] overflow-hidden">
                  {/* Placeholder - replace with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gilson-blue)]/20 to-[var(--color-gilson-red)]/20" />

                  {product.badge && (
                    <span className={`absolute top-3 left-3 ${getBadgeClass(product.badge)}`}>
                      {getBadgeLabel(product.badge)}
                    </span>
                  )}

                  {/* Quick View on Hover */}
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

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-[var(--color-gilson-red)]">
                      ${product.price.toFixed(2)} CAD
                    </span>
                  </div>
                  <span className="text-[var(--text-xs)] text-[var(--color-text-tertiary)]">
                    Employee: ${product.employeePrice.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="btn btn-secondary">
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Gil-Son Gear - Dark Section */}
      <section className="section-dark py-[var(--spacing-section)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-headline text-white mb-4">
              MORE THAN JUST MERCH
            </h2>
            <p className="text-[var(--color-text-on-dark-secondary)] text-subtitle max-w-2xl mx-auto">
              When you wear Gil-Son gear, you're part of a family that's been building Atlantic Canada for over 50 years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-red flex items-center justify-center">
                <Award size={28} className="text-white" />
              </div>
              <h3 className="font-heading font-semibold text-white text-[var(--text-title)] mb-3">
                Premium Quality
              </h3>
              <p className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)]">
                We partner with brands like Carhartt, YETI, and Stanley because quality matters
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-red flex items-center justify-center">
                <Truck size={28} className="text-white" />
              </div>
              <h3 className="font-heading font-semibold text-white text-[var(--text-title)] mb-3">
                Free Shipping
              </h3>
              <p className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)]">
                Orders over $75 ship free anywhere in Canada. Employees get free shipping at $50
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-red flex items-center justify-center">
                <Heart size={28} className="text-white" />
              </div>
              <h3 className="font-heading font-semibold text-white text-[var(--text-title)] mb-3">
                Family Focused
              </h3>
              <p className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)]">
                Kids sizes, family bundles, and gear the whole crew can enjoy together
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-red flex items-center justify-center">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="font-heading font-semibold text-white text-[var(--text-title)] mb-3">
                Canadian Made
              </h3>
              <p className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)]">
                Designed in Halifax. Supporting local suppliers and print partners across Canada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bundles Section */}
      <section className="section-light py-[var(--spacing-section)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-headline text-[var(--color-text-primary)] mb-4">
              CURATED BUNDLES
            </h2>
            <p className="text-[var(--color-text-secondary)] text-subtitle max-w-2xl mx-auto">
              Save more when you bundle. Perfect for new hires, gifts, or treating yourself
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayBundles.map((bundle) => {
              const bundleProducts = getBundleProducts(bundle)
              return (
                <div
                  key={bundle.id}
                  className="card card-bordered flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-[var(--color-gilson-navy)] to-[var(--color-gilson-blue)] relative">
                    <div className="absolute top-3 left-3 badge badge-sale">
                      Save ${bundle.savings.toFixed(2)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-heading font-bold text-[var(--text-title)] text-[var(--color-text-primary)] mb-2">
                      {bundle.name}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-[var(--text-small)] mb-4">
                      {bundle.description}
                    </p>

                    <ul className="mb-6 space-y-2">
                      {bundleProducts.map((product) => (
                        <li
                          key={product.id}
                          className="flex items-center gap-2 text-[var(--color-text-secondary)] text-[var(--text-small)]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gilson-red)] flex-shrink-0" />
                          {product.name}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-heading font-bold text-[var(--text-title)] text-[var(--color-gilson-red)]">
                          ${bundle.bundlePrice.toFixed(2)} CAD
                        </span>
                        <span className="text-[var(--text-small)] text-[var(--color-text-tertiary)] line-through">
                          ${bundle.retailPrice.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[var(--text-xs)] text-[var(--color-text-tertiary)] mb-4">
                        Employee: ${bundle.employeeBundlePrice.toFixed(2)} CAD
                      </p>
                      <button className="btn btn-primary w-full">
                        Add Bundle to Cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="gradient-red py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-display text-headline text-white mb-2">
                JOIN THE CREW
              </h2>
              <p className="text-white/80 max-w-md">
                Get early access to new products, employee-only deals, and 10% off your first order
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-[var(--radius-lg)] bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 min-w-[280px]"
              />
              <button type="submit" className="btn bg-white text-[var(--color-gilson-red)] hover:bg-white/90">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
