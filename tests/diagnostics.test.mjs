import assert from 'node:assert/strict';
import test from 'node:test';
import { issues, getIssue, planAsText, customerMessage } from '../src/lib/diagnostico.ts';
import { validCheckoutUrl } from '../src/lib/config.ts';

test('todos los diagnósticos son distintos y contienen acciones seguras', () => {
  assert.equal(issues.length, 5);
  assert.equal(new Set(issues.map(issue => issue.id)).size, issues.length);
  for (const issue of issues) {
    for (const key of ['canDo', 'confirm', 'prepare', 'avoid']) assert.ok(issue[key].length >= 2, `${issue.id} ${key}`);
    assert.ok(planAsText(issue).includes(issue.title));
  }
});

test('selección de problemas no devuelve un resultado inventado', () => {
  assert.equal(getIssue('otro'), undefined);
  assert.equal(getIssue('qr')?.id, 'qr');
});

test('mensajes a clientes requieren completar los datos reales', () => {
  assert.ok(customerMessage.includes('[NOMBRE DEL TITULAR]'));
  assert.ok(customerMessage.includes('[DATOS CONFIRMADOS]'));
});

test('checkout externo sólo admite HTTPS válido', () => {
  assert.equal(validCheckoutUrl('https://www.paypal.com/checkoutnow?token=123'), true);
  assert.equal(validCheckoutUrl('javascript:alert(1)'), false);
  assert.equal(validCheckoutUrl('http://example.net'), false);
  assert.equal(validCheckoutUrl('https://example.com'), false);
  assert.equal(validCheckoutUrl(''), false);
});
