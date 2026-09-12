# Sabiá — Spec de Melhorias do Protótipo Mockado

> **IMPORTANTE:** Todas as funcionalidades descritas nesta especificação devem ser **mockadas** para fins de protótipo/demonstração.
>
> Não é necessário implementar backend real, IA real, persistência de dados, autenticação real, integrações escolares ou comunicação em tempo real.
>
> Alem disso sempre que esse aruivo se referir como Sabiá mesmo o nome do app ser Sabiaa e tudo bem sobre isso não se preocupe com nome
> O objetivo é construir uma experiência visual e interativa convincente que demonstre **como o Sabiá funcionaria no mundo real**.

---

# 1. Objetivo do protótipo

Evoluir o aplicativo atual para demonstrar uma experiência mais completa de vida escolar.

O protótipo deve transmitir a ideia de que o Sabiá é um **hub da experiência escolar**, conectando:

* Aprendizagem.
* Participação.
* Bem-estar.
* Criatividade.
* Convivência.
* Gamificação.

A experiência deve parecer um produto funcional, mesmo quando determinadas funcionalidades forem apenas simuladas.

---

# 2. Regra geral de mock

Todas as informações podem ser estáticas ou simuladas.

Exemplos:

```text
Aluno:
Gabriel

Pontos:
840 XP

Nível:
6

Próxima recompensa:
1.000 XP
```

Os dados não precisam vir de API.

---

# 3. Interações que DEVEM ser simuladas

O protótipo deve permitir que o usuário clique e perceba mudanças de estado.

Exemplos:

### Ganhar pontos

Ao concluir uma atividade:

```text
+50 XP ✨

Seu Sabiá está evoluindo!
```

O número de pontos pode mudar visualmente.

---

### Desbloquear roupa

Ao atingir determinado nível:

```text
🎉 NOVA RECOMPENSA

Você desbloqueou:

🧢 Boné do Sabiá

[Equipar]
```

Ao clicar em "Equipar", a aparência do Sabiá deve mudar no mock.

---

### IA

O botão de IA deve abrir uma interface de chat simulada.

Exemplo:

```text
Aluno:
Não entendi essa questão.

Sabiá IA:
Vamos resolver juntos!

Primeiro, identifique qual informação
a questão está pedindo...
```

As respostas podem ser pré-definidas.

**Não é necessário integrar uma API de IA.**

---

### Comunidades

Ao clicar em:

```text
♟️ Xadrez no intervalo
```

abrir uma tela simulando:

```text
Xadrez no intervalo

Hoje • 10:30
📍 Pátio

8 alunos interessados

[Participar]
```

Ao clicar em participar:

```text
✓ Você está participando!
```

---

### Desafio do dia

Ao abrir:

```text
🎨 Desafio do dia

"Desenhe algo que te faz feliz."

[Começar desafio]
```

O protótipo pode simular uma tela de desenho ou uma área visual representando o envio.

Não é necessário implementar armazenamento real do desenho.

---

# 4. Nova Home

A Home é a **principal prioridade desta etapa**.

Ela deve deixar de parecer um dashboard administrativo e assumir uma aparência mais próxima de um aplicativo moderno de estudante.

## Hierarquia

### Header

```text
Olá, Gabriel 👋

Vamos continuar?
```

---

### Sabiá

O Sabiá deve ocupar bastante destaque visual.

Exibir:

```text
🐦 Sabiá

Nível 6
840 XP

████████████░░
160 XP para a próxima recompensa
```

Adicionar uma pequena mensagem contextual:

> "Seu Sabiá está quase desbloqueando uma nova roupa!"

---

### Ações rápidas

```text
📚       📢       🎨       💬       🧠
Aulas   Avisos   Desafio Comunidade Bem-estar
```

Os botões devem possuir ícones e labels.

---

### Próxima atividade

Card destacado:

```text
📚 PRÓXIMA ATIVIDADE

Matemática

Equações do 2º grau

Entrega hoje

[Continuar]
```

---

### Aviso

```text
📢 AVISO DA ESCOLA

Feira de Ciências

Sexta-feira • 14h

[Ver aviso]
```

---

### Desafio do dia

```text
🎨 DESAFIO DO DIA

"Desenhe algo que te faz feliz."

12 alunos já participaram

[Participar]
```

---

### Comunidade

```text
♟️ ACONTECENDO NA ESCOLA

Xadrez no intervalo

8 alunos interessados
Hoje • 10:30

[Participar]
```

---

# 5. Painel de avisos — MOCK

Criar uma tela de avisos com dados fictícios.

Exemplo:

```text
AVISOS

🔴 IMPORTANTE
Alteração no horário de amanhã

📚 ACADÊMICO
Entrega do trabalho de História

🎉 EVENTO
Feira de Ciências

🏆 COMPETIÇÃO
Interclasse 2026
```

Ao clicar em um aviso, abrir uma tela de detalhes.

---

# 6. Mural de desenhos — MOCK

Criar um mural visual semelhante a uma galeria.

Exemplo:

```text
DESAFIO DO DIA

🎨 "Desenhe seu lugar favorito"

┌───────┐ ┌───────┐
│       │ │       │
│ 🎨    │ │ 🎨    │
│       │ │       │
└───────┘ └───────┘

┌───────┐ ┌───────┐
│       │ │       │
│ 🎨    │ │ 🎨    │
│       │ │       │
└───────┘ └───────┘
```

Os desenhos podem ser imagens/mockups estáticos.

---

# 7. IA de atividades — MOCK

Adicionar um botão visual de IA nas atividades:

> ✨ **Ajuda do Sabiá**

Ao clicar, abrir um chat.

O chat deve possuir algumas respostas previamente configuradas para criar a sensação de interação.

### Exemplo

```text
Aluno:
Como começo essa questão?

Sabiá:
Vamos por partes 🐦

Primeiro, descubra qual informação
a questão está pedindo.

Dica:
Observe os números apresentados
no enunciado.
```

O objetivo é demonstrar o conceito de **IA como tutora**, não implementar a IA.

---

# 8. Comunidades — MOCK

Criar uma área com comunidades fictícias.

Exemplos:

```text
COMUNIDADES

♟️ Xadrez
12 participantes

🎨 Clube de Desenho
24 participantes

⚽ Futebol
31 participantes

🎮 Jogos
18 participantes

📚 Grupo de Estudos
15 participantes
```

Cada comunidade deve possuir uma tela própria.

---

# 9. Eventos presenciais

Comunidades devem enfatizar encontros presenciais.

Exemplo:

```text
♟️ XADREZ

Partida no intervalo

Hoje
10:30
Pátio

8 alunos interessados

[Participar]
```

O conceito visual deve deixar claro:

> **O aplicativo ajuda os alunos a se encontrarem no mundo real.**

---

# 10. Gamificação — MOCK

As ações realizadas no protótipo devem poder simular ganho de XP.

Exemplo:

```text
Atividade concluída!

+30 XP ⭐

Seu Sabiá ganhou experiência!
```

Outro exemplo:

```text
🎉 NOVO NÍVEL!

Sabiá — Nível 7

Nova recompensa desbloqueada:
🎒 Mochila escolar
```

---

# 11. Personalização do Sabiá — MOCK

Criar uma tela de personalização.

Categorias:

```text
ROUPAS
ACESSÓRIOS
CHAPÉUS
ITENS
```

Alguns itens podem estar:

```text
🔒 Bloqueado
```

e outros:

```text
✓ Disponível
```

Ao selecionar um item, alterar visualmente o Sabiá.

---

# 12. Bem-estar — MOCK

Criar uma entrada visual clara para bem-estar.

Exemplo:

```text
🧠 COMO VOCÊ ESTÁ HOJE?

🙂 Bem
😐 Normal
😔 Não muito bem
```

Após selecionar:

```text
Obrigado por compartilhar 💙

Quer fazer uma atividade rápida?

[Começar]
```

As atividades são apenas demonstrativas no protótipo.

---

# 13. Navegação

Sugestão:

```text
┌─────────────────────────────────┐
│                                 │
│             CONTEÚDO            │
│                                 │
│                                 │
├─────────────────────────────────┤
│ 🏠       📚       💬       👤  │
│Início  Aprender Comunidade Perfil│
└─────────────────────────────────┘
```

A Home concentra os conteúdos mais importantes.

---

# 14. Dados mockados

Utilizar dados fictícios consistentes em todo o aplicativo.

### Aluno

```text
Nome: Gabriel
Nível: 6
XP: 840
XP próximo nível: 1000
```

### Notas

```text
Matemática: 8,7
Português: 9,1
História: 8,4
Ciências: 9,3
```

### Comunidades

```text
Xadrez: 12
Desenho: 24
Futebol: 31
Jogos: 18
```

### Avisos

Utilizar 4–6 avisos fictícios.

### Desenhos

Utilizar imagens estáticas/mockadas.

### Atividades

Utilizar 3–5 atividades fictícias.

---

# 15. O que NÃO precisa ser implementado

Para esta versão:

* Backend real.
* Banco de dados real.
* Autenticação real.
* IA real.
* API de IA.
* Sistema real de notificações.
* Chat real entre alunos.
* Mensagens em tempo real.
* Persistência real de comunidades.
* Moderação automatizada.
* Integração com sistemas escolares.
* Sistema real de pagamentos.
* Analytics real.

Tudo pode ser simulado no frontend.

---

# 16. Critério de sucesso do protótipo

O protótipo será considerado bem-sucedido se uma pessoa conseguir navegar pela aplicação e entender rapidamente:

### 1. O que é o Sabiá?

Um companheiro digital de aprendizagem e bem-estar.

### 2. Por que o aluno usaria?

Para:

* Aprender.
* Participar.
* Acompanhar seu progresso.
* Personalizar seu Sabiá.
* Participar de desafios.
* Interagir com a comunidade escolar.

### 3. Como o celular deixa de ser distração?

O celular passa a ser utilizado para:

```text
APRENDER
PARTICIPAR
CRIAR
CONVIVER
CUIDAR
```

### 4. Qual é o diferencial?

A plataforma conecta aprendizagem, gamificação, bem-estar e convivência escolar em uma única experiência.

---

# 17. Prioridade visual

A ordem de importância para o protótipo deve ser:

```text
1. HOME
2. SABIÁ / GAMIFICAÇÃO
3. AULAS / ATIVIDADES
4. AVISOS
5. DESAFIO / MURAL
6. IA
7. COMUNIDADES
8. BEM-ESTAR
```

A Home deve apresentar uma amostra de todas essas experiências sem ficar visualmente carregada.

---

# 18. Direção final

O aplicativo deve parecer:

**jovem + acolhedor + divertido + educacional + seguro**

e não:

**sistema escolar tradicional + dashboard corporativo.**

O Sabiá deve ser o elemento visual que conecta toda a experiência.

> **O celular deixa de ser uma distração quando passa a ter um propósito.**
