const User = require('../models/User')
const Session = require('../models/Session')
const {hashToken} = require('../services/sessionService')
async function autenticar(req,res,next) {
 const match=/^Bearer ([a-f0-9]{64})$/.exec(req.get('Authorization') || '')
 if (!match) return res.status(401).json({mensagem:'Entre na sua conta para continuar.'})
 try {
  const session=await Session.findOne({tokenHash:hashToken(match[1]),expiresAt:{$gt:new Date()}}).lean()
  if (!session) return res.status(401).json({mensagem:'Sua sessão expirou. Entre novamente.'})
  const versao=session.senhaVersao || 0
  const filtro=versao===0 ? {_id:session.usuarioId,$or:[{senhaVersao:0},{senhaVersao:{$exists:false}}]} : {_id:session.usuarioId,senhaVersao:versao}
  if (!await User.exists(filtro)) return res.status(401).json({mensagem:'Sua senha foi alterada. Entre novamente.'})
  req.contaId=String(session.usuarioId);req.sessaoId=session._id
  return next()
 } catch { return res.status(503).json({mensagem:'Não foi possível verificar sua sessão. Tente novamente.'}) }
}
function mesmaConta(req,res,next) {
 const ids=[req.params.id,req.body?.userId,req.query?.usuarioId].filter(v=>v!==undefined && v!==null)
 if (ids.some(id=>typeof id!=='string' || id!==req.contaId)) return res.status(403).json({mensagem:'Você só pode acessar os dados da sua própria conta.'})
 return next()
}
const bloquearAdministracao=(req,res)=>res.status(403).json({mensagem:'Esta operação administrativa não está disponível na demonstração pública.'})
async function encerrarSessao(req,res) {
 try { await Session.deleteOne({_id:req.sessaoId});return res.json({mensagem:'Sessão encerrada.'}) }
 catch { return res.status(503).json({mensagem:'Não foi possível encerrar a sessão. Tente novamente.'}) }
}
module.exports={autenticar,mesmaConta,bloquearAdministracao,encerrarSessao}
