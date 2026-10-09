const nodemailer = require('nodemailer')
function configuracao() {
  const {SMTP_HOST, SMTP_USER, SMTP_PASS, FRONTEND_URL} = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FRONTEND_URL) throw new Error('RECOVERY_CONFIG')
  const base = new URL(FRONTEND_URL)
  if (base.username || base.password || base.search || base.hash || (base.protocol !== 'https:' && !(base.protocol === 'http:' && ['localhost','127.0.0.1'].includes(base.hostname)))) throw new Error('RECOVERY_CONFIG')
  return {base, SMTP_HOST, SMTP_USER, SMTP_PASS}
}
async function enviarLink(email, token) {
  const c = configuracao()
  const link = new URL(c.base)
  link.hash = 'redefinir-senha=' + token
  const transport = nodemailer.createTransport({host:c.SMTP_HOST, port:Number(process.env.SMTP_PORT || 465), secure:process.env.SMTP_SECURE !== 'false', auth:{user:c.SMTP_USER, pass:c.SMTP_PASS}, connectionTimeout:10000, greetingTimeout:10000, socketTimeout:15000})
  const result = await transport.sendMail({from:{name:'Boraí',address:c.SMTP_USER},to:email,subject:'Boraí — redefina sua senha',text:`Recebemos um pedido para redefinir a senha da sua conta Boraí.\n\nAbra este link no navegador:\n${link.href}\n\nEle vale por 20 minutos e pode ser usado uma vez. Se você não pediu a alteração, ignore esta mensagem. Sua senha permanece a mesma.`})
  if (!result.accepted?.length) throw new Error('RECOVERY_SEND')
}
module.exports = {configuracao, enviarLink}
