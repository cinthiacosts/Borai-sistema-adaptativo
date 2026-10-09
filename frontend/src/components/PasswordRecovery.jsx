import {useState} from 'react'
import logoEntrada from '../assets/logo-borai-cadastro.png'
const API=import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
export default function PasswordRecovery({token,onBack}) {
  const [email,setEmail]=useState(''),[senha,setSenha]=useState(''),[confirmar,setConfirmar]=useState('')
  const [busy,setBusy]=useState(false),[erro,setErro]=useState(''),[mensagem,setMensagem]=useState(''),[feito,setFeito]=useState(false)
  async function enviar(event) {
    event.preventDefault();setErro('');setMensagem('')
    if(token && senha!==confirmar) {setErro('As senhas não são iguais.');return}
    if(token && (senha.length<8 || new TextEncoder().encode(senha).length>72)) {setErro('Use pelo menos 8 caracteres e no máximo 72 bytes.');return}
    setBusy(true)
    try {
      const response=await fetch(API.replace(/\/$/,'')+'/users/'+(token?'redefinir-senha':'recuperar-senha'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(token?{token,senha}:{email:email.trim()})})
      const data=await response.json()
      if(!response.ok) throw new Error(data.mensagem || 'Não foi possível concluir. Tente novamente.')
      setMensagem(data.mensagem)
      if(token) {setFeito(true);setSenha('');setConfirmar('');localStorage.removeItem('borai_sessao');localStorage.removeItem('borai_usuario');window.history.replaceState(null,'',window.location.pathname+window.location.search)}
    } catch(error) {setErro(error.message || 'Não foi possível conectar. Tente novamente.')}
    finally {setBusy(false)}
  }
  return <div className="login-page">
    <div className="login-brand-area"><img src={logoEntrada} className="login-brand-image" alt="Boraí"/><div className="auth-brand-copy"><h2>Seu jeito de curtir,<br/>onde você estiver.</h2></div></div>
    <main className="login-form-area" aria-label="Recuperação da conta"><div className="login-card">
      <div className="login-heading"><h1>{token?'Definir nova senha':'Esqueci minha senha'}</h1><p>{token?'Escolha uma nova senha para sua conta.':'Informe o e-mail usado no cadastro. Você receberá um link válido por 20 minutos.'}</p></div>
      {erro && <p className="login-error" role="alert">{erro}</p>}
      {mensagem && <p className="login-success" role="status">{mensagem}</p>}
      {!feito && <form className="login-form" onSubmit={enviar}>
        {token?<><label htmlFor="nova-senha">Nova senha</label><input id="nova-senha" type="password" autoComplete="new-password" minLength={8} maxLength={72} required value={senha} onChange={e=>setSenha(e.target.value)} disabled={busy}/><label htmlFor="confirma-senha">Confirmar nova senha</label><input id="confirma-senha" type="password" autoComplete="new-password" minLength={8} maxLength={72} required value={confirmar} onChange={e=>setConfirmar(e.target.value)} disabled={busy}/></>:<><label htmlFor="recupera-email">E-mail cadastrado</label><input id="recupera-email" type="email" autoComplete="email" maxLength={254} required value={email} onChange={e=>setEmail(e.target.value)} disabled={busy}/></>}
        <button className="login-submit" disabled={busy}>{busy?'Aguarde…':token?'Salvar nova senha':'Enviar link de recuperação'}</button>
      </form>}
      <div className="login-register"><button type="button" disabled={busy} onClick={onBack}>Voltar para entrar</button></div>
    </div></main>
  </div>
}
