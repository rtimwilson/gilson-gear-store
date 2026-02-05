# Gil-Son Gear Store — Next.js 15 Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild gilsongear.com using Next.js 15 + Supabase with the swag.com-inspired design system.

**Architecture:** Next.js 15 App Router with React Server Components, Supabase for auth/database/storage, Stripe for payments, Zustand for client state. Mobile-first responsive design with shadcn/ui components customized to Gil-Son brand.

**Tech Stack:** Next.js 15, TypeScript, Supabase, Stripe, Tailwind CSS, shadcn/ui, Zustand, Vercel

**Design Reference:** `docs/plans/2026-02-05-homepage-navigation-design.md`

**Worktree:** `.worktrees/nextjs-rebuild` (branch: `feature/nextjs-15-supabase-rebuild`)

---

## Phase 1: Project Foundation

### Task 1: Scaffold Next.js 15 Project

**Files:**
- Create: Fresh Next.js project in worktree (replaces Vite files)

**Step 1: Remove old Vite files from worktree**

```bash
cd .worktrees/nextjs-rebuild
rm -rf src/ index.html vite.config.ts tsconfig.json package.json package-lock.json node_modules/
```

**Step 2: Create Next.js 15 project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted:
- Would you like to use Turbopack? → Yes

**Step 3: Verify project runs**

```bash
npm run dev
```

Expected: Dev server at http://localhost:3000 showing Next.js welcome page

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with App Router"
```

---

### Task 2: Install Core Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install dependencies**

```bash
npm install @supabase/supabase-js @supabase/ssr stripe zustand @stripe/stripe-js
npm install resend
npm install -D @types/node
```

**Step 2: Install shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

**Step 3: Add initial shadcn components**

```bash
npx shadcn@latest add button card input label dropdown-menu sheet dialog accordion checkbox slider badge
```

**Step 4: Verify build**

```bash
npm run build
```

Expected: Build completes without errors

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Supabase, Stripe, Zustand, shadcn/ui dependencies"
```

---

### Task 3: Configure Gil-Son Brand Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/styles/fonts.ts`
- Modify: `src/app/layout.tsx`

**Step 1: Update Tailwind config with Gil-Son colours**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Gil-Son
        gilson: {
          red: "#C41E3A",
          "red-light": "#D44B5E",
          "red-dark": "#9A1830",
          navy: "#1E3A5F",
          "navy-light": "#2D5480",
          "navy-dark": "#0F1F33",
          dark: "#0C0F14",
          gray: "#6b6b6b",
          "gray-light": "#f5f5f5",
        },
        // Gear Up accents
        accent: {
          orange: "#FF6B35",
          teal: "#00B4A0",
          purple: "#7B2D8E",
          yellow: "#FFD23F",
          blue: "#4A90D9",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas-neue)", "sans-serif"],
        ui: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gilson-red-gradient":
          "linear-gradient(135deg, #C41E3A 0%, #A61830 40%, #8A1228 70%, #6B0E1E 100%)",
        "gilson-navy-gradient":
          "linear-gradient(135deg, #2D5480 0%, #1E3A5F 30%, #152B47 60%, #0F1F33 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

**Step 2: Create fonts configuration**

```typescript
// src/styles/fonts.ts
import { Bebas_Neue, Outfit, DM_Sans } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
```

**Step 3: Update root layout with fonts**

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { bebasNeue, outfit, dmSans } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gil-Son Gear | Company Merch Store",
  description: "Official Gil-Son Construction merchandise. Gear for the crew.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${outfit.variable} ${dmSans.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
```

**Step 4: Verify fonts load**

```bash
npm run dev
```

Expected: Page renders with custom fonts (check Network tab for Google Fonts)

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure Gil-Son brand tokens and fonts"
```

---

### Task 4: Create Environment Configuration

**Files:**
- Create: `.env.local`
- Modify: `.env.example`

**Step 1: Create .env.example template**

```bash
# .env.example
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Printful
PRINTFUL_API_KEY=your-printful-key

# Resend
RESEND_API_KEY=re_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Step 2: Create local .env.local (placeholder values for now)**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Step 3: Verify .env.local is in .gitignore**

```bash
grep ".env.local" .gitignore
```

Expected: Line exists (Next.js includes it by default)

**Step 4: Commit .env.example only**

```bash
git add .env.example
git commit -m "chore: add environment variable template"
```

---

## Phase 2: Layout Components

### Task 5: Create Header Component

**Files:**
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/logo.tsx`
- Create: `src/components/layout/nav-menu.tsx`

**Step 1: Create Logo component**

```typescript
// src/components/layout/logo.tsx
import Link from "next/link";
import Image from "next/image";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/gilson-logo.png"
        alt="Gil-Son Gear"
        width={40}
        height={40}
        className="h-10 w-auto"
      />
      <span
        className={`font-display text-2xl tracking-wide ${
          variant === "light" ? "text-white" : "text-gilson-dark"
        }`}
      >
        GIL-SON GEAR
      </span>
    </Link>
  );
}
```

**Step 2: Create NavMenu component with categories**

```typescript
// src/components/layout/nav-menu.tsx
"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const categories = [
  {
    name: "Apparel",
    href: "/shop/apparel",
    subcategories: [
      { name: "T-Shirts", href: "/shop/apparel?sub=tshirts" },
      { name: "Hoodies", href: "/shop/apparel?sub=hoodies" },
      { name: "Hi-Vis & Safety", href: "/shop/apparel?sub=hi-vis" },
      { name: "Outerwear", href: "/shop/apparel?sub=outerwear" },
    ],
  },
  {
    name: "Headwear",
    href: "/shop/headwear",
    subcategories: [
      { name: "Caps", href: "/shop/headwear?sub=caps" },
      { name: "Beanies", href: "/shop/headwear?sub=beanies" },
      { name: "Hi-Vis Beanies", href: "/shop/headwear?sub=hi-vis-beanies" },
    ],
  },
  {
    name: "Drinkware",
    href: "/shop/drinkware",
    subcategories: [
      { name: "Water Bottles", href: "/shop/drinkware?sub=bottles" },
      { name: "Tumblers", href: "/shop/drinkware?sub=tumblers" },
      { name: "Mugs", href: "/shop/drinkware?sub=mugs" },
    ],
  },
  {
    name: "Hockey",
    href: "/shop/hockey",
    subcategories: [
      { name: "Jerseys", href: "/shop/hockey?sub=jerseys" },
      { name: "Pucks", href: "/shop/hockey?sub=pucks" },
      { name: "Bags", href: "/shop/hockey?sub=bags" },
    ],
  },
  {
    name: "Kids",
    href: "/shop/kids",
    subcategories: [
      { name: "Youth Apparel", href: "/shop/kids?sub=apparel" },
      { name: "Onesies", href: "/shop/kids?sub=onesies" },
      { name: "Activities", href: "/shop/kids?sub=activities" },
    ],
  },
  {
    name: "Bags",
    href: "/shop/bags",
    subcategories: [
      { name: "Backpacks", href: "/shop/bags?sub=backpacks" },
      { name: "Totes", href: "/shop/bags?sub=totes" },
      { name: "Duffels", href: "/shop/bags?sub=duffels" },
    ],
  },
  {
    name: "Accessories",
    href: "/shop/accessories",
    subcategories: [
      { name: "Stickers", href: "/shop/accessories?sub=stickers" },
      { name: "Notebooks", href: "/shop/accessories?sub=notebooks" },
      { name: "Tools", href: "/shop/accessories?sub=tools" },
    ],
  },
  {
    name: "Premium",
    href: "/shop/premium",
    subcategories: [
      { name: "YETI", href: "/shop/premium?sub=yeti" },
      { name: "Carhartt", href: "/shop/premium?sub=carhartt" },
      { name: "Gift Sets", href: "/shop/premium?sub=gifts" },
    ],
  },
];

export function NavMenu() {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      <Link
        href="/shop"
        className="px-3 py-2 text-sm font-ui text-white hover:text-white/80 transition-colors"
      >
        All Gear
      </Link>
      {categories.map((category) => (
        <DropdownMenu key={category.name}>
          <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-ui text-white hover:text-white/80 transition-colors">
            {category.name}
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={category.href} className="font-medium">
                All {category.name}
              </Link>
            </DropdownMenuItem>
            {category.subcategories.map((sub) => (
              <DropdownMenuItem key={sub.name} asChild>
                <Link href={sub.href}>{sub.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
}
```

**Step 3: Create Header component**

```typescript
// src/components/layout/header.tsx
import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gilson-navy-gradient">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Logo variant="light" />

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gilson-gray" />
              <Input
                type="search"
                placeholder="Search gear..."
                className="pl-10 bg-white border-0"
              />
            </div>
          </div>

          {/* Navigation */}
          <NavMenu />

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-white/80 hover:bg-white/10"
              asChild
            >
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="ml-2 hidden sm:inline">Log In</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80 hover:bg-white/10"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-white/80 hover:bg-white/10"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gilson-red text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

**Step 4: Verify components render**

```bash
npm run dev
```

Import Header in page.tsx temporarily to test

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Header, Logo, NavMenu components"
```

---

### Task 6: Create Footer Component

**Files:**
- Create: `src/components/layout/footer.tsx`

**Step 1: Create Footer component**

```typescript
// src/components/layout/footer.tsx
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

const footerLinks = {
  shop: [
    { name: "All Gear", href: "/shop" },
    { name: "Apparel", href: "/shop/apparel" },
    { name: "Drinkware", href: "/shop/drinkware" },
    { name: "Hockey", href: "/shop/hockey" },
    { name: "Premium", href: "/shop/premium" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "FAQ", href: "/faq" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Our Story", href: "/about#story" },
    { name: "Careers", href: "https://gilson.ca/careers" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gilson-navy-gradient text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 font-ui text-white/70">Gear for the crew.</p>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-display text-lg mb-4">SHOP</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-display text-lg mb-4">SUPPORT</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg mb-4">STAY CONNECTED</h3>
            <p className="font-body text-sm text-white/70 mb-4">
              Sign up for new drops & team deals.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gilson-red hover:bg-gilson-red-light"
              >
                →
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Shipping banner */}
      <div className="bg-gilson-navy-dark py-3">
        <p className="text-center font-ui text-sm">
          🚚 FREE SHIPPING ON ORDERS OVER $75 · $50 FOR TEAM MEMBERS
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/50">
            © 2026 Gil-Son Construction · Halifax, Nova Scotia
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="font-body text-sm text-white/50 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-body text-sm text-white/50 hover:text-white"
            >
              Terms
            </Link>
            <span className="font-body text-sm text-white/50">
              Made with ❤️ in Atlantic Canada
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Footer component"
```

---

### Task 7: Create Root Layout with Header/Footer

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/(shop)/layout.tsx`

**Step 1: Update root layout**

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { bebasNeue, outfit, dmSans } from "@/styles/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gil-Son Gear | Company Merch Store",
  description: "Official Gil-Son Construction merchandise. Gear for the crew.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${outfit.variable} ${dmSans.variable}`}
    >
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 2: Verify layout renders**

```bash
npm run dev
```

Expected: Header and Footer visible on all pages

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: integrate Header and Footer into root layout"
```

---

## Phase 3: Homepage

### Task 8: Create Hero Section

**Files:**
- Create: `src/components/home/hero.tsx`

**Step 1: Create Hero component**

```typescript
// src/components/home/hero.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal via-accent-orange to-accent-yellow" />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('/textures/concrete.png')]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="text-white">
            <p className="font-ui text-lg mb-2 opacity-90">New Season</p>
            <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">
              SUMMER &apos;26 DROP
            </h1>
            <p className="font-body text-xl mb-8 opacity-90 max-w-md">
              Gear up for the season. New arrivals just landed.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gilson-red hover:bg-gilson-red-light text-white font-ui text-lg px-8"
            >
              <Link href="/shop?filter=new">Shop New Arrivals</Link>
            </Button>
          </div>

          {/* Product collage placeholder */}
          <div className="hidden lg:block relative h-[500px]">
            {/* These will be replaced with actual product images */}
            <div className="absolute top-0 right-20 w-48 h-48 bg-white/20 rounded-lg transform rotate-6" />
            <div className="absolute top-20 right-0 w-40 h-40 bg-white/20 rounded-lg transform -rotate-3" />
            <div className="absolute bottom-20 right-40 w-52 h-52 bg-white/20 rounded-lg transform rotate-12" />
            <div className="absolute bottom-0 right-10 w-36 h-36 bg-white/20 rounded-lg transform -rotate-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Hero section component"
```

---

### Task 9: Create Category Grid

**Files:**
- Create: `src/components/home/category-grid.tsx`

**Step 1: Create CategoryGrid component**

```typescript
// src/components/home/category-grid.tsx
import Link from "next/link";

const categories = [
  { name: "Apparel", href: "/shop/apparel", color: "bg-accent-teal" },
  { name: "Headwear", href: "/shop/headwear", color: "bg-accent-orange" },
  { name: "Drinkware", href: "/shop/drinkware", color: "bg-accent-blue" },
  { name: "Hockey", href: "/shop/hockey", color: "bg-accent-purple" },
  { name: "Kids", href: "/shop/kids", color: "bg-accent-yellow" },
  { name: "Bags", href: "/shop/bags", color: "bg-accent-orange" },
  { name: "Accessories", href: "/shop/accessories", color: "bg-accent-teal" },
  { name: "Premium", href: "/shop/premium", color: "bg-gilson-navy" },
];

export function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl text-gilson-dark text-center mb-12">
          SHOP BY CATEGORY
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`${category.color} relative aspect-square rounded-lg overflow-hidden group`}
            >
              {/* Product images will go here */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="font-display text-2xl md:text-3xl text-white drop-shadow-lg">
                  {category.name.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add CategoryGrid component"
```

---

### Task 10: Create Team Favourites Section

**Files:**
- Create: `src/components/home/team-favourites.tsx`
- Create: `src/components/product/product-card.tsx`

**Step 1: Create ProductCard component**

```typescript
// src/components/product/product-card.tsx
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    employeePrice?: number;
    image: string;
    badge?: "new" | "hot" | "premium";
  };
  showEmployeePrice?: boolean;
}

export function ProductCard({ product, showEmployeePrice }: ProductCardProps) {
  const badgeColors = {
    new: "bg-accent-teal",
    hot: "bg-accent-orange",
    premium: "bg-gilson-navy",
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Wishlist button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
      >
        <Heart className="h-4 w-4" />
      </Button>

      {/* Badge */}
      {product.badge && (
        <Badge
          className={`absolute top-2 left-2 z-10 ${badgeColors[product.badge]} text-white`}
        >
          {product.badge.toUpperCase()}
        </Badge>
      )}

      {/* Image */}
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square bg-gilson-gray-light relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gilson-gray">
            {/* Placeholder - replace with actual image */}
            <span className="text-sm">Product Image</span>
          </div>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-ui font-medium text-gilson-dark group-hover:text-gilson-navy transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          {showEmployeePrice && product.employeePrice ? (
            <>
              <span className="font-body text-gilson-gray line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-body font-semibold text-gilson-red">
                ${product.employeePrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-body font-semibold text-gilson-dark">
              ${product.price.toFixed(2)} CAD
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create TeamFavourites component**

```typescript
// src/components/home/team-favourites.tsx
import { ProductCard } from "@/components/product/product-card";

// Placeholder products - will be replaced with real data
const favourites = [
  {
    id: "1",
    name: "IND4000 Pullover Hoodie",
    slug: "ind4000-hoodie",
    price: 74.99,
    employeePrice: 49.99,
    image: "/products/hoodie.jpg",
    badge: "hot" as const,
  },
  {
    id: "2",
    name: "Richardson 112 Cap",
    slug: "richardson-112-cap",
    price: 34.99,
    employeePrice: 24.99,
    image: "/products/cap.jpg",
  },
  {
    id: "3",
    name: "YETI Rambler 20oz",
    slug: "yeti-rambler-20oz",
    price: 49.99,
    employeePrice: 39.99,
    image: "/products/yeti.jpg",
    badge: "premium" as const,
  },
  {
    id: "4",
    name: "Bella+Canvas 3001C Tee",
    slug: "bella-canvas-tee",
    price: 29.99,
    employeePrice: 19.99,
    image: "/products/tee.jpg",
    badge: "new" as const,
  },
];

export function TeamFavourites() {
  return (
    <section className="py-16 bg-gilson-gray-light">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl text-gilson-dark text-center mb-4">
          WHAT THE CREW IS WEARING
        </h2>
        <p className="font-body text-gilson-gray text-center mb-12">
          Team favourites and best sellers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {favourites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add ProductCard and TeamFavourites components"
```

---

### Task 11: Create Bundles Section

**Files:**
- Create: `src/components/home/bundles-promo.tsx`

**Step 1: Create BundlesPromo component**

```typescript
// src/components/home/bundles-promo.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

const bundles = [
  {
    id: "welcome-kit",
    name: "Welcome Kit",
    description: "T-shirt + Drinkware + Notebook",
    price: 49.99,
    employeePrice: 39.99,
    savings: "20%",
  },
  {
    id: "hockey-fan",
    name: "Hockey Fan Pack",
    description: "Jersey + Puck + Cap",
    price: 119.99,
    employeePrice: 99.99,
    savings: "15%",
  },
  {
    id: "premium-starter",
    name: "Premium Starter",
    description: "Hoodie + Stanley + Richardson Cap",
    price: 129.99,
    employeePrice: 99.99,
    savings: "20%",
  },
];

export function BundlesPromo() {
  return (
    <section className="py-16 bg-accent-orange">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl text-white text-center mb-4">
          KITS THAT MAKE IT EASY
        </h2>
        <p className="font-body text-white/80 text-center mb-12">
          Curated bundles at bundle prices
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Bundle image placeholder */}
              <div className="aspect-video bg-gilson-gray-light rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gilson-gray text-sm">Bundle Preview</span>
              </div>

              <h3 className="font-display text-2xl text-gilson-dark">
                {bundle.name.toUpperCase()}
              </h3>
              <p className="font-body text-gilson-gray mt-1">
                {bundle.description}
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl text-gilson-red">
                  ${bundle.employeePrice}
                </span>
                <span className="font-body text-gilson-gray line-through">
                  ${bundle.price}
                </span>
                <span className="font-ui text-sm text-accent-teal font-semibold">
                  Save {bundle.savings}
                </span>
              </div>

              <Button
                asChild
                className="w-full mt-4 bg-gilson-red hover:bg-gilson-red-light"
              >
                <Link href={`/bundles/${bundle.id}`}>View Bundle</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-accent-orange"
          >
            <Link href="/bundles">Shop All Bundles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add BundlesPromo component"
```

---

### Task 12: Assemble Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Create homepage**

```typescript
// src/app/page.tsx
import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { TeamFavourites } from "@/components/home/team-favourites";
import { BundlesPromo } from "@/components/home/bundles-promo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <TeamFavourites />
      <BundlesPromo />
    </>
  );
}
```

**Step 2: Verify homepage renders**

```bash
npm run dev
```

Expected: Full homepage with Hero, Categories, Team Favourites, Bundles

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: assemble homepage with all sections"
```

---

## Phase 4: Shop Pages (Skeleton)

### Task 13: Create Shop Page with Filter Sidebar

**Files:**
- Create: `src/app/shop/page.tsx`
- Create: `src/components/shop/filter-sidebar.tsx`
- Create: `src/components/shop/product-grid.tsx`

**Step 1: Create FilterSidebar component**

```typescript
// src/components/shop/filter-sidebar.tsx
"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

const subcategories = {
  apparel: ["T-Shirts", "Hoodies", "Hi-Vis", "Outerwear"],
  drinkware: ["Water Bottles", "Tumblers", "Mugs", "Glassware"],
  // ... other categories
};

const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const colors = [
  { name: "Black", value: "#000" },
  { name: "Navy", value: "#1E3A5F" },
  { name: "Red", value: "#C41E3A" },
  { name: "Gray", value: "#6b6b6b" },
  { name: "White", value: "#fff" },
];

export function FilterSidebar({ isOpen, onClose, category }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 150]);

  return (
    <aside
      className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-80 bg-white border-r border-gilson-gray-light
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="h-full overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden bg-accent-teal text-white hover:bg-accent-teal/90"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Back link */}
        <Button variant="link" className="p-0 mb-4 text-gilson-navy" asChild>
          <a href="/shop">← Back to all gear</a>
        </Button>

        {/* Current category */}
        {category && (
          <div className="mb-6 p-3 bg-gilson-gray-light rounded-lg">
            <span className="font-display text-lg">
              {category.toUpperCase()}
            </span>
          </div>
        )}

        <Accordion type="multiple" defaultValue={["category", "price", "size"]}>
          {/* Category filter */}
          <AccordionItem value="category">
            <AccordionTrigger className="font-ui font-medium">
              Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {(subcategories[category as keyof typeof subcategories] || []).map(
                  (sub) => (
                    <label
                      key={sub}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox />
                      <span className="font-body text-sm">
                        {sub}{" "}
                        <span className="text-gilson-gray">(24)</span>
                      </span>
                    </label>
                  )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price filter */}
          <AccordionItem value="price">
            <AccordionTrigger className="font-ui font-medium">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={150}
                step={5}
                className="mt-2"
              />
              <div className="flex justify-between mt-2 font-body text-sm text-gilson-gray">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Size filter */}
          <AccordionItem value="size">
            <AccordionTrigger className="font-ui font-medium">
              Size
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox />
                    <span className="font-body text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Color filter */}
          <AccordionItem value="color">
            <AccordionTrigger className="font-ui font-medium">
              Colour
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className="w-8 h-8 rounded-full border-2 border-gilson-gray-light hover:border-gilson-navy transition-colors"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brand filter */}
          <AccordionItem value="brand">
            <AccordionTrigger className="font-ui font-medium">
              Brand
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Carhartt", "YETI", "Stanley", "Bella+Canvas"].map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox />
                    <span className="font-body text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
```

**Step 2: Create ProductGrid component**

```typescript
// src/components/shop/product-grid.tsx
import { ProductCard } from "@/components/product/product-card";

// Placeholder products
const products = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  slug: `product-${i + 1}`,
  price: 29.99 + i * 10,
  employeePrice: 19.99 + i * 8,
  image: `/products/placeholder.jpg`,
  badge: i === 0 ? ("new" as const) : i === 2 ? ("hot" as const) : undefined,
}));

export function ProductGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Step 3: Create Shop page**

```typescript
// src/app/shop/page.tsx
"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { ProductGrid } from "@/components/shop/product-grid";

export default function ShopPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="font-body text-sm text-gilson-gray">
          <a href="/" className="hover:text-gilson-navy">
            Home
          </a>{" "}
          / <span className="text-gilson-dark">Shop</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex gap-8">
          {/* Filter sidebar */}
          <FilterSidebar
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          {/* Main content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-4xl text-gilson-dark">
                  ALL GEAR
                </h1>
                <p className="font-body text-gilson-gray mt-1">147 products</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile filter button */}
                <Button
                  variant="outline"
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Sort dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Sort: Most Popular</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Most Popular</DropdownMenuItem>
                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem>Newest</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Product grid */}
            <ProductGrid />
          </div>
        </div>
      </div>

      {/* Overlay for mobile filters */}
      {filtersOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setFiltersOpen(false)}
        />
      )}
    </div>
  );
}
```

**Step 4: Verify shop page renders**

```bash
npm run dev
```

Navigate to /shop

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Shop page with FilterSidebar and ProductGrid"
```

---

## Next Steps (Future Tasks)

The following phases will be implemented in subsequent plans:

- **Phase 5:** Supabase Integration (auth, database schema, RLS policies)
- **Phase 6:** Product Data Layer (Printful API, product sync)
- **Phase 7:** Cart & Checkout (Zustand store, Stripe integration)
- **Phase 8:** Account & Employee Mode (auth flows, pricing toggle)
- **Phase 9:** Polish & Deploy (SEO, performance, Vercel deployment)

---

## Verification Checklist

After completing all tasks:

- [ ] `npm run build` completes without errors
- [ ] Homepage renders with all sections
- [ ] Header navigation dropdowns work
- [ ] Footer links are correct
- [ ] Shop page shows filter sidebar
- [ ] Mobile navigation works (hamburger menu)
- [ ] Mobile filters work (bottom sheet)
- [ ] All fonts load correctly (Bebas Neue, Outfit, DM Sans)
- [ ] Brand colours match design system
