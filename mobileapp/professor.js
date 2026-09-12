import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Bar, Btn, c, Campo, Card, H, Icone, Opcao, Shell, T, useStore } from './ui';
import { alunos9A, slides, TOTAL_TURMA, turmas } from './mock';

function Turmas() {
  const s = useStore();
  const [aberta, setAberta] = useState('9A');
  const alunos = [{ nome: 'Gabriel', xp: s.xp, participacao: 70 + Object.keys(s.respondidas).length * 10 }, ...alunos9A];
  return turmas.map((t) => (
    <Card key={t.id}>
      <Pressable onPress={() => setAberta(aberta === t.id ? null : t.id)} style={{ gap: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <H small>{t.nome}</H>
          <T muted>{t.alunos} alunos · média {t.media}</T>
        </View>
        <T muted style={{ fontSize: 13 }}>Participação {t.participacao}%</T>
        <Bar value={t.participacao} color={c.sky} />
      </Pressable>
      {aberta === t.id && t.id === '9A' &&
        alunos.map((a) => (
          <View key={a.nome} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <T style={{ flex: 1 }}>{a.nome}</T>
            <T muted style={{ width: 60, fontSize: 13 }}>{a.xp} XP</T>
            <View style={{ width: 90 }}>
              <Bar value={Math.min(a.participacao, 100)} color={a.participacao >= 75 ? c.mint : c.amber} />
            </View>
          </View>
        ))}
    </Card>
  ));
}

function Slides() {
  const s = useStore();
  const { slide, aberta, respostas } = s.live;
  const sl = slides[slide];
  return (
    <>
      <Card style={{ backgroundColor: c.violetDeep, borderColor: c.violetDeep, minHeight: 190, justifyContent: 'center' }}>
        <T style={{ color: c.violetSoft }}>Slide {slide + 1}/{slides.length} · 9º A · Matemática</T>
        <H style={{ color: c.snow }}>{sl.titulo}</H>
        <T style={{ color: c.snow, fontSize: 18, lineHeight: 26 }}>{sl.texto || sl.pergunta}</T>
      </Card>

      {sl.opcoes && !aberta && (
        <Card>
          {sl.opcoes.map((o) => <Opcao key={o} texto={o} />)}
          <Btn title="Liberar para os celulares" color={c.mint} lip={c.mintDark} onPress={s.abrirPergunta} />
        </Card>
      )}

      {sl.opcoes && aberta && (
        <Card>
          <H small>{respostas.length}/{TOTAL_TURMA} responderam</H>
          <Bar value={respostas.length} max={TOTAL_TURMA} color={c.sky} />
          {sl.opcoes.map((o, i) => {
            const n = respostas.filter((r) => r === i).length;
            return (
              <View key={o} style={{ gap: 4, marginTop: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <T style={{ fontWeight: '700', flex: 1 }}>{o}</T>
                  {sl.certa === i && <Icone name="check" size={18} color={c.mint} />}
                  <T muted>{n}</T>
                </View>
                <Bar value={n} max={respostas.length} color={sl.certa === i ? c.mint : c.violet} />
              </View>
            );
          })}
          <Btn title="Encerrar pergunta" color={c.coral} lip={c.coralDark} onPress={s.fecharPergunta} />
          <T muted style={{ fontSize: 12, textAlign: 'center' }}>Para testar, troque de perfil e responda como aluno.</T>
        </Card>
      )}

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Btn style={{ flex: 1 }} icone="chevron-left" title="Anterior" disabled={slide === 0} onPress={() => s.irSlide(slide - 1)} />
        <Btn style={{ flex: 1 }} iconeFim="chevron-right" title="Próximo" disabled={slide === slides.length - 1} onPress={() => s.irSlide(slide + 1)} />
      </View>
    </>
  );
}

const novaPergunta = () => ({ p: '', opcoes: ['', '', ''], certa: 0 });

function NovaAtividade() {
  const s = useStore();
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [perguntas, setPerguntas] = useState([]);
  const [q, setQ] = useState(novaPergunta());
  const qOk = q.p.trim() && q.opcoes.every((o) => o.trim());
  const todas = qOk ? [...perguntas, q] : perguntas;

  const publicar = () => {
    s.criarAtividade({ titulo: titulo.trim(), desc: desc.trim() || 'Atividade extra', perguntas: todas });
    setTitulo(''); setDesc(''); setPerguntas([]); setQ(novaPergunta());
  };

  return (
    <Card>
      <H small>Nova atividade extra</H>
      <Campo value={titulo} onChangeText={setTitulo} placeholder="Título" />
      <Campo value={desc} onChangeText={setDesc} placeholder="Descrição" />
      <T muted>{perguntas.length} pergunta(s) adicionada(s)</T>
      <Campo value={q.p} onChangeText={(p) => setQ({ ...q, p })} placeholder={`Pergunta ${perguntas.length + 1}`} />
      {q.opcoes.map((o, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Pressable onPress={() => setQ({ ...q, certa: i })} hitSlop={8}>
            <Icone name={q.certa === i ? 'check-circle' : 'checkbox-blank-circle-outline'} size={26} color={q.certa === i ? c.mint : c.hare} />
          </Pressable>
          <Campo style={{ flex: 1 }} value={o} onChangeText={(v) => setQ({ ...q, opcoes: q.opcoes.map((x, k) => (k === i ? v : x)) })} placeholder={`Opção ${i + 1}`} />
        </View>
      ))}
      <T muted style={{ fontSize: 12 }}>Toque no círculo para marcar a resposta certa.</T>
      <Btn title="+ Adicionar outra pergunta" color={c.sky} lip={c.skyDark} disabled={!qOk} onPress={() => { setPerguntas(todas); setQ(novaPergunta()); }} />
      <Btn title="Publicar para o 9º A" disabled={!titulo.trim() || todas.length === 0} onPress={publicar} />
    </Card>
  );
}

function Atividades() {
  const s = useStore();
  return (
    <>
      <NovaAtividade />
      <H small>Respostas</H>
      {s.atividades.map((a) => {
        const feita = a.id in s.feitas;
        const n = (a.concluiram || 0) + (feita ? 1 : 0);
        return (
          <Card key={a.id}>
            <H small>{a.titulo}</H>
            <T muted>{a.perguntas.length} questões · {n}/{TOTAL_TURMA} concluíram</T>
            <Bar value={n} max={TOTAL_TURMA} color={c.mint} />
            {feita && <T style={{ fontSize: 13 }}>Gabriel: {s.feitas[a.id]}/{a.perguntas.length} acertos</T>}
          </Card>
        );
      })}
    </>
  );
}

export default function AppProfessor() {
  return (
    <Shell
      perfil="Prof. Marcos · Matemática"
      tabs={[
        { key: 'Turmas', icone: 'account-group-outline', Tela: Turmas },
        { key: 'Aula', icone: 'presentation', Tela: Slides },
        { key: 'Atividades', icone: 'clipboard-text-outline', Tela: Atividades },
      ]}
    />
  );
}
