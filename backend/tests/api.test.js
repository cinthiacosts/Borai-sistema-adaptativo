const { describe, test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../src/server')
const conectarBanco = require('../src/config/database')
const User = require('../src/models/User')

const USUARIO_TESTE_ID = '6ac281de00a2288e66e5d48c'

describe('Boraí API', () => {
  before(async () => {
    await conectarBanco()
  })

  after(async () => {
    await mongoose.connection.close()
  })

  test('GET /api/health deve retornar API funcionando', async () => {
    const response = await request(app).get('/api/health')

    assert.equal(response.statusCode, 200)
    assert.equal(response.body.status, 'ok')
    assert.equal(response.body.servico, 'Boraí API')
  })

  test('GET / deve retornar informações do Boraí', async () => {
    const response = await request(app).get('/')

    assert.equal(response.statusCode, 200)
    assert.equal(response.body.projeto, 'Boraí')
    assert.equal(response.body.status, 'online')
  })

  test('GET /api/places deve retornar os estabelecimentos', async () => {
    const response = await request(app).get('/api/places')

    assert.equal(response.statusCode, 200)
    assert.ok(Array.isArray(response.body.estabelecimentos))
    assert.ok(response.body.estabelecimentos.length > 0)
  })

  test('POST /api/recommendations deve rejeitar categoria inválida', async () => {
    const response = await request(app)
      .post('/api/recommendations')
      .send({
        categoria: 'passeio',
      })

    assert.equal(response.statusCode, 400)
    assert.equal(response.body.erro, 'Categoria inválida.')
  })

  test('POST /api/recommendations deve gerar recomendações válidas', async () => {
    const response = await request(app)
      .post('/api/recommendations')
      .send({
        categoria: 'lazer',
        preferencias: ['cultura', 'natureza'],
      })

    assert.equal(response.statusCode, 200)
    assert.equal(response.body.contexto.categoria, 'lazer')
    assert.ok(Array.isArray(response.body.recomendacoes))
    assert.ok(response.body.recomendacoes.length > 0)
  })

  test('POST /api/recommendations deve utilizar a memória do usuário', async () => {
    const response = await request(app)
      .post('/api/recommendations')
      .send({
        userId: USUARIO_TESTE_ID,
        categoria: 'lazer',
      })

    assert.equal(response.statusCode, 200)
    assert.equal(response.body.usuario.nome, 'Usuario Teste')
    assert.ok(response.body.memoriaUtilizada > 0)

    const mercado = response.body.recomendacoes.find(
      (lugar) => lugar.nome === 'Mercado Municipal Adolpho Lisboa'
    )

    assert.ok(mercado)
    assert.ok(mercado.pontuacao >= 6)
    assert.match(
      mercado.motivo,
      /interação positiva anterior/i
    )
  })

  test('POST /api/users/:id/interactions deve rejeitar ação inválida', async () => {
    const response = await request(app)
      .post(`/api/users/${USUARIO_TESTE_ID}/interactions`)
      .send({
        item: 'Teste',
        categoria: 'lazer',
        acao: 'qualquer_coisa',
      })

    assert.equal(response.statusCode, 400)
    assert.equal(response.body.erro, 'Ação inválida.')
  })

  test('POST /api/users/:id/interactions deve rejeitar avaliação fora de 1 a 5', async () => {
    const response = await request(app)
      .post(`/api/users/${USUARIO_TESTE_ID}/interactions`)
      .send({
        item: 'MUSA - Museu da Amazônia',
        categoria: 'lazer',
        acao: 'avaliou',
        avaliacao: 10,
      })

    assert.equal(response.statusCode, 400)
    assert.equal(response.body.erro, 'Avaliação inválida.')
  })

  test('POST /api/users/:id/interactions deve registrar aprovação humana válida', async () => {
    const itemTeste = 'Teste HITL Boraí'

    const response = await request(app)
      .post(`/api/users/${USUARIO_TESTE_ID}/interactions`)
      .send({
        item: itemTeste,
        categoria: 'lazer',
        acao: 'aprovou',
      })

    assert.equal(response.statusCode, 201)
    assert.equal(
      response.body.mensagem,
      'Interação registrada com sucesso.'
    )
    assert.equal(response.body.interacao.item, itemTeste)
    assert.equal(response.body.interacao.acao, 'aprovou')

    const usuario = await User.findById(USUARIO_TESTE_ID).lean()

    const interacaoSalva = usuario.historico.find(
      (interacao) =>
        interacao.item === itemTeste &&
        interacao.acao === 'aprovou'
    )

    assert.ok(interacaoSalva)

    await User.updateOne(
      { _id: USUARIO_TESTE_ID },
      {
        $pull: {
          historico: {
            item: itemTeste,
          },
        },
      }
    )
  })

  test('PATCH /api/users/:id deve atualizar e persistir o contexto do usuário', async () => {
    const usuarioAntes = await User.findById(USUARIO_TESTE_ID).lean()

    const categoriaOriginal =
      usuarioAntes.contextoAtual?.categoria || null

    const categoriaTeste =
      categoriaOriginal === 'hotel' ? 'lazer' : 'hotel'

    try {
      const response = await request(app)
        .patch(`/api/users/${USUARIO_TESTE_ID}`)
        .send({
          categoria: categoriaTeste,
        })

      assert.equal(response.statusCode, 200)
      assert.equal(
        response.body.mensagem,
        'Perfil atualizado com sucesso.'
      )
      assert.equal(
        response.body.usuario.contextoAtual.categoria,
        categoriaTeste
      )

      const usuarioDepois = await User.findById(
        USUARIO_TESTE_ID
      ).lean()

      assert.equal(
        usuarioDepois.contextoAtual.categoria,
        categoriaTeste
      )
    } finally {
      await User.updateOne(
        { _id: USUARIO_TESTE_ID },
        {
          $set: {
            'contextoAtual.categoria': categoriaOriginal,
          },
        }
      )
    }
  })
})