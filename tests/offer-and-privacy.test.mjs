import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { analyticsConfigured, analyticsAllowed } from '../src/lib/analytics.ts';
import { checkoutLink } from '../src/lib/config.ts';

test('la medición está apagada sin proyecto ni consentimiento explícito', () => {
  assert.equal(analyticsAllowed(), false);
  assert.equal(analyticsConfigured(), false);
});

test('las compras están apagadas por defecto y existe un solo kit integral', () => {
  assert.equal(checkoutLink('pro'), null);
  const source = fs.readFileSync(new URL('../src/components/PricingCards.tsx', import.meta.url),'utf8');
  assert.ok(source.includes('Kit Integral CobráFirme'));
  assert.ok(source.includes('14,99'));
  assert.ok(!source.includes('9,99'));
});

test('nunca se publican archivos premium en /public', () => {
  const found = fs.readdirSync(new URL('../public/recursos/', import.meta.url));
  assert.deepEqual(found, ['checklist-cobros.csv']);
});
