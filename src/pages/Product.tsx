import { Link, useParams } from 'react-router'
import { Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import { useState } from 'react'

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
const colours = [
  { name: 'Navy', hex: '#1E3A5F' },
  { name: 'Black', hex: '#0C0F14' },
  { name: 'Red', hex: '#C41E3A' },
  { name: 'Grey', hex: '#6B7280' },
]

export default function Product() {
  const { slug } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColour, setSelectedColour] = useState('Navy')

  // Mock product data
  const product = {
    id: slug,
    name: 'Gil-Son Classic Tee',
    price: 34.99,
    employeePrice: 24.99,
    description: 'Our signature t-shirt featuring the Gil-Son logo. Made from 100% ring-spun cotton for a soft, comfortable fit. Pre-shrunk to maintain shape wash after wash.',
    features: [
      '100% ring-spun cotton',
      'Pre-shrunk fabric',
      'Side-seamed construction',
      'Tear-away label for comfort',
      'Screen-printed Gil-Son logo',
    ],
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
            <span className="text-[var(--color-text-primary)] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-[var(--color-surface-tertiary)] rounded-[var(--radius-xl)] overflow-hidden mb-4">
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-gilson-blue)]/20 to-[var(--color-gilson-red)]/20 flex items-center justify-center">
                <span className="text-6xl opacity-20">👕</span>
              </div>
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
              <span className="badge badge-employee mb-4">Best Seller</span>
              <h1 className="font-display text-headline text-[var(--color-text-primary)] mb-4">
                {product.name.toUpperCase()}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="font-heading font-bold text-[var(--text-title)] text-[var(--color-gilson-red)]">
                  ${product.price.toFixed(2)} CAD
                </span>
                <span className="text-[var(--color-text-tertiary)]">
                  Employee Price: ${product.employeePrice.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[var(--color-text-secondary)] mb-8">
              {product.description}
            </p>

            {/* Colour Selection */}
            <div className="mb-6">
              <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-3">
                Colour: {selectedColour}
              </h3>
              <div className="flex gap-3">
                {colours.map((colour) => (
                  <button
                    key={colour.name}
                    onClick={() => setSelectedColour(colour.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColour === colour.name
                        ? 'border-[var(--color-gilson-red)] ring-2 ring-[var(--color-gilson-red)]/20'
                        : 'border-[var(--color-border-light)]'
                    }`}
                    style={{ backgroundColor: colour.hex }}
                    title={colour.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
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
                {sizes.map((size) => (
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
                Add to Cart - ${(product.price * quantity).toFixed(2)}
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
          </div>
        </div>
      </div>
    </div>
  )
}
