# BORAÍ

## Sistema Adaptativo

### Seu jeito de curtir, onde você estiver.

---

# Sobre o Projeto

O **Boraí** é um sistema adaptativo para recomendação personalizada de lugares, eventos e experiências.

O projeto busca ajudar moradores, turistas e visitantes a descobrir opções de lazer de forma mais rápida e personalizada, considerando preferências, localização, contexto, histórico e avaliações.

O foco inicial do Boraí é a cidade de **Manaus - AM**.

A proposta do sistema não é funcionar como uma plataforma de delivery ou venda de ingressos. O objetivo principal é auxiliar o usuário no processo de descoberta e decisão sobre **onde ir e o que fazer**.

---

# Tema

Sistema adaptativo para recomendação personalizada de lugares, eventos e experiências.

---

# Problema

Pessoas que buscam opções de lazer e entretenimento em Manaus precisam consultar diferentes aplicativos, redes sociais, sites e indicações para descobrir lugares, eventos e experiências.

As informações ficam distribuídas entre várias fontes e nem sempre correspondem aos interesses, à localização e ao contexto de cada pessoa.

## Problema Central

Dificuldade de encontrar, de forma rápida e personalizada, opções de lazer adequadas ao perfil e ao contexto do usuário.

---

# Público-alvo

- Moradores de Manaus;
- Turistas;
- Visitantes;
- Pessoas que buscam praticidade para decidir onde ir e o que fazer.

---

# Objetivo Geral

Desenvolver uma plataforma adaptativa capaz de recomendar lugares, eventos e experiências considerando o perfil, as preferências, a localização e o contexto do usuário.

---

# Objetivos Específicos

- Permitir que o usuário informe seus interesses e preferências;
- Organizar lugares, eventos e experiências por categorias;
- Considerar a localização do usuário;
- Gerar recomendações personalizadas;
- Permitir avaliações e feedbacks dos usuários;
- Utilizar o histórico para melhorar as recomendações;
- Adaptar as sugestões conforme o contexto e o comportamento do usuário.

---

# Solução Proposta

O Boraí concentra a descoberta de opções de lazer em um único ambiente e apresenta recomendações personalizadas de lugares, eventos e experiências.

A proposta é reduzir o tempo e o esforço do usuário durante a busca e melhorar a compatibilidade das opções apresentadas com seus interesses e contexto.

O sistema utiliza informações do perfil, preferências, localização, contexto e histórico para modificar progressivamente as recomendações apresentadas.

---

# Equipe e Responsabilidades

## Cínthia Raquel Ferreira da Costa — Líder

### Gestão do Projeto, Documentação, Regras e Integração

Responsável pela organização das entregas, requisitos, documentação, regras de negócio, README, acompanhamento da evolução do projeto e integração entre os módulos desenvolvidos pela equipe.

---

## Andrei Silva dos Santos

### UI/UX e Front-end

Responsável pelo desenvolvimento de protótipos, experiência do usuário, telas, componentes React e adaptações visuais.

---

## Alex Farias Bentes

### Back-end e Integrações

Responsável pelo desenvolvimento do Back-end em Node.js, APIs, funcionalidades e integração entre os módulos do sistema.

---

## Ricardo Victor Batista do Nascimento Cardoso

### Banco de Dados e Segurança

Responsável pela estruturação do banco NoSQL, armazenamento dos dados, autenticação, segurança e apoio à trilha de auditoria.

---

## Daniela Tatiane da Silva e Silva

### Inteligência Artificial e Recomendações

Responsável pelo desenvolvimento e integração dos recursos relacionados ao mecanismo de recomendações personalizadas.

---

## Jackeline Gonzaga Fioravante

### Sistema Adaptativo, Testes e Validação

Responsável pelo desenvolvimento das regras de adaptação, testes das funcionalidades e validação das recomendações e dos fluxos do usuário.

---

# Tecnologias Utilizadas

## Front-end

- React;
- Vite;
- JavaScript;
- CSS;
- Leaflet para integração do mapa.

## Back-end

- Node.js;
- Express;
- JavaScript.

## Banco de Dados

- MongoDB;
- Mongoose;
- Docker.

## Segurança

- Variáveis de ambiente;
- Arquivo `.env`;
- Hash de senhas;
- bcryptjs;
- Validação de dados.

## Testes

- Node Test Runner;
- Supertest.

## Versionamento

- Git;
- GitHub.

---

# Arquitetura Geral do Boraí

A arquitetura atual do Boraí está organizada em camadas.

```text
USUÁRIO
   ↓
FRONT-END
React + Vite
   ↓
API REST
Node.js + Express
   ↓
REGRAS DE NEGÓCIO
   ↓
MECANISMO DE RECOMENDAÇÃO
   ↓
SISTEMA ADAPTATIVO
   ↓
BANCO DE DADOS
MongoDB
```

O Front-end realiza as interações com o usuário e envia solicitações para a API.

O Back-end recebe essas solicitações, realiza validações, executa as regras de negócio e acessa os serviços responsáveis pelas recomendações.

O MongoDB mantém os dados necessários ao funcionamento do sistema, incluindo usuários, preferências, contexto, histórico e estabelecimentos.

---

# Ciclo Adaptativo do Boraí

O funcionamento adaptativo pode ser representado pelo seguinte ciclo:

```text
Perfil
   ↓
Preferências
   ↓
Localização / Contexto
   ↓
Recomendação
   ↓
Interação
   ↓
Evento
   ↓
Histórico / Memória
   ↓
Adaptação
   ↓
Nova recomendação
```

O objetivo é fazer com que as recomendações futuras sejam influenciadas pelas informações e interações anteriores do usuário.

---

# ENTREGAS DO PROJETO

---

# Entrega 01 — Equipe e Definição do Projeto

**Data:** 30/08/2026  
**Status:** Concluída ✅

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

## Resultado da Entrega 01

A primeira entrega estabeleceu a base conceitual e organizacional do projeto.

O nome **Boraí** foi escolhido para representar uma solução relacionada à descoberta de lugares, eventos e experiências.

Também foi definida a frase:

> **Seu jeito de curtir, onde você estiver.**

A partir dessa etapa, a equipe passou a trabalhar com um problema e objetivo comuns, permitindo a evolução progressiva do sistema durante as entregas seguintes.

---

# Entrega 02 — Problema e Proposta de Valor

**Data:** 06/09/2026  
**Status:** Concluída ✅

Nesta etapa, o problema foi revisado, aprofundado e validado por meio de uma pesquisa exploratória.

## Delimitação

O foco inicial do Boraí será a descoberta de lugares, eventos e experiências de lazer em Manaus.

O sistema poderá considerar:

- Preferências;
- Interesses;
- Localização;
- Histórico;
- Avaliações;
- Preço;
- Segurança;
- Ambiente;
- Contexto.

O foco principal do projeto não é delivery, venda de produtos, refeições ou ingressos.

---

## Evidências da Pesquisa

Foi realizada uma pesquisa exploratória com **48 participantes**.

### Principais resultados

- **87,6%** procuram opções de lazer com frequência ou às vezes;
- **89,6%** consultam mais de uma fonte sempre ou às vezes;
- **74,4%** afirmam perder tempo pesquisando sempre ou às vezes;
- **43,8%** têm dificuldade para saber se um lugar ou evento é bem avaliado;
- **41,7%** têm dificuldade para encontrar opções que combinem com seus interesses;
- **37,5%** têm dificuldade para encontrar opções próximas;
- **29,2%** apontaram informações espalhadas em vários lugares;
- **98,0%** consideraram útil ou muito útil uma plataforma de recomendações personalizadas.

---

## Insight para o Produto

**66,7%** selecionaram segurança do local ou região como fator importante para uma recomendação.

### Categorias mais desejadas

- Restaurantes — **72,9%**;
- Passeios — **66,7%**;
- Eventos — **52,1%**;
- Feiras — **50%**.

---

## Stakeholders

### Usuários diretos

- Moradores de Manaus;
- Turistas;
- Visitantes;
- Pessoas buscando opções de lazer.

### Stakeholders indiretos

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

## Perfis Iniciais

### Morador de Manaus

Pessoa que procura atividades para finais de semana ou tempo livre.

### Turista ou visitante

Pessoa que não conhece bem Manaus e busca opções de lazer sem precisar consultar várias plataformas.

---

## Proposta de Valor

O Boraí ajuda moradores, turistas e visitantes a descobrir onde ir e o que fazer em Manaus, oferecendo recomendações personalizadas de lugares, eventos e experiências de acordo com preferências, localização, histórico e avaliações da comunidade.

---

## Ganhos para o Usuário

- Menos tempo procurando opções;
- Menos esforço comparando fontes;
- Descoberta de novos lugares e eventos;
- Recomendações mais compatíveis com os interesses;
- Informações reunidas em um único ambiente;
- Apoio à decisão sobre onde ir e o que fazer.

---

# Entrega 03 — Contexto e Eventos

**Data:** 13/09/2026  
**Status:** Concluída ✅

Nesta etapa foi desenvolvido o **Mapa de Contexto do Boraí** e elaborado o **Catálogo Inicial de Eventos do sistema**.

---

## Mapa de Contexto

O Mapa de Contexto representa os principais elementos que influenciam o funcionamento e a adaptação do Boraí.

Foram considerados:

### Usuários

- Moradores de Manaus;
- Turistas;
- Visitantes;
- Pessoas que buscam opções de lazer.

### Ambiente

Manaus como foco inicial, considerando:

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

### Objetivos

- Descobrir onde ir e o que fazer;
- Encontrar opções compatíveis com os interesses;
- Reduzir o tempo gasto em pesquisas.

### Histórico

- Pesquisas realizadas;
- Lugares e eventos visualizados;
- Recomendações apresentadas;
- Preferências;
- Avaliações;
- Interações anteriores.

### Restrições

- Disponibilidade das informações;
- Localização;
- Horário;
- Distância;
- Preço;
- Segurança;
- Preferências;
- Privacidade dos dados.

### Informações para decisão

- Preferências;
- Interesses;
- Localização;
- Histórico;
- Avaliações;
- Preço;
- Segurança;
- Ambiente;
- Horário;
- Categoria;
- Contexto atual.

---

## Fluxo Contextual

O fluxo contextual considerado inicialmente é:

```text
Usuário
   ↓
Evento / Interação
   ↓
Boraí
   ↓
Análise do perfil, contexto e histórico
   ↓
Recomendação
   ↓
Interação do usuário
   ↓
Atualização do histórico
   ↓
Adaptação futura
```

---

## Catálogo Inicial de Eventos

Foram definidos inicialmente eventos relevantes para o comportamento do sistema.

### 1. Preferência informada

**Origem:** Usuário.

**Dados:** categorias, interesses e preferências.

**Consequência:** registrar ou atualizar preferências e personalizar recomendações.

### 2. Localização atualizada

**Origem:** usuário ou dispositivo, mediante disponibilidade/permissão.

**Dados:** localização.

**Consequência:** atualizar o contexto e priorizar opções compatíveis com a localização.

### 3. Busca realizada

**Origem:** usuário.

**Dados:** termo, categoria ou filtros.

**Consequência:** apresentar opções relacionadas à busca e ao contexto.

### 4. Recomendação solicitada

**Origem:** usuário.

**Dados:** preferências, filtros e interesses.

**Consequência:** gerar recomendações personalizadas considerando perfil, localização, histórico e contexto.

### 5. Lugar ou evento visualizado

**Origem:** usuário.

**Dados:** item visualizado e categoria.

**Consequência:** registrar a interação no histórico.

### 6. Avaliação ou feedback registrado

**Origem:** usuário.

**Dados:** avaliação, feedback e item relacionado.

**Consequência:** utilizar o feedback como apoio para recomendações futuras.

### 7. Preferência alterada

**Origem:** usuário.

**Dados:** preferências modificadas.

**Consequência:** atualizar o perfil e adaptar recomendações futuras.

---

## Relação com o Sistema Adaptativo

Os eventos definidos permitem que o Boraí reconheça mudanças no comportamento ou no contexto do usuário.

A proposta é que o sistema utilize informações do perfil, contexto e histórico para adaptar as recomendações apresentadas.

---

## Artefatos Atualizados

- Mapa de Contexto atualizado no Miro;
- Catálogo Inicial de Eventos registrado no Miro;
- Evolução semanal registrada no board;
- README atualizado com a Entrega 03.

---

# Entrega 04 — Estados e Jornada

**Data:** 20/09/2026  
**Status:** Concluída ✅

Nesta etapa foram definidos os estados do sistema, suas transições, os eventos que provocam mudanças, a jornada convencional e a jornada adaptativa do Boraí, além dos principais pontos de decisão e possíveis adaptações da interface.

---

## Estados, Transições e Eventos

O funcionamento adaptativo do Boraí foi representado por meio dos principais estados percorridos pelo sistema durante a interação com o usuário.

### Fluxo principal

```text
Início
   ↓
Perfil identificado
   ↓
Contexto analisado
   ↓
Busca ou solicitação de recomendação
   ↓
Recomendações geradas
   ↓
Interação do usuário
   ↓
Feedback registrado
   ↓
Perfil e histórico atualizados
   ↓
Nova adaptação
```

As mudanças entre os estados podem ser provocadas por eventos como:

- Preferência informada ou alterada;
- Localização atualizada;
- Busca realizada;
- Recomendação solicitada;
- Lugar ou evento visualizado;
- Avaliação ou feedback registrado;
- Alteração do contexto.

Esses eventos permitem que o sistema atualize informações e adapte seu comportamento conforme as interações do usuário.

---

## Jornada Convencional e Jornada Adaptativa

### Jornada convencional

```text
Usuário entra
→ Escolhe uma categoria
→ Define filtros
→ Realiza uma busca
→ Analisa e compara opções
→ Escolhe onde ir ou o que fazer
```

### Jornada adaptativa do Boraí

```text
Usuário entra
→ Sistema recupera perfil e histórico
→ Identifica o contexto atual
→ Analisa preferências e localização
→ Gera recomendações personalizadas
→ Usuário interage
→ Interação é registrada
→ Sistema adapta recomendações futuras
```

Na jornada adaptativa, o Boraí utiliza informações do perfil, histórico e contexto para reduzir o esforço do usuário e apresentar opções mais compatíveis com seus interesses.

---

## Pontos de Decisão

- A localização está disponível?
- Existe histórico do usuário?
- Existem preferências cadastradas?
- Qual é o horário e o contexto atual?
- Existem opções compatíveis?
- O usuário aceitou, ignorou ou rejeitou uma recomendação?
- Houve avaliação ou feedback?

---

## Adaptações da Interface

- Priorizar categorias de maior interesse;
- Destacar opções próximas;
- Reorganizar recomendações conforme a relevância;
- Considerar horário e contexto atual;
- Destacar preço, segurança ou avaliações quando relevantes;
- Reduzir opções pouco compatíveis;
- Personalizar recomendações futuras com base nas interações.

---

## Artefatos Atualizados

- Diagrama de Estados, Transições e Eventos no Miro;
- Jornada Convencional e Jornada Adaptativa no Miro;
- Pontos de Decisão e Adaptações da Interface no Miro;
- Evolução da Entrega 04 registrada no quadro;
- README atualizado com a Entrega 04.

---

# Entrega 05 — Arquitetura e Memória

**Data:** 27/09/2026  
**Status:** Concluída ✅

Nesta etapa foi estruturada a arquitetura funcional do Boraí, conectando Back-end, banco NoSQL, regras de negócio, contexto, histórico e mecanismo de recomendação.

O objetivo foi transformar os conceitos definidos nas entregas anteriores em uma estrutura técnica capaz de manter informações do usuário e utilizá-las em decisões futuras.

---

## Arquitetura Implementada

A arquitetura foi organizada da seguinte forma:

```text
Usuário
   ↓
Front-end
React + Vite
   ↓
API REST
Node.js + Express
   ↓
Controllers
   ↓
Regras de Negócio / Serviços
   ↓
Sistema de Recomendação
   ↓
MongoDB
```

Essa separação permite que cada parte do sistema tenha uma responsabilidade específica.

---

## Organização do Back-end

O Back-end foi estruturado em módulos.

### Config

Responsável pelas configurações, incluindo conexão com o banco de dados.

### Controllers

Responsáveis por receber as solicitações e coordenar as operações relacionadas a usuários e estabelecimentos.

### Models

Representam as estruturas armazenadas no MongoDB.

### Routes

Definem os endpoints disponibilizados pela API.

### Services

Concentram serviços específicos, incluindo o mecanismo de recomendação.

### Business

Mantém regras de negócio utilizadas pelo sistema.

### Seeds

Permitem cadastrar dados iniciais de estabelecimentos para utilização e testes.

### Tests

Mantêm os testes automatizados da API.

---

## Banco de Dados NoSQL

O projeto utiliza **MongoDB** como banco de dados NoSQL.

A comunicação entre Node.js e MongoDB é realizada com **Mongoose**.

O MongoDB também foi configurado em ambiente Docker.

---

## Modelo de Usuário

O usuário pode possuir informações como:

- Nome;
- E-mail;
- Senha protegida;
- Preferências;
- Contexto atual;
- Histórico de interações.

Essas informações formam parte da memória utilizada pelo Boraí.

---

## Modelo de Estabelecimento

O sistema também possui estrutura para representar estabelecimentos e opções que poderão ser recomendadas.

Esses dados permitem que o mecanismo de recomendação compare as características dos locais com as informações do usuário.

---

## Memória Adaptativa

A memória do Boraí está relacionada principalmente ao histórico do usuário.

Uma interação pode registrar:

- Item relacionado;
- Categoria;
- Ação realizada;
- Avaliação, quando disponível;
- Momento da interação.

Dessa maneira, uma nova recomendação não precisa considerar apenas a escolha realizada naquele momento.

O sistema pode recuperar informações anteriores e utilizá-las novamente.

---

## Contexto Atual

Além do histórico, o Boraí possui estrutura para manter informações relacionadas ao contexto atual do usuário.

Entre elas podem estar:

- Localização;
- Categoria atual;
- Preferências;
- Informações utilizadas na solicitação de recomendação.

---

## Decisões do Sistema

O mecanismo pode utilizar diferentes sinais para decidir a relevância das opções.

Entre eles:

- Compatibilidade com as preferências;
- Categoria solicitada;
- Localização;
- Histórico;
- Aprovações anteriores;
- Rejeições anteriores.

Esses elementos são utilizados para organizar as recomendações.

---

## Persistência

A utilização do MongoDB permite manter as informações entre diferentes solicitações.

Isso é importante para o sistema adaptativo porque o histórico precisa continuar disponível para ser considerado posteriormente.

---

## Segurança Inicial

Foram aplicadas medidas iniciais de segurança:

- Utilização de variáveis de ambiente;
- Arquivo `.env` fora do versionamento;
- Validação de informações recebidas pela API;
- Separação entre controllers, models, routes e services;
- Hash de senhas com bcryptjs.

---

## Resultado da Entrega 05

Ao final desta etapa, o Boraí deixou de possuir apenas a definição conceitual de memória e passou a possuir uma estrutura técnica capaz de:

```text
Receber interação
   ↓
Identificar usuário
   ↓
Registrar informação
   ↓
Armazenar no MongoDB
   ↓
Recuperar histórico
   ↓
Utilizar histórico
   ↓
Modificar recomendação
```

A arquitetura e a memória passaram a servir como base para a interface e para o sistema adaptativo.

---

# Entrega 06 — Interface e Fluxo

**Data:** 04/10/2026  
**Status:** Concluída ✅

Nesta etapa foi desenvolvida e integrada a interface funcional inicial do Boraí.

O objetivo foi permitir que o usuário interagisse visualmente com as funcionalidades já disponíveis no Back-end.

---

## Front-end

O Front-end utiliza:

- React;
- Vite;
- JavaScript;
- CSS.

A aplicação se comunica com a API do Boraí por meio de um serviço responsável pelas requisições.

---

## Tela de Login

Foi implementada uma tela inicial de Login.

O usuário pode informar:

- E-mail;
- Senha.

Essas informações são enviadas para o Back-end para validação.

Quando os dados são válidos, o usuário consegue acessar a Home utilizando a conta cadastrada.

---

## Cadastro de Usuário

Foi implementado o fluxo de criação de conta.

O cadastro solicita:

- Nome;
- E-mail;
- Senha;
- Confirmação da senha.

Depois da validação inicial, o usuário segue para a seleção de preferências.

---

## Seleção de Preferências

O usuário pode indicar os tipos de opções que mais combinam com seus interesses.

As categorias utilizadas atualmente incluem:

- Gastronomia;
- Cafeterias;
- Bares;
- Eventos;
- Hotéis;
- Natureza e lazer.

Essas informações são enviadas ao Back-end e associadas à conta criada.

---

## Persistência da Conta

Ao concluir o cadastro:

```text
Dados do usuário
   ↓
Front-end
   ↓
API
   ↓
Validação
   ↓
Hash da senha
   ↓
MongoDB
   ↓
Conta criada
```

O usuário pode posteriormente utilizar o e-mail e a senha cadastrados para acessar sua conta.

---

## Identificação do Usuário

Após o Login, o Front-end mantém as informações necessárias para identificar o usuário durante a utilização da aplicação.

O ID do usuário autenticado pode ser utilizado nas solicitações de recomendação.

Isso evita que a interface utilize sempre um perfil de teste fixo.

---

## Home

A Home do Boraí foi integrada à API.

Ela possui uma estrutura inicial com:

- Perfil;
- Logo;
- Busca;
- Categorias;
- Recomendações;
- Cards;
- Mapa;
- Navegação inferior.

---

## Busca

A interface possui campo de busca para auxiliar na descoberta de estabelecimentos.

A consulta é integrada ao serviço responsável pela comunicação com o Back-end.

---

## Categorias

Foram disponibilizadas categorias para facilitar a navegação.

Entre elas:

- Restaurantes;
- Cafeterias;
- Bares;
- Eventos;
- Hotéis;
- Lazer.

A categoria selecionada também pode ser utilizada durante a solicitação de recomendações.

---

## Recomendações Personalizadas

O Front-end consulta o mecanismo de recomendação enviando informações relacionadas ao usuário.

Entre elas:

- ID do usuário;
- Localização;
- Categoria;
- Preferências.

O Back-end pode complementar essas informações utilizando o histórico armazenado.

---

## Justificativa da Recomendação

Os cards podem apresentar uma explicação relacionada ao motivo da recomendação.

Isso permite que a interface não apresente apenas um resultado, mas também ofereça ao usuário uma indicação de por que aquela opção foi considerada relevante.

---

## Mapa

Foi integrado um componente de mapa ao Front-end.

O objetivo é permitir que o usuário visualize os estabelecimentos e tenha uma referência espacial das opções disponíveis.

---

## Fluxo Atual da Interface

```text
Abrir Boraí
   ↓
Login
   ↓
ou
   ↓
Criar conta
   ↓
Selecionar preferências
   ↓
Conta registrada
   ↓
Login
   ↓
Home
   ↓
Busca / Categoria
   ↓
Recomendação
   ↓
Cards + Mapa
```

---

## Responsividade

A interface possui uma estilização-base preparada para diferentes tamanhos de tela.

Foram trabalhados:

- Login;
- Cadastro;
- Preferências;
- Home;
- Cards;
- Categorias;
- Navegação;
- Mapa.

A identidade visual continuará sendo refinada durante a evolução final do Front-end.

---

## Resultado da Entrega 06

Ao final desta etapa, o Boraí passou a possuir um fluxo visual integrado com o Back-end e o banco de dados.

O usuário consegue percorrer o fluxo:

```text
Cadastro
→ Preferências
→ Login
→ Home
→ Busca
→ Categorias
→ Recomendações
→ Mapa
```

A interface deixou de ser apenas uma representação visual e passou a consumir informações reais da API.

---

# Entrega 07 — IA e Autonomia

**Data:** 11/10/2026  
**Status:** Concluída ✅

Nesta etapa foi consolidado o mecanismo responsável pela inteligência de recomendação e pelo comportamento adaptativo do Boraí.

O objetivo é utilizar as informações disponíveis para priorizar opções mais compatíveis com cada usuário, mantendo a decisão final sob controle humano.

---

## Mecanismo de Recomendação

O Boraí possui um serviço responsável pela geração das recomendações.

O mecanismo considera informações relacionadas ao usuário e às opções disponíveis para definir a relevância dos resultados.

---

## Informações Utilizadas

Entre as informações que podem influenciar uma recomendação estão:

- Preferências;
- Categoria;
- Localização;
- Contexto atual;
- Histórico de interações;
- Aprovações;
- Rejeições.

---

## Regras de Negócio

As recomendações não são apresentadas de forma totalmente aleatória.

As regras do sistema permitem atribuir relevância aos resultados de acordo com a compatibilidade encontrada.

De forma simplificada:

```text
Dados do usuário
   ↓
Preferências
   +
Contexto
   +
Histórico
   ↓
Regras de negócio
   ↓
Cálculo de relevância
   ↓
Ordenação
   ↓
Recomendação
```

---

## Memória Positiva

Quando o usuário demonstra interesse em determinada opção, essa interação pode funcionar como um sinal positivo.

Por exemplo:

```text
Usuário demonstra interesse
   ↓
Interação registrada
   ↓
Histórico atualizado
   ↓
Sistema identifica sinal positivo
   ↓
Opções compatíveis podem ganhar relevância
```

---

## Memória Negativa

O sistema também considera rejeições.

Quando o usuário rejeita uma recomendação, essa informação pode reduzir a relevância daquela opção ou de elementos relacionados em recomendações futuras.

Fluxo:

```text
Recomendação apresentada
   ↓
Usuário rejeita
   ↓
Rejeição registrada
   ↓
Histórico atualizado
   ↓
Sistema considera o sinal negativo
   ↓
Recomendação futura é modificada
```

---

## Validação da Adaptação

O comportamento adaptativo foi testado utilizando interações positivas e negativas.

Nos testes realizados, o sistema conseguiu utilizar o histórico para modificar a pontuação/relevância das opções.

Isso demonstrou que o histórico não está sendo armazenado apenas como registro, mas pode efetivamente participar da decisão posterior.

---

## Recomendações Justificadas

O Boraí também trabalha com o conceito de recomendação justificada.

Em vez de apenas apresentar uma opção, o sistema pode indicar o motivo de ela ter sido priorizada.

Exemplo:

> Recomendado porque combina com seu histórico de gastronomia regional e está próximo de você.

A justificativa busca aumentar a transparência da recomendação.

---

## Autonomia do Sistema

A autonomia do Boraí é limitada à análise e organização das opções.

O sistema pode:

- Analisar informações;
- Comparar opções;
- Calcular relevância;
- Ordenar resultados;
- Recomendar lugares, eventos e experiências;
- Adaptar recomendações futuras.

O sistema não decide pelo usuário onde ele deve ir.

A escolha final continua sendo realizada pela pessoa.

---

## Human-in-the-loop

O projeto também adota o conceito de **Human-in-the-loop (HITL)**.

A proposta é manter supervisão humana em decisões que não devem ser totalmente automatizadas.

Um exemplo definido para o Boraí é a inclusão de novos locais no catálogo.

### Fluxo proposto

```text
Usuário sugere um local
   ↓
Sugestão recebida
   ↓
Status: pendente
   ↓
Validação / moderação humana
   ↓
Aprovado?
   ↓
SIM → entra no catálogo
NÃO → não é publicado
```

Dessa forma, uma sugestão feita por um usuário não precisa ser automaticamente transformada em conteúdo oficial do sistema.

---

## Privacidade e Controle

O Boraí não depende de rastreamento contínuo do usuário.

Informações como localização devem ser utilizadas conforme disponibilidade e permissão.

O usuário continua responsável por suas escolhas e pode fornecer informações necessárias para melhorar as recomendações.

---

## Testes e Validação

A base do Back-end possui testes automatizados.

Na última bateria de validação da base funcional foram executados:

```text
10 testes
10 aprovados
0 falhas
```

Entre os comportamentos testados estão:

- Funcionamento da API;
- Solicitações válidas e inválidas;
- Recomendação;
- Utilização da memória;
- Validação de ações;
- Validação de avaliações;
- Registro de interação;
- Atualização de contexto.

---

## Resultado da Entrega 07

Com esta etapa, o Boraí possui a base necessária para demonstrar o comportamento esperado de um sistema adaptativo.

O fluxo pode ser resumido como:

```text
Usuário
   ↓
Perfil + Preferências + Contexto
   ↓
Sistema analisa
   ↓
Regras de negócio
   ↓
Recomendação justificada
   ↓
Usuário interage
   ↓
Histórico atualizado
   ↓
Sistema aprende com a interação
   ↓
Próxima recomendação é adaptada
```

Assim, o Boraí não apresenta somente uma lista fixa de lugares. As informações associadas ao usuário podem alterar a relevância das recomendações futuras.

---

# Entrega 08 — MVP Final

**Data prevista:** 18/10/2026  
**Status:** Em desenvolvimento 🟡

A Entrega 08 corresponde à consolidação final de todos os módulos desenvolvidos durante o projeto.

O objetivo é apresentar um MVP integrado contendo Front-end, Back-end, banco NoSQL, sistema adaptativo, recomendação, mecanismos de supervisão e documentação.

---

## Componentes Já Disponíveis para o MVP

### Front-end

- React;
- Vite;
- Login;
- Cadastro;
- Seleção de preferências;
- Home;
- Busca;
- Categorias;
- Cards de recomendação;
- Mapa;
- Navegação-base.

### Back-end

- Node.js;
- Express;
- API;
- Controllers;
- Routes;
- Services;
- Regras de negócio.

### Banco

- MongoDB;
- Mongoose;
- Docker;
- Persistência de usuários;
- Preferências;
- Contexto;
- Histórico;
- Estabelecimentos.

### Sistema Adaptativo

- Perfil;
- Preferências;
- Contexto;
- Histórico;
- Interações;
- Adaptação positiva;
- Adaptação negativa.

### Recomendação

- Regras de relevância;
- Recomendações personalizadas;
- Uso da memória;
- Justificativas.

### Segurança Inicial

- `.env`;
- Variáveis de ambiente;
- Hash de senha;
- Validações.

### Testes

- Testes automatizados do Back-end;
- Validação do comportamento adaptativo.

---

## Itens para Fechamento da Entrega 08

Para concluir o MVP final ainda serão trabalhados:

- Refinamentos finais da interface;
- Interações restantes do Front-end;
- Consolidação do Human-in-the-loop;
- Trilha de auditoria;
- Documentação da API com Swagger;
- Revisão final dos testes;
- Atualização final do Miro;
- Atualização final do README;
- Preparação para apresentação.

---

## Fluxo Esperado do MVP Final

```text
Usuário
   ↓
Cadastro
   ↓
Preferências
   ↓
Login
   ↓
Home
   ↓
Contexto
   ↓
Busca / Recomendação
   ↓
Sistema Adaptativo
   ↓
Cards + Mapa
   ↓
Interação
   ↓
Histórico
   ↓
Adaptação
   ↓
Nova recomendação
```

---

# Testes do Projeto

O Back-end possui testes automatizados para validar as principais funcionalidades.

Última validação registrada:

```text
10 testes executados
10 testes aprovados
0 falhas
```

Os testes ajudam a verificar se alterações realizadas durante o desenvolvimento não comprometem funcionalidades que já estavam funcionando.

---

# Estrutura Atual do Projeto

```text
Borai-sistema-adaptativo/
│
├── backend/
│   │
│   ├── src/
│   │   ├── business/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
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
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# Integração Atual

Atualmente, a comunicação principal ocorre da seguinte forma:

```text
React
   ↓
services/api.js
   ↓
API Express
   ↓
Routes
   ↓
Controllers
   ↓
Services / Business Rules
   ↓
MongoDB
   ↓
Resposta
   ↓
React
```

Essa estrutura mantém as responsabilidades separadas e facilita a evolução do projeto.

---

# Status da Equipe

| Integrante | Responsabilidade | Status |
|---|---|---|
| Alex Farias Bentes | Back-end e Integrações | Base concluída ✅ |
| Ricardo Victor Batista do Nascimento Cardoso | Banco de Dados e Segurança | Base concluída ✅ |
| Daniela Tatiane da Silva e Silva | IA e Recomendações | Base concluída ✅ |
| Jackeline Gonzaga Fioravante | Sistema Adaptativo, Testes e Validação | Base concluída ✅ |
| Cínthia Raquel Ferreira da Costa | Gestão, Documentação, Regras e Integração | Base concluída ✅ |
| Andrei Silva dos Santos | UI/UX e Front-end | Refinamento visual 🟡 |

---

# Status Geral das Entregas

| Entrega | Tema | Data | Status |
|---|---|---|---|
| 01 | Equipe e Definição do Projeto | 30/08/2026 | Concluída ✅ |
| 02 | Problema e Proposta de Valor | 06/09/2026 | Concluída ✅ |
| 03 | Contexto e Eventos | 13/09/2026 | Concluída ✅ |
| 04 | Estados e Jornada | 20/09/2026 | Concluída ✅ |
| 05 | Arquitetura e Memória | 27/09/2026 | Concluída ✅ |
| 06 | Interface e Fluxo | 04/10/2026 | Concluída ✅ |
| 07 | IA e Autonomia | 11/10/2026 | Concluída ✅ |
| 08 | MVP Final | 18/10/2026 | Em desenvolvimento 🟡 |

---

# Evolução do Boraí

A evolução do projeto pode ser resumida da seguinte forma:

```text
ENTREGA 01
Definição do projeto
      ↓
ENTREGA 02
Validação do problema
      ↓
ENTREGA 03
Contexto e eventos
      ↓
ENTREGA 04
Estados e jornada adaptativa
      ↓
ENTREGA 05
Arquitetura + memória
      ↓
ENTREGA 06
Interface + integração
      ↓
ENTREGA 07
Recomendação + adaptação + autonomia
      ↓
ENTREGA 08
MVP FINAL
```

Cada entrega utiliza elementos desenvolvidos nas etapas anteriores.

---

# Próximos Passos

Para concluir a Entrega 08:

1. Finalizar os refinamentos de UI/UX;
2. Concluir as interações restantes da Home;
3. Consolidar o fluxo de Human-in-the-loop;
4. Implementar a trilha de auditoria;
5. Adicionar documentação Swagger;
6. Executar novamente todos os testes;
7. Atualizar o Miro;
8. Atualizar o README com o resultado final;
9. Realizar o teste completo do MVP;
10. Preparar a demonstração.

---

# Miro

Quadro oficial do projeto:

https://miro.com/app/board/uXjVHtf3tbU=/?share_link_id=642758879002

---

# Repositório GitHub

https://github.com/cinthiacosts/Borai-sistema-adaptativo

---

# Mostra de Estágio

**Data:** 22/10/2026

Apresentação pública do MVP.

Até a Mostra, o objetivo é apresentar o fluxo integrado do Boraí e demonstrar como as informações do usuário podem modificar as recomendações apresentadas pelo sistema.

---

# BORAÍ

## Seu jeito de curtir, onde você estiver.