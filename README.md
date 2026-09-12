# Sabiaa

Sistema de Aprendizado e Bem-estar com Inteligência Artificial Acadêmica.
HACKTUDO — Time VIOLET (Camila Azevedo, Juan Pedro, Gabriel Richard, Mariana Holanda).

## Estrutura

| pasta | o que é |
|---|---|
| `landing/` | landing page (React + Vite + Tailwind v4) |
| `logos/` | logos e personagem em SVG |
| `animations/` | vídeos originais do passarinho (fonte; as versões em loop vivem em `landing/public/media`) |
| `inspiration/` | `sabiiadesign.md`, o sistema de design (cores, tipografia, formas) |

O app mobile em React Native entra como uma pasta irmã (ex.: `app/`) reaproveitando
as mesmas cores e tipografia de `inspiration/sabiiadesign.md`.

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
