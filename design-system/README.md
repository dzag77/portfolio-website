# Portfolio design system

Status: integrated in the design-system branch for preview; production merge is pending approval.

Source: [Portfolio-DS in Figma](https://www.figma.com/design/HD2ev9QpEqOt3NqHYBVFAw/Portfolio-DS?node-id=0-1).
Export date: 2026-09-17. Repository branch: `design-system`.

## Contents

| File | Purpose |
|---|---|
| tokens/primitives.json | 60 base colors, dimensions and font strings |
| tokens/semantic.json | 46 semantic variables with aliases |
| tokens/mapped.json | 16 usage-specific color variables; Light mode |
| tokens/responsive.json | 54 variables with Desktop and Mobile values |
| tokens/typography.json | All 14 text styles, exact names and variable bindings |
| styles/variables.css | Generated CSS custom properties |
| styles/typography.css | Generated, explicitly selected text styles |
| styles/effects.css | Empty by design: no local Figma effect styles |
| build.mjs | Dependency-free generator and validation |
| EXPORT-NOTES.md | Source inconsistencies and translation details |

## Source format and naming

JSON uses a project-specific Figma snapshot schema (schemaVersion 1), not a claimed standard token interchange format.
It preserves collection IDs, default modes, mode IDs, variable IDs, names, types, scopes, descriptions, values and alias references.
Each variable also has a unique cssName derived from its collection and current name:
`Mapped/text/default/body` becomes `--mapped-text-default-body`.
The web field preserves the current Figma Web code syntax. All 176 fields match their canonical CSS names; no duplicates or naming mismatches remain in this snapshot.

Figma remains the design reference. To update, refresh the token/style snapshots from Figma and run the generator.
Do not hand-edit generated CSS. This export does not establish automatic synchronization with Figma.

## Regenerate or validate

From the repository root, using Node.js:

```sh
node design-system/build.mjs
node design-system/build.mjs --check
```

Validation checks unique CSS names, required mode values, alias existence/type compatibility, alias cycles,
text-style bindings and whether generated CSS matches the snapshots. No dependencies or package.json changes are needed.

## Future usage — only after approval

src/main.tsx imports the generated styles and selects Mobile mode at the existing 800px breakpoint.
The styles sit outside the existing TypeScript src include path.
No global :root/body styles, font downloads or automatic breakpoint rules are added.

The branch implementation imports the CSS explicitly.
Variables are scoped to an element carrying `data-ds="portfolio"`.
Desktop is the default mode; Mobile is selected by adding `data-ds-responsive="mobile"` to that **same element**.
Use one scope for a page; nested mixed responsive modes are not part of this export.

Example markup for future integration (not currently added to the application):

```html
<section data-ds="portfolio" data-ds-responsive="mobile">
  <h1 data-ds-text="Heading/H1/Bold">Heading</h1>
  <div data-ds-text="Body/Default/Regular">
    <p>First paragraph.</p>
    <p>Second paragraph.</p>
  </div>
</section>
```

Text-style names are case-sensitive. Typography rules preserve bindings, weight, italic, case,
line height, letter spacing and paragraph spacing. They do not choose text color or reset page layout.
Consume the appropriate mapped color variable when implementing components.

Chakra Petch must be available with real 400, 600, 700 and 400 italic font faces.
The current website already requests these faces in src/styles.css; this package does not alter font loading.
The primitive Medium label is retained but no exported text style uses Medium.

The existing layout breakpoints are retained; token modes switch at 800px.
Merging into main or connecting these styles to the site requires the owner's approval.
