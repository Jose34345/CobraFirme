/** Toda funcionalidad externa es opt-in. Ningún enlace de pago se considera válido por estar presente. */
export const site = {
  brand: 'CobráFirme',
  tagline: 'Tus cobros en orden. Tu negocio en marcha.',
  officialUpdate: '5 de noviembre de 2026',
  website: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? '',
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? '',
  formspree: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '',
  paymentVerified: process.env.NEXT_PUBLIC_PAYMENTS_VERIFIED === 'true',
  checkoutPro: process.env.NEXT_PUBLIC_CHECKOUT_PRO_URL ?? '',
} as const;

export const official = {
  resolution: 'https://www.bcp.gov.py/web/institucional/w/banco-central-inicia-el-procedimiento-de-resolucion-de-ueno-bank',
  aliases: 'https://www.bcp.gov.py/en/web/institucional/w/comunicado-sobre-uso-de-alias-registrados-en-ueno-bank-sa',
  apps: 'https://www.bcp.gov.py/en/web/institucional/w/comunicado-sobre-intermitencias-en-aplicaciones-moviles-de-entidades-bancarias',
  news: 'https://www.bcp.gov.py/en/noticias',
  bancard: 'https://comercios.bancard.com.py/productos/ventas-qr',
  bancardSupport: 'https://www.bancard.com.py/soporte',
  guaranteeUpdate: 'https://www.bcp.gov.py/web/institucional/w/comunicado-sobre-inicio-de-pagos-de-garantia-a-los-depositantes-de-ueno-bank-sa',
} as const;

export function whatsappLink(message: string): string | null {
  if (site.whatsapp.length < 10 || site.whatsapp.length > 15) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function validCheckoutUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && !!parsed.hostname && !/^(localhost|127\.|example\.)/.test(parsed.hostname);
  } catch { return false; }
}

/** Sin verificación del operador se oculta el botón de compra; ninguna compra se confirma en el navegador. */
export function checkoutLink(tier: 'pro'): string | null {
  const target = site.checkoutPro;
  return site.paymentVerified && validCheckoutUrl(target) ? target : null;
}
