const express = require('express')

const {
  criarUsuario,
  cadastrarUsuario,
  loginUsuario,
  buscarUsuario,
  atualizarUsuario,
  registrarInteracao,
} = require('../controllers/userController')

const router = express.Router()
const recovery = require('../controllers/recoveryController')
const recoveryLimit = require('../middleware/recoveryLimit')
router.post('/recuperar-senha',recoveryLimit,recovery.solicitar)
router.post('/redefinir-senha',recoveryLimit,recovery.redefinir)
const {autenticar,mesmaConta,bloquearAdministracao,encerrarSessao}=require('../middleware/access')
router.post('/logout',autenticar,encerrarSessao)
/**
 * @swagger
 * /api/users/{id}/discoveries:
 *   patch:
 *     tags: [Usuários]
 *     summary: Salva favoritos, visitas, avaliações pessoais e foto da própria conta
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: {type: string}
 *     responses:
 *       200: {description: Perfil salvo}
 *       401: {description: Sessão necessária}
 *       403: {description: Outra conta não permitida}
 *       409: {description: Perfil alterado em outro dispositivo}
 */
router.patch('/:id/discoveries',autenticar,mesmaConta,require('../controllers/discoveryController').salvarDescobertas)

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo perfil de usuário
 *     description: Cria um perfil no Boraí com preferências e contexto inicial.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Usuário Boraí
 *               preferencias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - gastronomia
 *                   - cultura
 *                   - natureza
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', bloquearAdministracao)

/**
 * @swagger
 * /api/users/cadastro:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cadastra uma nova conta
 *     description: Cria uma conta de usuário no Boraí com nome, e-mail, senha e preferências.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Boraí
 *               email:
 *                 type: string
 *                 format: email
 *                 example: maria@borai.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               preferencias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - gastronomia
 *                   - cultura
 *               localizacao:
 *                 type: string
 *                 example: Manaus - AM
 *     responses:
 *       201:
 *         description: Conta cadastrada com sucesso
 *       400:
 *         description: Dados de cadastro inválidos
 */
router.post('/cadastro', cadastrarUsuario)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Realiza o login
 *     description: Valida o e-mail e a senha de uma conta cadastrada no Boraí.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: teste@borai.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post('/login', loginUsuario)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Busca um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', autenticar, mesmaConta, buscarUsuario)

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *       - Usuários
 *     summary: Atualiza preferências e contexto
 *     description: Atualiza dados utilizados pelo sistema adaptativo para personalizar as próximas recomendações.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferencias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - cultura
 *                   - gastronomia
 *                   - natureza
 *               contextoAtual:
 *                 type: object
 *                 properties:
 *                   localizacao:
 *                     type: string
 *                     example: Manaus - AM
 *                   categoria:
 *                     type: string
 *                     example: lazer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.patch('/:id', autenticar, mesmaConta, atualizarUsuario)

/**
 * @swagger
 * /api/users/{id}/interactions:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Registra uma interação do usuário
 *     description: Registra uma ação no histórico do usuário para alimentar a memória e a adaptação das próximas recomendações.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               placeId:
 *                 type: string
 *                 description: ID do estabelecimento
 *               acao:
 *                 type: string
 *                 example: aprovou
 *               recomendacaoId:
 *                 type: string
 *                 description: Referência do snapshot para aprovação ou rejeição.
 *               lugarId:
 *                 type: string
 *                 description: ID do lugar no snapshot da recomendação.
 *               avaliacao:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *     responses:
 *       200:
 *         description: Interação registrada com sucesso
 *       400:
 *         description: Interação inválida
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/:id/interactions', autenticar, mesmaConta, registrarInteracao)

module.exports = router