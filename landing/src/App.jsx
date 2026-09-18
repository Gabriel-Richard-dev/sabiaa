import {
  Award,
  Backpack,
  BookOpen,
  Brain,
  ChartColumn,
  Check,
  Container,
  Download,
  Globe,
  GraduationCap,
  HeartPulse,
  Landmark,
  Lightbulb,
  Lock,
  MapPin,
  Megaphone,
  MessageCircle,
  Palette,
  Presentation,
  School,
  ShieldCheck,
  Smartphone,
  Smile,
  Sparkles,
  Target,
  Users,
  House,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { BlurFade, NumberTicker, Nuvens, ShimmerButton, LoopVideo } from './magic'
import Painel from './Painel'

const STATS = [
  { n: 83, t: 'dos estudantes dizem prestar mais atenção às aulas depois da restrição do celular.', c: 'bg-mint-soft' },
  { n: 44, t: 'relatam sentir mais tédio nos intervalos e no recreio.', c: 'bg-amber-soft' },
  { n: 49, t: 'dos professores perceberam aumento da ansiedade entre os estudantes.', c: 'bg-coral-soft' },
]

const EIXOS = [
  { Icone: BookOpen, nome: 'Aprendizagem' },
  { Icone: Users, nome: 'Colaboração' },
  { Icone: Lightbulb, nome: 'Criatividade' },
  { Icone: Smile, nome: 'Bem-estar' },
]

const PILARES = [
  {
    Icone: Target,
    cor: 'bg-violet-mist',
    titulo: 'Atenção sem proibição',
    texto: 'O celular vira ferramenta de aprendizagem, colaboração e criatividade, em vez de um aparelho confiscado na entrada.',
  },
  {
    Icone: Award,
    cor: 'bg-amber-soft',
    titulo: 'Recompensas que engajam',
    texto: 'Sistema de benefícios gamificado: o aluno ganha por usar bem o tempo, não por ficar sem o aparelho.',
  },
  {
    Icone: HeartPulse,
    cor: 'bg-mint-soft',
    titulo: 'Relatórios de saúde com IA',
    texto: 'Leitura acompanhada do bem-estar do estudante, com atividades de terapia cognitivo-comportamental.',
  },
]

const PERFIS = [
  {
    Icone: Backpack,
    nome: 'Aluno',
    cor: 'bg-violet',
    itens: ['Sabiá que evolui com a participação', 'Notas e progresso por disciplina', 'Atividades e aulas interativas', 'Bem-estar e comunidades'],
  },
  {
    Icone: GraduationCap,
    nome: 'Professor',
    cor: 'bg-sky',
    itens: ['Turmas e participação', 'Slides interativos em tempo real', 'Criação de atividades extras', 'Acompanhamento das respostas'],
  },
  {
    Icone: ChartColumn,
    nome: 'Gestão',
    cor: 'bg-violet-deep',
    itens: ['Painel com indicadores agregados', 'Progresso das turmas', 'Eventos da escola', 'Parâmetros de pontuação e metas'],
  },
]

const FLUXO_AULA = [
  'Professor inicia a aula',
  'Libera uma pergunta no slide',
  'Alunos respondem pelo celular',
  'Professor vê as respostas na hora',
  'Participação vira XP e indicador',
]

const HUB = [
  {
    Icone: Megaphone,
    cor: 'bg-coral-soft',
    titulo: 'Avisos da escola',
    texto: 'Mudança de horário, entrega de trabalho, Feira de Ciências, Interclasse: tudo num painel só, por categoria.',
  },
  {
    Icone: Palette,
    cor: 'bg-amber-soft',
    titulo: 'Desafio do dia',
    texto: '"Desenhe algo que te faz feliz." Os desenhos da turma vão para um mural coletivo.',
  },
  {
    Icone: MapPin,
    cor: 'bg-mint-soft',
    titulo: 'Comunidades presenciais',
    texto: 'Xadrez no intervalo, clube de desenho, futebol: o app ajuda os alunos a se encontrarem no mundo real.',
  },
  {
    Icone: MessageCircle,
    cor: 'bg-sky-soft',
    titulo: 'Ajuda do Sabiá',
    texto: 'IA como tutora nas atividades: não entrega a resposta, guia o aluno por partes até ele chegar lá.',
  },
  {
    Icone: Brain,
    cor: 'bg-violet-mist',
    titulo: 'Como você está hoje?',
    texto: 'Check-in de humor e canal anônimo, com atividades rápidas de autorregulação baseadas em TCC.',
  },
]

const CUIDADOS = [
  'A IA não substitui professores nem psicólogos, e não diagnostica estudantes.',
  'Análises automatizadas são sempre identificadas como tal.',
  'Atividades de bem-estar validadas com profissionais antes de ir para a escola.',
  'LGPD, acesso por perfil e relatórios agregados sempre que possível.',
  'Pontuação nunca é o único indicador de aprendizagem.',
  'O professor decide quando e como o celular é usado em sala.',
]

const ROADMAP = [
  { fase: 'Hackathon', texto: 'Protótipo funcional: aluno, Sabiá, aula interativa, professor e painel.' },
  { fase: 'Validação', texto: 'Conversar com professores, estudantes e gestores; refinar gamificação e atividades.' },
  { fase: 'Especialistas', texto: 'Validar o bem-estar com profissionais de saúde, privacidade e as análises de IA.' },
  { fase: 'Piloto', texto: 'Implantar em uma escola e medir adesão, participação e impacto percebido.' },
  { fase: 'Escala', texto: 'Expandir para redes municipais e estaduais, integrando sistemas existentes.' },
]

const AGENTES = [
  { Icone: Backpack, nome: 'Alunos', papel: 'Foco do projeto. Interagem com a plataforma e participam das atividades propostas.', cor: 'bg-violet' },
  { Icone: School, nome: 'Escolas e professores', papel: 'Integram o Sabiaa à rotina escolar, acompanham indicadores agregados da turma e apoiam estratégias pedagógicas e de bem-estar.', cor: 'bg-sky' },
  { Icone: House, nome: 'Famílias', papel: 'Acompanham indicadores de bem-estar e engajamento, recebem orientações e ajudam a construir hábitos digitais mais saudáveis.', cor: 'bg-amber' },
  { Icone: Landmark, nome: 'Governo', papel: 'Apoia a implementação em escala, financia ou contrata a solução e usa indicadores agregados para orientar políticas públicas.', cor: 'bg-violet-deep' },
]

const PASSOS = [
  'Toque em "Baixar APK" pelo celular Android.',
  'Abra o arquivo e permita instalar apps desta fonte, se o Android pedir.',
  'Abra o Sabiaa e escolha seu perfil: aluno, professor ou gestão.',
]

const STACK = [
  {
    Icone: Smartphone,
    cor: 'bg-violet',
    nome: 'App mobile',
    itens: ['React Native 0.86 + Expo SDK 57', 'React 19.2', 'react-native-web para a versão web', 'expo-video, expo-font e @expo/vector-icons', 'Estado no próprio React, dados mockados', 'APK via expo prebuild + Gradle'],
  },
  {
    Icone: Globe,
    cor: 'bg-sky',
    nome: 'Landing page',
    itens: ['React 19.2 + Vite 8', 'Tailwind CSS 4', 'motion para animações', 'lucide-react para ícones', 'oxlint para lint', 'ffmpeg-static para os vídeos em loop'],
  },
  {
    Icone: Container,
    cor: 'bg-violet-deep',
    nome: 'Infra',
    itens: ['Docker multi-stage', 'node:22-alpine gera o build', 'nginx:alpine serve os arquivos', 'Docker Compose'],
  },
]

const TIME = ['Camila Azevedo', 'Juan Pedro', 'Gabriel Richard', 'Mariana Holanda']

function BaixarApp({ className = '' }) {
  return (
    <a href="/sabiaa.apk" download="sabiaa.apk" className={`btn-pilula gap-2 bg-violet-deep text-white ${className}`}>
      <Download className="size-5" strokeWidth={2.5} /> Baixar APK
    </a>
  )
}

function Botao({ href, children, variante = 'violeta' }) {
  const estilos = {
    violeta: 'bg-violet text-white',
    azul: 'bg-sky text-white',
    branco: 'bg-white text-ink border-2 border-line',
  }
  return (
    <a href={href} className={`btn-pilula ${estilos[variante]}`}>
      {children}
    </a>
  )
}

function perfilDaHash() {
  if (window.location.hash === '#painel-professor') return 'professor'
  if (window.location.hash === '#painel-gestao') return 'gestao'
  return null
}

function Onda({ className }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 h-8 w-full sm:h-12 ${className}`}
    >
      <path d="M0 48V24C120 0 240 0 360 24S600 48 720 24 960 0 1080 24 1320 48 1440 24V48Z" />
    </svg>
  )
}

// classes literais: o Tailwind só gera a cor se enxergar a classe inteira no código.
// fill é herdado pelas ondas; ícones lucide não são afetados (definem fill="none")
const CORES = {
  mist: 'bg-mist fill-mist',
  'violet-mist': 'bg-violet-mist fill-violet-mist',
}

// seções coloridas ganham ondas nas bordas
function Secao({ id, children, cor }) {
  return (
    <section id={id} className={`relative px-6 py-20 sm:py-28 ${CORES[cor] ?? ''}`}>
      {cor && <Onda className="bottom-[calc(100%-1px)]" />}
      <div className="mx-auto max-w-5xl">{children}</div>
      {cor && <Onda className="top-[calc(100%-1px)] rotate-180" />}
    </section>
  )
}

function Titulo({ children, sub }) {
  return (
    <header className="mb-12 text-center">
      <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{children}</h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-slate">{sub}</p>}
    </header>
  )
}

export default function App() {
  const [painel, setPainel] = useState(perfilDaHash)

  useEffect(() => {
    const atualizar = () => setPainel(perfilDaHash())
    window.addEventListener('hashchange', atualizar)
    return () => window.removeEventListener('hashchange', atualizar)
  }, [])

  if (painel) return <Painel perfil={painel} />

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-violet-deep">
        Pular para o conteúdo principal
      </a>
      {/* Hero */}
      <header id="topo" className="relative overflow-hidden px-6 pt-8 pb-16 sm:pt-16 sm:pb-20">
        <Nuvens />
        <div className="relative mx-auto grid max-w-5xl items-center gap-4 sm:grid-cols-2 sm:gap-12">
          <div className="text-center sm:text-left">
            <img src="/media/logooficial.svg" alt="Sabiaa" className="mx-auto mb-5 h-9 w-auto sm:mx-0 sm:mb-8 sm:h-10" />
            <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              O celular não precisa ser <span className="text-violet">o inimigo</span> da sala de aula.
            </h1>
            <p className="mt-4 text-lg font-semibold text-slate sm:mt-6 sm:text-xl">
              Aprendizado e bem-estar com IA, para escolas que querem ir além da proibição.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 sm:justify-start sm:gap-4">
              <ShimmerButton href="#baixar" className="bg-violet text-white">
                <span className="flex items-center gap-2"><Download className="size-5" strokeWidth={2.5} /> Baixar o app</span>
              </ShimmerButton>
              <Botao href="#proposta" variante="branco">Ver a proposta</Botao>
            </div>
          </div>
          {/* no mobile o Sabiá vem antes do texto, menor, para caber acima da dobra */}
          <LoopVideo
            src="/media/flying.mp4"
            loopStart={2}
            className="order-first mx-auto w-44 rounded-3xl sm:order-none sm:w-full sm:max-w-sm"
          />
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
      {/* Problema + dados */}
      <Secao id="problema" cor="mist">
        <Titulo sub="A resposta atual é uma só: proibir. A atenção melhora, mas o tédio e a ansiedade aparecem no lugar.">
          Proibir resolve metade do problema
        </Titulo>
        <div className="grid gap-6 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <BlurFade key={s.n} delay={i * 0.12} className={`rounded-2xl border-2 border-line p-6 ${s.c}`}>
              <NumberTicker value={s.n} suffix="%" className="font-display text-4xl font-extrabold" />
              <p className="mt-3 font-semibold leading-snug">{s.t}</p>
            </BlurFade>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm font-semibold text-slate">
          Pesquisa da Frente Parlamentar Mista da Educação (FPME) em parceria com o Equidade.info
          (Lemann Center, Stanford GSE), realizada entre maio e julho de 2025 com 2.840 estudantes,
          348 professores e 201 gestores, em escolas públicas e privadas de todas as regiões do
          Brasil. Margens de erro: ±1,8 p.p. (estudantes), ±5,0 p.p. (professores), ±6,6 p.p.
          (gestores).
        </p>
      </Secao>

      {/* Insight */}
      <Secao>
        <div className="rounded-3xl border-2 border-line bg-violet-mist p-10 text-center sm:p-14">
          <p className="font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            Tirar o celular não ensina ninguém a conviver com ele.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-slate">
            O desafio não é eliminar o aparelho, é desenvolver autonomia, autorregulação e uso
            consciente, sem perder os benefícios educacionais e sociais da tecnologia.
          </p>
        </div>
      </Secao>

      {/* Aprendizagem */}
      <Secao id="aprendizagem" cor="violet-mist">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <LoopVideo
            src="/media/escrevendo.mp4"
            loopStart={2.17}
            className="mx-auto w-full max-w-sm rounded-3xl"
          />
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              O mesmo aparelho, outro uso
            </h2>
            <p className="mt-5 text-lg font-semibold text-slate">
              O desafio do HACKTUDO é claro: fazer o celular deixar de ser elemento de distração e
              virar ferramenta efetiva de aprendizagem, colaboração, criatividade e bem-estar. É por
              aí que o Sabiaa entra na rotina da escola.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {EIXOS.map(({ Icone, nome }) => (
                <li
                  key={nome}
                  className="flex items-center gap-2 rounded-2xl border-2 border-line bg-white px-3 py-3 text-sm font-extrabold sm:gap-2.5 sm:px-4 sm:text-base"
                >
                  <Icone className="size-5 shrink-0 text-violet" strokeWidth={2.5} />
                  {nome}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-semibold text-slate">
              O objetivo não é ocupar o tempo do aluno com mais tela, é construir autonomia,
              autorregulação e uso consciente da tecnologia.
            </p>
          </div>
        </div>
      </Secao>

      {/* Solução */}
      <Secao id="solucao">
        <Titulo sub="Sistema de Aprendizado e Bem-estar com Inteligência Artificial Acadêmica.">
          O que é o Sabiaa
        </Titulo>
        <div className="grid gap-6 sm:grid-cols-3">
          {PILARES.map((p, i) => (
            <BlurFade key={p.titulo} delay={i * 0.12} className={`rounded-2xl border-2 border-line p-6 ${p.cor}`}>
              <p.Icone className="size-9 text-violet-deep" strokeWidth={2.25} />
              <h3 className="font-display mt-4 text-xl font-extrabold">{p.titulo}</h3>
              <p className="mt-2 font-semibold leading-snug text-ink/80">{p.texto}</p>
            </BlurFade>
          ))}
        </div>
      </Secao>

      {/* Proposta: três perfis */}
      <Secao id="proposta" cor="mist">
        <Titulo sub="Uma plataforma, três visões da mesma escola. O Sabiá conecta todas elas.">
          O que estamos propondo
        </Titulo>
        <div className="grid gap-6 sm:grid-cols-3">
          {PERFIS.map((p, i) => (
            <BlurFade key={p.nome} delay={i * 0.12} className="flex flex-col rounded-2xl border-2 border-line bg-white p-6">
              <span className={`flex size-12 items-center justify-center rounded-2xl text-white ${p.cor}`}>
                <p.Icone className="size-6" strokeWidth={2.25} />
              </span>
              <h3 className="font-display mt-4 text-xl font-extrabold">{p.nome}</h3>
              <ul className="mt-3 space-y-2">
                {p.itens.map((item) => (
                  <li key={item} className="flex gap-2 font-semibold text-slate">
                    <Check className="mt-1 size-4 shrink-0 text-violet" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
        </div>
      </Secao>

      {/* Aula interativa */}
      <Secao id="aula">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-violet-mist px-3 py-1.5 text-sm font-extrabold text-violet-deep">
              <Presentation className="size-4" strokeWidth={2.5} /> Aula interativa
            </span>
            <h2 className="font-display mt-4 text-3xl font-extrabold sm:text-4xl">
              Na aula, o celular levanta a mão
            </h2>
            <p className="mt-5 text-lg font-semibold text-slate">
              O professor apresenta slides com perguntas e enquetes. Os alunos respondem pelo
              celular, e a turma inteira participa, não só quem senta na frente.
            </p>
            <ol className="mt-8 space-y-3">
              {FLUXO_AULA.map((passo, i) => (
                <li key={passo} className="flex items-center gap-3 font-extrabold">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-violet text-white">
                    {i + 1}
                  </span>
                  {passo}
                </li>
              ))}
            </ol>
          </div>
          <LoopVideo src="/media/celular.mp4" className="mx-auto w-full max-w-sm rounded-3xl" />
        </div>
      </Secao>

      {/* Sabiá / gamificação */}
      <Secao id="sabia" cor="violet-mist">
        <Titulo sub="Um companheiro digital que evolui com participação, atividades e desempenho, não só com presença.">
          Seu Sabiá cresce junto com você
        </Titulo>
        <div className="grid items-center gap-10 sm:grid-cols-2">
          <LoopVideo src="/media/levelup.mp4" className="mx-auto w-full max-w-sm rounded-3xl" />
          <div className="rounded-3xl border-2 border-line bg-white p-6 sm:p-8">
            <div className="flex items-baseline justify-between">
              <p className="font-display text-2xl font-extrabold">Nível 6</p>
              <p className="font-extrabold text-violet">840 XP</p>
            </div>
            <div className="fio mt-3" style={{ '--cor': 'var(--color-violet)' }}>
              <i><i style={{ width: '84%' }} /></i>
              <b style={{ left: '84%' }} />
            </div>
            <p className="mt-2 text-sm font-semibold text-slate">160 XP para a próxima recompensa</p>
            <div className="mt-6 space-y-3">
              <p className="flex items-center gap-2 rounded-2xl bg-mint-soft px-4 py-3 font-extrabold">
                <Sparkles className="size-5 text-mint" strokeWidth={2.5} /> Atividade concluída: +50 XP
              </p>
              <p className="flex items-center gap-2 rounded-2xl bg-amber-soft px-4 py-3 font-extrabold">
                <Award className="size-5 text-amber" strokeWidth={2.5} /> Nova recompensa: Boné do Sabiá
              </p>
            </div>
            <p className="mt-6 font-semibold text-slate">
              Aula → participação → pontos → recompensas → evolução do Sabiá → mais engajamento.
            </p>
          </div>
        </div>
        <div className="mt-14 grid items-center gap-8 sm:grid-cols-[1fr_1fr_1.2fr]">
          <LoopVideo src="/media/cores.mp4" className="w-full rounded-3xl" />
          <LoopVideo src="/media/cosmeticos.mp4" className="w-full rounded-3xl" />
          <div>
            <h3 className="font-display text-2xl font-extrabold">Do seu jeito</h3>
            <p className="mt-3 font-semibold text-slate">
              Cores, chapéus e acessórios. Os pontos desbloqueiam itens para personalizar o
              Sabiá; alguns só aparecem quando o aluno sobe de nível.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm font-extrabold">
              <span className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5">
                <Check className="size-4 text-mint" strokeWidth={3} /> Disponível
              </span>
              <span className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-slate">
                <Lock className="size-4" strokeWidth={2.5} /> Bloqueado
              </span>
            </div>
          </div>
        </div>
      </Secao>

      {/* Hub da vida escolar */}
      <Secao id="hub">
        <Titulo sub="Além da sala de aula: aprender, participar, criar, conviver e cuidar, tudo no mesmo lugar.">
          Um hub da vida escolar
        </Titulo>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-center justify-center rounded-2xl border-2 border-line bg-violet-mist p-4">
            <LoopVideo src="/media/idle1.mp4" className="w-full max-w-60 rounded-2xl" />
          </div>
          {HUB.map((h, i) => (
            <BlurFade key={h.titulo} delay={i * 0.08} className={`rounded-2xl border-2 border-line p-6 ${h.cor}`}>
              <h.Icone className="size-8 text-violet-deep" strokeWidth={2.25} />
              <h3 className="font-display mt-3 text-lg font-extrabold">{h.titulo}</h3>
              <p className="mt-1 font-semibold leading-snug text-ink/80">{h.texto}</p>
            </BlurFade>
          ))}
        </div>
      </Secao>

      {/* Responsabilidade */}
      <Secao cor="mist">
        <div className="grid items-center gap-10 sm:grid-cols-[1fr_1.4fr]">
          <LoopVideo src="/media/idle2.mp4" className="mx-auto w-full max-w-xs rounded-3xl" />
          <div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-sm font-extrabold text-violet-deep">
              <ShieldCheck className="size-4" strokeWidth={2.5} /> Com responsabilidade
            </span>
            <h2 className="font-display mt-4 text-3xl font-extrabold">
              Tecnologia que apoia, não substitui
            </h2>
            <ul className="mt-6 space-y-3">
              {CUIDADOS.map((c) => (
                <li key={c} className="flex gap-3 font-semibold text-slate">
                  <Check className="mt-1 size-4 shrink-0 text-violet" strokeWidth={3} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Secao>

      {/* Ecossistema */}
      <Secao id="ecossistema">
        <Titulo sub="O Sabiaa só funciona dentro da escola real: alunos no centro, com escola, família e poder público em volta.">
          Quem faz o Sabiaa acontecer
        </Titulo>
        <div className="grid gap-6 sm:grid-cols-2">
          {AGENTES.map((a) => (
            <div key={a.nome} className="flex gap-4 rounded-2xl border-2 border-line bg-white p-6">
              <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-white ${a.cor}`}>
                <a.Icone className="size-7" strokeWidth={2.25} />
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold">{a.nome}</h3>
                <p className="mt-1 font-semibold text-slate">{a.papel}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-semibold text-slate">
          Custos previstos: hospedagem, banco de dados e APIs de IA. Possível parceria: SENAI.
          Sustentação: modelo B2G/B2B2C, com editais, programas públicos e parcerias institucionais
          no início; depois, licenciamento para escolas ou redes de ensino, proporcional ao número de usuários.
        </p>
      </Secao>

      {/* Impacto e roadmap */}
      <Secao cor="mist">
        <div className="grid gap-10 sm:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Impacto que queremos medir</h2>
            <p className="mt-4 text-lg font-semibold text-slate">
              Participação nas aulas, conclusão de atividades, evolução do desempenho e indicadores
              de bem-estar dos estudantes do fundamental ao médio, junto com a adesão de professores
              e da comunidade escolar.
            </p>
            <p className="mt-4 flex gap-2 text-sm font-semibold text-slate">
              <Smartphone className="mt-0.5 size-4 shrink-0 text-violet" strokeWidth={2.5} />
              Nenhum resultado é apresentado como comprovado antes de validação em escola real.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold">Roadmap</h2>
            <ol className="mt-4 space-y-3">
              {ROADMAP.map((r, i) => (
                <li key={r.fase} className="flex gap-3 font-semibold text-slate">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-violet-soft text-sm font-extrabold text-violet-deep">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="font-extrabold text-ink">{r.fase}.</strong> {r.texto}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Secao>

      {/* Tecnologias */}
      <Secao id="tecnologias">
        <Titulo sub="O que usamos para construir o protótipo do Sabiaa.">Tecnologias</Titulo>
        <div className="grid gap-6 sm:grid-cols-3">
          {STACK.map((s, i) => (
            <BlurFade key={s.nome} delay={i * 0.12} className="rounded-2xl border-2 border-line bg-white p-6">
              <span className={`flex size-12 items-center justify-center rounded-2xl text-white ${s.cor}`}>
                <s.Icone className="size-6" strokeWidth={2.25} />
              </span>
              <h3 className="font-display mt-4 text-xl font-extrabold">{s.nome}</h3>
              <ul className="mt-3 space-y-2">
                {s.itens.map((item) => (
                  <li key={item} className="flex gap-2 font-semibold text-slate">
                    <Check className="mt-1 size-4 shrink-0 text-violet" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
        </div>
      </Secao>

      {/* Time */}
      <Secao id="time">
        <Titulo sub="HACKTUDO — Time VIOLET">Quem está por trás</Titulo>
		<img draggable="false"
          src="/media/logo-violet.png"
          alt="Violet Creative & Studios"
          className="mx-auto mb-10 h-auto w-56 sm:w-64"
        />
        <div className="grid gap-4 sm:grid-cols-4">
          {TIME.map((n) => (
            <div key={n} className="rounded-2xl border-2 border-line bg-white p-5 text-center font-extrabold">
              {n}
            </div>
          ))}
        </div>
      </Secao>

      {/* Download do app */}
      <Secao id="baixar" cor="violet-mist">
        <div className="grid items-center gap-10 sm:grid-cols-2">
          <LoopVideo src="/media/celular.mp4" className="mx-auto w-full max-w-sm rounded-3xl" />
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Leve o Sabiaa no bolso</h2>
            <p className="mt-4 text-lg font-semibold text-slate">
              O app reúne os três perfis: aluno, professor e gestão. Instale no Android ou abra o
              mesmo app direto no navegador.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BaixarApp />
              {/* o app do ./mobileapp exportado para web (npm run demo) */}
              <Botao href="/demo/" variante="branco">
                <span className="flex items-center gap-2"><Globe className="size-5" strokeWidth={2.5} /> Testar no navegador</span>
              </Botao>
            </div>
            <p className="mt-4 text-sm font-bold text-slate">Android 7+ · v1.0.0 · 73 MB · no navegador não precisa instalar</p>
            <ol className="mt-8 space-y-3">
              {PASSOS.map((passo, i) => (
                <li key={passo} className="flex gap-3 font-semibold text-slate">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-violet-soft text-sm font-extrabold text-violet-deep">
                    {i + 1}
                  </span>
                  {passo}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Secao>

      {/* Painel web */}
      <Secao id="painel-web" cor="mist">
        <Titulo sub="O app principal é para a comunidade escolar. O painel web é uma ferramenta de acompanhamento para professores e gestão.">
          Um painel para quem cuida da escola
        </Titulo>
        <div className="mx-auto max-w-3xl rounded-3xl border-2 border-line bg-white p-6 sm:p-10">
          <p className="text-center text-lg font-semibold text-slate">
            Aqui você pode explorar uma demonstração do dashboard: uma visão mais ampla da rotina
            escolar, com dados fictícios e indicadores para apoiar decisões pedagógicas.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-sky-soft p-5">
              <h3 className="font-display text-xl font-extrabold text-sky-dark">Área do professor</h3>
              <p className="mt-2 font-semibold text-slate">
                Acompanhe turmas, conduza aulas interativas e crie atividades para os estudantes.
              </p>
              <a href="#painel-professor" className="mt-5 inline-flex font-extrabold text-sky-dark hover:underline">
                Explorar como professor →
              </a>
            </div>
            <div className="rounded-2xl bg-violet-mist p-5">
              <h3 className="font-display text-xl font-extrabold text-violet-deep">Gestão escolar</h3>
              <p className="mt-2 font-semibold text-slate">
                Consulte indicadores agregados, organize eventos e acompanhe o progresso da escola.
              </p>
              <a href="#painel-gestao" className="mt-5 inline-flex font-extrabold text-violet-deep hover:underline">
                Explorar como gestão →
              </a>
            </div>
          </div>
        </div>
      </Secao>

      </main>

      <footer className="border-t-2 border-line px-6 py-16 text-center">
        <LoopVideo src="/media/feliz.mp4" className="mx-auto w-40 rounded-3xl" />
        <p className="font-display mx-auto mt-8 max-w-2xl text-2xl font-extrabold leading-snug sm:text-3xl">
          O celular deixa de ser uma distração quando passa a ter um propósito.
        </p>
        <a href="#topo" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-slate hover:text-violet">
          ↑ Voltar ao topo
        </a>
        <img src="/media/logo.svg" alt="Sabiaa" className="mx-auto mt-10 h-12 w-auto" />
      </footer>
    </>
  )
}
