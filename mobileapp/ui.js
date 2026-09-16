import { createContext, useContext, useEffect, useState } from 'react';
import { AccessibilityInfo, BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEventListener } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { itens } from './mock';

export function Icone({ accessible = false, ...props }) {
  return <MaterialCommunityIcons accessible={accessible} {...props} />;
}

export const Store = createContext(null);
export const useStore = () => useContext(Store);

// vídeos de ../landing/public/media (já cortados para o loop), com o branco trocado por violet-mist:
//   ffmpeg -i X.mp4 -filter_complex "color=c=0xf0effc:s=640x640:r=24[bg];[0:v]colorkey=0xffffff:0.03:0.04[fg];[bg][fg]overlay=shortest=1,format=yuv420p" -an X-app.mp4
// colorkey acima de ~0.05 começa a apagar as páginas do livro. Use os vídeos só sobre fundo violetMist.
// loop recomeça em `volta` (s) como o LoopVideo da landing, evitando o corte seco
// idle1/idle2 (de ../animations) e cores vão e voltam, igual ao pingPong da landing, já gravado no vídeo:
//   ...format=yuv420p,split[a][b];[b]trim=start_frame=1,setpts=PTS-STARTPTS,reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1:a=0
// cosmeticos toca uma vez e para no último quadro (`uma`)
const anims = {
  voando: { src: require('./assets/anim/voando.mp4'), volta: 2 },
  escrevendo: { src: require('./assets/anim/escrevendo.mp4'), volta: 2.17 },
  feliz: { src: require('./assets/anim/feliz.mp4'), volta: 0 },
  idle1: { src: require('./assets/anim/idle1.mp4'), volta: 0 },
  idle2: { src: require('./assets/anim/idle2.mp4'), volta: 0 },
  cores: { src: require('./assets/anim/cores.mp4'), volta: 0 },
  cosmeticos: { src: require('./assets/anim/cosmeticos.mp4'), uma: true },
};

export function Anim({ nome, size = 180, style }) {
  const { src, volta, uma } = anims[nome];
  const s = useStore();
  const [reducaoSistema, setReducaoSistema] = useState(false);
  const reduzirMovimento = reducaoSistema || s?.modoConforto;
  const player = useVideoPlayer(src, (p) => {
    p.muted = true;
    p.loop = !volta && !uma;
    if (!reduzirMovimento) p.play();
  });
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReducaoSistema);
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReducaoSistema);
    return () => sub.remove();
  }, []);
  useEffect(() => {
    if (reduzirMovimento) {
      player.pause();
      player.currentTime = 0;
    } else {
      player.play();
    }
  }, [player, reduzirMovimento]);
  useEventListener(player, 'playToEnd', () => {
    if (!volta || reduzirMovimento) return;
    player.currentTime = volta;
    player.play();
  });
  return (
    <View accessible={false} importantForAccessibility="no-hide-descendants" style={[{ width: size, height: size, borderRadius: size * 0.12, overflow: 'hidden' }, style]}>
      <VideoView player={player} nativeControls={false} contentFit="cover" surfaceType="textureView" allowsPictureInPicture={false} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

// paleta de inspiration/sabiiadesign.md
const paletaPrincipal = {
  violet: '#7863ed', violetDark: '#5a43e2', violetDeep: '#27187c', violetSoft: '#cbc6fb', violetMist: '#f0effc',
  ink: '#030021', slate: '#5b5a6e', hare: '#a9a7bd', line: '#e3e1f3', mist: '#f9f9fb', snow: '#ffffff',
  mint: '#22c58b', mintDark: '#17a171', mintSoft: '#d6f7e8', amber: '#ffc247', amberDark: '#d99a1c', amberSoft: '#fff3d6',
  coral: '#ff5d73', coralDark: '#e23e56', coralSoft: '#ffe0e4', sky: '#45b6ff', skyDark: '#1f97e8', skySoft: '#e0f1ff',
};

// Modo Conforto: mantém a identidade, mas troca apenas tons de baixo contraste.
const paletaConforto = {
  ...paletaPrincipal,
  violet: '#5a43e2', violetDark: '#3f2bb8', violetSoft: '#7863ed',
  slate: '#3f3e50', hare: '#5b5a6e', line: '#89869d',
  mint: '#0b7f5a', mintDark: '#07583f', amber: '#8a5700', amberDark: '#624000',
  coral: '#b4233d', coralDark: '#7e1327', sky: '#086aab', skyDark: '#064f80',
};

// ponytail: uma única raiz visual; separar em ThemeContext se o app passar a renderizar múltiplas raízes.
export let c = paletaPrincipal;
export function setPalette(modoConforto) {
  c = modoConforto ? paletaConforto : paletaPrincipal;
}

// tipografia de sabiiadesign.md: Baloo 2 nos títulos, Nunito no corpo
export const f = { corpo: 'Nunito_500Medium', negrito: 'Nunito_700Bold', extra: 'Nunito_800ExtraBold', titulo: 'Baloo2_700Bold', tituloExtra: 'Baloo2_800ExtraBold' };

// com fonte customizada o RN não troca de peso sozinho: fontWeight vira a família certa
export function T({ children, muted, style }) {
  const { fontWeight, ...resto } = StyleSheet.flatten(style) || {};
  const fontFamily = fontWeight === '800' ? f.extra : fontWeight === '700' ? f.negrito : f.corpo;
  return <Text allowFontScaling style={[{ fontFamily, fontSize: 15, lineHeight: 22, color: muted ? c.slate : c.ink }, resto]}>{children}</Text>;
}

export function H({ children, small, style }) {
  return <Text accessibilityRole="header" allowFontScaling style={[{ fontFamily: f.titulo, fontSize: small ? 20 : 24, lineHeight: small ? 26 : 32, color: c.violetDeep }, style]}>{children}</Text>;
}

export function Card({ children, style, center }) {
  return (
    <View style={[{ backgroundColor: c.snow, borderWidth: 2, borderColor: c.line, borderRadius: 12, padding: 16, gap: 8 }, center && { alignItems: 'center' }, style]}>
      {children}
    </View>
  );
}

// botão em pílula; ao pressionar encolhe
export function Btn({ title, icone, iconeFim, onPress, color = c.violet, disabled, small, style, accessibilityLabel = title, accessibilityHint, accessibilityState }) {
  const cor = disabled ? c.slate : c.snow;
  const tam = small ? 16 : 20;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!disabled, ...accessibilityState }}
      style={({ pressed }) => [
        {
          borderRadius: 999,
          backgroundColor: disabled ? c.line : color,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.88 : 1,
          paddingVertical: small ? 8 : 13,
          paddingHorizontal: small ? 14 : 20,
          minHeight: small ? 44 : 48,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
        },
        style,
      ]}
    >
      {icone && <Icone name={icone} size={tam} color={cor} />}
      <Text allowFontScaling style={{ color: cor, fontFamily: f.extra, fontSize: small ? 14 : 16 }}>{title}</Text>
      {iconeFim && <Icone name={iconeFim} size={tam} color={cor} />}
    </Pressable>
  );
}

// "fio": trilho fino com o ponto de pouso do sabiá no fim do progresso
export function Bar({ value, max = 100, color = c.violet, label = 'Progresso' }) {
  const atual = Math.max(0, Math.min(max || 1, value));
  const pct = Math.max(0, Math.min(1, atual / (max || 1))) * 100;
  return (
    <View accessible accessibilityRole="progressbar" accessibilityLabel={label} accessibilityValue={{ min: 0, max, now: atual, text: `${Math.round((atual / (max || 1)) * 100)}%` }} style={{ height: 14, justifyContent: 'center', alignSelf: 'stretch', marginHorizontal: 7 }}>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: c.line }}>
        <View style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: 2 }} />
      </View>
      <View style={{ position: 'absolute', left: `${pct}%`, marginLeft: -7, width: 14, height: 14, borderRadius: 7, borderWidth: 3, borderColor: color, backgroundColor: c.snow }} />
    </View>
  );
}

export function Stat({ valor, label, cor = c.violet }) {
  return (
    <Card style={{ flex: 1, alignItems: 'center', gap: 2, paddingHorizontal: 8 }}>
      <Text style={{ fontFamily: f.tituloExtra, fontSize: 26, lineHeight: 34, color: cor }}>{valor}</Text>
      <T muted style={{ fontSize: 13, textAlign: 'center' }}>{label}</T>
    </Card>
  );
}

export function Opcao({ texto, onPress, estado }) {
  const [bg, borda] = { certa: [c.mintSoft, c.mint], errada: [c.coralSoft, c.coral], escolhida: [c.violetMist, c.violet] }[estado] || [c.snow, c.line];
  const status = estado === 'certa' ? ', correta' : estado === 'errada' ? ', resposta incorreta' : estado === 'escolhida' ? ', selecionada' : '';
  return (
    <Pressable onPress={onPress} disabled={!onPress} accessibilityRole="radio" accessibilityLabel={`${texto}${status}`} accessibilityState={{ checked: !!estado, disabled: !onPress }} style={({ pressed }) => [{ borderRadius: 16, backgroundColor: bg, borderColor: borda, borderWidth: 2, padding: 14, minHeight: 48, transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
      <Text allowFontScaling style={{ fontSize: 16, fontFamily: f.negrito, color: c.ink }}>{texto}</Text>
    </Pressable>
  );
}

export function Campo({ label, accessibilityLabel, ...props }) {
  return (
    <TextInput
      {...props}
      accessibilityLabel={accessibilityLabel || label || props.placeholder}
      placeholderTextColor={c.hare}
      allowFontScaling
      style={[{ borderWidth: 2, borderColor: c.line, borderRadius: 12, padding: 12, fontSize: 15, fontFamily: f.corpo, color: c.ink, backgroundColor: c.snow }, props.multiline && { minHeight: 90, textAlignVertical: 'top' }, props.style]}
    />
  );
}

// sabiá animado (vídeo idle) com os itens equipados desenhados por cima; usar sobre fundo violetMist
export function Sabia({ size = 160, equip = {}, anim = 'idle1' }) {
  return (
    <View accessible={false} importantForAccessibility="no-hide-descendants" style={{ width: size, height: size }}>
      <Anim nome={anim} size={size} />
      {itens
        .filter((it) => equip[it.slot] === it.id)
        .map((it) => (
          <Icone key={it.id} name={it.icone} color={it.cor} size={it.tam * size} style={{ position: 'absolute', left: it.x * size, top: it.y * size }} />
        ))}
    </View>
  );
}

export const Nav = createContext(null);
export const useNav = () => useContext(Nav);

export function ModoConforto({ compact = false }) {
  const s = useStore();
  if (!s) return null;
  return (
    <Pressable
      onPress={s.alternarModoConforto}
      accessibilityRole="switch"
      accessibilityLabel="Modo Conforto"
      accessibilityHint="Ativa contraste maior e reduz movimentos"
      accessibilityState={{ checked: s.modoConforto }}
      style={{ minHeight: 44, minWidth: compact ? 44 : undefined, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingHorizontal: compact ? 4 : 12, paddingVertical: 6, borderRadius: 12, borderWidth: 2, borderColor: s.modoConforto ? c.violet : c.line, backgroundColor: s.modoConforto ? c.violetMist : c.snow }}
    >
      <Icone name={s.modoConforto ? 'eye-check-outline' : 'eye-outline'} size={18} color={c.violet} />
      {!compact && <Text allowFontScaling style={{ color: c.violet, fontFamily: f.extra, fontSize: 13 }}>{s.modoConforto ? 'Conforto ligado' : 'Modo Conforto'}</Text>}
    </Pressable>
  );
}

// casca de cada perfil: cabeçalho, conteúdo rolável, barra de abas e uma pilha simples de telas internas
export function Shell({ perfil, tabs, children }) {
  const s = useStore();
  const [aba, setAba] = useState(tabs[0].key);
  const [pilha, setPilha] = useState([]);
  const topo = pilha[pilha.length - 1];
  const Tela = topo ? topo.Tela : tabs.find((t) => t.key === aba).Tela;
  const nav = {
    abrir: (Tela, props) => setPilha((p) => [...p, { Tela, props }]),
    voltar: () => setPilha((p) => p.slice(0, -1)),
    irAba: (key) => {
      setAba(key);
      setPilha([]);
      AccessibilityInfo.announceForAccessibility(`${key} selecionado`);
    },
  };

  // botão voltar do Android fecha a tela interna antes de sair do app
  useEffect(() => {
    if (!pilha.length) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      setPilha((p) => p.slice(0, -1));
      return true;
    });
    return () => sub.remove();
  }, [pilha.length]);

  return (
    <Nav.Provider value={nav}>
      <SafeAreaView style={{ flex: 1, backgroundColor: c.mist }} edges={['top', 'bottom']}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 4, minHeight: 52, backgroundColor: c.snow, borderBottomWidth: 2, borderColor: c.line }}>
          {topo ? (
              <Pressable onPress={nav.voltar} hitSlop={10} accessibilityRole="button" accessibilityLabel="Voltar" accessibilityHint="Volta para a tela anterior" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: -6, minHeight: 44 }}>
              <Icone name="chevron-left" size={28} color={c.violet} />
              <Text style={{ color: c.violet, fontFamily: f.extra, fontSize: 16 }}>Voltar</Text>
            </Pressable>
          ) : (
            <>
              <Image accessible={false} source={require('./assets/logo.png')} style={{ width: 96, height: 24 }} resizeMode="contain" />
              <T muted style={{ flex: 1, marginLeft: 8 }}>{perfil}</T>
            </>
          )}
          <ModoConforto compact />
          <Pressable onPress={s.sair} hitSlop={10} accessibilityRole="button" accessibilityLabel="Trocar perfil" style={{ minHeight: 44, justifyContent: 'center', marginLeft: 4 }}>
            <Text style={{ color: c.violet, fontFamily: f.extra }}>Trocar perfil</Text>
          </Pressable>
        </View>
        <ScrollView key={`${aba}-${pilha.length}`} contentContainerStyle={{ padding: 16, gap: 12 }} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
          <Tela {...topo?.props} />
        </ScrollView>
        <View style={{ flexDirection: 'row', backgroundColor: c.snow, borderTopWidth: 2, borderColor: c.line }}>
          {tabs.map((t) => (
            <Pressable key={t.key} onPress={() => nav.irAba(t.key)} accessibilityRole="tab" accessibilityLabel={t.key} accessibilityState={{ selected: aba === t.key }} style={{ flex: 1, alignItems: 'center', paddingVertical: 8, minHeight: 52, justifyContent: 'center' }}>
              <Icone name={t.icone} size={24} color={aba === t.key ? c.violet : c.hare} />
              <Text style={{ fontSize: 11, fontFamily: f.extra, color: aba === t.key ? c.violet : c.hare }}>{t.key}</Text>
            </Pressable>
          ))}
        </View>
        {children}
      </SafeAreaView>
    </Nav.Provider>
  );
}
