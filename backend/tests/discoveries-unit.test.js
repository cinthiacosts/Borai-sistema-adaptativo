const {test,after}=require('node:test'),assert=require('node:assert/strict'),express=require('express'),request=require('supertest')
const User=require('../src/models/User'),Session=require('../src/models/Session')
const {validarPerfil}=require('../src/controllers/discoveryController')
const uid='6ac281de00a2288e66e5d48c',other='6ac281de00a2288e66e5d48d',token='a'.repeat(64)
const original={update:User.findOneAndUpdate,by:User.findById,session:Session.findOne}
let stored=null,updates=0
Session.findOne=()=>({lean:async()=>({usuarioId:uid})})
User.findOneAndUpdate=(filter,update)=>({select:async()=>{
 if(filter._id!==uid || (filter.descobertas===null ? stored!==null : stored?.versao!==filter['descobertas.versao'])) return null
 stored=structuredClone(update.$set.descobertas);updates++;return {descobertas:stored}
}})
User.findById=()=>({select:async()=>({descobertas:stored})})
after(()=>{User.findOneAndUpdate=original.update;User.findById=original.by;Session.findOne=original.session})
const app=express();app.use(express.json({limit:'350kb'}));app.use('/users',require('../src/routes/userRoutes'))
const personal={favorites:['teatro','teatro'],history:['mercado'],ratings:{teatro:5},avatar:'data:image/jpeg;base64,/9j/2Q=='}
const send=body=>request(app).patch('/users/'+uid+'/discoveries').auth(token,{type:'bearer'}).send(body)
test('migração importa foto, favoritos, visitas e avaliações sem duplicatas',async()=>{
 const res=await send({initial:true,personal})
 assert.equal(res.status,200);assert.deepEqual(res.body.personal.favorites,['teatro']);assert.equal(stored.avatar,personal.avatar);assert.equal(stored.versao,1)
})
test('nova tentativa de migração não sobrescreve dados existentes',async()=>{
 const res=await send({initial:true,personal:{...personal,avatar:'',favorites:[]}})
 assert.equal(res.status,200);assert.equal(updates,1);assert.equal(res.body.personal.avatar,personal.avatar)
})
test('remoção persiste na conta, sem modificar histórico de decisões',async()=>{
 const res=await send({revision:1,personal:{...personal,favorites:[],avatar:''}})
 assert.equal(res.status,200);assert.equal(stored.versao,2);assert.deepEqual(stored.favorites,[]);assert.equal(stored.avatar,'');assert.equal(stored.historico,undefined)
})
test('versão antiga recebe conflito e não apaga alterações de outra aba',async()=>{
 const res=await send({revision:1,personal})
 assert.equal(res.status,409);assert.equal(stored.versao,2);assert.deepEqual(stored.favorites,[])
})
test('sem sessão e outra conta não podem gravar descobertas',async()=>{
 assert.equal((await request(app).patch('/users/'+uid+'/discoveries').send({initial:true,personal})).status,401)
 assert.equal((await request(app).patch('/users/'+other+'/discoveries').auth(token,{type:'bearer'}).send({initial:true,personal})).status,403)
})
test('rejeita notas inválidas, campos perigosos, fotos não JPEG e fotos grandes',()=>{
 for(const invalid of [{...personal,ratings:{teatro:6}},{...personal,ratings:{'x.y':4}},{...personal,favorites:['$where']},{...personal,avatar:'data:image/svg+xml;base64,AAAA'},{...personal,avatar:'data:image/jpeg;base64,AAAA'},{...personal,avatar:'x'.repeat(250000)}]) assert.throws(()=>validarPerfil(invalid))
 assert.deepEqual(validarPerfil({...personal,avatar:''}).history,['mercado'])
})

// Verificação da existência da conta isolada do MongoDB nestes testes.
const originalUserExists=User.exists
User.exists=async()=>true
after(()=>{User.exists=originalUserExists})
