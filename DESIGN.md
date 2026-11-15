# DESIGN.md — UD.Fariadji Design System & Visual Tokens

## Visual World & Identity
- **Brand Personality**: Robust, trustworthy, precision engineering, authoritative, industrial elegance.
- **Palette Tokens**:
  - **Primary Maroon**: Deep Rich Red Maroon (`#4c0519`, `#881337`, `#32040b`, `#1c0209`).
  - **Accent Gold**: Amber/Gold Quality Seals (`#fbbf24`, `#f59e0b`, `#d97706`).
  - **Success / Trust**: Emerald (`#10b981`, `#059669`).
  - **Neutrals / Text**: Slate-900 for dark text, Slate-600 for body, Rose-50/100 for light tint backgrounds, Pure White (`#ffffff`) for card surfaces.
- **Typography**:
  - Font: `Inter` (Next.js font optimization).
  - Scale: Fluid typography with fluid clamps and balanced line-heights.
  - Headings: Bold & Black (`font-black`, `font-extrabold`) with tight tracking (`tracking-tight`).

## Mobile & Tablet Touch Ergonomics (Impeccable Guidelines)
- **Minimum Touch Target**: 44x44px (preferred 48px) for buttons, checkboxes, category tabs, and navigation links.
- **Thumb Zone Layout**:
  - Primary CTA buttons (WhatsApp floating action, door simulator trigger) positioned comfortably in lower thumb zones.
  - Interactive calculator controls have generous spacing and clear feedback on tap.
- **Tablet Adaptation**:
  - 2-column balanced layouts (`sm:grid-cols-2 lg:grid-cols-3` or `md:grid-cols-2 lg:grid-cols-3/4`) to avoid squeezed 3-column or excessively stretched 1-column layouts on 768px–1024px screens.
- **Mobile Performance & Jitter-Free Rendering**:
  - Solid backgrounds with zero multi-layer filter jitter during scrolling.
  - Infinite horizontal marquees with CSS GPU transforms (`will-change: transform`).
