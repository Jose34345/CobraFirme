# CobráFirme: estrategia de validación comercial (05/11/2026)

## Hechos comprobados

- El BCP anunció el procedimiento de resolución de Ueno Bank el 03/11/2026: https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank
- El BCP anunció el 05/11/2026 criterios del primer grupo de pagos de garantía: https://www.bcp.gov.py/web/institucional/w/comunicado-sobre-inicio-de-pagos-de-garantia-a-los-depositantes-de-ueno-bank-sa
- Cloudflare Web Analytics ofrece estadísticas de visitas gratuitas pero **no** eventos personalizados: https://developers.cloudflare.com/web-analytics/faq/
- PostHog permite analítica de eventos con hasta 1 millón gratis al mes, sujeto a las condiciones vigentes: https://posthog.com/pricing
- Google AdSense exige contenido original y cumplimiento de sus políticas. La aprobación y los ingresos no están garantizados: https://support.google.com/adsense/answer/9724?hl=es-419
- Paraguay tiene Ley N° 7593/2025 de protección de datos personales, con ámbito de aplicación que incluye tratamientos desde el exterior en determinados supuestos: https://www.bacn.gov.py/leyes-paraguayas/12924/ley-n-7593-proteccion-de-datos-personales

## Hipótesis por verificar (no hechos)

1. Los comerciantes necesitan reorganizar cobros, no solamente conocer las noticias sobre Ueno.
2. Algunos pagarían US$ 14,99 por herramientas prácticas y editable de conciliación y transición.
3. El tráfico orgánico derivado de actualidad puede convertirse en uso repetido, pero es probable que decaiga cuando termine la urgencia.
4. Una eventual venta del sitio requeriría demostrar recurrencia, ingresos transferibles, contenido original y licitud del tratamiento de datos.

## Propuesta comercial

**Gratis permanentemente:** guía Ueno con fuentes, 5 diagnósticos, checklist, plantillas de comunicación y prevención de fraude. Sin email obligatorio y sin vender el acceso a indicaciones oficiales.

**Un Kit Integral, US$ 14,99, pago único:** libro de conciliación funcional con fórmulas, matriz para comparar condiciones reales que el comercio obtiene de proveedores, plan operativo, mensajes editables multicanal, guía de reconciliación y control antifraude. Valor = ejecución adaptada a casos y ahorro de trabajo, no información que una IA puede redactar.

**No habilitar el pago** hasta validar: checkout desde Paraguay a Argentina, impuestos, reembolsos, confirmación de pago, entrega privada, soporte y actualización de contenidos.

**No incluir anuncios** mientras la experiencia sea un servicio de urgencia y el volumen no justifique su distracción. Una opción futura es patrocinio o publicidad claramente etiquetada, sin afiliaciones bancarias falsas.

## Métricas y definición de eventos

Configurar proyecto propio PostHog (el sitio no configura ni crea una cuenta de terceros por sí solo), obtener token público y host. **Sin token, la medición no envía datos**. Cuando se configure, mostrar consentimiento previo (rechazar es posible sin perder funciones). Sin captura automática, sin grabaciones ni identificación personal.

- `$pageview` — cantidad de páginas vistas consentidas; no equivale a usuarios humanos únicos (bots/consentimiento afectan la métrica).
- `diagnosis_selected` — opciones seleccionadas. No es un comercio validado ni un lead.
- `plan_copied` — personas que copiaron una guía.
- `message_copied`, `checklist_download` — uso de herramientas.
- `ueno_guide_open` — clic en guía contextual (cuando se instrumente).
- `premium_interest` — interés declarado, no compra (no confundir con ingresos).
- `premium_checkout_click` — ida al checkout, **no cuenta como pago**.

No recoger nombres, teléfonos, números de cuenta, datos de pagos, URLs con query strings, sesión grabada ni identidad persistente en los eventos.

### Hipótesis de embudo para evaluar en siete días, no umbrales científicos

1. Difundir a comercios reales por canales donde se permiten aportes útiles. Etiquetar las campañas con enlaces separados y anotar manualmente fuentes, sin rastreo intrusivo.
2. Medir uso humano razonablemente: excluir visitas propias y no equiparar bots con demanda.
3. 100 diagnósticos elegidos es **uso de la página**, todavía no prueba intención de pago.
4. Realizar 10-15 conversaciones con comerciantes para validar necesidad y valor del Kit Integral (solo con permiso).
5. Solicitar manifestaciones explícitas de intención de compra y prueba de pago; 3-5 interesados no equivalen a ventas.
6. Si no aparece demanda de pago, mantener recurso informativo gratuito y evitar más desarrollo. Ajustar propuesta solo con evidencia.

## Publicidad: escenario hipotético, NO estimación de ingresos

Ingresos brutos de anuncios ≈ vistas monetizadas / 1000 × RPM. RPM depende de tráfico, geografía, dispositivo, formato y aprobación del programa.

Ejemplos **puramente aritméticos** si el RPM hipotético fuese US$ 0,50 / US$ 1 / US$ 2:

| Páginas vistas/mes | RPM $0,50 | RPM $1 | RPM $2 |
|---:|---:|---:|---:|
| 1.000 | $0,50 | $1 | $2 |
| 10.000 | $5 | $10 | $20 |
| 50.000 | $25 | $50 | $100 |

No hay evidencia de que CobráFirme alcance esas visitas, RPM o aprobación. Con tráfico pequeño, AdSense no es un modelo principal.

## Posible venta del sitio

No almacenar expedientes de clientes ni traficar datos personales. Un comprador legítimo evaluaría contenido original, dominio, SEO, marca disponible, analítica verificable con contexto, cohortes de usuarios, activos digitales y facturación neta demostrada. No prometer venderlo en semanas. Para exportar métricas, usar agregados anónimos, revisar los términos del proveedor y las leyes de privacidad de Paraguay y Argentina.

## GO / NO-GO

- **GO**: landing, guía gratuita, mejoras visuales, medición con consentimiento tras configurar PostHog, entrevistas y validación de materiales.
- **NO-GO**: compra pública sin procesador probado, entrega privada y formalidades fiscales. NO-GO a anuncios que se confundan con avisos oficiales o consejos financieros.
