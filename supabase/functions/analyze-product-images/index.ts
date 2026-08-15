// Supabase Edge Function: analiza fotos de productos sin exponer la clave de IA.
// Configura OPENAI_API_KEY como secreto de la función antes de desplegarla.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' }
const allowed = ['laptops', 'componentes', 'licencias', 'accesorios', 'audio']
const types = ['fisico', 'digital']
const conditions = ['nuevo', 'reacondicionado', 'usado', 'openbox', 'repuestos']

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  try {
    const auth = req.headers.get('Authorization') || ''
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: auth } } })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'No autorizado' }, { status: 401, headers: cors })
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return Response.json({ error: 'Solo administradores' }, { status: 403, headers: cors })
    const { images = [] } = await req.json()
    if (!Array.isArray(images) || !images.length || images.length > 8) return Response.json({ error: 'Envía entre 1 y 8 imágenes' }, { status: 400, headers: cors })
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) return Response.json({ error: 'Falta configurar OPENAI_API_KEY' }, { status: 503, headers: cors })
    const prompt = `Analiza cada foto de producto. Devuelve JSON estricto: {"products":[...]}, exactamente un objeto por foto y en el mismo orden. Campos: name, brand, category, type, condition, price, stock, shipping, summary, specs. category debe ser uno de ${allowed.join(', ')}; type uno de ${types.join(', ')}; condition uno de ${conditions.join(', ')}. No inventes precio, stock, condición, marca o especificaciones: usa cadena vacía cuando no sea claramente visible. price y stock deben ser cadena vacía si no se ven. Escribe todo en español peruano. specs es texto con una especificación por línea como "Procesador: Ryzen 5".`
    const content = [{ type: 'text', text: prompt }, ...images.map((image: { name?: string, dataUrl: string }) => ({ type: 'image_url', image_url: { url: image.dataUrl, detail: 'low' } }))]
    const ai = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-4o-mini', response_format: { type: 'json_object' }, messages: [{ role: 'user', content }] }) })
    if (!ai.ok) throw new Error(`La IA respondió ${ai.status}`)
    const body = await ai.json()
    const result = JSON.parse(body.choices?.[0]?.message?.content || '{"products":[]}')
    return Response.json({ products: result.products || [] }, { headers: { ...cors, 'Content-Type': 'application/json' } })
  } catch (error) { return Response.json({ error: error.message || 'No se pudo analizar las fotos' }, { status: 500, headers: cors }) }
})
