'use client';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { saverTopics, type SaverTopic } from '@/lib/ahorristas';
import { trackEvent } from '@/lib/analytics';

export function SaverOrientation(){
 const [selected,setSelected]=useState<SaverTopic|null>(null);
 const current=saverTopics.find(item=>item.id===selected);
 return <div className="saver-tool" id="orientador">
  <div className="saver-tool-title"><span className="eyebrow">ORIENTACIÓN GRATUITA</span><h2>¿Qué necesitás resolver hoy?</h2><p>Elegí una situación general. No te preguntamos quién sos, cuánto dinero tenés ni dónde guardás tus ahorros.</p></div>
  <div className="saver-choices" role="group" aria-label="Elegí el motivo de consulta">
   {saverTopics.map((item,index)=><button type="button" key={item.id} className={'saver-choice'+(selected===item.id?' is-selected':'')} aria-pressed={selected===item.id} onClick={()=>{setSelected(item.id);trackEvent('saver_orientation_selected',item.id)}}><span className="saver-choice-number">{String(index+1).padStart(2,'0')}</span><span>{item.title}</span><span aria-hidden="true">›</span></button>)}
  </div>
  {current?<div className="saver-answer" role="status" aria-live="polite">
   <div className="saver-answer-heading"><CheckCircle2 size={23}/><div><span>ORIENTACIÓN SEGÚN TU ELECCIÓN</span><h3>{current.summary}</h3></div></div>
   <ol>{current.steps.map(step=><li key={step}>{step}</li>)}</ol>
   <p className="saver-answer-caution"><ShieldAlert size={18}/>{current.notice}</p>
   <a className="btn btn-primary" href={current.link} target="_blank" rel="noopener noreferrer nofollow">Abrir fuente oficial del BCP <ArrowUpRight size={17}/></a><small>{current.source}. Verificá que el enlace corresponda a bcp.gov.py.</small>
  </div>:<p className="saver-tool-hint">Tu orientación aparecerá aquí después de elegir una opción.</p>}
 </div>
}
