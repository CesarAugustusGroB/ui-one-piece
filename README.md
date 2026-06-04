# OPTCGSim — One Piece TCG UI

A web UI for browsing and building decks for the One Piece Trading Card Game. The app uses a three-panel layout: a left panel for managing your saved decks, a center card browser with filtering and search, and a right panel showing the current deck list with a live cost curve. Decks can be created, renamed, deleted, and shared via clipboard import/export. Card data is currently served from an in-app mock dataset.

## Features

- **Three-panel app shell** — deck manager (left), card browser (center), and active-deck view (right).
- **Card browser** with a filter bar (color, cost, type, sort) and full-text search, rendering a responsive card grid.
- **Deck builder** — add/remove cards, adjust quantities, and track a deck card count against the deck limit with a progress bar.
- **Deck management** — create, rename, delete, and switch between multiple saved decks.
- **Import / export** decks as text via the clipboard.
- **Cost curve** visualization of the active deck's mana-cost distribution in the right panel.
- **UX touches** — confirmation modal for destructive actions and toast notifications.
- Card model covers leader/character/event/stage types, colors, cost, power, counter, rarity, set, and card number.

## Tech Stack

- **React 19** + **TypeScript**, bundled with **Vite 7**.
- **Zustand 5** for state management (cards, filters, decks, import/export).
- **ESLint** (flat config) with React Hooks and React Refresh plugins.
- Plain CSS with a design-token stylesheet (`src/styles/tokens.css`).

## Getting Started

### Prerequisites

- Node.js (v20+ recommended for Vite 7).

### Install & run

```bash
npm install
npm run dev        # Vite dev server (default http://localhost:5173)
```

### Other scripts

```bash
npm run build      # tsc -b then vite build
npm run preview    # serve the production build
npm run lint       # ESLint over the repo
```

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.ts
├── eslint.config.js
└── src/
    ├── App.tsx / main.tsx       # bootstrap + panel composition
    ├── components/
    │   ├── AppShell.tsx         # top bar + three-panel layout
    │   ├── LeftPanel.tsx        # deck manager (create/rename/delete, import/export)
    │   ├── CardBrowser/
    │   │   ├── index.tsx
    │   │   ├── CardGrid.tsx     # responsive card grid
    │   │   └── FilterBar.tsx    # color / cost / type / sort / search
    │   ├── RightPanel/
    │   │   ├── index.tsx        # active-deck list + count
    │   │   └── CostCurve.tsx    # cost distribution chart
    │   ├── ConfirmModal.tsx
    │   └── Toast.tsx
    ├── store/
    │   └── useStore.ts          # Zustand store (cards, filters, decks, import/export)
    ├── types/
    │   └── index.ts             # Card, Deck, DeckCard, Filters
    └── styles/
        └── tokens.css
```
