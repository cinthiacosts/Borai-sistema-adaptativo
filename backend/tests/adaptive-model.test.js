const {test}=require('node:test');const assert=require('node:assert/strict')
const {trainModel}=require('../src/services/adaptiveModel')
const museum={nome:'Museu A',categoria:'lazer',tags:['cultura','historia']}
const similar={nome:'Museu B',categoria:'lazer',tags:['cultura','historia']}
const beach={nome:'Praia',categoria:'lazer',tags:['natureza','praia']}
const places=[museum,similar,beach]
test('aprovação aprendida aumenta afinidade de outro lugar com características semelhantes',()=>{
 const before=trainModel(places).predict(similar).indiceAfinidade
 const model=trainModel(places,[{item:'Museu A',acao:'aprovou'},{item:'Praia',acao:'rejeitou'}])
 assert.ok(model.predict(similar).indiceAfinidade>before)
 assert.ok(model.predict(similar).indiceAfinidade>model.predict(beach).indiceAfinidade)
 assert.equal(model.samples,2)
})
test('rejeição reduz afinidade prevista de lugares semelhantes',()=>{
 const model=trainModel(places,[{item:'Museu A',acao:'rejeitou'}])
 assert.ok(model.predict(similar).indiceAfinidade<0.5)
})
test('último feedback prevalece e cliques repetidos não multiplicam amostras',()=>{
 const a=trainModel(places,[{item:'Museu A',acao:'aprovou'},{item:'Museu A',acao:'rejeitou'}])
 const b=trainModel(places,[{item:'Museu A',acao:'rejeitou'}])
 assert.equal(a.samples,1);assert.equal(a.predict(similar).indiceAfinidade,b.predict(similar).indiceAfinidade)
})
test('sem histórico usa preferências e informa ausência de exemplos; visualização não é rótulo',()=>{
 const m=trainModel(places,[{item:'Museu A',acao:'visualizou'},{item:'Museu A',acao:'avaliou',avaliacao:3}],['cultura'])
 assert.equal(m.samples,0);assert.ok(m.predict(museum).indiceAfinidade>m.predict(beach).indiceAfinidade)
})
test('resultado é determinístico, finito e reconstruído por conta',()=>{
 const h=[{item:'Museu A',acao:'aprovou'}]
 const a=trainModel(places,h);const b=trainModel(places,h)
 assert.deepEqual(a.predict(similar),b.predict(similar));assert.equal(trainModel(places).predict(similar).indiceAfinidade,0.5)
 assert.ok(a.predict(similar).indiceAfinidade<1)
})
