import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, CircleAlert, Clock3, ExternalLink, Landmark, LockKeyhole, MessageCircleWarning, ShieldCheck, Users } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { SaverOrientation } from '@/components/SaverOrientation';
import { SaverSurvey } from '@/components/SaverSurvey';
import { officialSaver } from '@/lib/ahorristas';
export const metadata:Metadata={
 title:'Ahorristas de Ueno: guía gratuita y consulta oficial del BCP',
 description:'Información independiente para ahorristas paraguayos: etapas del Fondo de Garantía de Depósitos, portal oficial del BCP, prevención de fraude y encuesta voluntaria. Sin cédula ni contraseñas.',
 alternates:{canonical:'/ahorristas/'},
 openGraph:{title:'CobráFirme para ahorristas — guía independiente',description:'Entendé las comunicaciones del BCP, consultá el portal oficial y evitá estafas. Gratis y sin registro.',type:'website'}
};
const sources=[
 {date:'03/11/2026',title:'Inicio del procedimiento de resolución',body:'El BCP informó una situación particular de Ueno Bank y aclaró que no representa una crisis generalizada del sistema financiero.',url:officialSaver.resolution},
 {date:'04/11/2026',title:'Instrucciones sobre el anticipo',body:'El BCP comunicó el mecanismo previsto según si las personas tienen o no cuentas en otras entidades del país.',url:officialSaver.advance},
 {date:'05/11/2026',title:'Primer grupo y consulta de entidad asignada',body:'El BCP informó condiciones del primer grupo y habilitó un mecanismo oficial para consultar la entidad asignada.',url:officialSaver.firstGroup},
];
export default function SaverPage(){
 return <><SiteHeader/><main className="saver-page">
  <section className="saver-hero"><div className="container saver-hero-layout">
    <div className="saver-hero-copy">
      <Link className="back-link" href="/"><ArrowLeft size={16}/> Volver a CobráFirme</Link>
      <p className="saver-kicker"><ShieldCheck size={16}/> GUÍA INDEPENDIENTE · ACTUALIZADA 06/11/2026</p>
      <h1>Información clara para <em>ahorristas de Paraguay.</em></h1>
      <p className="saver-hero-description">¿Tenías ahorros en Ueno y no sabés qué hacer? Reunimos comunicados del Banco Central, pasos de consulta y alertas de seguridad en un solo lugar. <strong>Gratis, sin cuenta y sin pedir tus datos.</strong></p>
      <div className="saver-hero-actions"><a className="btn btn-primary" href="#orientador">Orientarme gratis <ArrowRight size={18}/></a><a className="btn btn-outline" href={officialSaver.portal} rel="noopener noreferrer nofollow" target="_blank">Ir al BCP <ExternalLink size={17}/></a></div>
      <p className="saver-hero-disclaimer">CobráFirme no pertenece al BCP ni a Ueno, no tramita depósitos, no consulta identidades y no garantiza pagos.</p>
    </div>
    <aside className="saver-hero-panel" aria-label="Puntos clave del procedimiento">
      <div className="saver-hero-panel-top"><Landmark size={24}/><span>QUÉ DEBÉS SABER</span></div>
      <div className="saver-keyfact"><span>01</span><div><strong>Consultá el portal oficial</strong><p>El BCP habilitó su propio mecanismo para verificar la entidad asignada.</p></div></div>
      <div className="saver-keyfact"><span>02</span><div><strong>Las etapas son diferentes</strong><p>El primer grupo no representa la totalidad de los pagos ni modifica el límite general de garantía.</p></div></div>
      <div className="saver-keyfact"><span>03</span><div><strong>Protegé tus claves</strong><p>Nadie de CobráFirme necesita acceder a tus cuentas o documentos bancarios.</p></div></div>
      <a href={officialSaver.consultation} target="_blank" rel="noopener noreferrer nofollow" className="saver-panel-link">Consultar entidad asignada en BCP <ArrowUpRight size={16}/></a>
    </aside>
  </div></section>
  <div className="saver-trust"><div className="container"><span><LockKeyhole size={17}/> Nunca pedimos cédula, clave ni OTP</span><span><ShieldCheck size={17}/> Fuentes primarias del BCP</span><span><BookOpen size={17}/> No realizamos trámites financieros</span></div></div>
  <section className="saver-section"><div className="container"><SaverOrientation/></div></section>
  <section className="saver-section saver-updates" id="actualizaciones"><div className="container">
    <div className="saver-section-head"><div><span className="eyebrow">CRONOLOGÍA VERIFICABLE</span><h2>Qué informó el Banco Central.</h2></div><p>Estas son las comunicaciones que fundamentan la guía. No publicamos rumores ni afirmaciones de terceros como instrucciones.</p></div>
    <div className="saver-updates-grid">{sources.map(source=><article key={source.date} className="saver-update-card"><span className="saver-update-date"><Clock3 size={14}/>{source.date}</span><h3>{source.title}</h3><p>{source.body}</p><a href={source.url} target="_blank" rel="noopener noreferrer nofollow">Ver comunicado oficial <ArrowUpRight size={16}/></a></article>)}</div>
    <div className="saver-primary-notice"><CircleAlert size={22}/><div><strong>Primera etapa ≠ garantía máxima.</strong><p>Según el comunicado del 5/11, el primer grupo incluye depósitos de hasta ₲ 10.000.000, sin deudas con la entidad y con cuenta habilitada en otra entidad del país. El BCP también informó un límite general de garantía de hasta ₲ 228.300.000 por depositante y entidad, sujeto a la ley. CobráFirme no determina elegibilidad individual.</p><a href={officialSaver.firstGroup} target="_blank" rel="noopener noreferrer nofollow">Leer condiciones exactas en el BCP <ArrowUpRight size={16}/></a></div></div>
  </div></section>
  <section className="saver-section saver-safety" id="seguridad"><div className="container saver-safety-layout">
    <div><span className="eyebrow">PREVENCIÓN DE ESTAFAS</span><h2>Tu información bancaria nunca es requisito para usar esta guía.</h2><p>Desconfiá de mensajes que pidan transferencias, comisiones, contraseñas, PIN, OTP o la instalación de una aplicación enviada por una persona desconocida.</p><a className="btn btn-primary" href={officialSaver.portal} target="_blank" rel="noopener noreferrer nofollow">Ver advertencias oficiales <ArrowUpRight size={17}/></a></div>
    <div className="saver-safety-card"><MessageCircleWarning size={28}/><h3>Si recibiste un mensaje sospechoso</h3><ol><li>No abras enlaces adjuntos ni compartas códigos.</li><li>No pagues a intermediarios que prometan liberar ahorros.</li><li>Escribí la dirección del BCP directamente en tu navegador.</li><li>Verificá con tu entidad financiera por sus canales propios.</li></ol><small>No envíes capturas, cédulas o conversaciones a CobráFirme.</small></div>
  </div></section>
  <section className="saver-section saver-research"><div className="container saver-research-grid"><SaverSurvey/><aside className="saver-research-side"><Users size={29}/><h2>Observatorio de dificultades</h2><p>Queremos comprender qué obstáculos encuentran los usuarios. Solo publicaremos cifras agregadas cuando tengamos respuestas suficientes, control de calidad y revisión de privacidad.</p><Link className="btn btn-outline" href="/observatorio/">Ver metodología y estado <ArrowUpRight size={16}/></Link></aside></div></section>
  <section className="saver-section saver-faq"><div className="container"><div className="saver-section-head"><div><span className="eyebrow">PREGUNTAS IMPORTANTES</span><h2>Sin confundir etapas con garantías.</h2></div></div>
   <div className="saver-faq-list">
    <details><summary>¿CobráFirme puede decirme si me corresponde cobrar?</summary><p>No. No tenemos acceso a información individual. La consulta de entidad asignada y las instrucciones se realizan exclusivamente por el BCP.</p></details>
    <details><summary>¿Todos los depositantes recibirán ₲ 10 millones ahora?</summary><p>No. El comunicado del 5 de noviembre establece un primer grupo sujeto a condiciones concurrentes. Las próximas etapas serán informadas oficialmente por el BCP.</p></details>
    <details><summary>¿Cuál es la diferencia entre primer pago y Fondo de Garantía?</summary><p>El primer grupo o anticipo se refiere a etapas operativas. El límite general informado por el BCP es de hasta 75 salarios mínimos, ₲ 228.300.000 a esa fecha, por depositante y entidad según la legislación. No se garantiza un monto individual desde esta web.</p></details>
    <details><summary>¿Hay que dejar una cédula o número de cuenta en CobráFirme?</summary><p>No. Jamás solicitamos datos de identificación o bancarios para el orientador. Para consultas personales, utilizá exclusivamente el BCP y tu entidad financiera.</p></details>
    <details><summary>¿La encuesta determina cuántos paraguayos tuvieron problemas?</summary><p>No. Es una muestra voluntaria de quienes visitan esta página y aceptan participar; no es representativa de todos los ahorristas. Los resultados se revisan antes de publicarse.</p></details>
   </div>
  </div></section>
 </main><footer className="mini-footer"><div className="container"><span>CobráFirme · Servicio independiente operado desde Argentina. Información general revisada el 06/11/2026; verificá siempre el BCP.</span><Link href="/privacidad/">Privacidad</Link><Link href="/observatorio/">Observatorio</Link><Link href="/">Comercios</Link></div></footer></>;
}
