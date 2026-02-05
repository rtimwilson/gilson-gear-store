import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, User, ShoppingBag } from 'lucide-react';
import { navigation } from '../../data/navigation';
import { cn } from '../../lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const cartItemCount = 0; // TODO: Connect to cart state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      {/* Promo Bar */}
      <div className="bg-gilson-red text-white py-2.5">
        <div className="container-xl flex justify-center items-center text-sm">
          <span className="font-heading font-medium tracking-wide">
            FREE SHIPPING ON ORDERS OVER $75 CAD
          </span>
          <span className="mx-3 text-white/50">|</span>
          <span className="text-white/80">Team members: $50 CAD</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-card'
            : 'bg-white'
        )}
      >
        <div className="container-xl">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="relative z-10 flex items-center">
              <img
                src="/gilson-logo.png"
                alt="Gil-Son Gear"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 font-heading font-medium text-sm tracking-wide transition-colors rounded-lg',
                      location.pathname === item.href || location.pathname.startsWith(item.href + '/')
                        ? 'text-gilson-red bg-gilson-red/5'
                        : 'text-text-dark-secondary hover:text-gilson-red hover:bg-gilson-red/5'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div
                      className={cn(
                        'absolute top-full left-0 pt-2 transition-all duration-200',
                        activeDropdown === item.label
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      )}
                    >
                      <div className="bg-white border border-border-light rounded-xl shadow-elevated min-w-[240px] py-2 overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-5 py-3 text-sm text-text-dark-secondary hover:text-gilson-red hover:bg-gilson-red/5 transition-colors border-l-2 border-transparent hover:border-gilson-red"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side: Search, Account, Cart */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                className="hidden sm:flex items-center justify-center w-11 h-11 text-text-dark-secondary hover:text-gilson-red hover:bg-gilson-red/5 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:flex items-center justify-center w-11 h-11 text-text-dark-secondary hover:text-gilson-red hover:bg-gilson-red/5 rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center justify-center w-11 h-11 text-text-dark-secondary hover:text-gilson-red hover:bg-gilson-red/5 rounded-lg transition-colors"
                aria-label={`Cart with ${cartItemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-gilson-red text-white text-xs font-semibold rounded-full">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 text-text-dark hover:text-gilson-red transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden fixed inset-0 top-[136px] bg-white/98 backdrop-blur-xl transition-all duration-300 z-40',
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        >
          <div className="container-xl py-8 h-full overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    'transition-all duration-300',
                    isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center justify-between py-4 border-b border-border-light font-heading text-lg text-text-dark hover:text-gilson-red transition-colors"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Link>
                  {item.children && (
                    <div className="pl-4 py-2 space-y-2 bg-surface-light rounded-lg my-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block py-2 px-3 text-text-dark-secondary hover:text-gilson-red transition-colors rounded-lg hover:bg-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border-light space-y-4">
              <Link
                to="/account"
                className="flex items-center justify-center gap-2 bg-surface-light text-text-dark py-4 px-6 rounded-xl font-heading font-semibold w-full hover:bg-surface-gray transition-colors"
              >
                <User className="w-5 h-5" />
                My Account
              </Link>
              <Link
                to="/cart"
                className="flex items-center justify-center gap-2 bg-gilson-red text-white py-4 px-6 rounded-xl font-heading font-semibold w-full shadow-glow-red"
              >
                <ShoppingBag className="w-5 h-5" />
                View Cart ({cartItemCount})
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
