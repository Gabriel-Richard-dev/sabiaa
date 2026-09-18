// Checagem da conta do Modo Foco (sequência e resumo). Rode: node foco.test.mjs
import assert from 'node:assert/strict';
import { FOCO_HOJE, focoSequencia, focoSessoes, resumoFoco } from './mock.js';

// sequência conta de hoje para trás e para no primeiro dia sem sessão concluída
assert.equal(focoSequencia([]), 0);
assert.equal(focoSequencia([{ dia: 'SEG', min: 25, feita: true }]), 0, 'dia solto lá atrás não vira sequência');
assert.equal(focoSequencia([{ dia: FOCO_HOJE, min: 25, feita: false }]), 0, 'interrompida não mantém sequência');
assert.equal(focoSequencia(focoSessoes), 3, 'SEX, QUI e QUA concluídos; TER só tem interrompida');

const r = resumoFoco(focoSessoes);
assert.equal(r.minHoje, 40, '15 + 25 concluídos hoje');
assert.equal(r.concluidasHoje, 2);
assert.equal(r.minSemana, 125);
assert.equal(r.sessoesSemana, 5, 'a interrompida de TER não conta');
assert.equal(r.maior, 45);
assert.equal(r.porDia.find((d) => d.dia === 'TER').min, 0, 'dia só com interrompida fica zerado no gráfico');
assert.equal(r.porDia.reduce((t, d) => t + d.min, 0), r.minSemana, 'gráfico e total batem');

// uma sessão nova entra em FOCO_HOJE e soma
const r2 = resumoFoco([{ dia: FOCO_HOJE, obj: 'estudos', titulo: 'Nova', min: 60, feita: true }, ...focoSessoes]);
assert.equal(r2.minHoje, 100);
assert.equal(r2.maior, 60);
assert.equal(r2.seq, 3);

console.log('ok');
