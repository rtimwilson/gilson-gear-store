# Gil-Son Merch Store

## What This Is

A production e-commerce store for Gil-Son Construction branded merchandise. Employees, customers, families, and kids across Atlantic Canada can browse and buy Gil-Son gear — apparel, drinkware, hockey equipment, kids items, premium gifts, and more. Orders are fulfilled automatically via Printful's print-on-demand API, paid through Stripe, and tracked end-to-end with AI-powered customer support.

Gil-Son Construction is a mechanical, electrical, and HVAC-R contracting company headquartered in Halifax, Nova Scotia. Many staff are young families. Hockey is a way of life here, winter and summer. This store should feel like a premium retail experience — not a generic corporate merch page.

## Tech Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript strict mode
- **Styling**: Tailwind CSS with custom Gil-Son theme tokens defined in tailwind.config.js
- **State**: Zustand for cart and UI state (no Redux)
- **Payments**: Stripe Checkout with server-side sessions and webhook-driven fulfillment
- **Fulfillment**: Printful REST API v2 (print-on-demand, no inventory)
- **Auth**: NextAuth.js with email magic links for order tracking
- **Database**: Prisma + PostgreSQL for orders, users, wishlists
- **Deployment**: Vercel (edge functions, preview URLs, Git-based deploys)
- **Email**: Resend for transactional emails (order confirmation, shipping updates)
- **AI**: Vercel AI SDK + Claude API for customer service chatbot

## Brand Rules

This store uses a **light-mode variant** of Gil-Son's brand. The standard Gil-Son identity uses dark backgrounds, but e-commerce works better with white backgrounds so products photograph well against them.

Read `.claude/skills/gilson-brand-ecommerce/SKILL.md` for the complete design system including mandatory colours, gradients, typography rules, and visual elements. Every page, component, and interaction must follow that skill.

Key constraints:
- White (#ffffff) primary background for product/shopping pages
- Navy gradient for top nav and footer
- Gilson Red (#C41E3A) for all primary CTAs (Add to Cart, Checkout)
- Dark (#0C0F14) for body text — near-black with character
- Fonts: Bebas Neue (headlines), Outfit (UI/subheadlines), DM Sans (body) — locked, no substitutes
- Canadian spelling always: colour, favourite, centre, catalogue
- Currency: CAD, formatted as $XX.XX CAD
- Tax calculated by shipping destination province. Ship anywhere in Canada:
  - Nova Scotia: 14% HST (changed from 15% on April 1, 2025)
  - New Brunswick: 15% HST
  - Newfoundland & Labrador: 15% HST
  - Prince Edward Island: 15% HST
  - Ontario: 13% HST
  - British Columbia: 5% GST + 7% PST = 12%
  - Manitoba: 5% GST + 8% RST = 13%
  - Saskatchewan: 5% GST + 6% PST = 11%
  - Quebec: 5% GST + 9.975% QST ≈ 14.975%
  - Alberta, Yukon, NWT, Nunavut: 5% GST only

## Code Conventions

- TypeScript strict mode, never use `any` — define proper interfaces in /src/types/
- Functional components only. Prefer React Server Components; use `"use client"` only when the component needs interactivity, hooks, or browser APIs
- Tailwind for all styling — no CSS modules, no styled-components, no inline style objects
- All external API calls live in /src/lib/ — components never call Printful or Stripe directly
- Wrap every data-fetching component in an error boundary with a branded fallback
- Use loading skeletons that match the layout of the loaded content, never generic spinners
- Mobile-first development: start with the smallest breakpoint, layer up with sm:, md:, lg:

## Work Process Rules

These rules exist because they prevent the most common Claude Code mistakes. Follow them every time.

### Plan Before Coding
Before writing any code, describe your approach and wait for approval. If requirements are ambiguous, ask clarifying questions first. Do not assume — incorrect assumptions compound across files and are expensive to undo.

### Keep Changes Small
If a task requires changes to more than 3 files, stop and break it into smaller tasks first. Present the breakdown and get approval before proceeding. Large changes are harder to review, harder to debug, and harder to roll back.

### Test What Could Break
After writing code, list what could break and suggest tests to cover it. Think about edge cases: empty carts, failed API calls, missing product data, network timeouts, invalid shipping addresses.

### Reproduce Bugs First
When there's a bug, start by writing a test that reproduces it. Then fix the code until the test passes. This prevents regressions and proves the fix actually works.

### Learn From Corrections
Every time Tim corrects you, add a new rule to this CLAUDE.md file so it never happens again. Put it under the "Learned Rules" section below. This is how the project gets smarter over time.

## Learned Rules

<!-- Add rules here as corrections happen during development -->

## Git

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- Branch naming: `feature/*`, `fix/*`, `chore/*`
- Commit after each completed implementation step
- Never commit .env files, API keys, or node_modules

## Testing

- Playwright for E2E flows: full checkout, cart operations, filter interactions
- Vitest for unit tests on /src/lib/ utilities and API client functions
- Run `npm run lint` after every file change (hook handles this automatically)

## Product Catalog & Pricing

Read `reference/product-catalog.md` for the complete research-backed product catalog with specific brands, model numbers, supplier info, and pricing tiers (employee vs. public retail). Read `reference/merch-store-research.md` for full market research, competitive intelligence, Canadian compliance requirements, and risk mitigation strategies.

Key decisions already made by research:
- **Two fulfillment channels**: Printful POD (API-integrated, no inventory) for core apparel/accessories + Premium suppliers (Carhartt, YETI, Stanley via TPS Promotions, GiftAFeeling) for aspirational items
- **Dual pricing**: Employee prices at 15-20% margin, public retail at 30-40% margin
- **Free shipping threshold**: $75 CAD public, $50 CAD employees
- **8 product categories**: Apparel, Headwear, Drinkware, Hockey & Sports, Kids & Family, Bags & Carry, Accessories & Office, Premium Gifts
- **5 launch bundles**: Welcome Kit, Premium Starter, Hockey Fan, Family, Construction Crew
- **Build Printful products first** (Phases 1-5), then add premium supplier products (Phase 4+)

## Progress Tracking

Track build progress in `plans/build-plan.md`. Update after each step with status, blockers, and next actions. This file persists across context windows so future sessions can resume immediately.
