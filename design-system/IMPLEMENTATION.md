# Branch implementation

Implemented in the local design-system branch; not pushed or deployed.

- src/main.tsx imports generated variables, typography and effects. The html element owns the portfolio scope. The site's existing 800px breakpoint selects the Mobile token mode and updates on resize.
- Existing page components now explicitly select exported text styles using data-ds-text. Home, Work, About and HQ case-study use the shared system.
- Colors, borders, spacing, hero insets, page insets, interaction states and icon sizes reference tokens. Fixed artwork dimensions and layout breakpoints remain layout-specific.
- All 176 tokens and 14 text styles match the refreshed source. The build succeeds, generated CSS is reproducible and all CSS variable references resolve.
- The existing project raster includes a baked-in 16px gray frame. No extra CSS padding is added to that image. Replacing it with the raw source image is needed before its frame can respond independently to the image-container inset token.
- Existing page content, imagery and structural differences from Figma are retained; this is a design-system integration, not a complete reconstruction of the case-study content.
- Automated browser visual checks could not run because Chromium download timed out. Desktop/mobile appearance and interactions require visual review before merging.
- No push was performed: the remote branch has a Cloudflare Workers build hook whose deployment target has not been verified. Main and the live site are unchanged.
