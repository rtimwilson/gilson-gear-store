---
name: gilson-brand-ecommerce
description: Gil-Son Construction e-commerce design system. Light-mode variant of the Gil-Son brand optimized for product browsing and shopping. Use for every page, component, and interaction in the merch store.
---

# Gil-Son E-Commerce Design System

This is the light-mode e-commerce adaptation of Gil-Son Construction's brand identity. The standard Gil-Son brand uses dark backgrounds for corporate/industrial contexts. This variant uses white backgrounds because product photography needs clean, bright surroundings and shoppers expect light retail environments.

Everything else — colours, gradients, brand personality, visual language — stays identical.

## Brand Colours (MANDATORY — use these exact values)

```css
--gilson-red: #C41E3A;
--gilson-navy: #1E3A5F;
--gilson-dark: #0C0F14;
--gilson-white: #ffffff;
--gilson-red-light: #D44B5E;
--gilson-red-dark: #9A1830;
--gilson-navy-light: #2D5480;
--gilson-navy-dark: #0F1F33;
--gilson-gray: #6b6b6b;
--gilson-gray-light: #f5f5f5;
```

## Brand Gradients (MANDATORY — 135deg diagonal, darker at bottom-right)

```css
--gilson-red-gradient: linear-gradient(135deg, #C41E3A 0%, #A61830 40%, #8A1228 70%, #6B0E1E 100%);
--gilson-navy-gradient: linear-gradient(135deg, #2D5480 0%, #1E3A5F 30%, #152B47 60%, #0F1F33 100%);
--gilson-overlay: linear-gradient(135deg, rgba(196,30,58,0.85) 0%, rgba(107,14,30,0.95) 100%);
```

## Where Each Colour Goes

| Element | Colour | Why |
|---------|--------|-----|
| Page background | White (#ffffff) | Clean retail feel, products photograph well |
| Top nav bar | Navy gradient | Anchors the page, brand recognition |
| Footer | Navy-dark (#0F1F33) to navy gradient | Visual weight at bottom |
| Primary CTAs (Add to Cart, Checkout, Buy Now) | Gilson Red (#C41E3A) | High contrast on white, draws the eye |
| CTA hover state | Red-light (#D44B5E) | Subtle lift effect |
| CTA active/pressed | Red-dark (#9A1830) | Depth feedback |
| Body text | Dark (#0C0F14) | Readable, near-black with character |
| Secondary text (metadata, captions) | Gray (#6b6b6b) | Visual hierarchy |
| Card backgrounds, alternating sections | Gray-light (#f5f5f5) | Separates content zones |
| Links | Navy (#1E3A5F) | Distinct from body text |
| Link hover | Navy-light (#2D5480) | Visible feedback |
| Text on navy/red backgrounds | White (#ffffff) | Contrast and legibility |
| Sale/promo badges | Red gradient | Eye-catching, brand-consistent |

## Typography (LOCKED — use these exact fonts)

The Gil-Son type system is fixed. Do not substitute.

**Headlines**: Bebas Neue — bold condensed display font for all H1-H3 headings, hero text, category titles, and promotional banners. Uppercase works well at large sizes.

**Subheadlines & UI**: Outfit — geometric sans-serif for H4-H6, navigation labels, button text, filter labels, form labels, and any medium-weight UI text.

**Body**: DM Sans — clean geometric sans for all paragraph text, product descriptions, metadata, captions, and fine print. Renders well at 14-16px on mobile.

**NEVER use**: Inter, Roboto, Arial, Helvetica, system-ui, or any font outside this system. These are banned because they make the store look like every other AI-generated website.

Load all three fonts from Google Fonts via `next/font/google` for performance (automatic subset, no layout shift, no FOUT).

## Visual Language

These elements connect the store to Gil-Son's industrial identity:

- **Dark/light section rhythm** — alternate between white sections and dark (#0C0F14) sections throughout longer pages (home, about). This creates visual pacing and lets you use both light-text-on-dark and dark-text-on-light treatments. Product/shop pages stay predominantly light.
- **Diagonal section dividers** at 135deg (matching the gradient angle) to break up page sections
- **Subtle concrete/metal noise textures** as background overlays on hero sections and banners
- **Strong horizontal rules** suggesting structural beams — use as section separators
- **Micro-interactions**: card hover lifts (translateY -4px + shadow increase), button colour transitions (150ms ease), image zoom on product hover
- **Bold number treatments** for stats or promos (e.g., "FREE SHIPPING OVER $75" in condensed font)
- **Gil-Son logo** prominently in nav (left-aligned) and footer (centred above nav links)

## What to Avoid

- Purple gradients, pastel colours, or any hue outside the brand palette
- Uniform rounded corners on everything (vary border-radius: sharp for buttons, slightly rounded for cards)
- Centred layouts with identical spacing — use asymmetry and visual rhythm
- Cookie-cutter component libraries without customization
- Excessive whitespace that makes the store feel empty instead of premium
- Generic hero images — use Printful mockups of actual Gil-Son products

## Responsive Strategy (Mobile-First)

Build every component starting at the smallest screen, then add complexity:

| Breakpoint | Layout | Navigation | Filters |
|-----------|--------|------------|---------|
| < 640px | Single column | Hamburger menu + bottom nav | Bottom sheet drawer |
| 640–1024px | Two-column product grid | Collapsed sidebar | Toggleable sidebar |
| > 1024px | Three or four-column grid | Full horizontal nav + mega-menu | Persistent sidebar |

On mobile, add a sticky "Add to Cart" bar at the bottom of product detail pages so the CTA is always reachable without scrolling back up.
