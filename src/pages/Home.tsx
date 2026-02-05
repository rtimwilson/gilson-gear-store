import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories } from '../data/navigation';

export function Home() {
  return (
    <>
      <Helmet>
        <title>Gil-Son Gear | Official Merchandise Store</title>
        <meta
          name="description"
          content="Shop official Gil-Son Construction branded merchandise. Premium apparel, drinkware, hockey gear, and more for employees, customers, and families across Atlantic Canada."
        />
      </Helmet>

      {/* Hero Section - Dark with Red Accent */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle-dark" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gilson-red/10 to-transparent" />

        <div className="container-xl relative py-20 lg:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-eyebrow">Official Gil-Son Merchandise</span>
            </motion.div>

            <motion.h1
              className="hero-display text-text-light mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              GEAR UP<br />
              <span className="text-gilson-red">GIL-SON</span> STYLE
            </motion.h1>

            <motion.p
              className="hero-subtitle text-text-light-secondary mt-6 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Premium apparel, drinkware, and gear for employees, customers, and families
              across Atlantic Canada. Built tough. Worn proud.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/shop" className="btn-primary">
                Shop All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/shop/apparel" className="btn-ghost">
                Browse Apparel
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="section-white border-b border-border-light">
        <div className="container-xl py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-text-dark-secondary">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-gilson-red" />
              <span className="font-heading font-medium text-sm">Free Shipping Over $75</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-gilson-red" />
              <span className="font-heading font-medium text-sm">Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-gilson-red" />
              <span className="font-heading font-medium text-sm">Premium Brands</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-gilson-red" />
              <span className="font-heading font-medium text-sm">Employee Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-white py-20 lg:py-28">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Browse by Category</span>
            <h2 className="section-title mt-4">FIND YOUR GEAR</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/shop/${category.slug}`}
                  className="group block relative aspect-square rounded-xl overflow-hidden bg-surface-light"
                >
                  {/* Placeholder gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gilson-blue/20 to-gilson-red/20" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="font-display text-xl lg:text-2xl text-white tracking-wide">
                      {category.name.toUpperCase()}
                    </h3>
                    <p className="text-sm text-text-light-secondary mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gilson-red rounded-xl transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bundles - Red Section */}
      <section className="section-red py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle-dark opacity-50" />

        <div className="container-xl relative">
          <div className="text-center mb-12">
            <span className="section-eyebrow text-white/80">Save with Bundles</span>
            <h2 className="section-title-display text-white mt-4">BUNDLE UP & SAVE</h2>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Get more for less with our curated gear bundles. Perfect for new employees,
              families, or anyone who wants the complete Gil-Son experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Welcome Kit */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge bg-white/20 text-white">Most Popular</span>
              <h3 className="font-display text-3xl text-white mt-4">WELCOME KIT</h3>
              <p className="text-white/70 mt-2">
                T-shirt, cap, and travel mug — everything you need to get started.
              </p>
              <div className="mt-6">
                <span className="font-display text-4xl text-white">$39.99</span>
                <span className="text-white/60 ml-2 line-through">$54.99</span>
              </div>
              <Link
                to="/product/welcome-kit"
                className="btn-ghost w-full mt-6 justify-center"
              >
                View Bundle
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Premium Starter */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="badge badge-premium">Premium</span>
              <h3 className="font-display text-3xl text-white mt-4">PREMIUM STARTER</h3>
              <p className="text-white/70 mt-2">
                Hoodie, performance tee, cap, and YETI tumbler — the full experience.
              </p>
              <div className="mt-6">
                <span className="font-display text-4xl text-white">$99.99</span>
                <span className="text-white/60 ml-2 line-through">$129.99</span>
              </div>
              <Link
                to="/product/premium-starter"
                className="btn-ghost w-full mt-6 justify-center"
              >
                View Bundle
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Gil-Son Gear - Light Section */}
      <section className="section-light py-20 lg:py-28">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="section-eyebrow">Why Gil-Son Gear?</span>
              <h2 className="section-title mt-4">
                MORE THAN<br />JUST MERCH
              </h2>
              <p className="text-text-dark-secondary mt-6 leading-relaxed">
                For over 50 years, Gil-Son Construction has been Atlantic Canada's trusted
                partner for mechanical, electrical, and HVAC-R solutions. Our gear reflects
                the same commitment to quality and durability that our 350+ professionals
                bring to every job.
              </p>
              <p className="text-text-dark-secondary mt-4 leading-relaxed">
                Whether you're on a job site, at a hockey game, or just grabbing coffee,
                wear your Gil-Son pride with gear that's built to last.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/about" className="btn-secondary">
                  Our Story
                </Link>
                <Link to="/shop" className="btn-primary">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Placeholder for image grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gradient-to-br from-gilson-blue/30 to-gilson-red/30 rounded-xl" />
                <div className="aspect-square bg-gradient-to-br from-gilson-red/30 to-gilson-blue/30 rounded-xl mt-8" />
                <div className="aspect-square bg-gradient-to-br from-surface-gray to-surface-light rounded-xl" />
                <div className="aspect-square bg-gradient-to-br from-gilson-blue/20 to-gilson-red/20 rounded-xl mt-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-dark py-20 lg:py-28 relative">
        <div className="absolute inset-0 bg-grid-subtle-dark" />
        <div className="container-xl relative text-center">
          <h2 className="section-title-display text-white">
            READY TO GEAR UP?
          </h2>
          <p className="text-text-light-secondary mt-4 max-w-xl mx-auto">
            Join the Gil-Son family. Browse our collection and find gear that matches
            your Atlantic Canadian pride.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link to="/shop" className="btn-primary">
              Shop All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
