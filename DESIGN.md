# ANLUV — Design System

> Category: Project Design System
> Surface: web (responsive, móvil primero en comercio)
> Locale: es-PE · Moneda: `S/` PEN (alterna `$` USD) · IGV 18 %

**Sistema en una frase: calma oceánica premium** — superficies Foam White con estructura Deep Ocean Blue, un solo acento turquesa usado con disciplina, y tipografía editorial (Clash Display) sobre cuerpo neutro (General Sans).

Extraído del proyecto fuente **«Plataforma e-commerce ANLUV»** (`222896c0-9afd-42ee-995d-02a181af3884`). La evidencia vive en `index.html`, `producto.html`, `assets/anluv.css`, `assets/app.js`, `assets/data.js` y `brand-spec.md`; la procedencia completa está en `context/provenance.md`.

---

## 0. Product Context (evidencia fuente)

Todo lo que sigue se deriva directamente de los archivos copiados del proyecto fuente; nada es hipótesis.

### Qué es el producto

ANLUV es una **plataforma e-commerce de tecnología** que opera en Ate, Lima (Perú). Vende cuatro líneas de producto visibles en el catálogo (`assets/data.js`): **laptops** (oficina, gamer, creador), **componentes** (GPU, SSD NVMe, refrigeración), **accesorios** (mouse, teclado, audífonos, parlante) y **licencias digitales** (software con entrega inmediata). La promesa de marca, literal del hero de `index.html`: **«Tu orilla segura en el mar digital»**.

### Superficies primarias (archivos preservados)

| Superficie | Archivo | Capacidades observadas |
|---|---|---|
| Home + catálogo | `index.html` | Hero fotográfico, rail de licencias digitales, sección duelo villanos/guía, grid de confianza, catálogo con filtros sticky, buscador multimodal (texto/foto/voz), filosofía Hésed, footer con datos SUNAT |
| Ficha de producto | `producto.html` | Galería con thumbs y contador, toggle de moneda S//$, stepper de cantidad con tope de stock, tabs APG (descripción/especificaciones/opiniones/preguntas), cross-sell, CTA móvil sticky |

### Capacidades núcleo del sistema (de `assets/app.js` + `assets/data.js`)

- **Carrito lateral** (drawer derecho, nunca modal) con subtotal, **IGV 18 %** desglosado y total; doble CTA «Comprar ahora» + «Confirmar por WhatsApp».
- **Compra rápida** en drawer de 2 pasos: validación en línea de **DNI (8 dígitos) / RUC (11)**, selector de comprobante **Boleta / Factura / Nota de Venta**, datos de pago copiables y caja QR.
- **Buscador multimodal** con historial en `localStorage`, sugerencias, dropzone de foto y micrófono con pulso.
- **Personalización persistente** con prefijo `anluv:` en `localStorage`: tema claro/oscuro, moneda `S/` ↔ `$`, carrito, favoritos (wishlist), búsquedas y preguntas.
- **Magic nav** con indicador turquesa deslizante y scroll-spy por IntersectionObserver; topbar fija con blur.
- **Honestidad como feature**: condición explícita de cada producto (nuevo / reacondicionado / usado / open box / repuestos, con punto de color propio), precios siempre «Incluye IGV», estados vacíos redactados sin métricas inventadas.

### Reglas de negocio es-PE que el diseño debe respetar

Moneda `S/ 1,234.56` / `$ 1,234.56` (Intl `es-PE`, 2 decimales) · IGV 18 % siempre visible · fecha `DD/MM/YYYY` · DNI 8 / RUC 11 · comprobantes SUNAT · pago por Plin/Yape/Interbank · WhatsApp +51 906 186 548 · Ate, Lima · Lun a Sáb 9:00–19:00.

---

## 1. Visual Theme & Atmosphere

ANLUV es una tienda de tecnología en Ate, Lima (Perú) que vende laptops, componentes, accesorios y licencias digitales con una promesa de marca explícita: **«Tu orilla segura en el mar digital»**. El sistema visual traduce esa metáfora marina en producto:

- **Calma, no adrenalina.** Aunque vende hardware gamer, nada de estética agresiva: sin RGB, sin bordes afilados, sin urgencia artificial. El movimiento es fluido «como agua» (easing suave, reveals de 0.7 s).
- **Póster editorial.** Cada sección de la home es un póster (`section.poster`, padding 96 px): una idea por bloque, espacio negativo generoso, titulares grandes en Clash Display.
- **Confianza tangible.** La credibilidad se construye con elementos visibles: garantía escrita, comprobante SUNAT, precio con IGV incluido, condición honesta de cada producto (nuevo / reacondicionado / usado / open box).
- **Cliente héroe, marca guía.** El patrón narrativo central es `duelo` (villanos vs. guía): se nombran los dolores del comprador (jerga, precios ocultos, abandono post-venta) y se resuelven con calma.
- **Hésed (חֶסֶד).** La sección filosófica usa la palabra hebrea como motivo display gigante: «amor bondadoso que se hace acción». Es el único uso decorativo de tipografía a gran escala fuera de titulares.

Tono general: **premium sereno, humano, honesto**. Nada parece plantilla; cada bloque respira.

## 2. Color

Tokens en OKLch (fuente: `assets/anluv.css` `:root` + `brand-spec.md`). El CSS canónico reutilizable está en `colors_and_type.css`.

### Claro (Foam White) — tema por defecto

| Token | Valor | ≈ HEX | Uso |
|---|---|---|---|
| `--bg` | `oklch(0.977 0.004 236)` | `#F8F9FA` | Fondo de página (Foam White) |
| `--surface` | `oklch(1 0 0)` | `#FFFFFF` | Tarjetas, paneles, inputs |
| `--surface-2` | `oklch(0.955 0.008 230)` | `#EEF3F7` | Fondos secundarios, hover de iconos, medios vacíos |
| `--fg` | `oklch(0.25 0.045 240)` | `#0D1B2A` | Texto principal (Abyss Blue) |
| `--muted` | `oklch(0.52 0.03 230)` | `#51667A` | Texto secundario, captions |
| `--border` | `oklch(0.91 0.01 230)` | `#DDE6EE` | Bordes y divisores (1–1.5 px) |
| `--accent` | `oklch(0.66 0.11 215)` | `#17A2B8` | **Turquesa** — CTA clave, indicador de magic nav, foco |
| `--accent-ink` | `oklch(0.98 0.01 220)` | `#F2FBFD` | Texto sobre acento |
| `--accent-soft` | `oklch(0.94 0.035 215)` | `#DDF2F5` | Fondos suaves de acento (chips, focus ring 4 px) |
| `--primary` | `oklch(0.40 0.07 240)` | `#1B4F72` | **Deep Ocean Blue** — botón secundario, iconos de confianza, precios de ficha |
| `--primary-strong` | `oklch(0.32 0.06 245)` | `#12395A` | Superficies oscuras: footer, filosofía, columna «guía», magic nav, toast |

### Oscuro (`html[data-theme='dark']`)

| Token | Valor | Notas |
|---|---|---|
| `--bg` | `oklch(0.21 0.035 245)` | ≈ `#12233A` (el brief cita `#0D1B2A`; el CSS implementa un azul apenas más claro) |
| `--surface` | `oklch(0.25 0.04 243)` | Tarjetas en oscuro |
| `--surface-2` | `oklch(0.29 0.045 242)` | Hover / rellenos |
| `--fg` | `oklch(0.94 0.01 230)` | Texto |
| `--muted` | `oklch(0.72 0.025 232)` | Secundario |
| `--border` | `oklch(1 0 0 / 0.09)` | Borde translúcido |
| `--accent` | `oklch(0.72 0.11 210)` | Turquesa más luminoso |
| `--accent-ink` | `oklch(0.17 0.03 240)` | Texto sobre acento pasa a oscuro |
| `--accent-soft` | `oklch(0.33 0.06 230)` | Suave en oscuro |
| `--primary` | `oklch(0.62 0.08 235)` | Primario aclarado para contraste |

El tema persiste en `localStorage('anluv:tema')` y respeta `prefers-color-scheme` en la primera visita.

### Semánticos y de condición

| Token | Valor (claro) | Uso |
|---|---|---|
| `--success` | `oklch(0.63 0.15 150)` ≈ `#28A745` | Punto «Nuevo», botón copiado, nota IGV, WhatsApp hover de confirmación |
| `--warning` | `oklch(0.80 0.15 85)` ≈ `#FFC107` | Punto «Usado», estrellas de valoración |
| `--warning-ink` | `oklch(0.35 0.06 80)` | Texto sobre warning |
| `--violet` | `oklch(0.54 0.21 290)` | Punto «Open Box», extremo del gradiente digital |
| Peligro | `oklch(0.58–0.62 0.14–0.18 15–25)` | Quitar del carrito, errores de formulario, iconos «villano» |
| WhatsApp | `oklch(0.60 0.16 150)` | `btn-wa` con sombra verde propia |

**Puntos de condición (`punto`)**: nuevo → success · reacondicionado → accent · usado → warning · openbox → violet · repuestos → muted.

### Gradiente digital — única excepción cromática

`--digital-grad: linear-gradient(120deg, oklch(0.54 0.21 290), oklch(0.66 0.11 215))` (violeta → turquesa). **Solo** para el marco de tarjetas de licencias digitales (`lic-card`, `card.es-digital`, `thumb-digital`, `badge-digital`). Nunca en fondos de página ni en otros componentes.

### Disciplina de acento

- Regla 60-30-10: neutrales dominan; el turquesa aparece **máximo 2 veces visibles por pantalla** (p. ej. un CTA + el indicador de la magic nav).
- Sobre fotografía (hero), el texto es `oklch(0.97 0.01 230)` con degradado de sombra oceánica `oklch(0.20–0.22 0.05 245 / 0.25–0.88)`, nunca cajas semitransparentes sueltas.

## 3. Typography

Importación (Fontshare, `display=swap`):

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600&display=swap');
```

| Rol | Stack | Reglas |
|---|---|---|
| Display | `'Clash Display', 'General Sans', system-ui, sans-serif` | Titulares, precios, logo, números de paso. `font-weight: 600`, `letter-spacing: -0.02em`, `line-height: 1.12` |
| Body | `'General Sans', system-ui, sans-serif` | Texto corrido: `400 16px/1.55`; labels y botones usan pesos 550–560 |
| Mono | system-ui | No hay mono de marca; números tabulares no se exigen |

**Prohibido** (anti-patrón explícito del brief): Inter, Poppins, Roboto o Google Fonts genéricas.

### Escala observada

| Elemento | Regla |
|---|---|
| Hero `h1` | `clamp(42px, 6.4vw, 76px)`, tracking −0.025em |
| `poster-head h2` | `clamp(28px, 4vw, 44px)` |
| Ficha `h1` | `clamp(26px, 3.4vw, 36px)` |
| Palabra Hésed | `clamp(56px, 8vw, 96px)`, tracking −0.03em |
| Precio ficha | `clamp(34px, 4vw, 44px)` Clash 600 |
| Precio tarjeta | 21–22 px Clash 600 |
| Eyebrow | `600 12px/1` General Sans, `letter-spacing: 0.09em`, uppercase, con guion turquesa de 22×2 px delante |
| Badges / ALL CAPS | 10.5–12.5 px, `letter-spacing: 0.05–0.09em`, uppercase |
| Lead | `clamp(16px, 2vw, 19px)`, line-height 1.6 |

## 4. Spacing

Sin escala de tokens numérica explícita; la escala observada se deriva del CSS (base 8 px con matices):

| Nivel | Valor | Uso |
|---|---|---|
| xs | 4–8 px | gaps de badges, chips internos |
| sm | 10–14 px | padding de pills, gaps de listas compactas |
| md | 16–20 px | padding de tarjeta (`card-cuerpo: 16px`), filtros `20px`, gaps de grid |
| lg | 22–30 px | padding de tarjetas grandes (`duelo-col: 30px`, `paso: 26px`, `confianza-card: 24px`) |
| xl | 40–48 px | gaps entre columnas (`hesed-grid: 40px`), `poster-head` margin-bottom 44 px |
| 2xl | 64 px | `footer-grid` padding-top |
| 3xl | 96 px | `section.poster` padding vertical (64 px en móvil) |

**Radio y forma**

- `--radius: 18px` — tarjetas, drawers internos, galerías, formularios destacados.
- Derivados: `calc(--radius − 1.5px)` para el interior de `lic-card` (marco gradiente), 14 px en inputs y `cart-item`, 12 px en thumbs y `dato-clave`, 10 px en `suggest-list`.
- Píldoras `999px`: botones (`.btn`), badges, chips, moneda-toggle, magic nav, toast, skip-link no — ese usa 12 px.
- Controles circulares 50 %: `icon-btn` (38 px), `wish` (38 px), `voice-mic` (64 px), redes (40 px).

**Sombras** (siempre en tinte oceánico, nunca gris neutro)

```css
--shadow-1: 0 1px 2px oklch(0.25 0.04 240 / 0.06), 0 8px 24px oklch(0.25 0.04 240 / 0.08);
--shadow-2: 0 2px 6px oklch(0.25 0.04 240 / 0.08), 0 24px 48px oklch(0.25 0.04 240 / 0.14);
--shadow-cta: 0 2px 4px oklch(0.45 0.09 215 / 0.35), 0 10px 24px oklch(0.55 0.11 215 / 0.35);
```

`--shadow-cta` es turquesa y solo se usa en CTAs de acento y el micrófono de voz. En oscuro las sombras pasan a negro puro con más opacidad.

**Contenedor**: `.wrap { width: min(1200px, 100% - 40px) }` (32 px de margen en ≤560 px). Topbar fija `--topbar-h: 72px` (62 px en móvil).

## 5. Layout & Composition

- **Home en pósters apilados**: hero fotográfico (min-height `max(620px, 92svh)`, texto anclado abajo, degradado oceánico) → rail de licencias → duelo villanos/guía → confianza (grid 4 → 2 → 1) + pasos numerados → catálogo → filosofía Hésed (fondo `primary-strong`) → footer oscuro.
- **Catálogo**: `grid-template-columns: 264px 1fr` con filtros sticky (`top: topbar + 16px`); en ≤940 px colapsa a acordeón (`.filtros-toggle`). Grid de productos `repeat(auto-fill, minmax(250px, 1fr))`, 1 columna en ≤560 px.
- **Ficha de producto**: `grid-template-columns: 3fr 2fr`, galería 4/3 con thumbs y contador; columna de info sticky (`top: topbar + 20px`). En móvil aparece `cta-movil`, barra fija inferior con precio + acciones (safe-area incluida).
- **Navegación**: topbar fija con blur (`color-mix(in oklch, bg 82%, transparent)` + `backdrop-filter: blur(14px)`) y **magic nav** — píldora flotante inferior centrada con indicador turquesa que se desliza (`cubic-bezier(.65,0,.35,1)`), scroll-spy por IntersectionObserver. En ≤640 px muestra solo iconos.
- **Drawers laterales**: carrito y compra rápida son paneles derechos de `min(430px, 94vw)` con overlay blurreado; nunca modales centrados.
- **Comportamiento responsive**: móvil rediseña (buscador propio bajo la topbar, filtros en acordeón, CTA sticky), no solo encoge.

## 6. Components

Catálogo de componentes implementados en el código fuente (selectores canónicos entre paréntesis). Ejemplos vivos en `ui_kits/app/` y `preview/components-buttons.html`.

### Botones (`.btn`)
Píldora `min-height: 48px; padding: 0 24px; border-radius: 999px; font: 560 15px/1; letter-spacing: .02em`. Variantes:
- `btn-accent` — turquesa + `--shadow-cta`: **el CTA de compra**. Uno por contexto.
- `btn-primary` — Deep Ocean Blue + `--shadow-1`: acción secundaria («Añadir al carrito»).
- `btn-ghost` — superficie con borde: «Ver detalles», acciones terciarias.
- `btn-wa` — verde WhatsApp con sombra verde: confirmar por WhatsApp.
- `btn-outline-photo` / `btn-onphoto` — variantes sobre fotografía (hero).
- `btn-sm` (40 px), `btn-block` (100 %). Activo: `translateY(1px) scale(.98)`.

### Tarjeta de producto (`.card`)
Superficie + borde + `--shadow-1`; hover `translateY(-5px)` + `--shadow-2`; imagen 4/3 con zoom 1.06. Badges arriba-izquierda (`badge-tipo` con blur), wishlist arriba-derecha (`.wish`, corazón rojo `oklch(0.60 0.18 15)` al activar). Cuerpo: punto de condición + nombre (enlace) + envío + precio Clash + acciones en grid 2 col con `btn-buy` turquesa a ancho completo. Variante `.es-digital`: marco gradiente violeta→turquesa vía `padding-box/border-box` y arte `digital-art` con circuito SVG en lugar de foto.

### Tarjeta de licencia (`.lic-card`)
Rail horizontal con scroll-snap (`grid-auto-columns: min(320px, 82vw)`): marco gradiente de 1.5 px, interior superficie, logo-inicial, badge «Digital», precio + `btn-accent btn-sm`.

### Badges y chips
`.badge` píldora uppercase 11.5 px: `badge-neutro`, `badge-digital` (gradiente), `badge-flash` (turquesa suave), `badge-tipo` (oscuro/blur sobre foto). `.chip-activo` muestra la búsqueda vigente con botón de quitar. `.cart-count` burbuja que escala con rebote `cubic-bezier(.34,1.56,.64,1)`.

### Buscador multimodal (`.searchbox` + `.search-panel`)
Input píldora 46 px con lupa y acciones (voz/foto); foco con `border-color: accent` + anillo `0 0 0 4px accent-soft`. Panel flotante con tabs Texto/Foto/Voz, sugerencias e historial (localStorage `anluv:busquedas`), dropzone punteada, micrófono con pulso `@keyframes pulso`. Variante sticky dentro del catálogo (`.busca-sticky`).

### Filtros (`.filtros`)
Panel sticky con grupos en uppercase 12 px, checkboxes con `accent-color: var(--accent)`, rango de precio con salida «Hasta S/ 5,300.00», botón «Limpiar filtros» subrayado. Acordeón en móvil.

### Carrito lateral (`.drawer` + `.overlay`)
Drawer derecho con cabecera (título + pill contador), items `72px thumb + info + qty stepper píldora + quitar`, pie con subtotal/IGV(18 %)/total y doble CTA (Comprar ahora + WhatsApp). Estado vacío con copy de marca («Tu carrito está tranquilo, como el mar en calma»).

### Compra rápida (`.qb`)
Drawer de 2 pasos con barras de progreso (`.qb-pasos i`), validación DNI/RUC en línea (`.campo.invalid`), selector de comprobante Boleta/Factura/Nota de Venta, bloque `.copiable` con botón «Copiar» que pasa a verde «Copiado», caja QR punteada.

### Ficha de producto
Galería con contador `1 / 3` y badge «Vista 360°», thumbs con borde turquesa al seleccionar, `moneda-toggle` S//$, `dato-clave` (icono + b + span), stepper de cantidad con tope de stock, `garantia-nota` con escudo success, tabs patrón APG (`.tabs-nav` con underline turquesa, roving tabindex, flechas), tabla `.specs-tabla` (th 38 %), `.opiniones-vacias` honesto (sin reseñas inventadas), estrellas interactivas, preguntas con respuesta ANLUV en `accent-soft`, cross-sell `.rel-card`, `cta-movil` sticky.

### Navegación
Topbar (logo SVG + wordmark «ANLUV.» con punto turquesa, buscador, tema, carrito) y `.magic-nav` con indicador deslizante. Footer oscuro 4 columnas con badge SUNAT, redes circulares, legal peruano (Libro de Reclamaciones, Ley 29733).

### Toast (`.toast`)
Píldora oscura centrada abajo (`bottom: 92px`, por encima de la magic nav), icono check turquesa, 2.4 s, `role="status"`.

### Iconografía
Monolínea 24×24, `stroke="currentColor"`, grosor 1.7–2, extremos redondos (estilo Lucide/Feather). El logo es doble ola: turquesa plena + ola secundaria en `currentColor` al 55 %.

## 7. Motion & Interaction

- **Easing de marca**: entradas `cubic-bezier(.2,.6,.2,1)` (reveal 0.7 s, translateY 22 px vía IntersectionObserver, threshold 0.12); paneles `cubic-bezier(.65,0,.35,1)` (drawer 0.38 s, indicador magic nav 0.35 s).
- **Micro-interacciones**: `icon-btn:active { scale(.92) }`, `btn:active { translateY(1px) scale(.98) }`, hover de tarjetas `translateY(-5/-6px)` con sombra 2, zoom de imagen 1.05–1.06 a 0.35–0.5 s.
- **Feedback siempre visible**: toast para acciones (añadir, copiar, favoritos), burbuja de carrito con rebote, botón copiar → verde «Copiado» 1.8 s, wishlist con `aria-pressed`.
- **Estados**: foco visible con anillo turquesa (`outline: 2px solid var(--accent)` o sombra `accent-soft`), `accent-color` en checkboxes/range, skip-link que baja al enfocar.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` anula animaciones/transiciones y `scroll-behavior`; `.reveal` aparece directamente.
- **Persistencia**: tema, moneda, carrito, favoritos, historial de búsqueda y preguntas viven en `localStorage` con prefijo `anluv:`.

## 8. Voice & Brand

- **Idioma**: español de Perú (es-PE). Tuteo cercano y respetuoso: «Cuéntanos tu reto», «Te guiamos al equipo exacto».
- **Metáfora marina constante**: «Tu orilla segura en el mar digital», «nosotros navegamos contigo», «Tu carrito está tranquilo, como el mar en calma».
- **Honestidad radical**: «Aquí no hay reseñas inventadas», «El precio que ves es el precio que pagas», condiciones explícitas («Usado — Funcional, probado, con garantía»). Los estados vacíos se redactan con orgullo y ofrecen salida por WhatsApp.
- **Cliente héroe**: se nombran villanos («Tecnicismos para confundirte») y se responde con la guía («Te explicamos en tu idioma»).
- **Datos concretos peruanos**: precios `S/ 1,234.56` / `$ 1,234.56` (Intl es-PE, 2 decimales), IGV 18 % siempre visible, DNI (8) / RUC (11), Boleta/Factura/Nota de Venta, SUNAT, Plin/Yape, Interbank, fecha `DD/MM/YYYY`.
- **Capitalización**: oraciones (no Title Case). Eyebrows y badges en ALL CAPS con tracking amplio.
- **Contacto canónico**: WhatsApp +51 906 186 548 · hola@anluv.pe · Ate, Lima · Lun a Sáb 9:00–19:00.

## 9. Anti-patterns

Lo que este sistema **prohíbe** (observado en el brief y en el código):

1. **Tipografía genérica**: nada de Inter, Poppins, Roboto ni Google Fonts; siempre Clash Display + General Sans (Fontshare).
2. **Estética gamer agresiva**: sin RGB, sin negro puro con neones, sin urgencia falsa («¡solo quedan 2!» salvo stock real).
3. **Gradientes decorativos**: el único gradiente permitido es `--digital-grad` y solo en licencias digitales. El hero usa degradado de *sombra* oceánica sobre foto, no de color de marca.
4. **Abuso del turquesa**: máximo 2 usos visibles por pantalla; el acento nunca es fondo de sección.
5. **Reseñas o métricas inventadas**: estados vacíos honestos; cero contadores falsos.
6. **Precios sin IGV o con letra chica**: todo precio publicado incluye IGV y lo dice.
7. **Sombras grises neutras**: las sombras siempre llevan tinte oceánico (o negro en oscuro).
8. **Modales centrados**: la compra y el carrito son drawers laterales.
9. **Emojis como iconos**: iconografía monolínea SVG con `currentColor`.
10. **Esquinas mixtas**: un componente es píldora (999 px) o tarjeta (18 px); no se mezclan radios a mitad de camino sin jerarquía.
11. **Movimiento brusco**: sin animaciones sin easing de marca; respetar `prefers-reduced-motion`.
12. **Copy que presiona**: nunca «¡Compra ya o pierde!»; la marca guía con calma.

---

## Semantic output file names

Para nuevos entregables de este proyecto, usa nombres semánticos derivados del brief (`landing-anluv.html`, `catalogo-anluv.html`, `ficha-producto.html`). `index.html` y `producto.html` se conservan como ejemplos fuente originales del proyecto ANLUV.
