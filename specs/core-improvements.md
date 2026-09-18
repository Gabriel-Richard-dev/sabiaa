# Spec — Preparação para Escala, Inclusão e Atualização da Landing Page

## 1. Objetivo

Preparar a aplicação para receber aproximadamente **900 usuários**, garantindo estabilidade durante o período de maior acesso, além de atualizar a apresentação do projeto na landing page e disponibilizar a versão mais recente do aplicativo Android.

As alterações devem priorizar **estabilidade, simplicidade de operação e boa experiência do usuário**, evitando mudanças desnecessárias na arquitetura atual.

---

# 2. Escalabilidade e capacidade

## 2.1. Avaliar e implementar autoscaling

Deve ser avaliada a utilização de um mecanismo de **autoscaling** ou solução equivalente para lidar com picos de acesso.

### Objetivo

Permitir que a infraestrutura aumente sua capacidade automaticamente quando houver aumento significativo de:

* Requisições HTTP;
* Usuários simultâneos;
* Consumo de CPU;
* Consumo de memória;
* Carga no backend.

### Critério de implementação

Antes de adicionar uma solução complexa de autoscaling, verificar se a infraestrutura atual consegue suportar os aproximadamente **900 usuários** com:

* Aumento dos recursos da aplicação;
* Mais de uma instância do backend;
* Load balancing;
* Cache;
* Otimização de endpoints;
* Limitação de operações pesadas.

Caso autoscaling seja viável dentro da infraestrutura utilizada, implementar uma configuração simples e documentada.

Caso não seja necessário ou não seja suportado pela infraestrutura atual, utilizar uma estratégia alternativa de **capacity planning**, garantindo recursos suficientes para o pico esperado.

### Requisitos

* Não deve ocorrer indisponibilidade quando houver aumento de usuários.
* A aplicação deve conseguir executar múltiplas instâncias, caso necessário.
* Sessões/autenticação não devem depender exclusivamente do armazenamento local da instância.
* Arquivos e dados compartilhados devem permanecer em armazenamento persistente.
* Configurações sensíveis devem continuar sendo obtidas através de variáveis de ambiente/secrets.
* Registrar métricas básicas de CPU, memória e quantidade de requisições.

### Teste de carga

Antes do evento, realizar um teste simulando aproximadamente:

**900 usuários**

O teste deve verificar:

* Tempo médio de resposta;
* Taxa de erros;
* CPU;
* Memória;
* Banco de dados;
* Quantidade de requisições simultâneas;
* Comportamento durante picos.

O objetivo não é necessariamente simular 900 usuários realizando exatamente as mesmas ações simultaneamente, mas identificar possíveis gargalos antes do uso real.

---

# 3. Nova seção de inclusão na Landing Page

Adicionar uma nova seção na landing page apresentando o compromisso da solução com **inclusão e acessibilidade**.

## Objetivo

Mostrar visualmente que a aplicação foi pensada para atender diferentes perfis de estudantes e suas necessidades.

### Conteúdo

A seção deve apresentar exemplos de recursos/personagens relacionados à inclusão, podendo utilizar os personagens já desenvolvidos para o projeto.

Exemplos de representações:

* Pessoa utilizando cadeira de rodas;
* Pessoa com deficiência visual utilizando bengala;
* Pessoa utilizando identificação relacionada ao autismo;
* Outros perfis que representem diversidade e inclusão.

### Direção visual

A seção deve manter:

* Identidade visual atual da aplicação;
* Paleta utilizada na landing page;
* Estilo dos personagens;
* Linguagem visual amigável e educacional.

Evitar transformar a seção em uma lista excessivamente técnica de deficiências.

O foco deve ser mostrar que **diferentes estudantes podem utilizar a solução e se sentir representados**.

### Possível mensagem

> "Feito para diferentes formas de aprender, sentir e participar."

A mensagem pode ser adaptada ao restante da comunicação da landing page.

### Responsividade

A seção deve funcionar corretamente em:

* Desktop;
* Tablet;
* Mobile.

---

# 4. Gerar novo APK

Gerar uma nova versão do aplicativo Android contendo todas as alterações implementadas na versão atual.

### Requisitos

* Atualizar versão/versionCode do aplicativo;
* Gerar APK de produção;
* Validar instalação;
* Validar abertura do aplicativo;
* Validar login;
* Validar principais funcionalidades;
* Confirmar comunicação com o backend em produção.

### Validação

O APK gerado deve ser instalado em pelo menos um dispositivo Android para validação antes de ser disponibilizado na landing page.

---

# 5. Atualizar APK disponível na Landing Page

Substituir o APK atualmente disponibilizado na landing page pela nova versão.

### Requisitos

* O botão de download deve apontar para o novo APK;
* O arquivo antigo não deve continuar sendo disponibilizado pelo botão principal;
* Atualizar a informação de versão apresentada na página, caso exista;
* Garantir que o download funcione em dispositivos Android;
* Validar o arquivo após o upload.

### Opcional

Adicionar uma identificação simples:

**Versão atual: X.X.X**

Isso facilita para os usuários saberem se estão utilizando a versão mais recente.

---

# 6. Melhorias nas seções da Landing Page

Realizar uma revisão geral das seções existentes da landing page.

O objetivo é melhorar **clareza, aparência e apresentação do produto**, sem alterar a identidade visual principal.

## 6.1. Hero

Revisar:

* Título principal;
* Subtítulo;
* CTA;
* Hierarquia visual;
* Imagens/personagem;
* Espaçamentos.

O usuário deve entender rapidamente:

**O que é o SABIAA e qual problema ele resolve.**

---

## 6.2. Seção de funcionalidades

Melhorar a apresentação das principais funcionalidades.

Priorizar recursos como:

* Foco;
* Aprendizado;
* Bem-estar;
* Acompanhamento escolar;
* Atividades;
* Comunicação;
* Recursos de inclusão.

Evitar excesso de texto.

Utilizar cards, ilustrações e elementos visuais para facilitar a compreensão.

---

## 6.3. Seção de benefícios

Criar ou melhorar uma seção mostrando os principais benefícios da solução para:

### Alunos

* Maior organização;
* Apoio ao foco;
* Espaço para expressão;
* Atividades e interação.

### Professores

* Acompanhamento dos alunos;
* Recursos para atividades;
* Informações sobre a turma.

### Gestão escolar

* Visão geral dos estudantes;
* Comunicação;
* Acompanhamento de situações que precisam de atenção.

---

## 6.4. Seção de inclusão

Inserir a nova seção de inclusão descrita anteriormente em uma posição de destaque dentro da landing page.

A seção deve funcionar como parte natural da narrativa da página e não como um elemento isolado.

---

## 6.5. CTA final

Revisar o CTA localizado no final da landing page.

Deve existir uma chamada clara para:

**"Baixar o aplicativo"**

ou equivalente.

O botão deve utilizar o novo APK.

---

# 7. Performance da Landing Page

Como haverá aumento de usuários acessando a página, revisar também o carregamento da landing page.

### Verificar

* Tamanho das imagens;
* Compressão de assets;
* Lazy loading;
* JavaScript desnecessário;
* Fontes;
* Vídeos/animações;
* Cache;
* Tempo de carregamento inicial.

### Objetivo

Garantir uma boa experiência principalmente em dispositivos móveis e conexões mais lentas.

---

# 8. Checklist de entrega

## Infraestrutura

* [ ] Avaliar necessidade de autoscaling;
* [ ] Definir estratégia para suportar ~900 usuários;
* [ ] Verificar CPU e memória;
* [ ] Verificar banco de dados;
* [ ] Verificar gargalos do backend;
* [ ] Realizar teste de carga;
* [ ] Corrigir gargalos encontrados;
* [ ] Monitorar aplicação durante o período de uso.

## Landing Page

* [ ] Criar seção de inclusão;
* [ ] Adicionar personagens/ilustrações inclusivas;
* [ ] Melhorar Hero;
* [ ] Melhorar seção de funcionalidades;
* [ ] Melhorar seção de benefícios;
* [ ] Revisar CTA;
* [ ] Otimizar performance;
* [ ] Validar responsividade.

## Aplicativo

* [ ] Gerar novo APK;
* [ ] Atualizar versionCode/versionName;
* [ ] Instalar e testar APK;
* [ ] Validar funcionalidades principais;
* [ ] Publicar novo APK na landing page;
* [ ] Atualizar versão exibida na página;
* [ ] Testar botão de download.

## Validação final

* [ ] Testar landing page no desktop;
* [ ] Testar landing page no mobile;
* [ ] Testar download do APK;
* [ ] Testar login;
* [ ] Testar principais fluxos do aplicativo;
* [ ] Monitorar infraestrutura durante o acesso dos usuários.

# 9. Critério de aceite

A entrega será considerada concluída quando:

1. A infraestrutura estiver preparada para o pico estimado de aproximadamente **900 usuários**;
2. Um teste de carga tiver sido realizado e os principais gargalos tratados;
3. A landing page possuir uma seção dedicada à inclusão;
4. As principais seções da landing page estiverem visualmente revisadas;
5. O novo APK estiver validado;
6. O botão de download da landing page estiver disponibilizando o APK atualizado;
7. A experiência estiver validada em desktop e mobile;
8. Não houver erros críticos nos principais fluxos da aplicação.
