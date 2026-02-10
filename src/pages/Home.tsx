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
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/hero-banner.jpg"
            alt="Gil-Son branded merchandise flat-lay"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gilson-navy)]/90 via-[var(--color-gilson-navy)]/70 to-transparent" />
        </div>

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
                {/* Category Banner Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-gilson-navy)]/80 via-[var(--color-gilson-navy)]/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-end justify-end p-4 text-left">
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
                  <img
                    src={product.thumbnailUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

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
                  {/* Image — show first product in bundle */}
                  <div className="aspect-video bg-[var(--color-surface-tertiary)] relative overflow-hidden">
                    {bundleProducts.length > 0 && (
                      <img
                        src={bundleProducts[0].images[0]}
                        alt={bundle.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
