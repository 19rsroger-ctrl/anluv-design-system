# ANLUV — Brand spec (extraído del brief del cliente)

Sistema en una frase: **calma oceánica premium** — superficies Foam White con estructura Deep Ocean Blue, un solo acento turquesa usado con disciplina, y tipografía editorial (Clash Display) sobre cuerpo neutro (General Sans).

## Tokens (OKLch aprox. desde HEX del brief)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `oklch(0.977 0.004 236)` ≈ `#F8F9FA` | Fondo (Foam White) |
| `--surface` | `oklch(1 0 0)` ≈ `#FFFFFF` | Tarjetas, paneles |
| `--fg` | `oklch(0.25 0.045 240)` ≈ `#0D1B2A` | Texto (Abyss Blue) |
| `--muted` | `oklch(0.52 0.03 230)` ≈ `#51667A` | Texto secundario |
| `--border` | `oklch(0.91 0.01 230)` ≈ `#DDE6EE` | Bordes, divisores |
| `--accent` | `oklch(0.66 0.11 215)` ≈ `#17A2B8` | Turquesa — máx. 2 usos visibles por pantalla |
| `--primary` | `oklch(0.40 0.07 240)` ≈ `#1B4F72` | Deep Ocean Blue — cabeceras, confianza |
| Dark `--bg` | `#0D1B2A` / surface `#122640` | Modo oscuro |
| Semánticos | success `#28A745` · warning `#FFC107` · info `#17A2B8` | Badges de condición, estados |
| Digital | gradiente `#7C3AED → #17A2B8` | Solo tarjetas de licencias digitales |

## Tipografías

- **Display:** `Clash Display` (Fontshare), tracking −0.02em en titulares.
- **Cuerpo:** `General Sans` (Fontshare), tracking 0, line-height 1.55.
- **Jamás:** Inter, Poppins, Roboto ni Google Fonts genéricas.
- ALL CAPS (eyebrows, chips): letter-spacing 0.08em.

## Reglas de postura observadas

1. **El cliente es el héroe, ANLUV la guía** — el copy nunca presiona; nombra villanos (jerga, precios ocultos, abandono post-venta) y los resuelve con calma.
2. **Honestidad absoluta** — cero reseñas inventadas, cero métricas falsas; los estados vacíos se diseñan con orgullo.
3. **60-30-10** — neutrales dominan; turquesa solo en CTA clave y un acento por pantalla.
4. **Cada sección es un póster** — espacio negativo generoso, una idea por bloque.
5. **Calma, no adrenalina** — nada de estética gamer agresiva; movimiento fluido «como agua», respetando `prefers-reduced-motion`.

## Constantes de negocio

- WhatsApp: +51 906 186 548 · Ate, Lima, Perú
- Interbank Soles `898 3255748345` · CCI `00389801325574834541`
- Interbank USD `898 3497563772` · CCI `00389801349756377246`
- Moneda: `S/ 1,234.56` / `$ 1,234.56` · Fecha `DD/MM/YYYY` · IGV 18 %
