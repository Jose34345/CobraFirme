/** Analítica de producto: solamente eventos de una lista cerrada, nunca datos bancarios, formularios ni identificadores personales. */
export type AnalyticsEvent = 'diagnosis_selected' | 'plan_copied' | 'message_copied' | 'guide_shared' | 'checklist_download' | 'ueno_guide_open' | 'premium_interest' | 'premium_checkout_click';
export const ANALYTICS_CONSENT_KEY = 'cobrafirme-analytics-consent-v1';
const allowed = new Set<AnalyticsEvent>(['diagnosis_selected','plan_copied','message_copied','guide_shared','checklist_download','ueno_guide_open','premium_interest','premium_checkout_click']);

type AnonymousPostHog = { capture: (event: string, properties?: Record<string, string>) => void; opt_out_capturing?: () => void; init: (key: string, opts: Record<string, unknown>) => void; _i?: unknown[]; __SV?: number; [key: string]: unknown };
declare global { interface Window { posthog?: AnonymousPostHog } }
export function analyticsConfigured(): boolean {
  return Boolean((process.env.NEXT_PUBLIC_POSTHOG_KEY || '').trim());
}
export function analyticsAllowed(): boolean {
  if (typeof window === 'undefined') return false;
  try { return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === 'yes'; }
  catch { return false; }
}
export function trackEvent(event: AnalyticsEvent, detail?: string): void {
  if (!allowed.has(event) || !analyticsAllowed()) return;
  const properties = detail && /^[a-z0-9_-]{1,36}$/.test(detail) ? { option: detail } : undefined;
  window.posthog?.capture(event, properties);
}
export function loadAnalytics(): void {
  if (typeof window === 'undefined' || !analyticsConfigured() || !analyticsAllowed() || window.posthog) return;
  const hostInput = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
  const host = ['https://us.i.posthog.com', 'https://eu.i.posthog.com'].includes(hostInput) ? hostInput : 'https://us.i.posthog.com';
  const queue = [] as unknown as unknown[] & AnonymousPostHog;
  queue.__SV = 1;
  queue._i = [];
  for (const method of ['capture', 'identify', 'opt_out_capturing', 'reset']) {
    (queue as unknown as Record<string, unknown>)[method] = (...args: unknown[]) => queue.push([method, ...args]);
  }
  queue.init = (key, options) => {
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `${host.replace('.i.posthog.com','-assets.i.posthog.com')}/static/array.js`;
    script.onerror = () => { /* La web funciona aunque un bloqueador impida la analítica. */ };
    document.head.appendChild(script);
    queue._i?.push([key, options, 'posthog']);
  };
  window.posthog = queue;
  queue.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!.trim(), {
    api_host: host,
    defaults: '2026-08-30',
    persistence: 'memory',
    person_profiles: 'identified_only',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    disable_surveys: true,
    disable_web_experiments: true,
    disable_external_dependency_loading: false,
    advanced_disable_decide: true,
    ip: false,
  });
}
