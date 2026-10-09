const bcrypt = require('bcryptjs')
const {criarSessao} = require('../services/sessionService')
const User = require('../models/User')
const AuditLog = require('../models/AuditLog')
const mongoose = require('mongoose')

const ACOES_VALIDAS = [
  'visualizou',
  'salvou',
  'aprovou',
  'rejeitou',
  'avaliou',
]

// Cria um novo perfil de usuário
async function criarUsuario(req, res) {
  try {
    const {
      nome,
      preferencias = [],
      localizacao = null,
    } = req.body

    if (!nome || !nome.trim()) {
      return res.status(400).json({
        erro: 'Nome obrigatório.',
        mensagem: 'Informe o nome do usuário.',
      })
    }

    const usuario = await User.create({
      nome: nome.trim(),
      preferencias,
      contextoAtual: {
        localizacao,
        categoria: null,
        atualizadoEm: new Date(),
      },
    })

    return res.status(201).json({
      mensagem: 'Perfil criado com sucesso.',
      usuario,
    })
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao criar perfil.',
      mensagem: erro.message,
    })
  }
}

// Cadastra uma nova conta
async function cadastrarUsuario(req, res) {
  try {
    const {
      nome,
      email,
      senha,
      preferencias = [],
      localizacao = 'Manaus - AM',
    } = req.body

    if (!nome || !nome.trim()) {
      return res.status(400).json({
        erro: 'Nome obrigatório.',
        mensagem: 'Informe seu nome.',
      })
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        erro: 'E-mail obrigatório.',
        mensagem: 'Informe seu e-mail.',
      })
    }

    if (!senha || senha.length < 6) {
      return res.status(400).json({
        erro: 'Senha inválida.',
        mensagem: 'A senha deve ter pelo menos 6 caracteres.',
      })
    }

    const emailNormalizado = email.trim().toLowerCase()

    const usuarioExistente = await User.findOne({
      email: emailNormalizado,
    })

    if (usuarioExistente) {
      return res.status(409).json({
        erro: 'E-mail já cadastrado.',
        mensagem: 'Já existe uma conta com este e-mail.',
      })
    }

    const senhaProtegida = await bcrypt.hash(senha, 10)

    const usuario = await User.create({
      nome: nome.trim(),
      email: emailNormalizado,
      senha: senhaProtegida,
      preferencias,
      contextoAtual: {
        localizacao,
        categoria: null,
        atualizadoEm: new Date(),
      },
    })

    return res.status(201).json({
      mensagem: 'Conta criada com sucesso.',
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        preferencias: usuario.preferencias,
        contextoAtual: usuario.contextoAtual,
      },
    })
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao criar conta.',
      mensagem: erro.message,
    })
  }
}

// Realiza login
async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body

    if (typeof email !== 'string' || typeof senha !== 'string' || !email || !senha) {
      return res.status(400).json({
        erro: 'Dados incompletos.',
        mensagem: 'Informe e-mail e senha.',
      })
    }

    const emailNormalizado = email.trim().toLowerCase()

    const usuario = await User.findOne({
      email: emailNormalizado,
    }).select('+senha +senhaVersao')

    if (!usuario || !usuario.senha) {
      return res.status(401).json({
        erro: 'Login inválido.',
        mensagem: 'E-mail ou senha incorretos.',
      })
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    )

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: 'Login inválido.',
        mensagem: 'E-mail ou senha incorretos.',
      })
    }

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      sessao: await criarSessao(usuario._id,usuario.senhaVersao || 0),
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        preferencias: usuario.preferencias,
        contextoAtual: usuario.contextoAtual,
      },
    })
  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro ao realizar login.',
      mensagem: erro.message,
    })
  }
}

// Busca um perfil pelo ID
async function buscarUsuario(req, res) {
  try {
    const usuario = await User.findById(req.params.id)

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.',
      })
    }

    return res.status(200).json(usuario)
  } catch (erro) {
    return res.status(400).json({
      erro: 'ID de usuário inválido.',
      mensagem: erro.message,
    })
  }
}

// Atualiza preferências e contexto do usuário
async function atualizarUsuario(req, res) {
  try {
    const {
      preferencias,
      localizacao,
      categoria,
    } = req.body

    const usuario = await User.findById(req.params.id)

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.',
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
      usuario,
    })
  } catch (erro) {
    return res.status(400).json({
      erro: 'Erro ao atualizar perfil.',
      mensagem: erro.message,
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
      avaliacao = null,
      recomendacaoId = null,
      lugarId = null,
    } = req.body

    if (!item || !categoria || !acao) {
      return res.status(400).json({
        erro: 'Dados incompletos.',
        mensagem: 'Informe item, categoria e ação.',
      })
    }

    if (!ACOES_VALIDAS.includes(acao)) {
      return res.status(400).json({
        erro: 'Ação inválida.',
        mensagem: `Escolha uma ação válida: ${ACOES_VALIDAS.join(', ')}.`,
      })
    }

    if (
      acao === 'avaliou' &&
      (
        typeof avaliacao !== 'number' ||
        avaliacao < 1 ||
        avaliacao > 5
      )
    ) {
      return res.status(400).json({
        erro: 'Avaliação inválida.',
        mensagem: 'A avaliação deve ser um número entre 1 e 5.',
      })
    }

    const usuario = await User.findById(req.params.id)

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.',
      })
    }

    let snapshot = null
    if (recomendacaoId) {
      if (!['aprovou','rejeitou'].includes(acao) || !mongoose.isValidObjectId(recomendacaoId)) {
        return res.status(400).json({mensagem:'Referência de recomendação inválida.'})
      }
      const registro = await AuditLog.findOne({_id:recomendacaoId,usuarioId:usuario._id,entidade:'recomendacao'})
      const indicacao = registro?.dados?.recomendacoes?.find(r => String(r.id) === String(lugarId))
      if (!indicacao) return res.status(400).json({mensagem:'Esta indicação não pertence ao histórico da conta.'})
      snapshot = {recomendacaoId:String(registro._id),lugarId:String(indicacao.id),
        motivo:indicacao.motivo,pontuacao:indicacao.pontuacao,ia:indicacao.ia,
        contexto:registro.dados.contexto,nome:indicacao.nome,categoria:indicacao.categoria,
        autonomia:'supervisionada',resultado:acao==='aprovou'?'interesse registrado':'indicação recusada'}
    }
    // Decisão e seu snapshot ficam no mesmo documento, salvos juntos no MongoDB.
    usuario.historico.push({
      item: snapshot ? snapshot.nome : item.trim(),
      categoria: snapshot ? snapshot.categoria : categoria.trim().toLowerCase(),
      acao,
      avaliacao,
      data: new Date(),
      auditoria:snapshot,
    })

    await usuario.save()

    return res.status(201).json({
      mensagem: 'Interação registrada com sucesso.',
      interacao:
        usuario.historico[usuario.historico.length - 1],
      totalInteracoes: usuario.historico.length,
    })
  } catch (erro) {
    return res.status(400).json({
      erro: 'Erro ao registrar interação.',
      mensagem: erro.message,
    })
  }
}

module.exports = {
  criarUsuario,
  cadastrarUsuario,
  loginUsuario,
  buscarUsuario,
  atualizarUsuario,
  registrarInteracao,
}