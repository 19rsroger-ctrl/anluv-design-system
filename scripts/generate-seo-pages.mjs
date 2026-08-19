import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const siteUrl = (process.env.SITE_URL || 'https://anluv.com').replace(/\/$/, '');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) throw new Error('Faltan SUPABASE_URL o SUPABASE_ANON_KEY.');

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
const escapeXml = escapeHtml;
const slugify = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const absolute = value => value ? new URL(value, `${siteUrl}/`).href : `${siteUrl}/assets/hero-oceano.jpg`;
const money = value => new Intl.NumberFormat('es-PE', { style:'currency', currency:'PEN' }).format(Number(value || 0));
const productUrl = product => `${siteUrl}/p/${encodeURIComponent(slugify(product.slug || product.name))}/`;

const response = await fetch(`${supabaseUrl}/rest/v1/products?select=slug,name,brand,category,type,condition,price,stock,shipping,summary,specs,image_url,model,sku,gtin,mpn,warranty,image_alt,seo_title,seo_description,updated_at&active=eq.true`, {
  headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` }
});
if (!response.ok) throw new Error(`No se pudo leer el catálogo (${response.status}).`);
const products = await response.json();
const outputDir = join(process.cwd(), 'p');
await rm(outputDir, { recursive:true, force:true });

for (const product of products) {
  const slug = slugify(product.slug || product.name);
  if (!slug) continue;
  const title = product.seo_title || `${product.name} | ANLUV Perú`;
  const description = product.seo_description || product.summary || `Compra ${product.name} en ANLUV.`;
  const url = productUrl(product);
  const image = absolute(product.image_url);
  const condition = product.condition === 'nuevo' ? 'NewCondition' : product.condition === 'usado' ? 'UsedCondition' : 'RefurbishedCondition';
  const specs = Object.entries(product.specs || {});
  const jsonLd = {
    '@context':'https://schema.org', '@type':'Product', name:product.name, description, image, sku:product.sku || slug,
    brand:{ '@type':'Brand', name:product.brand || 'ANLUV' },
    offers:{ '@type':'Offer', url, priceCurrency:'PEN', price:Number(product.price), availability:Number(product.stock) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', itemCondition:`https://schema.org/${condition}`, seller:{ '@type':'Organization', name:'ANLUV' } },
    ...(product.model ? { model:product.model } : {}), ...(product.gtin ? { gtin:product.gtin } : {}), ...(product.mpn ? { mpn:product.mpn } : {}), ...(product.category ? { category:product.category } : {}),
    ...(specs.length ? { additionalProperty:specs.map(([name,value]) => ({ '@type':'PropertyValue', name, value:String(value) })) } : {})
  };
  const details = specs.length ? `<section><h2>Especificaciones</h2><dl>${specs.map(([name,value]) => `<div><dt>${escapeHtml(name)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl></section>` : '';
  const imageMarkup = product.image_url ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.image_alt || product.name)}">` : '';
  const html = `<!doctype html>
<html lang="es-PE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${escapeHtml(url)}">
<meta property="og:type" content="product"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:image" content="${escapeHtml(image)}"><meta property="og:url" content="${escapeHtml(url)}">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
<style>:root{font-family:system-ui,sans-serif;color:#123044;background:#f5f8f9}body{margin:0}.wrap{width:min(980px,calc(100% - 40px));margin:auto;padding:34px 0 70px}a{color:#087c8c}.back{display:inline-block;margin-bottom:28px}.product{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:38px;background:white;border:1px solid #dce7ea;border-radius:20px;padding:28px}.visual img{width:100%;max-height:480px;object-fit:contain;border-radius:14px;background:#f5f8f9}.eyebrow{font-size:14px;color:#5e7580;text-transform:uppercase;letter-spacing:.08em}.price{font-size:32px;font-weight:750;margin:18px 0 8px}.stock{color:#257345;font-weight:650}.button{display:inline-block;background:#159bad;color:white;text-decoration:none;border-radius:999px;padding:13px 20px;font-weight:700;margin-top:22px}section{margin-top:24px;border-top:1px solid #dce7ea;padding-top:18px}h1{font-size:clamp(28px,5vw,43px);line-height:1.08;margin:8px 0 16px}h2{font-size:20px}p{line-height:1.6;color:#405b68}dl{margin:0}dl div{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:10px 0;border-bottom:1px solid #edf2f3}dt{font-weight:700}dd{margin:0}@media(max-width:700px){.product{grid-template-columns:1fr;padding:20px}.wrap{width:min(100% - 28px,980px)}}</style></head>
<body><main class="wrap"><a class="back" href="../../">← Volver al catálogo ANLUV</a><article class="product"><div class="visual">${imageMarkup}</div><div><div class="eyebrow">${escapeHtml(product.brand || 'ANLUV')} · ${escapeHtml(product.category || 'Producto')}</div><h1>${escapeHtml(product.name)}</h1><p>${escapeHtml(description)}</p><div class="price">${escapeHtml(money(product.price))}</div><div class="stock">${Number(product.stock) > 0 ? 'Disponible' : 'Agotado temporalmente'}</div><p>${escapeHtml(product.shipping || 'Envío por coordinar')}${product.warranty ? ` · Garantía: ${escapeHtml(product.warranty)}` : ''}</p><a class="button" href="../../producto.html?id=${encodeURIComponent(slug)}">Ver detalle y comprar</a>${details}</div></article></main></body></html>`;
  const directory = join(outputDir, slug);
  await mkdir(directory, { recursive:true });
  await writeFile(join(directory, 'index.html'), html);
}

const urls = [
  { loc:`${siteUrl}/`, priority:'1.0', changefreq:'daily' },
  ...products.map(product => ({ loc:productUrl(product), priority:'0.8', changefreq:'weekly', lastmod:product.updated_at ? new Date(product.updated_at).toISOString().slice(0, 10) : undefined }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escapeXml(url.loc)}</loc>${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}<changefreq>${url.changefreq}</changefreq><priority>${url.priority}</priority></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(process.cwd(), 'sitemap.xml'), sitemap);
await writeFile(join(process.cwd(), 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /recuperar-contrasena.html\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`Páginas SEO generadas: ${products.length}`);
