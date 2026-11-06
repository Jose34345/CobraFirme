# Centro de ahorristas P0/P1 — 06/11/2026

## Alcance y límites
- P0: ruta /ahorristas/, comunicación oficial verificada, orientador local, prevención de fraudes, enlaces **solo a páginas oficiales**. Sin pedir cédula, cuenta, teléfono ni importe.
- P1: encuesta de tres categorías cerradas con casilla de aceptación adicional al consentimiento de analítica; eventos enviados a PostHog si el visitante permite medición. No recopilar correos, nombres, IDs bancarios ni campos libres. Un envío por navegador mediante localStorage, sin presentarlo como garantía antibots.
- Observatorio /observatorio/: muestra estática suprimida por defecto; el archivo src/data/observatorio.json contiene cero resultados. Nunca llamar a PostHog desde el cliente para obtener resultados ni exponer claves privadas. Solo se publica una instantánea manual tras verificación editorial de volumen y calidad. La función canPublishObservatory exige >=30 respuestas revisadas y que las categorías expuestas no sean pequeñas. La encuesta **no representa** a todos los ahorristas.
- No alterar el producto CobráFirme Comercio ni habilitar pagos.

## Fuente y corte editorial
Revisado al **06/11/2026**.
1. BCP 03/11 resolución: https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank
2. BCP 04/11 anticipo: https://www.bcp.gov.py/web/institucional/w/pago-del-anticipo-de-la-garantia-del-fondo-de-garantia-de-depositos-a-los-ahorristas-de-ueno-bank-s.a.
3. BCP 05/11 primer grupo: https://www.bcp.gov.py/web/institucional/w/comunicado-sobre-inicio-de-pagos-de-garantia-a-los-depositantes-de-ueno-bank-sa
4. BCP 05/11 consulta: https://www.bcp.gov.py/web/institucional/w/comunicado-sobre-el-mecanismo-de-consulta-para-los-pagos-a-los-ahorristas-de-ueno-bank-sa
5. Portal oficial BCP: https://www.bcp.gov.py/fgd-pagos

Primera etapa de pago y cobertura general del FGD son conceptos diferentes. CobráFirme no calcula elegibilidad, no recupera depósitos ni enlaza formularios externos que imiten al BCP.

## Datos y privacidad
El proyecto PostHog de CobráFirme se configura con enmascaramiento de IP. El propio SDK envía atributos técnicos del navegador para la entrega; no se garantiza anonimato matemático. Revisar condiciones de tratamiento externo. Sólo enviar propiedades de categorías predefinidas: problem, portal, suspicious. Ningún atributo personal, saldo ni identificador bancario.
No publicar respuesta individual, incluso si el visitante consiente. El archivo estático de resultados se queda en estado unpublished hasta control de calidad documentado. No usar screenshots, IDs o datos de visitantes para marketing directo.
La ley 7593/2025 de Paraguay tiene 24 meses de vacatio; la ley 6534/2020 y la ley argentina 25.326 pueden aplicar. Completar identidad legal/contacto y revisar asesoramiento jurídico antes de ampliar recogida de datos. Si no hay política o token correcto, **mantener encuesta deshabilitada**, no capturar silenciosamente.

## Criterios de aceptación
- /ahorristas/ y /observatorio/ presentes en Next.js static export y sitemap.
- Cero carga/identificación en orientador. No consultar al BCP en nombre del usuario.
- Fuente, fecha, limitaciones y no afiliación visibles.
- Sin envío de encuesta si no hay consentimiento a medición o si falta casilla de encuesta. Sólo enumeraciones cerradas y sin mensajes libres.
- No mostrar métricas ficticias ni una cifra con menos de 30 respuestas revisadas. Bloquear porcentajes por default.
- UX responsive 360/390/768/1440, navegación sin scroll horizontal; CI test/typecheck/build y verificación LIVE HTTP.
- Cuando haya datos: auditar eventos, duplicados, bots y muestras antes de elaborar snapshot. No publicar mediante pipeline desatendido.

## GO / NO-GO
GO: información gratuita, orientador y prevención de fraude.
GO condicionado: recolección de categorías sólo con doble consentimiento y anonimización IP en el proyecto.
NO-GO: asociación individual con depositantes, banco, cédula, saldo, métricas por departamentos escasos, avisos financieros individualizados, anuncios que simulen BCP, envío de datos identificables a PostHog.
