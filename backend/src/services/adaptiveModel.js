// Regressão logística por conta. Treinamento determinístico a partir do histórico real.
// Sem chamadas externas; os pesos são reconstruídos a partir da memória do MongoDB.
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,' ')
const features = place => [...new Set(['categoria:'+normalize(place.categoria),...(place.tags || []).map(tag=>'interesse:'+normalize(tag))])].filter(key=>!key.endsWith(':'))
const sigmoid = value => 1 / (1 + Math.exp(-Math.max(-30,Math.min(30,value))))
function trainModel(places, history=[], preferences=[]) {
  const byName = new Map(places.map(place=>[normalize(place.nome),place]))
  const labels = new Map()
  for (const event of history) {
    const place = byName.get(normalize(event.item))
    if (!place) continue
    let target = null
    if (event.acao==='aprovou' || event.acao==='salvou') target=1
    if (event.acao==='rejeitou') target=0
    if (event.acao==='avaliou' && event.avaliacao>=4) target=1
    if (event.acao==='avaliou' && event.avaliacao<=2) target=0
    if (target!==null) labels.set(normalize(place.nome),{place,target})
  }
  const samples=[...labels.values()].slice(-500)
  const weights = new Map()
  const prior = new Map(preferences.map(value=>['interesse:'+normalize(value),0.8]))
  let bias=0
  // Gradiente em lote com regularização. Repetir cliques não multiplica exemplos.
  if (samples.length) for (let epoch=0;epoch<80;epoch++) {
    const gradient=new Map();let biasGradient=0
    for (const {place,target} of samples) {
      const keys=features(place)
      const logit=bias+keys.reduce((sum,key)=>sum+(weights.get(key)||0)+(prior.get(key)||0),0)
      const error=target-sigmoid(logit)
      biasGradient+=error
      for (const key of keys) gradient.set(key,(gradient.get(key)||0)+error)
    }
    bias+=0.15*biasGradient/samples.length
    for (const [key,grad] of gradient) weights.set(key,(weights.get(key)||0)+0.15*(grad/samples.length-0.03*(weights.get(key)||0)))
  }
  return {version:'borai-logistic-v1',samples:samples.length,predict(place) {
    const contributions=features(place).map(key=>({caracteristica:key,peso:weights.get(key)||0,preferencia:prior.get(key)||0}))
    const value=bias+contributions.reduce((sum,x)=>sum+x.peso+x.preferencia,0)
    return {indiceAfinidade:sigmoid(value),contributions}
  }}
}
module.exports={trainModel,features,normalize}
