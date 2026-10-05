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