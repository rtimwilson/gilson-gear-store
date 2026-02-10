import { Link, useParams } from 'react-router'
import { Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw, Star, ArrowRight, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { getProductBySlug, getRelatedProducts, colourOptions, categories } from '../data/products'
import type { Product as ProductType } from '../types/product'

// Map badge types to display styles
function getBadgeClass(badge: ProductType['badge']): string {
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

function getBadgeLabel(badge: ProductType['badge']): string {
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

// Get hex colour from colour name
function getColourHex(colourName: string): string {
  const found = colourOptions.find(c => c.name === colourName)
  return found?.hex ?? '#6B7280'
}

// Get category display name from slug
function getCategoryName(categorySlug: string): string {
  const found = categories.find(c => c.id === categorySlug)
  return found?.name ?? categorySlug
}

export default function Product() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const relatedProducts = product ? getRelatedProducts(product, 4) : []

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColour, setSelectedColour] = useState<string>('')

  // Set defaults once product loads
  if (product && !selectedSize && product.sizes.length > 0) {
    // Default to 'M' if available, otherwise first size
    const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0]
    setSelectedSize(defaultSize)
  }
  if (product && !selectedColour && product.colours.length > 0) {
    setSelectedColour(product.colours[0])
  }

  // Product not found
  if (!product) {
    return (
      <div className="section-light min-h-screen">
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center">
              <ShoppingBag size={40} className="text-[var(--color-text-tertiary)]" />
            </div>
            <h1 className="font-display text-headline text-[var(--color-text-primary)] mb-4">
              PRODUCT NOT FOUND
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Sorry, we couldn't find the product you're looking for.
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
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-border-light)]">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-[var(--text-small)]">
            <Link to="/" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-gilson-red)]">
              Home
            </Link>
            <span className="text-[var(--color-text-tertiary)]">/</span>
            <Link to="/shop" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-gilson-red)]">
              Shop
            </Link>
            <span className="text-[var(--color-text-tertiary)]">/</span>
            <Link
              to={`/shop/${product.category}`}
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-gilson-red)]"
            >
              {getCategoryName(product.category)}
            </Link>
            <span className="text-[var(--color-text-tertiary)]">/</span>
            <span className="text-[var(--color-text-primary)] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-[var(--color-surface-tertiary)] rounded-[var(--radius-xl)] overflow-hidden mb-4 relative">
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-gilson-blue)]/20 to-[var(--color-gilson-red)]/20 flex items-center justify-center">
                <span className="text-6xl opacity-20">
                  {product.category === 'apparel' && '👕'}
                  {product.category === 'headwear' && '🧢'}
                  {product.category === 'drinkware' && '🥤'}
                  {product.category === 'hockey' && '🏒'}
                  {product.category === 'kids' && '👶'}
                  {product.category === 'bags' && '🎒'}
                  {product.category === 'accessories' && '🔧'}
                  {product.category === 'premium' && '🎁'}
                </span>
              </div>
              {product.badge && (
                <span className={`absolute top-4 left-4 ${getBadgeClass(product.badge)}`}>
                  {getBadgeLabel(product.badge)}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="aspect-square bg-[var(--color-surface-tertiary)] rounded-[var(--radius-lg)] overflow-hidden border-2 border-transparent hover:border-[var(--color-gilson-red)] transition-colors"
                >
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-gilson-blue)]/10 to-[var(--color-gilson-red)]/10" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              {/* Brand */}
              <p className="text-[var(--text-small)] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">
                {product.brand}
              </p>

              <h1 className="font-display text-headline text-[var(--color-text-primary)] mb-4">
                {product.name.toUpperCase()}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-[var(--text-small)] text-[var(--color-text-secondary)]">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-4">
                <span className="font-heading font-bold text-[var(--text-title)] text-[var(--color-gilson-red)]">
                  ${product.price.toFixed(2)} CAD
                </span>
                <span className="text-[var(--color-text-tertiary)]">
                  Employee Price: ${product.employeePrice.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Material & Weight */}
            <div className="flex flex-wrap gap-4 mb-6 text-[var(--text-small)]">
              <span className="px-3 py-1 rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]">
                {product.material}
              </span>
              {product.weight && (
                <span className="px-3 py-1 rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]">
                  {product.weight}
                </span>
              )}
              {product.fulfillmentChannel === 'premium' && (
                <span className="px-3 py-1 rounded-full bg-[var(--color-gilson-red)]/10 text-[var(--color-gilson-red)] font-medium">
                  Premium Brand
                </span>
              )}
            </div>

            {/* Colour Selection */}
            {product.colours.length > 1 && (
              <div className="mb-6">
                <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-3">
                  Colour: {selectedColour}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colours.map((colour) => (
                    <button
                      key={colour}
                      onClick={() => setSelectedColour(colour)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColour === colour
                          ? 'border-[var(--color-gilson-red)] ring-2 ring-[var(--color-gilson-red)]/20'
                          : 'border-[var(--color-border-light)] hover:border-[var(--color-text-tertiary)]'
                      }`}
                      style={{ backgroundColor: getColourHex(colour) }}
                      title={colour}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold text-[var(--color-text-primary)]">
                    Size
                  </h3>
                  <button className="text-[var(--text-small)] text-[var(--color-gilson-red)] hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-[var(--radius-md)] font-heading text-[var(--text-small)] border transition-all ${
                        selectedSize === size
                          ? 'bg-[var(--color-gilson-red)] text-white border-[var(--color-gilson-red)]'
                          : 'bg-white text-[var(--color-text-primary)] border-[var(--color-border-light)] hover:border-[var(--color-gilson-red)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-3">
                Quantity
              </h3>
              <div className="inline-flex items-center border border-[var(--color-border-light)] rounded-[var(--radius-lg)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-heading font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <button className="btn btn-primary flex-1">
                Add to Cart — ${(product.price * quantity).toFixed(2)} CAD
              </button>
              <button className="btn btn-secondary p-3">
                <Heart size={20} />
              </button>
              <button className="btn btn-secondary p-3">
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--color-surface-secondary)] rounded-[var(--radius-lg)]">
              <div className="text-center">
                <Truck size={24} className="mx-auto mb-2 text-[var(--color-gilson-red)]" />
                <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                  Free Shipping<br />over $75
                </p>
              </div>
              <div className="text-center">
                <Shield size={24} className="mx-auto mb-2 text-[var(--color-gilson-red)]" />
                <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                  Quality<br />Guaranteed
                </p>
              </div>
              <div className="text-center">
                <RotateCcw size={24} className="mx-auto mb-2 text-[var(--color-gilson-red)]" />
                <p className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                  Easy<br />Returns
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 pt-8 border-t border-[var(--color-border-light)]">
              <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-4">
                Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[var(--color-text-secondary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gilson-red)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[var(--color-border-light)]">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[var(--text-xs)] bg-[var(--color-surface-secondary)] text-[var(--color-text-tertiary)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-[var(--color-border-light)]">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-headline text-[var(--color-text-primary)]">
                YOU MAY ALSO LIKE
              </h2>
              <Link
                to={`/shop/${product.category}`}
                className="hidden md:flex items-center gap-2 text-[var(--color-gilson-red)] font-heading font-semibold hover:gap-3 transition-all"
              >
                View All {getCategoryName(product.category)}
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  to={`/product/${related.slug}`}
                  className="group card card-bordered"
                >
                  <div className="relative aspect-square bg-[var(--color-surface-tertiary)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gilson-blue)]/20 to-[var(--color-gilson-red)]/20" />
                    {related.badge && (
                      <span className={`absolute top-3 left-3 ${getBadgeClass(related.badge)}`}>
                        {getBadgeLabel(related.badge)}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="btn btn-primary btn-sm">Quick View</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[var(--text-xs)] text-[var(--color-text-tertiary)] mb-1 uppercase tracking-wider">
                      {related.brand}
                    </p>
                    <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-gilson-red)] transition-colors line-clamp-2">
                      {related.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-[var(--text-xs)] text-[var(--color-text-secondary)]">
                        {related.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-[var(--color-gilson-red)]">
                        ${related.price.toFixed(2)} CAD
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
