const Place = require('../models/Place')
const AuditLog = require('../models/AuditLog')

// Registra ações importantes na trilha de auditoria.
// Se houver falha apenas no log, a ação principal do sistema não é interrompida.
async function registrarAuditoria({
  acao,
  entidade = 'Place',
  entidadeId = null,
  usuarioId = null,
  descricao,
  dados = {},
}) {
  try {
    await AuditLog.create({
      acao,
      entidade,
      entidadeId,
      usuarioId,
      descricao,
      dados,
    })
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error)
  }
}

// GET /api/places
// Lista estabelecimentos aprovados e ativos.
// Permite filtrar por categoria, zona e pesquisar por texto.
async function listarPlaces(req, res) {
  try {
    const { categoria, zona, busca } = req.query

    const filtro = {
      ativo: true,
      status: 'aprovado',
    }

    if (categoria) {
      filtro.categoria = categoria.toLowerCase().trim()
    }

    if (zona) {
      filtro.zona = zona.toLowerCase().trim()
    }

    if (busca) {
      const texto = busca.trim()

      filtro.$or = [
        { nome: { $regex: texto, $options: 'i' } },
        { descricao: { $regex: texto, $options: 'i' } },
        { bairro: { $regex: texto, $options: 'i' } },
        { zona: { $regex: texto, $options: 'i' } },
        { tags: { $regex: texto, $options: 'i' } },
      ]
    }

    const places = await Place.find(filtro)
      .sort({ avaliacao: -1, nome: 1 })
      .lean()

    return res.status(200).json({
      total: places.length,
      estabelecimentos: places,
    })
  } catch (error) {
    console.error('Erro ao listar estabelecimentos:', error)

    return res.status(500).json({
      mensagem: 'Não foi possível carregar os estabelecimentos.',
    })
  }
}

// GET /api/places/pendentes
// Lista sugestões de locais que aguardam validação humana.
async function listarPlacesPendentes(req, res) {
  try {
    const places = await Place.find({
      origem: 'usuario',
      status: 'pendente',
      ativo: true,
    })
      .populate('criadoPor', 'nome email')
      .sort({ createdAt: 1 })
      .lean()

    return res.status(200).json({
      total: places.length,
      sugestoes: places,
    })
  } catch (error) {
    console.error('Erro ao listar sugestões pendentes:', error)

    return res.status(500).json({
      mensagem: 'Não foi possível carregar as sugestões pendentes.',
    })
  }
}

// GET /api/places/:id
// Retorna os detalhes de um estabelecimento.
async function buscarPlacePorId(req, res) {
  try {
    const place = await Place.findOne({
      _id: req.params.id,
      ativo: true,
    }).lean()

    if (!place) {
      return res.status(404).json({
        mensagem: 'Estabelecimento não encontrado.',
      })
    }

    return res.status(200).json(place)
  } catch (error) {
    console.error('Erro ao buscar estabelecimento:', error)

    return res.status(400).json({
      mensagem: 'Não foi possível buscar o estabelecimento.',
    })
  }
}

// POST /api/places
// Cadastra um novo estabelecimento diretamente pela plataforma.
async function criarPlace(req, res) {
  try {
    const dados = {
      ...req.body,
      origem: 'plataforma',
      status: 'aprovado',
    }

    const place = await Place.create(dados)

    await registrarAuditoria({
      acao: 'LOCAL_CADASTRADO',
      entidadeId: place._id,
      descricao: `Estabelecimento "${place.nome}" cadastrado pela plataforma.`,
      dados: {
        nome: place.nome,
        categoria: place.categoria,
        status: place.status,
      },
    })

    return res.status(201).json({
      mensagem: 'Estabelecimento cadastrado com sucesso.',
      estabelecimento: place,
    })
  } catch (error) {
    console.error('Erro ao cadastrar estabelecimento:', error)

    return res.status(400).json({
      mensagem: 'Não foi possível cadastrar o estabelecimento.',
      erro: error.message,
    })
  }
}

// POST /api/places/sugestoes
// Usuário sugere um novo local.
// A sugestão não entra automaticamente no catálogo.
// Ela fica pendente até a validação humana.
async function sugerirPlace(req, res) {
  try {
    const { userId, ...dadosPlace } = req.body

    if (!userId) {
      return res.status(400).json({
        mensagem: 'O usuário responsável pela sugestão é obrigatório.',
      })
    }

    const place = await Place.create({
      ...dadosPlace,
      origem: 'usuario',
      status: 'pendente',
      criadoPor: userId,
    })

    await registrarAuditoria({
      acao: 'SUGESTAO_ENVIADA',
      entidadeId: place._id,
      usuarioId: userId,
      descricao: `Sugestão do local "${place.nome}" enviada para validação humana.`,
      dados: {
        nome: place.nome,
        categoria: place.categoria,
        status: place.status,
      },
    })

    return res.status(201).json({
      mensagem:
        'Sugestão enviada com sucesso e aguardando validação humana.',
      sugestao: place,
    })
  } catch (error) {
    console.error('Erro ao enviar sugestão:', error)

    return res.status(400).json({
      mensagem: 'Não foi possível enviar a sugestão.',
      erro: error.message,
    })
  }
}

// PATCH /api/places/:id/aprovar
// Aprovação humana da sugestão.
// Depois da aprovação, o local pode aparecer no catálogo.
async function aprovarPlace(req, res) {
  try {
    const place = await Place.findOneAndUpdate(
      {
        _id: req.params.id,
        origem: 'usuario',
        status: 'pendente',
      },
      {
        status: 'aprovado',
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!place) {
      return res.status(404).json({
        mensagem: 'Sugestão pendente não encontrada.',
      })
    }

    await registrarAuditoria({
      acao: 'SUGESTAO_APROVADA',
      entidadeId: place._id,
      usuarioId: place.criadoPor,
      descricao: `Sugestão do local "${place.nome}" aprovada por validação humana.`,
      dados: {
        nome: place.nome,
        categoria: place.categoria,
        statusAnterior: 'pendente',
        statusAtual: 'aprovado',
      },
    })

    return res.status(200).json({
      mensagem: 'Sugestão aprovada com sucesso.',
      estabelecimento: place,
    })
  } catch (error) {
    console.error('Erro ao aprovar sugestão:', error)

    return res.status(400).json({
      mensagem: 'Não foi possível aprovar a sugestão.',
      erro: error.message,
    })
  }
}

// PATCH /api/places/:id/rejeitar
// Rejeição humana da sugestão.
// O local permanece registrado, mas não aparece no catálogo.
async function rejeitarPlace(req, res) {
  try {
    const place = await Place.findOneAndUpdate(
      {
        _id: req.params.id,
        origem: 'usuario',
        status: 'pendente',
      },
      {
        status: 'rejeitado',
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!place) {
      return res.status(404).json({
        mensagem: 'Sugestão pendente não encontrada.',
      })
    }

    await registrarAuditoria({
      acao: 'SUGESTAO_REJEITADA',
      entidadeId: place._id,
      usuarioId: place.criadoPor,
      descricao: `Sugestão do local "${place.nome}" rejeitada na validação humana.`,
      dados: {
        nome: place.nome,
        categoria: place.categoria,
        statusAnterior: 'pendente',
        statusAtual: 'rejeitado',
      },
    })

    return res.status(200).json({
      mensagem: 'Sugestão rejeitada.',
      sugestao: place,
    })
  } catch (error) {
    console.error('Erro ao rejeitar sugestão:', error)

    return res.status(400).json({
      mensagem: 'Não foi possível rejeitar a sugestão.',
      erro: error.message,
    })
  }
}

// PATCH /api/places/:id
// Atualiza parcialmente um estabelecimento existente.
async function atualizarPlace(req, res) {
  try {
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!place) {
      return res.status(404).json({
        mensagem: 'Estabelecimento não encontrado.',
      })
    }

    await registrarAuditoria({
      acao: 'LOCAL_ATUALIZADO',
      entidadeId: place._id,
      usuarioId: place.criadoPor,
      descricao: `Estabelecimento "${place.nome}" atualizado.`,
      dados: {
        camposAtualizados: Object.keys(req.body),
      },
    })

    return res.status(200).json({
      mensagem: 'Estabelecimento atualizado com sucesso.',
      estabelecimento: place,
    })
  } catch (error) {
    console.error('Erro ao atualizar estabelecimento:', error)

    return res.status(400).json({
      mensagem: 'Não foi possível atualizar o estabelecimento.',
      erro: error.message,
    })
  }
}

module.exports = {
  listarPlaces,
  listarPlacesPendentes,
  buscarPlacePorId,
  criarPlace,
  sugerirPlace,
  aprovarPlace,
  rejeitarPlace,
  atualizarPlace,
}