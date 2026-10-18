import { useState } from 'react'
const acoes = ['Preparar uma divulgação', 'Entender meus resultados', 'Planejar para dias de chuva']
export default function AssistenteEmpresa({ empresa }) {
  const [acao, setAcao] = useState(acoes[0])
  const [detalhe, setDetalhe] = useState('')
  const [texto, setTexto] = useState('')
  const [aviso, setAviso] = useState('')
  function gerar(e) {
    e.preventDefault(); setAviso('')
    const contexto = `${empresa.nome}, ${empresa.categoria} em ${empresa.bairro}. Prioridade: ${empresa.prioridade}.`
    const modelos = [
      `${contexto} Conheça nosso espaço: ${empresa.descricao} ${empresa.caracteristicas.join(', ')}. Sugestão de divulgação: ${detalhe}. Entre em contato para consultar detalhes e disponibilidade.`,
      `${contexto} Neste exemplo de 30 dias, o perfil teve 1.248 visualizações, 64 favoritos, 80 cliques no contato e 42 no mapa. Cliques não representam clientes ou vendas. Para ${detalhe}, experimente uma mensagem clara e compare os mesmos indicadores no próximo período. Não há dados reais conectados.`,
      `${contexto} Planejamento hipotético para chuva: ${['Cafeteria', 'Restaurante', 'Bar'].includes(empresa.categoria) ? 'considere encomendas e retirada combinada, conforme a capacidade do negócio' : 'considere atendimento agendado e opções de reagendamento'}. Para ${detalhe}, prepare uma mensagem sobre disponibilidade e canais de contato; confirme alterações diretamente com o público. Não há previsão meteorológica nesta demonstração nem avaliação das condições de deslocamento.`
    ]; setTexto(modelos[acoes.indexOf(acao)])
  }
  async function copiar() { try { await navigator.clipboard.writeText(texto); setAviso('Texto copiado.') } catch { setAviso('Não foi possível copiar. Selecione o texto abaixo e use Ctrl+C ou o comando Copiar do dispositivo.') } }
  return <section className="be-card be-assistant">
    <h2>Assistente Boraí</h2><p>Escolha uma ação e prepare o próximo passo do seu negócio.</p>
    <div className="be-assistant-actions" role="group" aria-label="Ações do assistente">{acoes.map((item, index) => <button key={item} aria-pressed={acao === item} onClick={() => { setAcao(item); setTexto(''); setAviso('') }}><span aria-hidden="true">0{index + 1}</span>{item}</button>)}</div>
    <form onSubmit={gerar} className="be-fields be-assistant-form"><label>{acao === acoes[0] ? 'O que deseja divulgar?' : acao === acoes[1] ? 'Qual objetivo deseja avaliar?' : 'Qual atividade precisa de planejamento?'}<input required maxLength={240} value={detalhe} onChange={e => setDetalhe(e.target.value)} placeholder="Descreva em poucas palavras" /></label><button className="be-primary" type="submit">Preparar texto</button></form>
    {texto && <div className="be-response"><div className="be-response-heading"><span className="be-badge">Exemplo ilustrativo</span><small>Edite antes de usar</small></div><div className="be-fields"><label>Texto preparado<textarea aria-label="Exemplo ilustrativo" rows={8} value={texto} onChange={e => setTexto(e.target.value)} /></label></div><button className="be-primary" onClick={copiar}>Copiar texto</button></div>}
    <p className="be-copy-status" role="status">{aviso}</p>
    <details className="be-help"><summary>Como funciona o assistente?</summary><p>As respostas usam modelos preparados e os dados desta sessão. Não há IA conectada, pesquisa em tempo real ou salvamento permanente. O planejamento para chuva não informa previsões nem avalia condições de deslocamento.</p></details>
  </section>
}
