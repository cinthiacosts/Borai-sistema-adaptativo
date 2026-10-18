import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/borai-home-logo.png'
import cafe from '../../assets/empresa-cafe-placeholder.svg'
import EntradaEmpresa from './EntradaEmpresa'
import CadastroEmpresa from './CadastroEmpresa'
import PainelEmpresa from './PainelEmpresa'
import '../../styles/EmpresasDemo.css'

const planoGratuito = 'Experiência — 90 dias gratuitos'
const perfilVazio = { nome: '', contato: '', categoria: '', bairro: '', descricao: '', caracteristicas: [], prioridade: '', plano: '' }
const exemplo = { nome: 'Café do Rio', contato: 'contato@cafedorio.example', categoria: 'Cafeteria', bairro: 'Centro', descricao: 'Café regional, encontros e sabores da Amazônia em um ambiente acolhedor.', caracteristicas: ['Wi-Fi', 'Climatizado'], prioridade: 'Ser mais conhecido', plano: planoGratuito }
export default function EmpresasDemo({ onBack }) {
  const [tela, setTela] = useState('entrada')
  const [usarExemplo, setUsarExemplo] = useState(false)
  const [perfil, setPerfil] = useState(perfilVazio)
  const [fotosPerfil, setFotosPerfil] = useState([])
  const [empresaExemplo, setEmpresaExemplo] = useState(exemplo)
  const [fotosExemplo, setFotosExemplo] = useState([{ id: 'exemplo', url: cafe, nome: 'Placeholder de cafeteria — imagem ilustrativa' }])
  const [planoSelecionado, setPlanoSelecionado] = useState(planoGratuito)
  const empresa = usarExemplo ? empresaExemplo : perfil
  const setEmpresa = usarExemplo ? setEmpresaExemplo : setPerfil
  const fotos = usarExemplo ? fotosExemplo : fotosPerfil
  const setFotos = usarExemplo ? setFotosExemplo : setFotosPerfil
  const urls = useRef(new Set())
  const [aviso, setAviso] = useState('')
  useEffect(() => () => urls.current.forEach(url => URL.revokeObjectURL(url)), [])
  function adicionarFotos(files) {
    const validas = [...files].filter(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) && file.size <= 5 * 1024 * 1024)
    setAviso(validas.length !== files.length ? 'Alguns arquivos foram ignorados. Use JPG, PNG ou WebP de até 5 MB.' : '')
    setFotos(atual => [...atual, ...validas.map(file => {
      const url = URL.createObjectURL(file)
      urls.current.add(url)
      return { id: url, url, nome: file.name }
    })])
  }
  function removerFoto(id) {
    if (urls.current.has(id)) { URL.revokeObjectURL(id); urls.current.delete(id) }
    setFotos(atual => atual.filter(foto => foto.id !== id))
  }
  function definirCapa(id) { setFotos(atual => [...atual.filter(foto => foto.id === id), ...atual.filter(foto => foto.id !== id)]) }
  const props = { empresa, setEmpresa, fotos, adicionarFotos, removerFoto, definirCapa, aviso }
  function confirmarPlano(plano) {
    setEmpresa(atual => ({ ...atual, plano }))
    setTela('boas-vindas')
  }
  return <div className="be-demo">
    <header className="be-header"><a href="#" onClick={event => { event.preventDefault(); setTela('entrada') }} aria-label="Boraí Empresas — início"><img src={logo} alt="Boraí" /><strong>Empresas</strong></a><button type="button" onClick={onBack}>← Voltar ao acesso do cliente</button></header>
    {tela === 'entrada' && <EntradaEmpresa onDemo={() => { setUsarExemplo(true); setAviso(''); setTela('painel') }} onCadastro={() => { setUsarExemplo(false); setAviso(''); setTela('cadastro') }} />}
    {tela === 'cadastro' && <CadastroEmpresa {...props} planoSelecionado={planoSelecionado} onSelecionarPlano={setPlanoSelecionado} onComplete={confirmarPlano} onBack={() => setTela('entrada')} />}
    {tela === 'boas-vindas' && <main className="be-container be-confirmation"><section className="be-card"><span className="be-eyebrow">TUDO PRONTO</span><h1>Bem-vinda ao Boraí Empresas!</h1><p><strong>{empresa.nome}</strong>, seu perfil está pronto nesta sessão.</p><p>Plano selecionado: <strong>{empresa.plano}</strong>.</p>{empresa.plano === planoGratuito && <p>90 dias sem cartão obrigatório e sem cobrança automática.</p>}<button type="button" className="be-primary" onClick={() => setTela('painel')}>Acessar meu painel</button></section></main>}
    {tela === 'painel' && <PainelEmpresa {...props} onPlanoConfirmado={confirmarPlano} />}
    <footer className="be-footer">Boraí Empresas · Ambiente de apresentação</footer>
  </div>
}

export function DadosEmpresa({ empresa, setEmpresa }) {
  const update = (key, value) => setEmpresa(atual => ({ ...atual, [key]: value }))
  return <div className="be-fields">
    <label>Nome do estabelecimento<input value={empresa.nome} maxLength={100} onChange={e => update('nome', e.target.value)} /></label>
    <label>Contato (e-mail ou telefone)<input value={empresa.contato} maxLength={150} onChange={e => update('contato', e.target.value)} /></label>
    <label>Categoria<select aria-label="Categoria" value={empresa.categoria} onChange={e => update('categoria', e.target.value)}><option value="">Selecione a categoria</option>{['Cafeteria', 'Restaurante', 'Bar', 'Hotel', 'Lazer', 'Eventos'].map(item => <option key={item}>{item}</option>)}</select></label>
    <label>Bairro<input value={empresa.bairro} maxLength={100} onChange={e => update('bairro', e.target.value)} /></label>
    <label className="be-wide">Sobre o estabelecimento<textarea rows={3} value={empresa.descricao} maxLength={600} onChange={e => update('descricao', e.target.value)} /></label>
  </div>
}
export function Caracteristicas({ empresa, setEmpresa }) {
  return <><fieldset className="be-features"><legend>O que seu espaço oferece?</legend>{['Wi-Fi', 'Climatizado', 'Acessibilidade', 'Área externa', 'Estacionamento', 'Opções vegetarianas', 'Aceita pets', 'Música ao vivo'].map(item => <label key={item}><input type="checkbox" checked={empresa.caracteristicas.includes(item)} onChange={() => setEmpresa(atual => ({ ...atual, caracteristicas: atual.caracteristicas.includes(item) ? atual.caracteristicas.filter(x => x !== item) : [...atual.caracteristicas, item] }))} />{item}</label>)}</fieldset><div className="be-fields be-priority"><label className="be-wide">Prioridade do negócio<select value={empresa.prioridade} onChange={e => setEmpresa(atual => ({ ...atual, prioridade: e.target.value }))}><option value="">Selecione a prioridade</option>{['Ser mais conhecido', 'Receber mais contatos', 'Divulgar programação', 'Melhorar movimento em determinados horários', 'Preparar-se para períodos de chuva'].map(item => <option key={item}>{item}</option>)}</select></label></div></>
}
export function FotosEmpresa({ fotos, adicionarFotos, removerFoto, definirCapa, aviso }) {
  return <div className="be-gallery"><div className="be-gallery-toolbar"><div><h2>Fotos do estabelecimento</h2><p>JPG, PNG ou WebP · até 5 MB por foto</p></div><label className="be-upload">＋ Selecionar fotos<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => { adicionarFotos(e.target.files); e.target.value = '' }} /></label></div><p className="be-photo-status" role="status">{aviso}</p>{fotos.length ? <div className="be-photos">{fotos.map((foto, index) => <figure key={foto.id}><div className="be-photo-frame"><img src={foto.url} alt={foto.nome} />{index === 0 && <span className="be-badge">Capa</span>}</div><figcaption><span>{foto.nome}{index === 0 ? ' · Capa' : ''}</span><a href={foto.url} target="_blank" rel="noreferrer" aria-label={`Visualizar foto ${foto.nome}`}>Visualizar foto ↗</a><div className="be-photo-actions"><button type="button" disabled={index === 0} onClick={() => definirCapa(foto.id)}>Definir capa</button><button type="button" className="be-remove" onClick={() => removerFoto(foto.id)} aria-label={`Remover ${foto.nome}`}>Remover</button></div></figcaption></figure>)}</div> : <div className="be-empty"><span aria-hidden="true">＋</span><h3>Mostre o que torna seu espaço especial</h3><p>Use “Selecionar fotos” para adicionar imagens. Depois, escolha a capa do perfil.</p></div>}<p className="be-subtle">As fotos ficam disponíveis apenas nesta sessão.</p></div>
}
