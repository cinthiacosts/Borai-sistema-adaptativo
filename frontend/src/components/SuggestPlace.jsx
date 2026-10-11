import {useState} from 'react'

export default function SuggestPlace() {
  const [draft,setDraft] = useState({person:'',place:'',address:'',cep:''})
  const [suggestion,setSuggestion] = useState(null)
  const [confirmed,setConfirmed] = useState(false)

  function change(field,value) {
    setDraft(current => ({...current,[field]:value}))
    setSuggestion(null)
    setConfirmed(false)
  }
  function search(event) {
    event.preventDefault()
    const next = Object.fromEntries(Object.entries(draft).map(([key,value]) => [key,value.trim()]))
    if (Object.values(next).some(value => !value)) return
    setSuggestion(next)
    setConfirmed(false)
  }
  const query = suggestion && [suggestion.place,suggestion.address,suggestion.cep,'Manaus'].join(' ')

  return <section className="bh-suggest-page" aria-labelledby="suggest-title">
    <div className="view-heading">
      <span className="eyebrow">MANAUS TEM MAIS ROLÊS</span>
      <h1 id="suggest-title">Sugerir lugar</h1>
      <p>Conhece um lugar que merece estar aqui? Compartilhe sua descoberta com o Boraí.</p>
    </div>
    <div className="bh-suggest-layout">
      <form className="bh-suggest-form" onSubmit={search}>
        <h2>Conte sua descoberta</h2>
        <label htmlFor="suggest-person">Nome da pessoa</label>
        <input id="suggest-person" autoComplete="name" required maxLength={100} value={draft.person} onChange={event => change('person',event.target.value)}/>
        <label htmlFor="suggest-place">Nome do lugar</label>
        <input id="suggest-place" required maxLength={150} value={draft.place} onChange={event => change('place',event.target.value)}/>
        <label htmlFor="suggest-address">Endereço</label>
        <input id="suggest-address" autoComplete="street-address" required maxLength={250} value={draft.address} onChange={event => change('address',event.target.value)}/>
        <label htmlFor="suggest-cep">CEP</label>
        <input id="suggest-cep" autoComplete="postal-code" inputMode="numeric" placeholder="00000-000" required pattern="[0-9]{5}-?[0-9]{3}" maxLength={9} title="Informe 8 números, com ou sem hífen." value={draft.cep} onChange={event => change('cep',event.target.value)}/>
        <button className="primary" type="submit">Pesquisar no mapa</button>
        <p className="helper">Demonstração da Mostra: esta indicação fica apenas nesta tela.</p>
      </form>
      <div className="bh-suggest-preview">
        {suggestion ? <>
          <h2>Confira o lugar no mapa</h2>
          <iframe key={query} title={'Mapa da sugestão: ' + suggestion.place} src={'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&output=embed'} referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
          {!confirmed && <button type="button" className="primary" onClick={() => setConfirmed(true)}>Confirmar sugestão</button>}
          {confirmed && <>
            <p className="bh-suggest-thanks" role="status">Valeu, {suggestion.person}! Você é parceiro Boraí. Sua indicação ajuda o Boraí a descobrir novos rolês por Manaus.</p>
            <article className="bh-suggestion-card" aria-label="Sua sugestão">
              <span className="eyebrow">SUA INDICAÇÃO</span>
              <h3>{suggestion.place}</h3>
              <dl><dt>Endereço</dt><dd>{suggestion.address}</dd><dt>CEP</dt><dd>{suggestion.cep}</dd></dl>
              <p className="bh-suggestion-status">Status: Enviado para análise</p>
              <small>Confirmação demonstrativa da Mostra.</small>
            </article>
          </>}
        </> : <div className="bh-suggest-placeholder"><span aria-hidden="true">⌖</span><h2>Uma descoberta começa com você</h2><p>Preencha os dados ao lado para conferir o endereço no mapa antes de confirmar sua indicação.</p></div>}
      </div>
    </div>
  </section>
}
