---
name: anluv-design-system
description: Genera UI nueva para ANLUV (e-commerce de tecnología, es-PE) respetando su sistema «calma oceánica premium». Úsalo cuando el brief pertenezca a ANLUV o deba heredar su lenguaje visual (Foam White + Deep Ocean Blue, acento turquesa, Clash Display + General Sans).
user-invocable: true
---

# ANLUV Design System — Skill

Sistema en una frase: **calma oceánica premium** — superficies Foam White con estructura Deep Ocean Blue, un solo acento turquesa usado con disciplina, y tipografía editorial (Clash Display) sobre cuerpo neutro (General Sans).

## What is inside

| Pieza | Ruta | Qué aporta |
|---|---|---|
| Documento canónico | `DESIGN.md` | Contexto de producto, color, tipo, espaciado, layout, componentes, motion, voz y anti-patrones |
| Tokens reutilizables | `colors_and_type.css` | Tokens OKLch claro/oscuro + import Fontshare + base tipográfica |
| Brief de marca original | `brand-spec.md` | Fuente de tokens y tono escrita por el cliente |
| Kit aplicado | `ui_kits/app/` | Índice + 5 páginas de componentes autocontenidas, listas para copiar |
| Tarjetas de revisión | `preview/` | 7 previews enfocados (color, tipo, espaciado, radios/sombras, componentes, marca, superficies) |
| Ejemplos fuente | `source-examples/` | 4 snapshots de componentes de alta señal extraídos del código original |
| Implementación original | `index.html`, `producto.html`, `assets/anluv.css`, `assets/app.js`, `assets/data.js` | Las dos superficies reales y su lógica completa |
| Activos de marca | `assets/brand/logo-mark.svg`, `assets/brand/favicon.svg` | Logo doble-ola y favicon extraídos del SVG inline original |
| Fotografía real | `assets/*.jpg` (14 imágenes) | Hero oceánico + fotos de producto del catálogo |
| Procedencia | `context/source-context.md`, `context/provenance.md` | Mapeo evidencia → salida y decisiones de extracción |

## Source context

Extraído del proyecto fuente **«Plataforma e-commerce ANLUV»** (`222896c0-9afd-42ee-995d-02a181af3884`): tienda de tecnología en Ate, Lima (Perú) que vende laptops, componentes, accesorios y licencias digitales bajo la promesa «Tu orilla segura en el mar digital». Las capacidades núcleo del producto —carrito lateral con IGV 18 %, compra rápida con validación DNI/RUC y comprobantes SUNAT, buscador multimodal, magic nav con scroll-spy, personalización persistente en `localStorage`— están implementadas en `assets/app.js` y documentadas en `DESIGN.md` §0.

## When to use this skill

- El brief es de ANLUV o pide heredar su lenguaje visual («calma oceánica premium»).
- Estás generando una superficie de e-commerce es-PE: catálogo, ficha de producto, carrito, checkout, landing de tienda tech.
- Necesitas tokens ya extraídos (OKLch claro/oscuro), componentes de comercio honestos (condición explícita, IGV visible, estados vacíos redactados) o el patrón de drawers laterales.
- NO lo uses para briefs ajenos al comercio o con estética gamer agresiva: el sistema prohíbe RGB, urgencia falsa y gradientes decorativos.

## How to use

1. **Lee `DESIGN.md`** del proyecto. Es la autoridad; no reinventes tokens.
2. **Importa tokens**: pega `colors_and_type.css` como primer `<style>` (o enlázalo). Si necesitas componentes completos, enlaza `assets/anluv.css`.
3. **Copia componentes** desde `ui_kits/app/` o de los ejemplos en `source-examples/`; no escribas CSS desde cero para patrones que ya existen.
4. **Adapta el copy** al tono de marca (ver abajo) y a es-PE.
5. **Revisa** tu resultado contra `preview/index.html` y las reglas duras de abajo antes de entregar.

## Design system highlights

- **Color**: `--accent` turquesa `oklch(0.66 0.11 215)`, máx. 2 usos por pantalla; `--digital-grad` (violeta→turquesa) solo en licencias digitales; sombras siempre con tinte oceánico.
- **Tipo**: Clash Display (titulares, precios) + General Sans (cuerpo), ambas de Fontshare; prohibido Inter/Poppins/Roboto.
- **Forma**: píldoras `999px` o radio `--radius: 18px`; inputs 14 px; sin radios intermedios.
- **Movimiento**: easings `cubic-bezier(.2,.6,.2,1)` (entradas) y `cubic-bezier(.65,0,.35,1)` (paneles); respeta `prefers-reduced-motion`.
- **Honestidad**: cero reseñas/métricas inventadas; precios siempre «Incluye IGV»; condición del producto explícita con punto de color.

## Reglas duras (un fallo = rehacer)

1. **Fuentes**: Clash Display (titulares, precios, números destacados) + General Sans (cuerpo) desde Fontshare. Prohibido Inter, Poppins, Roboto, Google Fonts.
2. **Acento turquesa** (`--accent`): máximo 2 usos visibles por pantalla. El CTA de compra es `btn-accent` con `--shadow-cta`; no conviertas el turquesa en fondo de sección.
3. **Gradiente digital** (`--digital-grad` violeta→turquesa): solo licencias digitales (marco de tarjeta, thumb, badge). Ningún otro gradiente de color existe en el sistema; sobre fotos se usa el degradado de sombra oceánica del hero.
4. **Honestidad**: sin reseñas, métricas ni stock inventados. Los estados vacíos se diseñan y se redactan con orgullo (ver `.opiniones-vacias`, `.vacio`, `.cart-vacio`).
5. **Precios**: siempre con IGV incluido y dicho («Incluye IGV · comprobante formal»). Formato `S/ 1,234.56` o `$ 1,234.56` (Intl `es-PE`, 2 decimales).
6. **Forma**: píldoras `999px` (botones, badges, chips, toggles) o radio `--radius: 18px` (tarjetas, drawers, galerías); 14 px inputs; nada intermedio sin jerarquía.
7. **Sombras**: solo `--shadow-1`, `--shadow-2`, `--shadow-cta` (tinte oceánico). Prohibidas sombras grises neutras.
8. **Carrito y checkout son drawers laterales** (`min(430px, 94vw)`) con overlay blurreado; nunca modales centrados.
9. **Movimiento**: easing `cubic-bezier(.2,.6,.2,1)` para entradas y `cubic-bezier(.65,0,.35,1)` para paneles; reveal por IntersectionObserver; respetar `prefers-reduced-motion`.
10. **Iconos**: monolínea 24×24 `stroke="currentColor"`, grosor 1.7–2, extremos redondos. Sin emojis como iconos.

## Voz de marca (es-PE)

- Tuteo calmado; el cliente es el héroe, ANLUV la guía: «Cuéntanos tu reto», «Te guiamos al equipo exacto».
- Metáfora marina: «Tu orilla segura en el mar digital». Úsala con moderación (hero, estados vacíos).
- Villanos nombrados con honestidad: jerga, precios ocultos, abandono post-venta — y su resolución en calma.
- Datos peruanos reales: DNI (8)/RUC (11), Boleta/Factura/Nota de Venta, SUNAT, Plin/Yape, WhatsApp +51 906 186 548, Ate, Lima.

## Accesibilidad mínima

- Foco visible turquesa (`outline: 2px solid var(--accent)` o anillo `accent-soft` 4 px).
- `accent-color: var(--accent)` en checkboxes y ranges.
- Skip-link al contenido en páginas de detalle.
- Tabs con patrón APG (roving tabindex, flechas, `aria-selected`).
- `data-od-id` en regiones, CTAs y tarjetas repetidas.

## Referencias dentro del paquete

- Tokens y escala completa: `DESIGN.md` §2–§4
- Componentes: `DESIGN.md` §6 · `ui_kits/app/` · `preview/components-buttons.html`
- Implementación original ejecutable: `index.html`, `producto.html`, `assets/app.js`
- Activos de marca: `assets/brand/` · fotografía de producto: `assets/*.jpg`
