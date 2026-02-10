import { Link, useParams } from 'react-router'

const categoryData: Record<string, { title: string; description: string }> = {
  apparel: {
    title: 'Apparel',
    description: 'T-shirts, hoodies, jackets, and more in sizes for the whole team',
  },
  headwear: {
    title: 'Headwear',
    description: 'Caps, toques, and hard hat stickers to show your Gil-Son pride',
  },
  drinkware: {
    title: 'Drinkware',
    description: 'Premium tumblers, mugs, and water bottles from YETI and Stanley',
  },
  hockey: {
    title: 'Hockey & Sports',
    description: 'Branded hockey gear and sports equipment for the whole family',
  },
  kids: {
    title: 'Kids & Family',
    description: 'Gear for the little ones - because Gil-Son is a family affair',
  },
  bags: {
    title: 'Bags & Carry',
    description: 'Backpacks, duffels, and coolers built to last',
  },
  accessories: {
    title: 'Accessories & Office',
    description: 'Stickers, pens, notebooks, and everyday essentials',
  },
  premium: {
    title: 'Premium Gifts',
    description: 'High-end gifts featuring Carhartt, YETI, and exclusive items',
  },
}

export default function Category() {
  const { category } = useParams()
  const data = categoryData[category || ''] || {
    title: 'Category',
    description: 'Browse our collection',
  }

  return (
    <div className="section-light min-h-screen">
      {/* Hero Banner */}
      <div className="gradient-navy py-16">
        <div className="container">
          <nav className="flex items-center gap-2 text-[var(--text-small)] mb-6">
            <Link to="/" className="text-white/60 hover:text-white">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link to="/shop" className="text-white/60 hover:text-white">
              Shop
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">{data.title}</span>
          </nav>

          <h1 className="font-display text-hero text-white mb-4">
            {data.title.toUpperCase()}
          </h1>
          <p className="text-white/70 text-subtitle max-w-2xl">
            {data.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center">
            <span className="text-4xl">🚧</span>
          </div>
          <h2 className="font-heading font-bold text-[var(--text-title)] text-[var(--color-text-primary)] mb-4">
            Coming Soon
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
            We're adding products to this category. Check back soon or browse our main shop.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    </div>
  )
}
