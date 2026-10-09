const express = require('express')
const { listarAuditorias } = require('../controllers/auditController')

const router = express.Router()

/**
 * @swagger
 * /api/audit:
 *   get:
 *     tags:
 *       - Auditoria
 *     summary: Consulta a trilha de auditoria
 *     description: Retorna os registros das ações auditadas no Boraí, incluindo sugestões enviadas, aprovadas e rejeitadas durante a validação humana (HITL).
 *     parameters:
 *       - in: query
 *         name: usuarioId
 *         schema:
 *           type: string
 *         description: Filtra os registros e as decisões de uma conta.
 *     responses:
 *       200:
 *         description: Trilha de auditoria retornada com sucesso
 *       500:
 *         description: Erro ao buscar a trilha de auditoria
 */
router.get('/', require('../middleware/access').autenticar, require('../middleware/access').mesmaConta, listarAuditorias)

module.exports = router