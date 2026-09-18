# Central de Proteção e Apoio

## Objetivo

Adicionar ao SABIAA um canal seguro e acessível para que estudantes possam comunicar situações de **bullying** e **assédio** à gestão escolar.

A funcionalidade será **totalmente mockada**, servindo para demonstrar a experiência de uso e o fluxo de acompanhamento pela escola, sem necessidade de implementar um sistema real de denúncias, notificações ou encaminhamentos.

---

## 1. Acesso do aluno

Adicionar na Home do aluno uma área discreta chamada:

### 🛡️ Preciso de ajuda?

Texto de apoio:

> "Se algo aconteceu com você ou com alguém que você conhece, estamos aqui para ouvir."

A área deverá apresentar dois botões:

* **Sofri bullying**
* **Sofri assédio**

Também pode existir uma terceira opção:

* **Quero contar outra situação**

---

## 2. Fluxo de relato

Ao selecionar uma das opções, abrir uma tela de relato.

### Tipo de situação

O tipo já deve vir preenchido de acordo com o botão selecionado:

**Bullying**

ou

**Assédio**

### Formulário

Campos:

* **O que aconteceu?**

  * Campo de texto grande.
* **Quando aconteceu?**

  * Data.
* **Onde aconteceu?**

  * Sala, pátio, banheiro, internet etc.
* **Você conhece as pessoas envolvidas?**

  * Sim / Não / Prefiro não responder.
* **Quer adicionar mais alguma informação?**

  * Campo opcional.
* **Deseja se identificar?**

  * `Sim, quero me identificar`
  * `Prefiro fazer este relato anonimamente`

Adicionar uma opção mockada para anexar evidências:

**+ Adicionar foto ou arquivo**

---

## 3. Confirmação

Após clicar em **Enviar relato**, apresentar uma tela de confirmação.

### Relato recebido 💜

> "Obrigado por confiar no SABIAA. Seu relato foi enviado para a equipe responsável da escola."

Caso o relato seja anônimo:

> "Seu relato foi enviado de forma anônima."

Exibir também um código fictício:

**Protocolo #SB-2026-0148**

Botão:

**Voltar para o início**

---

## 4. Acompanhamento do aluno

Criar uma área:

### Meus relatos

O aluno poderá visualizar relatos enviados anteriormente.

Cada relato deverá mostrar:

* Tipo da ocorrência
* Data
* Protocolo
* Status

Exemplo:

**Bullying**
17/09/2026
`#SB-2026-0148`

**Status:** Em análise

Possíveis status:

* 🟡 Recebido
* 🔵 Em análise
* 🟣 Em acompanhamento
* 🟢 Encerrado

Como a funcionalidade é mockada, os status podem ser alterados visualmente pelo sistema para demonstrar o fluxo.

---

# 5. Painel da gestão

Adicionar ao dashboard administrativo uma nova seção:

## 🛡️ Central de Proteção

Criar cards com indicadores:

**Novos relatos**
`4`

**Em análise**
`7`

**Em acompanhamento**
`3`

**Encerrados**
`12`

---

## 6. Lista de ocorrências

Criar uma tabela/lista com:

| Protocolo | Tipo     | Data  | Status            | Identificação |
| --------- | -------- | ----- | ----------------- | ------------- |
| #SB-0148  | Bullying | 17/09 | Novo              | Identificado  |
| #SB-0147  | Assédio  | 16/09 | Em análise        | Anônimo       |
| #SB-0146  | Bullying | 15/09 | Em acompanhamento | Identificado  |

Adicionar filtros:

* Todos
* Bullying
* Assédio
* Outros
* Novos
* Em análise
* Em acompanhamento
* Encerrados

---

# 7. Visualização de um caso

Ao clicar em um relato, abrir uma página/modal com:

### Relato #SB-2026-0148

**Tipo:** Bullying
**Data:** 17/09/2026
**Local:** Pátio
**Identificação:** Identificado

### Descrição

Exibir o texto enviado pelo aluno.

### Informações adicionais

Exibir os demais dados fornecidos no formulário.

### Histórico do atendimento

Exemplo:

**17/09 — Relato recebido**
O estudante enviou um novo relato.

**17/09 — Em análise**
Caso encaminhado para análise da equipe responsável.

**18/09 — Em acompanhamento**
Atendimento iniciado.

---

## 8. Ações da gestão

Adicionar botões mockados:

* **Marcar como em análise**
* **Iniciar acompanhamento**
* **Encerrar caso**
* **Adicionar observação**
* **Encaminhar para responsável**

Ao clicar em qualquer ação, atualizar visualmente o histórico do caso.

---

# 9. Privacidade

A interface deve deixar claro que os relatos são tratados como informações sensíveis.

Na tela de envio, adicionar uma pequena mensagem:

> "Compartilhe apenas as informações necessárias. Seu relato será encaminhado à equipe responsável pela escola."

No painel da gestão, os relatos devem aparecer somente para usuários administrativos autorizados.

---

# 10. Experiência visual

A funcionalidade deve seguir a identidade do SABIAA:

* Interface acolhedora e não alarmista.
* Utilizar roxo/lilás como identidade principal.
* Vermelho apenas para indicar situações que exigem atenção, sem transformar a interface em algo agressivo.
* Ícones simples e amigáveis.
* Linguagem acolhedora e direta.
* Evitar termos que façam o aluno se sentir culpado ou pressionado.

O botão de ajuda deve ser **facilmente encontrado, mas visualmente discreto**, evitando expor o aluno caso alguém esteja olhando sua tela.

---

# 11. Dados mockados

Todos os dados devem ser fictícios.

Criar alguns relatos de exemplo para demonstrar o funcionamento:

### Relato 01

**Bullying — Em análise**

"Alguns alunos estão fazendo comentários sobre mim durante o intervalo."

### Relato 02

**Assédio — Em acompanhamento**

"Gostaria de conversar com alguém sobre uma situação que aconteceu na escola."

### Relato 03

**Bullying — Encerrado**

"Estavam me excluindo das atividades e fazendo comentários no grupo da turma."

Os dados devem ser utilizados somente para demonstração da interface.

---

# 12. Critérios de aceite

* [ ] O aluno consegue acessar a Central de Proteção pela Home.
* [ ] Existem opções específicas para Bullying e Assédio.
* [ ] O aluno consegue preencher um relato.
* [ ] Existe opção de relato identificado ou anônimo.
* [ ] Após o envio, é exibida uma confirmação.
* [ ] É gerado um protocolo mockado.
* [ ] O aluno consegue visualizar seus relatos.
* [ ] A gestão possui uma Central de Proteção.
* [ ] A gestão consegue visualizar relatos mockados.
* [ ] É possível filtrar os relatos.
* [ ] Cada relato possui um status.
* [ ] Existe histórico de acompanhamento.
* [ ] As ações da gestão atualizam visualmente o status.
* [ ] Nenhum dado real é necessário para a demonstração.

## Resultado esperado

A funcionalidade deve demonstrar que o SABIAA não atua somente no **foco e aprendizado**, mas também oferece um espaço de **acolhimento, comunicação e apoio dentro do ambiente escolar**.

Todo o fluxo deverá permanecer **mockado**, priorizando uma experiência visual convincente para a apresentação do projeto.

