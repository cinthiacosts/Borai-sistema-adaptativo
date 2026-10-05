const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'Boraí API',
      version: '1.0.0',
      description:
        'Documentação da API do Boraí, sistema adaptativo de recomendação personalizada de lugares e experiências.',
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local do Boraí',
      },
    ],

    tags: [
      {
        name: 'Sistema',
        description: 'Verificação e informações da API',
      },
      {
        name: 'Usuários',
        description: 'Cadastro, login, perfil, contexto e interações',
      },
      {
        name: 'Estabelecimentos',
        description: 'Locais, sugestões e validação humana (HITL)',
      },
      {
        name: 'Recomendações',
        description: 'Recomendações adaptativas do Boraí',
      },
      {
        name: 'Auditoria',
        description: 'Trilha de auditoria das ações realizadas no sistema',
      },
    ],
  },

  apis: [
    './src/server.js',
    './src/routes/*.js',
  ],
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec