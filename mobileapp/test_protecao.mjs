// Checagem da lógica de dados da Central de Proteção (specs/bullyng-spec.md).
// Roda com: node --experimental-detect-module test_protecao.mjs
import assert from 'node:assert/strict';
import { combinaFiltro, hojeBR, proximoProtocolo, relatosIniciais, statusRelato } from './mock.js';

const [r148, r147, r146] = relatosIniciais;

// protocolo continua a numeração, não recomeça nem repete
assert.equal(proximoProtocolo(relatosIniciais, '17/09/2026'), 'SB-2026-0149');
assert.equal(proximoProtocolo([{ protocolo: 'SB-2026-0149' }, ...relatosIniciais], '17/09/2026'), 'SB-2026-0150');
assert.equal(proximoProtocolo([{ protocolo: 'SB-2025-0009' }], '01/01/2026'), 'SB-2026-0010');

assert.match(hojeBR(), /^\d{2}\/\d{2}\/\d{4}$/);

// "Todos" não esconde nada
assert.equal(relatosIniciais.filter((r) => combinaFiltro(r, 'Todos')).length, 3);

// filtro por tipo
assert.deepEqual(relatosIniciais.filter((r) => combinaFiltro(r, 'Bullying')), [r148, r146]);
assert.deepEqual(relatosIniciais.filter((r) => combinaFiltro(r, 'Assédio')), [r147]);

// "Outros" é o rótulo do tipo "Outra situação"
assert.deepEqual(relatosIniciais.filter((r) => combinaFiltro(r, 'Outros')), []);
assert.ok(combinaFiltro({ tipo: 'Outra situação', status: 'Recebido' }, 'Outros'));
assert.ok(!combinaFiltro({ tipo: 'Bullying', status: 'Recebido' }, 'Outros'));

// filtro por status: "Novos" é o rótulo de "Recebido"
assert.ok(combinaFiltro({ tipo: 'Bullying', status: 'Recebido' }, 'Novos'));
assert.ok(!combinaFiltro(r148, 'Novos'));
assert.deepEqual(relatosIniciais.filter((r) => combinaFiltro(r, 'Em análise')), [r148]);
assert.deepEqual(relatosIniciais.filter((r) => combinaFiltro(r, 'Encerrados')), [r146]);

// todo status tem cor e rótulo de filtro, e todo relato de exemplo usa um status válido
for (const [status, x] of Object.entries(statusRelato)) {
  assert.ok(x.cor && x.filtro, status);
}
for (const r of relatosIniciais) {
  assert.ok(statusRelato[r.status], r.protocolo);
  assert.equal(r.historico.at(-1).status, r.status, `${r.protocolo}: histórico e status divergem`);
  for (const h of r.historico) assert.ok(statusRelato[h.status], `${r.protocolo}: ${h.status}`);
}

console.log('ok');
