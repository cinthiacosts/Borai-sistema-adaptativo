# 🌿 BORAÍ

## 📍 Sistema Adaptativo de Recomendação

### ✨ Seu jeito de curtir, onde você estiver.

---

## 📑 Sumário

- [📖 Sobre o Projeto](#-sobre-o-projeto)
- [🎯 Tema](#-tema)
- [❗ Problema](#-problema)
- [👥 Público-alvo](#-público-alvo)
- [🎯 Objetivos](#-objetivos)
- [💡 Solução Proposta](#-solução-proposta)
- [📊 Pesquisa e Validação](#-pesquisa-e-validação)
- [👥 Equipe e Responsabilidades](#-equipe-e-responsabilidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🏗️ Arquitetura Geral](#️-arquitetura-geral-do-boraí)
- [🧠 Sistema Adaptativo](#-sistema-adaptativo)
- [🤖 Sistema de Recomendação](#-sistema-de-recomendação)
- [🧑‍⚖️ Human-in-the-loop](#️-human-in-the-loop-hitl)
- [🧾 Trilha de Auditoria](#-trilha-de-auditoria)
- [📚 Swagger](#-documentação-da-api--swagger)
- [🔐 Segurança](#-segurança)
- [🧪 Testes](#-testes-do-projeto)
- [🚀 Entregas do Projeto](#-entregas-do-projeto)
- [📁 Estrutura do Projeto](#-estrutura-atual-do-projeto)
- [📊 Status Atual](#-status-atual-do-projeto)
- [📌 Próximos Passos](#-próximos-passos)
- [🖼️ Miro](#️-miro)
- [💻 GitHub](#-repositório-github)
- [🎤 Mostra](#-mostra-de-estágio)

---

# 📖 Sobre o Projeto

O **Boraí** é um sistema adaptativo para recomendação personalizada de **lugares, eventos e experiências**.

O projeto busca ajudar moradores, turistas e visitantes a descobrir opções de lazer de maneira mais rápida e personalizada, considerando informações relacionadas ao perfil e ao contexto de cada usuário.

Entre os dados que podem participar do processo de recomendação estão:

- 👤 Perfil;
- ❤️ Preferências;
- 📍 Localização;
- 🔎 Contexto;
- 🧠 Histórico;
- ⭐ Avaliações;
- 👆 Interações anteriores.

O foco inicial do Boraí é a cidade de **Manaus - AM**.

> 💡 **Importante:** o Boraí não foi desenvolvido como uma plataforma de delivery ou venda de ingressos. O objetivo principal é auxiliar o usuário no processo de descoberta e decisão sobre **onde ir e o que fazer**.

---

# 🎯 Tema

**Sistema adaptativo para recomendação personalizada de lugares, eventos e experiências.**

---

# ❗ Problema

Pessoas que buscam opções de lazer e entretenimento em Manaus frequentemente precisam consultar diferentes fontes para descobrir lugares, eventos e experiências.

Entre essas fontes estão:

- 📱 Aplicativos;
- 🌐 Sites;
- 📸 Redes sociais;
- 👥 Indicações;
- ⭐ Plataformas de avaliação.

As informações ficam distribuídas e nem sempre correspondem aos interesses, à localização e ao contexto de cada pessoa.

## 🔎 Problema Central

> **Dificuldade de encontrar, de forma rápida e personalizada, opções de lazer adequadas ao perfil e ao contexto do usuário.**

---

# 👥 Público-alvo

O público inicial do Boraí é composto por:

- 🏠 Moradores de Manaus;
- ✈️ Turistas;
- 🧳 Visitantes;
- 🔎 Pessoas que buscam praticidade para decidir onde ir e o que fazer.

---

# 🎯 Objetivos

## 🏆 Objetivo Geral

Desenvolver uma plataforma adaptativa capaz de recomendar lugares, eventos e experiências considerando o perfil, as preferências, a localização e o contexto do usuário.

## 📌 Objetivos Específicos

- ❤️ Permitir que o usuário informe seus interesses e preferências;
- 🗂️ Organizar lugares, eventos e experiências por categorias;
- 📍 Considerar a localização do usuário;
- 🤖 Gerar recomendações personalizadas;
- ⭐ Permitir avaliações e feedbacks;
- 🧠 Utilizar o histórico para melhorar recomendações;
- 🔄 Adaptar sugestões conforme o contexto e comportamento;
- 🧑‍⚖️ Manter supervisão humana em decisões específicas;
- 🧾 Registrar ações relevantes por meio de auditoria;
- 💡 Apresentar justificativas para determinadas recomendações.

---

# 💡 Solução Proposta

O Boraí concentra a descoberta de opções de lazer em um único ambiente e apresenta recomendações personalizadas de lugares, eventos e experiências.

A proposta busca:

- ⏱️ Reduzir o tempo gasto procurando opções;
- 🔎 Reduzir o esforço de comparação entre diferentes fontes;
- ✨ Facilitar a descoberta de novos lugares;
- ❤️ Aproximar as sugestões dos interesses do usuário;
- 📍 Considerar localização e contexto;
- 🧠 Utilizar informações anteriores;
- 🔄 Adaptar progressivamente as recomendações.

O sistema utiliza informações do perfil, preferências, localização, contexto e histórico para modificar a relevância das opções apresentadas.

---

# 📊 Pesquisa e Validação

Durante a definição do problema foi realizada uma pesquisa exploratória com **48 participantes**.

## 📈 Principais resultados

| Indicador | Resultado |
|---|---:|
| 🔎 Procuram opções de lazer com frequência ou às vezes | **87,6%** |
| 🌐 Consultam mais de uma fonte sempre ou às vezes | **89,6%** |
| ⏱️ Perdem tempo pesquisando sempre ou às vezes | **74,4%** |
| ⭐ Dificuldade para saber se um lugar/evento é bem avaliado | **43,8%** |
| ❤️ Dificuldade para encontrar opções compatíveis com interesses | **41,7%** |
| 📍 Dificuldade para encontrar opções próximas | **37,5%** |
| 🌐 Apontaram informações espalhadas | **29,2%** |
| 💡 Consideraram útil ou muito útil uma plataforma personalizada | **98,0%** |

## 🛡️ Insight para o Produto

**66,7%** dos participantes selecionaram a **segurança do local ou região** como um fator importante para uma recomendação.

## 🗂️ Categorias mais desejadas

| Categoria | Resultado |
|---|---:|
| 🍴 Restaurantes | **72,9%** |
| 🌳 Passeios | **66,7%** |
| 🎵 Eventos | **52,1%** |
| 🎪 Feiras | **50%** |

---

# 🤝 Stakeholders

## 👤 Usuários diretos

- Moradores de Manaus;
- Turistas;
- Visitantes;
- Pessoas buscando opções de lazer.

## 🏢 Stakeholders indiretos

- Restaurantes;
- Bares;
- Cinemas;
- Teatros;
- Museus;
- Shoppings;
- Hotéis;
- Espaços de lazer;
- Organizadores de eventos;
- Fornecedores de experiências e atividades culturais.

---

# 👤 Perfis Iniciais

## 🏠 Morador de Manaus

Pessoa que procura atividades para finais de semana ou tempo livre.

## ✈️ Turista ou visitante

Pessoa que não conhece bem Manaus e busca opções de lazer sem precisar consultar várias plataformas.

---

# 💎 Proposta de Valor

> **O Boraí ajuda moradores, turistas e visitantes a descobrir onde ir e o que fazer em Manaus, oferecendo recomendações personalizadas de lugares, eventos e experiências de acordo com preferências, localização, histórico e avaliações da comunidade.**

## ✨ Ganhos para o Usuário

- ⏱️ Menos tempo procurando opções;
- 🔎 Menos esforço comparando fontes;
- 🌟 Descoberta de novos lugares e eventos;
- ❤️ Recomendações mais compatíveis;
- 🗂️ Informações reunidas em um único ambiente;
- 🧭 Apoio à decisão sobre onde ir e o que fazer.

---

# 👥 Equipe e Responsabilidades

| Integrante | Responsabilidade |
|---|---|
| 👑 **Cínthia Raquel Ferreira da Costa — Líder** | Gestão do Projeto, Documentação, Regras e Integração |
| 🎨 **Andrei Silva dos Santos** | UI/UX e Front-end |
| ⚙️ **Alex Farias Bentes** | Back-end e Integrações |
| 🗄️ **Ricardo Victor Batista do Nascimento Cardoso** | Banco de Dados e Segurança |
| 🤖 **Daniela Tatiane da Silva e Silva** | Inteligência Artificial e Recomendações |
| 🧠 **Jackeline Gonzaga Fioravante** | Sistema Adaptativo, Testes e Validação |

## 👑 Gestão, Documentação, Regras e Integração

**Cínthia Raquel Ferreira da Costa**

Responsável pela organização das entregas, requisitos, documentação, regras de negócio, README, acompanhamento da evolução do projeto e integração entre os módulos desenvolvidos pela equipe.

## 🎨 UI/UX e Front-end

**Andrei Silva dos Santos**

Responsável pelo desenvolvimento de protótipos, experiência do usuário, telas, componentes React e adaptações visuais.

## ⚙️ Back-end e Integrações

**Alex Farias Bentes**

Responsável pelo desenvolvimento do Back-end em Node.js, APIs, funcionalidades e integração entre os módulos.

## 🗄️ Banco de Dados e Segurança

**Ricardo Victor Batista do Nascimento Cardoso**

Responsável pela estruturação do banco NoSQL, armazenamento dos dados, autenticação, segurança e apoio à trilha de auditoria.

## 🤖 Inteligência Artificial e Recomendações

**Daniela Tatiane da Silva e Silva**

Responsável pelo desenvolvimento e integração dos recursos relacionados ao mecanismo de recomendações personalizadas.

## 🧠 Sistema Adaptativo, Testes e Validação

**Jackeline Gonzaga Fioravante**

Responsável pelas regras de adaptação, testes das funcionalidades e validação das recomendações e dos fluxos.

---

# 🛠️ Tecnologias Utilizadas

## 🎨 Front-end

- ⚛️ React;
- ⚡ Vite;
- 🟨 JavaScript;
- 🎨 CSS;
- 🗺️ Leaflet.

## ⚙️ Back-end

- 🟢 Node.js;
- 🚂 Express;
- 🟨 JavaScript;
- 🌐 API REST.

## 🗄️ Banco de Dados

- 🍃 MongoDB;
- 🔗 Mongoose;
- 🐳 Docker.

## 🔐 Segurança

- Variáveis de ambiente;
- Arquivo `.env`;
- Hash de senhas;
- `bcryptjs`;
- Validação de dados.

## 🧪 Testes

- Node Test Runner;
- Supertest.

## 📚 Documentação da API

- Swagger;
- swagger-jsdoc;
- swagger-ui-express.

## 🔄 Versionamento

- Git;
- GitHub.

---

# 🏗️ Arquitetura Geral do Boraí

A arquitetura atual do Boraí está organizada em camadas.

```text
👤 USUÁRIO
     ↓
🎨 FRONT-END
React + Vite
     ↓
🌐 API REST
Node.js + Express
     ↓
🛣️ ROUTES
     ↓
🎮 CONTROLLERS
     ↓
📋 REGRAS DE NEGÓCIO / SERVICES
     ↓
🤖 MECANISMO DE RECOMENDAÇÃO
     ↓
🧠 SISTEMA ADAPTATIVO
     ↓
🗄️ BANCO DE DADOS
MongoDB
```

O **Front-end** realiza as interações com o usuário e envia solicitações para a API.

O **Back-end** recebe as solicitações, executa validações, aplica regras de negócio e acessa os serviços responsáveis pelas recomendações.

O **MongoDB** mantém informações como:

- Usuários;
- Preferências;
- Contexto;
- Histórico;
- Interações;
- Estabelecimentos;
- Sugestões;
- Registros de auditoria.

---

# 🧠 Sistema Adaptativo

O Boraí não foi projetado para apresentar somente uma lista fixa de locais.

As informações associadas ao usuário podem influenciar a relevância das recomendações futuras.

## 🔄 Ciclo Adaptativo

```text
👤 Perfil
    ↓
❤️ Preferências
    ↓
📍 Localização / Contexto
    ↓
🤖 Recomendação
    ↓
👆 Interação
    ↓
📥 Evento
    ↓
🧠 Histórico / Memória
    ↓
🔄 Adaptação
    ↓
✨ Nova recomendação
```

O objetivo é fazer com que recomendações futuras possam ser influenciadas pelas informações e interações anteriores.

---

# 🧠 Memória Adaptativa

A memória do Boraí está relacionada principalmente ao histórico do usuário.

Uma interação pode registrar:

- 📍 Item relacionado;
- 🗂️ Categoria;
- 👆 Ação realizada;
- ⭐ Avaliação, quando disponível;
- 🕐 Momento da interação.

Dessa forma, uma nova recomendação não precisa considerar somente a escolha realizada naquele momento.

O sistema pode recuperar informações anteriores e utilizá-las novamente.

---

# 📍 Contexto Atual

Além do histórico, o Boraí possui estrutura para manter informações relacionadas ao contexto atual.

Podem participar desse contexto:

- 📍 Localização;
- 🗂️ Categoria atual;
- ❤️ Preferências;
- 🔎 Informações utilizadas na solicitação;
- 🧠 Histórico disponível.

---

# 🤖 Sistema de Recomendação

O Boraí possui um serviço responsável pela geração das recomendações.

O mecanismo considera informações relacionadas ao usuário e às opções disponíveis para definir sua relevância.

## 📊 Informações consideradas

- ❤️ Preferências;
- 🗂️ Categoria;
- 📍 Localização;
- 🔎 Contexto atual;
- 🧠 Histórico;
- 👍 Aprovações;
- 👎 Rejeições.

## ⚙️ Fluxo de decisão

```text
👤 Dados do usuário
        ↓
❤️ Preferências
        +
📍 Contexto
        +
🧠 Histórico
        ↓
📋 Regras de negócio
        ↓
📊 Cálculo de relevância
        ↓
🔢 Ordenação
        ↓
✨ Recomendação
```

---

# 👍 Memória Positiva

Quando o usuário demonstra interesse em determinada opção, a interação pode funcionar como um sinal positivo.

```text
👍 Usuário demonstra interesse
            ↓
📝 Interação registrada
            ↓
🧠 Histórico atualizado
            ↓
➕ Sistema identifica sinal positivo
            ↓
✨ Opções compatíveis podem ganhar relevância
```

---

# 👎 Memória Negativa

O sistema também considera rejeições.

Quando o usuário rejeita uma recomendação, essa informação pode reduzir a relevância daquela opção ou de elementos relacionados.

```text
🤖 Recomendação apresentada
            ↓
👎 Usuário rejeita
            ↓
📝 Rejeição registrada
            ↓
🧠 Histórico atualizado
            ↓
➖ Sistema considera sinal negativo
            ↓
🔄 Recomendação futura é modificada
```

---

# 💬 Recomendações Justificadas

O Boraí trabalha com o conceito de recomendação justificada.

Em vez de apresentar apenas uma opção, o sistema pode informar por que ela foi considerada relevante.

> 💡 **Exemplo:** “Recomendado porque combina com seu histórico de gastronomia regional e está próximo de você.”

A justificativa aumenta a transparência da recomendação.

---

# 🤖 Autonomia do Sistema

A autonomia do Boraí é limitada à análise e organização das opções.

## ✅ O sistema pode

- Analisar informações;
- Comparar opções;
- Calcular relevância;
- Ordenar resultados;
- Recomendar lugares, eventos e experiências;
- Adaptar recomendações futuras.

## 🚫 O sistema não decide pelo usuário

A escolha final de onde ir ou o que fazer permanece sob controle da pessoa.

---

# 🧑‍⚖️ Human-in-the-loop — HITL

O Boraí implementa o conceito de **Human-in-the-loop (HITL)**.

O objetivo é manter supervisão humana em decisões que não devem ser totalmente automatizadas.

Um dos casos implementados é a **sugestão de novos locais**.

## 🏪 Fluxo implementado

```text
👤 Usuário sugere um local
           ↓
📥 Sistema recebe a sugestão
           ↓
🟡 Status: PENDENTE
           ↓
🧑‍⚖️ Validação / moderação humana
        ↙             ↘
      ✅               ❌
   APROVAR           REJEITAR
      ↓                 ↓
🟢 Status           🔴 Status
APROVADO            REJEITADO
      ↓                 ↓
📍 Entra no          🚫 Não entra
   catálogo             no catálogo
```

Uma sugestão feita pelo usuário, portanto, **não é publicada automaticamente**.

## 📌 Estados utilizados

Os estabelecimentos podem possuir estados como:

- 🟡 `pendente`;
- 🟢 `aprovado`;
- 🔴 `rejeitado`.

Também é registrada a origem do local:

- 🏢 `plataforma`;
- 👤 `usuario`.

## 🛣️ Operações do HITL

A API possui operações para:

- Consultar sugestões pendentes;
- Enviar nova sugestão;
- Aprovar sugestão;
- Rejeitar sugestão.

### Endpoints principais

```text
GET    /api/places/pendentes
POST   /api/places/sugestoes
PATCH  /api/places/:id/aprovar
PATCH  /api/places/:id/rejeitar
```

## ✅ Validação realizada

O fluxo foi validado com:

- Criação de sugestão;
- Armazenamento como pendente;
- Consulta das sugestões pendentes;
- Aprovação;
- Remoção da lista de pendentes;
- Criação de outra sugestão;
- Rejeição;
- Registro das decisões na auditoria.

---

# 🧾 Trilha de Auditoria

O Boraí possui uma **trilha de auditoria persistida no MongoDB**.

O objetivo é registrar ações relevantes realizadas no sistema e permitir rastrear mudanças importantes.

## 📋 Informações registradas

Um registro de auditoria pode armazenar:

- Ação realizada;
- Entidade relacionada;
- ID da entidade;
- ID do usuário;
- Descrição;
- Dados relacionados à ação;
- Data e horário.

## 📝 Eventos registrados

| Evento | Descrição |
|---|---|
| ➕ `LOCAL_CADASTRADO` | Um local foi cadastrado |
| 📨 `SUGESTAO_ENVIADA` | Um usuário enviou uma sugestão |
| ✅ `SUGESTAO_APROVADA` | Uma sugestão foi aprovada |
| ❌ `SUGESTAO_REJEITADA` | Uma sugestão foi rejeitada |
| ✏️ `LOCAL_ATUALIZADO` | Informações de um local foram alteradas |

## 🔎 Consulta da auditoria

A API disponibiliza:

```text
GET /api/audit
```

A consulta retorna os registros mais recentes da trilha de auditoria.

## 🧪 Validação realizada

Durante os testes do HITL foram registrados corretamente eventos de:

```text
📨 SUGESTAO_ENVIADA
        ↓
✅ SUGESTAO_APROVADA
```

e também:

```text
📨 SUGESTAO_ENVIADA
        ↓
❌ SUGESTAO_REJEITADA
```

Os registros foram confirmados no banco e pela própria API de auditoria.

---

# 📚 Documentação da API — Swagger

A API do Boraí possui documentação interativa utilizando **Swagger**.

## 🌐 Endereço local

```text
http://localhost:3000/api-docs
```

## 📂 Organização da documentação

A documentação foi separada em grupos:

- ⚙️ **Sistema**;
- 👤 **Usuários**;
- 📍 **Estabelecimentos**;
- 🤖 **Recomendações**;
- 🧾 **Auditoria**.

## ⚙️ Sistema

Documenta operações relacionadas ao funcionamento da API, incluindo:

```text
GET /
GET /api/health
```

## 👤 Usuários

Inclui operações relacionadas a:

- Cadastro;
- Login;
- Consulta de usuário;
- Atualização;
- Contexto;
- Registro de interações.

## 📍 Estabelecimentos

Inclui:

- Listagem;
- Consulta;
- Cadastro;
- Atualização;
- Sugestões;
- Pendências;
- Aprovação;
- Rejeição.

## 🤖 Recomendações

Documenta o endpoint responsável pela solicitação de recomendações personalizadas.

## 🧾 Auditoria

Documenta a consulta da trilha de auditoria.

> 📌 O Swagger permite visualizar de forma centralizada os endpoints disponíveis na API e facilita a compreensão e demonstração do Back-end.

---

# 🔐 Segurança

Foram aplicadas medidas iniciais de segurança compatíveis com o escopo atual do MVP.

## 🛡️ Medidas implementadas

- Uso de variáveis de ambiente;
- Arquivo `.env` fora do versionamento;
- Hash de senhas;
- Uso do `bcryptjs`;
- Validação de informações recebidas pela API;
- Separação de responsabilidades;
- Estrutura modular;
- Controle de publicação por HITL;
- Registro de ações por auditoria.

## 🔑 Senhas

As senhas não são armazenadas diretamente em texto simples.

O Back-end utiliza hash antes da persistência no MongoDB.

## ⚠️ Escopo atual

A segurança implementada corresponde à **base do MVP acadêmico**.

A arquitetura atual não deve ser tratada como uma solução completa de autenticação e autorização para ambiente de produção.

---

# 🔒 Privacidade e Controle

O Boraí não depende de rastreamento contínuo do usuário.

Informações como localização devem ser utilizadas conforme disponibilidade e permissão.

O usuário continua responsável por suas escolhas.

---

# 🧪 Testes do Projeto

O Back-end possui testes automatizados para verificar as principais funcionalidades e reduzir o risco de regressões durante o desenvolvimento.

## 📊 Última validação

| Resultado | Quantidade |
|---|---:|
| 🧪 Testes executados | **10** |
| ✅ Testes aprovados | **10** |
| ❌ Falhas | **0** |

### 🟢 Resultado

> **100% dos testes automatizados atuais aprovados.**

## 🔎 Comportamentos cobertos pela bateria atual

Entre os comportamentos testados estão:

- Funcionamento da API;
- Health check;
- Solicitações válidas;
- Solicitações inválidas;
- Recomendação;
- Utilização da memória;
- Validação de ações;
- Validação de avaliações;
- Registro de interação;
- Atualização de contexto.

## 🧑‍⚖️ Validações manuais adicionais

Além da bateria automatizada, também foram validados manualmente:

- Cadastro;
- Login;
- Recomendações com histórico;
- Memória positiva;
- Memória negativa;
- HITL;
- Sugestão de local;
- Aprovação;
- Rejeição;
- Auditoria;
- Consulta da auditoria;
- Documentação Swagger.

> 📌 Os testes de HITL e auditoria foram realizados manualmente nesta etapa; eles ainda não fazem parte dos 10 testes automatizados contabilizados acima.

---

# 🚀 ENTREGAS DO PROJETO

---

# 🚀 Entrega 01 — Equipe e Definição do Projeto

📅 **Data:** 30/08/2026  
✅ **Status:** Concluída

## 📌 Definições realizadas

Nesta etapa foram definidos:

- Nome do projeto;
- Tema;
- Equipe;
- Problema inicial;
- Público-alvo;
- Objetivo geral;
- Objetivos específicos;
- Solução proposta;
- Divisão inicial de responsabilidades;
- Miro oficial;
- GitHub oficial.

## 🏆 Resultado da Entrega 01

A primeira entrega estabeleceu a base conceitual e organizacional do projeto.

O nome **Boraí** foi escolhido para representar uma solução relacionada à descoberta de lugares, eventos e experiências.

Também foi definida a frase:

> ✨ **Seu jeito de curtir, onde você estiver.**

A partir dessa etapa, a equipe passou a trabalhar com um problema e objetivo comuns.

---

# 🚀 Entrega 02 — Problema e Proposta de Valor

📅 **Data:** 06/09/2026  
✅ **Status:** Concluída

Nesta etapa, o problema foi revisado, aprofundado e validado por pesquisa exploratória.

## 🎯 Delimitação

O foco inicial foi definido como a descoberta de lugares, eventos e experiências de lazer em Manaus.

O sistema pode considerar:

- Preferências;
- Interesses;
- Localização;
- Histórico;
- Avaliações;
- Preço;
- Segurança;
- Ambiente;
- Contexto.

O foco principal **não é delivery, venda de produtos, refeições ou ingressos**.

## 📊 Evidências

A pesquisa contou com **48 participantes** e confirmou a existência de dificuldades relacionadas à busca fragmentada e à personalização.

## 💎 Proposta de Valor

O Boraí busca reunir descoberta e personalização em um mesmo ambiente, utilizando informações do usuário para apresentar opções mais relevantes.

---

# 🚀 Entrega 03 — Contexto e Eventos

📅 **Data:** 13/09/2026  
✅ **Status:** Concluída

Nesta etapa foram desenvolvidos o **Mapa de Contexto** e o **Catálogo Inicial de Eventos**.

## 🗺️ Mapa de Contexto

Foram considerados:

### 👥 Usuários

- Moradores;
- Turistas;
- Visitantes;
- Pessoas buscando lazer.

### 🌆 Ambiente

Manaus como foco inicial, incluindo:

- Lugares;
- Eventos;
- Restaurantes;
- Bares;
- Cinemas;
- Teatros;
- Museus;
- Feiras;
- Passeios;
- Shoppings;
- Hotéis.

### 🎯 Objetivos

- Descobrir onde ir e o que fazer;
- Encontrar opções compatíveis;
- Reduzir tempo de pesquisa.

### 🧠 Histórico

- Pesquisas;
- Itens visualizados;
- Recomendações;
- Preferências;
- Avaliações;
- Interações.

### ⚠️ Restrições

- Disponibilidade das informações;
- Localização;
- Horário;
- Distância;
- Preço;
- Segurança;
- Preferências;
- Privacidade.

## 🔄 Fluxo Contextual

```text
👤 Usuário
    ↓
👆 Evento / Interação
    ↓
🌿 Boraí
    ↓
🧠 Perfil + Contexto + Histórico
    ↓
🤖 Recomendação
    ↓
👆 Interação
    ↓
📝 Atualização do histórico
    ↓
🔄 Adaptação futura
```

## 📥 Catálogo Inicial de Eventos

### 1️⃣ Preferência informada

**Origem:** usuário.  
**Dados:** categorias, interesses e preferências.  
**Consequência:** atualizar preferências e personalizar recomendações.

### 2️⃣ Localização atualizada

**Origem:** usuário ou dispositivo, mediante disponibilidade/permissão.  
**Dados:** localização.  
**Consequência:** atualizar contexto.

### 3️⃣ Busca realizada

**Origem:** usuário.  
**Dados:** termo, categoria ou filtros.  
**Consequência:** apresentar opções relacionadas.

### 4️⃣ Recomendação solicitada

**Origem:** usuário.  
**Dados:** preferências, filtros e interesses.  
**Consequência:** gerar recomendações personalizadas.

### 5️⃣ Lugar ou evento visualizado

**Origem:** usuário.  
**Dados:** item e categoria.  
**Consequência:** registrar interação.

### 6️⃣ Avaliação ou feedback

**Origem:** usuário.  
**Dados:** avaliação, feedback e item.  
**Consequência:** utilizar o sinal em recomendações futuras.

### 7️⃣ Preferência alterada

**Origem:** usuário.  
**Dados:** preferências modificadas.  
**Consequência:** atualizar perfil e adaptação futura.

## 📌 Artefatos da Entrega 03

- Mapa de Contexto;
- Catálogo Inicial de Eventos;
- Evolução semanal;
- README atualizado.

---

# 🚀 Entrega 04 — Estados e Jornada

📅 **Data:** 20/09/2026  
✅ **Status:** Concluída

Foram definidos estados, transições, eventos, jornada convencional, jornada adaptativa e pontos de decisão.

## 🔄 Estados e Transições

```text
🚀 Início
    ↓
👤 Perfil identificado
    ↓
📍 Contexto analisado
    ↓
🔎 Busca / Solicitação
    ↓
🤖 Recomendações
    ↓
👆 Interação
    ↓
💬 Feedback
    ↓
🧠 Perfil + Histórico atualizados
    ↓
🔄 Nova adaptação
```

## 🚶 Jornada Convencional

```text
Usuário entra
→ Escolhe categoria
→ Define filtros
→ Pesquisa
→ Analisa opções
→ Escolhe
```

## 🧠 Jornada Adaptativa

```text
Usuário entra
→ Sistema recupera perfil e histórico
→ Identifica contexto
→ Analisa preferências e localização
→ Gera recomendações
→ Usuário interage
→ Registra interação
→ Adapta recomendações futuras
```

## ❓ Pontos de Decisão

- Localização disponível?
- Existe histórico?
- Existem preferências?
- Qual é o contexto atual?
- Existem opções compatíveis?
- O usuário aprovou ou rejeitou?
- Houve avaliação?

## 🎨 Possíveis Adaptações da Interface

- Priorizar categorias;
- Destacar opções próximas;
- Reorganizar recomendações;
- Considerar contexto;
- Destacar informações relevantes;
- Reduzir opções pouco compatíveis;
- Personalizar recomendações futuras.

---

# 🚀 Entrega 05 — Arquitetura e Memória

📅 **Data:** 27/09/2026  
✅ **Status:** Concluída

Nesta etapa foi estruturada a arquitetura funcional conectando Back-end, banco NoSQL, regras de negócio, contexto, histórico e recomendação.

## 🏗️ Arquitetura Implementada

```text
👤 Usuário
    ↓
🎨 Front-end
React + Vite
    ↓
🌐 API REST
Node.js + Express
    ↓
🎮 Controllers
    ↓
📋 Regras / Services
    ↓
🤖 Recomendação
    ↓
🍃 MongoDB
```

## 📦 Organização do Back-end

### ⚙️ Config

Configurações e conexão com banco.

### 🎮 Controllers

Recebem solicitações e coordenam operações.

### 🗄️ Models

Representam estruturas armazenadas no MongoDB.

### 🛣️ Routes

Definem os endpoints da API.

### 🔧 Services

Concentram serviços específicos.

### 📋 Business

Mantém regras de negócio.

### 🌱 Seeds

Permitem inserir dados iniciais.

### 🧪 Tests

Mantêm os testes automatizados.

## 🗄️ Banco NoSQL

O projeto utiliza **MongoDB**, com comunicação por **Mongoose** e ambiente configurado com **Docker**.

## 👤 Modelo de Usuário

Pode armazenar:

- Nome;
- E-mail;
- Senha protegida;
- Preferências;
- Contexto;
- Histórico.

## 📍 Modelo de Estabelecimento

Representa os locais e opções que podem participar do sistema de recomendação.

## 💾 Persistência

A persistência permite que o histórico continue disponível entre diferentes solicitações.

## 🏆 Resultado da Entrega 05

```text
👆 Receber interação
        ↓
👤 Identificar usuário
        ↓
📝 Registrar informação
        ↓
🍃 Armazenar no MongoDB
        ↓
🧠 Recuperar histórico
        ↓
🤖 Utilizar histórico
        ↓
🔄 Modificar recomendação
```

---

# 🚀 Entrega 06 — Interface e Fluxo

📅 **Data:** 04/10/2026  
✅ **Status:** Concluída

Nesta etapa foi desenvolvida e integrada a interface funcional inicial.

## 🎨 Front-end

Utiliza:

- React;
- Vite;
- JavaScript;
- CSS.

A aplicação se comunica com a API por meio de um serviço centralizado de requisições.

## 🔐 Login

O usuário pode informar:

- E-mail;
- Senha.

Os dados são enviados ao Back-end para validação.

## 📝 Cadastro

O fluxo solicita:

- Nome;
- E-mail;
- Senha;
- Confirmação.

Depois, o usuário segue para a seleção de preferências.

## ❤️ Preferências

Categorias utilizadas incluem:

- Gastronomia;
- Cafeterias;
- Bares;
- Eventos;
- Hotéis;
- Natureza e lazer.

## 💾 Persistência da Conta

```text
👤 Dados
    ↓
🎨 Front-end
    ↓
🌐 API
    ↓
✅ Validação
    ↓
🔐 Hash
    ↓
🍃 MongoDB
    ↓
✅ Conta criada
```

## 🏠 Home

A estrutura possui:

- Perfil;
- Logo;
- Busca;
- Categorias;
- Recomendações;
- Cards;
- Mapa;
- Navegação-base.

## 🗺️ Mapa

Foi integrado um componente de mapa para oferecer referência espacial dos estabelecimentos.

## 🔄 Fluxo da Interface

```text
🌿 Abrir Boraí
      ↓
🔐 Login
      ↓
     OU
      ↓
📝 Criar conta
      ↓
❤️ Preferências
      ↓
✅ Conta registrada
      ↓
🔐 Login
      ↓
🏠 Home
      ↓
🔎 Busca / Categoria
      ↓
🤖 Recomendação
      ↓
📇 Cards + 🗺️ Mapa
```

## 📱 Responsividade

A estilização-base contempla:

- Login;
- Cadastro;
- Preferências;
- Home;
- Cards;
- Categorias;
- Navegação;
- Mapa.

A identidade visual continua em refinamento para o fechamento do MVP.

---

# 🚀 Entrega 07 — IA e Autonomia

📅 **Data:** 11/10/2026  
✅ **Status:** Concluída

Nesta etapa foi consolidado o mecanismo responsável pela inteligência de recomendação e pelo comportamento adaptativo.

## 🤖 Mecanismo de Recomendação

O sistema utiliza sinais relacionados ao usuário para calcular a relevância das opções.

## 🧠 Adaptação

Foram validados:

- Histórico;
- Memória positiva;
- Memória negativa;
- Aprovações;
- Rejeições;
- Alteração da relevância;
- Recomendações justificadas.

## 🧪 Validação da Adaptação

Os testes realizados demonstraram que o histórico não funciona apenas como registro.

Ele pode efetivamente participar da decisão posterior e modificar a relevância das opções.

## 🧑‍⚖️ Controle Humano

A autonomia permanece limitada.

O sistema recomenda e organiza, enquanto a escolha final permanece com o usuário.

## 🏆 Resultado da Entrega 07

```text
👤 Usuário
      ↓
❤️ Perfil + Preferências + Contexto
      ↓
🧠 Sistema analisa
      ↓
📋 Regras de negócio
      ↓
💡 Recomendação justificada
      ↓
👆 Usuário interage
      ↓
📝 Histórico atualizado
      ↓
🔄 Sistema utiliza a interação
      ↓
✨ Próxima recomendação adaptada
```

---

# 🚀 Entrega 08 — MVP Final

📅 **Data prevista:** 18/10/2026  
🟡 **Status:** Em desenvolvimento

A Entrega 08 corresponde à consolidação final de todos os módulos desenvolvidos durante o projeto.

O objetivo é apresentar um MVP integrado contendo Front-end, Back-end, banco NoSQL, sistema adaptativo, recomendação, supervisão humana, auditoria e documentação.

## ✅ Componentes disponíveis

### 🎨 Front-end

- React;
- Vite;
- Login;
- Cadastro;
- Preferências;
- Home;
- Busca;
- Categorias;
- Cards;
- Mapa;
- Navegação-base.

### ⚙️ Back-end

- Node.js;
- Express;
- API REST;
- Controllers;
- Routes;
- Services;
- Regras de negócio.

### 🗄️ Banco

- MongoDB;
- Mongoose;
- Docker;
- Usuários;
- Preferências;
- Contexto;
- Histórico;
- Estabelecimentos;
- Auditoria.

### 🧠 Sistema Adaptativo

- Perfil;
- Preferências;
- Contexto;
- Histórico;
- Interações;
- Adaptação positiva;
- Adaptação negativa.

### 🤖 Recomendações

- Regras de relevância;
- Recomendações personalizadas;
- Uso da memória;
- Justificativas.

### 🧑‍⚖️ Human-in-the-loop

- Sugestão de local;
- Status pendente;
- Consulta de pendências;
- Aprovação humana;
- Rejeição humana;
- Publicação apenas após aprovação.

### 🧾 Auditoria

- Modelo persistente no MongoDB;
- Registro de sugestões;
- Registro de aprovações;
- Registro de rejeições;
- Registro de cadastro/alteração de locais;
- Endpoint de consulta.

### 📚 Swagger

- Swagger configurado;
- Interface `/api-docs`;
- Sistema documentado;
- Usuários documentados;
- Estabelecimentos documentados;
- Recomendações documentadas;
- Auditoria documentada.

### 🔐 Segurança Inicial

- `.env`;
- Variáveis de ambiente;
- Hash de senha;
- bcryptjs;
- Validações.

### 🧪 Testes

- 10 testes automatizados;
- 10 aprovados;
- 0 falhas;
- Validação manual do HITL;
- Validação manual da auditoria;
- Validação do Swagger.

---

## 🏆 Avanço da Entrega 08

Nesta etapa foram concluídos três componentes importantes que anteriormente estavam previstos para o fechamento do MVP:

```text
🧑‍⚖️ HUMAN-IN-THE-LOOP
          ✅
          ↓
🧾 TRILHA DE AUDITORIA
          ✅
          ↓
📚 DOCUMENTAÇÃO SWAGGER
          ✅
          ↓
🧪 REGRESSÃO
10 / 10 TESTES APROVADOS
```

Esses componentes ampliaram a transparência e a rastreabilidade do sistema e aproximaram o projeto dos requisitos definidos para o MVP final.

---

## 📌 Itens ainda necessários para o fechamento

- 🎨 Refinamentos finais de UI/UX;
- 👆 Interações restantes do Front-end;
- 🗺️ Atualização final do Miro;
- 📖 Revisão final do README após fechamento do Front-end;
- 🧪 Teste completo do fluxo final;
- 🎤 Preparação da apresentação.

> ✅ **HITL, auditoria e Swagger não estão mais na lista de pendências**, pois já foram implementados e validados.

---

## 🔄 Fluxo Atual do MVP

```text
👤 USUÁRIO
    ↓
📝 CADASTRO
    ↓
❤️ PREFERÊNCIAS
    ↓
🔐 LOGIN
    ↓
🏠 HOME
    ↓
📍 CONTEXTO
    ↓
🔎 BUSCA / RECOMENDAÇÃO
    ↓
🧠 SISTEMA ADAPTATIVO
    ↓
📇 CARDS + 🗺️ MAPA
    ↓
👆 INTERAÇÃO
    ↓
📝 HISTÓRICO
    ↓
🔄 ADAPTAÇÃO
    ↓
✨ NOVA RECOMENDAÇÃO
```

Paralelamente, para inclusão de conteúdo:

```text
👤 SUGESTÃO
    ↓
🟡 PENDENTE
    ↓
🧑‍⚖️ MODERAÇÃO
   ↙       ↘
 ✅         ❌
APROVAR   REJEITAR
   ↓         ↓
🧾 AUDITORIA
```

---

# 📁 Estrutura Atual do Projeto

```text
Borai-sistema-adaptativo/
│
├── backend/
│   │
│   ├── src/
│   │   ├── adaptive/
│   │   ├── business/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── swagger.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auditController.js
│   │   │   ├── placeController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── models/
│   │   │   ├── AuditLog.js
│   │   │   ├── Place.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auditRoutes.js
│   │   │   ├── placeRoutes.js
│   │   │   ├── recommendationRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── seeds/
│   │   ├── services/
│   │   └── server.js
│   │
│   ├── tests/
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── MapaBorai.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# 🔗 Integração Atual

```text
⚛️ React
    ↓
🌐 services/api.js
    ↓
🚂 API Express
    ↓
🛣️ Routes
    ↓
🎮 Controllers
    ↓
🔧 Services / Business Rules
    ↓
🍃 MongoDB
    ↓
📤 Resposta
    ↓
⚛️ React
```

Essa estrutura mantém responsabilidades separadas e facilita a evolução do projeto.

---

# 📊 Status Atual do Projeto

## 👥 Status da Equipe

| Integrante | Responsabilidade | Status |
|---|---|---|
| ⚙️ Alex Farias Bentes | Back-end e Integrações | ✅ Base concluída |
| 🗄️ Ricardo Victor Batista do Nascimento Cardoso | Banco e Segurança | ✅ Base concluída |
| 🤖 Daniela Tatiane da Silva e Silva | IA e Recomendações | ✅ Base concluída |
| 🧠 Jackeline Gonzaga Fioravante | Sistema Adaptativo, Testes e Validação | ✅ Base concluída |
| 👑 Cínthia Raquel Ferreira da Costa | Gestão, Documentação, Regras e Integração | ✅ Base concluída |
| 🎨 Andrei Silva dos Santos | UI/UX e Front-end | 🟡 Refinamento |

---

# 📅 Status Geral das Entregas

| Entrega | Tema | Data | Status |
|---|---|---|---|
| 01 | Equipe e Definição | 30/08/2026 | ✅ Concluída |
| 02 | Problema e Proposta de Valor | 06/09/2026 | ✅ Concluída |
| 03 | Contexto e Eventos | 13/09/2026 | ✅ Concluída |
| 04 | Estados e Jornada | 20/09/2026 | ✅ Concluída |
| 05 | Arquitetura e Memória | 27/09/2026 | ✅ Concluída |
| 06 | Interface e Fluxo | 04/10/2026 | ✅ Concluída |
| 07 | IA e Autonomia | 11/10/2026 | ✅ Concluída |
| 08 | MVP Final | 18/10/2026 |✅ Concluída  |

---

# 📈 Evolução do Boraí

```text
🚀 ENTREGA 01
Definição do projeto
        ↓
📊 ENTREGA 02
Validação do problema
        ↓
🗺️ ENTREGA 03
Contexto e eventos
        ↓
🔄 ENTREGA 04
Estados e jornada adaptativa
        ↓
🏗️ ENTREGA 05
Arquitetura + memória
        ↓
🎨 ENTREGA 06
Interface + integração
        ↓
🤖 ENTREGA 07
Recomendação + adaptação + autonomia
        ↓
🚀 ENTREGA 08
MVP FINAL
HITL + Auditoria + Swagger + Integração
```

Cada entrega utiliza elementos desenvolvidos nas etapas anteriores.

---

# 📌 Próximos Passos

Para concluir a Entrega 08:

1. 🎨 Finalizar os refinamentos de UI/UX;
2. 👆 Concluir as interações restantes do Front-end;
3. 🧪 Realizar o teste completo do fluxo final;
4. 🗺️ Atualizar o Miro;
5. 📖 Fazer a revisão final do README;
6. 🎤 Preparar a demonstração do MVP.

## 🎨 Pontos do Front-end ainda em refinamento

Entre os elementos previstos para o fechamento visual e funcional estão:

- ❤️ Favoritos;
- 📍 “Quero conhecer”;
- 🧭 Explorar;
- 👤 Perfil;
- 💬 Chat;
- 🗺️ Exploração pelo mapa;
- 🔎 Ações complementares da Home;
- 🎨 Refinamento visual final.

---

# 🖼️ Miro

O projeto possui um quadro oficial no **Miro**, utilizado para organizar os artefatos e acompanhar a evolução das entregas.

O quadro contém materiais relacionados a:

- Tema;
- Problema;
- Público;
- Objetivos;
- Solução;
- Adaptação;
- Valor;
- Equipe;
- Contexto;
- Eventos;
- Estados;
- Jornada;
- Evolução das entregas.

---

# 💻 Repositório GitHub

O código-fonte e a evolução técnica do Boraí são versionados no **GitHub**.

O repositório mantém:

- Back-end;
- Front-end;
- README;
- Histórico de commits;
- Evolução das integrações;
- Documentação do projeto.

## 🧾 Marco atual do desenvolvimento

O avanço de HITL, auditoria e Swagger foi registrado no histórico do projeto com o commit:

```text
b97f7e7
feat: adiciona HITL, auditoria e Swagger ao Borai
```

Isso mantém uma versão segura da implementação no repositório remoto.

---

# 🎤 Mostra de Estágio

📅 **Data:** 22/10/2026

A Mostra corresponde à apresentação pública do MVP.

Até a apresentação, o objetivo é demonstrar o fluxo integrado do Boraí e mostrar de forma prática como informações relacionadas ao usuário podem modificar as recomendações apresentadas pelo sistema.

## 🎯 O que o MVP pretende demonstrar

```text
👤 Usuário
    ↓
📝 Cadastro
    ↓
❤️ Preferências
    ↓
🔐 Login
    ↓
🏠 Home
    ↓
🤖 Recomendação personalizada
    ↓
👆 Interação
    ↓
🧠 Memória
    ↓
🔄 Adaptação
    ↓
✨ Nova recomendação
```

Também poderão ser demonstrados os mecanismos técnicos de apoio:

```text
🧑‍⚖️ HITL
   +
🧾 Auditoria
   +
📚 Swagger
   +
🍃 MongoDB
   +
🧪 Testes
```

---

# 🌿 BORAÍ

## ✨ Seu jeito de curtir, onde você estiver.

**Sistema Adaptativo de Recomendação de Lugares, Eventos e Experiências**

📍 **Manaus - Amazonas**

---

### 🚀 Projeto acadêmico em desenvolvimento

**React + Node.js + Express + MongoDB + Docker + Sistema Adaptativo + HITL + Auditoria + Swagger**
