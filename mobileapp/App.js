import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Baloo2_700Bold, Baloo2_800ExtraBold } from '@expo-google-fonts/baloo-2';
import { Nunito_500Medium, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Image, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Anim, Btn, c, ModoConforto, setPalette, Store, T } from './ui';
import { atividadesIniciais, eventosIniciais, hojeBR, nivel, proximoProtocolo, relatosIniciais, slides, TOTAL_TURMA } from './mock';
import AppAluno from './aluno';
import AppProfessor from './professor';
import AppGestao from './gestao';

const XP_INICIAL = 840;

// ponytail: estado só em memória e compartilhado num único aparelho; troca por API (Spring) quando houver backend
function useSabia() {
  const [perfil, setPerfil] = useState(null);
  const [xp, setXp] = useState(XP_INICIAL);
  const [nivelVisto, setNivelVisto] = useState(nivel(XP_INICIAL).n);
  const [toast, setToast] = useState(null);
  const [equip, setEquip] = useState({});
  const [params, setParams] = useState({ participacao: 20, acerto: 10, meta: 75 });
  const [atividades, setAtividades] = useState(atividadesIniciais);
  const [feitas, setFeitas] = useState({});
  const [eventos, setEventos] = useState(eventosIniciais);
  const [eventosFeitos, setEventosFeitos] = useState([]);
  const [live, setLive] = useState({ slide: 0, aberta: false, respostas: [], simulados: 0 });
  const [respondidas, setRespondidas] = useState({});
  const [humorHoje, setHumorHoje] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [desenho, setDesenho] = useState(null);
  const [lidos, setLidos] = useState([]);
  const [praticas, setPraticas] = useState([]);
  const [modoConforto, setModoConforto] = useState(false);
  const [relatos, setRelatos] = useState(relatosIniciais);

  // A paleta principal só muda quando o usuário opta pelo Modo Conforto.
  setPalette(modoConforto);

  // colegas fictícios respondendo aos poucos enquanto a pergunta está aberta
  useEffect(() => {
    if (!live.aberta) return;
    const sl = slides[live.slide];
    const t = setInterval(() => {
      setLive((l) => {
        if (l.simulados >= TOTAL_TURMA - 1) return l;
        const chute = sl.certa != null && Math.random() < 0.6 ? sl.certa : Math.floor(Math.random() * sl.opcoes.length);
        return { ...l, respostas: [...l.respostas, chute], simulados: l.simulados + 1 };
      });
    }, 500);
    return () => clearInterval(t);
  }, [live.aberta, live.slide]);

  const ganhar = (n, msg = 'Seu Sabiá está evoluindo!') => {
    setXp((x) => x + n);
    setToast({ n, msg, k: Date.now() });
  };
  const nv = nivel(xp);

  return {
    perfil, entrar: setPerfil, sair: () => setPerfil(null), modoConforto,
    alternarModoConforto: () => setModoConforto((v) => !v),
    xp, nivel: nv, equip, params, setParams, atividades, feitas, eventos, eventosFeitos,
    live, respondidas, humorHoje, mensagens, comunidades, desenho, lidos, praticas, toast, relatos,

    fecharToast: () => setToast(null),
    // nível novo ainda não comemorado abre o modal de recompensa
    recompensa: nv.n > nivelVisto ? nv.n : null,
    fecharRecompensa: () => setNivelVisto(nv.n),
    vestir: (it) => setEquip((e) => ({ ...e, [it.slot]: e[it.slot] === it.id ? undefined : it.id })),
    equipar: (it) => setEquip((e) => ({ ...e, [it.slot]: it.id })),

    responder: (i) => {
      if (live.slide in respondidas) return;
      setRespondidas({ ...respondidas, [live.slide]: i });
      setLive((l) => ({ ...l, respostas: [...l.respostas, i] }));
      ganhar(params.participacao + (slides[live.slide].certa === i ? params.acerto : 0), 'Participação na aula ao vivo!');
    },
    concluir: (id, acertos) => {
      if (id in feitas) return;
      setFeitas({ ...feitas, [id]: acertos });
      ganhar(params.participacao + acertos * params.acerto, 'Atividade concluída! Seu Sabiá ganhou experiência!');
    },
    participarEvento: (e) => {
      if (eventosFeitos.includes(e.id)) return;
      setEventosFeitos([...eventosFeitos, e.id]);
      ganhar(e.bonus, 'Inscrição no evento confirmada!');
    },
    participar: (m) => {
      if (comunidades.includes(m.id)) return;
      setComunidades([...comunidades, m.id]);
      ganhar(20, 'Encontro confirmado! Nos vemos lá.');
    },
    enviarDesenho: (pontos) => {
      if (desenho) return;
      setDesenho(pontos);
      ganhar(30, 'Desafio concluído! Seu desenho está no mural.');
    },
    concluirPratica: (id) => {
      if (praticas.includes(id)) return;
      setPraticas([...praticas, id]);
      ganhar(15, 'Cuidar de como você se sente também conta!');
    },
    lerAviso: (id) => setLidos((l) => (l.includes(id) ? l : [...l, id])),

    irSlide: (n) => setLive({ slide: n, aberta: false, respostas: [], simulados: 0 }),
    abrirPergunta: () => setLive((l) => ({ ...l, aberta: true })),
    fecharPergunta: () => setLive((l) => ({ ...l, aberta: false })),
    criarAtividade: (a) => setAtividades([{ ...a, id: Date.now(), concluiram: 0 }, ...atividades]),
    criarEvento: (e) => setEventos([{ ...e, id: Date.now() }, ...eventos]),

    registrarHumor: setHumorHoje,
    enviarAnonimo: (m) => setMensagens([m, ...mensagens]),

    // Central de Proteção: protocolo segue o maior já usado; nada sai do aparelho (demo).
    enviarRelato: (dados) => {
      const data = hojeBR();
      const novo = {
        ...dados,
        protocolo: proximoProtocolo(relatos, data),
        data,
        meu: true,
        status: 'Recebido',
        historico: [{ quando: data.slice(0, 5), status: 'Recebido', texto: dados.anonimo ? 'Relato anônimo recebido.' : 'O estudante enviou um novo relato.' }],
      };
      setRelatos([novo, ...relatos]);
      return novo;
    },
    registrarAcao: (protocolo, status, texto) =>
      setRelatos((l) =>
        l.map((r) =>
          r.protocolo === protocolo
            ? { ...r, status: status || r.status, historico: [...r.historico, { quando: hojeBR().slice(0, 5), status: status || r.status, texto }] }
            : r,
        ),
      ),
  };
}

export default function App() {
  const s = useSabia();
  const [fontes] = useFonts({ Baloo2_700Bold, Baloo2_800ExtraBold, Nunito_500Medium, Nunito_700Bold, Nunito_800ExtraBold });
  // abertura: deixa o vídeo do sabiá voando tocar uma vez antes de liberar o app
  const [abrindo, setAbrindo] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setAbrindo(false), 3000);
    AccessibilityInfo.isReduceMotionEnabled().then((reduzido) => reduzido && setAbrindo(false));
    return () => clearTimeout(t);
  }, []);
  if (!fontes || abrindo) {
    return (
      <View style={{ flex: 1, backgroundColor: c.violetMist, alignItems: 'center', justifyContent: 'center' }}>
        <Anim nome="voando" size={240} />
      </View>
    );
  }
  const Tela = { aluno: AppAluno, professor: AppProfessor, gestao: AppGestao }[s.perfil];
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Store.Provider value={s}>
        {Tela ? (
          <Tela />
        ) : (
          <SafeAreaView style={{ flex: 1, backgroundColor: c.violetMist }}>
            <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12, maxWidth: 420, width: '100%', alignSelf: 'center' }}>
              <Image accessibilityRole="image" accessibilityLabel="Logo Sabiaa" source={require('./assets/logo.png')} style={{ width: 220, height: 70, alignSelf: 'center' }} resizeMode="contain" />
              <Anim nome="feliz" size={200} style={{ alignSelf: 'center' }} />
              <T muted style={{ textAlign: 'center', marginBottom: 8 }}>Escolha como você quer entrar</T>
              <ModoConforto />
              <Btn icone="bag-personal-outline" title="Sou aluno" onPress={() => s.entrar('aluno')} />
              <Btn icone="human-male-board" title="Sou professor" color={c.sky} onPress={() => s.entrar('professor')} />
              <Btn icone="domain" title="Gestão escolar" color={c.mint} onPress={() => s.entrar('gestao')} />
              <T muted style={{ textAlign: 'center', fontSize: 12, marginTop: 8 }}>Versão de demonstração com dados fictícios</T>
            </View>
          </SafeAreaView>
        )}
      </Store.Provider>
    </SafeAreaProvider>
  );
}
