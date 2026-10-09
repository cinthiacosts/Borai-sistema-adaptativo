const Session=require('../src/models/Session')
const originalSessionFind=Session.findOne
Session.findOne=()=>({lean:async()=>({usuarioId:'6ac281de00a2288e66e5d48c'})})
const {test,after}=require('node:test');const assert=require('node:assert/strict');const express=require('express');const rawRequest=require('supertest');const request=app=>rawRequest.agent(app).set('Authorization','Bearer '+'a'.repeat(64))
const User=require('../src/models/User'),Place=require('../src/models/Place'),AuditLog=require('../src/models/AuditLog')
const {registrarInteracao}=require('../src/controllers/userController')
const original={user:User.findById,place:Place.find,create:AuditLog.create,one:AuditLog.findOne,find:AuditLog.find}
after(()=>{Session.findOne=originalSessionFind;User.findById=original.user;Place.find=original.place;AuditLog.create=original.create;AuditLog.findOne=original.one;AuditLog.find=original.find})
const uid='6ac281de00a2288e66e5d48c',rid='6ac281de00a2288e66e5d48d',pid='6ac281de00a2288e66e5d48e'
const app=express();app.use(express.json());app.use('/recommendations',require('../src/routes/recommendationRoutes'));app.post('/users/:id/interactions',registrarInteracao);app.use('/audit',require('../src/routes/auditRoutes'))
let snapshots=[],saved=0
const user={_id:uid,nome:'Teste',preferencias:['cultura'],historico:[],contextoAtual:{localizacao:'Manaus'},save:async()=>{saved++}}
Place.find=()=>({lean:async()=>[{_id:pid,nome:'Museu',categoria:'lazer',tags:['cultura'],avaliacao:4}]})
User.findById=async()=>user
AuditLog.create=async data=>{const row={...data,_id:rid};snapshots.push(row);return row}
test('geração salva snapshot com contexto, versão, motivo e índice antes de responder',async()=>{
 const res=await request(app).post('/recommendations').send({userId:uid,categoria:null})
 assert.equal(res.status,200);assert.equal(res.body.auditoriaId,rid);assert.equal(snapshots.length,1)
 const r=snapshots[0].dados.recomendacoes[0];assert.equal(r.id,pid);assert.match(r.motivo,/cultura/);assert.equal(r.ia.modelo,'borai-logistic-v1')
})
test('aprovação vincula snapshot da conta e salva contexto junto com o histórico',async()=>{
 AuditLog.findOne=async query=>query.usuarioId===uid?snapshots[0]:null
 const res=await request(app).post('/users/'+uid+'/interactions').send({item:'Nome falso',categoria:'hotel',acao:'aprovou',recomendacaoId:rid,lugarId:pid,auditoria:{motivo:'inventado'}})
 assert.equal(res.status,201);assert.equal(saved,1);assert.equal(user.historico[0].item,'Museu')
 assert.equal(user.historico[0].auditoria.recomendacaoId,rid);assert.match(user.historico[0].auditoria.motivo,/cultura/)
 assert.equal(user.historico[0].categoria,'lazer')
 const doc=new User({nome:'Schema',historico:user.historico});assert.equal(doc.validateSync(),undefined);assert.equal(doc.historico[0].auditoria.recomendacaoId,rid)
})
test('indicação de outra conta ou lugar inexistente não registra decisão',async()=>{
 AuditLog.findOne=async()=>null
 const res=await request(app).post('/users/'+uid+'/interactions').send({item:'Museu',categoria:'lazer',acao:'rejeitou',recomendacaoId:rid,lugarId:pid})
 assert.equal(res.status,400);assert.equal(saved,1)
})
test('falha ao salvar snapshot impede entrega de recomendações sem trilha',async()=>{
 AuditLog.create=async()=>{throw Error('Banco indisponível')}
 const res=await request(app).post('/recommendations').send({userId:uid})
 assert.equal(res.status,400);assert.equal(res.body.recomendacoes,undefined)
})
test('consulta filtra conta e inclui decisões anteriores sem inventar snapshot',async()=>{
 let query;AuditLog.find=q=>{query=q;return {sort:()=>({limit:()=>({lean:async()=>snapshots})})}}
 User.findById=()=>({select:()=>({lean:async()=>({historico:[{item:'Antigo',acao:'rejeitou',categoria:'lazer',data:new Date()}]})})})
 const res=await request(app).get('/audit?usuarioId='+uid)
 assert.equal(res.status,200);assert.deepEqual(query,{usuarioId:uid});assert.ok(res.body.auditorias.some(r=>r.dados.semSnapshot))
 const invalid=await request(app).get('/audit?usuarioId=xxx');assert.equal(invalid.status,403)
})

// Verificação da existência da conta isolada do MongoDB nestes testes.
const originalUserExists=User.exists
User.exists=async()=>true
after(()=>{User.exists=originalUserExists})
