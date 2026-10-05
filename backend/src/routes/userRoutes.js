const express = require('express')

const {
  criarUsuario,
  cadastrarUsuario,
  loginUsuario,
  buscarUsuario,
  atualizarUsuario,
  registrarInteracao,
} = require('../controllers/userController')

const router = express.Router()

// Cria um novo perfil
router.post('/', criarUsuario)

// Cadastro de nova conta
router.post('/cadastro', cadastrarUsuario)

// Login
router.post('/login', loginUsuario)

// Busca um perfil pelo ID
router.get('/:id', buscarUsuario)

// Atualiza preferências e contexto do perfil
router.patch('/:id', atualizarUsuario)

// Registra uma interação no histórico do usuário
router.post('/:id/interactions', registrarInteracao)

module.exports = router