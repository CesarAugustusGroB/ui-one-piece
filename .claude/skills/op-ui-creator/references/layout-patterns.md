# Layout Patterns

## Standard Three-Column

Primary layout for deck builders and full-featured TCG interfaces.

```
┌────────────┬────────────────────────┬──────────────────┐
│            │                        │                  │
│ Deck Panel │     Card Browser       │   Deck Preview   │
│            │                        │                  │
│   240px    │       1fr (flex)       │      280px       │
│            │                        │                  │
└────────────┴────────────────────────┴──────────────────┘
```

### CSS Grid Implementation

```css
.layout-three-column {
  display: grid;
  grid-template-columns: 240px 1fr 280px;
  gap: var(--space-4);
  height: 100vh;
  padding: var(--space-4);
  background: var(--bg-base);
}
```

### Left Panel Content Stack

1. Deck selector (dropdown)
2. Deck name (inline editable)
3. Format indicator
4. Action buttons (icon row: save, export, share)
5. External links (subtle text links)

### Center Panel Content Stack

1. Filter bar (sticky top)
2. Results count
3. Card grid (scrollable, CSS Grid)
4. Pagination or infinite scroll trigger

### Right Panel Content Stack

1. Deck header + card count (34/51)
2. Progress indicator bar
3. Card list (scrollable)
4. Stats footer (cost curve, color distribution)

## Two-Column Variant

Use for: Simple collection browser, search-focused interfaces, mobile-first designs.

```
┌────────────┬──────────────────────────────────────────┐
│            │                                          │
│ Filters/   │            Card Browser                  │
│ Sidebar    │                                          │
│            │                                          │
└────────────┴──────────────────────────────────────────┘
```

### CSS Grid Implementation

```css
.layout-two-column {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-4);
  height: 100vh;
  padding: var(--space-4);
}
```

## Single Column (Mobile)

Use for: Mobile views, simple card lists.

```
┌──────────────────────────────────┐
│         [Cards] [Deck]           │  ← Tab navigation
├──────────────────────────────────┤
│          Filter Bar              │  ← Horizontally scrollable
├──────────────────────────────────┤
│                                  │
│          Card Grid               │
│                                  │
└──────────────────────────────────┘
```

## Responsive Breakpoints

### Desktop (>1280px)

Full three-column layout with all features visible.

### Large Tablet (1024px - 1280px)

- Collapse right panel into slide-out drawer
- Show deck preview toggle button
- Reduce left panel to 200px

```css
@media (max-width: 1280px) {
  .layout-three-column {
    grid-template-columns: 200px 1fr;
  }
  .deck-preview {
    position: fixed;
    right: 0;
    transform: translateX(100%);
    transition: transform var(--transition-base);
  }
  .deck-preview.open {
    transform: translateX(0);
  }
}
```

### Tablet (768px - 1024px)

- Stack to single column
- Tab navigation: Cards | Deck | Stats
- Filter bar becomes horizontally scrollable

```css
@media (max-width: 1024px) {
  .layout-three-column {
    grid-template-columns: 1fr;
  }
}
```

### Mobile (<768px)

- Full-width card grid (2 columns)
- Bottom sheet for card details
- Floating action button for deck access

```css
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2);
  }
}
```

## Card Grid Layouts

### Standard Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-4);
}
```

### Compact Grid

```css
.card-grid-compact {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-2);
}
```

### List View

```css
.card-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.card-list-item {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-2);
}
```

## Panel Arrangements

### Side-by-Side Panels

```css
.panel-row {
  display: flex;
  gap: var(--space-4);
}

.panel-row > * {
  flex: 1;
}
```

### Stacked Panels

```css
.panel-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
```

## Header Layouts

### Simple Header

```
┌─────────────────────────────────────────────────┐
│ Logo                    [Search] [User] [Menu]  │
└─────────────────────────────────────────────────┘
```

### With Tabs

```
┌─────────────────────────────────────────────────┐
│ Logo   [Decks] [Collection] [Browse]    [User]  │
└─────────────────────────────────────────────────┘
```

### Header CSS

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-subtle);
  height: 56px;
}
```
