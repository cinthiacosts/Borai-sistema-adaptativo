import { useEffect, useRef, useState } from 'react'
import { DadosEmpresa, Caracteristicas, FotosEmpresa } from './EmpresasDemo'
import EscolhaPlano from './EscolhaPlano'
import AssistenteEmpresa from './AssistenteEmpresa'
const menus = ['Visão geral', 'Estabelecimento', 'Fotos', 'Assistente', 'Indicadores', 'Planejamento sazonal', 'Prévia para o público', 'Plano']
function PlanejamentoSazonal({ onAssistente, compacto = false }) {
  return <section className="be-card be-seasonal"><h2>{compacto ? 'Planejamento sazonal' : 'Prepare seu atendimento'}</h2><p>Organize alternativas para os períodos de chuva.</p><div className={`be-seasonal-grid ${compacto ? 'be-seasonal-compact' : ''}`}>
    {[
      ['Comunique alterações', 'Manter o público informado.', 'Revise disponibilidade e canais de contato.'],
      ['Organize encomendas', 'Adaptar o atendimento à capacidade do negócio.', 'Confira o que pode ser combinado com antecedência.'],
      ['Combine reagendamentos', 'Oferecer alternativas conforme a atividade.', 'Confirme mudanças diretamente com o público.'],
    ].map(([acao, motivo, proximo], index) => <article key={acao}><span className="be-eyebrow">0{index + 1}</span><h3>{acao}</h3><dl><dt>Motivo</dt><dd>{motivo}</dd><dt>Próximo passo</dt><dd>{proximo}</dd></dl></article>)}
  </div><div className="be-actions"><button onClick={onAssistente}>Preparar meu planejamento →</button></div><details className="be-help"><summary>Sobre estas orientações</summary><p>Orientações preparadas, sem previsões ou eventos atuais. Consulte informações oficiais antes de decidir deslocamentos.</p></details></section>
}
function Indicadores() {
  return <><span className="be-badge">Dados ilustrativos</span><p>Últimos 30 dias</p><div className="be-metrics">{[['Visualizações do perfil', '1.248', 'Aberturas do perfil, incluindo repetições.'], ['Favoritos', '64', 'Marcações como favorito.'], ['Cliques no contato', '80', 'Ações no botão de contato.'], ['Cliques no mapa', '42', 'Ações para consultar a localização.']].map(([nome, valor, definicao]) => <div className="be-card" key={nome}><span>{nome}</span><strong>{valor}</strong><small>{definicao}</small></div>)}</div><div className="be-card"><h3>Visualizações por semana</h3><p>Quatro intervalos nos últimos 30 dias: 210 + 340 + 280 + 418 = 1.248. As outras 186 ações não representam clientes, reservas ou vendas.</p><div className="be-bars" role="img" aria-label="Dados ilustrativos: semana 1, 210; semana 2, 340; semana 3, 280; semana 4, 418 visualizações">{[210, 340, 280, 418].map((valor, i) => <div key={i}><span>{valor}</span><div style={{ height: valor / 3 }} /><small>Semana {i + 1}</small></div>)}</div></div></>
}
export default function PainelEmpresa(props) {
  const [aba, setAba] = useState('Visão geral')
  const titulo = useRef(null)
  useEffect(() => { titulo.current?.focus() }, [aba])
  return <div className="be-dashboard"><aside className="be-sidebar"><span className="be-eyebrow">SEU ESPAÇO NO BORAÍ</span><h2>{props.empresa.nome || 'Seu estabelecimento'}</h2><p>{props.empresa.categoria} · {props.empresa.bairro}</p><nav aria-label="Painel empresarial">{menus.map(item => <button key={item} aria-current={aba === item ? 'page' : undefined} onClick={() => setAba(item)}>{item}<span aria-hidden="true">→</span></button>)}</nav><div className="be-note"><strong>Plano {props.empresa.plano}</strong></div></aside><main className="be-workspace"><span className="be-eyebrow">PAINEL EMPRESARIAL</span><h1 ref={titulo} tabIndex={-1}>{aba === 'Visão geral' ? 'Boas-vindas ao seu espaço.' : aba}</h1>
    {aba === 'Visão geral' && <><p>Acompanhe seu perfil e explore as possibilidades para seu negócio.</p><div className="be-welcome"><div><span className="be-badge">{props.empresa.plano}</span><h2>{props.empresa.nome || 'Seu estabelecimento'}</h2><p>{props.empresa.descricao}</p><button onClick={() => setAba('Estabelecimento')}>Editar estabelecimento →</button></div>{props.fotos[0] && <img src={props.fotos[0].url} alt={props.fotos[0].nome} />}</div><h2>Próximas ações</h2><div className="be-actions">{[['Completar perfil', 'Estabelecimento'], ['Preparar divulgação', 'Assistente'], ['Conferir resultados', 'Indicadores'], ['Planejar para chuva', 'Planejamento sazonal'], ['Ver prévia pública', 'Prévia para o público']].map(([titulo, destino]) => <button key={titulo} onClick={() => setAba(destino)}>{titulo} →</button>)}</div><AssistenteEmpresa empresa={props.empresa} /><h2>Um olhar sobre seu perfil</h2><Indicadores /><PlanejamentoSazonal compacto onAssistente={() => setAba('Planejamento sazonal')} /><div className="be-actions"><button onClick={() => setAba('Fotos')}>Organizar fotos</button><button onClick={() => setAba('Plano')}>Explorar planos</button></div></>}
    {aba === 'Assistente' && <AssistenteEmpresa empresa={props.empresa} />}
    {aba === 'Prévia para o público' && <section className="be-card be-public">{props.fotos[0] ? <img src={props.fotos[0].url} alt={props.fotos[0].nome} /> : <p>Sem foto de capa</p>}<h2>{props.empresa.nome}</h2><p>{props.empresa.categoria} · {props.empresa.bairro}</p><p>{props.empresa.descricao}</p><div className="be-tags">{props.empresa.caracteristicas.map(item => <span className="be-badge" key={item}>{item}</span>)}</div><p className="be-subtle">Visível apenas nesta sessão. Não publica no catálogo.</p></section>}
    {aba === 'Planejamento sazonal' && <PlanejamentoSazonal onAssistente={() => setAba('Assistente')} />}
    {aba === 'Estabelecimento' && <section className="be-card"><p>As edições aparecem imediatamente nesta sessão.</p><DadosEmpresa {...props} /><Caracteristicas {...props} /></section>}
    {aba === 'Fotos' && <section className="be-card"><FotosEmpresa {...props} /></section>}
    {aba === 'Indicadores' && <Indicadores />}
    {aba === 'Plano' && <section className="be-card"><p className="be-current-plan"><span>Plano atual</span><strong>{props.empresa.plano}</strong></p><EscolhaPlano planoAtual={props.empresa.plano} onComplete={props.onPlanoConfirmado} /></section>}
  </main></div>
}
