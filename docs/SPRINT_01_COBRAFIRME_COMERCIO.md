# Sprint 01 — CobráFirme Comercio (6–19 noviembre 2026)

Estado: **PLANIFICADO, NO IMPLEMENTADO**. Dueño: proyecto CobráFirme. Horizonte: 10 días hábiles. Alcance independiente de Litoral Trace.

## Hipótesis comercial y propuesta
**Cobrá por donde prefieras. Controlá todo en un solo lugar.**
Para microcomercios de Paraguay que venden por WhatsApp, Instagram o mostrador: registrar ventas, organizar cobros pendientes y revisar pagos reportados por el propio comercio. **CobráFirme NO procesa pagos, no custodia saldos y no confirma acreditaciones bancarias por sí solo.**

Hipótesis a falsar: el control y conciliación de cobros entre canales ahorra suficiente trabajo para justificar un servicio de configuración o una futura suscripción. No confundir el interés por las noticias sobre Ueno con intención de compra.

### Línea base verificada 05/11/2026
- Repo: Next.js App Router + TypeScript + export estático, alojado en Render. Guía gratuita, diagnóstico, Kit Integral y PostHog opt-in existentes.
- PostHog, día parcial: **3 pageviews, 1 diagnosis_selected, 0 premium_interest, 0 checklist_download**; probable tráfico propio, ninguna venta verificada.
- No hay multi-tenancy, autenticación, CRUD persistente, conciliación integrada con bancos ni canal de contacto confirmado.
- Issue existente #1 cubre activación de contacto/venta transfronteriza; no duplicarlo.
- Las autorizaciones PISP/EMPE están **fuera del alcance**. Normativa de referencia: https://www.bcp.gov.py/es/web/institucional/w/el-banco-central-del-paraguay-emite-la-resolucion-que-reglamenta-a-los-proveedores-de-servicios-de-inicio-de-pagos-pisp-

## Entregable de sprint (solo si se valida demanda en entrevistas)
Un **control local y exportable** de cobros; no un SaaS de producción ni una billetera:
1. Registro de ventas: identificador no sensible, fecha, canal, importe en Gs., referencia voluntaria no bancaria y estado.
2. Estados explícitos: **Pendiente / Reportado como pagado / Conciliado por el comercio / Revisar**. Un clic del usuario no significa confirmación bancaria.
3. Importación CSV de registros propios con previsualización, validación estricta de columnas y protección contra inyección de fórmulas; exportación CSV compatible con hoja de cálculo.
4. Filtros por estado, fecha, canal y resumen de montos con aclaración de que son registros aportados por el comerciante, no saldos bancarios.
5. Modo sin cuenta y sin backend para la primera prueba con datos sintéticos. Si se incorpora almacenamiento local, documentar que es del dispositivo, no un respaldo; ofrecer exportación y borrado. No almacenar archivos ni datos personales en PostHog.
6. Landing: CTA claro «Controlá tus cobros», acceso a guía gratuita; oferta de implementación asistida como **hipótesis comercial**, sin pago ni disponibilidad ficticios.

## Backlog priorizado
| ID | Prioridad | Actividad | Estimación | Dependencia |
|---|---|---|---:|---|
| CF-01 | P0 | Captación y entrevistas: 10-15 comerciantes + registro de problemas, procesos y disposición de pago | 2 días | Ninguna |
| CF-02 | P0 | Contacto real y medición de demanda; aprovechar issue #1 para WhatsApp/email/formulario; consentimiento y spam | 1 día | Canal propio real |
| CF-03 | P0 | Prototipo funcional local: ventas, estados, filtros, import/export CSV | 3 días | Al menos 3 entrevistas pertinentes |
| CF-04 | P0 | Revisión manual de pagos y excepciones; veto a presentar 'acreditado' por acción del usuario; pruebas con 3 casos reales anonimizados o sintéticos | 1-2 días | CF-03 |
| CF-05 | P0 | Privacidad, seguridad, accesibilidad, QA 360/390/768/1440, CI + smoke LIVE | 1 día | CF-03/04 |
| CF-06 | P0 | Validación de oferta (setup Gs 250.000, futura suscripción Gs 79.000/mes) y GO/NO-GO con evidencia | 1-2 días | CF-01 a 05 |
Precios **hipotéticos**. No habilitar cobros sin prueba del método de pago Paraguay→Argentina, condiciones fiscales, reembolsos y entrega.

## Secuencia de los 10 días hábiles
- **Vie 6 y lun 9**: entrevistas, identificar 3 tareas repetidas, habilitar un contacto real con consentimiento, revisar primeras señales PostHog (excluir pruebas propias).
- **Mar 10–jue 12**: implementar solo registro, estados, filtro, resumen y CSV, sin base de datos ni credenciales financieras; compartir demo local con 3 comercios.
- **Vie 13 y lun 16**: corrección de observaciones, conciliación manual explicable, casos de error, pruebas móviles y seguridad; no copiar datos reales en tickets.
- **Mar 17–jue 19**: pilotos dirigidos, medir tiempo ahorrado con cronómetro y registros verificables, testear disposición a pagar, verificar CI y deploy; decisión GO/NO-GO documentada.

## Criterios de aceptación
- Flujo móvil 390px: crear venta, marcar reporte de pago, conciliar manualmente, filtrar y exportar en <= 3 minutos en prueba guiada; 0 errores de consola críticos y sin scroll horizontal.
- Validación de montos en guaraníes: enteros no negativos dentro de límite; duplicados e importaciones malformadas no se aceptan silenciosamente; CSV escapado contra formula injection.
- Datos nunca pasan a servidores de CobráFirme durante el modo local; PostHog recibe solo eventos de lista permitida y únicamente tras consentimiento. Sin capturar nombres, correos, importes o referencias de clientes.
- Ninguna etiqueta indica 'acreditado por banco', 'saldo disponible' o 'pago verificado' sin integración autorizada y evidencia independiente.
- Navegación, teclado y descarga funcionales en 360/390/768/1440. Test + typecheck + build + HTTP en LIVE verdes. No tocar proyectos Litoral Trace.
- Revisión legal de privacidad/condiciones antes de recibir datos identificables o vender.

## Métricas
**Producto**: diagnósticos consentidos, inicio de control, ventas registradas (conteo agregado, sin datos sensibles), CSV exportado, finalización de flujo, errores.
**Comercial**: 10-15 conversaciones, >= 3 pruebas supervisadas, >= 2 problemas repetidos documentados, >= 2 solicitudes de servicio y preferentemente 1 pago real **solo si** método de cobro/facturación verificado.
**Calidad**: tiempo medido antes/después (no prometer ahorro extrapolado), tareas completadas sin asistencia, 0 estados engañosos, 0 fuga de datos.
No computar scanners, apertura de link o simple pageview como lead.

## Puertas de decisión
- **GO a probar la herramienta local** cuando 3 comerciantes indiquen la misma tarea frecuente y podamos mostrar un flujo usable.
- **GO a piloto pago** solo si al menos 2 comercios manifiestan intención concreta de contratar y existe camino legal y técnico de cobro verificable.
- **GO a backend SaaS con organizaciones separadas** únicamente después de confirmar recurrencia, seguridad, necesidad de sincronización entre dispositivos y presupuesto de mantenimiento.
- **NO-GO** si no hay contactos reales, si el usuario espera validación automática bancaria, si la herramienta no ahorra trabajo o si no podemos facturar/cobrar legítimamente. En ese caso mantener la guía gratuita y no seguir desarrollando.
- Fuera de alcance: billetera, depósitos/saldos, solicitud de pagos SPI/PISP, integraciones bancarias, scraping de cuentas, credenciales, QR operativo no autorizado, procesamiento de tarjetas, publicidad masiva, social login, multiempresa de producción.

## Referencias
- MIC Mipymes, digitalización 2026: https://www.mic.gov.py/la-digitalizacion-de-las-mipymes-para-ampliar-sus-oportunidades-de-crecimiento-y-acceso-a-mercados/
- BCP PISP, Res. 15/2025: https://www.bcp.gov.py/es/web/institucional/w/el-banco-central-del-paraguay-emite-la-resolucion-que-reglamenta-a-los-proveedores-de-servicios-de-inicio-de-pagos-pisp-
- Analítica actual: ver proyecto PostHog vinculado; datos agregados opt-in, no extrapolar.
