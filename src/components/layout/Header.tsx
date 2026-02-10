import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Menu, X, Search, User, ShoppingBag } from 'lucide-react'

const navigation = [
  { name: 'Shop All', href: '/shop' },
  { name: 'Apparel', href: '/shop/apparel' },
  { name: 'Headwear', href: '/shop/headwear' },
  { name: 'Drinkware', href: '/shop/drinkware' },
  { name: 'Hockey', href: '/shop/hockey' },
  { name: 'Kids', href: '/shop/kids' },
  { name: 'Premium', href: '/shop/premium' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[100]">
      {/* Promo Bar */}
      <div className="gradient-navy py-2 text-center">
        <p className="text-[var(--text-xs)] font-heading font-medium text-white tracking-wide">
          FREE SHIPPING ON ORDERS OVER $75 CAD | Employee pricing available
        </p>
      </div>

      {/* Main Header */}
      <nav className="bg-[var(--color-surface-primary)] border-b border-[var(--color-border-light)]">
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-[var(--color-text-primary)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/gilson-logo.png"
                alt="Gil-Son Gear"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-4 py-2 font-heading font-medium text-[var(--text-small)] tracking-wide transition-colors ${
                      isActive
                        ? 'text-[var(--color-gilson-red)]'
                        : 'text-[var(--color-text-primary)] hover:text-[var(--color-gilson-red)]'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-gilson-red)] transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                type="button"
                className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-gilson-red)] transition-colors"
                aria-label="Account"
              >
                <User size={20} />
              </button>
              <Link
                to="/cart"
                className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-gilson-red)] transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-gilson-red)] text-white text-[10px] font-heading font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--color-border-light)] bg-[var(--color-surface-primary)]">
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 font-heading font-medium text-[var(--text-body)] rounded-[var(--radius-md)] transition-colors ${
                      isActive
                        ? 'text-[var(--color-gilson-red)] bg-[var(--color-surface-secondary)]'
                        : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
