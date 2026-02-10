# Session Launcher Prompt for Claude Code

Paste this into Claude Code when you're ready to start building. This is the "kick off" message.

--

```text
<project_context>
You are building a production e-commerce merch store for Gil-Son Construction, a mechanical/electrical/HVAC-R contractor in Halifax, Nova Scotia. Read CLAUDE.md for full context, brand rules, and tech stack. Read reference/product-catalog.md for the research-backed product catalog with specific brands, pricing tiers, and supplier info. Read reference/merch-store-research.md for competitive intelligence, Canadian compliance, and risk factors.
</project_context>

<default_to_action>
Implement changes rather than suggesting them. If intent is ambiguous, infer the most useful action and proceed. Use tools to discover missing details instead of asking. Build real, working code at every step.
</default_to_action>-

<build_instructions>
Read CLAUDE.md, then read all skills in .claude/skills/. Read plans/build-plan.md to find where to resume.

Build the Gil-Son merch store following the phased plan. Start from the first incomplete phase. For each phase:

1. Implement every checklist item in order
2. Make each page and component mobile-first, fully responsive, and visually distinctive
3. Follow the gilson-brand-ecommerce skill exactly for colours, gradients, typography, and visual elements
4. Commit with a conventional commit message after completing each phase
5. Update plans/build-plan.md progress log with status and date
6. Verify the phase works before moving to the next one

Go beyond the basics. Include micro-interactions, loading skeletons, hover effects, keyboard navigation, and polished transitions. Every page should feel like a premium retail site, not a developer prototype. The goal is a store that Gil-Son's 350+ employees and their families would be proud to shop at.
</build_instructions>

<frontend_aesthetics>
You tend toward generic, "on distribution" outputs. In frontend design, this creates the "AI slop" aesthetic — Inter font, purple gradients, uniform rounded corners, cookie-cutter layouts. Avoid this entirely.

Gil-Son is a construction company. The store should feel industrial-premium: bold Bebas Neue headlines, clean DM Sans body text, strong structural lines, confident colour use, and distinctive character. Read the gilson-brand-ecommerce skill for the full design system. Commit to creative layout choices — asymmetric grids where appropriate, atmospheric hero sections with texture overlays, diagonal dividers matching the 135deg gradient angle.

Do not use Inter, Roboto, Arial, or system fonts anywhere. Do not use purple, pastel, or any colour outside the brand palette. The font system is locked: Bebas Neue, Outfit, DM Sans — no substitutions.
</frontend_aesthetics>

<code_quality>
Write TypeScript with strict mode. Define interfaces for all data shapes. Never use `any`.

Prefer React Server Components. Only add "use client" when the component genuinely needs interactivity, hooks, or browser APIs. This keeps the JavaScript bundle small and the store fast.

All Printful and Stripe API calls go through typed client classes in /src/lib/. Components never import API credentials or call external services directly.

If you create temporary files for testing or iteration, clean them up before committing.
</code_quality>

<context_management>
This is a large project that will span multiple context windows. Before your context window runs out:

1. Commit all current work to Git
2. Update plans/build-plan.md with exactly where you stopped and what comes next
3. Note any blockers, decisions made, or things to revisit

When resuming in a new context window, read plans/build-plan.md and the Git log before doing anything else.
</context_management>

<verification>
After each phase, verify your work:
- Run `npm run build` to confirm no TypeScript or build errors
- Run `npm run lint` to confirm code quality
- Open the dev server and manually check every new page at mobile (375px), tablet (768px), and desktop (1280px)
- Confirm all new components use Gil-Son brand colours (never default Tailwind colours)
- Confirm Canadian spelling in all user-facing text

If something fails verification, fix it before moving on. A working store at each phase is more valuable than a half-built store that's further along.
</verification>
```
