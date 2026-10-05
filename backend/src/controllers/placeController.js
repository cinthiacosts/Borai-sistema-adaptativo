const Place = require('../models/Place')

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
// Cadastra um novo estabelecimento da plataforma.
async function criarPlace(req, res) {
  try {
    const dados = {
      ...req.body,
      origem: 'plataforma',
      status: 'aprovado',
    }

    const place = await Place.create(dados)

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
  buscarPlacePorId,
  criarPlace,
  atualizarPlace,
}