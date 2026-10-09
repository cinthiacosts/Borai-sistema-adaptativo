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

    components:{securitySchemes:{bearerAuth:{type:'http',scheme:'bearer'}}},
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

for (const [path,operations] of Object.entries(swaggerSpec.paths)) {
 for (const [method,operation] of Object.entries(operations)) {
  if (!['get','post','patch','delete','put'].includes(method)) continue
  const publicRoute=['/','/api/health','/api/users/cadastro','/api/users/login','/api/users/recuperar-senha','/api/users/redefinir-senha'].includes(path) || (method==='get' && ['/api/places','/api/places/{id}'].includes(path))
  if (!publicRoute) operation.security=[{bearerAuth:[]}]
 }
}
module.exports = swaggerSpec