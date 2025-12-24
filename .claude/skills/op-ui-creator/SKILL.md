---
name: op-ui-creator
description: Create modern, premium UI for trading card game applications (deck builders, card browsers, collection managers, simulators). Use when building TCG tools, card game interfaces, or redesigning existing card game UIs. Produces clean, calm, professional designs following "Modern Card Atelier" aesthetics—think Magic Arena meets Notion. Avoids dated patterns like wood textures, cluttered layouts, and overwhelming visual noise.
---

# OP-UI-CREATOR

Build premium TCG interfaces following "Modern Card Atelier" principles: Clean • Calm • Focused • Professional.

## Design Philosophy

Three pillars guide every decision:

1. **Hierarchy over noise** - One thing screams, everything else whispers
2. **Function defines form** - UI serves the task (deck building, browsing, managing)
3. **Premium restraint** - Dark neutrals, subtle accents, glass-like surfaces

## Quick Start Workflow

1. **Identify the app type** → Deck builder | Card browser | Collection manager | Simulator
2. **Load layout pattern** → See references/layout-patterns.md
3. **Apply component patterns** → See references/component-patterns.md
4. **Use design tokens** → Copy assets/tokens/design-tokens.css
5. **Review anti-patterns** → Ensure nothing from references/anti-patterns.md appears

## Core Layout: Three-Column Structure

Standard TCG interface layout:

```
┌────────────┬────────────────────────┬──────────────────┐
│ Deck Panel │     Card Browser       │   Deck Preview   │
│   (Left)   │       (Center)         │     (Right)      │
│  ~240px    │       flexible         │     ~280px       │
└────────────┴────────────────────────┴──────────────────┘
```

**Left Panel**: Deck controls, metadata, actions
**Center Panel**: Card grid with filter bar above
**Right Panel**: Deck list, stats, curve visualization

## Component Hierarchy (Read First)

Load references/component-patterns.md for:

- Filter bars (horizontal dropdowns, not checkbox soup)
- Action buttons (ghost/filled/destructive patterns)
- Card displays (hover states, selection)
- Empty states (minimal, not punishing)
- Panels (glass containers, soft shadows)

## Anti-Patterns to Eliminate

Before submitting any UI, verify NONE of these appear:

- Wood/leather/paper textures
- Checkbox grids for filters
- More than 2 button styles visible
- Instructions longer than one sentence
- Pure white backgrounds
- Visible outlines on panels
- More than 3 font weights

See references/anti-patterns.md for complete list.

## Implementation Notes

### React Components

- Use templates in assets/templates/ as starting points
- All components use design tokens from assets/tokens/design-tokens.css
- Tailwind utilities complement, not replace, design tokens

### Responsive Behavior

- Collapse to 2-column at 1024px (hide deck preview)
- Stack to single column at 768px
- Filter bar scrolls horizontally on mobile

### Micro-interactions

- Card hover: translateY(-4px) + subtle glow
- Panel transitions: 200ms ease-out
- Search field: expand on focus
- Save confirmation: subtle toast, not modal

## Color Quick Reference

```
Background:  #0F1115 → #1A1D24 → #1E222B → #252A35
Accent:      Gold #C9A962 | Cyan #5ECDC9 | Red #E85454 | Green #4ADE80
Text:        #F4F4F5 (primary) | #A1A1AA (secondary) | #71717A (tertiary)
Border:      rgba(255,255,255,0.06) subtle | rgba(255,255,255,0.12) active
```

## Template Selection Guide

| Use Case | Template | Key Features |
|----------|----------|--------------|
| Deck building with preview | deck-builder.tsx | 3-column, card grid, deck list |
| Card search/discovery | card-browser.tsx | 2-column, filters, detail drawer |
| Collection tracking | collection-manager.tsx | Grouping, bulk select, stats |

## Success Checklist

Before delivering any TCG UI, verify:

- [ ] Dark neutral background (#0F1115 → #1A1D24)
- [ ] Three-column or appropriate layout pattern
- [ ] Horizontal filter bar with dropdowns
- [ ] Clear visual hierarchy (one focus area)
- [ ] Consistent button patterns (ghost/filled only)
- [ ] Micro-interactions (hover, transitions)
- [ ] Minimal, calm empty states
- [ ] NO anti-patterns from banned list
- [ ] Feels "Magic Arena meets Notion"
