/* ============================================================
   ANLUV — Lógica compartida del prototipo (es-PE)
   Tema claro/oscuro · moneda S/ / $ · carrito pop-up ·
   compra rápida en 2 pantallas · buscador multimodal · toasts.
   ============================================================ */
(function () {
  'use strict';

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const A = window.ANLUV;

  /* ---------- Iconos (monolínea, currentColor) ---------- */
  const I = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm5.77 14.06c-.24.68-1.4 1.3-1.95 1.35-.5.05-1.13.24-3.8-.79-3.2-1.26-5.24-4.53-5.4-4.74-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.63-.4.84-.4h.6c.2 0 .46-.07.71.55.26.63.87 2.17.95 2.33.08.16.13.34.03.55-.11.21-.16.34-.32.53-.16.18-.34.42-.48.56-.16.16-.33.34-.14.66.18.32.82 1.35 1.76 2.19 1.21 1.08 2.23 1.42 2.55 1.58.32.16.5.13.69-.08.18-.21.79-.92 1-1.24.21-.32.42-.26.71-.16.29.11 1.85.87 2.17 1.03.32.16.53.24.61.37.08.14.08.79-.16 1.6Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  };

  /* ---------- Tema claro / oscuro ---------- */
  const temaGuardado = localStorage.getItem('anluv:tema');
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const temaInicial = temaGuardado || (prefiereOscuro ? 'dark' : 'light');
  document.documentElement.dataset.theme = temaInicial;

  function pintarTema() {
    const oscuro = document.documentElement.dataset.theme === 'dark';
    $$('.btn-tema').forEach(b => {
      b.innerHTML = (oscuro ? I.sun : I.moon) + '<span class="sr-only">Cambiar tema</span>';
      b.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  }
  $$('.btn-tema').forEach(b => b.addEventListener('click', () => {
    const nuevo = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nuevo;
    localStorage.setItem('anluv:tema', nuevo);
    pintarTema();
  }));
  pintarTema();

  /* ---------- Moneda ---------- */
  let moneda = localStorage.getItem('anluv:moneda') || 'PEN';
  const fmt = new Intl.NumberFormat('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function precio(soles) {
    if (moneda === 'USD') return '$ ' + fmt.format(soles / A.tipoCambio);
    return 'S/ ' + fmt.format(soles);
  }
  /* Precio dual para tarjetas: soles resaltado + referencia en dólares (es-PE).
     Devuelve HTML; el <span class="precio-alt"> se muestra pequeño bajo el precio. */
  function precioDual(soles, nota) {
    const alt = '$ ' + fmt.format(soles / A.tipoCambio) + (nota ? ' · ' + nota : '');
    return 'S/ ' + fmt.format(soles) + '<span class="precio-alt">' + alt + '</span>';
  }
  function simbolo() { return moneda === 'USD' ? '$' : 'S/'; }
  function setMoneda(m) {
    moneda = m;
    localStorage.setItem('anluv:moneda', m);
    $$('.moneda-toggle button').forEach(b => b.classList.toggle('sel', b.dataset.moneda === m));
    document.dispatchEvent(new CustomEvent('anluv:moneda'));
  }
  $$('.moneda-toggle button').forEach(b => {
    b.classList.toggle('sel', b.dataset.moneda === moneda);
    b.addEventListener('click', () => setMoneda(b.dataset.moneda));
  });

  /* ---------- Toast ---------- */
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = I.check + '<span></span>';
    toastEl.lastElementChild.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  /* ---------- WhatsApp ---------- */
  function waLink(mensaje) {
    return 'https://wa.me/' + A.whatsapp + '?text=' + encodeURIComponent(mensaje);
  }

  /* ---------- Carrito (pop-up) ---------- */
  const Cart = {
    items: JSON.parse(localStorage.getItem('anluv:carrito') || '[]'),
    save() { localStorage.setItem('anluv:carrito', JSON.stringify(this.items)); },
    add(id, qty) {
      const p = PRODUCTOS.find(x => x.id === id);
      if (!p) return;
      const found = this.items.find(i => i.id === id);
      if (found) found.qty = Math.min(found.qty + (qty || 1), p.stock);
      else this.items.push({ id, qty: qty || 1 });
      this.save(); pintarCarrito();
      toast('Añadido a tu carrito');
    },
    setQty(id, qty) {
      const it = this.items.find(i => i.id === id);
      if (!it) return;
      const p = PRODUCTOS.find(x => x.id === id);
      it.qty = Math.max(1, Math.min(qty, p ? p.stock : 99));
      this.save(); pintarCarrito();
    },
    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save(); pintarCarrito();
    },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    subtotal() {
      return this.items.reduce((s, i) => {
        const p = PRODUCTOS.find(x => x.id === i.id);
        return s + (p ? p.precio * i.qty : 0);
      }, 0);
    },
  };
  window.AnluvCart = Cart;

  function thumbHTML(p, cls) {
    if (p.img) return '<img class="' + (cls || '') + '" src="' + p.img + '" alt="' + p.nombre + '" loading="lazy">';
    const ini = p.marca.slice(0, 1);
    return '<div class="thumb-digital ' + (cls || '') + '" role="img" aria-label="' + p.nombre + '">' + ini + '</div>';
  }

  function pintarCarrito() {
    const n = Cart.count();
    $$('.cart-count').forEach(c => {
      c.textContent = n;
      c.classList.toggle('show', n > 0);
    });
    const lista = $('#cart-items');
    if (!lista) return;
    if (!Cart.items.length) {
      lista.innerHTML =
        '<div class="cart-vacio">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/></svg>' +
        '<p><b>Tu carrito está tranquilo, como el mar en calma.</b><br>Cuando encuentres tu herramienta exacta, la guardamos aquí.</p></div>';
    } else {
      lista.innerHTML = Cart.items.map(i => {
        const p = PRODUCTOS.find(x => x.id === i.id);
        if (!p) return '';
        return (
          '<div class="cart-item" data-id="' + p.id + '">' +
          thumbHTML(p) +
          '<div><h4>' + p.nombre + '</h4>' +
          '<div class="ci-precio">' + precio(p.precio) + '</div>' +
          '<div class="qty"><button type="button" data-menos aria-label="Quitar uno">−</button><b>' + i.qty + '</b><button type="button" data-mas aria-label="Añadir uno">+</button></div></div>' +
          '<button type="button" class="ci-quitar icon-btn" data-quitar aria-label="Quitar del carrito">' + I.trash + '</button>' +
          '</div>'
        );
      }).join('');
      $$('.cart-item', lista).forEach(row => {
        const id = row.dataset.id;
        $('[data-menos]', row).addEventListener('click', () => {
          const it = Cart.items.find(x => x.id === id);
          if (it.qty <= 1) Cart.remove(id); else Cart.setQty(id, it.qty - 1);
        });
        $('[data-mas]', row).addEventListener('click', () => {
          const it = Cart.items.find(x => x.id === id);
          Cart.setQty(id, it.qty + 1);
        });
        $('[data-quitar]', row).addEventListener('click', () => Cart.remove(id));
      });
    }
    pintarTotales();
  }

  function pintarTotales() {
    const sub = Cart.subtotal();
    const igv = sub * A.igv;
    const setTxt = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    setTxt('#cart-subtotal', precio(sub));
    setTxt('#cart-igv', precio(igv));
    setTxt('#cart-total', precio(sub));
    const ivaNota = $('#cart-igv-nota');
    if (ivaNota) ivaNota.textContent = precio(igv);
  }

  /* Drawer / overlay genérico */
  function abrirDrawer(id) {
    const d = $(id);
    if (!d) return;
    $('#overlay').classList.add('open');
    d.classList.add('open');
    d.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }
  function cerrarDrawers() {
    $('#overlay').classList.remove('open');
    $$('.drawer').forEach(d => { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); });
    document.body.classList.remove('no-scroll');
  }
  $$('[data-open-cart]').forEach(b => b.addEventListener('click', () => { pintarCarrito(); abrirDrawer('#drawer-carrito'); }));
  $$('[data-close]').forEach(b => b.addEventListener('click', cerrarDrawers));
  const ov = $('#overlay');
  if (ov) ov.addEventListener('click', cerrarDrawers);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarDrawers(); });

  /* ---------- Compra rápida (Comprar Ahora — 2 pantallas) ---------- */
  const QB = { items: [], paso: 1, comprobante: 'Boleta' };

  function qbResumenHTML() {
    const total = QB.items.reduce((s, i) => {
      const p = PRODUCTOS.find(x => x.id === i.id);
      return s + (p ? p.precio * i.qty : 0);
    }, 0);
    const filas = QB.items.map(i => {
      const p = PRODUCTOS.find(x => x.id === i.id);
      if (!p) return '';
      return (
        '<div class="cart-item">' + thumbHTML(p) +
        '<div><h4>' + p.nombre + '</h4><div class="ci-precio">' + i.qty + ' × ' + precio(p.precio) + '</div></div>' +
        '</div>'
      );
    }).join('');
    return filas +
      '<div class="totales"><div class="fila"><span>Total a pagar (IGV incluido)</span><b class="precio">' + precio(total) + '</b></div></div>';
  }

  function qbTotal() {
    return QB.items.reduce((s, i) => {
      const p = PRODUCTOS.find(x => x.id === i.id);
      return s + (p ? p.precio * i.qty : 0);
    }, 0);
  }

  function qbPaso(n) {
    QB.paso = n;
    $$('.qb-screen').forEach(s => s.classList.toggle('sel', +s.dataset.paso === n));
    $$('.qb-pasos i').forEach((bar, ix) => bar.classList.toggle('on', ix < n));
    const btn = $('#qb-continuar');
    if (btn) btn.style.display = n === 1 ? '' : 'none';
  }

  function abrirQuickBuy(items) {
    QB.items = items;
    QB.comprobante = 'Boleta';
    const doc = $('#qb-doc');
    if (doc) { doc.value = ''; doc.closest('.campo').classList.remove('invalid'); }
    $$('.comprobante-ops button').forEach(b => b.classList.toggle('sel', b.dataset.comp === 'Boleta'));
    const res = $('#qb-resumen');
    if (res) res.innerHTML = qbResumenHTML();
    qbPaso(1);
    abrirDrawer('#drawer-quickbuy');
  }
  window.AnluvQuickBuy = abrirQuickBuy;

  const qbDoc = $('#qb-doc');
  if (qbDoc) {
    qbDoc.addEventListener('input', () => {
      qbDoc.value = qbDoc.value.replace(/\D/g, '').slice(0, 11);
      qbDoc.closest('.campo').classList.remove('invalid');
    });
  }
  $$('.comprobante-ops button').forEach(b => b.addEventListener('click', () => {
    QB.comprobante = b.dataset.comp;
    $$('.comprobante-ops button').forEach(x => x.classList.toggle('sel', x === b));
  }));
  const qbContinuar = $('#qb-continuar');
  if (qbContinuar) qbContinuar.addEventListener('click', () => {
    const doc = ($('#qb-doc') || {}).value || '';
    const esDNI = /^\d{8}$/.test(doc);
    const esRUC = /^10\d{9}$|^20\d{9}$/.test(doc);
    if (!esDNI && !esRUC) {
      $('#qb-doc').closest('.campo').classList.add('invalid');
      $('#qb-doc').focus();
      return;
    }
    if (QB.comprobante === 'Factura' && !esRUC) {
      const err = $('#qb-doc-error');
      err.textContent = 'Para Factura necesitas un RUC de 11 dígitos.';
      $('#qb-doc').closest('.campo').classList.add('invalid');
      return;
    }
    qbPaso(2);
  });
  const qbVolver = $('#qb-volver');
  if (qbVolver) qbVolver.addEventListener('click', () => qbPaso(1));

  /* Copiar al portapapeles con feedback */
  function enlazarCopiables(ctx) {
    $$('[data-copiar]', ctx).forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', async () => {
        const valor = btn.dataset.copiar;
        try { await navigator.clipboard.writeText(valor.replace(/\s/g, '')); }
        catch (_) {
          const ta = document.createElement('textarea');
          ta.value = valor; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); ta.remove();
        }
        const original = btn.innerHTML;
        btn.classList.add('ok');
        btn.innerHTML = I.check + '<span>Copiado</span>';
        setTimeout(() => { btn.classList.remove('ok'); btn.innerHTML = original; }, 1800);
      });
    });
  }
  enlazarCopiables(document);

  /* Confirmar por WhatsApp (compra rápida y carrito) */
  function mensajePedido(items, doc, comprobante) {
    const lineas = items.map(i => {
      const p = PRODUCTOS.find(x => x.id === i.id);
      return p ? '• ' + p.nombre + ' ×' + i.qty + ' — ' + precio(p.precio * i.qty) : '';
    }).filter(Boolean);
    const total = items.reduce((s, i) => {
      const p = PRODUCTOS.find(x => x.id === i.id);
      return s + (p ? p.precio * i.qty : 0);
    }, 0);
    let msg = 'Hola ANLUV, quiero confirmar mi compra:\n' + lineas.join('\n') +
      '\nTotal: ' + precio(total) + ' (IGV incluido)';
    if (doc) msg += '\nMi documento: ' + doc + ' · Comprobante: ' + comprobante;
    return msg;
  }
  const qbConfirmar = $('#qb-confirmar');
  if (qbConfirmar) qbConfirmar.addEventListener('click', () => {
    const doc = $('#qb-doc').value;
    window.open(waLink(mensajePedido(QB.items, doc, QB.comprobante)), '_blank', 'noopener');
    toast('Abriendo WhatsApp con tu pedido');
  });
  const cartWa = $('#cart-whatsapp');
  if (cartWa) cartWa.addEventListener('click', () => {
    if (!Cart.items.length) { toast('Tu carrito está vacío'); return; }
    window.open(waLink(mensajePedido(Cart.items)), '_blank', 'noopener');
  });

  /* ---------- Favoritos (wishlist) — persisten en localStorage ---------- */
  const Wish = {
    clave: 'anluv:favoritos',
    items: [],
    init() {
      try { this.items = JSON.parse(localStorage.getItem(this.clave) || '[]'); } catch (_) { this.items = []; }
      if (!Array.isArray(this.items)) this.items = [];
      this.restaurar();
    },
    tiene(id) { return this.items.includes(id); },
    restaurar(root) {
      $$('[data-wish]', root).forEach(b => {
        const on = this.tiene(b.dataset.wish);
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    },
    toggle(id) {
      const i = this.items.indexOf(id);
      if (i >= 0) this.items.splice(i, 1); else this.items.push(id);
      localStorage.setItem(this.clave, JSON.stringify(this.items));
      return i < 0; // true si quedó guardado
    }
  };
  Wish.init();

  /* Botones «Comprar Ahora», «Añadir» y «Favorito» por delegación */
  document.addEventListener('click', e => {
    const buy = e.target.closest('[data-buy]');
    if (buy) { abrirQuickBuy([{ id: buy.dataset.buy, qty: 1 }]); return; }
    const add = e.target.closest('[data-add]');
    if (add) { Cart.add(add.dataset.add, 1); return; }
    const wish = e.target.closest('[data-wish]');
    if (wish) {
      const guardado = Wish.toggle(wish.dataset.wish);
      wish.classList.toggle('on', guardado);
      wish.setAttribute('aria-pressed', guardado ? 'true' : 'false');
      toast(guardado ? 'Guardado en tus favoritos' : 'Quitado de favoritos');
    }
  });
  /* Re-sincroniza al inyectar contenido dinámico (cards, relacionados) */
  document.addEventListener('anluv:render', e => Wish.restaurar(e.detail && e.detail.root));

  /* ---------- Buscador multimodal ---------- */
  /* Historial compartido entre todas las cajas de búsqueda */
  function historialBusquedas() {
    try { return JSON.parse(localStorage.getItem('anluv:busquedas') || '[]'); } catch (_) { return []; }
  }
  function guardarBusqueda(q) {
    if (!q) return;
    let h = historialBusquedas().filter(x => x.toLowerCase() !== q.toLowerCase());
    h.unshift(q);
    localStorage.setItem('anluv:busquedas', JSON.stringify(h.slice(0, 5)));
  }

  function crearBuscador(root) {
    const input = $('input[type="search"]', root);
    const panel = $('.search-panel', root);
    if (!input || !panel) return null;

    const buscador = {
      modo: 'texto',
      abrir() {
        this.pintarSugerencias();
        panel.classList.add('open');
      },
      cerrar() { panel.classList.remove('open'); },
      pintarSugerencias() {
        const ul = $('.suggest-list', panel);
        if (!ul) return;
        const h = historialBusquedas();
        let html = '';
        if (h.length) {
          html += '<li class="s-tag">Tus últimas búsquedas</li>' + h.map(q =>
            '<li><button type="button" data-q="' + q.replace(/"/g, '&quot;') + '">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' + q + '</button></li>').join('');
        }
        html += '<li class="s-tag">Sugerencias</li>' + SUGERENCIAS.filter(s => !h.includes(s)).slice(0, 4).map(q =>
          '<li><button type="button" data-q="' + q + '">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>' + q + '</button></li>').join('');
        ul.innerHTML = html;
        $$('button[data-q]', ul).forEach(b => b.addEventListener('click', () => {
          input.value = b.dataset.q;
          this.ejecutar(b.dataset.q);
        }));
      },
      voz(btn) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const hint = $('.voice-hint', panel);
        if (!SR) {
          if (hint) hint.textContent = 'Tu navegador no admite búsqueda por voz. Escríbenos y te ayudamos igual.';
          return;
        }
        const rec = new SR();
        rec.lang = 'es-PE';
        rec.interimResults = false;
        btn.classList.add('listening');
        if (hint) hint.textContent = 'Te escucho… describe lo que necesitas con tus palabras.';
        rec.onresult = ev => {
          const texto = ev.results[0][0].transcript;
          input.value = texto;
          this.ejecutar(texto);
        };
        rec.onerror = () => { if (hint) hint.textContent = 'No te escuché bien. Inténtalo de nuevo o escribe tu búsqueda.'; };
        rec.onend = () => btn.classList.remove('listening');
        try { rec.start(); } catch (_) { btn.classList.remove('listening'); }
      },
      foto(archivo) {
        if (!archivo) return;
        const estado = $('.dropzone-estado', panel);
        if (estado) {
          estado.textContent = 'Foto recibida: ' + archivo.name + '. En la versión conectada, la IA identifica el producto; por ahora te mostramos coincidencias generales.';
        }
        this.ejecutar('laptop');
      },
      ejecutar(q) {
        guardarBusqueda(q);
        this.cerrar();
        document.dispatchEvent(new CustomEvent('anluv:buscar', { detail: { q } }));
      },
    };

    input.addEventListener('focus', () => buscador.abrir());
    document.addEventListener('click', e => {
      if (!root.contains(e.target)) buscador.cerrar();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); buscador.ejecutar(input.value.trim()); }
    });

    $$('.search-tab', panel).forEach(tab => {
      tab.addEventListener('click', () => {
        buscador.modo = tab.dataset.modo;
        $$('.search-tab', panel).forEach(t => t.classList.toggle('active', t === tab));
        $$('.search-modo', panel).forEach(m => m.style.display = m.dataset.modo === buscador.modo ? '' : 'none');
        if (buscador.modo === 'texto') input.focus();
      });
    });

    /* Voz (Web Speech API, es-PE) */
    const micBtn = $('.voice-mic', panel);
    if (micBtn) micBtn.addEventListener('click', () => buscador.voz(micBtn));

    /* Foto (drag & drop / selector) */
    const dz = $('.dropzone', panel);
    const file = $('input[type="file"]', panel);
    if (dz && file) {
      dz.addEventListener('click', () => file.click());
      dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); });
      dz.addEventListener('dragleave', () => dz.classList.remove('over'));
      dz.addEventListener('drop', e => {
        e.preventDefault(); dz.classList.remove('over');
        buscador.foto(e.dataTransfer.files && e.dataTransfer.files[0]);
      });
      file.addEventListener('change', () => buscador.foto(file.files && file.files[0]));
    }
    const fotoWa = $('.foto-wa', panel);
    if (fotoWa) fotoWa.addEventListener('click', () => {
      window.open(waLink('Hola ANLUV, les envío una foto del producto que busco para que me ayuden a cotizarlo.'), '_blank', 'noopener');
    });

    /* Botones rápidos del input: saltan directo al modo voz / foto */
    const irModo = modo => {
      buscador.abrir();
      const tab = $$('.search-tab', panel).find(t => t.dataset.modo === modo);
      if (tab) tab.click();
    };
    const btnVoz = $('[data-tab-voz]', root);
    const btnFoto = $('[data-tab-foto]', root);
    if (btnVoz) btnVoz.addEventListener('click', () => irModo('voz'));
    if (btnFoto) btnFoto.addEventListener('click', () => irModo('foto'));

    return buscador;
  }
  const buscadores = $$('.searchbox-wrap').map(crearBuscador).filter(Boolean);
  window.AnluvBuscador = buscadores[0] || null;

  /* ---------- Reveal al hacer scroll ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------- Magic nav ---------- */
  const nav = $('.magic-nav');
  if (nav) {
    const indicador = $('.indicador', nav);
    const links = $$('a[href^="#"]', nav);
    function mover(a) {
      if (!a || !indicador) return;
      indicador.style.left = a.offsetLeft + 'px';
      indicador.style.width = a.offsetWidth + 'px';
    }
    links.forEach(a => a.addEventListener('click', () => {
      links.forEach(x => x.classList.remove('activo'));
      a.classList.add('activo');
      mover(a);
    }));
    const secciones = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const a = links.find(l => l.getAttribute('href') === '#' + en.target.id);
          if (a) { links.forEach(x => x.classList.remove('activo')); a.classList.add('activo'); mover(a); }
        }
      });
    }, { rootMargin: '-38% 0px -52% 0px' });
    secciones.forEach(s => spy.observe(s));
    window.addEventListener('resize', () => mover($('a.activo', nav) || links[0]));
    requestAnimationFrame(() => mover($('a.activo', nav) || links[0]));
  }

  /* ---------- Utilidades exportadas ---------- */
  window.Anluv = {
    precio, precioDual, simbolo, toast, waLink, I,
    setMoneda,
    get moneda() { return moneda; },
  };
  window.AnluvWish = Wish;

  pintarCarrito();
  document.addEventListener('anluv:moneda', () => { pintarCarrito(); });
})();
