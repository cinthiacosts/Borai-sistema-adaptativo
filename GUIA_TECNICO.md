# 🛠️ Guia Técnico — Boraí

> **Manual de instalação, execução, testes e manutenção do projeto Boraí**

🌿 **Boraí — Seu jeito de curtir, onde você estiver.**

Este documento reúne os principais comandos e procedimentos técnicos utilizados durante o desenvolvimento do Boraí. O objetivo é permitir que qualquer integrante da equipe consiga baixar, executar, testar e entender o ambiente do projeto.

---

## 📑 Sumário

1. [Tecnologias utilizadas](#-tecnologias-utilizadas)
2. [Pré-requisitos](#-pré-requisitos)
3. [Clonando o projeto](#-clonando-o-projeto)
4. [Estrutura principal](#-estrutura-principal)
5. [Configurando o Back-end](#️-configurando-o-back-end)
6. [Configurando o MongoDB](#-configurando-o-mongodb)
7. [Iniciando o Back-end](#-iniciando-o-back-end)
8. [Configurando o Front-end](#-configurando-o-front-end)
9. [Iniciando o Front-end](#-iniciando-o-front-end)
10. [Testando a API](#-testando-a-api)
11. [Swagger](#-swagger)
12. [Sistema Adaptativo](#-sistema-adaptativo)
13. [HITL — Validação Humana](#️-hitl--validação-humana)
14. [Auditoria](#-auditoria)
15. [Segurança](#-segurança)
16. [Comandos do MongoDB](#-comandos-do-mongodb)
17. [Comandos Git](#-comandos-git)
18. [Fluxo de atualização no GitHub](#-fluxo-de-atualização-no-github)
19. [Problemas e soluções](#️-problemas-e-soluções)
20. [Checklist para demonstração](#-checklist-para-demonstração)

---

# 💻 Tecnologias utilizadas

O Boraí utiliza atualmente:

- **React**
- **Vite**
- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **Docker**
- **Docker Desktop**
- **Leaflet**
- **React-Leaflet**
- **OpenStreetMap**
- **Swagger**
- **Swagger UI**
- **bcryptjs**
- **Supertest**
- **Git**
- **GitHub**
- **Visual Studio Code**

---

# 📋 Pré-requisitos

Antes de executar o Boraí em um computador novo, verificar se estão instalados:

```text
Git
Node.js
npm
Docker Desktop
Visual Studio Code
```

Para verificar o Git:

```powershell
git --version
```

Para verificar o Node.js:

```powershell
node --version
```

Para verificar o npm:

```powershell
npm --version
```

Para verificar o Docker:

```powershell
docker --version
```

---

# 📥 Clonando o projeto

Repositório oficial:

```text
https://github.com/cinthiacosts/Borai-sistema-adaptativo
```

Clonar:

```powershell
git clone https://github.com/cinthiacosts/Borai-sistema-adaptativo.git
```

Entrar na pasta:

```powershell
cd Borai-sistema-adaptativo
```

---

# 📁 Estrutura principal

Estrutura geral:

```text
Borai-sistema-adaptativo/
│
├── backend/
│   ├── src/
│   │   ├── adaptive/
│   │   ├── business/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeds/
│   │   ├── services/
│   │   ├── tests/
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
├── README.md
└── GUIA_TECNICO.md
```

---

# ⚙️ Configurando o Back-end

Entrar no Back-end:

```powershell
cd backend
```

Instalar as dependências:

```powershell
npm install
```

O Back-end utiliza, entre outras dependências:

```text
express
mongoose
cors
dotenv
bcryptjs
swagger-ui-express
swagger-jsdoc
supertest
```

---

# 🔐 Variáveis de ambiente

Na pasta `backend`, deve existir um arquivo:

```text
.env
```

Configuração utilizada no desenvolvimento local:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/borai
```

> ⚠️ O arquivo `.env` não deve ser enviado ao GitHub quando possuir informações privadas ou credenciais.

---

# 🐳 Configurando o MongoDB

O Boraí utiliza MongoDB executado através do Docker.

Container utilizado no desenvolvimento:

```text
borai-mongodb
```

Imagem:

```text
mongo:8
```

Verificar containers:

```powershell
docker ps
```

Ver todos os containers, inclusive os parados:

```powershell
docker ps -a
```

Se o container já existir e estiver parado:

```powershell
docker start borai-mongodb
```

Verificar novamente:

```powershell
docker ps
```

---

# 🗄️ Banco de dados

Banco utilizado:

```text
borai
```

Endereço local:

```text
mongodb://127.0.0.1:27017/borai
```

O MongoDB armazena informações como:

- usuários;
- preferências;
- contexto;
- histórico;
- estabelecimentos;
- sugestões;
- estados de aprovação;
- registros de auditoria.

---

# 🚀 Iniciando o Back-end

Entrar na pasta:

```powershell
cd backend
```

Executar em desenvolvimento:

```powershell
npm run dev
```

Quando estiver funcionando corretamente, o terminal deverá indicar o MongoDB conectado e a API disponível.

API:

```text
http://localhost:3000
```

Verificação de saúde:

```text
http://localhost:3000/api/health
```

---

# 🎨 Configurando o Front-end

Abrir outro terminal.

Entrar na pasta do Front-end:

```powershell
cd frontend
```

Instalar as dependências:

```powershell
npm install
```

---

# ▶️ Iniciando o Front-end

Executar:

```powershell
npm run dev
```

O Vite informará no terminal o endereço disponível.

Normalmente será algo semelhante a:

```text
http://localhost:5173
```

Caso essa porta já esteja ocupada, o Vite poderá utilizar outra, como:

```text
http://localhost:5174
```

ou

```text
http://localhost:5175
```

> ⚠️ Sempre utilizar o endereço mostrado pelo próprio Vite no terminal.

---

# 🔗 Integração Front-end + Back-end

A API utilizada pelo Front-end está centralizada em:

```text
frontend/src/services/api.js
```

Base da API:

```text
http://localhost:3000/api
```

O Front-end realiza chamadas para recursos como:

```text
/api/users
/api/places
/api/recommendations
/api/audit
```

---

# 🧪 Testando a API

Na pasta:

```text
backend
```

executar:

```powershell
npm test
```

Na validação realizada durante o desenvolvimento, a suíte principal apresentou:

```text
10 testes
10 aprovados
0 falhas
```

Os testes verificam pontos como:

- funcionamento da API;
- health check;
- estabelecimentos;
- recomendações;
- recomendações com memória;
- validação de interações;
- aprovação;
- contexto do usuário.

> Os testes automatizados devem ser executados novamente após alterações importantes para verificar possíveis regressões.

---

# 📚 Swagger

O Boraí possui documentação interativa da API com Swagger.

Com o Back-end funcionando, abrir **no navegador**:

```text
http://localhost:3000/api-docs
```

A documentação apresenta rotas organizadas em grupos como:

```text
Sistema
Usuários
Estabelecimentos
Recomendações
Auditoria
```

O Swagger permite visualizar:

- método HTTP;
- rota;
- parâmetros;
- corpo da requisição;
- respostas esperadas;
- funcionamento geral da API.

---

# 🧠 Sistema Adaptativo

O Boraí utiliza informações do usuário para modificar as recomendações.

Fluxo simplificado:

```text
Perfil
   ↓
Preferências
   ↓
Contexto
   ↓
Recomendação
   ↓
Interação
   ↓
Histórico / Memória
   ↓
Adaptação
   ↓
Nova recomendação
```

O sistema considera elementos como:

```text
preferências
localização/contexto
categoria
histórico
aprovações
rejeições
avaliações
```

Uma interação positiva pode aumentar a relevância de experiências semelhantes.

Uma rejeição pode reduzir a prioridade de recomendações relacionadas.

---

# 🧠 Memória adaptativa

O histórico do usuário funciona como uma memória para apoiar futuras recomendações.

Exemplos de ações:

```text
aprovou
rejeitou
avaliou
```

O objetivo é evitar que o sistema trate todas as recomendações da mesma maneira para todos os usuários.

---

# 💬 Recomendações justificadas

Além de recomendar, o sistema pode apresentar uma justificativa relacionada ao perfil e ao histórico.

Exemplo:

```text
Recomendado porque combina com seu histórico de gastronomia regional e está próximo de você.
```

Isso contribui para maior transparência na recomendação.

---

# 🧑‍⚖️ HITL — Validação Humana

O Boraí implementa o conceito de:

```text
Human-in-the-Loop
```

ou:

```text
Humano no ciclo
```

O usuário pode sugerir um estabelecimento, mas ele não precisa entrar automaticamente no catálogo público.

Fluxo:

```text
Usuário sugere um local
        ↓
Status: pendente
        ↓
Validação humana
       ↙ ↘
 aprovado   rejeitado
    ↓
Catálogo
```

Rotas principais:

```text
GET /api/places/pendentes
POST /api/places/sugestoes
PATCH /api/places/:id/aprovar
PATCH /api/places/:id/rejeitar
```

A listagem normal de estabelecimentos considera locais:

```text
ativos
+
aprovados
```

Isso impede que uma sugestão pendente seja tratada imediatamente como conteúdo validado.

---

# 🧾 Auditoria

O Boraí também registra ações importantes.

Rota:

```text
GET /api/audit
```

Exemplos de eventos registrados:

```text
LOCAL_CADASTRADO
SUGESTAO_ENVIADA
SUGESTAO_APROVADA
SUGESTAO_REJEITADA
LOCAL_ATUALIZADO
```

Um registro pode armazenar:

```text
ação
entidade
ID da entidade
usuário
descrição
dados relacionados
data de criação
data de atualização
```

A auditoria ajuda a responder:

```text
O que aconteceu?
Quando aconteceu?
Qual entidade foi alterada?
Qual usuário estava relacionado?
Qual foi a ação realizada?
```

---

# 🔒 Segurança

Durante o desenvolvimento foram aplicadas medidas como:

### Senhas

As senhas dos usuários são protegidas utilizando:

```text
bcryptjs
```

A senha não deve ser armazenada diretamente em texto simples.

### Variáveis de ambiente

Configurações sensíveis devem permanecer no:

```text
.env
```

### Git

O `.env` deve permanecer ignorado quando contiver dados que não podem ser publicados.

### Dependências

Para verificar vulnerabilidades conhecidas:

```powershell
npm audit
```

Na verificação realizada durante o desenvolvimento:

```text
0 vulnerabilidades
```

> ⚠️ O mecanismo atual de autenticação foi desenvolvido para o MVP acadêmico. Não deve ser descrito como uma infraestrutura completa de autenticação para produção.

---

# 🍃 Comandos do MongoDB

Verificar o container:

```powershell
docker ps
```

Entrar no MongoDB do container:

```powershell
docker exec -it borai-mongodb mongosh
```

Selecionar o banco:

```javascript
use borai
```

Listar coleções:

```javascript
show collections
```

Consultar usuários:

```javascript
db.users.find()
```

Consultar estabelecimentos:

```javascript
db.places.find()
```

Consultar auditoria:

```javascript
db.auditlogs.find()
```

Sair:

```javascript
exit
```

> ⚠️ Comandos JavaScript do `mongosh` devem ser executados dentro do MongoDB, e não diretamente no PowerShell.

---

# 🌿 Comandos Git

Verificar situação do projeto:

```powershell
git status
```

Ver histórico:

```powershell
git log --oneline
```

Ver alterações:

```powershell
git diff
```

Adicionar um arquivo específico:

```powershell
git add nome-do-arquivo
```

Exemplo:

```powershell
git add README.md
```

Criar commit:

```powershell
git commit -m "mensagem do commit"
```

Enviar:

```powershell
git push origin main
```

Baixar alterações do repositório:

```powershell
git pull origin main
```

---

# ⚠️ Evitar `git add .` sem verificar

Durante o desenvolvimento do Boraí, a preferência é adicionar os arquivos de forma específica.

Em vez de:

```powershell
git add .
```

preferir:

```powershell
git add README.md
```

ou:

```powershell
git add backend/src/server.js
```

Isso ajuda a evitar que arquivos temporários, backups ou documentos locais sejam enviados sem intenção.

Sempre verificar antes:

```powershell
git status
```

---

# 🔄 Fluxo de atualização no GitHub

Fluxo recomendado:

```text
1. Alterar o arquivo
       ↓
2. Salvar
       ↓
3. git status
       ↓
4. git diff
       ↓
5. git add arquivo
       ↓
6. git status
       ↓
7. git commit
       ↓
8. git push
       ↓
9. Conferir o GitHub
```

Exemplo:

```powershell
git status
```

Depois:

```powershell
git add README.md
```

Verificar:

```powershell
git status
```

Commit:

```powershell
git commit -m "docs: atualiza documentacao"
```

Push:

```powershell
git push origin main
```

---

# 🗂️ Arquivos locais que não devem ser adicionados sem necessidade

Durante o desenvolvimento podem existir arquivos de apoio ou backup que não fazem parte diretamente do código versionado.

Antes de qualquer commit, executar:

```powershell
git status
```

e conferir cuidadosamente os arquivos listados.

Nunca adicionar automaticamente arquivos apenas porque aparecem como:

```text
Untracked files
```

Primeiro verificar se realmente devem fazer parte do repositório.

---

# 🛠️ Problemas e soluções

## ❌ Porta do Front-end mudou

Se o Vite apresentar:

```text
5174
```

ou:

```text
5175
```

isso não significa necessariamente um erro.

Outra aplicação pode estar utilizando a porta padrão.

Utilizar o endereço informado pelo Vite.

---

## ❌ API não responde

Verificar:

```powershell
docker ps
```

Depois verificar se o Back-end está funcionando:

```powershell
npm run dev
```

Testar **no navegador**:

```text
http://localhost:3000/api/health
```

---

## ❌ MongoDB não conecta

Verificar:

```powershell
docker ps
```

Se o container estiver parado:

```powershell
docker start borai-mongodb
```

Depois iniciar novamente o Back-end.

---

## ❌ Alterei o código e não funcionou

Primeiro verificar se o arquivo foi salvo.

Depois verificar o terminal do Back-end ou Front-end.

Também pode ser necessário atualizar a página **no navegador**.

---

## ❌ Caracteres aparecem estranhos no PowerShell

Em alguns casos o terminal pode apresentar caracteres acentuados de maneira incorreta.

Exemplo:

```text
BoraÃ­
```

Isso pode ser apenas um problema de codificação da exibição do terminal.

Antes de modificar arquivos por esse motivo, verificar como o texto aparece:

- no navegador;
- na API;
- no VS Code;
- no GitHub.

Se estiver correto nesses locais, não alterar o código somente por causa da exibição do PowerShell.

---

## ❌ Digitei código JavaScript no PowerShell

Código como:

```javascript
const exemplo = ...
```

não deve ser digitado diretamente no PowerShell.

Código JavaScript deve ser colocado no arquivo correspondente **no VS Code**.

O PowerShell deve ser utilizado para comandos como:

```powershell
npm run dev
git status
git add
git commit
git push
docker ps
```

---

# 🖥️ Organização recomendada dos terminais

Durante o desenvolvimento, é útil manter terminais separados.

### Terminal 1 — Back-end

```powershell
cd backend
npm run dev
```

### Terminal 2 — Front-end

```powershell
cd frontend
npm run dev
```

### Terminal 3 — Testes / Git / Docker

Utilizar para:

```text
npm test
git status
git diff
docker ps
```

Isso reduz o risco de interromper acidentalmente um servidor.

---

# 🎬 Checklist para demonstração

Antes de apresentar o Boraí:

### 1. Docker Desktop

Confirmar que está aberto.

### 2. MongoDB

```powershell
docker ps
```

Confirmar:

```text
borai-mongodb
```

### 3. Back-end

```powershell
cd backend
npm run dev
```

Confirmar API:

```text
http://localhost:3000
```

### 4. Swagger

Abrir **no navegador**:

```text
http://localhost:3000/api-docs
```

### 5. Front-end

Em outro terminal:

```powershell
cd frontend
npm run dev
```

Abrir o endereço informado pelo Vite.

### 6. Fluxo principal

Testar:

```text
Cadastro
   ↓
Preferências
   ↓
Login
   ↓
Home
   ↓
Categorias
   ↓
Recomendações
   ↓
Mapa
```

### 7. Sistema adaptativo

Se necessário, demonstrar:

```text
perfil
contexto
histórico
recomendação
interação
adaptação
```

### 8. Recursos técnicos

Também podem ser demonstrados:

```text
Swagger
HITL
Auditoria
Testes automatizados
MongoDB
```

---

# 📌 Comandos rápidos

## Iniciar MongoDB

```powershell
docker start borai-mongodb
```

## Iniciar Back-end

```powershell
cd backend
npm run dev
```

## Iniciar Front-end

```powershell
cd frontend
npm run dev
```

## Rodar testes

```powershell
npm test
```

## Verificar Git

```powershell
git status
```

## Ver documentação da API

**No navegador:**

```text
http://localhost:3000/api-docs
```

---

# 🌿 Boraí

**Seu jeito de curtir, onde você estiver.**

Este guia deve ser atualizado sempre que houver mudanças importantes na instalação, arquitetura, execução ou testes do projeto.

📌 **Projeto acadêmico — Análise e Desenvolvimento de Sistemas**

💻 **Repositório:** `cinthiacosts/Borai-sistema-adaptativo`

📅 **MVP — Entrega 08: concluída em 18/10/2026**

---

> 💡 **Importante:** este guia registra os procedimentos técnicos necessários para reproduzir e compreender o ambiente do Boraí. Ele complementa o `README.md`, que permanece como a documentação principal e apresentação geral do projeto.