import { useState } from 'react'
import { DadosEmpresa, Caracteristicas, FotosEmpresa } from './EmpresasDemo'
import EscolhaPlano from './EscolhaPlano'
const menus = ['Visão geral', 'Estabelecimento', 'Fotos', 'Indicadores', 'Plano']
function Indicadores() {
  return <><span className="be-badge">Dados ilustrativos</span><p>Últimos 30 dias</p><div className="be-metrics">{[['Visualizações do perfil', '1.248'], ['Interações com o perfil', '186'], ['Cliques em como chegar', '42']].map(([nome, valor]) => <div className="be-card" key={nome}><span>{nome}</span><strong>{valor}</strong></div>)}</div><div className="be-card"><h3>Visualizações por semana</h3><div className="be-bars" role="img" aria-label="Dados ilustrativos: semana 1, 210; semana 2, 340; semana 3, 280; semana 4, 418 visualizações">{[210, 340, 280, 418].map((valor, i) => <div key={i}><span>{valor}</span><div style={{ height: valor / 3 }} /><small>Semana {i + 1}</small></div>)}</div></div></>
}
export default function PainelEmpresa(props) {
  const [aba, setAba] = useState('Visão geral')
  return <div className="be-dashboard"><aside className="be-sidebar"><span className="be-eyebrow">SEU ESPAÇO NO BORAÍ</span><h2>{props.empresa.nome || 'Seu estabelecimento'}</h2><p>{props.empresa.categoria} · {props.empresa.bairro}</p><nav aria-label="Painel empresarial">{menus.map(item => <button key={item} aria-current={aba === item ? 'page' : undefined} onClick={() => setAba(item)}>{item}<span aria-hidden="true">→</span></button>)}</nav><div className="be-note"><strong>Plano {props.empresa.plano}</strong></div></aside><main className="be-workspace"><span className="be-eyebrow">PAINEL EMPRESARIAL</span><h1>{aba === 'Visão geral' ? 'Boas-vindas ao seu espaço.' : aba}</h1>
    {aba === 'Visão geral' && <><p>Acompanhe seu perfil e explore as possibilidades para seu negócio.</p><div className="be-welcome"><div><span className="be-badge">{props.empresa.plano}</span><h2>{props.empresa.nome || 'Seu estabelecimento'}</h2><p>{props.empresa.descricao}</p><button onClick={() => setAba('Estabelecimento')}>Editar estabelecimento →</button></div>{props.fotos[0] && <img src={props.fotos[0].url} alt={props.fotos[0].nome} />}</div><h2>Um olhar sobre seu perfil</h2><Indicadores /><div className="be-actions"><button onClick={() => setAba('Fotos')}>Organizar fotos</button><button onClick={() => setAba('Plano')}>Explorar planos</button></div></>}
    {aba === 'Estabelecimento' && <section className="be-card"><p>As edições aparecem imediatamente nesta sessão.</p><DadosEmpresa {...props} /><Caracteristicas {...props} /></section>}
    {aba === 'Fotos' && <section className="be-card"><FotosEmpresa {...props} /></section>}
    {aba === 'Indicadores' && <Indicadores />}
    {aba === 'Plano' && <section className="be-card"><h2>Plano {props.empresa.plano}</h2><EscolhaPlano planoAtual={props.empresa.plano} onComplete={props.onPlanoConfirmado} /></section>}
  </main></div>
}
