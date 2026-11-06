/** Orientación general. No determina cobertura, elegibilidad ni acreditación individual. */
export const officialSaver = {
  portal: 'https://www.bcp.gov.py/fgd-pagos',
  consultation: 'https://www.bcp.gov.py/web/institucional/fgd-pagos',
  resolution: 'https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank',
  firstGroup: 'https://www.bcp.gov.py/web/institucional/w/comunicado-sobre-inicio-de-pagos-de-garantia-a-los-depositantes-de-ueno-bank-sa',
  consultationNotice: 'https://www.bcp.gov.py/web/institucional/w/comunicado-sobre-el-mecanismo-de-consulta-para-los-pagos-a-los-ahorristas-de-ueno-bank-sa',
  advance: 'https://www.bcp.gov.py/web/institucional/w/pago-del-anticipo-de-la-garantia-del-fondo-de-garantia-de-depositos-a-los-ahorristas-de-ueno-bank-s.a.',
} as const;
export type SaverTopic = 'where'|'first'|'other'|'suspect'|'large';
export const saverTopics: {id:SaverTopic; title:string; summary:string; steps:string[]; notice:string; link:string; source:string}[] = [
  {id:'where',title:'No sé en qué entidad debo consultar',summary:'El BCP dispone de un portal propio para consultar la entidad asignada.',steps:['Entrá directamente al sitio oficial del BCP.','Usá únicamente el mecanismo publicado por el BCP.','Si el sitio muestra indicaciones nuevas, esas instrucciones oficiales prevalecen sobre esta guía.'],notice:'CobráFirme no consulta tu identidad ni tiene acceso al sistema de pagos.',link:officialSaver.consultation,source:'Mecanismo de consulta — BCP, 05/11/2026'},
  {id:'first',title:'Quiero entender la primera etapa de pago',summary:'El comunicado del 5 de noviembre describe un primer grupo sujeto a condiciones concurrentes.',steps:['Revisá si el comunicado del BCP describe tu situación.','La primera etapa menciona depósitos hasta ₲ 10.000.000, ausencia de deuda con la entidad y cuenta habilitada en otra entidad del país.','Confirmá tu situación únicamente por canales oficiales.'],notice:'Este orientador no determina si integrás el primer grupo ni garantiza fechas o montos.',link:officialSaver.firstGroup,source:'Inicio de pagos — BCP, 05/11/2026'},
  {id:'other',title:'No tengo otra cuenta o tengo dudas con el anticipo',summary:'El BCP explicó alternativas según la existencia de cuentas en otras entidades.',steps:['Leé el comunicado oficial sobre el anticipo.','El BCP indicó que a quienes no tengan otra cuenta se les abriría una cuenta a su nombre según el procedimiento comunicado.','Consultá el mecanismo oficial para verificar la entidad asignada y los requisitos vigentes.'],notice:'No te pedimos número de cuenta, cédula ni documentación.',link:officialSaver.advance,source:'Pago del anticipo — BCP, 04/11/2026'},
  {id:'suspect',title:'Recibí un mensaje que me genera desconfianza',summary:'No sigas enlaces ni instrucciones de supuestos intermediarios.',steps:['No compartas claves, PIN, OTP, contraseñas, datos de tarjetas ni capturas de tus cuentas.','No pagues comisiones ni transfieras dinero para supuestamente liberar depósitos.','Abrí vos mismo el sitio oficial del BCP y verificá allí cualquier indicación.'],notice:'No envíes a CobráFirme capturas de mensajes ni datos de terceros.',link:officialSaver.portal,source:'Advertencias antifraude — BCP'},
  {id:'large',title:'Mis depósitos podrían superar el primer tramo',summary:'El límite general de cobertura y el primer tramo de pago son conceptos distintos.',steps:['El BCP informó un límite general de garantía de hasta ₲ 228.300.000 por depositante y entidad, bajo condiciones legales.','El anticipo o primer grupo no representa la resolución de todos los saldos.','Consultá únicamente los próximos comunicados del BCP sobre etapas y pagos.'],notice:'No ingreses montos aquí. No calculamos derechos ni recuperaciones individuales.',link:officialSaver.resolution,source:'Procedimiento de resolución — BCP, 03/11/2026'}
];
export const saverTopicIds = saverTopics.map(item=>item.id);
export type SaverProblem = 'consulta'|'informacion'|'demora'|'seguridad'|'otra';
export type PortalAccess = 'si'|'no'|'no_intente';
export type SuspiciousMessage = 'si'|'no'|'prefiero_no_responder';
export const saverSurveyOptions = {
 problem: ['consulta','informacion','demora','seguridad','otra'] as const,
 portal: ['si','no','no_intente'] as const,
 suspicious: ['si','no','prefiero_no_responder'] as const
};
export type SaverSurvey = {problem: SaverProblem;portal: PortalAccess;suspicious: SuspiciousMessage};
export function isValidSaverSurvey(value: unknown): value is SaverSurvey {
 if (!value || typeof value!=='object' || Array.isArray(value)) return false;
 const obj=value as Record<string,unknown>;
 return Object.keys(obj).length===3 && saverSurveyOptions.problem.includes(obj.problem as SaverProblem) && saverSurveyOptions.portal.includes(obj.portal as PortalAccess) && saverSurveyOptions.suspicious.includes(obj.suspicious as SuspiciousMessage);
}
export type ObservatorySummary={published:boolean;reviewed_at:string|null;sample_size:number;methodology:string;problems:Partial<Record<SaverProblem,number>>};
export function canPublishObservatory(snapshot:ObservatorySummary):boolean {
 if (!snapshot.published||!snapshot.reviewed_at||!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.reviewed_at)||!Number.isSafeInteger(snapshot.sample_size)||snapshot.sample_size<30) return false;
 const entries=Object.entries(snapshot.problems);
 return entries.length>0 && entries.every(([key,value])=>saverSurveyOptions.problem.includes(key as SaverProblem)&&typeof value==='number'&&Number.isSafeInteger(value)&&value>=0&&(value===0||value>=30)) && entries.reduce((sum,[,v])=>sum+(v||0),0)<=snapshot.sample_size;
}
