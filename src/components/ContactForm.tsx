'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { site, whatsappLink } from '@/lib/config';

const formReady = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(site.formspree);

export function ContactForm() {
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [error, setError] = useState('');
  const whatsapp = whatsappLink('Hola, vi CobráFirme y necesito ayuda para reorganizar los cobros de mi negocio.');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formReady || state === 'sending') return;
    const form = event.currentTarget;
    const payload = new FormData(form);
    if (payload.get('_gotcha')) return;
    if (!payload.get('consentimiento')) { setError('Necesitás aceptar la política de privacidad para enviar la consulta.'); return; }
    if (!String(payload.get('correo') ?? '').trim() && !String(payload.get('telefono') ?? '').trim()) { setError('Ingresá un correo o teléfono para poder responderte.'); return; }
    setError(''); setState('sending');
    try {
      const res = await fetch(site.formspree, { method: 'POST', body: payload, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Formulario: ${res.status}`);
      form.reset(); setState('sent');
    } catch { setError('No pudimos enviar la consulta. Probá nuevamente o usá otro canal de contacto.'); setState('error'); }
  }

  return <div className="contact-card">
    <div className="contact-intro"><span className="eyebrow">ASISTENCIA PERSONALIZADA</span><h3>¿Querés que te ayudemos con tu caso?</h3><p>Contanos qué necesitás resolver. Te confirmaremos si podemos ayudarte, el alcance y el precio antes de comenzar. No manejamos tu dinero.</p>
    <div className="contact-trust"><span>✓ Sin contraseñas ni OTP</span><span>✓ Sin acceso a tus cuentas</span><span>✓ Sin compromiso de compra</span></div>
    {whatsapp ? <a className="btn btn-secondary" href={whatsapp} target="_blank" rel="noopener noreferrer">Hablar por WhatsApp <ExternalLink size={17}/></a> : site.supportEmail ? <a className="btn btn-secondary" href={`mailto:${site.supportEmail}?subject=Consulta%20CobráFirme`}><Mail size={17}/>Escribir por correo</a> : <p className="contact-unavailable">El canal de atención directa todavía no está habilitado. Usá mientras tanto el diagnóstico gratuito.</p>}
    </div>
    <div className="contact-form-wrap">
      {formReady ? <form onSubmit={submit} className="contact-form" noValidate={false}>
        <h4>Dejanos tu consulta</h4>
        <div className="form-grid"><label>Nombre o negocio <input name="nombre" maxLength={100} required placeholder="¿Cómo te llamás?"/></label><label>Ciudad <input name="ciudad" maxLength={80} placeholder="Ej. Encarnación"/></label></div>
        <div className="form-grid"><label>Correo electrónico <input name="correo" type="email" maxLength={150} placeholder="tu@correo.com"/></label><label>WhatsApp <input name="telefono" type="tel" maxLength={28} placeholder="+595 ..."/></label></div>
        <label>¿Qué necesitás resolver? <select name="problema" defaultValue="" required><option value="" disabled>Seleccioná una opción</option><option>Transferencias</option><option>Código QR</option><option>Nuevo medio de cobro</option><option>Avisar a clientes</option><option>Conciliación</option><option>Otro problema comercial</option></select></label>
        <label>Comentario (opcional) <textarea name="comentario" rows={3} maxLength={500} placeholder="Contanos brevemente, sin datos bancarios sensibles."/></label>
        <label className="honeypot" aria-hidden="true">No completar <input name="_gotcha" tabIndex={-1} autoComplete="off"/></label>
        <label className="checkbox-line"><input type="checkbox" name="consentimiento" value="acepto" required/> Acepto que me contacten para responder esta consulta y leí la <a href="/privacidad/">política de privacidad</a>.</label>
        {error && <p role="alert" className="form-error">{error}</p>}
        {state === 'sent' && <p role="status" className="form-success">Tu consulta fue enviada al proveedor del formulario. Te responderemos por los datos que indicaste.</p>}
        <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Enviando…' : 'Enviar consulta'}<ArrowRight size={17}/></button>
      </form> : <div className="contact-placeholder"><Mail size={27}/><h4>Consultas por formulario</h4><p>La recepción automática de consultas está pendiente de configuración. No te vamos a pedir datos que aún no podemos recibir de forma segura.</p><a href="#diagnostico">Usar el diagnóstico gratis <ArrowRight size={16}/></a></div>}
    </div>
  </div>;
}
