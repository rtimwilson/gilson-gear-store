import { Link } from 'react-router'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, MapPin } from 'lucide-react'
import { useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  colour: string
  slug: string
  image: string
}

// Canadian provincial/territorial tax rates (from CLAUDE.md)
interface TaxConfig {
  label: string
  rate: number
  description: string
}

const provincialTax: Record<string, TaxConfig> = {
  NS: { label: 'HST', rate: 0.14, description: 'Nova Scotia HST (14%)' },
  NB: { label: 'HST', rate: 0.15, description: 'New Brunswick HST (15%)' },
  NL: { label: 'HST', rate: 0.15, description: 'Newfoundland & Labrador HST (15%)' },
  PE: { label: 'HST', rate: 0.15, description: 'Prince Edward Island HST (15%)' },
  ON: { label: 'HST', rate: 0.13, description: 'Ontario HST (13%)' },
  BC: { label: 'GST+PST', rate: 0.12, description: 'British Columbia GST+PST (12%)' },
  MB: { label: 'GST+RST', rate: 0.13, description: 'Manitoba GST+RST (13%)' },
  SK: { label: 'GST+PST', rate: 0.11, description: 'Saskatchewan GST+PST (11%)' },
  QC: { label: 'GST+QST', rate: 0.14975, description: 'Quebec GST+QST (14.975%)' },
  AB: { label: 'GST', rate: 0.05, description: 'Alberta GST (5%)' },
  YT: { label: 'GST', rate: 0.05, description: 'Yukon GST (5%)' },
  NT: { label: 'GST', rate: 0.05, description: 'Northwest Territories GST (5%)' },
  NU: { label: 'GST', rate: 0.05, description: 'Nunavut GST (5%)' },
}

const provinceOptions = [
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland & Labrador' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'ON', label: 'Ontario' },
  { value: 'QC', label: 'Quebec' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'AB', label: 'Alberta' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
]

// Shipping thresholds
const FREE_SHIPPING_THRESHOLD = 75
const FLAT_RATE_MID = 9.99   // orders $25-74.99
const FLAT_RATE_LOW = 12.99  // orders under $25
const MIN_FOR_MID_RATE = 25

function getShippingCost(subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  if (subtotal >= MIN_FOR_MID_RATE) return FLAT_RATE_MID
  return FLAT_RATE_LOW
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    { id: 'tee-001', name: 'Gil-Son Premium T-Shirt', price: 29.99, quantity: 2, size: 'L', colour: 'Navy', slug: 'gilson-premium-tee', image: '/images/products/premium-tee-navy-thumb.jpg' },
    { id: 'drink-001', name: 'Stanley Quencher H2.0 40oz', price: 59.99, quantity: 1, size: '40oz', colour: 'Navy', slug: 'stanley-quencher-40oz', image: '/images/products/stanley-40oz-navy-thumb.jpg' },
  ])
  const [province, setProvince] = useState('NS') // Default to Nova Scotia (HQ)

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = getShippingCost(subtotal)
  const taxConfig = provincialTax[province]
  const tax = subtotal * taxConfig.rate
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="section-light min-h-screen">
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center">
              <ShoppingBag size={40} className="text-[var(--color-text-tertiary)]" />
            </div>
            <h1 className="font-display text-headline text-[var(--color-text-primary)] mb-4">
              YOUR CART IS EMPTY
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Looks like you haven't added any items yet. Let's fix that!
            </p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
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
            <span className="text-[var(--color-text-primary)] font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <h1 className="font-display text-headline text-[var(--color-text-primary)] mb-8">
          YOUR CART ({items.reduce((sum, item) => sum + item.quantity, 0)})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white border border-[var(--color-border-light)] rounded-[var(--radius-xl)]"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.slug}`}
                  className="w-24 h-24 flex-shrink-0 bg-[var(--color-surface-tertiary)] rounded-[var(--radius-lg)] overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-heading font-semibold text-[var(--color-text-primary)] mb-1 hover:text-[var(--color-gilson-red)] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[var(--text-small)] text-[var(--color-text-tertiary)]">
                        {item.colour} / {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center border border-[var(--color-border-light)] rounded-[var(--radius-md)]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-[var(--text-small)] font-heading">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-heading font-bold text-[var(--color-text-primary)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Free Shipping Progress */}
            {shipping > 0 && (
              <div className="p-4 bg-[var(--color-surface-secondary)] rounded-[var(--radius-lg)]">
                <p className="text-[var(--text-small)] text-[var(--color-text-secondary)] mb-2">
                  {subtotal >= MIN_FOR_MID_RATE ? (
                    <>
                      Add <span className="font-heading font-bold text-[var(--color-gilson-red)]">${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</span> more for free shipping!
                    </>
                  ) : (
                    <>
                      Add <span className="font-heading font-bold text-[var(--color-gilson-red)]">${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</span> more for free shipping!
                    </>
                  )}
                </p>
                <div className="h-2 bg-[var(--color-border-light)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-gilson-red)] rounded-full transition-all"
                    style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-6 bg-[var(--color-surface-secondary)] rounded-[var(--radius-xl)]">
              <h2 className="font-heading font-bold text-[var(--text-title)] text-[var(--color-text-primary)] mb-6">
                Order Summary
              </h2>

              {/* Province Selector for Tax */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-[var(--text-small)] text-[var(--color-text-secondary)] mb-2">
                  <MapPin size={16} />
                  Shipping Province
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border-light)] bg-white text-[var(--color-text-primary)] font-heading text-[var(--text-small)] focus:outline-none focus:border-[var(--color-gilson-red)] transition-colors"
                >
                  {provinceOptions.map((prov) => (
                    <option key={prov.value} value={prov.value}>
                      {prov.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Subtotal</span>
                  <span className="font-heading">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Shipping</span>
                  <span className="font-heading">
                    {shipping === 0 ? (
                      <span className="text-[var(--color-success)]">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-[var(--color-text-secondary)]">
                  <span>Tax ({taxConfig.description})</span>
                  <span className="font-heading">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-[var(--color-border-light)] flex justify-between">
                  <span className="font-heading font-bold text-[var(--color-text-primary)]">Total</span>
                  <span className="font-heading font-bold text-[var(--text-title)] text-[var(--color-gilson-red)]">
                    ${total.toFixed(2)} CAD
                  </span>
                </div>
              </div>

              <button className="btn btn-primary w-full mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-[var(--text-small)] text-[var(--color-gilson-red)] hover:underline"
              >
                Continue Shopping
              </Link>

              {/* Employee Login Prompt */}
              <div className="mt-6 p-4 border border-[var(--color-border-light)] rounded-[var(--radius-lg)] bg-white">
                <p className="text-[var(--text-small)] text-[var(--color-text-secondary)] mb-2">
                  Gil-Son employee?
                </p>
                <button className="text-[var(--text-small)] font-heading font-semibold text-[var(--color-gilson-red)] hover:underline">
                  Sign in for employee pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
