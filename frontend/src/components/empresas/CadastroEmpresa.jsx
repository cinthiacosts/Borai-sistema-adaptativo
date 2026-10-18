import { useEffect, useRef, useState } from 'react'
import { DadosEmpresa, Caracteristicas, FotosEmpresa } from './EmpresasDemo'
import EscolhaPlano from './EscolhaPlano'
import { planos } from './planosEmpresa'

const etapas = ['Dados básicos', 'Características', 'Fotos', 'Plano', 'Resumo']

export default function CadastroEmpresa(props) {
  const [etapa, setEtapa] = useState(0)
  const [erro, setErro] = useState('')
  const titulo = useRef(null)
  const plano = planos.find(item => item.nome === props.planoSelecionado) || planos[0]
  useEffect(() => { titulo.current?.focus() }, [etapa])

  function irPara(proxima) { setErro(''); setEtapa(proxima) }
  function continuar(event) {
    event?.preventDefault()
    const { nome, categoria, bairro, contato, descricao, prioridade } = props.empresa
    if (etapa === 0) {
      if (!nome.trim() || !categoria || !bairro.trim() || !contato.trim() || !descricao.trim()) {
        setErro('Preencha nome, categoria, bairro, contato e descrição.'); return
      }
      const contatoValido = contato.includes('@')
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato.trim())
        : /^\+?[\d\s().-]+$/.test(contato.trim()) && contato.replace(/\D/g, '').length >= 8 && contato.replace(/\D/g, '').length <= 15
      if (!contatoValido) { setErro('Informe um e-mail válido ou um telefone com DDD.'); return }
    }
    if (etapa === 1 && !prioridade) { setErro('Selecione a prioridade do negócio.'); return }
    irPara(etapa + 1)
  }

  function navegacao() {
    return <div className="be-actions"><button type="button" onClick={() => etapa ? irPara(etapa - 1) : props.onBack()}>← Voltar</button><button className="be-primary" type="submit">Continuar →</button></div>
  }

  return <main className="be-container be-registration">
    <span className="be-eyebrow">CRIAR PERFIL DA EMPRESA</span><h1>Vamos conhecer seu negócio?</h1>
    <p>Preencha o perfil para usar nesta sessão, sem login empresarial ou publicação no catálogo.</p>
    <ol className="be-steps">{etapas.map((item, i) => <li key={item} aria-current={i === etapa ? 'step' : undefined}><span>{i + 1}</span>{item}</li>)}</ol>
    <section className="be-card">
      <h2 ref={titulo} tabIndex={-1}>{etapas[etapa]}</h2>
      {etapa < 3 && <form onSubmit={continuar} noValidate>
        {etapa === 0 && <DadosEmpresa {...props} />}
        {etapa === 1 && <Caracteristicas {...props} />}
        {etapa === 2 && <><p>As fotos são opcionais. Você pode adicioná-las agora ou pelo painel.</p><FotosEmpresa {...props} /></>}
        {erro && <p role="alert">{erro}</p>}{navegacao()}
      </form>}
      {etapa === 3 && <EscolhaPlano cadastro planoSelecionado={props.planoSelecionado} onSelecionarPlano={props.onSelecionarPlano} onComplete={nome => { props.onSelecionarPlano(nome); irPara(4) }} onBack={() => irPara(2)} />}
      {etapa === 4 && <div className="be-profile-review">
        <p>Confira os dados antes de abrir seu painel.</p>
        <dl className="be-profile-summary">
          {[['Nome do estabelecimento', props.empresa.nome], ['Categoria', props.empresa.categoria], ['Bairro', props.empresa.bairro], ['Contato', props.empresa.contato], ['Descrição', props.empresa.descricao], ['Características', props.empresa.caracteristicas.join(', ') || 'Nenhuma característica selecionada'], ['Prioridade do negócio', props.empresa.prioridade], ['Plano escolhido', plano.nome], ['Valor proposto', 'R$ ' + plano.preco + (plano.gratuito ? ' por 90 dias' : ',00/mês')]].map(([rotulo, valor]) => <div key={rotulo}><dt>{rotulo}</dt><dd>{valor}</dd></div>)}
        </dl>
        <div className="be-review-photo">{props.fotos[0] ? <><img src={props.fotos[0].url} alt={'Capa de ' + props.empresa.nome} /><p>{props.fotos.length} {props.fotos.length === 1 ? 'foto selecionada' : 'fotos selecionadas'} · capa do perfil</p></> : <p>Sem fotos por enquanto. Você poderá adicioná-las no painel.</p>}</div>
        <div className="be-actions"><button type="button" onClick={() => irPara(0)}>Editar dados</button><button type="button" onClick={() => irPara(1)}>Editar características</button><button type="button" onClick={() => irPara(2)}>Editar fotos</button></div>
        <p className="be-note">Simulação — nenhuma cobrança</p><p className="be-subtle">Perfil disponível apenas nesta sessão. Sem dados bancários, cobrança automática ou publicação no catálogo.</p>
        <div className="be-actions"><button type="button" onClick={() => irPara(3)}>← Voltar aos planos</button><button type="button" className="be-primary" onClick={() => props.onComplete(plano.nome)}>Confirmar perfil</button></div>
      </div>}
    </section>
  </main>
}
