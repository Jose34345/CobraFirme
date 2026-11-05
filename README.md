# CobráFirme — continuidad de cobros para comercios de Paraguay

**Tus cobros en orden. Tu negocio en marcha.**

Sitio comercial mobile-first para pequeños comercios de Paraguay: guía gratuita y diagnóstico para transferencias, QR, medios alternativos, avisos a clientes y conciliación. Incluye guía contextual para comercios afectados por el procedimiento de resolución de Ueno Bank, según comunicados publicados por el Banco Central del Paraguay el **3 y 4 de noviembre de 2026**.

> **Servicio independiente.** CobráFirme no es un banco, no procesa fondos de clientes y no está afiliado a Ueno, BCP ni Bancard. No recopila contraseñas, PIN, OTP ni tokens bancarios.

## Estado del producto

| Componente | Estado |
|---|---|
| Landing responsive | Implementada |
| Diagnóstico de 5 problemas y guía copiable | Implementado; funciona en navegador sin registro |
| Guía Ueno con fuentes oficiales | Implementada; revisión de hechos **05/11/2026** |
| Mensaje para clientes y checklist CSV gratuito | Implementados |
| Precios de kits US$ 9,99 / 14,99 | Visibles; **compra bloqueada** por defecto |
| WhatsApp / email | Opcionales; solo se muestran si hay datos reales configurados |
| Formulario de contactos | Opcional; únicamente si se configura un endpoint Formspree válido |
| Confirmación automática de pago / entrega privada | **NO implementadas** (requieren procesador, webhook/servidor y prueba real) |
| Identidad del prestador y términos finales | **Pendientes de completar / revisar** |
| Dominio y despliegue LIVE | **Pendientes de configuración externa y verificación** |

## Desarrollo local

Requiere Node.js 22 y npm.

```bash
npm install
npm run dev
# Abrí http://localhost:3000
```

Validaciones:

```bash
npm run test
npm run typecheck
npm run build
```

El proyecto usa Next.js App Router + TypeScript + Tailwind 3 y genera sitio estático (`output: 'export'`). No requiere base de datos ni backend para la versión gratuita.

### Variables de entorno

Copiar `.env.example` a `.env.local` y configurar únicamente valores comprobados. **Nunca subir secretos ni datos bancarios al repositorio.** Las variables `NEXT_PUBLIC_*` son públicas en el navegador; no poner credenciales ahí.

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónica del sitio **ya desplegado**, sin slash final; sitemap y SEO |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número comercial real, formato internacional sin `+` ni espacios |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Correo de atención real |
| `NEXT_PUBLIC_LEGAL_NAME` | Identidad legal del prestador; obligatoria antes de ventas |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | URL real `https://formspree.io/f/...` si se configura la recepción de leads |
| `NEXT_PUBLIC_CHECKOUT_BASIC_URL` | Checkout del kit básico validado |
| `NEXT_PUBLIC_CHECKOUT_PRO_URL` | Checkout del kit Pro validado |
| `NEXT_PUBLIC_PAYMENTS_VERIFIED` | `false` por defecto; **no cambiar a true sin validar pagos y entrega** |

**Importante**: habilitar un enlace de checkout externo no implementa por sí solo confirmación del pago, emisión de Factura E ni entrega privada. La activación comercial requiere esa integración y validaciones adicionales. Esta versión no simula compras aprobadas.

## Publicar gratis

### Opción A — Vercel (recomendada para Next.js)

1. Entrar a [Vercel](https://vercel.com) y conectar GitHub.
2. Elegir el repositorio `Jose34345/CobraFirme`.
3. Framework: Next.js; build `npm run build` (configuración predeterminada).
4. Dejar sin configurar variables opcionales que no tengas verificadas.
5. Hacer Deploy y revisar que se carguen `/`, `/migracion-ueno/`, `/privacidad/`, etc.
6. Agregar `NEXT_PUBLIC_SITE_URL` con **la URL que Vercel realmente asigne**; volver a desplegar para regenerar sitemap y metadatos.
7. Probar 360 px, 390 px, 768 px y escritorio, cinco diagnósticos, copia y CSV.

### Opción B — GitHub Pages

Se incluye `.github/workflows/pages.yml` con ejecución manual (`workflow_dispatch`) para exportar y desplegar a Pages. Antes, en **Settings → Pages**, elegir **GitHub Actions** como fuente. El workflow compila con prefijo `/CobraFirme`, necesario para el proyecto en `github.io`; la URL final es la que GitHub muestre tras un despliegue exitoso. Los enlaces internos de Next.js usan su `basePath`.

No habilitar simultáneamente dos URLs canónicas. Si se usa GitHub Pages, se debe comprobar que las rutas de recursos y la navegación funcionen en el subdirectorio.

## Fuentes de los contenidos

- [BCP, 03/11/2026 — Resolución de Ueno Bank](https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank)
- [BCP, 04/11/2026 — Alias registrados en Ueno](https://www.bcp.gov.py/en/web/institucional/w/comunicado-sobre-uso-de-alias-registrados-en-ueno-bank-sa)
- [BCP, 04/11/2026 — Intermitencias en apps bancarias](https://www.bcp.gov.py/en/web/institucional/w/comunicado-sobre-intermitencias-en-aplicaciones-moviles-de-entidades-bancarias)
- [BCP — Novedades](https://www.bcp.gov.py/en/noticias)
- [Bancard — Ventas QR](https://comercios.bancard.com.py/productos/ventas-qr)

**El contenido necesita mantenimiento**: las condiciones del proceso de resolución, alias y disponibilidad de servicios pueden cambiar rápidamente. Nunca se deben automatizar noticias o precios de proveedores sin verificación.

## Reglas para lanzamiento comercial (GO/NO-GO)

- **GO para versión informativa gratuita** tras CI verde, verificación visual y enlaces oficiales comprobados.
- **NO-GO para pagos** hasta completar identidad del prestador, alta fiscal y facturación de exportación, evaluación tributaria transfronteriza, aceptación real del método de pago desde Paraguay, confirmación de pago en servidor, entrega privada del kit, procedimiento de reembolso y una prueba end-to-end.
- **NO-GO para formularios** sin URL de contacto real, política de privacidad revisada y configuración de recepción y conservación de datos.
- No guardar materiales pagos en este repo **público**: cualquier archivo que se suba aquí puede ser leído/descargado por cualquier persona. Mantener productos privados en un almacenamiento con control de acceso, y emitir enlaces de descarga solo después de un pago validado.

## Estructura

- `src/app/page.tsx` — landing y secciones comerciales.
- `src/app/migracion-ueno/page.tsx` — guía contextual con fuentes.
- `src/components/Diagnosis.tsx` — diagnóstico interactivo y plan copiable.
- `src/lib/diagnostico.ts` — lógica y contenido validable del diagnóstico.
- `src/lib/config.ts` — canales y checkout bloqueado por defecto.
- `public/recursos/checklist-cobros.csv` — recurso gratuito.
- `tests/diagnostics.test.mjs` — tests con Node.js.
- `.github/workflows/ci.yml` — pruebas y build.

**Prohibido** incluir testimonios falsos, automatizar gestión de cuentas bancarias o presentar un proceso regulatorio como garantía de recuperación de fondos.
