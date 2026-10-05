const express = require('express')

const User = require('../models/User')

const {
  categoriaValida,
  criarContexto,
} = require('../business/businessRules')

const {
  gerarRecomendacoes,
} = require('../services/recommendationService')

const router = express.Router()

/**
 * @swagger
 * /api/recommendations:
 *   post:
 *     tags:
 *       - Recomendações
 *     summary: Gera recomendações adaptativas
 *     description: Gera recomendações personalizadas utilizando categoria, preferências, contexto atual e histórico de interações do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 nullable: true
 *                 example: 6ac30700224696d06a9b023b
 *               localizacao:
 *                 type: string
 *                 example: Manaus - AM
 *               categoria:
 *                 type: string
 *                 example: lazer
 *               preferencias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - gastronomia
 *                   - cultura
 *                   - natureza
 *     responses:
 *       200:
 *         description: Recomendações geradas com sucesso
 *       400:
 *         description: Categoria inválida ou erro ao gerar recomendações
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/', async (req, res) => {
  try {
    const {
      userId = null,
      localizacao = 'Manaus - AM',
      categoria = 'lazer',
      preferencias = [],
    } = req.body

    // Valida a categoria informada
    if (!categoriaValida(categoria)) {
      return res.status(400).json({
        erro: 'Categoria inválida.',
        mensagem: 'Escolha uma categoria disponível no Boraí.',
      })
    }

    let preferenciasUsuario = preferencias
    let historicoUsuario = []
    let localizacaoUsuario = localizacao
    let usuario = null

    // Se houver userId, recupera perfil e memória do MongoDB
    if (userId) {
      usuario = await User.findById(userId)

      if (!usuario) {
        return res.status(404).json({
          erro: 'Usuário não encontrado.',
        })
      }

      preferenciasUsuario = usuario.preferencias
      historicoUsuario = usuario.historico

      if (usuario.contextoAtual?.localizacao) {
        localizacaoUsuario = usuario.contextoAtual.localizacao
      }
    }

    // Cria o contexto usado na recomendação
    const contexto = criarContexto({
      localizacao: localizacaoUsuario,
      categoria,
      filtros: {
        preferencias: preferenciasUsuario,
      },
    })

    // Consulta o MongoDB e gera recomendações adaptadas
    const recomendacoes = await gerarRecomendacoes({
      categoria: contexto.categoria,
      preferencias: preferenciasUsuario,
      historico: historicoUsuario,
    })

    return res.status(200).json({
      usuario: usuario
        ? {
            id: usuario._id,
            nome: usuario.nome,
          }
        : null,
      contexto,
      memoriaUtilizada: historicoUsuario.length,
      total: recomendacoes.length,
      recomendacoes,
    })
  } catch (erro) {
    return res.status(400).json({
      erro: 'Erro ao gerar recomendações.',
      mensagem: erro.message,
    })
  }
})

module.exports = router