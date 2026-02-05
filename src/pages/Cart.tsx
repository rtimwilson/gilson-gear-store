import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export function Cart() {
  const cartItems: unknown[] = []; // TODO: Connect to cart state

  return (
    <>
      <Helmet>
        <title>Your Cart | Gil-Son Gear</title>
      </Helmet>
      <div className="container-xl py-16">
        <h1 className="section-title-display">YOUR CART</h1>

        {cartItems.length === 0 ? (
          <div className="mt-12 text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-surface-light rounded-full mb-6">
              <ShoppingBag className="w-10 h-10 text-text-dark-muted" />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-text-dark mb-2">
              Your cart is empty
            </h2>
            <p className="text-text-dark-secondary mb-8">
              Looks like you haven't added any Gil-Son gear yet.
            </p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            {/* Cart items will go here */}
          </div>
        )}
      </div>
    </>
  );
}
