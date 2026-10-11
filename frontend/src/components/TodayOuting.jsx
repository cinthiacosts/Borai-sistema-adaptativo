import {useEffect, useRef, useState} from 'react'
import {fetchManausWeather, weatherLabel} from '../services/weather'
export default function TodayOuting({onSuggestions}) {
  const [weather,setWeather] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const [revision,setRevision] = useState(0)
  const [open,setOpen] = useState(false)
  const panel = useRef(null)
  useEffect(() => {
    if (!open) return
    const dialog = panel.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    const desktop = window.matchMedia('(min-width:901px)')
    const closeOnDesktop = () => {if (desktop.matches) setOpen(false)}
    desktop.addEventListener('change',closeOnDesktop)
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      desktop.removeEventListener('change',closeOnDesktop)
    }
  },[open])
  function refresh() {setLoading(true);setError('');setWeather(null);setRevision(n=>n+1)}
  useEffect(() => {
    const controller = new AbortController()
    let active = true

    const timeout = setTimeout(() => controller.abort(),10000)
    fetchManausWeather({signal:controller.signal})
      .then(data => {if(active) setWeather(data)})
      .catch(() => {if(active) setError('Clima indisponível agora. Tente novamente.')})
      .finally(() => {clearTimeout(timeout);if(active) setLoading(false)})
    const timer = setInterval(refresh,15*60*1000)
    const visible = () => {if(document.visibilityState === 'visible') refresh()}
    document.addEventListener('visibilitychange',visible)
    return () => {active=false;controller.abort();clearTimeout(timeout);clearInterval(timer);document.removeEventListener('visibilitychange',visible)}
  },[revision])
  function content(titleId) {return <>
    <span className="eyebrow">MANAUS · AMAZONAS</span><h2 id={titleId}>{titleId === 'weather-panel-title' ? 'Clima em Manaus' : 'Rolê de hoje'}</h2>
    <div aria-live="polite" aria-busy={loading}>
      {loading && <p role="status">Consultando o clima…</p>}
      {error && <><p>{error}</p><button className="bh-weather-retry" onClick={refresh}>Tentar novamente</button></>}
      {weather && <><p className="bh-temperature">{Math.round(weather.temperature)} °C</p><p>{weatherLabel(weather.code)}</p><small>Dados de <time dateTime={new Date(weather.time).toISOString()}>{new Date(weather.time).toLocaleString('pt-BR',{timeZone:'America/Manaus',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</time> · hora de Manaus</small></>}
    </div>
    <p className="bh-weather-tip">Explore sugestões do seu perfil. Confira as condições de visita antes de sair.</p>
    {weather && <button className="bh-weather-retry" onClick={refresh} disabled={loading}>Atualizar clima</button>}
    <button className="primary" onClick={() => {setOpen(false);onSuggestions()}}>Ver sugestões <span aria-hidden="true">→</span></button>
    <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Clima: Open-Meteo · CC BY 4.0</a>
    <small>Estimativa meteorológica por modelo.</small>
  </>}
  return <>
    <section className="bh-today bh-weather-desktop" aria-labelledby="today-title">{content('today-title')}</section>
    <div className="bh-weather-dock">
      <button className="bh-weather-trigger" aria-haspopup="dialog" aria-controls="weather-panel" aria-expanded={open} onClick={() => setOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
        Clima
      </button>
    </div>
    <dialog ref={panel} id="weather-panel" className="bh-weather-panel" aria-labelledby="weather-panel-title" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => {if(event.target === panel.current) setOpen(false)}}>
      <div className="bh-weather-panel-content">
        <button className="bh-weather-close" aria-label="Fechar clima" onClick={() => setOpen(false)} autoFocus>×</button>
        <section className="bh-today" aria-labelledby="weather-panel-title">{content('weather-panel-title')}</section>
      </div>
    </dialog>
  </>
}
