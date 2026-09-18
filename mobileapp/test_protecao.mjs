// Checagem da lógica de dados da Central de Proteção (specs/bullyng-spec.md).
// Roda com: node --experimental-detect-module test_protecao.mjs
import assert from 'node:assert/strict';
import { combinaFiltro, hojeBR, proximoProtocolo, relatosIniciais, statusRelato, tipoRelato } from './mock.js';

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

// cada tipo tem perguntas próprias, e nenhuma delas se repete entre os dois
const perguntas = Object.fromEntries(Object.entries(tipoRelato).map(([t, x]) => [t, x.perguntas.map((q) => q.label)]));
assert.deepEqual(Object.keys(tipoRelato), ['Bullying', 'Assédio']);
for (const [t, labels] of Object.entries(perguntas)) {
  assert.ok(labels.length, `${t} sem perguntas`);
  assert.equal(new Set(labels).size, labels.length, `${t}: pergunta repetida`);
  for (const q of tipoRelato[t].perguntas) assert.ok(q.opcoes.length >= 2, `${t}: ${q.label} sem opções`);
}
assert.deepEqual(perguntas.Bullying.filter((q) => perguntas['Assédio'].includes(q)), []);

// a gestão lê o caso pelas perguntas do tipo, então as respostas mockadas têm que casar com elas
for (const r of relatosIniciais) {
  for (const q of Object.keys(r.respostas)) {
    assert.ok(perguntas[r.tipo].includes(q), `${r.protocolo}: "${q}" não é pergunta de ${r.tipo}`);
    assert.ok(tipoRelato[r.tipo].perguntas.find((x) => x.label === q).opcoes.includes(r.respostas[q]), `${r.protocolo}: resposta fora das opções de "${q}"`);
  }
}

console.log('ok');
