# Análisis de fotos con IA

La función mantiene la clave de OpenAI fuera del navegador. Desde un terminal con Supabase CLI autenticado:

```bash
supabase secrets set OPENAI_API_KEY=tu_clave --project-ref dyjbzcvoueudyglcgrpx
supabase functions deploy analyze-product-images --project-ref dyjbzcvoueudyglcgrpx
```

Después de desplegarla, el panel de administración analizará hasta ocho imágenes por lote. Cada imagen crea un borrador, resalta los datos que la IA no puede confirmar y solicita confirmación antes de publicar.
