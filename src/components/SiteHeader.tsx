'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Brand } from './Brand';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header">
    <div className="container header-inner">
      <Brand />
      <nav className={`site-nav ${open ? 'site-nav-open' : ''}`} aria-label="Navegación principal">
        <Link onClick={close} href="/#como-funciona">Cómo funciona</Link>
        <Link onClick={close} href="/#diagnostico">Ayuda gratuita</Link>
        <Link onClick={close} href="/migracion-ueno/">Guía Ueno</Link>
        <Link onClick={close} href="/#kits">Kits</Link>
        <Link onClick={close} href="/#preguntas">Preguntas</Link>
        <Link onClick={close} className="nav-mobile-cta" href="/#diagnostico">Empezar gratis <ArrowUpRight size={16}/></Link>
      </nav>
      <Link href="/#diagnostico" className="header-cta">Empezar gratis <ArrowUpRight size={16} aria-hidden="true"/></Link>
      <button className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={23}/> : <Menu size={23}/>}</button>
    </div>
  </header>;
}
