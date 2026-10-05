const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const conectarBanco = require('./config/database')
const swaggerSpec = require('./config/swagger')

const recommendationRoutes = require('./routes/recommendationRoutes')
const userRoutes = require('./routes/userRoutes')
const placeRoutes = require('./routes/placeRoutes')
const auditRoutes = require('./routes/auditRoutes')

const app = express()

const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Sistema
 *     summary: Exibe informações da API
 *     description: Retorna as informações básicas e o status da API do Boraí.
 *     responses:
 *       200:
 *         description: API funcionando normalmente
 */
app.get('/', (req, res) => {
  res.json({
    projeto: 'Boraí',
    mensagem: 'API do Boraí funcionando!',
    status: 'online',
    documentacao: '/api-docs',
  })
})

/**
 * @swagger
 * /api/health:
 *   get:
 *     tags:
 *       - Sistema
 *     summary: Verifica a saúde da API
 *     description: Verifica se o serviço da API do Boraí está funcionando.
 *     responses:
 *       200:
 *         description: Serviço funcionando normalmente
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    servico: 'Boraí API',
  })
})

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rotas da aplicação
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/places', placeRoutes)
app.use('/api/audit', auditRoutes)

// Inicialização da aplicação
async function iniciarServidor() {
  await conectarBanco()

  app.listen(PORT, () => {
    console.log(`Boraí API rodando em http://localhost:${PORT}`)
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`)
  })
}

// Inicia normalmente quando executado pelo npm
if (require.main === module) {
  iniciarServidor()
}

// Permite que os testes utilizem a aplicação Express
module.exports = app