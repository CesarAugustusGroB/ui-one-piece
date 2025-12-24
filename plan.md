# Implementation Plan: OPTCGSim Deck Builder UI (REFINED)

## Overview

Simplified three-column deck builder following "Modern Card Atelier" design. MVP with 10 cohesive components instead of original 18.

---

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    TopBar (56px fixed)                       │
├───────────┬─────────────────────────────┬───────────────────┤
│ LeftPanel │        CardBrowser          │    RightPanel     │
│  (240px)  │          (1fr)              │     (280px)       │
└───────────┴─────────────────────────────┴───────────────────┘
```

---

## Component Structure (10 components)

```
src/
├── components/
│   ├── AppShell.tsx          ✅ Grid layout + TopBar combined
│   ├── AppShell.css
│   ├── LeftPanel.tsx         ✅ Deck selector + actions (all-in-one)
│   ├── LeftPanel.css
│   ├── CardBrowser/
│   │   ├── index.tsx         ✅ Container with filter + grid
│   │   ├── CardBrowser.css
│   │   ├── FilterBar.tsx     ✅ Horizontal dropdowns + search
│   │   ├── FilterBar.css
│   │   ├── CardGrid.tsx      ✅ Grid + CardItem inline + empty state
│   │   └── CardGrid.css
│   └── RightPanel/
│       ├── index.tsx         ✅ Deck header + list + stats combined
│       ├── RightPanel.css
│       ├── CostCurve.tsx     ✅ Simple bar chart
│       └── CostCurve.css
├── store/
│   └── useStore.ts           ✅ Single Zustand store (deck + filters + cards)
├── types/
│   └── index.ts              ✅ TypeScript types
└── styles/
    └── tokens.css            ✅ Design tokens
```

---

## Implementation Status

### Phase 1: Shell & Styling ✅
- [x] Setup design tokens
- [x] Create AppShell with grid layout + TopBar
- [x] Create LeftPanel (deck selector + actions)
- [x] Create RightPanel shell

### Phase 2: Card Browser ✅
- [x] Create FilterBar component
- [x] Create CardGrid component
- [x] Wire CardBrowser container

### Phase 3: State & Deck List ✅
- [x] Create unified Zustand store
- [x] Complete RightPanel with deck list + CostCurve
- [x] Connect all components to store

---

## Simplifications Made

| Original Plan | Refined Implementation |
|---------------|------------------------|
| 18 components | 10 components |
| 5 phases, 24 tasks | 3 phases, 10 tasks |
| 3 separate stores | 1 unified store |
| Separate TopBar component | Inline in AppShell |
| DeckSelector + DeckNameInput + DeckActionsMenu | Combined in LeftPanel |
| Separate CardItem component | Inline in CardGrid |
| DeckHeader + DeckList + DeckStats | Combined in RightPanel |

---

## Deferred (Not in MVP)

- Drag-and-drop reordering
- Keyboard navigation
- Virtualization (add when performance needs it)
- External link card (Eggman Events)
- Responsive/mobile layout

---

## Dependencies

```json
{
  "zustand": "^5.x"
}
```

---

## Success Criteria

- [x] Three-column layout at 1280px+
- [x] Filters update card grid
- [x] Cards display with hover effects
- [x] Dark theme with gold accents
- [x] NO anti-patterns (wood textures, checkbox grids, etc.)
- [x] Follows "Modern Card Atelier" aesthetic

---

## To Run

```bash
npm run dev
```
