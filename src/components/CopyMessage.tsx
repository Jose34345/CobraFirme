'use client';
import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import { customerMessage } from '@/lib/diagnostico';

export function CopyMessage() {
  const [copyState, setCopyState] = useState(false);
  const [shareState, setShareState] = useState(false);
  async function copy() { try { await navigator.clipboard.writeText(customerMessage); setCopyState(true); } catch { setCopyState(false); } }
  async function share() {
    const url = window.location.href;
    const message = 'Guía gratuita para ordenar tus medios de cobro en Paraguay — CobráFirme';
    try {
      if (navigator.share) await navigator.share({ title: 'CobráFirme', text: message, url });
      else { await navigator.clipboard.writeText(`${message}: ${url}`); setShareState(true); }
    } catch { /* El usuario puede cancelar la hoja de compartir. */ }
  }
  return <div className="copy-card">
    <div className="copy-info"><div className="copy-icon"><Copy size={20}/></div><div><strong>Un mensaje listo para tus clientes</strong><p>Reemplazá los campos entre corchetes por los datos confirmados de tu negocio.</p></div></div>
    <blockquote>{customerMessage}</blockquote>
    <div className="copy-actions"><button type="button" onClick={copy} className="btn btn-secondary btn-small"><Copy size={16}/>{copyState ? 'Mensaje copiado' : 'Copiar mensaje'}</button><button type="button" onClick={share} className="btn btn-text btn-small"><Share2 size={16}/>{shareState ? 'Enlace copiado' : 'Compartir guía'}</button></div>
  </div>;
}
