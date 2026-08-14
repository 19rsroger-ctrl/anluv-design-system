# Activación de Supabase

1. Crea un proyecto en Supabase y ejecuta `schema.sql` desde **SQL Editor**.
2. En **Authentication > Users**, crea el usuario que administrará la tienda.
3. Copia su UUID y ejecuta la última instrucción comentada de `schema.sql` para asignarle el rol `admin`.
4. Copia Project URL y anon public key en `assets/supabase-config.js`.
5. Publica los archivos. Entra en `/admin.html` con el correo y contraseña del usuario creado.

Para una carga masiva, toma `products-template.csv` como modelo. La imagen de la importación debe ser una URL pública; para subir una foto desde tu equipo, usa el formulario de producto.

La anon key se puede publicar: las políticas RLS del esquema impiden que usuarios comunes creen, cambien o eliminen productos. No uses una clave `service_role` en el navegador.
