import { useEffect, useMemo, useRef, useState } from 'react'
import '../styles/HomeBorai.css'
import logo from '../assets/borai-home-logo.png'
import river from '../assets/borai-manaus-river.png'
import { categories, filterPlaces, loadPersonal, mergePlaces, preferenceLabels, preferenceValue, profileKey, source } from '../services/homeCatalog'
import { prepareProfilePhoto } from '../services/profilePhoto'
import { saveDiscoveries, logoutAccount, getRecommendations, homeRequest, registerInteraction, updatePreferences } from '../services/homeApi'
import MapaBorai from './MapaBorai'
import AuditHistory from './AuditHistory'

const paths = {
  compass:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM16 8l-3 5-5 3 3-5 5-3Z',
  heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  sliders:'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',
  pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  user:'M20 21v-2a8 8 0 0 0-16 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  tree:'M12 2l-6 7h3l-5 7h7v6h2v-6h7l-5-7h3l-6-7Z',
  theater:'M3 4l8 2v8c-3 6-8 1-8-3V4ZM13 4l8-2v9c0 6-5 9-8 6V4ZM5 8h1M8 9h1M15 7h1M18 6h1M5 12l4 1M15 13l4-1',
  waves:'M2 8c3-4 4 4 7 0s4 4 7 0 4 4 6 0M2 14c3-4 4 4 7 0s4 4 7 0 4 4 6 0M2 20c3-4 4 4 7 0s4 4 7 0 4 4 6 0',
  utensils:'M4 2v7c0 4 6 4 6 0V2M7 2v20M18 2c-4 3-4 11 0 11h2M20 2v20',
  landmark:'M2 8l10-6 10 6H2ZM4 10v9M9 10v9M15 10v9M20 10v9M2 22h20',
  sun:'M12 2v2M12 20v2M2 12h2M20 12h2M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z',
  star:'m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z',
  bookmark:'M5 3h14v19l-7-5-7 5V3Z',check:'m5 12 4 4L19 6',logout:'M9 3H3v18h6M8 12h14M17 7l5 5-5 5',
  coffee:'M4 3h12v10a6 6 0 0 1-12 0V3ZM16 5h3a3 3 0 0 1 0 6h-3M2 22h19',
  glass:'M4 3h16l-1 7-7 5-7-5-1-7ZM12 15v7M7 22h10',music:'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',hotel:'M3 21V3h18v18M8 7h1M15 7h1M8 11h1M15 11h1M10 21v-6h4v6',close:'m6 6 12 12M6 18 18 6',
}
function Icon({name, size=21, fill='none', ...props}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.compass}/></svg>
}
function PlacePhoto({place, detail=false}) {
  const [failed,setFailed] = useState(false)
  if (!place.photo || failed) return <div className="bh-no-photo"><Icon name="pin" size={30}/><span>{failed?'Foto indisponível':'Foto do lugar em breve'}</span><small>{place.area}</small></div>
  return <div className={detail?'bh-place-photo detail-photo':'bh-place-photo'}><img src={place.photo.url} alt={'Foto de ' + place.name} loading="lazy" decoding="async" onError={() => setFailed(true)}/>{!detail && <span className="bh-photo-area">{place.area}</span>}</div>
}
const views = [['explore','Explorar','compass'],['recommendations','Para você','sliders'],['favorites','Favoritos','heart'],['profile','Meu perfil','user'],['audit','Meu histórico','bookmark']]
function Modal({children, titleId, onClose}) {
  const ref = useRef(null)
  useEffect(() => { const element = ref.current; element.showModal(); return () => element.close() }, [])
  return <dialog ref={ref} className="bh-dialog" aria-labelledby={titleId} onCancel={onClose} onClick={e => {if (e.target === ref.current) onClose()}}><div className="bh-dialog-content"><button className="bh-close" onClick={onClose} aria-label="Fechar detalhes" autoFocus><Icon name="close"/></button>{children}</div></dialog>
}

export default function HomeBorai({usuario, estabelecimentos=[], carregando=false, erro='', onSair, onUsuarioChange}) {
  const [view,setView] = useState('explore')
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState('Todos')
  const [area,setArea] = useState('Todas')
  const [profile,setProfile] = useState(() => loadPersonal(localStorage, usuario))
  const [draft,setDraft] = useState(() => ({preferences:usuario.preferencias || [],location:usuario.contextoAtual?.localizacao || 'Manaus - AM'}))
  const [selected,setSelected] = useState(null)
  const [confirmReset,setConfirmReset] = useState(false)
  const [saving,setBusy] = useState(false)
  const [personalReady,setPersonalReady] = useState(false)
  const [personalRetry,setPersonalRetry] = useState(0)
  const personalVersion = useRef(null)
  const busy = saving || !personalReady
  const [message,setMessage] = useState('')
  const [syncError,setSyncError] = useState('')
  const [override,setOverride] = useState(null)
  const [retrying,setRetrying] = useState(false)
  const [retryError,setRetryError] = useState('')
  const [recommendations,setRecommendations] = useState([])
  const [recommendationLoading,setRecommendationLoading] = useState(false)
  const [recommendationError,setRecommendationError] = useState('')
  const [revision,setRevision] = useState(0)
  const [memoryCount,setMemoryCount] = useState(0)
  const [learningSamples,setLearningSamples] = useState(0)
  const [recommendationAuditId,setRecommendationAuditId] = useState(null)
  const userId = usuario.id || usuario._id
  const places = useMemo(() => mergePlaces(override || estabelecimentos),[override,estabelecimentos])
  const recommendationPlaces = recommendations.map(item => {
    const place = places.find(p => String(p.dbId) === String(item.id))
    return place ? {...place, recommendationReason:item.motivo,recommendationAuditId} : null
  }).filter(Boolean)
  const filtered = filterPlaces(view === 'recommendations' ? recommendationPlaces : places,{query,category,area,view:view === 'recommendations' ? 'explore' : view,profile})
  const areas = [...new Set(places.map(p => p.area))].sort((a,b) => a.localeCompare(b,'pt-BR'))
  const personalized = profile.preferences.length > 0 || profile.favorites.length > 0
  const loading = carregando || retrying
  const catalogError = override !== null ? retryError : (retryError || erro)

  useEffect(() => {
    let cancelled=false
    setPersonalReady(false)
    homeRequest('/users/'+encodeURIComponent(userId)).then(async data => {
      let personal=data.descobertas
      if (!personal) {
        const local=loadPersonal(localStorage,usuario)
        personal=(await saveDiscoveries(userId,{favorites:local.favorites,history:local.history,ratings:local.ratings,avatar:local.avatar},null,true)).personal
      }
      if (cancelled) return
      personalVersion.current=personal.versao
      setProfile(p=>({...p,...personal}))
      try {localStorage.setItem(profileKey(usuario),JSON.stringify(personal))} catch {}
      setPersonalReady(true);setSyncError('')
    }).catch(error=>{if(!cancelled) setSyncError(error.message || 'Não foi possível carregar seus favoritos e foto. Tente novamente.')})
    return ()=>{cancelled=true}
  },[userId,personalRetry])

  useEffect(() => { if (!message) return; const timer = setTimeout(() => setMessage(''),5000); return () => clearTimeout(timer) },[message])
  useEffect(() => {
    if (!userId) return
    let cancelled = false
    homeRequest('/users/' + encodeURIComponent(userId)).then(data => {
      if (cancelled) return
      const preferences = Array.isArray(data.preferencias) ? data.preferencias : usuario.preferencias || []
      const location = data.contextoAtual?.localizacao || 'Manaus - AM'
      setProfile(p => ({...p,preferences,location})); setDraft({preferences,location})
    }).catch(() => { /* Mantém o perfil que já foi confirmado no login. */ })
    return () => {cancelled = true}
  },[userId,usuario.preferencias])

  useEffect(() => {
    if (view !== 'recommendations' || !userId) return
    let cancelled = false
    setRecommendationLoading(true);setRecommendationError('');setRecommendations([])
    getRecommendations(userId).then(data => {
      if (cancelled) return
      setRecommendations(data.recomendacoes || []);setRecommendationAuditId(data.auditoriaId || null);setMemoryCount(data.memoriaUtilizada || 0);setLearningSamples(data.recomendacoes?.[0]?.ia?.amostras || 0)
    }).catch(error => {if (!cancelled) setRecommendationError(error.message || 'Não foi possível buscar suas recomendações.')})
      .finally(() => {if (!cancelled) setRecommendationLoading(false)})
    return () => {cancelled = true}
  },[view,userId,revision,usuario.preferencias])

  async function decide(place,action) {
    if (busy || !userId) return
    setBusy(true);setSyncError('')
    try {
      await registerInteraction(userId,place,action)
      setMessage(action === 'rejeitou' ? 'Escolha registrada. Este lugar saiu das suas indicações.' : 'Interesse registrado. Vamos considerar essa escolha nas próximas indicações.')
      setRevision(r => r + 1)
    } catch(error) {setSyncError(error.message || 'Não foi possível registrar sua escolha. Tente novamente.')}
    finally {setBusy(false)}
  }

  async function chooseAvatar(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    try {const avatar = await prepareProfilePhoto(file);await savePersonal({...profile,avatar},'Foto do perfil atualizada.')}
    catch(error) {setSyncError(error.message)} finally {setBusy(false)}
  }
  function avatar(size='') {
    return profile.avatar ? <img className={'bh-avatar ' + size} src={profile.avatar} alt={'Foto de ' + (usuario.nome || 'perfil')}/> : <span className={'bh-avatar bh-initials ' + size} aria-hidden="true">{(usuario.nome || 'B').trim().split(/\s+/).map(x => x[0]).slice(0,2).join('').toUpperCase()}</span>
  }
  function navigate(next) {setView(next); window.scrollTo({top:0,behavior:'instant'})}
  async function savePersonal(next, success) {
    if (!personalReady) return false
    setBusy(true);setSyncError('')
    try {
      const personal={favorites:next.favorites,history:next.history,ratings:next.ratings,avatar:next.avatar || ''}
      const result=await saveDiscoveries(userId,personal,personalVersion.current)
      personalVersion.current=result.personal.versao
      setProfile(p=>({...p,...result.personal}));setMessage(success)
      try {localStorage.setItem(profileKey(usuario),JSON.stringify(result.personal))} catch {}
      return true
    } catch(error) {setSyncError(error.message || 'Não foi possível salvar na sua conta. Tente novamente.');return false}
    finally {setBusy(false)}
  }
  async function log(place, action, rating) {
    if (!userId) return
    try {await registerInteraction(userId,place,action,rating);setSyncError('');setRevision(r => r + 1)}
    catch {setSyncError('Sua alteração ficou salva na conta, mas não foi possível registrar o evento para as recomendações. Tente novamente mais tarde.')}
  }
  async function favorite(place) {
    if (busy) return
    const has = profile.favorites.includes(place.id)
    if (!await savePersonal({...profile,favorites:has ? profile.favorites.filter(x => x !== place.id) : [...profile.favorites,place.id]},has ? 'Lugar removido dos favoritos.' : 'Lugar salvo nos favoritos.')) return
    if (!has) {setBusy(true);try {await log(place,'salvou')} finally {setBusy(false)}}
  }
  async function markVisit(place) {
    if (busy) return
    const has = profile.history.includes(place.id)
    await savePersonal({...profile,history:has ? profile.history.filter(x => x !== place.id) : [...profile.history,place.id]},has ? 'Visita removida do seu roteiro.' : 'Visita registrada no seu roteiro.')
  }
  async function rate(place,n) {
    if (busy || !await savePersonal({...profile,ratings:{...profile.ratings,[place.id]:n}},'Avaliação pessoal salva.')) return
    setBusy(true);try {await log(place,'avaliou',n)} finally {setBusy(false)}
  }
  function open(place) {setSelected(place)}
  async function saveProfile(e) {
    e.preventDefault();setBusy(true);setSyncError('')
    try {
      if (!userId) throw Error('Entre novamente para atualizar suas preferências.')
      const data = await updatePreferences(userId,draft.preferences,draft.location.trim())
      const next = {...usuario,preferencias:data.usuario.preferencias,contextoAtual:data.usuario.contextoAtual}
      try {localStorage.setItem('borai_usuario',JSON.stringify(next))} catch { /* O banco é a fonte das preferências. */ }
      setProfile(p => ({...p,preferences:next.preferencias,location:next.contextoAtual.localizacao}))
      onUsuarioChange(next);setMessage('Preferências salvas no seu cadastro.')
    } catch(e) {setSyncError(e.message || 'Não foi possível salvar as preferências.')} finally {setBusy(false)}
  }
  async function retry() {
    setRetrying(true);setRetryError('')
    try {const data = await homeRequest('/places');setOverride(data.estabelecimentos || [])}
    catch {setRetryError('Não foi possível carregar os lugares da API. O catálogo inicial continua disponível.')}
    finally {setRetrying(false)}
  }
  function resetFilters() {setQuery('');setCategory('Todos');setArea('Todas')}
  function card(place) {
    const saved = profile.favorites.includes(place.id)
    return <article className={'place-card tone-' + place.icon} key={place.id}><div className="card-top"><PlacePhoto key={place.photo?.url || place.id} place={place}/><button className={'heart ' + (saved?'saved':'')} aria-label={(saved?'Remover ':'Salvar ') + place.name + (saved?' dos favoritos':' nos favoritos')} aria-pressed={saved} disabled={busy} onClick={() => favorite(place)}><Icon name="heart" fill={saved?'currentColor':'none'}/></button></div><div className="card-body"><span className="eyebrow">{place.category}</span><h3>{place.name}</h3><p>{place.tag}</p>{view === 'recommendations' && <div className="bh-recommendation"><p><strong>Por que indicamos:</strong> {place.recommendationReason}</p><div className="bh-decisions"><button disabled={busy || recommendationLoading} className="primary" onClick={() => decide(place,'aprovou')}>Tenho interesse</button><button disabled={busy || recommendationLoading} className="secondary" onClick={() => decide(place,'rejeitou')}>Não quero</button></div></div>}<button className="detail" onClick={() => open(place)}>Conhecer lugar <span aria-hidden="true">→</span></button></div></article>
  }
  return <div className="borai-inside">
    {message && <div className="bh-toast" role="status"><Icon name="check"/>{message}</div>}
    {!personalReady && <div className="bh-toast" role="status">Carregando seus favoritos e foto… <button onClick={() => setPersonalRetry(n=>n+1)}>Tentar novamente</button></div>}
    <div className="app-shell"><aside className="side"><button className="brand" onClick={() => navigate('explore')} aria-label="Boraí início"><img src={logo} alt="Boraí"/></button><div className="city"><Icon name="pin" size={16}/> Manaus, Amazonas</div><nav aria-label="Menu principal">{views.map(([id,label,icon]) => <button key={id} className={view===id?'active':''} aria-current={view===id?'page':undefined} onClick={() => navigate(id)}><Icon name={icon}/>{label}{id==='favorites' && profile.favorites.length > 0 && <small>{profile.favorites.length}</small>}</button>)}</nav><div className="side-note"><span>FEITO PARA DESCOBRIR</span><p>Seu jeito de curtir,<br/>onde você estiver.</p><div className="brand-panel"><Icon name="tree" size={60}/><Icon name="waves" size={55}/></div></div><button className="account" onClick={() => navigate('profile')}>{avatar()}<span>{usuario.nome || 'Minha conta'}<small>Seu espaço de descobertas</small></span></button><button className="bh-signout" onClick={async () => {try {await logoutAccount();onSair()} catch(e) {setSyncError(e.message)}}}><Icon name="logout" size={18}/> Sair da conta</button></aside>
    <main><header className="topbar"><span>Descubra. Escolha. Boraí.</span><button className="location" onClick={() => navigate('profile')}><Icon name="pin" size={16}/>{profile.location}</button></header>
    {syncError && <div className="notice error" role="alert"><p>{syncError}</p><button onClick={() => setSyncError('')} aria-label="Fechar aviso"><Icon name="close" size={16}/></button></div>}
    {catalogError && <div className="notice error" role="alert"><p>{catalogError} O catálogo inicial do site continua disponível.</p><button disabled={retrying} onClick={retry}>Tentar novamente</button></div>}
    {view==='audit' ? <AuditHistory userId={userId}/> : view==='profile' ? <section className="profile-page"><span className="eyebrow">DO SEU JEITO</span><h1>Seu perfil, suas descobertas.</h1><p className="intro">Conte o que você gosta. O Boraí organiza sugestões a partir dos seus interesses.</p><div className="bh-photo-settings">{avatar('large')}<div><h2>Sua foto de perfil</h2><p>Escolha uma foto para deixar o Boraí com a sua cara.</p><label className="primary bh-upload">{busy?'Preparando…':'Escolher foto'}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={chooseAvatar}/></label>{profile.avatar && <button className="bh-remove-photo" disabled={busy} onClick={() => savePersonal({...profile,avatar:''},'Foto removida.')}>Remover foto</button>}<p className="helper">Sua foto fica salva na sua conta e aparece quando você entra em outro dispositivo.</p></div></div><form className="profile-form" onSubmit={saveProfile}><div className="form-title"><Icon name="user"/><h2>Meu cadastro</h2></div><label>Nome do cadastro<input value={usuario.nome || ''} readOnly/></label><label>E-mail da conta<input value={usuario.email || ''} readOnly/></label><label>Sua cidade<input required maxLength={100} value={draft.location} onChange={e => setDraft({...draft,location:e.target.value})}/></label><p className="helper">O catálogo contempla Manaus. A cidade do perfil não representa uma medição de distância.</p><fieldset><legend>O que você gosta de fazer?</legend><div className="preferences">{categories.map(c => <label key={c}><input type="checkbox" checked={preferenceLabels(draft.preferences).includes(c)} onChange={e => {const labels = preferenceLabels(draft.preferences); const next = e.target.checked ? [...labels,c] : labels.filter(x => x!==c);setDraft({...draft,preferences:[...new Set(next.map(preferenceValue))]})}}/>{c}</label>)}</div></fieldset><button className="primary" disabled={busy}>{busy?'Salvando…':'Salvar minhas preferências'}</button></form>
    <section className="history"><h2>Lugares que você já visitou</h2>{profile.history.length ? places.filter(p => profile.history.includes(p.id)).map(p => <button key={p.id} onClick={() => open(p)}><Icon name="check" size={17}/>{p.name}</button>) : <p>Marque um lugar como visitado na página de detalhes.</p>}</section><div className="privacy"><h2>Seu espaço de descobertas</h2><p>Preferências, cidade, foto, favoritos, visitas e avaliações pessoais ficam salvos na sua conta. As avaliações não geram uma nota pública.</p><button onClick={async () => {try {await logoutAccount();onSair()} catch(e) {setSyncError(e.message)}}}><Icon name="logout" size={16}/> Sair da conta</button><button onClick={() => setConfirmReset(true)}>Limpar favoritos, visitas e avaliações</button></div></section> : <>
    {view==='explore' ? <section className="hero"><div className="hero-content"><span className="eyebrow">VIVA MANAUS</span><h1>O próximo rolê<br/>tem a sua cara.</h1><p>Entre a cidade e a floresta, encontre um lugar para chamar de seu próximo destino.</p><div className="hero-badge"><Icon name="pin" size={17}/> Comece por Manaus</div></div><div className="hero-photo"><img src={river} alt="Imagem ilustrativa de um pôr do sol amazônico sobre o rio"/><span>Paisagem ilustrativa</span></div></section> : <section className="view-heading"><span className="eyebrow">{view==='favorites'?'SEU PRÓXIMO ROTEIRO':'DESCOBERTAS COM A SUA CARA'}</span><h1>{view==='favorites'?'Vale guardar. Vale viver.':'Escolhidos para você.'}</h1><p>{view==='favorites'?'Todos os lugares que você quer conhecer, reunidos aqui.':personalized?'Seu perfil e suas escolhas anteriores orientam estas indicações.':'Comece pelas opções disponíveis e conte quais combinam com você.'}</p>{view==='recommendations' && !personalized && <button className="primary" onClick={() => navigate('profile')}>Escolher meus interesses</button>}</section>}
    {view === 'recommendations' && <section className="notice bh-context" aria-live="polite"><div><strong>Indicações baseadas no seu cadastro</strong><p>{memoryCount} interações recuperadas do histórico. Suas escolhas são registradas no banco e usadas na próxima consulta.</p><p>{learningSamples > 0 ? 'Suas escolhas ajustam o modelo de afinidade. Ele ajuda a ordenar as próximas sugestões.' : 'Comece escolhendo os lugares que combinam com você. Suas respostas ajudam a personalizar as próximas indicações.'}</p></div><button className="secondary" disabled={busy || recommendationLoading} onClick={() => setRevision(r => r + 1)}>Atualizar indicações</button></section>}
    {view === 'recommendations' && recommendationError && <div className="notice error" role="alert"><p>{recommendationError}</p><button onClick={() => setRevision(r => r + 1)}>Tentar novamente</button></div>}
    <section className="discovery"><div className="section-title"><div><span className="eyebrow">{view==='explore'?'SAIA DO MESMO ROTEIRO':'CONTINUE DESCOBRINDO'}</span><h2>{view==='favorites'?'Meus favoritos':view==='recommendations'?'Sugestões para o seu próximo passeio':'Onde vamos hoje?'}</h2></div><span>{filtered.length} {filtered.length===1?'lugar':'lugares'}</span></div><div className="search-row"><label className="search"><Icon name="search" size={20}/><input aria-label="Buscar lugares" placeholder="Busque um lugar, uma região ou uma experiência" value={query} onChange={e => setQuery(e.target.value)}/></label><label className="region-control"><Icon name="pin" size={18}/><span>Região<select aria-label="Filtrar por região" value={area} onChange={e => setArea(e.target.value)}><option value="Todas">Todas</option>{areas.map(a => <option key={a}>{a}</option>)}</select></span></label></div><div className="chips" aria-label="Categorias">{['Todos',...categories].map(c => <button key={c} aria-pressed={category===c} className={category===c?'selected':''} onClick={() => setCategory(c)}>{c}</button>)}</div>{(loading || (view === 'recommendations' && recommendationLoading)) && <p className="helper" role="status">Buscando opções no seu banco…</p>}{filtered.length ? <div className="cards">{filtered.map(card)}</div> : (view === 'recommendations' && (recommendationLoading || recommendationError)) ? null : <div className="empty"><Icon name={view==='favorites'?'heart':'compass'} size={38}/><h3>{view==='favorites'?'Ainda não há favoritos aqui.':'Nenhum lugar encontrado.'}</h3><p>{view==='favorites'?'Toque no coração de um lugar para começar seu roteiro.':view==='recommendations'?'Não há indicações para estes filtros. Lugares rejeitados continuam disponíveis em Explorar.':'Experimente outra busca ou categoria.'}</p><button className="primary" onClick={() => {resetFilters();if (view==='favorites') navigate('explore')}}>{view==='favorites'?'Explorar lugares':'Limpar filtros'}</button></div>}<div className="notice"><Icon name="bookmark" size={20}/><p><strong>Planeje antes de sair.</strong> Consulte os canais oficiais para horários, ingressos, programação e condições de visita.</p></div></section></>}
    <footer><button className="footer-logo" onClick={() => navigate('explore')}>boraí</button><p>Seu jeito de curtir, onde você estiver.</p><a href={source} target="_blank" rel="noreferrer">Referências do catálogo: Turismo de Manaus</a></footer></main></div>
    {selected && <Modal titleId="bh-place-title" onClose={() => setSelected(null)}><span className="eyebrow">{selected.category} · {selected.area}</span><h2 id="bh-place-title">{selected.name}</h2><PlacePhoto key={selected.photo?.url || selected.id} place={selected} detail/>{selected.photo?.author && <p className="bh-photo-credit">Foto: {selected.photo.author}{selected.photo.page && <> · <a href={selected.photo.page} target="_blank" rel="noreferrer">Fonte</a></>}{selected.photo.license && <> · <a href={selected.photo.license} target="_blank" rel="noreferrer">{selected.photo.label}</a> · Recorte de exibição</>}</p>}<p className="bh-description">{selected.description}</p>{selected.address && <p className="helper">{selected.address}</p>}<div className="notice">Consulte horários, valores e regras nos canais oficiais antes da visita.</div><a className="primary" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(selected.name + ' Manaus')} target="_blank" rel="noreferrer"><Icon name="pin" size={18}/> Ver no mapa</a>{selected.official && <a className="official" href={selected.official} target="_blank" rel="noreferrer">Consultar referência oficial</a>}{selected.coords && Number.isFinite(selected.coords.latitude) && Number.isFinite(selected.coords.longitude) && <MapaBorai estabelecimentos={[{_id:selected.id,nome:selected.name,categoria:selected.apiCategory,bairro:selected.area,localizacao:selected.coords}]}/>}<button className="secondary" disabled={busy} onClick={() => favorite(selected)}><Icon name="heart" size={18}/>{profile.favorites.includes(selected.id)?'Remover dos favoritos':'Salvar nos favoritos'}</button><button className="secondary" disabled={busy} onClick={() => markVisit(selected)}><Icon name="check" size={18}/>{profile.history.includes(selected.id)?'Visitado · desfazer':'Já visitei este lugar'}</button><div className="rating"><h3>Sua avaliação pessoal</h3><div>{[1,2,3,4,5].map(n => <button key={n} disabled={busy} aria-label={'Avaliar com ' + n + ' estrelas'} aria-pressed={profile.ratings[selected.id]===n} onClick={() => rate(selected,n)}><Icon name="star" fill={(profile.ratings[selected.id] || 0)>=n?'#edaa36':'none'}/></button>)}</div><p>Esta avaliação pessoal fica salva na sua conta.</p></div></Modal>}
    {confirmReset && <Modal titleId="bh-reset-title" onClose={() => setConfirmReset(false)}><h2 id="bh-reset-title">Limpar favoritos, visitas e avaliações da conta?</h2><p>Isso remove seus favoritos, visitas e avaliações pessoais em todos os dispositivos. Sua foto, cadastro, preferências e histórico de decisões permanecem.</p><button className="secondary" onClick={() => setConfirmReset(false)}>Cancelar</button><button className="primary" disabled={busy} onClick={async () => {if (await savePersonal({...profile,favorites:[],history:[],ratings:{}},'Favoritos, visitas e avaliações removidos da conta.')) setConfirmReset(false)}}>Limpar registros</button></Modal>}
  </div>
}
