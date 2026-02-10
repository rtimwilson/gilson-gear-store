import { Link } from 'react-router'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Apparel', href: '/shop/apparel' },
    { name: 'Headwear', href: '/shop/headwear' },
    { name: 'Drinkware', href: '/shop/drinkware' },
    { name: 'Hockey & Sports', href: '/shop/hockey' },
    { name: 'Premium Gifts', href: '/shop/premium' },
  ],
  company: [
    { name: 'About Gil-Son', href: 'https://gilson-website.vercel.app/' },
    { name: 'Careers', href: 'https://gilson-website.vercel.app/careers' },
    { name: 'Contact', href: 'https://gilson-website.vercel.app/contact' },
  ],
  support: [
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Employee Login', href: '/account' },
  ],
}

export default function Footer() {
  return (
    <footer className="section-navy">
      <div className="container">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/gilson-logo.png"
                alt="Gil-Son Construction"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)] mb-6 max-w-xs">
              Official merchandise from Gil-Son Construction. Premium quality gear for employees, customers, and fans across Atlantic Canada.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-gilson-red)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-gilson-red)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[var(--color-gilson-red)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-[var(--text-body)] mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-[var(--text-body)] mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white text-[var(--text-body)] mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--color-gilson-red)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)]">
                  3650 Kempt Road<br />
                  Halifax, NS B3K 4X8
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--color-gilson-red)] flex-shrink-0" />
                <a
                  href="tel:+19024536100"
                  className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)] hover:text-white transition-colors"
                >
                  (902) 453-6100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--color-gilson-red)] flex-shrink-0" />
                <a
                  href="mailto:gear@gilson.ca"
                  className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-small)] hover:text-white transition-colors"
                >
                  gear@gilson.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-xs)]">
            &copy; {new Date().getFullYear()} Gil-Son Construction Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-xs)] hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[var(--color-text-on-dark-secondary)] text-[var(--text-xs)] hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
