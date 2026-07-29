/* ============================================================
   ANLUV — Datos del prototipo (es-PE)
   Constantes de negocio configurables + catálogo de demostración.
   En producción estos datos vendrán de Supabase.
   ============================================================ */

const ANLUV = {
  nombre: 'ANLUV',
  eslogan: 'Tu orilla segura en el mar digital',
  whatsapp: '51906186548',
  whatsappVisible: '+51 906 186 548',
  correo: 'hola@anluv.pe',
  direccion: 'Ate, Lima, Perú',
  horario: 'Lun a Sáb · 9:00 a 19:00',
  ruc: 'RUC por configurar',
  tipoCambio: 3.75, // S/ por $ 1 — editable desde el panel
  igv: 0.18,
  pago: {
    celular: '+51 906 186 548',
    soles: { titular: 'ANLUV', cuenta: '898 3255748345', cci: '00389801325574834541' },
    dolares: { titular: 'ANLUV', cuenta: '898 3497563772', cci: '00389801349756377246' },
  },
  links: {
    instagram: '#', facebook: '#', tiktok: '#',
  },
};

/* Condiciones físicas — texto honesto, sin promesas infladas */
const CONDICIONES = {
  nuevo: { nombre: 'Nuevo', detalle: 'Sellado de fábrica', clase: 'nuevo' },
  reacondicionado: { nombre: 'Reacondicionado', detalle: 'Revisado y garantizado por Anluv', clase: 'reacondicionado' },
  usado: { nombre: 'Usado', detalle: 'Funcional, probado, con garantía', clase: 'usado' },
  openbox: { nombre: 'Open Box', detalle: 'Abierto pero sin uso, como nuevo', clase: 'openbox' },
  repuestos: { nombre: 'Para Repuestos', detalle: 'Ideal para técnicos', clase: 'repuestos' },
};

/* Catálogo — precios de referencia de demostración (el catálogo real lo
   administra ANLUV desde el panel). Cada item: id, nombre, marca, cat,
   tipo (fisico|digital), condicion, precio (S/), stock, img, badges. */
const PRODUCTOS = [
  {
    id: 'lap-air-14', nombre: 'Laptop Air 14" · Ryzen 5 · 16 GB · 512 GB SSD',
    marca: 'Lenovo', cat: 'laptops', tipo: 'fisico', condicion: 'nuevo',
    precio: 2499, stock: 6, img: 'assets/laptop-plateada.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Ligera, silenciosa y lista para estudiar o trabajar sin frío en las manos: tú la enciendes y ya está lista.',
    specs: { Procesador: 'AMD Ryzen 5 7530U', Memoria: '16 GB DDR4', Almacenamiento: 'SSD NVMe 512 GB', Pantalla: '14" Full HD IPS', Batería: 'Hasta 10 h', Peso: '1.41 kg' },
  },
  {
    id: 'lap-gamer-f15', nombre: 'Laptop Gamer F15 · RTX 4060 · 16 GB · 1 TB',
    marca: 'ASUS', cat: 'laptops', tipo: 'fisico', condicion: 'reacondicionado',
    precio: 4199, stock: 3, img: 'assets/laptop-gamer.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Potencia seria para editar y jugar, revisada pieza por pieza por nuestro taller antes de llegar a tus manos.',
    specs: { Procesador: 'Intel Core i7-13620H', Gráficos: 'NVIDIA RTX 4060 8 GB', Memoria: '16 GB DDR5', Almacenamiento: 'SSD NVMe 1 TB', Pantalla: '15.6" 144 Hz' },
  },
  {
    id: 'lap-oficina-i5', nombre: 'Laptop Oficina 14" · Core i5 · 8 GB · 256 GB',
    marca: 'HP', cat: 'laptops', tipo: 'fisico', condicion: 'usado',
    precio: 1299, stock: 4, img: 'assets/laptop-oficina.jpg',
    envio: 'Recojo en Ate', vendidos: 0,
    resumen: 'La aliada del día a día: documentos, clases y videollamadas sin sobresaltos, probada y con garantía escrita.',
    specs: { Procesador: 'Intel Core i5-1135G7', Memoria: '8 GB DDR4', Almacenamiento: 'SSD 256 GB', Pantalla: '14" HD', Estado: 'Probada · garantía 3 meses' },
  },
  {
    id: 'lap-creador-15', nombre: 'Laptop Creador 15" · Core Ultra 7 · 32 GB · 1 TB',
    marca: 'Dell', cat: 'laptops', tipo: 'fisico', condicion: 'nuevo',
    precio: 5299, stock: 2, img: 'assets/laptop-creador.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Para quien edita video o diseña en serio: pantalla fiel, memoria de sobra y acompañamiento post-venta real.',
    specs: { Procesador: 'Intel Core Ultra 7 155H', Memoria: '32 GB LPDDR5x', Almacenamiento: 'SSD NVMe 1 TB', Pantalla: '15.6" OLED 3K', Gráficos: 'Intel Arc integrada' },
  },
  {
    id: 'mouse-silencio', nombre: 'Mouse Inalámbrico Silencioso M330',
    marca: 'Logitech', cat: 'accesorios', tipo: 'fisico', condicion: 'nuevo',
    precio: 89, stock: 18, img: 'assets/mouse-inalambrico.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Clics que no despiertan a nadie y batería que dura meses. Simple, como debería ser todo.',
    specs: { Conexión: 'USB 2.4 GHz + Bluetooth', Batería: 'Hasta 18 meses', Botones: '3 · clic silencioso', Compatibilidad: 'Windows · macOS · Linux' },
  },
  {
    id: 'teclado-m75', nombre: 'Teclado Mecánico 75% · Switch Marrón · Español',
    marca: 'Redragon', cat: 'accesorios', tipo: 'fisico', condicion: 'nuevo',
    precio: 219, stock: 9, img: 'assets/teclado-mecanico.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Tacto firme, layout en español y tamaño que deja espacio al mouse. Escribir vuelve a dar gusto.',
    specs: { Switches: 'Marrón táctil', Layout: 'Español · 84 teclas', Conexión: 'USB-C desmontable', Retroiluminación: 'Blanca' },
  },
  {
    id: 'audifonos-anc', nombre: 'Audífonos Over-Ear con Cancelación de Ruido',
    marca: 'Sony', cat: 'audio', tipo: 'fisico', condicion: 'openbox',
    precio: 349, stock: 5, img: 'assets/audifonos.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Abiertos solo para la foto: el ruido de la calle se queda fuera y tu música suena como debe.',
    specs: { Cancelación: 'ANC activa', Batería: 'Hasta 30 h', Conexión: 'Bluetooth 5.2 · cable 3.5 mm', Estado: 'Sin uso · caja abierta' },
  },
  {
    id: 'parlante-bt', nombre: 'Parlante Bluetooth Portátil · Resistente al Agua',
    marca: 'JBL', cat: 'audio', tipo: 'fisico', condicion: 'nuevo',
    precio: 189, stock: 11, img: 'assets/parlante.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Para la sala, la azotea o el taller: 12 horas de música y cero miedo a las salpicaduras.',
    specs: { Potencia: '20 W RMS', Batería: 'Hasta 12 h', Resistencia: 'IPX7', Conexión: 'Bluetooth 5.3' },
  },
  {
    id: 'combo-cooling', nombre: 'Combo Escritorio Fresco · Base 2 Ventiladores + Pad XL',
    marca: 'Havit', cat: 'accesorios', tipo: 'fisico', condicion: 'nuevo',
    precio: 149, stock: 7, img: 'assets/cooler-laptop.jpg',
    envio: 'Envío a todo Lima', vendidos: 0,
    resumen: 'Tu laptop trabaja fresca y tu mouse se mueve libre: el combo que alarga la vida de tu equipo.',
    specs: { Ventiladores: '2 × 140 mm silenciosos', Compatible: 'Laptops de 12" a 17"', Pad: 'XL 80 × 30 cm', Conexión: 'USB con puerto extra' },
  },
  {
    id: 'gpu-rtx4060', nombre: 'Tarjeta Gráfica RTX 4060 · 8 GB GDDR6',
    marca: 'NVIDIA', cat: 'componentes', tipo: 'fisico', condicion: 'nuevo',
    precio: 1399, stock: 4, img: 'assets/tarjeta-grafica.jpg',
    envio: 'Recojo en Ate', vendidos: 0,
    resumen: 'El salto que tu PC necesitaba para diseño, edición y juegos en 1080p sin despeinarse.',
    specs: { Memoria: '8 GB GDDR6', Interfaz: 'PCIe 4.0', Salidas: '3 × DP 1.4 · 1 × HDMI 2.1', Consumo: '115 W' },
  },
  {
    id: 'lic-windows11', nombre: 'Windows 11 Pro · Licencia Original Retail',
    marca: 'Microsoft', cat: 'licencias', tipo: 'digital', condicion: 'nuevo',
    precio: 249, stock: 99, img: '', envio: 'Entrega inmediata', vendidos: 0,
    resumen: 'Clave original activable en línea, con factura y ayuda de instalación si la necesitas. Sin sorpresas.',
    specs: { Edición: 'Windows 11 Pro', Tipo: 'Retail · transferible', Activación: 'En línea · 1 PC', Entrega: 'Clave por WhatsApp y correo' },
  },
  {
    id: 'lic-office365', nombre: 'Microsoft 365 Personal · 12 Meses',
    marca: 'Microsoft', cat: 'licencias', tipo: 'digital', condicion: 'nuevo',
    precio: 199, stock: 99, img: '', envio: 'Entrega inmediata', vendidos: 0,
    resumen: 'Word, Excel y 1 TB en la nube por un año, activado con tu propio correo y con soporte en español.',
    specs: { Aplicaciones: 'Word · Excel · PowerPoint · Outlook', Nube: 'OneDrive 1 TB', Dispositivos: '1 persona · 5 equipos', Vigencia: '12 meses' },
  },
  {
    id: 'lic-eset', nombre: 'ESET NOD32 Antivirus · 1 Año · 1 PC',
    marca: 'ESET', cat: 'licencias', tipo: 'digital', condicion: 'nuevo',
    precio: 99, stock: 99, img: '', envio: 'Entrega inmediata', vendidos: 0,
    resumen: 'Protección liviana que no vuelve lenta tu laptop. Licencia oficial con activación guiada.',
    specs: { Protección: 'Antivirus · antiphishing', Vigencia: '12 meses', Equipos: '1 PC', Entrega: 'Clave por WhatsApp y correo' },
  },
];

const CATEGORIAS = [
  { id: 'laptops', nombre: 'Laptops' },
  { id: 'componentes', nombre: 'Componentes' },
  { id: 'licencias', nombre: 'Licencias' },
  { id: 'accesorios', nombre: 'Accesorios' },
  { id: 'audio', nombre: 'Audio' },
];

/* Sugerencias e historial inicial del buscador */
const SUGERENCIAS = [
  'laptop para estudiar',
  'laptop para editar videos',
  'mouse inalámbrico',
  'windows 11 original',
  'teclado mecánico español',
  'antivirus eset',
];

window.ANLUV = ANLUV;
window.CONDICIONES = CONDICIONES;
window.PRODUCTOS = PRODUCTOS;
window.CATEGORIAS = CATEGORIAS;
window.SUGERENCIAS = SUGERENCIAS;
