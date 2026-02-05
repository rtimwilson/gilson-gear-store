import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const footerLinks = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/shop/apparel', label: 'Apparel' },
    { href: '/shop/headwear', label: 'Headwear' },
    { href: '/shop/drinkware', label: 'Drinkware' },
    { href: '/shop/hockey', label: 'Hockey & Sports' },
    { href: '/shop/kids', label: 'Kids & Family' },
  ],
  support: [
    { href: '/size-guide', label: 'Size Guide' },
    { href: '/returns', label: 'Returns & Exchanges' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
  ],
  company: [
    { href: '/about', label: 'About Gil-Son' },
    { href: 'https://gilsonconstruction.ca', label: 'Gil-Son Construction', external: true },
    { href: '/careers', label: 'Careers' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-dark relative">
      {/* Main footer content */}
      <div className="container-xl py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block">
              <img
                src="/gilson-logo.png"
                alt="Gil-Son Gear"
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-6 text-text-light-secondary leading-relaxed max-w-sm">
              Official merchandise store for Gil-Son Construction. Premium gear for employees,
              customers, and families across Atlantic Canada.
            </p>
            <div className="mt-6 flex items-center gap-2 text-text-light">
              <MapPin className="w-5 h-5 text-gilson-red" />
              <span className="font-heading font-medium">Halifax, Nova Scotia</span>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {/* Shop */}
            <div>
              <h3 className="font-display text-xl tracking-wider text-text-light mb-6">SHOP</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-text-light-secondary hover:text-gilson-red transition-colors duration-200 flex items-center gap-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-display text-xl tracking-wider text-text-light mb-6">SUPPORT</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-text-light-secondary hover:text-gilson-red transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-display text-xl tracking-wider text-text-light mb-6">COMPANY</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-light-secondary hover:text-gilson-red transition-colors duration-200 inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-text-light-secondary hover:text-gilson-red transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Contact info */}
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:gear@gilsonconstruction.ca"
                  className="flex items-center gap-2 text-text-light-secondary hover:text-gilson-red transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  gear@gilsonconstruction.ca
                </a>
                <a
                  href="tel:+19024292922"
                  className="flex items-center gap-2 text-text-light-secondary hover:text-gilson-red transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (902) 429-2922
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-dark">
        <div className="container-xl py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-text-light-muted">
              © {currentYear} Gil-Son Construction Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-text-light-muted hover:text-text-light transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-text-light-muted hover:text-text-light transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
