# Empower design contract

This file documents the established site design. New work extends these
choices; it does not introduce a separate admin theme.

## Core palette

- Background: `paper` (`#f7f2e8`)
- Text: `ink` (`#11211c`)
- Accent: `amber` (`#e7a33c`)

`forest`, `terracotta`, `sand`, `stone`, and `cream` are existing supporting
tokens. Forest is reserved for affirmative actions, terracotta for warnings,
sand for separators, stone for secondary text, and cream for raised surfaces.
Status colors are semantic exceptions, not additional brand accents.

## Type

- Display: Lora
- Body: Geist Sans

Geist is retained as a deliberate compatibility exception: it is already the
site-wide body face across hundreds of pages. Replacing it inside an admin
surface would create inconsistency, and replacing it globally is outside the
scope of scholarship monitoring.

## Shape and depth

- Inputs and buttons: 6-8px radius
- Compact surfaces: 12px radius
- Major existing cards: 16px maximum
- Prefer a sand hairline border for data surfaces.
- Use the existing ink border/shadow utilities only for high-emphasis public
  objects, not dense administrative tables.

## Motion

- Admin surfaces use no entrance animation.
- Hover and pressed feedback may use the existing 150ms interaction.
- Loading indicators are the only continuous motion.
- The global reduced-motion rule remains authoritative.

## Admin information design

- Lead with counts, filters, and source evidence rather than decorative art.
- Keep one selected proposal in a master-detail layout on wide screens.
- Never hide evidence or the current value behind a required interaction.
- Destructive or state-changing actions use explicit verbs and visible
  confirmation text.
