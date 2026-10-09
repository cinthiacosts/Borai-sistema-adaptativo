import PasswordRecovery from './components/PasswordRecovery'
import HomeBorai from './components/HomeBorai'
import { useEffect, useState } from 'react'

import './App.css'

import logoBorai from './assets/logo-borai-valida.png'
import logoEntrada from './assets/logo-borai-cadastro.png'
import './styles/AuthBorai.css'

import {
  buscarEstabelecimentos,
  buscarRecomendacoes,
  cadastrarUsuario,
  loginUsuario,
} from './services/api'

import MapaBorai from './components/MapaBorai'

const categorias = [
  { nome: 'Restaurantes', valor: 'restaurante', icone: '🍴' },
  { nome: 'Cafeterias', valor: 'cafeteria', icone: '☕' },
  { nome: 'Bares', valor: 'bar', icone: '🍺' },
  { nome: 'Eventos', valor: 'evento', icone: '🎵' },
  { nome: 'Hotéis', valor: 'hotel', icone: '🧳' },
  { nome: 'Lazer', valor: 'lazer', icone: '🌳' },
]

const preferenciasCadastro = [
  {
    nome: 'Gastronomia',
    valor: 'restaurante',
    icone: '🍴',
  },
  {
    nome: 'Cafeterias',
    valor: 'cafeteria',
    icone: '☕',
  },
  {
    nome: 'Bares',
    valor: 'bar',
    icone: '🍺',
  },
  {
    nome: 'Eventos',
    valor: 'evento',
    icone: '🎵',
  },
  {
    nome: 'Hotéis',
    valor: 'hotel',
    icone: '🧳',
  },
  {
    nome: 'Natureza e lazer',
    valor: 'lazer',
    icone: '🌳',
  },
]

const imagensPorCategoria = {
  restaurante:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',

  cafeteria:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80',

  bar:
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=700&q=80',

  evento:
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80',

  hotel:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',

  lazer:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',
}

function formatarCategoria(categoria) {
  if (!categoria) return 'Lugar'

  return (
    categoria.charAt(0).toUpperCase() +
    categoria.slice(1)
  )
}

function obterIniciais(nome) {
  if (!nome) return 'B'

  const partes = nome
    .trim()
    .split(' ')
    .filter(Boolean)

  if (partes.length === 1) {
    return partes[0]
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    partes[0][0] +
    partes[partes.length - 1][0]
  ).toUpperCase()
}

function App() {
  const [recoveryToken,setRecoveryToken]=useState(() => {
    const token=new URLSearchParams(window.location.hash.slice(1)).get('redefinir-senha')
    return token || null
  })
  function voltarDaRecuperacao() {
    const terminouRedefinicao=Boolean(recoveryToken)
    setRecoveryToken(null);setTelaAuth('login')
    window.history.replaceState(null,'',window.location.pathname+window.location.search)
    if(terminouRedefinicao) window.location.reload()
  }
  const [usuario, setUsuario] = useState(() => {
    try {
      const usuarioSalvo =
        localStorage.getItem('borai_usuario')

      return usuarioSalvo
        ? JSON.parse(usuarioSalvo)
        : null
    } catch {
      return null
    }
  })

  // =========================
  // LOGIN
  // =========================

  const [telaAuth, setTelaAuth] =
    useState('login')

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const [erroLogin, setErroLogin] =
    useState('')

  const [sucessoLogin, setSucessoLogin] =
    useState('')

  const [
    carregandoLogin,
    setCarregandoLogin,
  ] = useState(false)

  // =========================
  // CADASTRO
  // =========================

  const [
    etapaCadastro,
    setEtapaCadastro,
  ] = useState(1)

  const [nomeCadastro, setNomeCadastro] =
    useState('')

  const [emailCadastro, setEmailCadastro] =
    useState('')

  const [senhaCadastro, setSenhaCadastro] =
    useState('')

  const [
    confirmarSenha,
    setConfirmarSenha,
  ] = useState('')

  const [
    preferenciasSelecionadas,
    setPreferenciasSelecionadas,
  ] = useState([])

  const [
    erroCadastro,
    setErroCadastro,
  ] = useState('')

  const [
    carregandoCadastro,
    setCarregandoCadastro,
  ] = useState(false)

  // =========================
  // HOME
  // =========================

  const [
    estabelecimentos,
    setEstabelecimentos,
  ] = useState([])

  const [
    recomendacoesAdaptativas,
    setRecomendacoesAdaptativas,
  ] = useState([])

  const [carregando, setCarregando] =
    useState(false)

  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')

  const [
    categoriaSelecionada,
    setCategoriaSelecionada,
  ] = useState('')

  // =========================
  // CARREGAR ESTABELECIMENTOS
  // =========================

  useEffect(() => {
    if (!usuario) return

    async function carregarEstabelecimentos() {
      try {
        setCarregando(true)
        setErro('')

        const dados =
          await buscarEstabelecimentos({
            categoria: categoriaSelecionada,
            busca,
          })

        setEstabelecimentos(
          dados.estabelecimentos || []
        )
      } catch (error) {
        console.error(
          'Erro ao carregar estabelecimentos:',
          error
        )

        setErro(
          'Não foi possível carregar os lugares agora.'
        )
      } finally {
        setCarregando(false)
      }
    }

    const temporizador = setTimeout(
      carregarEstabelecimentos,
      300
    )

    return () =>
      clearTimeout(temporizador)
  }, [
    busca,
    categoriaSelecionada,
    usuario,
  ])

  // =========================
  // CARREGAR RECOMENDAÇÕES
  // =========================

  useEffect(() => {
    if (!usuario?.id) return

    async function carregarRecomendacoes() {
      try {
        const dados =
          await buscarRecomendacoes({
            userId: usuario.id,

            localizacao:
              usuario.contextoAtual
                ?.localizacao ||
              'Manaus - AM',

            categoria:
              categoriaSelecionada ||
              'lazer',

            preferencias:
              usuario.preferencias || [],
          })

        setRecomendacoesAdaptativas(
          dados.recomendacoes || []
        )
      } catch (error) {
        console.error(
          'Erro ao carregar recomendações:',
          error
        )

        setRecomendacoesAdaptativas([])
      }
    }

    carregarRecomendacoes()
  }, [
    categoriaSelecionada,
    usuario,
  ])

  // =========================
  // FAZER LOGIN
  // =========================

  async function fazerLogin(event) {
    event.preventDefault()

    if (!email.trim() || !senha) {
      setErroLogin(
        'Informe seu e-mail e sua senha.'
      )
      return
    }

    try {
      setCarregandoLogin(true)
      setErroLogin('')
      setSucessoLogin('')

      const dados = await loginUsuario({
        email: email.trim(),
        senha,
      })

      localStorage.setItem(
        'borai_usuario',
        JSON.stringify(dados.usuario)
      )

      setUsuario(dados.usuario)

      setEmail('')
      setSenha('')
    } catch (error) {
      setErroLogin(
        error.message ||
          'Não foi possível entrar.'
      )
    } finally {
      setCarregandoLogin(false)
    }
  }

  // =========================
  // ABRIR CADASTRO
  // =========================

  function abrirCadastro() {
    setTelaAuth('cadastro')
    setEtapaCadastro(1)
    setErroCadastro('')
    setErroLogin('')
    setSucessoLogin('')
  }

  // =========================
  // VOLTAR AO LOGIN
  // =========================

  function voltarLogin() {
    setTelaAuth('login')
    setEtapaCadastro(1)
    setErroCadastro('')
  }

  // =========================
  // CADASTRO - ETAPA 1
  // =========================

  function continuarCadastro(event) {
    event.preventDefault()

    setErroCadastro('')

    if (!nomeCadastro.trim()) {
      setErroCadastro(
        'Informe seu nome.'
      )
      return
    }

    if (!emailCadastro.trim()) {
      setErroCadastro(
        'Informe seu e-mail.'
      )
      return
    }

    if (senhaCadastro.length < 6) {
      setErroCadastro(
        'A senha deve ter pelo menos 6 caracteres.'
      )
      return
    }

    if (
      senhaCadastro !== confirmarSenha
    ) {
      setErroCadastro(
        'As senhas não são iguais.'
      )
      return
    }

    setEtapaCadastro(2)
  }

  // =========================
  // SELECIONAR PREFERÊNCIA
  // =========================

  function alternarPreferencia(valor) {
    setPreferenciasSelecionadas(
      (preferenciasAtuais) => {
        if (
          preferenciasAtuais.includes(valor)
        ) {
          return preferenciasAtuais.filter(
            (preferencia) =>
              preferencia !== valor
          )
        }

        return [
          ...preferenciasAtuais,
          valor,
        ]
      }
    )
  }

  // =========================
  // CRIAR CONTA REAL
  // =========================

  async function criarConta() {
    if (
      preferenciasSelecionadas.length === 0
    ) {
      setErroCadastro(
        'Escolha pelo menos uma preferência.'
      )
      return
    }

    try {
      setCarregandoCadastro(true)
      setErroCadastro('')

      await cadastrarUsuario({
        nome: nomeCadastro.trim(),
        email: emailCadastro
          .trim()
          .toLowerCase(),
        senha: senhaCadastro,

        preferencias:
          preferenciasSelecionadas,

        localizacao: 'Manaus - AM',
      })

      const emailCriado =
        emailCadastro.trim().toLowerCase()

      setEmail(emailCriado)
      setSenha('')

      setNomeCadastro('')
      setEmailCadastro('')
      setSenhaCadastro('')
      setConfirmarSenha('')
      setPreferenciasSelecionadas([])

      setEtapaCadastro(1)
      setTelaAuth('login')

      setSucessoLogin(
        'Conta criada com sucesso! Agora entre com sua senha.'
      )
    } catch (error) {
      setErroCadastro(
        error.message ||
          'Não foi possível criar sua conta.'
      )
    } finally {
      setCarregandoCadastro(false)
    }
  }

  // =========================
  // SAIR
  // =========================

  function sair() {
    localStorage.removeItem(
      'borai_usuario'
    )

    setUsuario(null)

    setRecomendacoesAdaptativas([])
    setEstabelecimentos([])
    setCategoriaSelecionada('')
    setBusca('')

    setTelaAuth('login')
  }

  // =========================
  // CATEGORIAS
  // =========================

  function selecionarCategoria(valor) {
    setCategoriaSelecionada(
      (categoriaAtual) =>
        categoriaAtual === valor
          ? ''
          : valor
    )
  }

  const recomendacoes =
    recomendacoesAdaptativas.length > 0
      ? recomendacoesAdaptativas.slice(
          0,
          6
        )
      : estabelecimentos.slice(0, 6)

  // =========================
  // CADASTRO
  // =========================

  if (recoveryToken || (!usuario && telaAuth === 'recuperar')) return <PasswordRecovery token={recoveryToken} onBack={voltarDaRecuperacao}/>

  if (
    !usuario &&
    telaAuth === 'cadastro'
  ) {
    return (
      <div className="login-page">
        <div className="login-brand-area">
          <img
            src={logoEntrada}
            alt="Boraí"
            className="login-brand-image"
          />
          <div className="auth-brand-copy">
            <span className="auth-kicker">DESCUBRA MANAUS</span>
            <h2>Seu jeito de curtir,<br />onde você estiver.</h2>
            <p>Entre a cidade e a natureza, descubra experiências que combinam com você.</p>
            <span className="auth-city">Manaus · Amazonas</span>
          </div>
        </div>

        <main className="login-form-area" aria-label="Acesso ao Boraí">
          <div className="login-card">
            <img src={logoBorai} alt="Boraí" className="auth-form-logo" />
            <div className="auth-tabs" aria-label="Acesso">
              <button type="button" className={telaAuth === 'login' ? 'is-active' : ''} aria-pressed={telaAuth === 'login'} onClick={voltarLogin} disabled={carregandoLogin || carregandoCadastro}>Entrar</button>
              <button type="button" className={telaAuth === 'cadastro' ? 'is-active' : ''} aria-pressed={telaAuth === 'cadastro'} onClick={abrirCadastro} disabled={carregandoLogin || carregandoCadastro}>Criar conta</button>
            </div>
            <p className="auth-step">Etapa {etapaCadastro} de 2 · {etapaCadastro === 1 ? 'Seus dados' : 'Seus interesses'}</p>
            {etapaCadastro === 1 && (
              <>
                <div className="login-heading">
                  <span className="login-eyebrow">
                    CRIAR CONTA
                  </span>

                  <h1>
                    Vamos começar?
                  </h1>

                  <p>
                    Crie seu perfil para o
                    Boraí conhecer melhor
                    você.
                  </p>
                </div>

                <form
                  className="login-form"
                  onSubmit={
                    continuarCadastro
                  }
                >
                  <label htmlFor="nomeCadastro">
                    Nome
                  </label>

                  <input
                    id="nomeCadastro"
                    type="text"
                    placeholder="Seu nome"
                    value={nomeCadastro}
                    onChange={(event) =>
                      setNomeCadastro(
                        event.target.value
                      )
                    }
                    autoComplete="name"
                    required
                    maxLength={100}
                  />

                  <label htmlFor="emailCadastro">
                    E-mail
                  </label>

                  <input
                    id="emailCadastro"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={emailCadastro}
                    onChange={(event) =>
                      setEmailCadastro(
                        event.target.value
                      )
                    }
                    autoComplete="email"
                    required
                  />

                  <label htmlFor="senhaCadastro">
                    Senha
                  </label>

                  <input
                    id="senhaCadastro"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={senhaCadastro}
                    onChange={(event) =>
                      setSenhaCadastro(
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />

                  <label htmlFor="confirmarSenha">
                    Confirmar senha
                  </label>

                  <input
                    id="confirmarSenha"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={confirmarSenha}
                    onChange={(event) =>
                      setConfirmarSenha(
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />

                  {erroCadastro && (
                    <p className="login-error" role="alert">
                      {erroCadastro}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="login-submit"
                  >
                    Continuar
                  </button>
                </form>

                <div className="login-register">
                  <span>
                    Já tem uma conta?
                  </span>

                  <button
                    type="button"
                    onClick={voltarLogin}
                  >
                    Entrar
                  </button>
                </div>
              </>
            )}

            {etapaCadastro === 2 && (
              <>
                <div className="login-heading">
                  <span className="login-eyebrow">
                    SEU JEITO
                  </span>

                  <h1>
                    O que combina com você?
                  </h1>

                  <p>
                    Escolha o que você mais
                    gosta. O Boraí usará isso
                    nas suas recomendações.
                  </p>
                </div>

                <div className="cadastro-preferencias">
                  {preferenciasCadastro.map(
                    (preferencia) => {
                      const selecionada =
                        preferenciasSelecionadas.includes(
                          preferencia.valor
                        )

                      return (
                        <button
                          key={
                            preferencia.valor
                          }
                          type="button"
                          className={`cadastro-preferencia ${
                            selecionada
                              ? 'selecionada'
                              : ''
                          }`}
                          aria-pressed={selecionada}
                          disabled={carregandoCadastro}
                          onClick={() =>
                            alternarPreferencia(
                              preferencia.valor
                            )
                          }
                        >
                          <span className="cadastro-preferencia-icone">
                            {
                              preferencia.icone
                            }
                          </span>

                          <span>
                            {
                              preferencia.nome
                            }
                          </span>
                        </button>
                      )
                    }
                  )}
                </div>

                {erroCadastro && (
                  <p className="login-error" role="alert">
                    {erroCadastro}
                  </p>
                )}

                <button
                  type="button"
                  className="login-submit"
                  onClick={criarConta}
                  disabled={
                    carregandoCadastro
                  }
                >
                  {carregandoCadastro
                    ? 'Criando conta...'
                    : 'Criar minha conta'}
                </button>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() => {
                    setErroCadastro('')
                    setEtapaCadastro(1)
                  }}
                  disabled={carregandoCadastro}
                >
                  ← Voltar
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    )
  }

  // =========================
  // LOGIN
  // =========================

  if (!usuario) {
    return (
      <div className="login-page">
        <div className="login-brand-area">
          <img
            src={logoEntrada}
            alt="Boraí"
            className="login-brand-image"
          />
          <div className="auth-brand-copy">
            <span className="auth-kicker">DESCUBRA MANAUS</span>
            <h2>Seu jeito de curtir,<br />onde você estiver.</h2>
            <p>Entre a cidade e a natureza, descubra experiências que combinam com você.</p>
            <span className="auth-city">Manaus · Amazonas</span>
          </div>
        </div>

        <main className="login-form-area" aria-label="Acesso ao Boraí">
          <div className="login-card">
            <img src={logoBorai} alt="Boraí" className="auth-form-logo" />
            <div className="auth-tabs" aria-label="Acesso">
              <button type="button" className={telaAuth === 'login' ? 'is-active' : ''} aria-pressed={telaAuth === 'login'} onClick={voltarLogin} disabled={carregandoLogin || carregandoCadastro}>Entrar</button>
              <button type="button" className={telaAuth === 'cadastro' ? 'is-active' : ''} aria-pressed={telaAuth === 'cadastro'} onClick={abrirCadastro} disabled={carregandoLogin || carregandoCadastro}>Criar conta</button>
            </div>
            <div className="login-heading">
              <h1>
                Bem-vindo ao Boraí
              </h1>

              <p>
                Descubra lugares que
                combinam com você.
              </p>
            </div>

            {sucessoLogin && (
              <p className="login-success" role="status">
                {sucessoLogin}
              </p>
            )}

            <form
              className="login-form"
              onSubmit={fazerLogin}
            >
              <label htmlFor="email">
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                autoComplete="email"
                    required
              />

              <label htmlFor="senha">
                Senha
              </label>

              <input
                id="senha"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) =>
                  setSenha(
                    event.target.value
                  )
                }
                autoComplete="current-password"
                required
              />

              <button type="button" className="auth-show-password" aria-pressed={mostrarSenha} onClick={() => setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              </button>

              {erroLogin && (
                <p className="login-error" role="alert">
                  {erroLogin}
                </p>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={
                  carregandoLogin
                }
              >
                {carregandoLogin
                  ? 'Entrando...'
                  : 'Entrar'}
              </button>
              <button type="button" className="auth-show-password" onClick={() => setTelaAuth('recuperar')} disabled={carregandoLogin}>Esqueci minha senha</button>
            </form>

            <div className="login-register">
              <span>
                Ainda não tem uma conta?
              </span>

              <button
                type="button"
                onClick={abrirCadastro}
              >
                Criar conta
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

      // =========================
  // HOME
  // =========================
  return (
    <HomeBorai
      usuario={usuario}
      estabelecimentos={estabelecimentos}
      carregando={carregando}
      erro={erro}
      onSair={sair}
      onUsuarioChange={setUsuario}
    />
  )
}

export default App