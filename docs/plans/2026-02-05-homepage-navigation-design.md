# Gil-Son Gear Store — Homepage & Navigation Design

**Date:** 2026-02-05
**Status:** Approved
**Inspiration:** swag.com dopamine design + Gil-Son brand system

---

## Design Decisions Summary

| Element | Decision |
|---------|----------|
| Primary audience | Employees first, public secondary |
| Login flow | Products first, login at checkout for discount |
| Navigation | 8 categories with dropdown subcategories |
| Colour palette | Gil-Son core (navy, red) + 5 vibrant accents |
| Hero style | Seasonal drops with colourful gradients + product collage |
| Homepage sections | Hero → Category tiles → Team Favourites → Bundles → Shipping banner |
| Shop filters | Swag-style collapsible sidebar with counts, floating sort button |
| Product pages | Gallery left, details right, sticky mobile CTA |
| Cart | Slide-out drawer, live tax calculation, Stripe checkout |
| Footer | Navy gradient, 4-column links, newsletter, regional pride |
| Visual tone | Bright dopamine design with Gil-Son brand anchors |

---

## Colour Palette

### Core Gil-Son Colours (Mandatory)

```css
--gilson-red: #C41E3A;        /* Primary CTAs */
--gilson-navy: #1E3A5F;       /* Nav, footer */
--gilson-dark: #0C0F14;       /* Body text */
--gilson-white: #ffffff;      /* Backgrounds */
```

### "Gear Up" Accent Palette (New)

These colours are for backgrounds, section blocks, and category tiles only — never for CTAs or body text.

| Colour | Hex | Use |
|--------|-----|-----|
| Construction Orange | `#FF6B35` | Hi-vis category, promo banners |
| Atlantic Teal | `#00B4A0` | Drinkware, fresh/hydration feel |
| Hockey Purple | `#7B2D8E` | Hockey & Sports category |
| Summer Yellow | `#FFD23F` | Kids & Family, seasonal drops |
| Steel Blue | `#4A90D9` | Office/Accessories, tech feel |

---

## Header & Navigation

### Top Bar (Sticky)

- Navy gradient background
- Gil-Son logo left-aligned
- Search bar centre (placeholder: "Search gear...")
- Right side: "Log In" link, heart icon (wishlist), cart icon with badge

### Main Navigation

```
[All Gear] [Apparel ▾] [Headwear ▾] [Drinkware ▾] [Hockey ▾] [Kids ▾] [Bags ▾] [Accessories ▾] [Premium ▾]
```

### Dropdown Behaviour (Desktop)

- Hover triggers dropdown with subcategories
- Example for Apparel: T-Shirts, Hoodies, Hi-Vis & Safety, Outerwear, Polos
- Small category image on right side of dropdown
- Animation: fade + slide down (150ms)

### Mobile Navigation

- Hamburger menu → full-screen overlay
- Categories expand accordion-style
- Bottom sticky bar: Home, Shop, Cart, Account (4 icons)

### Employee Mode Indicator

When logged in as employee, badge appears next to account icon: `👷 Team` in Gil-Son red.

---

## Homepage Layout

### Hero Section (~70vh)

- **Background:** Vibrant colour gradient (rotating seasonally), angled at 135°
- **Left side:** Headline (Bebas Neue), subhead (Outfit), single red CTA
- **Right side:** Product collage (3-5 items, playful angles)
- **Texture:** Subtle concrete noise overlay
- **Mobile:** Products stack above headline

Example:
```
SUMMER '26 DROP
────────────────
Gear up for the season.
New arrivals just landed.

[Shop New Arrivals]
```

### Content Sections (Below Hero)

**1. Category Grid (white background)**
- 8 tiles in responsive grid (4×2 desktop, 2×4 mobile)
- Each tile: vibrant background colour + product photography + category name
- Hover: slight zoom, lift effect

**2. "Team Favourites" Row (gray-light background)**
- Headline: "WHAT THE CREW IS WEARING"
- Horizontal scroll of 4-6 best-sellers
- Employee pricing shown: ~~$74.99~~ **$49.99**

**3. Bundles Promo (Construction Orange background)**
- Headline: "KITS THAT MAKE IT EASY"
- 2-3 featured bundles with savings percentage
- CTA: "Shop All Bundles"

**4. Free Shipping Banner (Navy gradient)**
- "FREE SHIPPING ON ORDERS OVER $75 · $50 FOR TEAM MEMBERS"

---

## Shop & Category Pages

### Filter Sidebar (Swag-Style Collapsible)

```
┌──────────────────────────┐
│  Filters            [X]  │
├──────────────────────────┤
│  < Back to all gear      │
├──────────────────────────┤
│  ┌────────────────────┐  │
│  │     DRINKWARE      │  │
│  └────────────────────┘  │
├──────────────────────────┤
│  Category            [−] │
│  ☐ Water Bottles (24)    │
│  ☐ Tumblers (18)         │
│  ☐ Mugs (12)             │
├──────────────────────────┤
│  Price Range         [−] │
│  $0 ●━━━━━━━━━● $150     │
├──────────────────────────┤
│  Size                [−] │
│  ☐ S  ☐ M  ☐ L  ☐ XL     │
├──────────────────────────┤
│  Colour              [+] │
├──────────────────────────┤
│  Brand               [+] │
└──────────────────────────┘
```

### Filter Behaviour

- **Desktop:** Sidebar persistent, can collapse to icon rail
- **Tablet:** Starts collapsed, toggle to expand
- **Mobile:** Full-screen bottom sheet overlay
- Filter counts update live
- "Clear all" link when filters active

### Floating Sort Button

- Circular button (right side of grid)
- Options: Most Popular, Price Low→High, Price High→Low, Newest
- Sticky on scroll

### Product Cards

- White background, shadow on hover
- Hover shows alternate image angle
- Badges: "NEW" (teal), "HOT" (orange), "PREMIUM" (navy)
- Heart icon for wishlist (top-right)
- Employee pricing: strikethrough + discount

---

## Product Detail Page

### Desktop Layout

```
┌────────────────────────────┬────────────────────────────────┐
│  [Breadcrumb]              │                                │
├────────────────────────────┤  PRODUCT NAME                  │
│                            │  ★★★★☆ (23 reviews)            │
│   [Main Image]             │                                │
│                            │  $74.99 CAD                    │
│   [thumbnails]             │  ~~$74.99~~ $49.99 (Employee)  │
│                            │                                │
│                            │  COLOUR: [swatches]            │
│                            │  SIZE: [buttons] + Size Guide  │
│                            │  QTY: [−] 1 [+]                │
│                            │                                │
│                            │  [ADD TO CART]                 │
│                            │                                │
│                            │  🚚 Free shipping over $75     │
│                            │  📦 Made to order · 2-3 weeks  │
└────────────────────────────┴────────────────────────────────┘
```

### Below the Fold

- Product description (fabric, fit, care)
- Specs accordion
- Reviews section with photos
- "You might also like" carousel

### Product Badges

- "MADE TO ORDER" — Printful POD (teal)
- "PREMIUM" — Carhartt, YETI (navy)
- "NEW" — Added in last 30 days (orange)

### Mobile PDP

- Image carousel (swipe) at top
- Sticky bottom bar: Price + "Add to Cart"

---

## Cart & Checkout

### Cart Drawer (Slides from Right)

```
┌─────────────────────────────────┐
│  YOUR CART (3 items)       [X]  │
├─────────────────────────────────┤
│  [IMG]  Product Name            │
│         Variant / Size          │
│         [−] 1 [+]      $49.99   │
│                        [Remove] │
├─────────────────────────────────┤
│  Subtotal              $139.96  │
│  Shipping        FREE (Team ✓)  │
│  Estimated HST (NS 14%) $19.59  │
│  ─────────────────────────────  │
│  TOTAL                 $159.55  │
├─────────────────────────────────┤
│  [CHECKOUT]                     │
│  or [Continue Shopping]         │
└─────────────────────────────────┘
```

### Checkout Flow

1. "Checkout" creates Stripe session server-side
2. Redirect to Stripe hosted checkout
3. Pre-fill email if logged in
4. Return to `/order-confirmation` on success

### Order Confirmation

- "Thanks for your order!" with subtle confetti
- Order number, items summary
- Estimated delivery (2-3 weeks for POD)
- "Track your order" link
- "Continue Shopping" CTA

---

## Footer

```
┌─────────────────────────────────────────────────────────────┐
│                    [GIL-SON LOGO]                           │
│               "Gear for the crew."                          │
├─────────────┬─────────────┬─────────────┬───────────────────┤
│  SHOP       │  SUPPORT    │  COMPANY    │  STAY CONNECTED   │
│  All Gear   │  Contact Us │  About      │  [email input]    │
│  Apparel    │  Size Guide │  Our Story  │                   │
│  Drinkware  │  Shipping   │             │                   │
│  Hockey     │  Returns    │             │                   │
│  Premium    │  FAQ        │             │                   │
├─────────────────────────────────────────────────────────────┤
│  🚚 FREE SHIPPING OVER $75 · $50 FOR TEAM MEMBERS           │
├─────────────────────────────────────────────────────────────┤
│  © 2026 Gil-Son Construction · Halifax, Nova Scotia         │
│  Privacy · Terms · Made with ❤️ in Atlantic Canada          │
└─────────────────────────────────────────────────────────────┘
```

- Mobile: Columns become accordions
- Newsletter signup always visible

---

## Responsive Strategy

| Breakpoint | Navigation | Filters | Product Grid |
|------------|------------|---------|--------------|
| < 640px | Hamburger + bottom bar | Bottom sheet | 2 columns |
| 640–1024px | Collapsed sidebar | Toggleable sidebar | 3 columns |
| > 1024px | Full nav + dropdowns | Persistent sidebar | 4 columns |

---

## Next Steps

1. Update `CLAUDE.md` to reflect Supabase stack decision
2. Create Next.js 15 project with this design system
3. Build component library (shadcn/ui + Gil-Son customizations)
4. Implement homepage first, then shop pages
