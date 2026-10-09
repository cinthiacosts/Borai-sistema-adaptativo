import {authHeaders,clearSession,expireSession} from './session'
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '')
export async function homeRequest(endpoint, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    const response = await fetch(BASE + endpoint, {...options, headers:{'Content-Type':'application/json',...authHeaders(),...options.headers}, signal:controller.signal})
    if (response.status === 401) expireSession()
    const data = await response.json()
    if (!response.ok) throw new Error(data.mensagem || data.erro || 'Não foi possível concluir a operação.')
    return data
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('A API demorou para responder. Tente novamente.')
    throw e
  } finally { clearTimeout(timeout) }
}
export const updatePreferences = (id, preferencias, localizacao) => homeRequest('/users/' + encodeURIComponent(id), {method:'PATCH',body:JSON.stringify({preferencias,localizacao})})
export const registerInteraction = (id, place, action, rating) => homeRequest('/users/' + encodeURIComponent(id) + '/interactions', {method:'POST',body:JSON.stringify({item:place.interactionName || place.name,categoria:place.apiCategory,acao:action,...(place.recommendationAuditId && ['aprovou','rejeitou'].includes(action) ? {recomendacaoId:place.recommendationAuditId,lugarId:place.dbId} : {}),...(rating ? {avaliacao:rating} : {})})})

export const getRecommendations = id => homeRequest('/recommendations', {method:'POST',body:JSON.stringify({userId:id,categoria:null})})

export async function logoutAccount(){await homeRequest('/users/logout',{method:'POST',body:'{}'});clearSession()}

export const saveDiscoveries = (id,personal,revision,initial=false) => homeRequest('/users/'+encodeURIComponent(id)+'/discoveries',{method:'PATCH',body:JSON.stringify({personal,revision,initial})})
