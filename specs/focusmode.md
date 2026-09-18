# Modo Foco

## Objetivo

Criar uma funcionalidade de concentração dentro do SABIAA que permita ao estudante iniciar sessões de estudo com tempo definido, reduzindo distrações e incentivando períodos curtos e consistentes de foco.

A funcionalidade será **100% mockada**, sem necessidade de bloquear aplicativos reais do celular ou implementar mecanismos de controle do sistema operacional.

---

# 1. Acesso

Adicionar na Home do aluno um card de destaque:

### 🎯 Modo Foco

> "Escolha um objetivo, deixe as distrações de lado e concentre-se no que importa."

Botão:

**Começar foco**

Também pode exibir o último desempenho:

> 🔥 3 dias de sequência
> ⏱️ 85 min focados esta semana

---

# 2. Configuração da sessão

Ao clicar em **Começar foco**, abrir a tela de configuração.

### O que você quer fazer?

Campo:

**Digite sua atividade...**

Exemplos:

* Estudar matemática
* Fazer atividade de português
* Ler um capítulo
* Programar
* Revisar para a prova

---

### Quanto tempo você quer focar?

Apresentar opções rápidas:

**15 min**
**25 min**
**45 min**
**60 min**

E uma opção:

**Personalizado**

Para escolher outro período.

---

### Escolha seu objetivo

Opcionalmente, apresentar categorias:

📚 Estudos
💻 Projeto
📝 Tarefa
📖 Leitura
🧠 Revisão
✨ Outro

Botão principal:

**Começar sessão**

---

# 3. Tela de foco

Depois de iniciar, apresentar uma interface extremamente limpa.

Exemplo:

```text
             MODO FOCO

              24:37

        ━━━━━━━━━━━━━━━

        📚 Matemática

        "Revisar equações
         do segundo grau"


             🔕
        Distrações pausadas


        [ Pausar ]   [ Encerrar ]
```

O objetivo é reduzir elementos visuais desnecessários.

---

# 4. Timer

O timer deve funcionar de forma regressiva.

Exemplo:

**25:00 → 24:59 → 24:58...**

Durante a sessão, o aluno poderá:

* Pausar
* Continuar
* Encerrar sessão

Ao clicar em **Pausar**, o timer fica congelado.

---

# 5. Distrações

Durante a sessão, mostrar uma indicação visual:

### 🔕 Modo foco ativo

> "Continue concentrado na sua atividade."

Como o projeto é mockado, não será necessário realmente bloquear outros aplicativos.

Pode existir uma simulação visual de bloqueio:

> 📱 Redes sociais
>
> **Disponível novamente após o término da sessão.**

Essa tela serve apenas para demonstrar a proposta do recurso.

---

# 6. Encerrar antes do tempo

Caso o aluno clique em **Encerrar**, abrir confirmação:

### Tem certeza?

> "Sua sessão ainda não terminou. Você deseja encerrar?"

Botões:

**Continuar foco**

**Encerrar sessão**

Se encerrar, registrar a sessão como:

**Sessão interrompida**

---

# 7. Conclusão da sessão

Quando o timer chegar a zero, apresentar uma tela comemorativa:

### 🎉 Foco concluído!

> "Você reservou esse tempo para cuidar do seu aprendizado."

Exibir:

**25 minutos**

**Matemática**

**1 sessão concluída**

Adicionar recompensa:

### +25 pontos ⭐

E, caso exista sistema de sequência:

🔥 **Sequência mantida!**

Botão:

**Voltar para Home**

---

# 8. Avaliação rápida

Depois da sessão, apresentar uma pergunta opcional:

### Como foi seu foco?

😣 Muito difícil
😕 Difícil
😐 Normal
🙂 Bom
🤩 Excelente

Essa informação pode ser usada apenas no mock para alimentar os indicadores de progresso do aluno.

---

# 9. Histórico

Criar uma seção:

## Meu foco

Exibir:

### Hoje

**🎯 Matemática**
25 min · Concluído

**💻 Programação**
15 min · Concluído

### Esta semana

**⏱️ 85 minutos focados**

**🎯 4 sessões**

**🔥 3 dias de sequência**

---

# 10. Estatísticas

Criar pequenos cards:

**Tempo total**
`85 min`

**Sessões concluídas**
`4`

**Maior sessão**
`45 min`

**Sequência atual**
`3 dias 🔥`

Adicionar um gráfico simples de tempo focado por dia:

```text
SEG  █████
TER  ███
QUA  ███████
QUI  ██
SEX  █████
```

Todos os dados podem ser fictícios/mockados.

---

# 11. Gamificação

Cada sessão concluída gera pontos.

Exemplo:

**15 minutos → +15 pontos**

**25 minutos → +25 pontos**

**45 minutos → +45 pontos**

**60 minutos → +60 pontos**

Os pontos podem ser utilizados no sistema de personalização do mascote do SABIAA.

Exemplo:

> 🎉 Você desbloqueou um novo acessório!
>
> 🎩 Boné Roxo

---

# 12. Sequência

Adicionar sistema visual de sequência:

### 🔥 Sua sequência

**3 dias**

> Continue amanhã para manter sua sequência.

Caso o aluno fique um dia sem realizar uma sessão:

> "Tudo bem recomeçar. O importante é continuar."

Evitar linguagem punitiva.

---

# 13. Integração com o mascote

Durante a sessão, o mascote do SABIAA pode aparecer de forma discreta.

Exemplo:

**Antes da sessão:**

> 🐦 "Vamos focar juntos?"

**Durante:**

O mascote aparece pequeno no canto da tela.

**Depois:**

> 🐦 "Mandou bem! Mais uma sessão concluída!"

O mascote também pode receber animações diferentes dependendo do estado:

* Preparando → animado
* Focando → concentrado
* Concluído → comemorando

---

# 14. Home após a sessão

Depois de concluir uma sessão, atualizar o card da Home:

### 🎯 Seu foco hoje

**25 minutos focados**

`████████░░`

**1 sessão concluída**

**+25 pontos ⭐**

Botão:

**Focar novamente**

---

# 15. Dados mockados

A implementação deve utilizar dados fictícios.

Exemplo:

```text
Sessões desta semana:

Segunda
25 min

Terça
15 min

Quarta
45 min

Quinta
0 min

Sexta
25 min
```

O histórico e os gráficos devem ser alimentados por esses dados mockados.

Não é necessário implementar backend real para o funcionamento da demonstração.

---

# 16. Responsividade

A funcionalidade deve funcionar tanto em:

* Desktop
* Tablet
* Mobile

No mobile, o timer deve ocupar a maior parte da tela.

No desktop, utilizar um layout centralizado com bastante espaço negativo.

---

# 17. Identidade visual

Seguir a identidade do SABIAA:

* Roxo/lilás como cor principal.
* Fundo claro e limpo.
* Cards arredondados.
* Microanimações suaves.
* Tipografia amigável.
* Mascote integrado à experiência.
* Evitar excesso de elementos durante o foco.

A tela do timer deve ser propositalmente mais minimalista que as demais telas do aplicativo.

---

# 18. Critérios de aceite

* [ ] O aluno consegue acessar o Modo Foco pela Home.
* [ ] O aluno consegue definir uma atividade.
* [ ] O aluno consegue escolher uma duração.
* [ ] O timer realiza contagem regressiva.
* [ ] O aluno consegue pausar a sessão.
* [ ] O aluno consegue continuar a sessão.
* [ ] O aluno consegue cancelar a sessão.
* [ ] O sistema apresenta confirmação ao cancelar.
* [ ] O sistema apresenta uma tela de conclusão.
* [ ] Sessões concluídas geram pontos mockados.
* [ ] O aluno consegue visualizar seu histórico.
* [ ] O sistema apresenta estatísticas mockadas.
* [ ] O sistema apresenta sequência de dias.
* [ ] O mascote participa visualmente da experiência.
* [ ] O fluxo funciona sem backend real.
* [ ] Nenhum bloqueio real de aplicativos é necessário.

# Resultado esperado

O Modo Foco deve fazer o SABIAA parecer mais do que um aplicativo de acompanhamento escolar.

A experiência deve transmitir a ideia:

> **"O SABIAA me ajuda a começar, manter e reconhecer meu foco."**

A funcionalidade deve ser simples o suficiente para o aluno utilizar diariamente, mas integrada ao sistema de **pontos, mascote, progresso e bem-estar** do SABIAA.
