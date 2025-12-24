# Anti-Patterns

Eliminate these from all TCG interfaces.

## Visual Noise

### Avoid

- Wood grain backgrounds
- Leather textures
- Parchment/paper textures
- Stone/marble textures
- Ornate borders and frames
- Multiple competing accent colors
- Gradients on every surface
- Decorative corner elements
- Embossed/3D text effects

### Instead

- Solid neutral backgrounds (#0F1115 → #1A1D24)
- Subtle noise texture at 3-5% opacity (if any)
- Single accent color family (gold primary)
- Flat colors with subtle shadows
- Clean, minimal borders

## Filter UI

### Avoid

```
❌ Bad: Checkbox grids
┌─────────────────┐
│ Colors:         │
│ ☑ Red           │
│ ☑ Blue          │
│ ☐ Green         │
│ ☐ Yellow        │
│ ☐ Purple        │
│ ☐ Black         │
└─────────────────┘
```

- Checkbox grids taking up vertical space
- Toggle switches for each filter option
- Exposed "Select All" / "Clear All" buttons
- Vertical filter lists in sidebars
- Sliders for discrete values

### Instead

```
✅ Good: Horizontal dropdown bar
┌─────────────────────────────────────────────────────┐
│ [Color ▾] [Cost ▾] [Type ▾] [Sort ▾] [🔍 Search...] │
└─────────────────────────────────────────────────────┘
```

- Horizontal dropdown bar
- Color dots (●) instead of text labels
- Inline clear within dropdowns
- Collapsed state shows active filter count

## Buttons

### Avoid

- Plastic 3D beveled buttons
- Multiple button sizes on same screen
- Destructive actions as prominent red buttons
- "Click here" or vague labels
- Buttons with both icon AND text when icon suffices
- Gradient fills on buttons
- Animated/pulsing buttons

### Instead

- Flat or subtle shadow only
- Consistent sizing (32px/36px/40px heights)
- Destructive = text link + confirmation modal
- Clear action verbs: "Save Deck", "Add Card"
- One style for primary, one for secondary

## Typography

### Avoid

- More than 3 font weights visible at once
- ALL CAPS for body text or long labels
- Bold everywhere (loses meaning)
- Fantasy/decorative fonts for UI elements
- Tiny text (<12px) for important info
- Underlines except for links
- Text shadows
- Justified text

### Instead

- 400/500/600 weight hierarchy only
- Caps only for small labels (DECK, STATS)
- Bold reserved for true emphasis
- Clean sans-serif throughout (Inter, Geist)
- Minimum 12px for readable text
- Left-aligned text

## Instructions & Help

### Avoid

- Paragraphs of explanation in the UI
- Inline tutorials blocking content
- Multiple help sections
- "Getting Started" modals on every visit
- Tooltips on obvious elements
- Help text that states the obvious

### Instead

- Single ⓘ icon → tooltip or modal
- Example-based help (show, don't tell)
- Contextual hints only when needed
- First-run experience, then get out of the way
- Let UI be self-explanatory

## Empty States

### Avoid

```
❌ Bad:
┌─────────────────────────────────────────┐
│                                         │
│  😢 Whoops! Looks like your deck is     │
│  empty! Don't worry, we've all been     │
│  there. Start by browsing our amazing   │
│  card collection and adding some cards  │
│  to get started on your journey!        │
│                                         │
│  [Browse Cards] [Watch Tutorial]        │
│                                         │
└─────────────────────────────────────────┘
```

- "Whoops! Looks like..."
- Sad/disappointed illustrations
- Multi-sentence explanations
- Guilt-tripping language
- Multiple action buttons
- Oversized empty state graphics

### Instead

```
✅ Good:
┌─────────────────────────────────────────┐
│                                         │
│         No cards in deck yet            │
│                                         │
│           [Add Cards]                   │
│                                         │
└─────────────────────────────────────────┘
```

- One factual line
- Single action button
- Calm, not apologetic
- Muted colors (--text-tertiary)

## Layout

### Avoid

- Equal visual weight everywhere (no hierarchy)
- Visible outlines/borders on every container
- Fixed-width center content on wide screens
- Cramped spacing (< 8px gaps)
- Inconsistent alignment
- Centered everything

### Instead

- Clear hierarchy (one primary focus)
- Borders only where needed for separation
- Fluid center column, fixed sidebars
- Generous whitespace (16px+ gaps)
- Consistent grid alignment
- Left-align by default, center sparingly

## Interactions

### Avoid

- Modal confirmations for non-destructive actions
- Page reloads for simple operations
- Blocking loading states for quick operations
- Sound effects
- Shake/bounce animations on errors
- Auto-playing anything

### Instead

- Inline confirmations
- Optimistic updates with background sync
- Skeleton loaders or spinners only when needed
- Visual-only feedback
- Subtle highlight or toast for errors
- User-initiated interactions only

## Data Display

### Avoid

- Tables with more than 5 columns
- Horizontal scrolling data
- Raw JSON or technical IDs
- Timestamps without formatting
- Numbers without context

### Instead

- Cards/tiles for complex data
- Responsive column hiding
- Human-readable labels
- Relative dates ("2 days ago")
- Numbers with labels ("34 cards", "Cost: 5")
