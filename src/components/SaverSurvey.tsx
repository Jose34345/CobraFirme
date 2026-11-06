'use client';
import {useEffect,useState,type FormEvent} from 'react';
import Link from 'next/link';
import {ShieldCheck,Send,Info} from 'lucide-react';
import {analyticsAllowed,analyticsConfigured,loadAnalytics,trackSaverSurvey} from '@/lib/analytics';
import {type SaverProblem,type PortalAccess,type SuspiciousMessage,isValidSaverSurvey} from '@/lib/ahorristas';
const key='cobrafirme-saver-survey-completed-v1';
export function SaverSurvey(){
 const [problem,setProblem]=useState<SaverProblem|' '>(' ');
 const [portal,setPortal]=useState<PortalAccess|' '>(' ');
 const [suspicious,setSuspicious]=useState<SuspiciousMessage|' '>(' ');
 const [consent,setConsent]=useState(false);
 const [alreadySent,setAlreadySent]=useState(false);
 const [status,setStatus]=useState<'idle'|'need-consent'|'missing-config'|'success'|'error'>('idle');
 useEffect(()=>{try{setAlreadySent(window.localStorage.getItem(key)==='1')}catch{}},[]);
 function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(alreadySent)return;
  const value={problem,portal,suspicious};
  if(!consent||!isValidSaverSurvey(value)){setStatus('error');return}
  if(!analyticsConfigured()){setStatus('missing-config');return}
  if(!analyticsAllowed()){setStatus('need-consent');return}
  loadAnalytics();
  if(!trackSaverSurvey(value)){setStatus('error');return}
  try{window.localStorage.setItem(key,'1')}catch{}
  setAlreadySent(true);setStatus('success');
 }
 return <section id="encuesta" className="saver-survey" aria-labelledby="saver-survey-heading">
   <div className="saver-survey-heading"><span className="eyebrow">ENCUESTA VOLUNTARIA · SIN REGISTRO</span><h2 id="saver-survey-heading">Contanos qué está siendo más difícil.</h2><p>Tres preguntas cerradas, sin nombre, cédula, saldo, banco, correo ni teléfono. Los resultados individuales no son públicos. Esta encuesta no sirve para tramitar pagos.</p></div>
   {alreadySent?<div className="saver-survey-message" role="status"><ShieldCheck size={23}/>Gracias. Se registró el envío desde este navegador. Es una respuesta voluntaria, no una estadística representativa.</div>:
   <form onSubmit={submit} className="saver-survey-fields">
    <label>1. ¿Cuál es tu principal dificultad?
     <select value={problem} onChange={e=>setProblem(e.target.value as SaverProblem)} required>
      <option value=" ">Elegí una opción</option><option value="consulta">Acceder a la consulta oficial</option><option value="informacion">Entender las comunicaciones</option><option value="demora">Dudas sobre etapas o plazos</option><option value="seguridad">Reconocer mensajes sospechosos</option><option value="otra">Otra dificultad</option>
     </select></label>
    <label>2. ¿Pudiste consultar el portal oficial?
     <select value={portal} onChange={e=>setPortal(e.target.value as PortalAccess)} required>
      <option value=" ">Elegí una opción</option><option value="si">Sí</option><option value="no">No pude acceder</option><option value="no_intente">Todavía no lo intenté</option>
     </select></label>
    <label>3. ¿Recibiste mensajes que te parecieron sospechosos?
     <select value={suspicious} onChange={e=>setSuspicious(e.target.value as SuspiciousMessage)} required>
      <option value=" ">Elegí una opción</option><option value="si">Sí</option><option value="no">No</option><option value="prefiero_no_responder">Prefiero no responder</option>
     </select></label>
    <label className="saver-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>Acepto enviar estas tres respuestas de forma voluntaria para generar estadísticas agregadas de problemas. Serán procesadas por PostHog en infraestructura externa. Entiendo que no son datos oficiales ni se usarán para decidir sobre pagos. Leí la <Link href="/privacidad/">política de privacidad</Link>.</span></label>
    {status==='need-consent'&&<p className="saver-survey-error" role="alert">Para enviar esta encuesta tenés que permitir la medición opcional desde «Preferencias de medición» en el pie de página. Podés seguir usando toda la guía sin participar.</p>}
    {status==='missing-config'&&<p className="saver-survey-error" role="alert">La recepción de respuestas no está disponible por ahora. La guía gratuita funciona normalmente.</p>}
    {status==='error'&&<p className="saver-survey-error" role="alert">Completá las tres opciones y aceptá el envío antes de continuar.</p>}
    <button type="submit" className="btn btn-primary"><Send size={17}/> Enviar respuestas voluntariamente</button>
    <small className="saver-survey-foot"><Info size={15}/> Se limita un envío por navegador; esto no evita todos los duplicados. No publicamos porcentajes sin revisión editorial y muestra suficiente.</small>
   </form>}
 </section>
}
