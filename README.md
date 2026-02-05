# Gil-Son Merch Store — Project Setup Guide

## What's in This Folder

This is a ready-to-go Claude Code project. Everything is pre-configured so you can open it in Claude Code and start building immediately.

```
gilson-ecommerce-website/
│
├── CLAUDE.md                          ← Claude Code reads this FIRST (project rules, tech stack, brand, work process)
├── SESSION-LAUNCHER.md                ← Copy/paste this into Claude Code to start building
├── .env.example                       ← Template for API keys (copy to .env.local)
├── .gitignore                         ← Standard Next.js gitignore
│
├── .claude/
│   ├── settings.json                  ← Auto-lint hooks + permissions
│   └── skills/
│       ├── gilson-brand-ecommerce/
│       │   └── SKILL.md               ← Design system (colours, fonts, layout rules)
│       └── printful-api/
│           └── SKILL.md               ← Printful API integration patterns
│
├── plans/
│   └── build-plan.md                  ← 9-phase roadmap with checklists + progress log
│
├── public/
│   └── images/
│       ├── logo/                      ← PUT YOUR LOGO FILES HERE (see README inside)
│       │   └── README.md
│       ├── products/                  ← Optional lifestyle photos
│       │   └── README.md
│       └── hero/                      ← Optional hero banner images
│           └── README.md
│
└── reference/
    └── merch-store-research.md        ← Full product/supplier/pricing research
```

## Setup Steps (Do These Before Opening Claude Code)

### Step 1: Add Your Logo Files

Open `public/images/logo/` and add:

| File | What It Is | Where It's Used |
|------|-----------|----------------|
| `gilson-logo.svg` | Full colour logo | Nav bar (on dark background) |
| `gilson-logo-white.svg` | All-white version | Hero overlays, footer |
| `gilson-logo-dark.svg` | Dark version | Light backgrounds (if needed) |
| `gilson-favicon.ico` | 32x32 favicon | Browser tab |

**SVG is strongly preferred** — it scales perfectly and loads fast. If you only have PNGs, provide them at the highest resolution you have and Claude Code can work with them.

If you don't have all variants, just provide whatever you have. Claude Code can generate the missing ones or use colour gradients as fallbacks.

### Step 2: Create Your .env.local

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

**What you need right now vs. later:**

| Key | Needed For | When |
|-----|-----------|------|
| `PRINTFUL_API_KEY` | Product data, orders | Phase 3 (can use mock data for Phases 1-2) |
| `STRIPE_SECRET_KEY` | Checkout | Phase 5 (use test keys from Stripe Dashboard) |
| `STRIPE_PUBLISHABLE_KEY` | Checkout UI | Phase 5 |
| `STRIPE_WEBHOOK_SECRET` | Order processing | Phase 5 |
| `DATABASE_URL` | User accounts, orders | Phase 6 (Vercel Postgres or Supabase) |
| `NEXTAUTH_SECRET` | Authentication | Phase 6 |
| `ANTHROPIC_API_KEY` | AI chatbot | Phase 8 |
| `RESEND_API_KEY` | Email notifications | Phase 6 |

You do NOT need all keys on day one. Phases 1-2 (Foundation + Home Page) work without any API keys — Claude Code will use placeholder data.

### Step 3: Set Up Printful (Before Phase 3)

1. Create a Printful account at printful.com
2. Go to Dashboard → Stores → Add Store → "Manual Order / API"
3. Go to Settings → API → Generate a new API access token
4. Paste the token into `.env.local` as `PRINTFUL_API_KEY`
5. Design at least a few products in Printful's Product Creator (upload Gil-Son artwork, pick product blanks, set print placement)
6. The products you create there will appear in the store automatically via the API

### Step 4: (Optional) Add Hero/Lifestyle Photos

Drop any photos you want used in the store into:
- `public/images/hero/` — for hero banners and backgrounds
- `public/images/products/` — for lifestyle shots of real Gil-Son merch

These are optional. The store looks great with just Printful mockups and gradient backgrounds.

### Step 5: Open in Claude Code and Go

1. Open the Claude desktop app
2. Select Claude Code
3. Point it to this folder (`gilson-ecommerce-website/`)
4. Claude Code will automatically read `CLAUDE.md` and the `.claude/` settings
5. Open `SESSION-LAUNCHER.md`, copy the prompt inside the ``` code block ```
6. Paste it into Claude Code as your first message
7. Claude Code will read the build plan, start at Phase 1, and begin building

### Resuming After a Break

Claude Code sessions have a context limit. When it runs out:
- Claude Code will have already committed its work and updated `plans/build-plan.md`
- Start a new session, paste the same session launcher prompt
- Claude Code reads the progress log and picks up where it left off

## What Happens During the Build

Claude Code will work through 9 phases, each producing a working state:

1. **Foundation** — Next.js scaffold, Tailwind config, nav, footer
2. **Home Page** — Hero, categories, brand story
3. **Printful Integration** — API client, product data
4. **Shop & Products** — Browse, filter, product detail pages
5. **Cart & Checkout** — Stripe payments, order creation
6. **Accounts & Orders** — Login, order history, tracking
7. **Supporting Pages** — Returns, size guide, about, contact
8. **AI Chatbot** — Claude-powered customer service
9. **Polish & Deploy** — SEO, performance, Vercel deployment

After each phase, Claude Code runs verification checks (build, lint, responsive) before proceeding.

## The Research Document

`reference/merch-store-research.md` contains the full market research — product recommendations, supplier evaluations, pricing strategy, competitive intelligence, and Canadian compliance requirements. Claude Code can reference this when making decisions about product categories, pricing, copy, and features.

## Questions?

If something isn't working or you need to adjust the approach mid-build, just tell Claude Code in plain language. The `CLAUDE.md` work process rules mean it will explain its plan before making big changes and keep changes small and reviewable.
