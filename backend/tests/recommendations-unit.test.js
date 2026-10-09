const Session=require('../src/models/Session')
const originalSessionFind=Session.findOne
Session.findOne=()=>({lean:async()=>({usuarioId:'user'})})
const {test,after} = require('node:test')
const assert = require('node:assert/strict')
const rawRequest = require('supertest');const request=app=>rawRequest.agent(app).set('Authorization','Bearer '+'a'.repeat(64))
const express = require('express')
const Place = require('../src/models/Place')
const User = require('../src/models/User')
const AuditLog = require('../src/models/AuditLog')
const originalAuditCreate = AuditLog.create
AuditLog.create = async () => ({_id:'snapshot'})
const originalFind = Place.find
const originalUserFind = User.findById
const catalog = [
 {_id:'museu',nome:'Museu da Amazônia',categoria:'lazer',tags:['natureza'],avaliacao:4},
 {_id:'cafe',nome:'Café Centro',categoria:'cafeteria',tags:['gastronomia'],avaliacao:5},
]
let lastFilter
Place.find = filter => {lastFilter=filter;return {lean:async () => catalog.filter(p => !filter.categoria || p.categoria===filter.categoria)}}
const {gerarRecomendacoes} = require('../src/services/recommendationService')
const app = express();app.use(express.json());app.use('/api/recommendations',require('../src/routes/recommendationRoutes'))
after(() => {Session.findOne=originalSessionFind;Place.find=originalFind;User.findById=originalUserFind;AuditLog.create=originalAuditCreate})
test('preferências alteram ordem e produzem justificativa',async () => {
 const result=await gerarRecomendacoes({preferencias:['natureza']})
 assert.equal(result[0].id,'museu');assert.match(result[0].motivo,/natureza/)
})
test('rejeição retira indicação sem apagar catálogo; nova aprovação permite retorno',async () => {
 const rejected={item:'Museu da Amazônia',categoria:'lazer',acao:'rejeitou'}
 const result=await gerarRecomendacoes({historico:[rejected]})
 assert.equal(result.some(x=>x.id==='museu'),false);assert.equal(catalog.length,2)
 const restored=await gerarRecomendacoes({historico:[rejected,{...rejected,acao:'aprovou'}]})
 assert.equal(restored.some(x=>x.id==='museu'),true)
})
test('API permite todas categorias e recupera histórico da conta',async () => {
 User.findById=async () => ({_id:'user',nome:'Teste',preferencias:['natureza'],historico:[{item:'Café Centro',categoria:'cafeteria',acao:'rejeitou'}],contextoAtual:{localizacao:'Manaus'}})
 const res=await request(app).post('/api/recommendations').send({userId:'user',categoria:null})
 assert.equal(res.status,200);assert.equal(res.body.memoriaUtilizada,1);assert.equal(res.body.contexto.categoria,null);assert.equal(lastFilter.categoria,undefined);assert.deepEqual(res.body.recomendacoes.map(p=>p.id),['museu'])
})
test('API continua rejeitando categoria inválida e informando conta ausente',async () => {
 const invalid=await request(app).post('/api/recommendations').send({categoria:'inexistente'})
 assert.equal(invalid.status,400)
 User.findById=async () => null
 const missing=await request(app).post('/api/recommendations').send({userId:'user',categoria:null})
 assert.equal(missing.status,404)
})
test('categoria explícita continua filtrando o catálogo',async () => {
 User.findById=async()=>({_id:'user',preferencias:[],historico:[]})
 const res=await request(app).post('/api/recommendations').send({categoria:'cafeteria'})
 assert.equal(res.status,200);assert.deepEqual(res.body.recomendacoes.map(p=>p.id),['cafe'])
})

// Verificação da existência da conta isolada do MongoDB nestes testes.
const originalUserExists=User.exists
User.exists=async()=>true
after(()=>{User.exists=originalUserExists})
