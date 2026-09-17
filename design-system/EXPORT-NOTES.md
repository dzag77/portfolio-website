# Export observations

Refreshed from Figma on 2026-09-17. Figma was read only during this refresh.

## Naming verification

All 176 Web fields match collection + actual variable name. No duplicate Web names remain, including Mapped/icon/disabled, which now uses var(--mapped-icon-disabled).
Descriptions and Web metadata were refreshed from the corrected Figma source. Variable values, aliases, modes, names and typography definitions are unchanged from the previous export.

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
