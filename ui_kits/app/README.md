# ANLUV UI Kit — app

Applied interface kit of the ANLUV design system («calma oceánica premium»). The `index.html` mounts a composed, navigable kit (theme toggle included, canonical tokens loaded from `../../colors_and_type.css`); each modular page under `components/` is self-contained and ready to copy into a new surface. The styles in every page are **literal extractions** from `assets/anluv.css` (canonical selectors of the source project), not reinterpretations.

## Structure

| File | Contents |
|---|---|
| `index.html` | Navigable kit index + light/dark theme toggle; loads `../../colors_and_type.css` (canonical tokens) and `anluv-tokens.css` |
| `anluv-tokens.css` | OKLch tokens + typographic base (copy of root `colors_and_type.css`; keep both in sync) |
| `components/botones-y-formularios.html` | `.btn` (accent/primary/ghost/wa/sm), `.campo` with DNI/RUC validation, `.comprobante-ops`, `.copiable`, `.moneda-toggle`, `.qty-stepper`, `.check`, `.dato-clave` |
| `components/tarjetas.html` | `.card` physical product, `.card.es-digital` with gradient frame, `.lic-card` license rail card, `.confianza-card` |
| `components/carrito-y-compra.html` | `.cart-item`, `.qty`, `.cart-vacio`, `.totales` (IGV 18 %), `.qb-pasos`, copyable payment data |
| `components/estados-y-confianza.html` | `.vacio`, `.opiniones-vacias`, `.garantia-nota`, `.toast`, `.confianza-card`, `.pasos` |
| `components/navegacion.html` | Topbar with `.searchbox` (voice + photo actions), `.magic-nav` with sliding indicator, `.miga`, `.chip-activo` |
| `components/preview-card.html` | `PreviewCard` — composed preview card (icon header + body + meta/link footer) extracted from the trust blocks |
| `components/buscador-ia.html` | AI multimodal search — `.searchbox` + `.search-panel` with Texto/Foto/Voz tabs, suggestion list + history, dropzone, pulsing `.voice-mic`, natural-language interpretation (Web Speech API `es-PE`, localStorage history) |

### Canonical component mapping

For reviewers coming from Claude Design component vocabulary, the kit blocks map as: the topbar/nav shell in `components/navegacion.html` is the **App** shell with its **Sidebar**-equivalent drawers; `components/preview-card.html` is the canonical **PreviewCard**; the payment-data row in `components/carrito-y-compra.html` plays the **Composer** role (user input → confirmed action); and the AI search in `components/buscador-ia.html` is the **InputBar** of the storefront (multimodal input → interpreted query).

## Usage

1. Open `index.html` and navigate to the block you need; every page under `components/` works standalone (embedded tokens).
2. Copy the complete HTML block (container + canonical classes) into your new surface.
3. In your surface, load the root `colors_and_type.css`, or `assets/anluv.css` if you need the full component with all its variants.
4. Dark theme: `html[data-theme='dark']` — tokens respond automatically.
5. Build and verify against the hard rules in `../../SKILL.md` and `../../preview/components-buttons.html` before shipping.

## Design Notes

- **Hard rules when copying:** turquoise accent max 2 uses per screen · `--digital-grad` gradient only for digital licenses · prices always say «Incluye IGV» · cart/checkout are side drawers, never centered modals · fonts Clash Display + General Sans (Fontshare).
- **Imagery:** referenced from `../../../assets/*.jpg` (real catalog photography); brand marks from `../../../assets/brand/`.
- **Interactions:** the full logic (theme, currency, cart, quick buy, magic nav scroll-spy) lives in `../../assets/app.js`. This kit shows structure and styles; it does not reimplement that logic.
- **Token sync:** if you update the root `colors_and_type.css`, update `anluv-tokens.css` too (identical on purpose so each page stays independently copyable).

## Source basis

Based on the source project «Plataforma e-commerce ANLUV» (`222896c0-9afd-42ee-995d-02a181af3884`):

- Visual authority: `../../DESIGN.md` (context §0, components §6, anti-patterns §9)
- Canonical tokens: `../../colors_and_type.css`
- Origin of the style extractions: `../../assets/anluv.css`
- Commented source examples: `../../source-examples/`
- Review cards: `../../preview/`
- Executable original surfaces: `../../index.html`, `../../producto.html`, `../../assets/app.js`, `../../assets/data.js`
