import { ArrowRight, Check, LockKeyhole } from 'lucide-react';
import { checkoutLink } from '@/lib/config';

const basic = ['Guía práctica paso a paso', 'Checklist de transición de cobros', 'Mensajes editables para clientes', 'Planilla básica de control de pagos', 'Precauciones contra errores y estafas'];
const pro = ['Todo lo incluido en el Kit CobráFirme', 'Planificador de transición ampliado', 'Planilla de conciliación multicanal', 'Checklist para QR, POS y links', 'Más modelos de comunicación'];

export function PricingCards() {
  const cards = [
    {tier:'basic' as const, name:'Kit CobráFirme', price:'9,99', summary:'Organizá el cambio por tu cuenta, sin empezar desde cero.', features:basic, highlight:false},
    {tier:'pro' as const, name:'Kit CobráFirme Pro', price:'14,99', summary:'Más herramientas para negocios con varios medios de cobro.', features:pro, highlight:true},
  ];
  return <div className="pricing-grid">
    {cards.map(card => { const checkout = checkoutLink(card.tier); return <article className={`pricing-card ${card.highlight ? 'pricing-featured' : ''}`} key={card.tier}>
      <div className="pricing-top"><span className="pricing-type">PRODUCTO DIGITAL · AUTOSERVICIO</span>{card.highlight && <span className="pricing-tag">MÁS COMPLETO</span>}</div>
      <h3>{card.name}</h3><p className="pricing-summary">{card.summary}</p>
      <div className="price"><span>US$</span><strong>{card.price}</strong><span>pago único</span></div>
      <div className="pricing-divider"/><p className="pricing-includes">Lo que incluye:</p>
      <ul>{card.features.map(feature => <li key={feature}><Check size={17}/><span>{feature}</span></li>)}</ul>
      {checkout ? <a className={`btn ${card.highlight ? 'btn-primary' : 'btn-secondary'} pricing-button`} href={checkout} target="_blank" rel="noopener noreferrer">Ir al checkout seguro <ArrowRight size={18}/></a>
        : <div className="pricing-locked"><LockKeyhole size={17}/><span>Compra pendiente de habilitación y prueba</span></div>}
      <small>No incluye apertura de cuentas ni gestión de fondos. Disponibilidad y tratamiento tributario sujetos a confirmación.</small>
    </article>; })}
  </div>;
}
