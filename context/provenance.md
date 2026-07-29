# Provenance — ANLUV Design System

## Origen

| Campo | Valor |
|---|---|
| Proyecto fuente | `222896c0-9afd-42ee-995d-02a181af3884` — «Plataforma e-commerce ANLUV» |
| Proyecto design-system | `4fc57908-4314-46f7-ae9c-ac6e47cac944` |
| Design-system id | `user:plataforma-e-commerce-anluv-design-system` |
| Skill / DS fuente | ninguno (el sistema se extrajo de cero desde la implementación) |

## Evidencia → Salida

| Evidencia fuente | Qué aportó | Dónde quedó |
|---|---|---|
| `brand-spec.md` | Brief del cliente: tokens OKLch/HEX, fuentes Fontshare, 5 reglas de postura, constantes de negocio (WhatsApp, cuentas Interbank, IGV 18 %) | `DESIGN.md` §1–§4, §8 · `colors_and_type.css` |
| `assets/anluv.css` (819 líneas) | Tokens claro/oscuro completos, sombras oceánicas, radius 18 px, todos los componentes (btn, card, lic-card, filtros, drawer, qb, tabs, magic-nav, toast…) | `DESIGN.md` §2–§7 · `colors_and_type.css` · `ui_kits/app/anluv-tokens.css` |
| `index.html` (784 líneas) | Estructura home: hero fotográfico, rail de licencias, duelo villanos/guía, confianza, pasos, catálogo con filtros, sección Hésed, footer, magic nav, carrito y compra rápida | `DESIGN.md` §5–§6 · `preview/surfaces.html` · `source-examples/` |
| `producto.html` (622 líneas) | Ficha: galería + thumbs + contador, moneda S//$, datos clave, stepper, garantía Hésed, tabs APG, opiniones honestas, preguntas, cross-sell, CTA móvil sticky | `DESIGN.md` §6 · `source-examples/` |
| `assets/app.js` (544 líneas) | Tema claro/oscuro persistente, moneda PEN/USD, carrito localStorage, compra rápida 2 pasos con validación DNI/RUC, buscador multimodal (texto/voz/foto), magic nav con scroll-spy, toasts | `DESIGN.md` §6–§7 · `ui_kits/app/` (notas de interacción) |
| `assets/data.js` (166 líneas) | Constantes de negocio, 5 condiciones de producto con copy honesto, catálogo demo (13 productos, 5 categorías), sugerencias de búsqueda | `DESIGN.md` §8 · `ui_kits/app/` (datos de ejemplo) |
| `assets/*.jpg` (14 imágenes) | Fotografía real de producto + hero oceánico | Conservadas en `assets/`; referenciadas por previews y ui kit |
| Logo SVG inline (en `index.html`/`producto.html` y favicon data-URI) | Marca: doble ola turquesa + wordmark «ANLUV.» | Extraído a `assets/brand/logo-mark.svg` y `assets/brand/favicon.svg` |

## Decisiones de extracción

- **Tokens**: se tomaron los valores OKLch exactos de `anluv.css` (incluidos `--surface-2`, `--primary-strong`, `--warning-ink` y el set oscuro, que el brief no lista). Donde brief y CSS difieren (p. ej. `--bg` oscuro `#0D1B2A` citado vs. `oklch(0.21 0.035 245)` implementado), **el código manda** y se anota la discrepancia en `DESIGN.md` §2.
- **Sin archivos de fuente**: las tipografías se cargan desde Fontshare (CDN); no hay `.woff2` locales que preservar, por eso no existe `fonts/`.
- **Iconos**: son SVG inline monolínea dentro del HTML/JS (estilo Lucide); no hay sprite ni fuente de iconos, por eso no existe `build/`. Los SVG canónicos (logo, favicon) se preservaron en `assets/brand/`.
- **Ejemplos fuente**: los archivos originales `index.html`, `producto.html`, `assets/anluv.css`, `assets/app.js`, `assets/data.js` se conservan intactos como referencia ejecutable; además `source-examples/` contiene fragmentos comentados de los patrones de más señal.

## Regeneración

Si el proyecto fuente evoluciona, repetir: leer `assets/anluv.css` `:root` (tokens), `index.html`/`producto.html` (componentes y copy), `brand-spec.md` (intención de marca) y sincronizar `DESIGN.md`, `colors_and_type.css` y `ui_kits/app/`.
