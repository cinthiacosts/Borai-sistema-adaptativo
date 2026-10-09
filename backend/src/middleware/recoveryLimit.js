const crypto = require('node:crypto')
// Limite por processo. Não depende de identificar o IP atrás de um proxy.
const entradas = new Map()
const janela = 15*60*1000
let globalInicio=Date.now(), globalTotal=0
module.exports = function limite(req,res,next) {
  const agora=Date.now()
  if (agora-globalInicio>=janela) {globalInicio=agora;globalTotal=0;entradas.clear()}
  if (++globalTotal>100) return res.status(429).json({mensagem:'Muitas solicitações. Aguarde alguns minutos e tente novamente.'})
  const valor=req.path.includes('redefinir') ? req.body?.token : req.body?.email
  const chave=crypto.createHash('sha256').update(String(valor||'').trim().toLowerCase()).digest('hex')
  const atual=entradas.get(chave)||{inicio:agora,total:0}
  if(agora-atual.inicio>=janela) {atual.inicio=agora;atual.total=0}
  entradas.set(chave,atual)
  if(++atual.total>5) return res.status(429).json({mensagem:'Muitas solicitações. Aguarde 15 minutos para tentar novamente.'})
  next()
}
