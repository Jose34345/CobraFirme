'use client';

import { useState } from 'react';
import { ArrowRight, ClipboardCheck, Copy, CreditCard, FileCheck2, ListChecks, Megaphone, QrCode, RefreshCw, ShieldAlert, Wallet } from 'lucide-react';
import { getIssue, issues, planAsText, type IssueId } from '@/lib/diagnostico';

const icons = [Wallet, QrCode, CreditCard, Megaphone, ListChecks];

export function Diagnosis() {
  const [selected, setSelected] = useState<IssueId | null>(null);
  const [copied, setCopied] = useState(false);
  const issue = selected ? getIssue(selected) : undefined;
  async function copyPlan() {
    if (!issue) return;
    try { await navigator.clipboard.writeText(planAsText(issue)); setCopied(true); }
    catch { setCopied(false); }
  }

  return <div className="diagnosis-shell">
    <div className="diagnosis-head">
      <span className="step-label"><span className="step-dot"/> DIAGNÓSTICO GRATUITO · SIN REGISTRO</span>
      <h3>¿Qué necesitás resolver?</h3>
      <p>Elegí la situación que mejor describa tu negocio. Vas a recibir pasos concretos y precauciones para avanzar.</p>
    </div>
    <div className="issue-grid" role="group" aria-label="Elegí tu problema de cobro">
      {issues.map((item, i) => {
        const Icon = icons[i];
        return <button type="button" key={item.id} onClick={() => { setSelected(item.id); setCopied(false); }} aria-pressed={selected === item.id} className={`issue-option ${selected === item.id ? 'issue-selected' : ''}`}>
          <span className="issue-icon"><Icon size={21} strokeWidth={1.8} aria-hidden="true"/></span>
          <span>{item.title}</span>
          <ArrowRight size={17} className="issue-arrow" aria-hidden="true"/>
        </button>;
      })}
    </div>
    {issue ? <div className="diagnosis-result" aria-live="polite">
      <div className="result-heading">
        <span className="result-symbol"><ClipboardCheck size={21}/></span>
        <div><span className="result-overline">TU PLAN DE ACCIÓN</span><h4>{issue.title}</h4><p>{issue.description}</p></div>
      </div>
      <div className="result-grid">
        <ResultSection title="Lo que podés revisar" items={issue.canDo} tone="positive" icon={<FileCheck2 size={18}/>}/>
        <ResultSection title="Confirmá con tu proveedor" items={issue.confirm} tone="neutral" icon={<RefreshCw size={18}/>}/>
        <ResultSection title="Tené preparado" items={issue.prepare} tone="neutral" icon={<ListChecks size={18}/>}/>
        <ResultSection title="Evitá estos riesgos" items={issue.avoid} tone="warning" icon={<ShieldAlert size={18}/>}/>
      </div>
      <div className="result-foot">
        <span>Orientación general: no sustituye las indicaciones oficiales de tu entidad.</span>
        <button className="btn btn-primary btn-small" type="button" onClick={copyPlan}><Copy size={16}/>{copied ? 'Plan copiado' : 'Copiar mi plan'}</button>
      </div>
      <p className="result-assist">¿Te falta ayuda para implementar los cambios? <a href="#contacto">Consultá por asistencia</a>.</p>
    </div> : <div className="diagnosis-empty"><span><ShieldAlert size={16} aria-hidden="true"/> Nunca te pedimos claves bancarias, PIN ni códigos de verificación.</span><span>Elegí una opción para ver tu plan <ArrowRight size={15}/></span></div>}
  </div>;
}

function ResultSection({title, items, tone, icon}: { title: string; items: string[]; tone: string; icon: React.ReactNode }) {
  return <section className={`result-section result-${tone}`}><h5>{icon}{title}</h5><ol>{items.map((item, i) => <li key={i}>{item}</li>)}</ol></section>;
}
