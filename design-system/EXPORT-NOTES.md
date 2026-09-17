# Export observations

The Figma file was read only. These observations are preserved, not repaired in Figma.

## Repeated Figma WEB code syntax

These code labels refer to multiple distinct variables. The export uses unique names derived from collection + current variable name instead. Original labels remain in each token's `web` field.

| Figma WEB label | Variables |
|---|---|
| `var(--primitives-number-1)` | `Primitives/scale/1`, `Primitives/scale/2` |
| `var(--primitives-number-16)` | `Primitives/scale/16`, `Primitives/scale/20` |
| `var(--primitives-number-24)` | `Primitives/scale/24`, `Primitives/scale/32`, `Primitives/scale/28` |
| `var(--primitives-number-40)` | `Primitives/scale/40`, `Primitives/scale/48` |
| `var(--primitives-number-56)` | `Primitives/scale/56`, `Primitives/scale/64` |
| `var(--semantic-border-width-default)` | `Semantic/border/width/default`, `Semantic/border/width/strong` |
| `var(--semantic-radius-none)` | `Semantic/radius/none`, `Semantic/radius/xs`, `Semantic/radius/sm`, `Semantic/radius/md`, `Semantic/radius/lg`, `Semantic/radius/xl` |
| `var(--mapped-surface-image)` | `Mapped/surface/image-container`, `Mapped/surface/default-hover`, `Mapped/surface/default-active` |
| `var(--mapped-text-default-muted)` | `Mapped/text/default/muted`, `Mapped/text/default/disabled` |
| `var(--mapped-icon-default)` | `Mapped/icon/default`, `Mapped/icon/disabled` |
| `var(--responsive-layout-content-inset)` | `Responsive/layout/content/inset-horizontal`, `Responsive/layout/content/inset-vertical` |
| `var(--responsive-layout-hero-inset)` | `Responsive/layout/hero/inset-vertical`, `Responsive/layout/hero/inset-horizontal`, `Responsive/layout/image-container/inset`, `Responsive/layout/hero/gap` |

## Name differences

| Figma variable | Original WEB label | Exported CSS name |
|---|---|---|
| Primitives/scale/0 | `var(--primitives-number-0)` | `--primitives-scale-0` |
| Primitives/scale/1 | `var(--primitives-number-1)` | `--primitives-scale-1` |
| Primitives/scale/4 | `var(--primitives-number-4)` | `--primitives-scale-4` |
| Primitives/scale/8 | `var(--primitives-number-8)` | `--primitives-scale-8` |
| Primitives/scale/12 | `var(--primitives-number-10)` | `--primitives-scale-12` |
| Primitives/scale/16 | `var(--primitives-number-16)` | `--primitives-scale-16` |
| Primitives/scale/24 | `var(--primitives-number-24)` | `--primitives-scale-24` |
| Primitives/scale/40 | `var(--primitives-number-40)` | `--primitives-scale-40` |
| Primitives/scale/56 | `var(--primitives-number-56)` | `--primitives-scale-56` |
| Primitives/scale/72 | `var(--primitives-number-76)` | `--primitives-scale-72` |
| Primitives/scale/80 | `var(--primitives-number-80)` | `--primitives-scale-80` |
| Primitives/scale/2 | `var(--primitives-number-1)` | `--primitives-scale-2` |
| Primitives/scale/32 | `var(--primitives-number-24)` | `--primitives-scale-32` |
| Primitives/scale/28 | `var(--primitives-number-24)` | `--primitives-scale-28` |
| Primitives/scale/48 | `var(--primitives-number-40)` | `--primitives-scale-48` |
| Primitives/scale/64 | `var(--primitives-number-56)` | `--primitives-scale-64` |
| Primitives/scale/20 | `var(--primitives-number-16)` | `--primitives-scale-20` |
| Semantic/accent/50 | `var(--semantic-primary-50)` | `--semantic-accent-50` |
| Semantic/accent/100 | `var(--semantic-primary-100)` | `--semantic-accent-100` |
| Semantic/accent/150 | `var(--semantic-primary-150)` | `--semantic-accent-150` |
| Semantic/accent/200 | `var(--semantic-primary-200)` | `--semantic-accent-200` |
| Semantic/accent/250 | `var(--semantic-primary-250)` | `--semantic-accent-250` |
| Semantic/accent/300 | `var(--semantic-primary-300)` | `--semantic-accent-300` |
| Semantic/accent/350 | `var(--semantic-primary-350)` | `--semantic-accent-350` |
| Semantic/accent/400 | `var(--semantic-primary-400)` | `--semantic-accent-400` |
| Semantic/accent/450 | `var(--semantic-primary-450)` | `--semantic-accent-450` |
| Semantic/accent/500 | `var(--semantic-primary-500)` | `--semantic-accent-500` |
| Semantic/accent/550 | `var(--semantic-primary-550)` | `--semantic-accent-550` |
| Semantic/accent/600 | `var(--semantic-primary-600)` | `--semantic-accent-600` |
| Semantic/accent/650 | `var(--semantic-primary-650)` | `--semantic-accent-650` |
| Semantic/accent/700 | `var(--semantic-primary-700)` | `--semantic-accent-700` |
| Semantic/accent/750 | `var(--semantic-primary-750)` | `--semantic-accent-750` |
| Semantic/accent/800 | `var(--semantic-primary-800)` | `--semantic-accent-800` |
| Semantic/accent/850 | `var(--semantic-primary-850)` | `--semantic-accent-850` |
| Semantic/accent/900 | `var(--semantic-primary-900)` | `--semantic-accent-900` |
| Semantic/border/width/strong | `var(--semantic-border-width-default)` | `--semantic-border-width-strong` |
| Semantic/radius/xs | `var(--semantic-radius-none)` | `--semantic-radius-xs` |
| Semantic/radius/sm | `var(--semantic-radius-none)` | `--semantic-radius-sm` |
| Semantic/radius/md | `var(--semantic-radius-none)` | `--semantic-radius-md` |
| Semantic/radius/lg | `var(--semantic-radius-none)` | `--semantic-radius-lg` |
| Semantic/radius/xl | `var(--semantic-radius-none)` | `--semantic-radius-xl` |
| Mapped/surface/image-container | `var(--mapped-surface-image)` | `--mapped-surface-image-container` |
| Mapped/text/default/accent | `var(--mapped-text-navigation-selected)` | `--mapped-text-default-accent` |
| Mapped/surface/default-hover | `var(--mapped-surface-image)` | `--mapped-surface-default-hover` |
| Mapped/surface/default-active | `var(--mapped-surface-image)` | `--mapped-surface-default-active` |
| Mapped/text/default/disabled | `var(--mapped-text-default-muted)` | `--mapped-text-default-disabled` |
| Mapped/icon/disabled | `var(--mapped-icon-default)` | `--mapped-icon-disabled` |
| Responsive/layout/content/inset-horizontal | `var(--responsive-layout-content-inset)` | `--responsive-layout-content-inset-horizontal` |
| Responsive/layout/hero/inset-vertical | `var(--responsive-layout-hero-inset)` | `--responsive-layout-hero-inset-vertical` |
| Responsive/layout/hero/inset-horizontal | `var(--responsive-layout-hero-inset)` | `--responsive-layout-hero-inset-horizontal` |
| Responsive/layout/content/inset-vertical | `var(--responsive-layout-content-inset)` | `--responsive-layout-content-inset-vertical` |
| Responsive/layout/image-container/inset | `var(--responsive-layout-hero-inset)` | `--responsive-layout-image-container-inset` |
| Responsive/layout/hero/gap | `var(--responsive-layout-hero-inset)` | `--responsive-layout-hero-gap` |

## Values and styles kept as supplied

- Primitives has scale/12 = 12 and scale/72 = 72. Responsive separately has spacing/10 = 10 and spacing/76 = 76. These are separate definitions; no normalization was performed.
- Body/Default styles bind to typography/body/medium variables. Bindings are preserved by variable ID.
- Body/Small/Semibold and Body/Small/SEMIBOLD are separate styles with different variable bindings. Their current appearance is identical, including uppercase transformation. Exact case-sensitive data-ds-text values preserve both.
- All FLOAT variables in this snapshot represent pixel dimensions (scale, spacing, sizing, borders, radii, font sizes, line heights, paragraph spacing). The generator adds px. Future number tokens such as opacity or font weight need an explicit unit rule before adding them.
- Primitives/font/regular, medium, semi-bold and bold are Figma STRING style labels. They remain quoted strings in CSS for fidelity; they are not valid numeric font-weight values. Typography rules separately map Regular/Italic to 400, Medium to 500, SemiBold to 600 and Bold to 700.
- Desktop and Mobile are exported as explicit modes. The Figma variables do not define a viewport breakpoint. Automatic switching remains an implementation decision.
- Mapped only contains Light mode. No dark theme was invented.
- No local paint, effect or grid styles exist. Colors come from variables; effects.css intentionally contains no rules.
- Figma paragraph spacing is represented by --ds-paragraph-spacing and applied between direct child p elements in a styled text container. It is not added as an outer margin to headings or single text elements. Browser paragraph layout still needs visual review at implementation time.
- Exact RGBA values and alias IDs remain in JSON. Generated CSS uses fractional RGB percentages to avoid rounding palette values to different 8-bit colors.
