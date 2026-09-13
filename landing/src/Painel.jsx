import { useState } from 'react'
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Plus,
  Presentation,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const TURMAS = [
  { nome: '9º A', alunos: 28, participacao: 82, media: '7,6', cor: 'bg-violet' },
  { nome: '8º B', alunos: 31, participacao: 69, media: '6,9', cor: 'bg-sky' },
  { nome: '1º C', alunos: 26, participacao: 77, media: '7,2', cor: 'bg-mint' },
]

const ALUNOS = [
  ['Bruno Lima', '1.310 XP', 93],
  ['Carla Souza', '1.040 XP', 88],
  ['Davi Rocha', '620 XP', 64],
  ['Elisa Martins', '905 XP', 81],
]

const INITIAL_ACTIVITIES = [
  { titulo: 'Equações do 2º grau', turma: '9º A', respostas: '17/28', prazo: 'Entrega hoje' },
  { titulo: 'Figuras de linguagem', turma: '8º B', respostas: '12/31', prazo: 'Entrega amanhã' },
  { titulo: 'Sistema solar', turma: '1º C', respostas: '9/26', prazo: 'Entrega sexta' },
]

const INITIAL_EVENTS = [
  { titulo: 'Semana da Ciência', periodo: '15 a 19 de setembro', publico: 'Todas as turmas', bonus: 50 },
  { titulo: 'Desafio de leitura', periodo: 'Outubro', publico: '8º e 9º anos', bonus: 30 },
]

const PROFESSOR_TABS = [
  { key: 'visao', label: 'Visão geral', icon: LayoutDashboard },
  { key: 'aula', label: 'Aula ao vivo', icon: Presentation },
  { key: 'atividades', label: 'Atividades', icon: BookOpen },
]

const GESTAO_TABS = [
  { key: 'visao', label: 'Visão geral', icon: LayoutDashboard },
  { key: 'eventos', label: 'Eventos', icon: CalendarDays },
  { key: 'parametros', label: 'Parâmetros', icon: Settings2 },
]

function Barra({ valor, cor = 'bg-violet', max = 100 }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-violet-mist">
      <div className={`h-full rounded-full ${cor}`} style={{ width: `${Math.min(100, (valor / max) * 100)}%` }} />
    </div>
  )
}

function Badge({ children, cor = 'bg-violet-mist text-violet-deep' }) {
  return <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-extrabold ${cor}`}>{children}</span>
}

function Stat({ icon: Icon, label, valor, detalhe, cor = 'text-violet', fundo = 'bg-violet-mist' }) {
  return (
    <div className="rounded-2xl border-2 border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className={`flex size-10 items-center justify-center rounded-xl ${fundo} ${cor}`}><Icon className="size-5" /></span>
        {detalhe && <span className="text-xs font-extrabold text-mint">{detalhe}</span>}
      </div>
      <p className="mt-5 font-display text-3xl font-extrabold">{valor}</p>
      <p className="mt-1 text-sm font-bold text-slate">{label}</p>
    </div>
  )
}

function Cabecalho({ perfil, aba, onMenu }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b-2 border-line bg-white px-5 py-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenu} className="rounded-xl p-2 text-slate hover:bg-mist lg:hidden" aria-label="Abrir menu">
          <Menu className="size-5" />
        </button>
        <div>
          <p className="font-display text-2xl font-extrabold capitalize">{aba}</p>
          <p className="text-sm font-bold text-slate">Acompanhe o que está acontecendo na sua escola.</p>
        </div>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        <span className="relative rounded-xl border-2 border-line p-2.5 text-slate" aria-hidden="true">
          <Bell className="size-5" />
          <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-coral" />
        </span>
        <div className="flex items-center gap-2 rounded-xl bg-violet-mist px-3 py-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-violet font-display font-extrabold text-white">{perfil === 'professor' ? 'M' : 'C'}</span>
          <span className="text-sm font-extrabold">{perfil === 'professor' ? 'Prof. Marcos' : 'Coordenação'}</span>
        </div>
      </div>
    </header>
  )
}

function Navegacao({ perfil, aba, setAba, aberta, fechar }) {
  const gestao = perfil === 'gestao'
  const tabs = gestao ? GESTAO_TABS : PROFESSOR_TABS
  return (
    <>
      {aberta && <button type="button" onClick={fechar} className="fixed inset-0 z-20 bg-ink/30 lg:hidden" aria-label="Fechar menu" />}
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r-2 border-line bg-white p-5 transition-transform lg:static lg:translate-x-0 ${aberta ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <a href="#topo" aria-label="Voltar para o início"><img src="/media/logooficial.svg" alt="Sabiaa" className="h-9 w-auto" /></a>
          <button type="button" onClick={fechar} className="rounded-xl p-2 text-slate lg:hidden" aria-label="Fechar menu"><X className="size-5" /></button>
        </div>
        <div className="mt-9 rounded-2xl bg-violet-mist p-4">
          <p className="text-xs font-extrabold uppercase tracking-wide text-violet">Painel web</p>
          <p className="mt-1 font-display text-xl font-extrabold">{gestao ? 'Gestão escolar' : 'Área do professor'}</p>
          <p className="mt-1 text-sm font-bold text-slate">EEM Sabiá · 2026</p>
        </div>
        <nav className="mt-8 space-y-2" aria-label="Navegação do painel">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setAba(key); fechar() }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-extrabold transition-colors ${aba === key ? 'bg-violet text-white' : 'text-slate hover:bg-violet-mist hover:text-violet-deep'}`}
            >
              <Icon className="size-5" />{label}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <a href={gestao ? '#painel-professor' : '#painel-gestao'} className="flex items-center justify-between rounded-xl border-2 border-line px-4 py-3 text-sm font-extrabold text-violet-deep hover:bg-violet-mist">
            <span>Trocar para {gestao ? 'professor' : 'gestão'}</span><ChevronRight className="size-4" />
          </a>
          <a href="#topo" className="flex items-center gap-2 px-2 py-2 text-sm font-extrabold text-slate hover:text-violet"><ArrowLeft className="size-4" /> Voltar para a landing</a>
        </div>
      </aside>
    </>
  )
}

function ProfessorVisao({ onAba }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Users} valor="85" label="alunos acompanhados" detalhe="+6%" />
        <Stat icon={Activity} valor="76%" label="participação média" detalhe="+4,2%" cor="text-sky" fundo="bg-sky-soft" />
        <Stat icon={BookOpen} valor="3" label="atividades ativas" cor="text-mint" fundo="bg-mint-soft" />
        <Stat icon={Sparkles} valor="7,6" label="média das turmas" cor="text-amber" fundo="bg-amber-soft" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border-2 border-line bg-violet-deep p-6 text-white sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div><Badge cor="bg-white/15 text-violet-soft">AULA DE AGORA</Badge><h2 className="mt-4 font-display text-3xl font-extrabold">Frações no dia a dia</h2><p className="mt-2 text-violet-soft">9º A · Matemática · 28 alunos</p></div>
            <span className="rounded-xl bg-mint px-3 py-2 text-sm font-extrabold text-ink">Ao vivo</span>
          </div>
          <div className="mt-8 flex items-end justify-between gap-6"><div><p className="text-sm font-bold text-violet-soft">Participação até agora</p><p className="mt-1 font-display text-4xl font-extrabold">23<span className="text-xl text-violet-soft">/28</span></p></div><div className="w-40"><Barra valor={23} max={28} cor="bg-mint" /></div></div>
          <button type="button" onClick={() => onAba('aula')} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-extrabold text-violet-deep">Abrir aula <ChevronRight className="size-4" /></button>
        </section>
        <section className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7">
          <div className="flex items-center justify-between"><h2 className="font-display text-xl font-extrabold">Suas turmas</h2><span className="text-sm font-extrabold text-violet">Ver todas</span></div>
          <div className="mt-6 space-y-5">{TURMAS.map((t) => <div key={t.nome}><div className="mb-2 flex items-center justify-between text-sm"><span className="font-extrabold">{t.nome} <span className="font-bold text-slate">· {t.alunos} alunos</span></span><span className="font-extrabold text-slate">{t.participacao}%</span></div><Barra valor={t.participacao} cor={t.cor} /></div>)}</div>
          <div className="mt-7 rounded-xl bg-mist p-3 text-sm font-bold text-slate"><span className="font-extrabold text-ink">Dica:</span> o 8º B está abaixo da meta de participação.</div>
        </section>
      </div>
      <section className="mt-6 rounded-2xl border-2 border-line bg-white p-6 sm:p-7">
        <div className="flex items-center justify-between"><div><h2 className="font-display text-xl font-extrabold">Atividades recentes</h2><p className="mt-1 text-sm font-bold text-slate">Acompanhe o andamento das suas turmas.</p></div><button type="button" onClick={() => onAba('atividades')} className="hidden items-center gap-2 rounded-xl bg-violet px-4 py-2.5 text-sm font-extrabold text-white sm:flex"><Plus className="size-4" /> Nova atividade</button></div>
        <div className="mt-5 divide-y-2 divide-line">{INITIAL_ACTIVITIES.map((a) => <div key={a.titulo} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0"><span className="flex size-10 items-center justify-center rounded-xl bg-violet-mist text-violet"><BookOpen className="size-5" /></span><div className="min-w-40 flex-1"><p className="font-extrabold">{a.titulo}</p><p className="text-sm font-bold text-slate">{a.turma} · {a.prazo}</p></div><div className="w-32"><p className="mb-1 text-right text-xs font-extrabold text-slate">{a.respostas} respostas</p><Barra valor={Number(a.respostas.split('/')[0])} max={Number(a.respostas.split('/')[1])} cor="bg-mint" /></div><ChevronRight className="size-5 text-hare" /></div>)}</div>
      </section>
    </>
  )
}

function AulaProfessor() {
  const [liberada, setLiberada] = useState(false)
  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
      <section className="rounded-2xl border-2 border-line bg-violet-deep p-6 text-white sm:p-9">
        <div className="flex items-center justify-between"><Badge cor="bg-white/15 text-violet-soft">SLIDE 2 DE 3 · 9º A</Badge><span className="text-sm font-bold text-violet-soft">Matemática</span></div>
        <h2 className="mt-12 font-display text-3xl font-extrabold sm:text-4xl">Ana comeu 3/8 e Leo comeu 2/8 da pizza. Quanto eles comeram juntos?</h2>
        <div className="mt-9 grid gap-3 sm:grid-cols-2">{['5/16', '5/8', '1/8', '6/8'].map((opcao, i) => <div key={opcao} className={`rounded-xl border-2 px-4 py-4 font-extrabold ${liberada && i === 1 ? 'border-mint bg-mint text-ink' : 'border-white/20 bg-white/10 text-white'}`}>{String.fromCharCode(65 + i)} · {opcao}{liberada && i === 1 && <Check className="float-right size-5" />}</div>)}</div>
        <div className="mt-10 flex flex-wrap items-center gap-3"><button type="button" onClick={() => setLiberada(!liberada)} className="btn-3d bg-mint text-ink [--lip:#159768]">{liberada ? 'Encerrar pergunta' : 'Liberar para os celulares'}</button><span className="text-sm font-bold text-violet-soft">{liberada ? '23 alunos responderam' : 'A pergunta ainda está fechada'}</span></div>
      </section>
      <section className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><div className="flex items-center justify-between"><h2 className="font-display text-xl font-extrabold">Respostas da turma</h2><span className="text-sm font-extrabold text-slate">{liberada ? '23/28' : '0/28'}</span></div><div className="mt-6 space-y-5">{[['5/16', 12, 'bg-coral'], ['5/8', liberada ? 8 : 0, 'bg-mint'], ['1/8', liberada ? 2 : 0, 'bg-amber'], ['6/8', liberada ? 1 : 0, 'bg-sky']].map(([label, n, cor]) => <div key={label}><div className="mb-2 flex justify-between text-sm"><span className="font-extrabold">{label}</span><span className="font-bold text-slate">{n} alunos</span></div><Barra valor={n} max={23} cor={cor} /></div>)}</div><div className="mt-8 rounded-xl bg-mist p-4 text-sm font-bold text-slate"><CircleHelp className="mr-2 inline size-4 text-violet" /> Para testar, libere a pergunta e acompanhe a resposta simulada.</div></section>
    </div>
  )
}

function AtividadesProfessor() {
  const [atividades, setAtividades] = useState(INITIAL_ACTIVITIES)
  const [titulo, setTitulo] = useState('')
  const publicar = (e) => { e.preventDefault(); if (!titulo.trim()) return; setAtividades([{ titulo: titulo.trim(), turma: '9º A', respostas: '0/28', prazo: 'Nova atividade' }, ...atividades]); setTitulo('') }
  return (
    <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
      <form onSubmit={publicar} className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><Badge cor="bg-sky-soft text-sky-dark">CRIAR</Badge><h2 className="mt-4 font-display text-2xl font-extrabold">Nova atividade extra</h2><p className="mt-2 text-sm font-bold text-slate">Publique uma atividade rápida para uma turma.</p><label className="mt-7 block text-sm font-extrabold" htmlFor="atividade">Título da atividade</label><input id="atividade" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex.: Revisão para a prova" className="mt-2 w-full rounded-xl border-2 border-line px-4 py-3 font-bold outline-none placeholder:text-hare focus:border-violet" /><label className="mt-5 block text-sm font-extrabold" htmlFor="turma">Disponibilizar para</label><select id="turma" className="mt-2 w-full rounded-xl border-2 border-line bg-white px-4 py-3 font-bold outline-none focus:border-violet"><option>9º A</option><option>8º B</option><option>1º C</option></select><button type="submit" className="btn-3d mt-7 w-full bg-violet text-white [--lip:var(--color-violet-dark)]"><Plus className="mr-2 size-5" /> Adicionar atividade</button></form>
      <section className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><h2 className="font-display text-2xl font-extrabold">Atividades publicadas</h2><div className="mt-5 divide-y-2 divide-line">{atividades.map((a, i) => <div key={`${a.titulo}-${i}`} className="flex items-center gap-4 py-4 first:pt-0"><span className="flex size-10 items-center justify-center rounded-xl bg-violet-mist text-violet"><BookOpen className="size-5" /></span><div className="flex-1"><p className="font-extrabold">{a.titulo}</p><p className="text-sm font-bold text-slate">{a.turma} · {a.prazo}</p></div><div className="hidden w-28 sm:block"><p className="mb-1 text-right text-xs font-extrabold text-slate">{a.respostas}</p><Barra valor={Number(a.respostas.split('/')[0])} max={Number(a.respostas.split('/')[1])} cor="bg-mint" /></div><ChevronRight className="size-5 text-hare" /></div>)}</div></section>
    </div>
  )
}

function GestaoVisao() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat icon={Users} valor="85" label="alunos ativos" detalhe="92% da escola" /><Stat icon={Activity} valor="76%" label="participação média" detalhe="+4,2%" cor="text-sky" fundo="bg-sky-soft" /><Stat icon={BarChart3} valor="7,3" label="média geral" detalhe="+0,4" cor="text-mint" fundo="bg-mint-soft" /><Stat icon={ShieldCheck} valor="120" label="check-ins de bem-estar" cor="text-amber" fundo="bg-amber-soft" /></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <section className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-display text-xl font-extrabold">Progresso das turmas</h2><p className="mt-1 text-sm font-bold text-slate">Meta de participação: 75%</p></div><Badge cor="bg-mint-soft text-mint">Dados deste mês</Badge></div><div className="mt-7 space-y-7">{TURMAS.map((t) => <div key={t.nome}><div className="mb-2 flex items-center justify-between"><div><span className="font-extrabold">{t.nome}</span><span className="ml-2 text-sm font-bold text-slate">{t.alunos} alunos · média {t.media}</span></div><span className={`text-sm font-extrabold ${t.participacao >= 75 ? 'text-mint' : 'text-coral'}`}>{t.participacao}%</span></div><Barra valor={t.participacao} cor={t.participacao >= 75 ? 'bg-mint' : 'bg-amber'} /><div className="mt-3 flex h-12 items-end gap-2">{[58, 64, 69, t.participacao].map((v, i) => <div key={i} className="flex flex-1 flex-col items-center gap-1"><div className={`w-full max-w-12 rounded-t-md ${i === 3 ? t.cor : 'bg-violet-soft'}`} style={{ height: `${Math.max(10, v / 2)}px` }} /><span className="text-[10px] font-bold text-hare">{['Jun', 'Jul', 'Ago', 'Set'][i]}</span></div>)}</div></div>)}</div></section>
        <section className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><h2 className="font-display text-xl font-extrabold">Bem-estar da escola</h2><p className="mt-1 text-sm font-bold text-slate">Check-ins agregados · esta semana</p><div className="mt-7 space-y-5">{[['Ótimo', 27, 'bg-mint'], ['Bem', 42, 'bg-mint'], ['Normal', 31, 'bg-amber'], ['Chateado', 14, 'bg-coral'], ['Mal', 6, 'bg-coral']].map(([label, n, cor]) => <div key={label}><div className="mb-2 flex justify-between text-sm"><span className="font-extrabold">{label}</span><span className="font-bold text-slate">{n}</span></div><Barra valor={n} max={50} cor={cor} /></div>)}</div><p className="mt-7 rounded-xl bg-mist p-3 text-xs font-bold text-slate"><ShieldCheck className="mr-1 inline size-4 text-violet" /> Dados anônimos e agregados. Não são diagnóstico.</p></section>
      </div>
      <section className="mt-6 rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><div className="flex items-center justify-between"><div><h2 className="font-display text-xl font-extrabold">Progresso dos alunos · 9º A</h2><p className="mt-1 text-sm font-bold text-slate">Visão agregada por participação</p></div><span className="hidden items-center gap-2 rounded-xl border-2 border-line px-4 py-2.5 text-sm font-extrabold text-violet sm:flex">Ver relatório <ChevronRight className="size-4" /></span></div><div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">{ALUNOS.map(([nome, xp, participacao]) => <div key={nome} className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-violet-soft text-sm font-extrabold text-violet-deep">{nome[0]}</span><div className="min-w-0 flex-1"><div className="mb-1 flex justify-between text-sm"><span className="truncate font-extrabold">{nome}</span><span className="font-bold text-slate">{xp}</span></div><Barra valor={participacao} cor={participacao >= 75 ? 'bg-mint' : 'bg-amber'} /></div></div>)}</div></section>
    </>
  )
}

function EventosGestao() {
  const [eventos, setEventos] = useState(INITIAL_EVENTS)
  const [form, setForm] = useState({ titulo: '', periodo: '', publico: 'Todas as turmas' })
  const publicar = (e) => { e.preventDefault(); if (!form.titulo.trim() || !form.periodo.trim()) return; setEventos([{ ...form, titulo: form.titulo.trim(), periodo: form.periodo.trim(), bonus: 30 }, ...eventos]); setForm({ titulo: '', periodo: '', publico: 'Todas as turmas' }) }
  return <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]"><form onSubmit={publicar} className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><Badge cor="bg-amber-soft text-amber">ESCOLA</Badge><h2 className="mt-4 font-display text-2xl font-extrabold">Criar evento</h2><p className="mt-2 text-sm font-bold text-slate">Divulgue desafios, feiras e ações para a comunidade.</p>{[['titulo', 'Nome do evento', 'Ex.: Feira de Ciências'], ['periodo', 'Período', 'Ex.: 15 a 19 de setembro']].map(([key, label, placeholder]) => <label key={key} className="mt-5 block text-sm font-extrabold" htmlFor={key}>{label}<input id={key} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className="mt-2 w-full rounded-xl border-2 border-line px-4 py-3 font-bold outline-none placeholder:text-hare focus:border-violet" /></label>)}<label className="mt-5 block text-sm font-extrabold" htmlFor="publico">Público<select id="publico" value={form.publico} onChange={(e) => setForm({ ...form, publico: e.target.value })} className="mt-2 w-full rounded-xl border-2 border-line bg-white px-4 py-3 font-bold outline-none focus:border-violet"><option>Todas as turmas</option><option>8º e 9º anos</option><option>Ensino médio</option></select></label><button type="submit" className="btn-3d mt-7 w-full bg-violet text-white [--lip:var(--color-violet-dark)]"><Plus className="mr-2 size-5" /> Publicar evento</button></form><section className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><h2 className="font-display text-2xl font-extrabold">Eventos publicados</h2><div className="mt-5 space-y-3">{eventos.map((e, i) => <div key={`${e.titulo}-${i}`} className="rounded-xl border-2 border-line p-4"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-soft text-amber"><CalendarDays className="size-5" /></span><div className="min-w-0 flex-1"><p className="font-extrabold">{e.titulo}</p><p className="mt-1 text-sm font-bold text-slate">{e.periodo} · {e.publico}</p><p className="mt-3 text-xs font-extrabold text-violet">+{e.bonus} XP · 1 inscrição na demo</p></div><ChevronRight className="size-5 text-hare" /></div></div>)}</div></section></div>
}

function ParametrosGestao() {
  const [valores, setValores] = useState({ participacao: 10, acerto: 20, meta: 75 })
  const campos = [['participacao', 'Participação', 'Pontos por responder em aula ou concluir uma atividade.', 1, ' XP'], ['acerto', 'Acerto', 'Pontos extras por resposta correta.', 1, ' XP'], ['meta', 'Meta de participação', 'Turmas abaixo disso aparecem em alerta no painel.', 5, '%']]
  return <div className="max-w-3xl space-y-4">{campos.map(([key, label, desc, passo, sufixo]) => <section key={key} className="rounded-2xl border-2 border-line bg-white p-6 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-display text-xl font-extrabold">{label}</h2><p className="mt-1 max-w-lg text-sm font-bold text-slate">{desc}</p></div><span className="rounded-xl bg-violet-mist px-4 py-2 font-display text-2xl font-extrabold text-violet-deep">{valores[key]}{sufixo}</span></div><input type="range" min="0" max={key === 'meta' ? 100 : 50} step={passo} value={valores[key]} onChange={(e) => setValores({ ...valores, [key]: Number(e.target.value) })} className="mt-6 w-full accent-violet" /></section>)}<div className="flex items-center gap-2 rounded-xl bg-mint-soft p-4 text-sm font-extrabold text-ink"><Check className="size-5 text-mint" /> Alterações salvas automaticamente neste protótipo.</div></div>
}

export default function Painel({ perfil }) {
  const gestao = perfil === 'gestao'
  const [aba, setAba] = useState('visao')
  const [menu, setMenu] = useState(false)
  const abas = gestao ? GESTAO_TABS : PROFESSOR_TABS
  const conteudo = gestao
    ? { visao: <GestaoVisao />, eventos: <EventosGestao />, parametros: <ParametrosGestao /> }
    : { visao: <ProfessorVisao onAba={setAba} />, aula: <AulaProfessor />, atividades: <AtividadesProfessor /> }
  return (
    <div className="flex min-h-dvh bg-mist">
      <Navegacao perfil={perfil} aba={aba} setAba={setAba} aberta={menu} fechar={() => setMenu(false)} />
      <div className="min-w-0 flex-1"><Cabecalho perfil={perfil} aba={abas.find((item) => item.key === aba)?.label ?? 'Visão geral'} onMenu={() => setMenu(true)} /><main className="mx-auto max-w-[1500px] p-5 sm:p-8">{conteudo[aba]}</main></div>
    </div>
  )
}
