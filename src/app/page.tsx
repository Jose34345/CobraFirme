import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Check, CheckCheck, ChevronDown, CircleHelp, ClipboardList, Clock3, ExternalLink, FileCheck2, Landmark, LockKeyhole, MessageCircle, QrCode, RefreshCw, ShieldCheck, Wallet } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { SiteHeader } from '@/components/SiteHeader';
import { Diagnosis } from '@/components/Diagnosis';
import { CopyMessage } from '@/components/CopyMessage';
import { PricingCards } from '@/components/PricingCards';
import { ContactForm } from '@/components/ContactForm';
import { AnalyticsSettingsButton } from '@/components/AnalyticsConsent';
import { TrackLink } from '@/components/TrackLink';
import { official, site } from '@/lib/config';

const faqs = [
  { q:'¿CobráFirme pertenece a Ueno o a otro banco?', a:'No. Somos un servicio independiente de orientación y organización comercial. No representamos a ninguna entidad financiera, procesadora ni organismo público.' },
  { q:'¿El diagnóstico gratuito realmente es gratis?', a:'Sí. Podés consultar los cinco problemas y copiar tu plan sin abrir una cuenta, dejar datos personales ni pagar.' },
  { q:'¿Pueden abrir una cuenta o activar un QR por mí?', a:'No gestionamos el alta bancaria en tu nombre ni ingresamos a tus cuentas. Podríamos orientarte sobre los pasos administrativos, pero la entidad y la activación siempre dependen del proveedor y de vos.' },
  { q:'¿Van a pedirme contraseñas o códigos?', a:'Nunca. No solicitamos PIN, OTP, tokens bancarios, CVV ni acceso remoto a tus cuentas.' },
  { q:'¿Qué incluye el Kit Integral?', a:'Una guía de continuidad comercial, matrices de decisión, mensajes de comunicación, planillas para conciliación y un procedimiento de revisión, preparados para adaptarse a tu negocio. No incluye trámites bancarios ni soporte humano ilimitado.' },
  { q:'¿Ya puedo comprar desde Paraguay?', a:'La venta todavía no está habilitada: debemos comprobar el medio de pago transfronterizo, la entrega del producto y las obligaciones fiscales. Hasta entonces la guía gratuita seguirá disponible.' },
  { q:'¿Cuánto tarda en funcionar un medio nuevo?', a:'Depende de cada banco o procesadora. No podemos garantizar plazos de aprobación o activación.' },
  { q:'¿Cómo funcionan los reembolsos?', a:'La política aplicable se comunicará antes de cualquier venta. Actualmente no procesamos compras desde esta web. Podés consultar el borrador de política en el pie de página.' },
];

const checklistHref = process.env.GITHUB_PAGES === 'true' ? '/CobraFirme/recursos/checklist-cobros.csv' : '/recursos/checklist-cobros.csv';

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true"/>
        <div className="container hero-inner">
          <div className="hero-copy">
            <a className="news-pill" href={official.resolution} target="_blank" rel="noopener noreferrer"><span className="live-dot"/> ACTUALIZACIÓN PARAGUAY · 05 NOV 2026 <ArrowUpRight size={15}/></a>
            <h1 id="hero-title">Que cambiar tu forma de cobrar <em>no frene tu negocio.</em></h1>
            <p>¿Tenés problemas con transferencias, QR o una cuenta de cobro? Identificá qué revisar, cómo organizar tus alternativas y cómo avisar a tus clientes. <strong>Empezá gratis y sin registrarte.</strong></p>
            <div className="hero-buttons"><a className="btn btn-primary" href="#diagnostico">Resolver mi problema <ArrowRight size={19}/></a><Link className="btn btn-outline" href="/migracion-ueno/">¿Cobrabas por Ueno? <ArrowUpRight size={17}/></Link></div>
            <div className="hero-assurances"><span><ShieldCheck size={17}/> Sin claves ni contraseñas</span><span><CheckCheck size={17}/> Información sin registro</span></div>
          </div>
          <div className="hero-visual" aria-label="Ejemplo del proceso de organización de cobros">
            <div className="hero-card">
              <div className="hero-card-header"><div><span className="demo-label">TU CIRCUITO DE COBROS</span><h2>Todo más claro, paso a paso.</h2></div><span className="hero-card-badge"><Check size={18}/></span></div>
              <div className="flow-list"><div className="flow-item"><span className="flow-number">01</span><span className="flow-symbol"><ClipboardList size={20}/></span><div><strong>Detectá el problema</strong><small>Transferencias, QR o cobros pendientes</small></div><span className="flow-tag">Identificá</span></div><div className="flow-connector"/><div className="flow-item"><span className="flow-number">02</span><span className="flow-symbol"><RefreshCw size={20}/></span><div><strong>Prepará una alternativa</strong><small>Con tu banco o procesadora elegida</small></div><span className="flow-tag">Verificá</span></div><div className="flow-connector"/><div className="flow-item"><span className="flow-number">03</span><span className="flow-symbol"><CheckCheck size={20}/></span><div><strong>Ordená los próximos cobros</strong><small>Avisos y control de pagos</small></div><span className="flow-tag flow-tag-green">Controlá</span></div></div>
              <div className="hero-card-bottom"><ShieldCheck size={17}/><span>La cuenta y el dinero siempre quedan bajo tu control.</span></div>
            </div>
            <div className="hero-floating"><span className="floating-icon"><LockKeyhole size={18}/></span><div><strong>Tu información, bajo tu control</strong><small>No accedemos a tus cuentas.</small></div></div>
          </div>
        </div>
      </section>

      <section className="trusted-strip" aria-label="En qué podemos ayudarte"><div className="container strip-inner"><span>PARA NEGOCIOS QUE COBRAN CON</span><div><Wallet size={19}/> Transferencias</div><div><QrCode size={19}/> QR</div><div><MessageCircle size={19}/> WhatsApp</div><div><FileCheck2 size={19}/> Control de pagos</div></div></section>

      <section className="saver-entry-section" aria-label="Información para ahorristas"><div className="container saver-entry"><div><span className="eyebrow">TAMBIÉN PARA AHORRISTAS</span><h2>¿Tenías ahorros en Ueno?</h2><p>Consultá las etapas del Fondo de Garantía, el portal oficial del BCP y recomendaciones para evitar fraudes. Gratis, sin cédula ni registro.</p></div><Link className="btn btn-primary" href="/ahorristas/">Ver guía para ahorristas <ArrowRight size={17}/></Link></div></section>
      <section id="diagnostico" className="section diagnostic-section"><div className="container"><div className="section-heading center"><span className="eyebrow">EMPEZÁ POR ACÁ</span><h2>Primero entendé el problema.<br/><span>Después, resolvelo.</span></h2><p>No necesitás descargar una app ni hablar con nadie. Elegí tu situación y recibí una guía práctica.</p></div><Diagnosis/></div></section>

      <section id="como-funciona" className="section how-section"><div className="container"><div className="section-heading center"><span className="eyebrow">SIMPLE, SIN VUELTAS</span><h2>Tres pasos para recuperar el orden.</h2><p>Una ruta práctica para que sigas atendiendo a tus clientes mientras resolvés lo que está pendiente.</p></div><div className="how-grid"><div className="how-card"><span className="how-number">01</span><div className="how-icon"><CircleHelp size={25}/></div><h3>Identificá qué falla</h3><p>Detectá si el problema es una transferencia, QR, datos desactualizados o pagos pendientes.</p></div><div className="how-card"><span className="how-number">02</span><div className="how-icon"><Landmark size={25}/></div><h3>Validá tu alternativa</h3><p>Consultá condiciones y activación con el banco o procesadora que vos elijas.</p></div><div className="how-card"><span className="how-number">03</span><div className="how-icon"><CheckCheck size={25}/></div><h3>Actualizá y controlá</h3><p>Avisá nuevos datos por canales habituales y comprobá que los pagos se acrediten.</p></div></div></div></section>

      <section className="section ueno-banner-section"><div className="container"><div className="ueno-banner"><div className="ueno-banner-content"><span className="light-label"><span className="light-pulse"/> INFORMACIÓN OFICIAL · 05 NOV 2026</span><h2>¿Tu comercio cobraba mediante Ueno?</h2><p>El Banco Central del Paraguay inició un procedimiento de resolución de Ueno Bank. Preparamos una guía independiente para organizar tus medios de cobro y verificar las indicaciones oficiales.</p><Link className="btn btn-white" href="/migracion-ueno/">Ver guía para comercios <ArrowRight size={18}/></Link></div><div className="ueno-banner-art" aria-hidden="true"><div className="art-ring ring-a"/><div className="art-ring ring-b"/><div className="art-main"><Landmark size={47} strokeWidth={1.2}/><span>Información verificada</span><Check size={21}/></div></div></div></div></section>

      <section className="section resources-section" id="recursos"><div className="container resources-layout"><div className="resources-copy"><span className="eyebrow">HERRAMIENTAS GRATUITAS</span><h2>Un cambio en tus cobros no debería confundirte.</h2><p>Usá este mensaje editable para avisar a tus clientes cuando tengas un medio alternativo confirmado. Evitá cambios apresurados y datos sin verificar.</p><div className="resources-points"><div><Check size={18}/> Usá únicamente datos bancarios confirmados.</div><div><Check size={18}/> Publicá el aviso en tus canales habituales.</div><div><Check size={18}/> Guardá el control de lo que realmente cobraste.</div></div><TrackLink className="resource-download" href={checklistHref} download event="checklist_download">Descargar checklist gratuito (CSV) <ArrowUpRight size={17}/></TrackLink></div><CopyMessage/></div></section>

      <section id="kits" className="section pricing-section"><div className="container"><div className="section-heading center"><span className="eyebrow">UNA ÚNICA OPCIÓN COMPLETA</span><h2>Un kit completo para pasar de la información a la acción.</h2><p>Una sola solución integral: documentos, plantillas y herramientas para ejecutar un plan y comprobar tus cobros. La compra se habilitará solo después de validar pago y entrega.</p></div><PricingCards/><div className="premium-value-strip"><span><ShieldCheck size={16}/> Incluye herramientas editables</span><span><CheckCheck size={16}/> No requiere entregar claves bancarias</span></div><p className="pricing-note"><ShieldCheck size={18}/> El diagnóstico y los recursos gratuitos seguirán disponibles sin comprar nada.</p></div></section>

      <section id="contacto" className="section contact-section"><div className="container"><ContactForm/></div></section>

      <section id="preguntas" className="section faq-section"><div className="container faq-layout"><div className="faq-copy"><span className="eyebrow">PREGUNTAS FRECUENTES</span><h2>Las cosas claras desde el principio.</h2><p>CobráFirme no es un banco y no reemplaza el soporte de tu entidad financiera.</p><Link href="/migracion-ueno/" className="faq-link">Consultar fuentes oficiales <ArrowUpRight size={16}/></Link></div><div className="faq-items">{faqs.map((item, index) => <details className="faq-item" key={item.q} open={index === 0}><summary>{item.q}<ChevronDown size={20}/></summary><p>{item.a}</p></details>)}</div></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><div><Brand light/><p>Orientación y herramientas para que los comercios de Paraguay organicen sus medios de cobro.</p></div><div className="footer-links"><div><strong>Explorá</strong><a href="/#diagnostico">Diagnóstico gratis</a><Link href="/migracion-ueno/">Guía Ueno</Link><a href="/#kits">Kit Integral</a></div><div><strong>Información legal</strong><Link href="/privacidad/">Privacidad</Link><Link href="/terminos/">Términos</Link><Link href="/reembolsos/">Reembolsos</Link></div><div><strong>Fuentes</strong><a href={official.news} target="_blank" rel="noopener noreferrer">Noticias oficiales BCP <ExternalLink size={14}/></a><a href={official.bancardSupport} target="_blank" rel="noopener noreferrer">Ayuda Bancard <ExternalLink size={14}/></a>{site.supportEmail && <a href={`mailto:${site.supportEmail}`}>Contacto</a>}</div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} CobráFirme. Servicio independiente operado desde Argentina.</span><span>No estamos afiliados a entidades financieras. Contenido revisado: {site.officialUpdate}. <AnalyticsSettingsButton /></span></div></div></footer>
  </>;
}
