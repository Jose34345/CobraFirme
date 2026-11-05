'use client';
import { useState } from 'react';
import { trackEvent, analyticsAllowed, analyticsConfigured } from '@/lib/analytics';
import { ArrowRight, Check, LockKeyhole, ShieldCheck } from 'lucide-react';
import { checkoutLink } from '@/lib/config';
import { TrackLink } from '@/components/TrackLink';
const included = [
  'Plan de continuidad comercial ordenado por prioridades',
  'Matriz para comparar medios de cobro y sus requisitos',
  'Planillas de conciliación, pendientes y seguimiento de acreditaciones',
  'Mensajes editables para WhatsApp, redes y atención al cliente',
  'Checklist de cambios en QR, enlaces, cartelería y facturación',
  'Protocolo antifraude y fuentes oficiales que debés consultar',
];
export function PricingCards() {
  const checkout = checkoutLink('pro');
  const [interested, setInterested] = useState(false);
  const [canMeasure, setCanMeasure] = useState(false);
  function expressInterest() { if (!analyticsConfigured() || !analyticsAllowed()) { setCanMeasure(false); setInterested(true); return; } trackEvent('premium_interest'); setCanMeasure(true); setInterested(true); }
  return <div className="pricing-grid"><article className="pricing-card pricing-featured">
    <div className="pricing-top"><span className="pricing-type">PRODUCTO DIGITAL · PAGO ÚNICO</span><span className="pricing-tag">KIT INTEGRAL</span></div>
    <h3>Kit Integral CobráFirme</h3>
    <p className="pricing-summary">Para comercios que quieren ejecutar el cambio con herramientas editables, no quedarse leyendo indicaciones generales.</p>
    <div className="price"><span>US$</span><strong>14,99</strong><span>pago único</span></div>
    <div className="pricing-divider"/><p className="pricing-includes">Incluye:</p>
    <ul>{included.map(item=><li key={item}><Check size={17}/><span>{item}</span></li>)}</ul>
    {checkout ? <TrackLink className="btn btn-primary pricing-button" href={checkout} target="_blank" rel="noopener noreferrer" event="premium_checkout_click">Continuar al pago seguro <ArrowRight size={18}/></TrackLink> :
      <div className="pricing-locked"><LockKeyhole size={17}/><span>Compra todavía no habilitada. Primero validamos el pago desde Paraguay y la entrega.</span></div>}
    {!checkout && <div className="premium-interest"><button className="btn btn-secondary btn-small" type="button" onClick={expressInterest}>Me interesaría comprarlo</button>{interested && <p>{canMeasure ? "Interés anotado anónimamente, sin reserva ni cobro." : "Todavía no tomamos reservas. Podés volver cuando la compra esté habilitada; no registramos tu interés sin permiso de medición."}</p>}</div>}
    <small><ShieldCheck size={14} style={{display:'inline',verticalAlign:'middle',marginRight:5}}/>Las instrucciones bancarias públicas siguen siendo gratuitas. No incluye apertura de cuentas, gestión de fondos ni asesoría financiera individual.</small>
  </article></div>;
}
