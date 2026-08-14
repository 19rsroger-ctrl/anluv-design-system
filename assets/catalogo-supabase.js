/* Carga el catálogo publicado desde Supabase sin romper la demostración local. */
window.AnluvCatalogReady = (async function () {
  'use strict';
  const config = window.ANLUV_SUPABASE || {};
  if (!config.url || !config.anonKey || !window.supabase) return;

  const client = window.supabase.createClient(config.url, config.anonKey);
  window.AnluvSupabase = client;
  const { data, error } = await client.from('products')
    .select('*').eq('active', true).order('created_at', { ascending: false });

  if (error) {
    console.warn('ANLUV: no se pudo cargar el catálogo de Supabase.', error.message);
    return;
  }
  if (!data || !data.length) return;

  const productos = data.map(p => ({
    id: p.slug || p.id,
    nombre: p.name,
    marca: p.brand || 'ANLUV',
    cat: p.category,
    tipo: p.type,
    condicion: p.condition,
    precio: Number(p.price),
    stock: Number(p.stock),
    img: p.image_url || '',
    envio: p.shipping || (p.type === 'digital' ? 'Entrega inmediata' : 'Envío por coordinar'),
    vendidos: 0,
    resumen: p.summary || '',
    specs: p.specs || {},
  }));
  window.PRODUCTOS.splice(0, window.PRODUCTOS.length, ...productos);
  document.dispatchEvent(new CustomEvent('anluv:catalogo-listo'));
})();
