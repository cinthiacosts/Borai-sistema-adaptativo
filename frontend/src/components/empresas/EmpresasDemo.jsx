import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/borai-home-logo.png'
import cafe from '../../assets/borai-manaus-river.png'
import EntradaEmpresa from './EntradaEmpresa'
import CadastroEmpresa from './CadastroEmpresa'
import PainelEmpresa from './PainelEmpresa'
import '../../styles/EmpresasDemo.css'

const initial = { nome: 'Café do Rio', email: 'contato@cafedorio.example', categoria: 'Cafeteria', bairro: 'Centro', descricao: 'Café regional, encontros e sabores da Amazônia em um ambiente acolhedor.', caracteristicas: ['Wi-Fi', 'Climatizado'], plano: 'Teste grátis por 30 dias' }
export default function EmpresasDemo({ onBack }) {
  const [tela, setTela] = useState('entrada')
  const [empresa, setEmpresa] = useState(initial)
  const [fotos, setFotos] = useState([{ id: 'exemplo', url: cafe, nome: 'Paisagem ilustrativa de Manaus' }])
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
  const props = { empresa, setEmpresa, fotos, adicionarFotos, removerFoto, aviso }
  function confirmarPlano(plano) {
    setEmpresa(atual => ({ ...atual, plano }))
    setTela('boas-vindas')
  }
  return <div className="be-demo">
    <header className="be-header"><a href="#" onClick={event => { event.preventDefault(); setTela('entrada') }} aria-label="Boraí Empresas — início"><img src={logo} alt="Boraí" /><strong>Empresas</strong></a><button type="button" onClick={onBack}>← Voltar ao acesso do cliente</button></header>
    {tela === 'entrada' && <EntradaEmpresa onDemo={() => setTela('painel')} onCadastro={() => setTela('cadastro')} />}
    {tela === 'cadastro' && <CadastroEmpresa {...props} onComplete={confirmarPlano} onBack={() => setTela('entrada')} />}
    {tela === 'boas-vindas' && <main className="be-container be-confirmation"><section className="be-card"><span className="be-eyebrow">TUDO PRONTO</span><h1>Bem-vinda ao Boraí Empresas!</h1><p>Seu espaço está pronto para novas conexões.</p><button type="button" className="be-primary" onClick={() => setTela('painel')}>Acessar meu painel</button></section></main>}
    {tela === 'painel' && <PainelEmpresa {...props} onPlanoConfirmado={confirmarPlano} />}
    <footer className="be-footer">Boraí Empresas · Protótipo acadêmico</footer>
  </div>
}

export function DadosEmpresa({ empresa, setEmpresa }) {
  const update = (key, value) => setEmpresa(atual => ({ ...atual, [key]: value }))
  return <div className="be-fields">
    <label>Nome do estabelecimento<input value={empresa.nome} maxLength={100} onChange={e => update('nome', e.target.value)} /></label>
    <label>E-mail<input type="email" value={empresa.email} maxLength={150} onChange={e => update('email', e.target.value)} /></label>
    <label>Categoria<select value={empresa.categoria} onChange={e => update('categoria', e.target.value)}>{['Cafeteria', 'Restaurante', 'Bar', 'Hotel', 'Lazer', 'Eventos'].map(item => <option key={item}>{item}</option>)}</select></label>
    <label>Bairro<input value={empresa.bairro} maxLength={100} onChange={e => update('bairro', e.target.value)} /></label>
    <label className="be-wide">Sobre o estabelecimento<textarea rows={4} value={empresa.descricao} maxLength={600} onChange={e => update('descricao', e.target.value)} /></label>
  </div>
}
export function Caracteristicas({ empresa, setEmpresa }) {
  return <fieldset className="be-features"><legend>O que seu espaço oferece?</legend>{['Wi-Fi', 'Climatizado', 'Acessibilidade', 'Área externa', 'Estacionamento', 'Opções vegetarianas', 'Aceita pets', 'Música ao vivo'].map(item => <label key={item}><input type="checkbox" checked={empresa.caracteristicas.includes(item)} onChange={() => setEmpresa(atual => ({ ...atual, caracteristicas: atual.caracteristicas.includes(item) ? atual.caracteristicas.filter(x => x !== item) : [...atual.caracteristicas, item] }))} />{item}</label>)}</fieldset>
}
export function FotosEmpresa({ fotos, adicionarFotos, removerFoto, aviso }) {
  return <><p>Prévia local, sem upload. JPG, PNG ou WebP de até 5 MB por foto.</p><label className="be-upload">＋ Selecionar fotos<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => { adicionarFotos(e.target.files); e.target.value = '' }} /></label><p role="status">{aviso}</p><div className="be-photos">{fotos.map(foto => <figure key={foto.id}><img src={foto.url} alt={foto.nome} /><figcaption><span>{foto.nome}</span><button type="button" onClick={() => removerFoto(foto.id)} aria-label={`Remover ${foto.nome}`}>Remover</button></figcaption></figure>)}</div>{!fotos.length && <p>Nenhuma foto selecionada.</p>}</>
}
