'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ANALYTICS_CONSENT_KEY, analyticsConfigured, loadAnalytics } from '@/lib/analytics';

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<'yes'|'no'|null>(null);
  const [editing, setEditing] = useState(false);
  const enabled = analyticsConfigured();
  useEffect(() => {
    try { const stored = localStorage.getItem(ANALYTICS_CONSENT_KEY); setChoice(stored === 'yes' || stored === 'no' ? stored : null); }
    catch { setChoice(null); }
    const show = () => setEditing(true);
    window.addEventListener('cobrafirme:analytics-preferences', show);
    return () => window.removeEventListener('cobrafirme:analytics-preferences', show);
  }, []);
  useEffect(() => {
    if (choice !== 'yes' || !enabled) return;
    loadAnalytics();
    // Solo se envía la ruta; nunca los parámetros de consulta, referidores ni el contenido de formularios.
    window.posthog?.capture('$pageview', { $pathname: pathname || '/' });
  }, [choice, enabled, pathname]);
  function choose(next: 'yes'|'no') {
    try { localStorage.setItem(ANALYTICS_CONSENT_KEY,next); }
    catch { /* Sin almacenamiento el consentimiento no persiste. */ }
    if (next === 'no') window.posthog?.opt_out_capturing?.();
    if (next === 'yes' && window.posthog) window.posthog.opt_in_capturing?.();
    setChoice(next);
    setEditing(false);
  }
  if (!enabled || (choice !== null && !editing)) return null;
  return <aside className="analytics-consent" role="dialog" aria-label="Preferencias de medición">
    <strong>¿Nos ayudás a mejorar esta guía?</strong>
    <p>Con tu permiso medimos páginas visitadas y el uso de las herramientas para saber qué resulta útil. No recopilamos claves, datos bancarios ni grabaciones de pantalla. La guía funciona igual si rechazás.</p>
    <div className="analytics-actions"><button type="button" className="btn btn-secondary btn-small" onClick={() => choose('no')}>No, gracias</button><button type="button" className="btn btn-primary btn-small" onClick={() => choose('yes')}>Permitir medición</button></div>
  </aside>;
}
export function AnalyticsSettingsButton() {
  if (!analyticsConfigured()) return null;
  return <button type="button" className="analytics-settings" onClick={() => window.dispatchEvent(new Event('cobrafirme:analytics-preferences'))}>Preferencias de medición</button>;
}
