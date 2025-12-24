# Component Patterns

## Filter Bar

ALWAYS use horizontal dropdown bar, NEVER checkbox grids.

### Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [Color: All ▾] [Cost: Any ▾] [Type ▾] [Sort ▾] [ 🔍 Search... ] │
└─────────────────────────────────────────────────────────────────┘
```

### Color Filter Dropdown

- Show colored dots (●) not text labels
- Multi-select with checkmarks
- "All" option clears selection
- Badge shows count when filtered: "Color (2)"

### Cost Filter

- Numeric range or specific values
- Show cost icons when possible
- Quick presets: "0-2", "3-5", "6+"

### Search Field

- Placeholder: "Search cards..."
- Expand width on focus
- Debounced input (300ms)
- Clear button appears when text present

## Buttons

### Primary (Filled)

```css
background: var(--accent-gold);
color: #0F1115;
font-weight: 500;
padding: 8px 16px;
border-radius: var(--radius-sm);
transition: var(--transition-base);
```

Hover: brightness(1.1) + subtle glow
Use for: Save, Confirm, Primary action

### Secondary (Ghost)

```css
background: transparent;
color: var(--text-primary);
border: none;
padding: 8px 16px;
```

Hover: background rgba(255,255,255,0.05)
Use for: Cancel, Secondary actions, Toggles

### Destructive

```css
color: var(--accent-red);
background: transparent;
```

- Always shows confirmation dialog
- NEVER render as big red button
- Use text link style

### Icon Buttons

```css
width: 32px;
height: 32px;
border-radius: var(--radius-sm);
display: flex;
align-items: center;
justify-content: center;
```

Hover: background rgba(255,255,255,0.05)

## Card Display

### Grid Item

```css
aspect-ratio: 5 / 7;  /* Standard TCG ratio */
border-radius: var(--radius-md);
background: var(--bg-card);
overflow: hidden;
cursor: pointer;
transition: transform var(--transition-base), box-shadow var(--transition-base);
```

### Hover State

```css
transform: translateY(-4px);
box-shadow: var(--shadow-md), var(--shadow-glow-gold);
```

### Selection State

```css
ring: 2px solid var(--accent-gold);
/* Checkmark badge top-right */
```

### Quantity Badge

```css
position: absolute;
bottom: 8px;
right: 8px;
background: var(--bg-panel);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-sm);
padding: 2px 6px;
font-size: var(--text-xs);
font-weight: 500;
```

Format: "×4"

## Panels

### Container

```css
background: var(--bg-panel);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-md);
padding: var(--space-4);
```

### Panel Header

```css
font-weight: 500;
font-size: var(--text-sm);
text-transform: uppercase;
letter-spacing: 0.05em;
color: var(--text-secondary);
margin-bottom: var(--space-3);
```

## Empty States

MINIMAL. Not punishing.

### Pattern

```
┌─────────────────────────────────┐
│                                 │
│   No cards match your filters   │
│                                 │
│        [ Reset Filters ]        │
│                                 │
└─────────────────────────────────┘
```

### Rules

- One sentence max
- Single action button
- Muted colors (--text-tertiary)
- NO paragraphs, NO guilt trips, NO sad illustrations

## Deck List (Right Panel)

### Structure

```
┌──────────────────────────────┐
│ Deck                   34/51 │
│ ═══════════════════════░░░░░ │ (progress bar)
├──────────────────────────────┤
│ [img] Card Name         ×4   │
│ [img] Another Card      ×2   │
│ [img] Third Card        ×3   │
├──────────────────────────────┤
│ ▁▂▃▅▆▇█▆▃▂ (cost curve)      │
└──────────────────────────────┘
```

### List Item

- Card thumbnail: 24px × 34px
- Card name: truncate with ellipsis
- Count: right-aligned, "×N" format

### Progress Bar

```css
height: 4px;
background: var(--bg-card);
border-radius: var(--radius-full);

/* Fill */
background: linear-gradient(90deg, var(--accent-gold), var(--accent-cyan));
transition: width var(--transition-base);
```

### Cost Curve

- Tiny bar chart, max 40px height
- Use --accent-gold for bars
- Show 0-10+ cost distribution

## Dropdown Menu

### Container

```css
background: var(--bg-elevated);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-md);
box-shadow: var(--shadow-lg);
min-width: 180px;
padding: var(--space-1);
```

### Menu Item

```css
padding: var(--space-2) var(--space-3);
border-radius: var(--radius-sm);
cursor: pointer;
```

Hover: background var(--bg-hover)

## Tooltip

```css
background: var(--bg-elevated);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-sm);
padding: var(--space-2) var(--space-3);
font-size: var(--text-sm);
box-shadow: var(--shadow-md);
max-width: 240px;
```

## Modal/Dialog

```css
background: var(--bg-panel);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-xl);
max-width: 480px;
padding: var(--space-6);
```

Backdrop: rgba(0, 0, 0, 0.7) with blur(4px)

## Toast Notifications

```css
background: var(--bg-elevated);
border: 1px solid var(--border-subtle);
border-radius: var(--radius-md);
padding: var(--space-3) var(--space-4);
box-shadow: var(--shadow-lg);
```

- Position: bottom-right
- Auto-dismiss: 3-5 seconds
- Subtle slide-in animation
