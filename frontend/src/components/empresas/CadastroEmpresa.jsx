import { useState } from 'react'
import { DadosEmpresa, Caracteristicas, FotosEmpresa } from './EmpresasDemo'
import EscolhaPlano from './EscolhaPlano'
const etapas = ['Dados básicos', 'Características', 'Fotos', 'Plano']
export default function CadastroEmpresa(props) {
  const [etapa, setEtapa] = useState(0)
  const [erro, setErro] = useState('')
  function continuar() {
    if (etapa === 0 && (!props.empresa.nome.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.empresa.email) || !props.empresa.bairro.trim())) { setErro('Preencha nome, bairro e um e-mail válido.'); return }
    setErro('')
    setEtapa(etapa + 1)
  }
  return <main className="be-container">
    <span className="be-eyebrow">CADASTRAR MINHA EMPRESA</span>
    <h1>Vamos conhecer seu negócio?</h1>
    <ol className="be-steps">{etapas.map((item, i) => <li key={item} aria-current={i === etapa ? 'step' : undefined}><span>{i + 1}</span>{item}</li>)}</ol>
    <section className="be-card">
      <h2>{etapas[etapa]}</h2>
      {etapa === 0 && <DadosEmpresa {...props} />}
      {etapa === 1 && <Caracteristicas {...props} />}
      {etapa === 2 && <FotosEmpresa {...props} />}
      {etapa === 3 && <EscolhaPlano planoAtual={props.empresa.plano} onComplete={props.onComplete} onBack={() => setEtapa(2)} />}
      {erro && <p role="alert">{erro}</p>}
      {etapa < 3 && <div className="be-actions">
        <button onClick={() => { setErro(''); if (etapa) setEtapa(etapa - 1); else props.onBack() }}>← Voltar</button>
        <button className="be-primary" onClick={continuar}>Continuar →</button>
      </div>}
    </section>
  </main>
}
