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
 *     responses:
 *       200:
 *         description: Trilha de auditoria retornada com sucesso
 *       500:
 *         description: Erro ao buscar a trilha de auditoria
 */
router.get('/', listarAuditorias)

module.exports = router