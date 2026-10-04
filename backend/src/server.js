const express = require('express')
const cors = require('cors')
require('dotenv').config()

const conectarBanco = require('./config/database')
const recommendationRoutes = require('./routes/recommendationRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

const PORT = process.env.PORT || 3000

// Middlewares
app.use(cors())
app.use(express.json())

// Rota inicial da API
app.get('/', (req, res) => {
  res.json({
    projeto: 'Boraí',
    mensagem: 'API do Boraí funcionando!',
    status: 'online'
  })
})

// Rota de verificação
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    servico: 'Boraí API'
  })
})

// Rotas da aplicação
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/users', userRoutes)

// Inicialização da aplicação
async function iniciarServidor() {
  await conectarBanco()

  app.listen(PORT, () => {
    console.log(`Boraí API rodando em http://localhost:${PORT}`)
  })
}

iniciarServidor()