const express = require('express')

const {
  listarPlaces,
  listarPlacesPendentes,
  buscarPlacePorId,
  criarPlace,
  sugerirPlace,
  aprovarPlace,
  rejeitarPlace,
  atualizarPlace,
} = require('../controllers/placeController')

const router = express.Router()

/**
 * @swagger
 * /api/places:
 *   get:
 *     tags:
 *       - Estabelecimentos
 *     summary: Lista os estabelecimentos aprovados
 *     description: Retorna os locais ativos e aprovados disponíveis no Boraí. Permite filtros por categoria, zona e busca.
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Categoria do estabelecimento
 *       - in: query
 *         name: zona
 *         schema:
 *           type: string
 *         description: Zona ou região do estabelecimento
 *       - in: query
 *         name: busca
 *         schema:
 *           type: string
 *         description: Texto para pesquisa
 *     responses:
 *       200:
 *         description: Lista de estabelecimentos retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', listarPlaces)

/**
 * @swagger
 * /api/places/pendentes:
 *   get:
 *     tags:
 *       - Estabelecimentos
 *     summary: Lista sugestões pendentes
 *     description: Retorna os estabelecimentos sugeridos por usuários que aguardam validação humana (HITL).
 *     responses:
 *       200:
 *         description: Sugestões pendentes retornadas com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/pendentes', listarPlacesPendentes)

/**
 * @swagger
 * /api/places/sugestoes:
 *   post:
 *     tags:
 *       - Estabelecimentos
 *     summary: Envia uma sugestão de estabelecimento
 *     description: Permite que um usuário sugira um novo local. A sugestão fica pendente até passar pela validação humana (HITL).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - nome
 *               - categoria
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 6ac30700224696d06a9b023b
 *               nome:
 *                 type: string
 *                 example: Parque Cultural Manaus
 *               categoria:
 *                 type: string
 *                 example: lazer
 *               descricao:
 *                 type: string
 *                 example: Local sugerido pela comunidade do Boraí.
 *               endereco:
 *                 type: string
 *                 example: Manaus - AM
 *               bairro:
 *                 type: string
 *                 example: Centro
 *     responses:
 *       201:
 *         description: Sugestão enviada e aguardando validação humana
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/sugestoes', sugerirPlace)

/**
 * @swagger
 * /api/places/{id}/aprovar:
 *   patch:
 *     tags:
 *       - Estabelecimentos
 *     summary: Aprova uma sugestão
 *     description: Realiza a validação humana de uma sugestão pendente e altera seu status para aprovado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sugestão
 *     responses:
 *       200:
 *         description: Sugestão aprovada com sucesso
 *       404:
 *         description: Sugestão não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/:id/aprovar', aprovarPlace)

/**
 * @swagger
 * /api/places/{id}/rejeitar:
 *   patch:
 *     tags:
 *       - Estabelecimentos
 *     summary: Rejeita uma sugestão
 *     description: Realiza a validação humana de uma sugestão pendente e altera seu status para rejeitado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sugestão
 *     responses:
 *       200:
 *         description: Sugestão rejeitada com sucesso
 *       404:
 *         description: Sugestão não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/:id/rejeitar', rejeitarPlace)

/**
 * @swagger
 * /api/places/{id}:
 *   get:
 *     tags:
 *       - Estabelecimentos
 *     summary: Busca um estabelecimento pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estabelecimento
 *     responses:
 *       200:
 *         description: Estabelecimento encontrado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', buscarPlacePorId)

/**
 * @swagger
 * /api/places:
 *   post:
 *     tags:
 *       - Estabelecimentos
 *     summary: Cadastra um estabelecimento
 *     description: Cadastra diretamente um novo estabelecimento na plataforma Boraí.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - categoria
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Restaurante Amazônico
 *               categoria:
 *                 type: string
 *                 example: restaurante
 *               descricao:
 *                 type: string
 *                 example: Restaurante de gastronomia regional.
 *               endereco:
 *                 type: string
 *                 example: Manaus - AM
 *               bairro:
 *                 type: string
 *                 example: Adrianópolis
 *     responses:
 *       201:
 *         description: Estabelecimento cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', criarPlace)

/**
 * @swagger
 * /api/places/{id}:
 *   patch:
 *     tags:
 *       - Estabelecimentos
 *     summary: Atualiza um estabelecimento
 *     description: Atualiza parcialmente os dados de um estabelecimento existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estabelecimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Estabelecimento atualizado com sucesso
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/:id', atualizarPlace)

module.exports = router