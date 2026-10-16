import { useState } from 'react'

const planos = [
  { nome: 'Teste grátis por 30 dias', preco: '0', texto: 'Conheça os recursos para apresentar seu estabelecimento.', gratuito: true },
  { nome: 'Essencial', preco: '49', texto: 'Perfil, fotos e informações do estabelecimento.' },
  { nome: 'Conexão', preco: '99', texto: 'Recursos do Essencial e visualização de indicadores.' },
  { nome: 'Presença', preco: '149', texto: 'Recursos do Conexão e organização de conteúdo.' },
]

export default function EscolhaPlano({ planoAtual, onComplete, onBack }) {
  const [selecionado, setSelecionado] = useState(planoAtual)
  const [pagamento, setPagamento] = useState(false)
  const plano = planos.find(item => item.nome === selecionado) || planos[0]

  if (pagamento) {
    return <div className="be-payment">
      <span className="be-eyebrow">CONFIRMAÇÃO DO PLANO</span>
      <h2>Confirmar pagamento</h2>
      <dl className="be-payment-summary">
        <div><dt>Plano escolhido</dt><dd>{plano.nome}</dd></div>
        <div><dt>Valor mensal</dt><dd>R$ {plano.preco},00/mês</dd></div>
      </dl>
      <small className="be-subtle">Simulação acadêmica — nenhuma cobrança será realizada</small>
      <div className="be-actions">
        <button type="button" onClick={() => setPagamento(false)}>← Voltar aos planos</button>
        <button type="button" className="be-primary" onClick={() => onComplete(plano.nome)}>Confirmar pagamento</button>
      </div>
    </div>
  }

  return <>
    <p>Escolha o plano para seu negócio.</p>
    <div className="be-plans">{planos.map(item => <button
      type="button"
      className={plano.nome === item.nome ? 'be-selected' : ''}
      aria-pressed={plano.nome === item.nome}
      key={item.nome}
      onClick={() => setSelecionado(item.nome)}
    >
      <span>{item.nome}</span>
      <strong>R$ {item.preco}<small>{item.gratuito ? ' / 30 dias' : '/mês'}</small></strong>
      <p>{item.texto}</p>
      <b>{plano.nome === item.nome ? '✓ Selecionado' : 'Selecionar plano'}</b>
    </button>)}</div>
    <small className="be-subtle">Preços como proposta ilustrativa. Nenhum plano garante quantidade ou posição nas recomendações.</small>
    <div className="be-actions">
      {onBack && <button type="button" onClick={onBack}>← Voltar</button>}
      <button type="button" className="be-primary" onClick={() => plano.gratuito ? onComplete(plano.nome) : setPagamento(true)}>
        {plano.gratuito ? 'Iniciar teste grátis' : 'Continuar →'}
      </button>
    </div>
  </>
}
