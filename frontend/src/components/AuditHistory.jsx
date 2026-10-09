import {useEffect,useState} from 'react'
import {homeRequest} from '../services/homeApi'
import '../styles/AuditHistory.css'
const labels={recomendacoes_geradas:'Sugestões preparadas',aprovou:'Tenho interesse',rejeitou:'Não quero'}
export default function AuditHistory({userId}) {
  const [rows,setRows]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[revision,setRevision]=useState(0)
  useEffect(()=>{
    let cancelled=false;setLoading(true);setError('');setRows([])
    homeRequest('/audit?usuarioId='+encodeURIComponent(userId)).then(data=>{if(!cancelled)setRows(data.auditorias || [])})
      .catch(e=>{if(!cancelled)setError(e.message)})
      .finally(()=>{if(!cancelled)setLoading(false)})
    return ()=>{cancelled=true}
  },[userId,revision])
  function explanation(r) {
    const data=r.dados || {}
    return <>{data.semSnapshot ? <p>Escolha registrada antes desta atualização. A justificativa original não foi armazenada.</p> : <>
      {data.motivo && <p><strong>Motivo da indicação:</strong> {data.motivo}</p>}
      {data.contexto && <p><strong>Contexto:</strong> {data.contexto.localizacao || 'Não informado'} · {data.contexto.categoria || 'Todas as categorias'}</p>}
      {data.ia && <p>Modelo: {data.ia.modelo} · {data.ia.amostras} lugares usados como exemplos de suas escolhas.</p>}
      {data.recomendacaoId && <p className="audit-reference">Referência da indicação: {data.recomendacaoId}</p>}
      {data.recomendacoes && <><p>Histórico usado: {data.memoriaUtilizada} interações. Modelo: {data.modelo}.</p><ol>{data.recomendacoes.map((p,i)=><li key={p.id || i}><strong>{p.nome}</strong><p>{p.motivo}</p>{p.ia && <small>{p.ia.amostras} exemplos · afinidade estimada {p.ia.indiceAfinidade.toFixed(3)}</small>}</li>)}</ol></>}
    </>}</>
  }
  return <section className="profile-page bh-audit"><span className="eyebrow">SUAS ESCOLHAS</span><h1>Seu histórico de descobertas.</h1><p className="intro">Veja as sugestões que recebeu e as decisões que tomou. Mostramos até os 100 registros mais recentes.</p><button className="primary" disabled={loading} onClick={()=>setRevision(x=>x+1)}>Atualizar histórico</button>
    {loading && <p role="status">Carregando seu histórico…</p>}{error && <p className="notice error" role="alert">{error}</p>}
    {!loading && !error && !rows.length && <p>Ainda não há registros. Abra Para você e escolha uma indicação.</p>}
    <div className="bh-audit-list">{rows.map(r=><article key={r._id}><div><span className="eyebrow">{labels[r.acao] || 'Registro do sistema'}</span><time dateTime={r.createdAt}>{new Date(r.createdAt).toLocaleString('pt-BR')}</time></div><h2>{r.entidade==='decisao' ? r.dados?.nome || r.descricao : r.descricao}</h2><details><summary>Ver detalhes do registro</summary>{explanation(r)}</details></article>)}</div>
  </section>
}
