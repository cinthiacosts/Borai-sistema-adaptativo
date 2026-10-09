const {test,after}=require('node:test')
const assert=require('node:assert/strict')
const request=require('supertest')
const bcrypt=require('bcryptjs')
const Session=require('../src/models/Session'),User=require('../src/models/User'),AuditLog=require('../src/models/AuditLog')
const {hashToken}=require('../src/services/sessionService')
const app=require('../src/server')
const uid='6ac281de00a2288e66e5d48c',other='6ac281de00a2288e66e5d48d'
const originals={find:Session.findOne,create:Session.create,del:Session.deleteOne,user:User.findOne,by:User.findById,audit:AuditLog.find}
let rows=[]
Session.create=async row=>{rows.push({...row,_id:'session'});return row}
Session.findOne=query=>({lean:async()=>rows.find(r=>r.tokenHash===query.tokenHash && r.expiresAt>query.expiresAt.$gt) || null})
Session.deleteOne=async query=>{rows=rows.filter(r=>r._id!==query._id)}
after(()=>{Session.findOne=originals.find;Session.create=originals.create;Session.deleteOne=originals.del;User.findOne=originals.user;User.findById=originals.by;AuditLog.find=originals.audit})
let token
test('login cria token aleatório e guarda somente seu hash com validade',async()=>{
 const password=await bcrypt.hash('senha-teste',10)
 User.findOne=()=>({select:async()=>({_id:uid,nome:'Teste',email:'teste@example.org',senha:password})})
 const bad=await request(app).post('/api/users/login').send({email:'teste@example.org',senha:'errada'})
 assert.equal(bad.status,401);assert.equal(rows.length,0)
 const good=await request(app).post('/api/users/login').send({email:'teste@example.org',senha:'senha-teste'})
 assert.equal(good.status,200);token=good.body.sessao.token
 assert.match(token,/^[a-f0-9]{64}$/);assert.equal(rows[0].tokenHash,hashToken(token));assert.equal(rows[0].token,undefined);assert.equal(good.body.usuario.senha,undefined)
})
test('perfil, histórico e recomendações exigem sessão e recusam outra conta',async()=>{
 for (const path of ['/api/users/'+other,'/api/audit?usuarioId='+other]) {
  assert.equal((await request(app).get(path)).status,401)
  assert.equal((await request(app).get(path).auth(token,{type:'bearer'})).status,403)
 }
 assert.equal((await request(app).patch('/api/users/'+other).auth(token,{type:'bearer'}).send({preferencias:['cultura']})).status,403)
 assert.equal((await request(app).post('/api/users/'+other+'/interactions').auth(token,{type:'bearer'}).send({})).status,403)
 assert.equal((await request(app).post('/api/recommendations').auth(token,{type:'bearer'}).send({userId:other})).status,403)
 assert.equal((await request(app).post('/api/recommendations').send({})).status,401)
})
test('histórico sem ID usa somente a conta autenticada',async()=>{
 let filter
 AuditLog.find=q=>{filter=q;return {sort:()=>({limit:()=>({lean:async()=>[]})})}}
 User.findById=()=>({select:()=>({lean:async()=>({historico:[]})})})
 const result=await request(app).get('/api/audit').auth(token,{type:'bearer'})
 assert.equal(result.status,200);assert.deepEqual(filter,{usuarioId:uid})
})
test('conta comum não pode alterar catálogo nem moderar lugares',async()=>{
 for (const path of ['/api/places/'+other,'/api/places/'+other+'/aprovar','/api/places/'+other+'/rejeitar']) assert.equal((await request(app).patch(path).auth(token,{type:'bearer'}).send({ativo:false})).status,403)
 assert.equal((await request(app).post('/api/places').auth(token,{type:'bearer'}).send({})).status,403)
 assert.equal((await request(app).post('/api/users').send({nome:'Perfil sem senha'})).status,403)
})
test('sessão expirada e token adulterado são recusados; logout revoga token',async()=>{
 assert.equal((await request(app).get('/api/audit').auth('b'.repeat(64),{type:'bearer'})).status,401)
 rows[0].expiresAt=new Date(0)
 assert.equal((await request(app).get('/api/audit').auth(token,{type:'bearer'})).status,401)
 rows[0].expiresAt=new Date(Date.now()+10000)
 assert.equal((await request(app).post('/api/users/logout').auth(token,{type:'bearer'})).status,200)
 assert.equal((await request(app).get('/api/audit').auth(token,{type:'bearer'})).status,401)
})

// Verificação da existência da conta isolada do MongoDB nestes testes.
const originalUserExists=User.exists
User.exists=async()=>true
after(()=>{User.exists=originalUserExists})
