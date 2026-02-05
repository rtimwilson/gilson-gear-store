# Gil-Son Merch Store — Build Plan

## Implementation Phases

Each phase produces a working, committable state. Verify before moving on.

### Phase 1: Foundation
- [ ] Scaffold Next.js 14+ project with TypeScript strict, Tailwind, ESLint, Prettier
- [ ] Configure tailwind.config.js with full Gil-Son colour tokens, gradients, font families
- [ ] Load Google Fonts via next/font (Bebas Neue, Outfit, DM Sans)
- [ ] Create root layout with `<Nav />` and `<Footer />` components
- [ ] Nav: navy gradient background, Gil-Son logo (left), placeholder links, cart icon with badge, mobile hamburger
- [ ] Footer: navy-dark background, logo, nav columns, contact info, "Halifax, Nova Scotia" tagline
- [ ] Verify: app runs, nav and footer render correctly at mobile/tablet/desktop breakpoints

### Phase 2: Home Page
- [ ] Hero section: full-width banner with Gil-Son red overlay gradient, headline, "Shop Now" CTA
- [ ] Featured categories grid: 8 research-backed categories — Apparel, Headwear, Drinkware, Hockey & Sports, Kids & Family, Bags & Carry, Accessories & Office, Premium Gifts
- [ ] "Why Gil-Son Gear?" section: brief brand story with industrial visual treatment
- [ ] New arrivals row (placeholder products for now)
- [ ] Free shipping callout banner ("FREE SHIPPING OVER $75 CAD" for public, "$50 for team members")
- [ ] Featured bundles section: highlight Welcome Kit ($39.99) and Premium Starter Pack ($99.99)
- [ ] Verify: home page is visually polished, responsive, passes Lighthouse accessibility check

### Phase 3: Printful Integration
- [ ] Build /src/lib/printful.ts client (typed, error-handling, retry logic)
- [ ] Create /src/types/product.ts with interfaces matching Printful API responses
- [ ] API route: GET /api/products — fetches and caches product list from Printful
- [ ] API route: GET /api/products/[id] — single product with variants
- [ ] Implement ISR caching (revalidate: 3600) for product pages
- [ ] Verify: API routes return real Printful data (or mock data if API key not yet available)

### Phase 4: Shop & Product Pages
- [ ] /shop page: product grid (responsive columns), sidebar filters (category, size, colour, price range), sort controls
- [ ] Mobile filter drawer (bottom sheet pattern)
- [ ] /shop/[slug] product detail page: image gallery, variant selector (colour swatches + size), quantity, Add to Cart CTA
- [ ] Size guide link + modal/page with measurement tables (inches and centimetres)
- [ ] Related products carousel at bottom of PDP
- [ ] Support two product types: **Printful POD** (add to cart → instant checkout) and **Premium/Specialty** (request quote or pre-order flow for Carhartt, YETI, hockey jerseys, etc.)
- [ ] Product badges: "Made to Order" for Printful, "Premium" for branded items, "New" for recent additions
- [ ] Bundle pages for 5 launch bundles (see reference/product-catalog.md): Welcome Kit, Premium Starter, Hockey Fan, Family, Construction Crew
- [ ] 8 category landing pages: Apparel, Headwear, Drinkware, Hockey & Sports, Kids & Family, Bags & Carry, Accessories & Office, Premium Gifts
- [ ] Employee vs. public pricing toggle (requires auth state — employee sees lower prices when logged in)
- [ ] Verify: filters work, product pages render all variants, bundles display correctly, mobile experience is smooth

### Phase 5: Cart & Checkout
- [ ] Zustand cart store: add, remove, update quantity, clear, persist to localStorage
- [ ] Cart drawer (slides from right on desktop, full-screen on mobile) + /cart page
- [ ] Cart summary: line items, subtotal, estimated shipping, HST/GST/PST calculation by province, total in CAD
- [ ] "Proceed to Checkout" creates Stripe Checkout Session (server-side API route)
- [ ] Stripe webhook handler at /api/webhooks/stripe for checkout.session.completed
- [ ] Post-payment: create Printful order via API, save order to database
- [ ] /order-confirmation page: order summary, estimated delivery, "Continue Shopping" CTA
- [ ] Verify: full checkout flow works end-to-end (use Stripe test mode)

### Phase 6: Accounts & Orders
- [ ] Prisma schema: User, Order, OrderItem, Address models
- [ ] NextAuth.js with email magic link provider
- [ ] /account page: order history list with status badges
- [ ] /account/orders/[id]: order detail with Printful tracking info
- [ ] Printful webhook handler at /api/webhooks/printful for shipping updates
- [ ] Transactional emails via Resend: order confirmation, shipping notification
- [ ] Verify: can sign in, view past orders, receive email notifications

### Phase 7: Supporting Pages
- [ ] /returns: 30-day policy (POD items non-returnable unless defective), defect report form with photo upload
- [ ] /size-guide: measurement charts for all apparel categories
- [ ] /about: Gil-Son story, why merch, company values
- [ ] /contact: support form + AI chatbot widget trigger
- [ ] Verify: all pages render, forms submit, mobile-friendly

### Phase 8: AI Customer Service
- [ ] Chatbot floating widget (bottom-right): Vercel AI SDK + Claude API
- [ ] Chat endpoint at /api/chat with system prompt covering: order status lookup, sizing help, return policy, product recommendations
- [ ] Chat personality: friendly, helpful, Canadian — "Hey there! How can I help with your Gil-Son gear?"
- [ ] Escalation: if unresolved after 3 exchanges, collect email + issue summary, notify admin
- [ ] Verify: chatbot answers common questions accurately, escalation works

### Phase 9: Polish & Deploy
- [ ] SEO: meta tags, Open Graph images, structured data (Product schema)
- [ ] Loading skeletons for product grid, PDP, cart
- [ ] Error boundaries with branded fallback UI
- [ ] 404 page with Gil-Son branding and "Back to Shop" CTA
- [ ] Lighthouse audit: Performance > 90, Accessibility > 95
- [ ] Deploy to Vercel, configure environment variables, set up custom domain
- [ ] Verify: production build runs clean, all E2E tests pass

## Progress Log

Update this section after each completed phase. Include date, status, blockers, and next actions.

| Phase | Status | Date | Notes |
|-------|--------|------|-------|
| 1. Foundation | Not started | | |
| 2. Home Page | Not started | | |
| 3. Printful | Not started | | |
| 4. Shop & Products | Not started | | |
| 5. Cart & Checkout | Not started | | |
| 6. Accounts & Orders | Not started | | |
| 7. Supporting Pages | Not started | | |
| 8. AI Chat | Not started | | |
| 9. Polish & Deploy | Not started | | |
