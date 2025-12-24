# Design System

## Color Palette

### Dark Theme (Default)

```css
--bg-base: #0F1115;      /* Deepest background */
--bg-elevated: #1A1D24;  /* Elevated surfaces */
--bg-panel: #1E222B;     /* Panel backgrounds */
--bg-card: #252A35;      /* Card/item backgrounds */
--bg-hover: #2A303D;     /* Hover states */
```

### Border Colors

```css
--border-subtle: rgba(255, 255, 255, 0.06);   /* Default borders */
--border-active: rgba(255, 255, 255, 0.12);   /* Active/focus borders */
--border-strong: rgba(255, 255, 255, 0.18);   /* Emphasized borders */
```

### Accent Colors

```css
--accent-gold: #C9A962;    /* Primary actions, highlights */
--accent-cyan: #5ECDC9;    /* Secondary/info states */
--accent-red: #E85454;     /* Destructive actions */
--accent-green: #4ADE80;   /* Success states */
--accent-purple: #A78BFA;  /* Special/rare indicators */
```

### Text Colors

```css
--text-primary: #F4F4F5;    /* Main text */
--text-secondary: #A1A1AA;  /* Supporting text */
--text-tertiary: #71717A;   /* Muted text */
--text-disabled: #52525B;   /* Disabled states */
```

## Typography

### Font Stack

```css
--font-display: "Geist", "SF Pro Display", system-ui, sans-serif;
--font-body: "Inter", "SF Pro Text", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", monospace;
```

### Scale

```css
--text-xs: 0.75rem;    /* 12px - labels, badges */
--text-sm: 0.875rem;   /* 14px - secondary text */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - emphasized text */
--text-xl: 1.25rem;    /* 20px - section headers */
--text-2xl: 1.5rem;    /* 24px - page headers */
--text-3xl: 1.875rem;  /* 30px - large headers */
```

### Line Heights

```css
--leading-tight: 1.25;   /* Headers */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Large text blocks */
```

### Weight Usage

| Weight | Use Case |
|--------|----------|
| 400 | Body text, descriptions |
| 500 | Labels, secondary headings, emphasis |
| 600 | Primary headings (use sparingly) |

## Spacing

Base unit: 4px

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

## Border Radius

```css
--radius-sm: 6px;    /* Buttons, inputs, small elements */
--radius-md: 12px;   /* Cards, panels */
--radius-lg: 16px;   /* Modals, large overlays */
--radius-full: 9999px; /* Pills, avatars */
```

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
--shadow-glow-gold: 0 0 20px rgba(201, 169, 98, 0.15);
--shadow-glow-cyan: 0 0 20px rgba(94, 205, 201, 0.15);
```

## Transitions

```css
--transition-fast: 100ms ease-out;
--transition-base: 200ms ease-out;
--transition-slow: 300ms ease-out;
--transition-spring: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

## Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-overlay: 30;
--z-modal: 40;
--z-toast: 50;
--z-tooltip: 60;
```
