# Sabiaa

Sistema de Aprendizado e Bem-estar com Inteligência Artificial Acadêmica.
HACKTUDO — Time VIOLET (Camila Azevedo, Juan Pedro, Gabriel Richard, Mariana Holanda).

## Estrutura

| pasta | o que é |
|---|---|
| `landing/` | landing page (React + Vite + Tailwind v4) |
| `mobileapp/` | MVP mobile (React Native + Expo), dados mockados |
| `logos/` | logos e personagem em SVG |
| `animations/` | vídeos originais do passarinho (fonte; as versões em loop vivem em `landing/public/media`) |
| `inspiration/` | `sabiiadesign.md`, o sistema de design (cores, tipografia, formas) |
| `specs/` | especificação do produto |

## Mobile app

```bash
cd mobileapp
npm install
npx expo start    # abre QR code: escaneie com o app Expo Go (Android/iOS)
npx expo start --web
```

Tudo roda em memória num único aparelho, então dá para demonstrar o fluxo da aula
trocando de perfil: **Professor → Aula → Próximo → Liberar**, depois **Trocar perfil → Aluno → Aula**
e responder. Os colegas da turma são simulados.

| arquivo | conteúdo |
|---|---|
| `App.js` | estado global (XP/nível, aula ao vivo, atividades, comunidades, desafio, eventos, parâmetros) e tela de login |
| `aluno.js` | início, aprender (aula ao vivo, atividades, Sabiá IA), comunidade (encontros, mural de desenhos), perfil (personalização, bem-estar, avisos) |
| `professor.js` | turmas, slides interativos, criação de atividades e respostas |
| `gestao.js` | painel, eventos, parâmetros |
| `ui.js` / `mock.js` | componentes visuais / dados fictícios |

## Landing

```bash
cd landing
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/
```

### Docker

```bash
docker compose up -d --build   # http://localhost:8080
docker compose down
```
