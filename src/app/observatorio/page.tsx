import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft, ArrowUpRight, BarChart3, EyeOff, ShieldCheck} from 'lucide-react';
import {SiteHeader} from '@/components/SiteHeader';
import data from '@/data/observatorio.json';
import {canPublishObservatory,officialSaver,type ObservatorySummary} from '@/lib/ahorristas';
export const metadata:Metadata={
 title:'Observatorio de ahorristas — metodología y estado de datos',
 description:'Estado y metodología de una encuesta voluntaria de CobráFirme. No representa a todos los ahorristas paraguayos; no divulga respuestas individuales.',
 alternates:{canonical:'/observatorio/'}
};
const labels:Record<string,string>={
 consulta:'Dificultades de consulta al portal',informacion:'Dudas sobre comunicados',
 demora:'Dudas sobre etapas o plazos',seguridad:'Mensajes sospechosos',otra:'Otras dificultades'
};
export default function ObservatoryPage(){
 const snapshot=data as ObservatorySummary;
 const publish=canPublishObservatory(snapshot);
 return <><SiteHeader/><main className="saver-page observatory-page"><div className="container">
  <Link href="/ahorristas/" className="back-link"><ArrowLeft size={16}/> Volver a la guía para ahorristas</Link>
  <header className="observatory-hero"><span className="eyebrow">ESTADÍSTICAS CON METODOLOGÍA</span><h1>Observatorio <em>CobráFirme.</em></h1><p>Seguimos las dificultades declaradas voluntariamente por personas que consultan nuestras herramientas. No tenemos acceso a cuentas bancarias, registros oficiales de depósitos ni identidades de ahorristas.</p></header>
  {publish?<section className="observatory-report" aria-label="Resultados revisados">
    <div className="observatory-report-heading"><BarChart3 size={24}/><div><h2>Resultados agregados revisados</h2><p>Respuestas válidas revisadas: {snapshot.sample_size}. Fecha de revisión: {snapshot.reviewed_at}.</p></div></div>
    <div className="observatory-bars">{Object.entries(snapshot.problems).filter(([,value])=>Number(value)>=30).map(([name,value])=><div key={name} className="observatory-bar"><div><strong>{labels[name]||'Otra categoría'}</strong><span>{(100*(value||0)/snapshot.sample_size).toFixed(1)} %</span></div><progress value={value} max={snapshot.sample_size}>{value}</progress></div>)}</div>
    <p className="observatory-warning">Encuesta voluntaria, muestra no probabilística, con posibles sesgos de selección y respuestas duplicadas. Los resultados no pueden extrapolarse a la población de ahorristas de Paraguay.</p>
   </section>:<section className="observatory-empty"><EyeOff size={31}/><h2>Todavía no publicamos porcentajes.</h2><p>No hay una muestra suficiente de respuestas revisadas que justifique mostrar resultados. Preferimos no presentar cifras que puedan generar interpretaciones engañosas.</p><Link className="btn btn-primary" href="/ahorristas/#encuesta">Participar voluntariamente <ArrowUpRight size={16}/></Link></section>}
  <section className="observatory-method"><div><ShieldCheck size={26}/><h2>Cómo calculamos los indicadores</h2><p>Las respuestas son voluntarias, categóricas y sin campo de texto libre. No pedimos saldos, entidades financieras, cuentas, nombres ni cédulas. La encuesta está separada del diagnóstico para comercios y no produce decisiones financieras.</p></div>
  <ol><li><strong>Ingreso opcional:</strong> el visitante acepta expresamente enviar sus tres respuestas y habilita la medición antes de transmitirlas.</li><li><strong>Validación:</strong> solo consideramos opciones predeterminadas, excluimos pruebas internas y analizamos duplicaciones y abuso antes de publicar.</li><li><strong>Umbral mínimo:</strong> no publicamos resultados con menos de 30 respuestas revisadas; se suprimen categorías pequeñas y combinaciones reidentificables.</li><li><strong>Interpretación:</strong> no existe muestreo probabilístico ni verificación bancaria. Los porcentajes representan exclusivamente respuestas válidas recibidas por el sitio.</li><li><strong>Publicación controlada:</strong> el panel se actualiza mediante revisión editorial, no automáticamente con cada envío. Ninguna respuesta individual se expone en esta web.</li></ol>
  <p className="observatory-warning">Base de referencia oficial: <a href={officialSaver.portal} target="_blank" rel="noopener noreferrer nofollow">Banco Central del Paraguay <ArrowUpRight size={14}/></a>. Los datos proporcionados en la encuesta no son datos oficiales.</p>
  </section>
 </div></main><footer className="mini-footer"><div className="container"><span>CobráFirme · Observatorio no oficial, operado desde Argentina.</span><Link href="/privacidad/">Privacidad</Link><Link href="/ahorristas/">Ahorristas</Link></div></footer></>;
}
