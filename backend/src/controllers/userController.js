const User = require('../models/User')

// Cria um novo perfil de usuário
async function criarUsuario(req, res) {
  try {
    const {
      nome,
      preferencias = [],
      localizacao = null
    } = req.body

    if (!nome || !nome.trim()) {
      return res.status(400).json({
        erro: 'Nome obrigatório.',
        mensagem: 'Informe o nome do usuário.'
      })
    }

    const usuario = await User.create({
      nome: nome.trim(),
      preferencias,
      contextoAtual: {
        localizacao,
        categoria: null,
        atualizadoEm: new Date()
      }
    })

    return res.status(201).json({
      mensagem: 'Perfil criado com sucesso.',
      usuario
    })
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao criar perfil.',
      mensagem: erro.message
    })
  }
}

// Busca um perfil pelo ID
async function buscarUsuario(req, res) {
  try {
    const usuario = await User.findById(req.params.id)

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      })
    }

    return res.status(200).json(usuario)
  } catch (erro) {
    return res.status(400).json({
      erro: 'ID de usuário inválido.',
      mensagem: erro.message
    })
  }
}

// Atualiza preferências e contexto do usuário
async function atualizarUsuario(req, res) {
  try {
    const {
      preferencias,
      localizacao,
      categoria
    } = req.body

    const usuario = await User.findById(req.params.id)

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      })
    }

    if (Array.isArray(preferencias)) {
      usuario.preferencias = preferencias
    }

    if (localizacao !== undefined) {
      usuario.contextoAtual.localizacao = localizacao
    }

    if (categoria !== undefined) {
      usuario.contextoAtual.categoria = categoria
    }

    usuario.contextoAtual.atualizadoEm = new Date()

    await usuario.save()

    return res.status(200).json({
      mensagem: 'Perfil atualizado com sucesso.',
      usuario
    })
  } catch (erro) {
    return res.status(400).json({
      erro: 'Erro ao atualizar perfil.',
      mensagem: erro.message
    })
  }
}

// Registra uma interação no histórico do usuário
async function registrarInteracao(req, res) {
  try {
    const {
      item,
      categoria,
      acao,
      avaliacao = null
    } = req.body

    if (!item || !categoria || !acao) {
      return res.status(400).json({
        erro: 'Dados incompletos.',
        mensagem: 'Informe item, categoria e ação.'
      })
    }

    const usuario = await User.findById(req.params.id)

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      })
    }

    usuario.historico.push({
      item,
      categoria,
      acao,
      avaliacao,
      data: new Date()
    })

    await usuario.save()

    return res.status(201).json({
      mensagem: 'Interação registrada com sucesso.',
      interacao: usuario.historico[usuario.historico.length - 1],
      totalInteracoes: usuario.historico.length
    })
  } catch (erro) {
    return res.status(400).json({
      erro: 'Erro ao registrar interação.',
      mensagem: erro.message
    })
  }
}

module.exports = {
  criarUsuario,
  buscarUsuario,
  atualizarUsuario,
  registrarInteracao
}