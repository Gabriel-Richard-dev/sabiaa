import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Modal, Pressable, Text, View } from 'react-native';
import { Anim, Bar, Btn, c, Campo, Card, f, H, Icone, Opcao, Rotulo, Sabia, Shell, Stat, T, useNav, useStore } from './ui';
import { ALUNO, avisos, categorias, comunidades, desenhos, iaPadrao, iaRespostas, itens, notas, slides } from './mock';
import { AjudaHome } from './protecao';

// telas do aluno usam só a família violeta + neutros; verde (mint) fica reservado para "feito/certo"

function Feito({ texto, claro }) {
  const cor = claro ? c.mintSoft : c.mintDark;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Icone name="check-circle" size={20} color={cor} />
      <T style={{ color: cor, fontWeight: '800' }}>{texto}</T>
    </View>
  );
}

function Info({ icone, children }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Icone name={icone} size={17} color={c.slate} />
      <T style={{ fontWeight: '700' }}>{children}</T>
    </View>
  );
}

function IconeCaixa({ name, size = 44 }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.28, backgroundColor: c.violetMist, alignItems: 'center', justifyContent: 'center' }}>
      <Icone accessible={false} name={name} size={size * 0.55} color={c.violet} />
    </View>
  );
}

// linha clicável de lista: ícone, título, descrição e seta
function Linha({ icone, titulo, desc, onPress, primeira }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={titulo} accessibilityHint={desc || 'Abre esta seção'} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, minHeight: 64, borderTopWidth: primeira ? 0 : 2, borderColor: c.line }}>
      <IconeCaixa name={icone} />
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '800' }}>{titulo}</T>
        {desc ? <T muted style={{ fontSize: 13 }}>{desc}</T> : null}
      </View>
      <Icone accessible={false} name="chevron-right" size={24} color={c.hare} />
    </Pressable>
  );
}

const destaque = () => ({ backgroundColor: c.violetMist, borderColor: c.violetSoft });

// cartão da home: rótulo, título, linhas e um botão (ou o selo de "feito")
function CardHome({ icone, rotulo, titulo, sub = [], botao, onPress, feito, escuro }) {
  return (
    <Pressable accessible={false} onPress={onPress}>
      <Card style={[{ gap: 6 }, escuro && { backgroundColor: c.violetDeep, borderColor: c.violetDeep, borderBottomWidth: 6 }]}>
        <Rotulo icone={icone} cor={escuro ? c.violetSoft : c.violet}>{rotulo}</Rotulo>
        <H style={escuro && { color: c.snow }}>{titulo}</H>
        {sub.map((l) => (
          <T key={l} muted style={escuro && { color: c.violetMist }}>{l}</T>
        ))}
        <View style={{ marginTop: 4, alignItems: 'flex-start' }}>
          {feito ? <Feito texto={feito} claro={escuro} /> : <Btn title={botao} onPress={onPress} />}
        </View>
      </Card>
    </Pressable>
  );
}

const atalhos = [
  { icone: 'book-open-variant', nome: 'Aulas', ir: (nav) => nav.irAba('Aprender') },
  { icone: 'bullhorn', nome: 'Avisos', ir: (nav) => nav.abrir(Avisos) },
  { icone: 'palette', nome: 'Desafio', ir: (nav) => nav.abrir(Desafio) },
  { icone: 'account-group', nome: 'Comunidade', ir: (nav) => nav.irAba('Comunidade') },
  { icone: 'brain', nome: 'Bem-estar', ir: (nav) => nav.irAba('Bem-estar') },
];

// práticas de TCC; a do dia gira pela data
const praticas = [
  { id: 'emocoes', icone: 'emoticon-outline', titulo: 'Minhas emoções', desc: 'O que aconteceu e o que você sentiu' },
  { id: 'pensamentos', icone: 'notebook-edit-outline', titulo: 'Registro de pensamentos', desc: 'Outro jeito de ver uma situação' },
  { id: 'plano', icone: 'stairs-up', titulo: 'Plano de mudança', desc: 'Um hábito que você quer transformar' },
  { id: 'respirar', icone: 'weather-windy', titulo: 'Respiração guiada', desc: 'Um minuto, quatro tempos' },
];
const praticaDoDia = () => praticas[Math.floor(Date.now() / 864e5) % praticas.length];

function Inicio() {
  const s = useStore();
  const nav = useNav();
  const { n, min, prox } = s.nivel;
  const falta = prox - s.xp;
  const quase = falta / (prox - min) <= 0.25;
  const atividade = s.atividades.find((a) => !(a.id in s.feitas));
  const feira = avisos.find((a) => a.id === 'feira');
  const xadrez = comunidades[0];
  const indo = s.comunidades.includes(xadrez.id);
  const aoVivo = s.live.aberta && slides[s.live.slide].opcoes && !(s.live.slide in s.respondidas);
  const pratica = praticaDoDia();

  return (
    <>
      <View>
        <H style={{ fontSize: 30, lineHeight: 38 }}>Olá, {ALUNO.nome} 👋</H>
        <T muted style={{ fontSize: 17 }}>Vamos continuar?</T>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Personalizar seu Sabiá" accessibilityHint="Abre os itens e roupas do Sabiá" onPress={() => nav.abrir(Personalizar)}>
        <Card style={[destaque(), { borderBottomWidth: 6, gap: 10 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Sabia size={150} equip={s.equip} />
            <View style={{ flex: 1, gap: 2 }}>
              <Rotulo icone="bird">SABIÁ</Rotulo>
              <H style={{ fontSize: 30, lineHeight: 36 }}>Nível {n}</H>
              <T style={{ fontWeight: '800', color: c.violet, fontSize: 17 }}>{s.xp} XP</T>
            </View>
          </View>
          <Bar value={s.xp - min} max={prox - min} />
          <T muted style={{ fontSize: 13 }}>{falta} XP para a próxima recompensa</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: c.snow, borderRadius: 12, padding: 10 }}>
            <Icone name="chat-processing-outline" size={20} color={c.violet} />
            <T style={{ flex: 1, fontSize: 14 }}>{quase ? 'Seu Sabiá está quase desbloqueando uma nova roupa!' : 'Continue assim para desbloquear novas roupas!'}</T>
          </View>
        </Card>
      </Pressable>

      <CardHome
        icone={pratica.icone}
        rotulo="BEM-ESTAR DO DIA"
        titulo={pratica.titulo}
        sub={[pratica.desc]}
        botao="Começar"
        feito={s.praticas.includes(pratica.id) && 'Feito hoje!'}
        onPress={() => nav.abrir(Pratica, { id: pratica.id })}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {atalhos.map((a) => (
          <Pressable key={a.nome} onPress={() => a.ir(nav)} accessibilityRole="button" accessibilityLabel={a.nome} style={{ width: '20%', alignItems: 'center', gap: 4, minHeight: 76 }}>
            <View accessible={false} style={{ width: 56, height: 56, borderRadius: 18, backgroundColor: c.violetMist, borderWidth: 2, borderColor: c.violetSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Icone name={a.icone} size={28} color={c.violet} />
            </View>
            <Text allowFontScaling style={{ fontFamily: f.extra, fontSize: 11, color: c.slate, textAlign: 'center' }}>{a.nome}</Text>
          </Pressable>
        ))}
      </View>

      {aoVivo && <CardHome icone="access-point" rotulo="AULA AO VIVO" titulo="Pergunta liberada!" sub={[slides[s.live.slide].pergunta]} botao="Responder" onPress={() => nav.abrir(Aula)} />}

      {atividade ? (
        <CardHome
          escuro
          icone="book-open-variant"
          rotulo="PRÓXIMA ATIVIDADE"
          titulo={atividade.materia || 'Atividade extra'}
          sub={[atividade.titulo, atividade.entrega || 'Nova']}
          botao="Continuar"
          onPress={() => nav.abrir(Quiz, { at: atividade })}
        />
      ) : (
        <CardHome escuro icone="book-open-variant" rotulo="ATIVIDADES" titulo="Tudo em dia!" sub={['Você concluiu todas as atividades.']} feito="Nada pendente" onPress={() => nav.irAba('Aprender')} />
      )}

      <CardHome icone="bullhorn" rotulo="AVISO DA ESCOLA" titulo={feira.titulo} sub={[feira.quando]} botao="Ver aviso" onPress={() => nav.abrir(AvisoDetalhe, { a: feira })} />

      <CardHome
        icone="palette"
        rotulo="DESAFIO DO DIA"
        titulo={'"Desenhe algo que te faz feliz."'}
        sub={[`${12 + (s.desenho ? 1 : 0)} alunos já participaram`]}
        botao="Participar"
        feito={s.desenho && 'Você participou!'}
        onPress={() => nav.abrir(Desafio)}
      />

      <CardHome
        icone={xadrez.icone}
        rotulo="ACONTECENDO NA ESCOLA"
        titulo={xadrez.encontro.titulo}
        sub={[`${xadrez.encontro.interessados + (indo ? 1 : 0)} alunos interessados`, `${xadrez.encontro.dia} • ${xadrez.encontro.hora} • ${xadrez.encontro.local}`]}
        botao="Participar"
        feito={indo && 'Você está participando!'}
        onPress={() => nav.abrir(ComunidadeDetalhe, { m: xadrez })}
      />

      <AjudaHome />
    </>
  );
}

function Aula() {
  const s = useStore();
  const { slide, aberta } = s.live;
  const sl = slides[slide];
  const minha = s.respondidas[slide];

  if (!aberta || !sl.opcoes) {
    return (
      <Card center style={[destaque(), { paddingVertical: 32 }]}>
        <Anim nome="escrevendo" size={180} />
        <H>Aguardando o professor</H>
        <T muted style={{ textAlign: 'center' }}>A pergunta aparece aqui assim que for liberada.</T>
      </Card>
    );
  }

  const estado = (i) => {
    if (minha == null) return undefined;
    if (sl.certa == null) return minha === i ? 'escolhida' : undefined;
    if (sl.certa === i) return 'certa';
    return minha === i ? 'errada' : undefined;
  };

  return (
    <Card>
      <T muted>Aula ao vivo · {sl.titulo}</T>
      <H>{sl.pergunta}</H>
      {sl.opcoes.map((o, i) => (
        <Opcao key={o} texto={o} estado={estado(i)} onPress={minha == null ? () => s.responder(i) : undefined} />
      ))}
      {minha != null && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Icone name="check-circle" size={20} color={c.violet} />
          <T style={{ fontWeight: '700', color: c.violet }}>
            Resposta enviada · +{s.params.participacao} XP
            {sl.certa === minha ? ` · +${s.params.acerto} pelo acerto` : ''}
          </T>
        </View>
      )}
    </Card>
  );
}

function Quiz({ at }) {
  const s = useStore();
  const nav = useNav();
  const [i, setI] = useState(0);
  const [esc, setEsc] = useState(null);
  const [acertos, setAcertos] = useState(0);
  const [ajuda, setAjuda] = useState(false);
  const q = at.perguntas[i];

  if (!q) {
    return (
      <Card center style={[destaque(), { paddingVertical: 24 }]}>
        <Anim nome="feliz" size={170} />
        <H>Atividade concluída!</H>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontFamily: f.tituloExtra, fontSize: 34, lineHeight: 42, color: c.violet }}>+{s.params.participacao + acertos * s.params.acerto} XP</Text>
          <Icone name="star-four-points" size={30} color={c.violet} />
        </View>
        <T muted style={{ textAlign: 'center' }}>{acertos}/{at.perguntas.length} acertos · Seu Sabiá ganhou experiência!</T>
        <Btn title="Voltar" onPress={nav.voltar} />
      </Card>
    );
  }

  const escolher = (k) => {
    setEsc(k);
    if (k === q.certa) setAcertos((a) => a + 1);
  };
  const proxima = () => {
    if (i + 1 === at.perguntas.length) s.concluir(at.id, acertos);
    setI(i + 1);
    setEsc(null);
    setAjuda(false);
  };

  return (
    <>
      <Card>
        <Rotulo icone="book-open-variant">{(at.materia || 'Atividade').toUpperCase()} · {i + 1}/{at.perguntas.length}</Rotulo>
        <T muted>{at.titulo}</T>
        <Bar value={i} max={at.perguntas.length} />
        <H>{q.p}</H>
        {q.opcoes.map((o, k) => (
          <Opcao
            key={o}
            texto={o}
            onPress={esc == null ? () => escolher(k) : undefined}
            estado={esc == null ? undefined : k === q.certa ? 'certa' : k === esc ? 'errada' : undefined}
          />
        ))}
        {esc != null && <Btn title={i + 1 === at.perguntas.length ? 'Finalizar' : 'Próxima'} onPress={proxima} />}
      </Card>
      {ajuda ? <ChatIA contexto={q.p} /> : <Btn icone="creation" title="Ajuda do Sabiá" color={c.violetDeep} onPress={() => setAjuda(true)} />}
    </>
  );
}

function AtividadeCard({ a }) {
  const s = useStore();
  const nav = useNav();
  return (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Rotulo>{(a.materia || 'Atividade extra').toUpperCase()}</Rotulo>
        <T muted style={{ fontSize: 13 }}>{a.entrega || 'Nova'}</T>
      </View>
      <H small>{a.titulo}</H>
      <T muted>{a.desc} · {a.perguntas.length} questões</T>
      {a.id in s.feitas ? (
        <Feito texto={`Concluída · ${s.feitas[a.id]}/${a.perguntas.length} acertos`} />
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Btn title="Começar" onPress={() => nav.abrir(Quiz, { at: a })} />
          <Btn icone="creation" title="Ajuda do Sabiá" color={c.violetDeep} onPress={() => nav.abrir(ChatIA, { contexto: a.titulo })} />
        </View>
      )}
    </Card>
  );
}

function Aprender() {
  const s = useStore();
  const nav = useNav();
  const aoVivo = s.live.aberta && slides[s.live.slide].opcoes;
  return (
    <>
      <H>Aprender</H>
      <Card style={[{ paddingVertical: 4 }, aoVivo && { borderColor: c.violet }]}>
        <Linha
          primeira
          icone={aoVivo ? 'access-point' : 'school-outline'}
          titulo={aoVivo ? 'Aula ao vivo: pergunta liberada!' : 'Aula ao vivo'}
          desc={aoVivo ? 'Toque para responder' : 'Matemática · aguardando o professor'}
          onPress={() => nav.abrir(Aula)}
        />
      </Card>
      <Card style={{ paddingVertical: 4 }}>
        <Linha primeira icone="creation" titulo="Sabiá IA" desc="Um tutor que te ajuda a pensar" onPress={() => nav.abrir(ChatIA)} />
      </Card>
      <Rotulo icone="book-open-variant">ATIVIDADES</Rotulo>
      {s.atividades.map((a) => (
        <AtividadeCard key={a.id} a={a} />
      ))}
    </>
  );
}

function Balao({ de, txt }) {
  const eu = de === 'eu';
  return (
    <View
      style={{
        alignSelf: eu ? 'flex-end' : 'flex-start',
        maxWidth: '85%',
        backgroundColor: eu ? c.violet : c.violetMist,
        borderRadius: 16,
        borderBottomRightRadius: eu ? 4 : 16,
        borderBottomLeftRadius: eu ? 16 : 4,
        padding: 12,
        gap: 2,
      }}
    >
      {!eu && <Rotulo icone="bird">SABIÁ</Rotulo>}
      <T style={eu && { color: c.snow }}>{txt}</T>
    </View>
  );
}

// ponytail: respostas prontas de mock.js; troca por chamada a um modelo quando houver backend
function ChatIA({ contexto }) {
  const [msgs, setMsgs] = useState([
    {
      de: 'ia',
      txt: contexto
        ? `Oi, ${ALUNO.nome}! Vamos pensar juntos em "${contexto}". Como posso ajudar?`
        : `Oi, ${ALUNO.nome}! Eu te ajudo a pensar, sem entregar a resposta pronta. Qual é a sua dúvida?`,
    },
  ]);
  const [digitando, setDigitando] = useState(false);
  const [txt, setTxt] = useState('');

  const perguntar = (p) => {
    if (!p.trim() || digitando) return;
    setMsgs((m) => [...m, { de: 'eu', txt: p.trim() }]);
    setTxt('');
    setDigitando(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { de: 'ia', txt: iaRespostas.find((x) => x.p === p)?.r ?? iaPadrao }]);
      setDigitando(false);
    }, 1200);
  };

  return (
    <Card style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <IconeCaixa name="creation" size={40} />
        <View style={{ flex: 1 }}>
          <H small>Ajuda do Sabiá</H>
          <T muted style={{ fontSize: 12 }}>Tutor com IA · respostas de demonstração</T>
        </View>
      </View>
      {msgs.map((m, k) => (
        <Balao key={k} {...m} />
      ))}
      {digitando && <Balao de="ia" txt="digitando..." />}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {iaRespostas.map((x) => (
          <Pressable key={x.p} onPress={() => perguntar(x.p)} accessibilityRole="button" style={{ borderWidth: 2, borderColor: c.violetSoft, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6, minHeight: 44, justifyContent: 'center' }}>
            <Text allowFontScaling style={{ fontFamily: f.negrito, fontSize: 13, color: c.violet }}>{x.p}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Campo label="Dúvida para o Sabiá" style={{ flex: 1 }} value={txt} onChangeText={setTxt} placeholder="Escreva sua dúvida" onSubmitEditing={() => perguntar(txt)} />
        <Pressable onPress={() => perguntar(txt)} disabled={!txt.trim() || digitando} accessibilityRole="button" accessibilityLabel="Enviar dúvida" accessibilityState={{ disabled: !txt.trim() || digitando }} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: txt.trim() ? c.violet : c.line, alignItems: 'center', justifyContent: 'center' }}>
          <Icone accessible={false} name="send" size={22} color={c.snow} />
        </Pressable>
      </View>
    </Card>
  );
}

function Avisos() {
  const s = useStore();
  const nav = useNav();
  return (
    <>
      <H>Avisos</H>
      {avisos.map((a) => {
        const lido = s.lidos.includes(a.id);
        return (
          <Pressable key={a.id} onPress={() => nav.abrir(AvisoDetalhe, { a })} accessibilityRole="button" accessibilityLabel={`${a.titulo}. ${a.quando}`}>
            <Card style={{ gap: 4, borderLeftWidth: 6, borderLeftColor: lido ? c.line : c.violet }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Rotulo icone={a.icone}>{a.tipo}</Rotulo>
                {!lido && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: c.violet }} />}
              </View>
              <T style={{ fontWeight: '800', fontSize: 16 }}>{a.titulo}</T>
              <T muted style={{ fontSize: 13 }}>{a.quando}</T>
            </Card>
          </Pressable>
        );
      })}
    </>
  );
}

function AvisoDetalhe({ a }) {
  const s = useStore();
  return (
    <Card style={{ gap: 12, borderTopWidth: 6, borderTopColor: c.violet }}>
      <Rotulo icone={a.icone}>{a.tipo}</Rotulo>
      <H>{a.titulo}</H>
      <Info icone="calendar-blank">{a.quando}</Info>
      <T style={{ fontSize: 16, lineHeight: 24 }}>{a.texto}</T>
      <T muted style={{ fontSize: 13 }}>Publicado pela coordenação</T>
      {s.lidos.includes(a.id) ? <Feito texto="Leitura confirmada" /> : <Btn title="Confirmar leitura" onPress={() => s.lerAviso(a.id)} />}
    </Card>
  );
}

// a paleta do desenho é conteúdo do aluno, por isso é a única parte colorida
const tintas = [c.violet, c.coral, c.amber, c.mint, c.sky, c.ink];
const nomesTintas = ['violeta', 'coral', 'amarela', 'verde', 'azul', 'preta'];

function Rabisco({ pontos, dot }) {
  return (
    <View accessible={false} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
      {pontos.map((p, i) => (
        <View
          key={i}
          style={{ position: 'absolute', left: `${p.x * 100}%`, top: `${p.y * 100}%`, width: dot, height: dot, marginLeft: -dot / 2, marginTop: -dot / 2, borderRadius: dot / 2, backgroundColor: p.cor }}
        />
      ))}
    </View>
  );
}

// ponytail: cada ponto do traço é uma View (limite de 3000); troque por react-native-svg/skia se o desenho for de verdade
function Desenho({ onEnviar, onCancelar }) {
  const [pontos, setPontos] = useState([]);
  const [tinta, setTinta] = useState(tintas[0]);
  const [descricao, setDescricao] = useState('');
  const lado = useRef(1);
  const ultimo = useRef(null);

  // guarda em fração do quadro (0..1) e preenche o espaço entre dois toques para o traço não falhar
  const riscar = (e, inicio) => {
    const x = e.nativeEvent.locationX / lado.current;
    const y = e.nativeEvent.locationY / lado.current;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    const u = inicio || !ultimo.current ? { x, y } : ultimo.current;
    const passos = Math.max(1, Math.ceil(Math.hypot(x - u.x, y - u.y) / 0.012));
    const novos = Array.from({ length: passos }, (_, k) => ({ x: u.x + ((x - u.x) * (k + 1)) / passos, y: u.y + ((y - u.y) * (k + 1)) / passos, cor: tinta }));
    ultimo.current = { x, y };
    setPontos((p) => (p.length > 3000 ? p : [...p, ...novos]));
  };

  return (
    <Card>
      <Rotulo icone="palette">DESAFIO DO DIA</Rotulo>
      <H small>Desenhe algo que te faz feliz</H>
      <View
        accessible={false}
        importantForAccessibility="no"
        onLayout={(e) => (lado.current = e.nativeEvent.layout.width)}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}
        onResponderGrant={(e) => riscar(e, true)}
        onResponderMove={(e) => riscar(e)}
        style={{ width: '100%', aspectRatio: 1, backgroundColor: c.snow, borderWidth: 2, borderColor: c.line, borderRadius: 12, overflow: 'hidden' }}
      >
        {pontos.length === 0 && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', gap: 4, pointerEvents: 'none' }}>
            <Icone name="gesture" size={36} color={c.hare} />
            <T muted>Desenhe aqui com o dedo</T>
          </View>
        )}
        <Rabisco pontos={pontos} dot={10} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {tintas.map((t, i) => (
          <Pressable key={t} onPress={() => setTinta(t)} accessibilityRole="radio" accessibilityLabel={`Cor ${nomesTintas[i]}`} accessibilityState={{ checked: tinta === t }} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t, borderWidth: 4, borderColor: tinta === t ? c.violetSoft : c.snow }} />
        ))}
        <Pressable onPress={() => setPontos([])} accessibilityRole="button" accessibilityLabel="Apagar desenho" hitSlop={8} style={{ marginLeft: 'auto', width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Icone accessible={false} name="eraser" size={28} color={c.slate} />
        </Pressable>
      </View>
      <Campo label="Descrição alternativa do desenho" value={descricao} onChangeText={setDescricao} placeholder="Descreva o que você desenhou" />
      <Btn title="Enviar para o mural" icone="send" disabled={!pontos.length && !descricao.trim()} onPress={() => onEnviar({ pontos: pontos.length ? pontos : null, descricao: descricao.trim() })} />
      <Btn title="Cancelar" color={c.slate} onPress={onCancelar} />
    </Card>
  );
}

// desenhos dos colegas são mockups: um emoji grande faz o papel da arte
function Mural() {
  const s = useStore();
  const [curtidos, setCurtidos] = useState([]);
  const curtir = (id) => setCurtidos((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  const quadros = [...(s.desenho ? [{ autor: 'Você', turma: ALUNO.turma, titulo: 'Meu desenho', curtidas: 0, ...s.desenho }] : []), ...desenhos];
  return (
    <>
      <Rotulo icone="image-multiple">MURAL DE DESENHOS</Rotulo>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 14 }}>
        {quadros.map((d) => {
          const curtido = curtidos.includes(d.autor);
          return (
            <View key={d.autor} style={{ width: '48%', gap: 4 }}>
              <View accessible accessibilityRole="image" accessibilityLabel={d.descricao || d.titulo} style={{ aspectRatio: 1, borderRadius: 12, borderWidth: 2, borderColor: c.line, backgroundColor: c.snow, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {d.pontos ? <Rabisco pontos={d.pontos} dot={5} /> : d.descricao ? <T style={{ padding: 12, textAlign: 'center' }}>{d.descricao}</T> : <Text allowFontScaling style={{ fontSize: 64, lineHeight: 84 }}>{d.emoji}</Text>}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={{ flex: 1 }}>
                  <T style={{ fontWeight: '800', fontSize: 13, lineHeight: 18 }}>{d.titulo}</T>
                  <T muted style={{ fontSize: 12, lineHeight: 16 }}>{d.autor} · {d.turma}</T>
                </View>
                <Pressable onPress={() => curtir(d.autor)} accessibilityRole="button" accessibilityLabel={`${curtido ? 'Remover curtida de' : 'Curtir'} desenho de ${d.autor}`} accessibilityState={{ checked: curtido }} hitSlop={8} style={{ alignItems: 'center', minWidth: 44, minHeight: 44 }}>
                  <Icone accessible={false} name={curtido ? 'heart' : 'heart-outline'} size={22} color={c.violet} />
                  <T muted style={{ fontSize: 11, lineHeight: 14 }}>{d.curtidas + (curtido ? 1 : 0)}</T>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
}

function Desafio() {
  const s = useStore();
  const [desenhando, setDesenhando] = useState(false);
  if (desenhando) {
    return (
      <Desenho
        onEnviar={(p) => {
          s.enviarDesenho(p);
          setDesenhando(false);
        }}
        onCancelar={() => setDesenhando(false)}
      />
    );
  }
  return (
    <>
      <Card center style={[destaque(), { paddingVertical: 20 }]}>
        <Rotulo icone="palette">DESAFIO DO DIA</Rotulo>
        <H style={{ textAlign: 'center' }}>"Desenhe algo que te faz feliz."</H>
        <T muted>{12 + (s.desenho ? 1 : 0)} alunos já participaram · +30 XP</T>
        {s.desenho ? <Feito texto="Seu desenho está no mural!" /> : <Btn title="Começar desafio" icone="brush" onPress={() => setDesenhando(true)} />}
      </Card>
      <Mural />
    </>
  );
}

const rostos = () => [c.violetSoft, c.violet, c.violetDark, c.violetDeep];

function Encontro({ m, detalhe }) {
  const s = useStore();
  const nav = useNav();
  const indo = s.comunidades.includes(m.id);
  const e = m.encontro;
  return (
    <Pressable accessible={false} disabled={detalhe} onPress={() => nav.abrir(ComunidadeDetalhe, { m })}>
      <Card style={{ borderColor: c.violetSoft, borderBottomWidth: 6, gap: 6 }}>
        <Rotulo icone={m.icone}>ENCONTRO PRESENCIAL · {m.nome.toUpperCase()}</Rotulo>
        <H>{e.titulo}</H>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 2 }}>
          <Info icone="calendar-blank">{e.dia}</Info>
          <Info icone="clock-outline">{e.hora}</Info>
          <Info icone="map-marker">{e.local}</Info>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            {rostos().map((cor, k) => (
              <View key={cor} style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: cor, borderWidth: 2, borderColor: c.snow, marginLeft: k ? -8 : 0 }} />
            ))}
          </View>
          <T muted>{e.interessados + (indo ? 1 : 0)} alunos interessados</T>
        </View>
        <View style={{ marginTop: 4, alignItems: 'flex-start' }}>
          {indo ? <Feito texto="Você está participando!" /> : <Btn title="Participar" onPress={() => s.participar(m)} />}
        </View>
      </Card>
    </Pressable>
  );
}

function ComunidadeDetalhe({ m }) {
  const s = useStore();
  return (
    <>
      <Card center style={destaque()}>
        <View style={{ width: 80, height: 80, borderRadius: 24, backgroundColor: c.snow, alignItems: 'center', justifyContent: 'center' }}>
          <Icone name={m.icone} size={48} color={c.violet} />
        </View>
        <H>{m.nome}</H>
        <T muted>{m.membros + (s.comunidades.includes(m.id) ? 1 : 0)} participantes</T>
        <T style={{ textAlign: 'center' }}>{m.desc}</T>
      </Card>
      <Encontro m={m} detalhe />
      <Rotulo icone="chat-processing-outline">RECADOS DO GRUPO</Rotulo>
      {m.recados.map((r) => (
        <Card key={r.txt} style={{ gap: 2 }}>
          <T style={{ fontWeight: '800', fontSize: 13 }}>{r.autor}</T>
          <T>{r.txt}</T>
        </Card>
      ))}
      <T muted style={{ fontSize: 12, textAlign: 'center' }}>Os encontros acontecem dentro da escola, com acompanhamento de um adulto.</T>
    </>
  );
}

function Comunidade() {
  const s = useStore();
  const nav = useNav();
  return (
    <>
      <View>
        <H>Comunidade</H>
        <T muted>O Sabiá ajuda você a encontrar sua turma no mundo real.</T>
      </View>

      <Rotulo icone="map-marker">ACONTECENDO HOJE NA ESCOLA</Rotulo>
      {comunidades
        .filter((m) => m.encontro.dia === 'Hoje')
        .map((m) => (
          <Encontro key={m.id} m={m} />
        ))}

      <Rotulo icone="account-group">COMUNIDADES</Rotulo>
      <Card style={{ gap: 0, paddingVertical: 4 }}>
        {comunidades.map((m, i) => (
          <Linha
            key={m.id}
            primeira={i === 0}
            icone={m.icone}
            titulo={m.nome}
            desc={`${m.membros + (s.comunidades.includes(m.id) ? 1 : 0)} participantes${s.comunidades.includes(m.id) ? ' · você participa' : ''}`}
            onPress={() => nav.abrir(ComunidadeDetalhe, { m })}
          />
        ))}
      </Card>

      <Card style={{ paddingVertical: 4 }}>
        <Linha primeira icone="image-multiple" titulo="Mural de desenhos" desc="Veja e curta os desenhos do desafio do dia" onPress={() => nav.abrir(Desafio)} />
      </Card>

      <Rotulo icone="calendar-star">EVENTOS DA ESCOLA</Rotulo>
      {s.eventos.map((e) => (
        <Card key={e.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '800' }}>{e.titulo}</T>
            <T muted style={{ fontSize: 13 }}>{e.periodo} · +{e.bonus} XP</T>
          </View>
          {s.eventosFeitos.includes(e.id) ? <Feito texto="Inscrito" /> : <Btn small title="Participar" onPress={() => s.participarEvento(e)} />}
        </Card>
      ))}
    </>
  );
}

function Notas() {
  return (
    <Card>
      <H small>Notas</H>
      {notas.map((n) => {
        const atual = n.hist[n.hist.length - 1];
        return (
          <View key={n.disc} style={{ gap: 4, marginTop: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T style={{ fontWeight: '700' }}>{n.disc}</T>
              <T style={{ fontWeight: '800', color: c.violet }}>{atual.toFixed(1).replace('.', ',')}</T>
            </View>
            <Bar value={atual} max={10} />
            <T muted style={{ fontSize: 12 }}>Histórico: {n.hist.map((x) => x.toFixed(1).replace('.', ',')).join(' → ')}</T>
          </View>
        );
      })}
    </Card>
  );
}

function Personalizar() {
  const s = useStore();
  const [cat, setCat] = useState(categorias[0]);
  return (
    <>
      <Card center style={destaque()}>
        <Sabia size={230} equip={s.equip} anim="idle2" />
        <T muted>Nível {s.nivel.n} · toque em um item para vestir</T>
      </Card>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {categorias.map((k) => (
          <Pressable key={k} onPress={() => setCat(k)} accessibilityRole="tab" accessibilityLabel={k} accessibilityState={{ selected: cat === k }} style={{ paddingHorizontal: 14, paddingVertical: 8, minHeight: 44, justifyContent: 'center', borderRadius: 16, borderWidth: 2, borderColor: cat === k ? c.violet : c.line, backgroundColor: cat === k ? c.violet : c.snow }}>
            <Text allowFontScaling style={{ fontFamily: f.extra, fontSize: 12, color: cat === k ? c.snow : c.slate }}>{k}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 }}>
        {itens
          .filter((it) => it.cat === cat)
          .map((it) => {
            const livre = s.nivel.n >= it.nivel;
            const usando = s.equip[it.slot] === it.id;
            const cor = livre ? c.violet : c.slate;
            return (
              <Pressable
                key={it.id}
                disabled={!livre}
                onPress={() => s.vestir(it)}
                accessibilityRole="button"
                accessibilityLabel={`${it.nome}, ${usando ? 'usando' : livre ? 'disponível' : `bloqueado até o nível ${it.nivel}`}`}
                accessibilityState={{ disabled: !livre, selected: usando }}
                style={{ width: '48%', alignItems: 'center', gap: 4, padding: 12, borderRadius: 16, borderWidth: 2, borderColor: usando ? c.violet : c.line, backgroundColor: usando ? c.violetMist : c.snow, opacity: livre ? 1 : 0.6 }}
              >
                <Icone name={it.icone} size={44} color={livre ? it.cor : c.hare} />
                <T style={{ fontWeight: '800', fontSize: 14, textAlign: 'center' }}>{it.nome}</T>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Icone name={livre ? 'check' : 'lock'} size={14} color={cor} />
                  <T style={{ fontWeight: '700', fontSize: 12, color: cor }}>{usando ? 'Usando' : livre ? 'Disponível' : `Nível ${it.nivel}`}</T>
                </View>
              </Pressable>
            );
          })}
      </View>

      <Card style={[destaque(), { flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
        <Anim nome="cores" size={90} />
        <View style={{ flex: 1 }}>
          <Rotulo icone="lock">NÍVEL 12</Rotulo>
          <H small>Cores especiais</H>
          <T muted style={{ fontSize: 13 }}>Pinte as penas do seu Sabiá com cores novas.</T>
        </View>
      </Card>
    </>
  );
}

function Perfil() {
  const s = useStore();
  const nav = useNav();
  const { n, min, prox } = s.nivel;
  return (
    <>
      <Card center style={destaque()}>
        <Sabia size={200} equip={s.equip} anim="idle2" />
        <H>{ALUNO.nome}</H>
        <T muted>{ALUNO.turma} · Sabiá nível {n} · {s.xp} XP</T>
        <Bar value={s.xp - min} max={prox - min} />
        <Btn icone="tshirt-crew" title="Personalizar Sabiá" onPress={() => nav.abrir(Personalizar)} />
      </Card>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Stat valor={Object.keys(s.feitas).length} label="atividades" />
        <Stat valor={s.comunidades.length} label="encontros" />
        <Stat valor={s.desenho ? 1 : 0} label="desafios" />
      </View>

      <Notas />

      <Card style={{ gap: 0, paddingVertical: 4 }}>
        <Linha primeira icone="bullhorn" titulo="Avisos" desc={`${avisos.length - s.lidos.length} não lidos`} onPress={() => nav.abrir(Avisos)} />
      </Card>

      <Card center style={{ backgroundColor: c.violetDeep, borderColor: c.violetDeep }}>
        <T style={{ color: c.violetSoft, textAlign: 'center' }}>Com o Sabiá, o celular serve para</T>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {['APRENDER', 'PARTICIPAR', 'CRIAR', 'CONVIVER', 'CUIDAR'].map((p) => (
            <View key={p} style={{ backgroundColor: c.violet, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontFamily: f.extra, fontSize: 12, color: c.snow }}>{p}</Text>
            </View>
          ))}
        </View>
      </Card>
    </>
  );
}

function Respiracao({ onFim }) {
  const s = useStore();
  const fases = ['Inspire', 'Segure', 'Expire', 'Segure'];
  const [fase, setFase] = useState(0);
  const [reducaoSistema, setReducaoSistema] = useState(false);
  const escala = useRef(new Animated.Value(0.5)).current;
  const reduzirMovimento = s.modoConforto || reducaoSistema;
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReducaoSistema);
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReducaoSistema);
    return () => sub.remove();
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setFase((fase + 1) % 4), 4000);
    return () => clearTimeout(t);
  }, [fase]);
  useEffect(() => {
    if (reduzirMovimento) {
      escala.setValue(1);
      return undefined;
    }
    Animated.timing(escala, { toValue: [1, 1, 0.5, 0.5][fase], duration: 4000, useNativeDriver: true }).start();
    return undefined;
  }, [fase, reduzirMovimento]);
  return (
    <Card center style={{ paddingVertical: 24, gap: 20 }}>
      <H>Respiração quadrada</H>
      <View style={{ width: 220, height: 220, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: c.violetSoft, transform: [{ scale: escala }] }} />
        <Text style={{ fontSize: 28, fontFamily: f.titulo, color: c.violetDeep }}>{fases[fase]}</Text>
      </View>
      <T muted style={{ textAlign: 'center' }}>{reduzirMovimento ? 'Siga seu próprio ritmo.' : '4 segundos em cada fase. Repita algumas vezes.'}</T>
      <Btn title="Terminar" onPress={onFim} />
    </Card>
  );
}

// fichas de perguntas e respostas livres: [pergunta, exemplo]
const fichas = {
  pensamentos: [
    ['O que aconteceu?', 'Ex.: fui mal na prova'],
    ['O que você pensou na hora?', 'Ex.: eu nunca vou aprender isso'],
    ['Existe outro jeito de ver essa situação?', 'Ex.: posso pedir ajuda e estudar de outro jeito'],
  ],
  plano: [
    ['Que hábito ou comportamento quero transformar?', 'Ex.: ficar no celular antes de dormir'],
    ['Por que é importante para mim mudar isso?', 'Ex.: acordo cansado e perco a primeira aula'],
    ['O que posso ganhar se mudar esse comportamento?', 'Ex.: mais energia e atenção na escola'],
    ['Quais são os primeiros passos para começar?', 'Ex.: deixar o celular longe da cama às 22h'],
    ['Que obstáculos podem surgir e como passar por eles?', 'Ex.: vontade de ver só mais um vídeo; pôr um alarme'],
    ['Como vou acompanhar meu progresso?', 'Ex.: marcar no calendário os dias em que consegui'],
  ],
};

function Ficha({ titulo, perguntas, onFim }) {
  return (
    <Card>
      <H>{titulo}</H>
      <T muted>Só você vê este registro.</T>
      {perguntas.map(([p, ex]) => (
        <View key={p} style={{ gap: 8 }}>
          <T style={{ fontWeight: '700' }}>{p}</T>
          <Campo label={p} multiline placeholder={ex} />
        </View>
      ))}
      <Btn title="Guardar" onPress={onFim} />
    </Card>
  );
}

const emocoes = [
  { nome: 'Alegria', icone: 'emoticon-happy-outline' },
  { nome: 'Raiva', icone: 'emoticon-angry-outline' },
  { nome: 'Nojo', icone: 'emoticon-sick-outline' },
  { nome: 'Tristeza', icone: 'emoticon-cry-outline' },
  { nome: 'Medo', icone: 'emoticon-frown-outline' },
];

function Emocoes({ onFim }) {
  const [linhas, setLinhas] = useState([{ txt: '', em: [] }]);
  const mudar = (k, m) => setLinhas((l) => l.map((x, j) => (j === k ? { ...x, ...m } : x)));
  const marcar = (k, e) => mudar(k, { em: linhas[k].em.includes(e) ? linhas[k].em.filter((x) => x !== e) : [...linhas[k].em, e] });
  return (
    <Card>
      <H>Minhas emoções</H>
      <T muted>Escreva o que você fez ou o que aconteceu e marque o que sentiu. Pode marcar mais de uma.</T>
      {linhas.map((l, k) => (
        <View key={k} style={{ gap: 8, paddingTop: k ? 12 : 0, borderTopWidth: k ? 2 : 0, borderColor: c.line }}>
          <Campo label="O que aconteceu ou o que você fez?" value={l.txt} onChangeText={(txt) => mudar(k, { txt })} placeholder="Ex.: apresentei um trabalho na frente da turma" />
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {emocoes.map((e) => {
              const on = l.em.includes(e.nome);
              return (
                <Pressable
                  key={e.nome}
                  onPress={() => marcar(k, e.nome)}
                  accessibilityRole="checkbox"
                  accessibilityLabel={e.nome}
                  accessibilityState={{ checked: on }}
                  style={{ flex: 1, alignItems: 'center', paddingVertical: 6, borderRadius: 12, borderWidth: 2, borderColor: on ? c.violet : c.line, backgroundColor: on ? c.violetMist : c.snow }}
                >
                  <Icone accessible={false} name={e.icone} size={28} color={on ? c.violet : c.slate} />
                  <Text allowFontScaling style={{ fontFamily: f.extra, fontSize: 11, color: on ? c.violet : c.slate }}>{e.nome}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <Btn title="Outro momento" icone="plus" color={c.violetDeep} onPress={() => setLinhas([...linhas, { txt: '', em: [] }])} />
      <Btn title="Guardar" disabled={!linhas.some((l) => l.txt.trim() && l.em.length)} onPress={onFim} />
    </Card>
  );
}

function Pratica({ id }) {
  const s = useStore();
  const nav = useNav();
  const [ok, setOk] = useState(false);
  const p = praticas.find((x) => x.id === id);
  const fim = () => {
    s.concluirPratica(id);
    setOk(true);
  };
  if (ok) {
    return (
      <Card center style={[destaque(), { paddingVertical: 24 }]}>
        <Anim nome="feliz" size={160} />
        <H>Prática concluída</H>
        <T muted style={{ textAlign: 'center' }}>Cuidar de como você se sente também é aprender.</T>
        <Btn title="Voltar" onPress={nav.voltar} />
      </Card>
    );
  }
  if (id === 'respirar') return <Respiracao onFim={fim} />;
  if (id === 'emocoes') return <Emocoes onFim={fim} />;
  return <Ficha titulo={p.titulo} perguntas={fichas[id]} onFim={fim} />;
}

function CanalAnonimo({ onFim }) {
  const s = useStore();
  const [txt, setTxt] = useState('');
  return (
    <Card>
      <H>Canal anônimo</H>
      <T muted>Escreva o que estiver sentindo. Sua mensagem não é associada ao seu nome.</T>
      <Campo label="Como você está?" multiline value={txt} onChangeText={setTxt} placeholder="Como você está?" />
      <Btn title="Enviar anonimamente" disabled={!txt.trim()} onPress={() => { s.enviarAnonimo(txt.trim()); setTxt(''); }} />
      {s.mensagens.map((m, i) => (
        <View key={i} style={{ backgroundColor: c.violetMist, borderRadius: 12, padding: 12, gap: 4 }}>
          <T>{m}</T>
          <T muted style={{ fontSize: 12 }}>Enviada sem identificação</T>
        </View>
      ))}
      <Btn title="Voltar" color={c.slate} onPress={onFim} />
    </Card>
  );
}

// i = posição em `humores` (mock.js), que alimenta o painel agregado da gestão
const humoresAluno = [
  { icone: 'emoticon-happy-outline', nome: 'Bem', i: 3 },
  { icone: 'emoticon-neutral-outline', nome: 'Normal', i: 2 },
  { icone: 'emoticon-sad-outline', nome: 'Não muito bem', i: 1 },
];

function BemEstar() {
  const s = useStore();
  const nav = useNav();
  const doDia = praticaDoDia();
  return (
    <>
      <View>
        <H>Bem-estar</H>
        <T muted>Atividades rápidas para entender e cuidar do que você sente.</T>
      </View>

      <Card style={[destaque(), { gap: 12 }]}>
        <Rotulo icone="brain">COMO VOCÊ ESTÁ HOJE?</Rotulo>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {humoresAluno.map((h) => {
            const ativo = s.humorHoje === h.i;
            return (
              <Pressable
                key={h.nome}
                onPress={() => s.registrarHumor(h.i)}
                accessibilityRole="radio"
                accessibilityLabel={h.nome}
                accessibilityState={{ checked: ativo }}
                style={{ flex: 1, alignItems: 'center', gap: 2, paddingVertical: 10, minHeight: 72, borderRadius: 12, borderWidth: 2, borderColor: ativo ? c.violet : 'transparent', backgroundColor: ativo ? c.snow : 'transparent' }}
              >
                <Icone accessible={false} name={h.icone} size={40} color={ativo ? c.violet : c.slate} />
                <T style={{ fontWeight: '700', fontSize: 13, textAlign: 'center' }}>{h.nome}</T>
              </Pressable>
            );
          })}
        </View>
        {s.humorHoje != null && (
          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <H small>Obrigado por compartilhar</H>
              <Icone name="heart" size={20} color={c.violet} />
            </View>
            <T>Quer fazer a prática do dia? {doDia.titulo}.</T>
            <View style={{ alignItems: 'flex-start' }}>
              <Btn title="Começar" icone={doDia.icone} onPress={() => nav.abrir(Pratica, { id: doDia.id })} />
            </View>
            <T muted style={{ fontSize: 12 }}>Registrado sem identificação.</T>
          </View>
        )}
      </Card>

      <Rotulo icone="brain">PRÁTICAS</Rotulo>
      <Card style={{ gap: 0, paddingVertical: 4 }}>
        {praticas.map((p, i) => (
          <Linha
            key={p.id}
            primeira={i === 0}
            icone={p.icone}
            titulo={p.id === doDia.id ? `${p.titulo} · do dia` : p.titulo}
            desc={s.praticas.includes(p.id) ? 'Feita hoje' : p.desc}
            onPress={() => nav.abrir(Pratica, { id: p.id })}
          />
        ))}
      </Card>

      <Card style={{ paddingVertical: 4 }}>
        <Linha primeira icone="message-lock-outline" titulo="Canal anônimo" desc="Escreva sem se identificar" onPress={() => nav.abrir(CanalAnonimo, { onFim: nav.voltar })} />
      </Card>

      <Card style={{ flexDirection: 'row', gap: 10 }}>
        <Icone name="information-outline" size={20} color={c.violet} />
        <T style={{ flex: 1, fontSize: 13 }}>
          O Sabiá não é terapeuta e não substitui acompanhamento profissional. Se precisar, fale com a coordenação ou um adulto de confiança. Em momentos difíceis, ligue 188 (CVV).
        </T>
      </Card>
    </>
  );
}

// "+30 XP" que aparece por cima das abas sempre que o aluno ganha experiência
function Toast() {
  const s = useStore();
  const k = s.toast?.k;
  useEffect(() => {
    if (!k) return;
    AccessibilityInfo.announceForAccessibility(`Mais ${s.toast.n} pontos de experiência. ${s.toast.msg}`);
    const t = setTimeout(s.fecharToast, 2500);
    return () => clearTimeout(t);
  }, [k]);
  if (!s.toast) return null;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 16, right: 16, bottom: 90, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 16, backgroundColor: c.violetDeep }}>
      <Icone accessible={false} name="star-four-points" size={24} color={c.violetSoft} />
      <Text allowFontScaling style={{ fontFamily: f.tituloExtra, fontSize: 24, lineHeight: 30, color: c.snow }}>+{s.toast.n} XP</Text>
      <T style={{ flex: 1, fontSize: 14, color: c.violetMist }}>{s.toast.msg}</T>
    </View>
  );
}

function Recompensa() {
  const s = useStore();
  useEffect(() => {
    if (s.recompensa) AccessibilityInfo.announceForAccessibility(`Novo nível. Sabiá nível ${s.recompensa}.`);
  }, [s.recompensa]);
  if (!s.recompensa) return null;
  const novos = itens.filter((it) => it.nivel === s.recompensa);
  return (
    <Modal transparent animationType={s.modoConforto ? 'none' : 'fade'} visible onRequestClose={s.fecharRecompensa}>
      <View accessibilityViewIsModal style={{ flex: 1, justifyContent: 'center', padding: 24, backgroundColor: 'rgba(3,0,33,0.6)' }}>
        <Card center style={[destaque(), { width: '100%', maxWidth: 400, alignSelf: 'center', gap: 10 }]}>
          <Rotulo icone="party-popper">NOVO NÍVEL!</Rotulo>
          <Anim nome="cosmeticos" size={170} />
          <H>Sabiá — Nível {s.recompensa}</H>
          {novos.length > 0 && <T muted>Nova recompensa desbloqueada:</T>}
          {novos.map((it) => (
            <View key={it.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'stretch', padding: 10, borderRadius: 12, backgroundColor: c.snow }}>
              <Icone name={it.icone} size={32} color={it.cor} />
              <T style={{ flex: 1, fontWeight: '800' }}>{it.nome}</T>
              <Btn
                small
                title="Equipar"
                onPress={() => {
                  s.equipar(it);
                  s.fecharRecompensa();
                }}
              />
            </View>
          ))}
          <Btn title="Continuar" color={c.slate} onPress={s.fecharRecompensa} style={{ alignSelf: 'stretch' }} />
        </Card>
      </View>
    </Modal>
  );
}

export default function AppAluno() {
  return (
    <Shell
      perfil={`${ALUNO.nome} · ${ALUNO.turma}`}
      tabs={[
        { key: 'Início', icone: 'home-variant-outline', Tela: Inicio },
        { key: 'Aprender', icone: 'book-open-variant', Tela: Aprender },
        { key: 'Comunidade', icone: 'account-group-outline', Tela: Comunidade },
        { key: 'Bem-estar', icone: 'brain', Tela: BemEstar },
        { key: 'Perfil', icone: 'account-circle-outline', Tela: Perfil },
      ]}
    >
      <Toast />
      <Recompensa />
    </Shell>
  );
}
