const TOKEN_KEY='borai_sessao'
export function getToken(){return localStorage.getItem(TOKEN_KEY)}
export function saveSession(sessao){
 if (!sessao?.token) throw new Error('O servidor não retornou uma sessão de acesso.')
 localStorage.setItem(TOKEN_KEY,sessao.token)
}
export function clearSession(){localStorage.removeItem(TOKEN_KEY);localStorage.removeItem('borai_usuario')}
export function authHeaders(){const token=getToken();return token?{Authorization:'Bearer '+token}:{}}
export function expireSession(){clearSession();window.location.reload()}
// Um cadastro salvo no navegador, sozinho, não representa uma sessão válida.
if (!getToken()) localStorage.removeItem('borai_usuario')
