# Sabiaa — sistema de design
Primeira versão partiu da estrutura do Duolingo (pt.duolingo.com, 2026-09-12); botões e barras
foram redesenhados com formato próprio (pílula e fio) para não parecer cópia.
Paleta vem das logos do Sabiaa (`logos/*.svg`) e tipografia de fontes livres.

## Tipografia
- **Display / títulos:** `Baloo 2` (Google Fonts) — arredondada e pesada, mesmo espírito da
  *Feather Bold* do Duolingo. Pesos 700/800.
- **Corpo / UI:** `Nunito` (Google Fonts) — substitui a *DIN Next for Duolingo*. Pesos 500/700.
- Escala herdada (rem): heading 1.75 / 1.5 / 1.25 / 1, peso **700** sempre;
  body 1.25 (lh 1.75) peso 500; caption 1 (lh 1.5) peso 500; label 1.5 / 1 peso 700.
- Sem uppercase, sem letter-spacing.

## Formas e movimento
- border-radius: 16px em botões grandes, 12px em cards, 8px em elementos pequenos, 50% em avatares.
- Botão em pílula (raio total), sem sombra/lip; no `:active` encolhe (`scale(.97)`).
  Opções de quiz e itens tocáveis usam raio 16px uniforme.
- Barra "fio": trilho de 4px com um ponto de pouso (círculo branco, borda 3px da cor) no fim do progresso.
- Transições curtas: `filter` no hover, `transform` no clique.
- Bordas visíveis de 2px em cards (`--color-line`), nunca sombra difusa.

## Paleta — cores da marca (extraídas das logos)
| token | hex | uso |
|---|---|---|
| `violet` | `#7863ed` | cor da marca, botões primários, destaques |
| `violet-dark` | `#5a43e2` | lip/hover do botão primário |
| `violet-deep` | `#27187c` | títulos sobre fundo claro, ícones sólidos |
| `violet-soft` | `#cbc6fb` | preenchimentos suaves, badges |
| `violet-mist` | `#f0effc` | fundos de seção e blocos de destaque |
| `ink` | `#030021` | texto principal |
| `slate` | `#5b5a6e` | texto secundário |
| `hare` | `#a9a7bd` | texto desativado, bordas tracejadas |
| `line` | `#e3e1f3` | bordas de cards e divisores |
| `mist` | `#f9f9fb` | fundo alternado de seção |
| `snow` | `#ffffff` | fundo base |

Tons intermediários também presentes nas logos, úteis para gradientes e ilustração:
`#a398f6`, `#9586f4`, `#6651e7`, `#4f3ad8`, `#3d2aaf`, `#20146c`, `#130758`.

## Paleta — acentos semânticos
Escolhidos para conviver com o violeta mantendo o papel que verde/amarelo/vermelho têm no Duolingo.

| token | hex | claro | uso |
|---|---|---|---|
| `mint` | `#22c58b` | `#d6f7e8` | sucesso, progresso, dados positivos |
| `amber` | `#ffc247` | `#fff3d6` | atenção, dados de alerta |
| `coral` | `#ff5d73` | `#ffe0e4` | erro, dados negativos |
| `sky` | `#45b6ff` | `#e0f1ff` | informação, botão secundário (lip `#1f97e8`) |

## Como usar
Tokens vivem em `src/index.css` dentro de `@theme` (Tailwind v4) — as classes `bg-violet`,
`text-slate`, `border-line` etc. saem direto daí. O botão é a classe `.btn-pilula`; a barra é
`.fio` com a cor em `--cor`. No mobile: `Btn`, `Opcao`, `Bar` em `mobileapp/ui.js`.
