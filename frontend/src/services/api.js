import {authHeaders,saveSession,expireSession} from './session'
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '')

async function fazerRequisicao(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...options.headers,
    },
  })

  if (response.status === 401 && endpoint !== '/users/login') expireSession()
  if (!response.ok) {
    let mensagem = `Erro na API: ${response.status}`

    try {
      const dados = await response.json()

      if (dados.mensagem) {
        mensagem = dados.mensagem
      }
    } catch {
      // Mantém a mensagem padrão
    }

    throw new Error(mensagem)
  }

  return response.json()
}

// =========================
// AUTENTICAÇÃO
// =========================

export async function cadastrarUsuario({
  nome,
  email,
  senha,
  preferencias = [],
  localizacao = 'Manaus - AM',
}) {
  return fazerRequisicao('/users/cadastro', {
    method: 'POST',
    body: JSON.stringify({
      nome,
      email,
      senha,
      preferencias,
      localizacao,
    }),
  })
}

export async function loginUsuario({ email, senha }) {
  const dados = await fazerRequisicao('/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      senha,
    }),
  })
  saveSession(dados.sessao)
  return dados
}

// =========================
// ESTABELECIMENTOS
// =========================

export async function buscarEstabelecimentos(filtros = {}) {
  const params = new URLSearchParams()

  if (filtros.categoria) {
    params.append('categoria', filtros.categoria)
  }

  if (filtros.zona) {
    params.append('zona', filtros.zona)
  }

  if (filtros.busca) {
    params.append('busca', filtros.busca)
  }

  const query = params.toString()
  const endpoint = query ? `/places?${query}` : '/places'

  return fazerRequisicao(endpoint)
}

export async function buscarEstabelecimentoPorId(id) {
  return fazerRequisicao(`/places/${id}`)
}

// =========================
// RECOMENDAÇÕES
// =========================

export async function buscarRecomendacoes({
  userId = null,
  localizacao = 'Manaus - AM',
  categoria = 'lazer',
  preferencias = [],
} = {}) {
  return fazerRequisicao('/recommendations', {
    method: 'POST',
    body: JSON.stringify({
      userId,
      localizacao,
      categoria,
      preferencias,
    }),
  })
}

export default {
  cadastrarUsuario,
  loginUsuario,
  buscarEstabelecimentos,
  buscarEstabelecimentoPorId,
  buscarRecomendacoes,
}