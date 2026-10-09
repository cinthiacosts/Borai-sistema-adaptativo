const User=require('../models/User')
const idValido=id=>typeof id==='string' && /^[a-zA-Z0-9_-]{1,100}$/.test(id)
function validarPerfil(value) {
 if (!value || typeof value!=='object' || Array.isArray(value)) throw Error('Perfil de descobertas inválido.')
 const {favorites,history,ratings,avatar}=value
 for (const list of [favorites,history]) if (!Array.isArray(list) || list.length>1000 || list.some(id=>!idValido(id))) throw Error('Lista de lugares inválida.')
 if (!ratings || typeof ratings!=='object' || Array.isArray(ratings) || Object.keys(ratings).length>1000 || Object.entries(ratings).some(([id,n])=>!idValido(id)||!Number.isInteger(n)||n<1||n>5)) throw Error('Avaliações pessoais inválidas.')
 if (typeof avatar!=='string' || avatar.length>=250000 || (avatar!=='' && !/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(avatar))) throw Error('Foto inválida. Escolha novamente uma foto JPG, PNG ou WebP na tela de perfil.')
 if (avatar) {const bytes=Buffer.from(avatar.split(',')[1],'base64');if(bytes[0]!==255 || bytes[1]!==216 || bytes[2]!==255) throw Error('Conteúdo da foto inválido.')}
 return {favorites:[...new Set(favorites)],history:[...new Set(history)],ratings:Object.fromEntries(Object.entries(ratings)),avatar}
}
async function salvarDescobertas(req,res) {
 try {
  const personal=validarPerfil(req.body.personal)
  const initial=req.body.initial===true
  const revision=req.body.revision
  if (!initial && (!Number.isSafeInteger(revision)||revision<1)) return res.status(400).json({mensagem:'Versão do perfil inválida.'})
  const filter=initial?{_id:req.contaId,descobertas:null}:{_id:req.contaId,'descobertas.versao':revision}
  const saved=await User.findOneAndUpdate(filter,{$set:{descobertas:{...personal,versao:initial?1:revision+1}}},{new:true,runValidators:true}).select('descobertas')
  if (saved) return res.json({personal:saved.descobertas})
  const current=await User.findById(req.contaId).select('descobertas')
  if (!current) return res.status(404).json({mensagem:'Conta não encontrada.'})
  if (initial) return res.json({personal:current.descobertas})
  return res.status(409).json({mensagem:'Seu perfil foi atualizado em outra aba ou dispositivo. Atualize a página antes de tentar novamente.'})
 } catch(error) {return res.status(400).json({mensagem:error.message || 'Não foi possível salvar suas descobertas.'})}
}
module.exports={validarPerfil,salvarDescobertas}
