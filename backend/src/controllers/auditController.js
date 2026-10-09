const AuditLog = require('../models/AuditLog')
const User = require('../models/User')
const mongoose = require('mongoose')
async function listarAuditorias(req,res) {
  try {
    const id=req.contaId
    if (id && !mongoose.isValidObjectId(id)) return res.status(400).json({mensagem:'Conta inválida.'})
    const auditorias=await AuditLog.find(id ? {usuarioId:id} : {}).sort({createdAt:-1}).limit(100).lean()
    if (id) {
      const usuario=await User.findById(id).select('historico').lean()
      if (!usuario) return res.status(404).json({mensagem:'Conta não encontrada.'})
      for (const [index,event] of (usuario.historico || []).entries()) {
        if (!['aprovou','rejeitou'].includes(event.acao)) continue
        auditorias.push({_id:'decisao-'+index,acao:event.acao,entidade:'decisao',createdAt:event.data,
          descricao:(event.acao==='aprovou'?'Interesse registrado: ':'Indicação recusada: ')+event.item,
          dados:event.auditoria || {nome:event.item,categoria:event.categoria,semSnapshot:true}})
      }
    }
    auditorias.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
    const recentes=auditorias.slice(0,100)
    return res.json({total:recentes.length,auditorias:recentes})
  } catch(error) {return res.status(500).json({mensagem:'Não foi possível consultar seu histórico.'})}
}
module.exports={listarAuditorias}
