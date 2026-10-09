const crypto = require('node:crypto')
const Session = require('../models/Session')
const hashToken = token => crypto.createHash('sha256').update(token).digest('hex')
async function criarSessao(usuarioId,senhaVersao=0) {
 const token=crypto.randomBytes(32).toString('hex')
 const expiresAt=new Date(Date.now()+24*60*60*1000)
 await Session.create({tokenHash:hashToken(token),usuarioId,expiresAt,senhaVersao})
 return {token,expiraEm:expiresAt}
}
module.exports={hashToken,criarSessao}
