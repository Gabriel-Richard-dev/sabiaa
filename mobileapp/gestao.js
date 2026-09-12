import { useState } from 'react';
import { View } from 'react-native';
import { Bar, Btn, c, Campo, Card, H, Icone, Shell, Stat, T, useStore } from './ui';
import { alunos9A, humores, humoresBase, turmas } from './mock';

const meses = ['Jun', 'Jul', 'Ago', 'Set'];

function Painel() {
  const s = useStore();
  const part = Math.round(turmas.reduce((a, t) => a + t.participacao, 0) / turmas.length);
  const media = (turmas.reduce((a, t) => a + t.media, 0) / turmas.length).toFixed(1);
  const contagem = humoresBase.map((n, i) => n + (s.humorHoje === i ? 1 : 0));
  const totalHumor = contagem.reduce((a, b) => a + b, 0);

  return (
    <>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Stat valor={`${part}%`} label="participação" cor={c.sky} />
        <Stat valor={media} label="média geral" cor={c.mint} />
        <Stat valor={turmas.reduce((a, t) => a + t.alunos, 0)} label="alunos" />
      </View>

      <Card>
        <H small>Progresso das turmas</H>
        <T muted style={{ fontSize: 13 }}>Meta de participação: {s.params.meta}%</T>
        {turmas.map((t) => {
          const ok = t.participacao >= s.params.meta;
          return (
            <View key={t.id} style={{ gap: 4, marginTop: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <T style={{ fontWeight: '700' }}>{t.nome}</T>
                <T style={{ color: ok ? c.mint : c.coral, fontWeight: '700' }}>{t.participacao}%{ok ? '' : ' · abaixo da meta'}</T>
              </View>
              <Bar value={t.participacao} color={ok ? c.mint : c.amber} />
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 44 }}>
                {t.hist.map((v, i) => (
                  <View key={i} style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '70%', height: Math.max(4, (v - 45) * 0.7), backgroundColor: c.violetSoft, borderRadius: 4 }} />
                    <T muted style={{ fontSize: 10, lineHeight: 14 }}>{meses[i]}</T>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </Card>

      <Card>
        <H small>Progresso dos alunos · 9º A</H>
        {alunos9A.map((a) => (
          <View key={a.nome} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <T style={{ flex: 1 }}>{a.nome}</T>
            <View style={{ width: 110 }}>
              <Bar value={a.participacao} color={a.participacao >= s.params.meta ? c.mint : c.amber} />
            </View>
          </View>
        ))}
      </Card>

      <Card>
        <H small>Bem-estar (agregado)</H>
        {humores.map((h, i) => (
          <View key={h.nome} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icone name={h.icone} size={22} color={c.slate} />
            <T muted style={{ width: 70, fontSize: 13 }}>{h.nome}</T>
            <View style={{ flex: 1 }}>
              <Bar value={contagem[i]} max={totalHumor} color={i < 2 ? c.coral : i === 2 ? c.amber : c.mint} />
            </View>
            <T muted style={{ width: 32, textAlign: 'right' }}>{contagem[i]}</T>
          </View>
        ))}
        <T muted style={{ fontSize: 13 }}>{12 + s.mensagens.length} mensagens no canal anônimo esta semana (conteúdo não exibido).</T>
        <T muted style={{ fontSize: 12 }}>Dados anônimos e agregados. Não são diagnóstico.</T>
      </Card>
    </>
  );
}

function Eventos() {
  const s = useStore();
  const [f, setF] = useState({ titulo: '', periodo: '', publico: '', bonus: '30' });
  const ok = f.titulo.trim() && f.periodo.trim();
  return (
    <>
      <Card>
        <H small>Criar evento</H>
        <Campo value={f.titulo} onChangeText={(titulo) => setF({ ...f, titulo })} placeholder="Nome do evento" />
        <Campo value={f.periodo} onChangeText={(periodo) => setF({ ...f, periodo })} placeholder="Período (ex.: 1 a 5 de outubro)" />
        <Campo value={f.publico} onChangeText={(publico) => setF({ ...f, publico })} placeholder="Público (ex.: 9º anos)" />
        <Campo value={f.bonus} onChangeText={(bonus) => setF({ ...f, bonus: bonus.replace(/\D/g, '') })} placeholder="Pontos bônus" keyboardType="number-pad" />
        <Btn
          title="Publicar evento"
          disabled={!ok}
          onPress={() => {
            s.criarEvento({ titulo: f.titulo.trim(), periodo: f.periodo.trim(), publico: f.publico.trim() || 'Todas as turmas', bonus: Number(f.bonus) || 0 });
            setF({ titulo: '', periodo: '', publico: '', bonus: '30' });
          }}
        />
      </Card>
      {s.eventos.map((e) => (
        <Card key={e.id}>
          <H small>{e.titulo}</H>
          <T muted>{e.periodo} · {e.publico} · +{e.bonus} XP</T>
          <T style={{ fontSize: 13 }}>{s.eventosFeitos.includes(e.id) ? 'Inscrições: 1 aluno (demo)' : 'Nenhuma inscrição ainda'}</T>
        </Card>
      ))}
    </>
  );
}

function Parametro({ label, desc, valor, onChange, passo, sufixo = '' }) {
  return (
    <Card>
      <H small>{label}</H>
      <T muted style={{ fontSize: 13 }}>{desc}</T>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
        <Btn small title="−" onPress={() => onChange(Math.max(0, valor - passo))} />
        <T style={{ fontSize: 26, fontWeight: '800', minWidth: 80, textAlign: 'center' }}>{valor}{sufixo}</T>
        <Btn small title="+" onPress={() => onChange(Math.min(sufixo === '%' ? 100 : 999, valor + passo))} />
      </View>
    </Card>
  );
}

function Parametros() {
  const { params, setParams } = useStore();
  const set = (k) => (v) => setParams({ ...params, [k]: v });
  return (
    <>
      <Parametro label="Participação" desc="Pontos por responder em aula ou concluir uma atividade" valor={params.participacao} onChange={set('participacao')} passo={5} />
      <Parametro label="Acerto" desc="Pontos extras por resposta correta" valor={params.acerto} onChange={set('acerto')} passo={5} />
      <Parametro label="Meta de participação" desc="Turmas abaixo disso aparecem em alerta no painel" valor={params.meta} onChange={set('meta')} passo={5} sufixo="%" />
    </>
  );
}

export default function AppGestao() {
  return (
    <Shell
      perfil="Coordenação · EEM Sabiá"
      tabs={[
        { key: 'Painel', icone: 'chart-box-outline', Tela: Painel },
        { key: 'Eventos', icone: 'calendar-month-outline', Tela: Eventos },
        { key: 'Parâmetros', icone: 'tune-variant', Tela: Parametros },
      ]}
    />
  );
}
