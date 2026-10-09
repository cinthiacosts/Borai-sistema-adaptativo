const crypto = require('node:crypto')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const mail = require('../services/recoveryMail')
const {hashToken} = require('../services/sessionService')
const mensagem = 'Se houver uma conta com esse e-mail, enviaremos um link de recuperação. Confira também o spam.'
async function solicitar(req,res) {
  const email = req.body?.email
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return res.status(400).json({mensagem:'Informe um e-mail válido.'})
  try {
    mail.configuracao()
    const usuario = await User.findOne({email:email.trim().toLowerCase()}).select('_id')
    if (!usuario) return res.json({mensagem})
    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = hashToken(token)
    // Um novo pedido invalida o link anterior. Apenas o hash fica no banco.
    await User.updateOne({_id:usuario._id},{$set:{recuperacaoHash:tokenHash,recuperacaoExpira:new Date(Date.now()+20*60*1000)}})
    try { await mail.enviarLink(email.trim().toLowerCase(),token) }
    catch {
      await User.updateOne({_id:usuario._id,recuperacaoHash:tokenHash},{$unset:{recuperacaoHash:1,recuperacaoExpira:1}})
      // Não revela se o e-mail está cadastrado nem registra o link/credenciais.
      console.error('Boraí: envio de recuperação indisponível. Verifique a configuração do remetente.')
    }
    return res.json({mensagem})
  } catch { return res.status(503).json({mensagem:'A recuperação está indisponível no momento. Tente novamente mais tarde.'}) }
}
async function redefinir(req,res) {
  const {token,senha} = req.body || {}
  if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) return res.status(400).json({mensagem:'Link inválido. Solicite outro link de recuperação.'})
  if (typeof senha !== 'string' || senha.length < 8 || Buffer.byteLength(senha,'utf8') > 72) return res.status(400).json({mensagem:'Use uma senha com pelo menos 8 caracteres e no máximo 72 bytes.'})
  try {
    const protegida = await bcrypt.hash(senha,10)
    // Atualização atômica: duas tentativas com o mesmo link não podem vencer.
    const usuario = await User.findOneAndUpdate({recuperacaoHash:hashToken(token),recuperacaoExpira:{$gt:new Date()}},{$set:{senha:protegida},$inc:{senhaVersao:1},$unset:{recuperacaoHash:1,recuperacaoExpira:1}},{new:true}).select('_id')
    if (!usuario) return res.status(400).json({mensagem:'Link expirado ou já utilizado. Solicite um novo link.'})
    return res.json({mensagem:'Senha alterada. Entre novamente com sua nova senha.'})
  } catch { return res.status(503).json({mensagem:'Não foi possível alterar a senha. Tente novamente.'}) }
}
module.exports={solicitar,redefinir}
