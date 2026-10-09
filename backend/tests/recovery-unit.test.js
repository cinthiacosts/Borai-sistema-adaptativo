const {test,after}=require('node:test'),assert=require('node:assert/strict')
const express=require('express'),request=require('supertest'),bcrypt=require('bcryptjs')
const User=require('../src/models/User'),Session=require('../src/models/Session')
const mail=require('../src/services/recoveryMail'),{hashToken}=require('../src/services/sessionService')
const originals={find:User.findOne,update:User.updateOne,reset:User.findOneAndUpdate,exists:User.exists,session:Session.findOne,config:mail.configuracao,send:mail.enviarLink}
let row={_id:'6ac281de00a2288e66e5d48c',email:'pessoa@outlook.com',senhaVersao:0,descobertas:{favorites:['teatro']}},sent=[]
mail.configuracao=()=>({})
mail.enviarLink=async(email,token)=>sent.push({email,token})
User.findOne=q=>({select:async()=>q.email===row.email?row:null})
User.updateOne=async(q,u)=>{if(q.recuperacaoHash && q.recuperacaoHash!==row.recuperacaoHash)return;Object.assign(row,u.$set||{});for(const k of Object.keys(u.$unset||{}))delete row[k]}
User.findOneAndUpdate=(q,u)=>({select:async()=>{if(q.recuperacaoHash!==row.recuperacaoHash || !(row.recuperacaoExpira>q.recuperacaoExpira.$gt))return null;Object.assign(row,u.$set);row.senhaVersao++;delete row.recuperacaoHash;delete row.recuperacaoExpira;return row}})
User.exists=async q=>q.$or ? row.senhaVersao===0 : q.senhaVersao===row.senhaVersao
Session.findOne=()=>({lean:async()=>({usuarioId:row._id,senhaVersao:0})})
const app=express();app.use(express.json());const c=require('../src/controllers/recoveryController');app.post('/pedir',c.solicitar);app.post('/trocar',c.redefinir);app.get('/privado',require('../src/middleware/access').autenticar,(req,res)=>res.json({ok:true}))
after(()=>{User.findOne=originals.find;User.updateOne=originals.update;User.findOneAndUpdate=originals.reset;User.exists=originals.exists;Session.findOne=originals.session;mail.configuracao=originals.config;mail.enviarLink=originals.send})
test('destinatário é a conta cadastrada; resposta não expõe token nem existência',async()=>{
 const a=await request(app).post('/pedir').send({email:'pessoa@outlook.com'})
 const b=await request(app).post('/pedir').send({email:'ausente@example.org'})
 assert.equal(a.status,200);assert.deepEqual(a.body,b.body);assert.equal(sent[0].email,row.email);assert.equal(row.recuperacaoHash,hashToken(sent[0].token));assert.equal(a.body.token,undefined);assert.equal(row.token,undefined)
})
test('novo pedido invalida o link anterior; prazo é verificado sem depender de TTL',async()=>{
 const antigo=sent[0].token
 await request(app).post('/pedir').send({email:row.email})
 assert.equal((await request(app).post('/trocar').send({token:antigo,senha:'nova-senha'})).status,400)
 row.recuperacaoExpira=new Date(0)
 assert.equal((await request(app).post('/trocar').send({token:sent.at(-1).token,senha:'nova-senha'})).status,400)
})
test('redefinição é de uso único, protege senha e revoga sessões anteriores',async()=>{
 await request(app).post('/pedir').send({email:row.email})
 const token=sent.at(-1).token
 assert.equal((await request(app).get('/privado').auth('a'.repeat(64),{type:'bearer'})).status,200)
 const resultados=await Promise.all([1,2].map(()=>request(app).post('/trocar').send({token,senha:'senha-nova-123'})))
 assert.deepEqual(resultados.map(r=>r.status).sort(),[200,400]);assert.ok(await bcrypt.compare('senha-nova-123',row.senha));assert.equal(row.senhaVersao,1);assert.equal(row.recuperacaoHash,undefined);assert.deepEqual(row.descobertas,{favorites:['teatro']})
 assert.equal((await request(app).get('/privado').auth('a'.repeat(64),{type:'bearer'})).status,401)
})
test('entrada inválida recusada; indisponibilidade do envio não divulga conta',async()=>{
 assert.equal((await request(app).post('/pedir').send({email:{$ne:null}})).status,400)
 assert.equal((await request(app).post('/trocar').send({token:'invalido',senha:'nova-senha'})).status,400)
 await request(app).post('/pedir').send({email:row.email})
 assert.equal((await request(app).post('/trocar').send({token:sent.at(-1).token,senha:'a'})).status,400)
 assert.equal((await request(app).post('/trocar').send({token:sent.at(-1).token,senha:'ã'.repeat(40)})).status,400)
 mail.enviarLink=async()=>{throw new Error('indisponível')}
 const a=await request(app).post('/pedir').send({email:row.email}),b=await request(app).post('/pedir').send({email:'ausente@example.org'})
 assert.deepEqual(a.body,b.body);assert.equal(row.recuperacaoHash,undefined)
})
test('limite de solicitações impede repetição excessiva',async()=>{
 const limitado=express();limitado.use(express.json());limitado.post('/recuperar-senha',require('../src/middleware/recoveryLimit'),(req,res)=>res.json({ok:true}))
 for(let i=0;i<5;i++)assert.equal((await request(limitado).post('/recuperar-senha').send({email:'limite@example.org'})).status,200)
 assert.equal((await request(limitado).post('/recuperar-senha').send({email:'limite@example.org'})).status,429)
})
