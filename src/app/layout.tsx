import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/config';
import { AnalyticsConsent } from '@/components/AnalyticsConsent';

const description = 'Ayuda gratuita y herramientas para comerciantes de Paraguay: transferencias, QR, nuevos medios de cobro y conciliación. Servicio independiente, sin pedir claves ni manejar dinero.';
const metadataBase = /^https:\/\//.test(site.website) ? new URL(site.website) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: { default: 'CobráFirme | Tus cobros en orden. Tu negocio en marcha.', template: '%s | CobráFirme' },
  description,
  applicationName: 'CobráFirme',
  keywords: ['cobros Paraguay', 'transferencias Paraguay', 'QR comercios Paraguay', 'alternativas de cobro', 'Ueno comercios', 'conciliación de pagos'],
  openGraph: { title:'CobráFirme — Tus cobros en orden', description, locale:'es_PY', type:'website', siteName:'CobráFirme' },
  robots: { index:true, follow:true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#132449' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="es-PY"><body>{children}<AnalyticsConsent /></body></html>;
}
