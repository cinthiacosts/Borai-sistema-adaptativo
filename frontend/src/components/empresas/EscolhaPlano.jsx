import { useState } from 'react'
import { planos } from './planosEmpresa'
export default function EscolhaPlano({ planoAtual, planoSelecionado, onSelecionarPlano, cadastro = false, onComplete, onBack }) {
  const [selecionado, setSelecionado] = useState(planoSelecionado || planoAtual)
  const [confirmacao, setConfirmacao] = useState(false)
  const [comparar, setComparar] = useState(false)
  const plano = planos.find(item => item.nome === selecionado) || planos[0]
  function cartao(item) {
    const ativo = planoAtual === item.nome
    const escolhido = plano.nome === item.nome
    return <article key={item.nome} className={`be-plan-card ${escolhido ? 'be-selected' : ''}`}>
      <div className="be-plan-heading"><h3>{item.gratuito ? 'Experiência gratuita' : item.nome}</h3><span className={`be-plan-state ${ativo ? 'be-current' : ''}`}>{ativo ? 'Plano atual' : escolhido ? 'Selecionado' : 'Disponível'}</span></div>
      <p className="be-price"><strong>R$ {item.preco}</strong><span>{item.gratuito ? 'por 90 dias' : '/mês'}</span></p>
      <ul>{item.beneficios.slice(0, 3).map(beneficio => <li key={beneficio}>{beneficio}</li>)}</ul>
      <button type="button" aria-label={`${item.nome} — ${escolhido ? 'selecionado' : 'selecionar plano'}`} aria-pressed={escolhido} onClick={() => { setSelecionado(item.nome); onSelecionarPlano?.(item.nome) }}>{escolhido ? '✓ Selecionado' : 'Selecionar plano'}</button>
    </article>
  }
  if (confirmacao) return <section className="be-payment">
    <h2>Confirmar plano</h2>
    <dl className="be-payment-summary"><div><dt>Plano escolhido</dt><dd>{plano.nome}</dd></div><div><dt>Valor proposto</dt><dd>R$ {plano.preco}{plano.gratuito ? ' por 90 dias' : ',00/mês'}</dd></div></dl>
    <p className="be-note">Simulação — nenhuma cobrança</p><p>Sem cartão obrigatório e sem cobrança automática.</p>
    <div className="be-actions"><button onClick={() => setConfirmacao(false)}>← Voltar aos planos</button><button className="be-primary" onClick={() => onComplete(plano.nome)}>Confirmar plano</button></div>
  </section>
  return <div className="be-plan-picker">
    <p>Escolha o próximo passo para a presença do seu negócio.</p>
    <div className="be-trial">{cartao(planos[0])}<p>Sem cartão obrigatório e sem cobrança automática.</p></div>
    <div className="be-plans">{planos.slice(1).map(cartao)}</div>
    <button className="be-compare" aria-expanded={comparar} aria-controls="be-comparison" onClick={() => setComparar(!comparar)}>{comparar ? 'Fechar comparação completa' : 'Abrir comparação completa'}</button>
    {comparar && <section className="be-comparison" id="be-comparison"><h3>Todos os benefícios</h3><p>Abra os planos que deseja comparar.</p>{planos.map(item => <details key={item.nome}><summary>{item.nome}</summary><ul>{item.beneficios.map(b => <li key={b}>{b}</li>)}</ul></details>)}</section>}
    <details className="be-help"><summary>Condições dos planos</summary><p>Benefícios da proposta comercial futura e limites informativos, sem controle real de consumo. Uma unidade por assinatura. Anúncios pagos, frete e produção profissional ficam separados. Nenhum plano compra posição nas recomendações ou garante vendas.</p></details>
    <div className="be-plan-selection"><p><span>Plano selecionado</span><strong>{plano.nome}</strong></p><div className="be-actions">{onBack && <button onClick={onBack}>← Voltar</button>}<button className="be-primary" onClick={() => cadastro ? onComplete(plano.nome) : setConfirmacao(true)}>{cadastro ? 'Revisar perfil' : plano.gratuito ? 'Iniciar experiência gratuita' : 'Continuar →'}</button></div></div>
  </div>
}
