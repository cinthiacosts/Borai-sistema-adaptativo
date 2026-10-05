const express = require('express')

const {
  listarPlaces,
  buscarPlacePorId,
  criarPlace,
  atualizarPlace,
} = require('../controllers/placeController')

const router = express.Router()

// Lista e pesquisa estabelecimentos
// GET /api/places
// GET /api/places?categoria=restaurante
// GET /api/places?zona=sul
// GET /api/places?busca=pizza
router.get('/', listarPlaces)

// Busca um estabelecimento específico
// GET /api/places/:id
router.get('/:id', buscarPlacePorId)

// Cadastra um novo estabelecimento
// POST /api/places
router.post('/', criarPlace)

// Atualiza parcialmente um estabelecimento
// PATCH /api/places/:id
router.patch('/:id', atualizarPlace)

module.exports = router