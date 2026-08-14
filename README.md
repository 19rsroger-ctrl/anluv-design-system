# ANLUV Design System

**Calma oceánica premium** para la plataforma e-commerce de ANLUV — tienda de tecnología en Ate, Lima (Perú): superficies Foam White, estructura Deep Ocean Blue, un solo acento turquesa con disciplina, y tipografía editorial (Clash Display) sobre cuerpo neutro (General Sans).

## Product Overview

ANLUV es una **plataforma e-commerce de tecnología** que opera en Ate, Lima (Perú), bajo la promesa de marca **«Tu orilla segura en el mar digital»**. Vende laptops, componentes, accesorios y licencias digitales con honestidad radical: condición explícita de cada producto (nuevo / reacondicionado / usado / open box), precios siempre con IGV 18 % incluido y dicho, y cero reseñas o métricas inventadas.

The platform provides a full storefront: it includes a catalog with sticky filters and multimodal search, a product detail page with gallery and currency toggle, a slide-in cart with IGV breakdown, a two-step quick-buy drawer with DNI/RUC validation, and persistent theme/currency/cart personalization. Every surface is designed around radical honesty — explicit product condition, prices that always include IGV, and zero invented reviews or metrics.

**Superficies primarias preservadas:**

- `index.html` — home + catálogo: hero fotográfico, rail de licencias digitales, duelo villanos/guía, confianza, filtros sticky, buscador multimodal, filosofía Hésed, footer SUNAT.
- `producto.html` — ficha de producto: galería con thumbs, toggle de moneda S//$, stepper con tope de stock, tabs APG, cross-sell, CTA móvil sticky.

**Capacidades núcleo** (implementadas en `assets/app.js`): carrito lateral con IGV desglosado y doble CTA (web + WhatsApp), compra rápida en 2 pasos con validación DNI/RUC y comprobantes Boleta/Factura/Nota de Venta, buscador texto/foto/voz con historial, magic nav con scroll-spy, y persistencia de tema, moneda, carrito y favoritos en `localStorage` con prefijo `anluv:`.

## Administración de catálogo

`admin.html` es el panel protegido para administrar productos, subir imágenes y cargar un catálogo CSV. Está diseñado para Supabase (Auth, Postgres y Storage): sigue `supabase/README.md`, ejecuta `supabase/schema.sql` y añade la Project URL y anon key en `assets/supabase-config.js`. Sin configurar Supabase, la tienda conserva el catálogo de demostración incluido en `assets/data.js`.

## Source & context references

- Proyecto fuente: **«Plataforma e-commerce ANLUV»** (`222896c0-9afd-42ee-995d-02a181af3884`).
- `context/source-context.md` — contrato de generación y lista de archivos copiados.
- `context/provenance.md` — mapeo evidencia → salida, decisiones de extracción y pasos de regeneración.
- `brand-spec.md` — brief de marca original del cliente (fuente de tokens).

## Package Contents

| Ruta | Contenido |
|---|---|
| `DESIGN.md` | Documento canónico: contexto de producto, tema, color, tipo, espaciado, layout, componentes, motion, voz y anti-patrones |
| `SKILL.md` | Skill invocable con frontmatter YAML para agentes que generen UI nueva con este sistema |
| `colors_and_type.css` | Tokens OKLch (claro/oscuro) + base tipográfica reutilizable (import Fontshare incluido) |
| `brand-spec.md` | Brief de marca original (fuente de tokens) |
| `assets/brand/` | Logo SVG (`logo-mark.svg`) y favicon (`favicon.svg`) extraídos del código fuente |
| `assets/*.jpg` | Fotografía real: hero oceánico + 13 fotos de producto del catálogo |
| `assets/anluv.css` · `assets/app.js` · `assets/data.js` | Implementación original completa (referencia ejecutable) |
| `index.html` · `producto.html` | Superficies aplicadas originales |
| `source-examples/` | 4 ejemplos de componente de alta señal extraídos del código fuente |
| `preview/` | 7 tarjetas de revisión enfocadas (ver manifiesto abajo) |
| `context/` | Procedencia (`source-context.md`, `provenance.md`) |
| `ui_kits/app/` | Kit de interfaz aplicada: `index.html` + `components/` (5 páginas modulares) + README propio |

**Preserved assets:** `assets/brand/logo-mark.svg` (doble ola turquesa), `assets/brand/favicon.svg`, y 14 imágenes JPG reales (`hero-oceano.jpg`, laptops, componentes, accesorios) — all preserved from source. **Fonts:** Clash Display + General Sans load via Fontshare (`@import` en `colors_and_type.css`); the source served them from CDN, so no local `fonts/` files exist. **Build/runtime:** the source project shipped no `build/` icons or runtime binaries; all iconography is inline monoline SVG (see `ui_kits/app/`).

## Preview manifest

| Tarjeta | Propósito de revisión | Evidencia que carga |
|---|---|---|
| `preview/index.html` | Manifiesto navegable de las 7 tarjetas | `colors_and_type.css` |
| `preview/colors-primary.html` | Paleta OKLch claro/oscuro, semánticos, puntos de condición y gradiente digital | `colors_and_type.css` |
| `preview/typography-specimens.html` | Escala Clash Display / General Sans: hero, póster, ficha, precios, eyebrow, Hésed | Fontshare + tokens |
| `preview/spacing-tokens.html` | Escala 4→96 px, contenedor `.wrap`, padding de pósters, radios base | tokens |
| `preview/radius-shadows.html` | Píldora 999 px vs. `--radius: 18px`; sombras `--shadow-1/2/cta` con tinte oceánico | tokens |
| `preview/components-buttons.html` | Botones, badges, tarjetas, formularios, toast y magic nav con estilos extraídos | `assets/anluv.css`, `assets/*.jpg` |
| `preview/brand-assets.html` | Logo SVG, favicon y la fotografía real de producto preservada | `assets/brand/*.svg`, `assets/*.jpg` |
| `preview/surfaces.html` | Enlaces a las superficies originales del proyecto (home/catálogo, ficha) | `index.html`, `producto.html` |

## Source examples

`source-examples/` conserva snapshots sustantivos (no stubs) del código original: `card-producto.html`, `compra-rapida.html` (drawer de 2 pasos con DNI/RUC), `duelo-filosofia.html` (villanos/guía + Hésed) y `estados-vacios.html`. Cada uno enlaza `../assets/anluv.css` para renderizar con estilos reales.

## UI kit aplicado

`ui_kits/app/` es un kit navegable con índice (`index.html`, que carga `../../colors_and_type.css`) y seis páginas modulares bajo `ui_kits/app/components/` —`botones-y-formularios.html`, `tarjetas.html`, `carrito-y-compra.html`, `estados-y-confianza.html`, `navegacion.html`, `preview-card.html`— cuyos estilos son extracciones literales de `assets/anluv.css`. Guía de reuso en `ui_kits/app/README.md`.

## Reuse Workflow

1. Start with `DESIGN.md` — the visual authority (context §0, hard rules §9).
2. Load `colors_and_type.css` (tokens + fonts) or the full `assets/anluv.css` when you need every component.
3. Dark theme: `document.documentElement.dataset.theme = 'dark'`.
4. Copy and compose components from `ui_kits/app/`; respect accent discipline (max 2 turquoise uses per screen).
5. Review the result against `preview/index.html` and the 10 hard rules in `SKILL.md` before shipping.

## Primeras vistas para revisión

- `preview/index.html` — manifiesto con todas las tarjetas
- `preview/colors-primary.html` — paleta completa claro/oscuro
- `preview/typography-specimens.html` — escala Clash Display / General Sans
- `preview/components-buttons.html` — botones, tarjetas, badges, formularios
- `preview/surfaces.html` — las superficies reales del proyecto
- `ui_kits/app/index.html` — kit aplicado navegable

## Constantes de negocio (es-PE)

Moneda `S/ 1,234.56` / `$ 1,234.56` · IGV 18 % · fecha `DD/MM/YYYY` · DNI 8 dígitos / RUC 11 · Boleta/Factura/Nota de Venta · WhatsApp +51 906 186 548 · Ate, Lima.
