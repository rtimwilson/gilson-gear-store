import { Link } from 'react-router'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  colour: string
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, name: 'Gil-Son Classic Tee', price: 34.99, quantity: 2, size: 'L', colour: 'Navy' },
    { id: 2, name: 'Stanley Tumbler 40oz', price: 59.99, quantity: 1, size: 'One Size', colour: 'Black' },
  ])

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 75 ? 0 : 9.99
  const tax = subtotal * 0.15 // NS HST
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
          YOUR CART ({items.length})
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
                <div className="w-24 h-24 flex-shrink-0 bg-[var(--color-surface-tertiary)] rounded-[var(--radius-lg)] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-gilson-blue)]/20 to-[var(--color-gilson-red)]/20" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading font-semibold text-[var(--color-text-primary)] mb-1">
                        {item.name}
                      </h3>
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
                  Add <span className="font-heading font-bold text-[var(--color-gilson-red)]">${(75 - subtotal).toFixed(2)}</span> more for free shipping!
                </p>
                <div className="h-2 bg-[var(--color-border-light)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--color-gilson-red)] rounded-full transition-all"
                    style={{ width: `${Math.min(100, (subtotal / 75) * 100)}%` }}
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
                  <span>Tax (NS HST 15%)</span>
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
