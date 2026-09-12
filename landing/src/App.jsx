import {
  Award,
  Backpack,
  BookOpen,
  HeartPulse,
  Landmark,
  Lightbulb,
  School,
  Smile,
  Target,
  Users,
  House,
} from 'lucide-react'
import { BlurFade, NumberTicker, DotPattern, ShimmerButton, LoopVideo } from './magic'

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

const AGENTES = [
  { Icone: Backpack, nome: 'Alunos', papel: 'Foco do projeto. Interagem com a plataforma e participam das atividades propostas.', cor: 'bg-violet' },
  { Icone: School, nome: 'Escolas e professores', papel: 'Integram o Sabiaa à rotina escolar, acompanham indicadores agregados da turma e apoiam estratégias pedagógicas e de bem-estar.', cor: 'bg-sky' },
  { Icone: House, nome: 'Famílias', papel: 'Acompanham indicadores de bem-estar e engajamento, recebem orientações e ajudam a construir hábitos digitais mais saudáveis.', cor: 'bg-amber' },
  { Icone: Landmark, nome: 'Governo', papel: 'Apoia a implementação em escala, financia ou contrata a solução e usa indicadores agregados para orientar políticas públicas.', cor: 'bg-violet-deep' },
]

const PROXIMOS = [
  'Refinar o protótipo',
  'Conversar com profissionais, professores e estudantes e rodar pesquisas de adesão',
  'Refinar as atividades de terapia cognitivo-comportamental com profissionais de saúde',
]

const TIME = ['Camila Azevedo', 'Juan Pedro', 'Gabriel Richard', 'Mariana Holanda']

function Botao({ href, children, variante = 'violeta' }) {
  const estilos = {
    violeta: 'bg-violet text-white [--lip:var(--color-violet-dark)]',
    azul: 'bg-sky text-white [--lip:var(--color-sky-dark)]',
    branco: 'bg-white text-ink border-2 border-line [--lip:var(--color-line)]',
  }
  return (
    <a href={href} className={`btn-3d ${estilos[variante]}`}>
      {children}
    </a>
  )
}

function Secao({ id, children, className = '' }) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
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
  return (
    <>
      {/* Hero */}
      <header id="topo" className="relative overflow-hidden px-6 pt-12 pb-20 sm:pt-16">
        <DotPattern className="[mask-image:radial-gradient(600px_circle_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-2">
          <div>
            <img src="/media/logooficial.svg" alt="Sabiaa" className="mb-8 h-10 w-auto" />
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              O celular não precisa ser <span className="text-violet">o inimigo</span> da sala de aula.
            </h1>
            <p className="mt-6 text-xl font-semibold text-slate">
              Sabiaa é um Sistema de Aprendizado e Bem-estar com Inteligência Artificial Acadêmica,
              feito para escolas que querem ir além da proibição.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ShimmerButton href="#solucao" className="bg-violet text-white [--lip:var(--color-violet-dark)]">
                Conhecer o Sabiaa
              </ShimmerButton>
              <Botao href="#problema" variante="branco">Ver o problema</Botao>
            </div>
          </div>
          <LoopVideo
            src="/media/flying.mp4"
            loopStart={2}
            className="mx-auto w-full max-w-sm rounded-3xl"
          />
        </div>
      </header>

      {/* Problema + dados */}
      <Secao id="problema" className="bg-mist">
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
      <Secao id="aprendizagem" className="bg-violet-mist">
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
                  className="flex items-center gap-2.5 rounded-2xl border-2 border-line bg-white px-4 py-3 font-extrabold"
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
        <div className="mt-10 flex items-center gap-6 rounded-2xl border-2 border-dashed border-hare p-6">
          <img src="/media/personagemprincipal.svg" alt="" className="h-24 w-auto" />
          <div>
            <p className="font-extrabold">Como funciona, passo a passo</p>
            <p className="mt-1 font-semibold text-slate">
              O aluno participa de atividades de aprendizagem, colaboração, criatividade e bem-estar;
              a plataforma acompanha o engajamento, oferece recompensas gamificadas e gera relatórios
              de saúde analisados por IA, com atividades de terapia cognitivo-comportamental.
            </p>
          </div>
        </div>
      </Secao>

      {/* Ecossistema */}
      <Secao id="ecossistema" className="bg-mist">
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

      {/* Impacto e futuro */}
      <Secao>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Impacto que queremos medir</h2>
            <p className="mt-4 text-lg font-semibold text-slate">
              Bem-estar e rendimento dos estudantes do fundamental ao médio e, junto com eles,
              professores, famílias e a comunidade escolar. O resultado esperado é a melhoria dos
              índices das escolas e da satisfação dos alunos.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold">Próximos passos</h2>
            <ul className="mt-4 space-y-3">
              {PROXIMOS.map((p, i) => (
                <li key={p} className="flex gap-3 font-semibold text-slate">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-violet-soft text-sm font-extrabold text-violet-deep">
                    {i + 1}
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Secao>

      {/* Time */}
      <Secao id="time" className="bg-mist">
        <Titulo sub="HACKTUDO — Time VIOLET">Quem está por trás</Titulo>
        <div className="grid gap-4 sm:grid-cols-4">
          {TIME.map((n) => (
            <div key={n} className="rounded-2xl border-2 border-line bg-white p-5 text-center font-extrabold">
              {n}
            </div>
          ))}
        </div>
      </Secao>

      <footer className="border-t-2 border-line px-6 py-16 text-center">
        <LoopVideo src="/media/feliz.mp4" className="mx-auto w-40 rounded-3xl" />
        <p className="font-display mx-auto mt-8 max-w-2xl text-2xl font-extrabold leading-snug sm:text-3xl">
          O problema nunca foi o celular na mão do aluno. Foi ninguém ter ensinado o que fazer com ele.
        </p>
        <img src="/media/logo.svg" alt="Sabiaa" className="mx-auto mt-10 h-12 w-auto" />
      </footer>
    </>
  )
}
