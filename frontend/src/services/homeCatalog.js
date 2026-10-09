import {photos, testPlaceName} from './placePhotos'
// Catálogo e textos da versão do site Boraí. Nenhum horário ou preço é inferido.
export const source = 'https://www.manaus.am.gov.br/turismo/o-que-ver-e-fazer-em-manaus/'
export const categories = ['Cultura', 'Natureza', 'Passeios', 'Gastronomia', 'Cafeterias', 'Bares', 'Eventos', 'Hotéis']
export const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
const initial = [
  { id:'teatro', name:'Teatro Amazonas', category:'Cultura', area:'Centro', tag:'Uma cidade de histórias', description:'Um dos símbolos culturais de Manaus. Uma descoberta para quem gosta de arquitetura e história.', icon:'theater' },
  { id:'ponta', name:'Praia da Ponta Negra', category:'Passeios', area:'Ponta Negra', tag:'Um encontro com o Rio Negro', description:'Uma opção para conhecer a orla e apreciar a paisagem do Rio Negro.', icon:'waves' },
  { id:'musa', name:'Museu da Amazônia · MUSA', category:'Natureza', area:'Manaus', tag:'A floresta bem perto', description:'Trilhas na floresta para descobrir a biodiversidade amazônica.', icon:'tree' },
  { id:'mercado', name:'Mercado Municipal Adolpho Lisboa', category:'Gastronomia', area:'Centro', tag:'Sabores e cultura amazônica', description:'Um ponto de encontro com produtos e referências da cultura regional.', icon:'utensils' },
  { id:'largo', name:'Largo de São Sebastião', category:'Passeios', area:'Centro', tag:'Uma pausa no Centro', description:'Um passeio pelo entorno do Teatro Amazonas e pela história da cidade.', icon:'sun' },
  { id:'palacete', name:'Palacete Provincial', category:'Cultura', area:'Centro', tag:'Arte, memória e descoberta', description:'Um espaço cultural para incluir no seu roteiro pelo Centro de Manaus.', icon:'landmark' },
]
export const preferenceValue = label => ({Gastronomia:'gastronomia', Cultura:'cultura', Natureza:'natureza', Passeios:'lazer', Cafeterias:'cafeteria', Bares:'bar', Eventos:'evento', 'Hotéis':'hotel'}[label] || normalize(label))
export function preferenceLabels(values = []) {
  const aliases = {restaurante:'Gastronomia',gastronomia:'Gastronomia',cultura:'Cultura',natureza:'Natureza',lazer:'Passeios',cafeteria:'Cafeterias',bar:'Bares',evento:'Eventos',hotel:'Hotéis'}
  return [...new Set(values.map(v => aliases[normalize(v)] || categories.find(c => normalize(c) === normalize(v))).filter(Boolean))]
}
export function safeUrl(value) {
  if (!value) return null
  try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null } catch { return null }
}
function knownPlace(place) {
  const name = normalize(place.nome)
  return initial.find(p => normalize(p.name) === name || (p.id === 'musa' && /musa|museu da amazonia/.test(name)))
}
export function mergePlaces(database = []) {
  const result = initial.map(p => ({...p, photo:photos[p.id] || null, apiCategory: p.category === 'Gastronomia' ? 'restaurante' : 'lazer', tags:[preferenceValue(p.category)], official:source, database:false}))
  const labels = {restaurante:'Gastronomia',cafeteria:'Cafeterias',bar:'Bares',evento:'Eventos',hotel:'Hotéis',lazer:'Passeios'}
  const icons = {restaurante:'utensils',cafeteria:'coffee',bar:'glass',evento:'music',hotel:'hotel',lazer:'sun'}
  for (const p of database) {
    if (!p || !p.nome || testPlaceName(p.nome) || p.ativo === false || (p.status && p.status !== 'aprovado')) continue
    const known = knownPlace(p)
    const tags = Array.isArray(p.tags) ? p.tags : []
    const normalizedTags = tags.map(normalize)
    const category = known?.category || (p.categoria === 'lazer' && normalizedTags.includes('natureza') ? 'Natureza' : p.categoria === 'lazer' && normalizedTags.includes('cultura') ? 'Cultura' : labels[p.categoria] || 'Passeios')
    const local = {
      id:known?.id || 'db-' + (p._id || normalize(p.nome)), dbId:p._id, interactionName:p.nome, name:known?.name || p.nome,
      category, apiCategory:p.categoria || 'lazer', area:p.bairro || known?.area || 'Manaus', zone:p.zona || '',
      tag:known?.tag || p.bairro || 'Uma descoberta em Manaus', description:p.descricao || known?.description || 'Conheça este lugar e planeje sua visita.',
      icon:known?.icon || icons[p.categoria] || 'sun', tags, official:known ? source : safeUrl(p.site),
      photo:known && photos[known.id] ? photos[known.id] : safeUrl(p.imagem) ? {url:safeUrl(p.imagem),author:p.creditoImagem || '',page:safeUrl(p.fonteImagem),label:'',license:null} : null,
      coords:p.localizacao, address:p.endereco || '', database:true,
    }
    const index = result.findIndex(x => x.id === local.id || normalize(x.name) === normalize(local.name))
    if (index >= 0) result[index] = local; else result.push(local)
  }
  return result
}
export function scorePlace(place, profile, catalog) {
  const interests = preferenceLabels(profile.preferences)
  const favoriteCategories = catalog.filter(p => profile.favorites.includes(p.id)).map(p => p.category)
  return (interests.includes(place.category) ? 5 : 0) + favoriteCategories.filter(c => c === place.category).length * 2 + ((profile.ratings[place.id] || 0) >= 4 ? 2 : 0)
}
export function filterPlaces(catalog, {query='', category='Todos', area='Todas', view='explore', profile}) {
  const q = normalize(query)
  let list = catalog.filter(p => (category === 'Todos' || p.category === category) && (area === 'Todas' || p.area === area) && normalize([p.name,p.category,p.area,p.description,...p.tags].join(' ')).includes(q))
  if (view === 'favorites') list = list.filter(p => profile.favorites.includes(p.id))
  if (view === 'recommendations') list = [...list].sort((a,b) => scorePlace(b,profile,catalog) - scorePlace(a,profile,catalog))
  return list
}
export const profileKey = user => 'borai_descobertas_v1:' + (user.id || user._id || user.email)
export function loadPersonal(storage, user) {
  let saved = {}
  try { saved = JSON.parse(storage.getItem(profileKey(user))) || {} } catch { /* Perfil novo ou armazenamento indisponível. */ }
  return {
    preferences:Array.isArray(user.preferencias) ? user.preferencias : [],
    location:user.contextoAtual?.localizacao || 'Manaus - AM',
    avatar:typeof saved.avatar === 'string' && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(saved.avatar) && saved.avatar.length < 250000 ? saved.avatar : '',
    favorites:Array.isArray(saved.favorites) ? [...new Set(saved.favorites.filter(x => typeof x === 'string'))] : [],
    history:Array.isArray(saved.history) ? [...new Set(saved.history.filter(x => typeof x === 'string'))] : [],
    ratings:saved.ratings && typeof saved.ratings === 'object' ? Object.fromEntries(Object.entries(saved.ratings).filter(([,v]) => Number.isInteger(v) && v >= 1 && v <= 5)) : {},
  }
}
