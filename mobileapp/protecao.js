// Central de Proteção e Apoio (specs/bullyng-spec.md).
// Fluxo inteiro mockado: nada sai do aparelho, nenhum encaminhamento real acontece.
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Pressable, View } from 'react-native';
import { Btn, c, Campo, Card, Escolha, H, Icone, Rotulo, Selo, Stat, T, useNav, useStore } from './ui';
import { combinaFiltro, envolvidosRelato, locaisRelato, quandosRelato, relatosBase, statusRelato, tiposRelato } from './mock';

const AVISO = 'Compartilhe apenas as informações necessárias. Seu relato será encaminhado à equipe responsável pela escola.';
const IDENTIFICAR = 'Sim, quero me identificar';
const ANONIMO = 'Prefiro fazer este relato anonimamente';
const BOTAO = { Bullying: 'Sofri bullying', Assédio: 'Sofri assédio', 'Outra situação': 'Quero contar outra situação' };
const FILTROS = ['Todos', ...tiposRelato.slice(0, 2), 'Outros', ...Object.values(statusRelato).map((x) => x.filtro)];

function SeloStatus({ status }) {
  return <Selo texto={status} cor={statusRelato[status].cor} />;
}

function Dado({ rotulo, children }) {
  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <T muted style={{ width: 110, fontSize: 13 }}>{rotulo}</T>
      <T style={{ flex: 1, fontWeight: '700', fontSize: 14 }}>{children || 'Não informado'}</T>
    </View>
  );
}

// ---------------------------------------------------------------- aluno

/** Porta de entrada na Home: fácil de achar, sóbria o bastante para não expor quem abre. */
export function AjudaHome() {
  const nav = useNav();
  return (
    <Pressable
      onPress={() => nav.abrir(Central)}
      accessibilityRole="button"
      accessibilityLabel="Preciso de ajuda?"
      accessibilityHint="Abre a Central de Proteção e Apoio"
    >
      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Icone name="hand-heart-outline" size={28} color={c.violet} />
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '800' }}>Preciso de ajuda?</T>
          <T muted style={{ fontSize: 13 }}>Se algo aconteceu com você ou com alguém que você conhece, estamos aqui para ouvir.</T>
        </View>
        <Icone name="chevron-right" size={24} color={c.hare} />
      </Card>
    </Pressable>
  );
}

function Central() {
  const nav = useNav();
  const s = useStore();
  const meus = s.relatos.filter((r) => r.meu);
  return (
    <>
      <View>
        <H>Preciso de ajuda?</H>
        <T muted>Se algo aconteceu com você ou com alguém que você conhece, estamos aqui para ouvir.</T>
      </View>

      <Card style={{ gap: 10 }}>
        <Rotulo icone="hand-heart-outline">CONTAR O QUE ACONTECEU</Rotulo>
        {tiposRelato.map((t) => (
          <Btn key={t} title={BOTAO[t]} onPress={() => nav.abrir(Relato, { tipo: t })} style={{ alignSelf: 'stretch' }} />
        ))}
        <T muted style={{ fontSize: 12 }}>{AVISO}</T>
      </Card>

      <Rotulo icone="file-document-outline">MEUS RELATOS</Rotulo>
      {meus.length ? (
        meus.map((r) => (
          <Card key={r.protocolo} style={{ gap: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <H small style={{ flex: 1 }}>{r.tipo}</H>
              <T muted style={{ fontSize: 13 }}>{r.data}</T>
            </View>
            <T muted style={{ fontSize: 13 }}>#{r.protocolo}</T>
            <SeloStatus status={r.status} />
          </Card>
        ))
      ) : (
        <Card>
          <T muted>Você ainda não enviou nenhum relato.</T>
        </Card>
      )}
    </>
  );
}

function Relato({ tipo }) {
  const s = useStore();
  const [f, setF] = useState({ texto: '', quando: null, local: null, envolvidos: null, extra: '', identificacao: null, anexo: null });
  const [enviado, setEnviado] = useState(null);
  const set = (k) => (v) => setF((x) => ({ ...x, [k]: v }));
  const pronto = f.texto.trim() && f.identificacao;

  if (enviado) return <Confirmacao relato={enviado} />;

  return (
    <>
      <View>
        <Rotulo icone="hand-heart-outline">TIPO DE SITUAÇÃO</Rotulo>
        <H>{tipo}</H>
      </View>

      <Card style={{ gap: 14 }}>
        <View style={{ gap: 8 }}>
          <T style={{ fontWeight: '700' }}>O que aconteceu?</T>
          <Campo
            label="O que aconteceu?"
            multiline
            value={f.texto}
            onChangeText={set('texto')}
            placeholder="Conte com suas palavras. Não precisa ser perfeito."
          />
        </View>

        <Escolha label="Quando aconteceu?" opcoes={quandosRelato} valor={f.quando} onChange={set('quando')} />
        <Escolha label="Onde aconteceu?" opcoes={locaisRelato} valor={f.local} onChange={set('local')} />
        <Escolha label="Você conhece as pessoas envolvidas?" opcoes={envolvidosRelato} valor={f.envolvidos} onChange={set('envolvidos')} />

        <View style={{ gap: 8 }}>
          <T style={{ fontWeight: '700' }}>Quer adicionar mais alguma informação?</T>
          <Campo
            label="Mais alguma informação (opcional)"
            multiline
            value={f.extra}
            onChangeText={set('extra')}
            placeholder="Opcional"
          />
        </View>

        <Pressable
          onPress={() => set('anexo')(f.anexo ? null : 'foto-1.jpg')}
          accessibilityRole="button"
          accessibilityLabel={f.anexo ? `Remover anexo ${f.anexo}` : 'Adicionar foto ou arquivo'}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 48, paddingHorizontal: 14, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: f.anexo ? c.violet : c.line, backgroundColor: f.anexo ? c.violetMist : c.snow }}
        >
          <Icone accessible={false} name="paperclip" size={20} color={c.violet} />
          <T style={{ flex: 1, fontWeight: '700', fontSize: 14 }}>{f.anexo ? `${f.anexo} · toque para remover` : '+ Adicionar foto ou arquivo'}</T>
        </Pressable>
        <T muted style={{ fontSize: 12 }}>O anexo é simulado nesta demonstração.</T>

        <Escolha label="Deseja se identificar?" opcoes={[IDENTIFICAR, ANONIMO]} valor={f.identificacao} onChange={set('identificacao')} />

        <T muted style={{ fontSize: 12 }}>{AVISO}</T>
        <Btn
          title="Enviar relato"
          icone="send"
          disabled={!pronto}
          accessibilityHint={pronto ? undefined : 'Preencha o que aconteceu e escolha se quer se identificar'}
          onPress={() =>
            setEnviado(
              s.enviarRelato({
                tipo,
                texto: f.texto.trim(),
                quando: f.quando,
                local: f.local,
                envolvidos: f.envolvidos,
                extra: f.extra.trim(),
                anexo: f.anexo,
                anonimo: f.identificacao === ANONIMO,
              }),
            )
          }
        />
      </Card>
    </>
  );
}

function Confirmacao({ relato }) {
  const nav = useNav();
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(`Relato recebido. Protocolo ${relato.protocolo}.`);
  }, [relato.protocolo]);
  return (
    <Card center style={{ gap: 12, paddingVertical: 28, backgroundColor: c.violetMist, borderColor: c.violetSoft }}>
      <Icone name="shield-check" size={56} color={c.violet} />
      <H style={{ textAlign: 'center' }}>Relato recebido 💜</H>
      <T style={{ textAlign: 'center' }}>Obrigado por confiar no SABIAA. Seu relato foi enviado para a equipe responsável da escola.</T>
      {relato.anonimo && <T muted style={{ textAlign: 'center' }}>Seu relato foi enviado de forma anônima.</T>}
      <Selo texto={`Protocolo #${relato.protocolo}`} />
      <Btn title="Voltar para o início" onPress={() => nav.irAba('Início')} style={{ alignSelf: 'stretch' }} />
    </Card>
  );
}

// --------------------------------------------------------------- gestão

const CARDS = Object.entries(statusRelato);

export function CentralGestao() {
  const s = useStore();
  const nav = useNav();
  const [filtro, setFiltro] = useState('Todos');
  const lista = s.relatos.filter((r) => combinaFiltro(r, filtro));

  return (
    <>
      <View>
        <H>Central de Proteção</H>
        <T muted>Relatos de bullying e assédio enviados pelos estudantes.</T>
      </View>

      {[CARDS.slice(0, 2), CARDS.slice(2)].map((linha, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 12 }}>
          {linha.map(([status, { cor, filtro: rotulo }]) => (
            <Stat
              key={status}
              valor={relatosBase[status] + s.relatos.filter((r) => r.status === status).length}
              label={status === 'Recebido' ? 'Novos relatos' : rotulo}
              cor={c[`${cor}Dark`] ?? c[cor]}
            />
          ))}
        </View>
      ))}

      <Escolha label="Filtrar" opcoes={FILTROS} valor={filtro} onChange={setFiltro} />

      {lista.length ? (
        lista.map((r) => (
          <Pressable
            key={r.protocolo}
            onPress={() => nav.abrir(Caso, { protocolo: r.protocolo })}
            accessibilityRole="button"
            accessibilityLabel={`Relato ${r.protocolo}. ${r.tipo}, ${r.data}, ${r.status}, ${r.anonimo ? 'anônimo' : 'identificado'}`}
          >
            <Card style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <H small style={{ flex: 1 }}>{r.tipo}</H>
                <T muted style={{ fontSize: 13 }}>{r.data}</T>
                <Icone accessible={false} name="chevron-right" size={22} color={c.hare} />
              </View>
              <T muted style={{ fontSize: 13 }}>#{r.protocolo} · {r.anonimo ? 'Anônimo' : 'Identificado'} · {r.local || 'Local não informado'}</T>
              <SeloStatus status={r.status} />
            </Card>
          </Pressable>
        ))
      ) : (
        <Card>
          <T muted>Nenhum relato neste filtro.</T>
        </Card>
      )}

      <T muted style={{ fontSize: 12 }}>Informações sensíveis. Visíveis apenas para a equipe autorizada da escola.</T>
    </>
  );
}

// status alvo (ou null, quando a ação só registra no histórico)
const ACOES = [
  { title: 'Marcar como em análise', status: 'Em análise', texto: 'Caso encaminhado para análise da equipe responsável.' },
  { title: 'Iniciar acompanhamento', status: 'Em acompanhamento', texto: 'Atendimento iniciado.' },
  { title: 'Encerrar caso', status: 'Encerrado', texto: 'Caso encerrado pela equipe responsável.' },
  { title: 'Encaminhar para responsável', status: null, texto: 'Caso encaminhado para a coordenação responsável.' },
];

function Caso({ protocolo }) {
  const s = useStore();
  const [obs, setObs] = useState('');
  const r = s.relatos.find((x) => x.protocolo === protocolo);

  return (
    <>
      <View>
        <Rotulo icone="shield-account-outline">RELATO #{r.protocolo}</Rotulo>
        <H>{r.tipo}</H>
        <SeloStatus status={r.status} />
      </View>

      <Card style={{ gap: 6 }}>
        <Dado rotulo="Data">{r.data}</Dado>
        <Dado rotulo="Quando">{r.quando}</Dado>
        <Dado rotulo="Local">{r.local}</Dado>
        <Dado rotulo="Identificação">{r.anonimo ? 'Anônimo' : 'Identificado'}</Dado>
        <Dado rotulo="Envolvidos">{r.envolvidos}</Dado>
        <Dado rotulo="Anexo">{r.anexo || 'Nenhum'}</Dado>
      </Card>

      <Card style={{ gap: 6 }}>
        <Rotulo icone="text-box-outline">DESCRIÇÃO</Rotulo>
        <T>{r.texto}</T>
        {r.extra ? (
          <>
            <Rotulo icone="information-outline">INFORMAÇÕES ADICIONAIS</Rotulo>
            <T>{r.extra}</T>
          </>
        ) : null}
      </Card>

      <Card style={{ gap: 10 }}>
        <Rotulo icone="history">HISTÓRICO DO ATENDIMENTO</Rotulo>
        {r.historico.map((h, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ alignItems: 'center', width: 10 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, marginTop: 6, backgroundColor: c[statusRelato[h.status].cor] }} />
              {i < r.historico.length - 1 && <View style={{ flex: 1, width: 2, backgroundColor: c.line }} />}
            </View>
            <View style={{ flex: 1, paddingBottom: 6 }}>
              <T style={{ fontWeight: '800', fontSize: 14 }}>{h.quando} — {h.status}</T>
              <T muted style={{ fontSize: 13 }}>{h.texto}</T>
            </View>
          </View>
        ))}
      </Card>

      <Card style={{ gap: 10 }}>
        <Rotulo icone="gesture-tap">AÇÕES</Rotulo>
        {ACOES.map((a) => (
          <Btn
            key={a.title}
            title={a.title}
            color={a.status === 'Encerrado' ? c.mint : c.violet}
            disabled={a.status === r.status}
            accessibilityHint={a.status === r.status ? 'O caso já está neste status' : undefined}
            onPress={() => s.registrarAcao(r.protocolo, a.status, a.texto)}
            style={{ alignSelf: 'stretch' }}
          />
        ))}
        <Campo label="Observação da equipe" multiline value={obs} onChangeText={setObs} placeholder="Escreva uma observação" />
        <Btn
          title="Adicionar observação"
          color={c.slate}
          disabled={!obs.trim()}
          onPress={() => {
            s.registrarAcao(r.protocolo, null, obs.trim());
            setObs('');
          }}
          style={{ alignSelf: 'stretch' }}
        />
      </Card>
    </>
  );
}
