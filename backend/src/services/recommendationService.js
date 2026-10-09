const Place = require('../models/Place')
const {trainModel} = require('./adaptiveModel')

function normalizarTexto(valor) {
  return String(valor || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\uFFFD/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ')
}

function textosCorrespondem(textoA, textoB) {
  const a = normalizarTexto(textoA)
  const b = normalizarTexto(textoB)

  if (!a || !b) {
    return false
  }

  return a === b || a.includes(b) || b.includes(a)
}

async function gerarRecomendacoes({
  categoria = null,
  preferencias = [],
  historico = [],
}) {
  const preferenciasNormalizadas = preferencias.map(normalizarTexto)

  const historicoPositivo = historico.filter(
    (interacao) =>
      interacao.acao === 'aprovou' ||
      interacao.acao === 'salvou' ||
      (interacao.acao === 'avaliou' && interacao.avaliacao >= 4)
  )

  const historicoNegativo = historico.filter(
    (interacao) =>
      interacao.acao === 'rejeitou' ||
      (interacao.acao === 'avaliou' && interacao.avaliacao <= 2)
  )

  const filtro = {
    ativo: true,
    status: 'aprovado',
  }

  if (categoria) {
    filtro.categoria = normalizarTexto(categoria)
  }

  const lugares = await Place.find(filtro).lean()
  // A decisão mais recente prevalece: rejeitar retira da lista até nova aprovação.
  const ultimasDecisoes = new Map()
  for (const interacao of historico) {
    if (['aprovou', 'rejeitou'].includes(interacao.acao)) {
      ultimasDecisoes.set(normalizarTexto(interacao.item), interacao.acao)
    }
  }
  const lugaresDisponiveis = lugares.filter(lugar =>
    ultimasDecisoes.get(normalizarTexto(lugar.nome)) !== 'rejeitou'
  )

  const modelo = trainModel(lugares,historico,preferencias)
  const resultados = lugaresDisponiveis.map((lugar) => {
    const tagsNormalizadas = (lugar.tags || []).map(normalizarTexto)

    const interessesCompativeis = tagsNormalizadas.filter((tag) =>
      preferenciasNormalizadas.includes(tag)
    )

    const categoriaAprovadaAntes = historicoPositivo.some(
      (interacao) =>
        normalizarTexto(interacao.categoria) ===
        normalizarTexto(lugar.categoria)
    )

    const lugarAprovadoAntes = historicoPositivo.some((interacao) =>
      textosCorrespondem(interacao.item, lugar.nome)
    )

    const lugarRejeitadoAntes = historicoNegativo.some((interacao) =>
      textosCorrespondem(interacao.item, lugar.nome)
    )

    let pontuacao = interessesCompativeis.length * 2

    if (categoriaAprovadaAntes) {
      pontuacao += 1
    }

    if (lugarAprovadoAntes) {
      pontuacao += 2
    }

    if (lugarRejeitadoAntes) {
      pontuacao -= 3
    }

    const previsao = modelo.predict(lugar)
    pontuacao += 4 * (previsao.indiceAfinidade - 0.5)
    const motivos = []

    if (interessesCompativeis.length > 0) {
      motivos.push(
        `combina com suas preferências: ${interessesCompativeis.join(', ')}`
      )
    }

    if (categoriaAprovadaAntes) {
      motivos.push('considera categorias que você já aprovou')
    }

    if (lugarAprovadoAntes) {
      motivos.push('considera uma interação positiva anterior')
    }

    if (lugarRejeitadoAntes) {
      motivos.push('considera uma rejeição anterior')
    }

    if (motivos.length === 0) {
      motivos.push(
        categoria
          ? `combina com a categoria ${categoria}`
          : 'faz parte das opções disponíveis no Boraí'
      )
    }

    if (modelo.samples > 0) {
      const aprendidos = previsao.contributions.filter(x => x.peso > 0.05 && x.caracteristica.startsWith('interesse:')).sort((a,b) => b.peso-a.peso).slice(0,2).map(x => x.caracteristica.slice(10))
      if (aprendidos.length) motivos.push('seu histórico indica afinidade com ' + aprendidos.join(', '))
      else motivos.push('a ordenação também considera o modelo ajustado pelas suas escolhas')
    }
    return {
      ia: {modelo:modelo.version,amostras:modelo.samples,indiceAfinidade:previsao.indiceAfinidade,contribuicoes:previsao.contributions},
      id: lugar._id,
      nome: lugar.nome,
      categoria: lugar.categoria,
      descricao: lugar.descricao,
      endereco: lugar.endereco,
      bairro: lugar.bairro,
      zona: lugar.zona,
      cidade: lugar.cidade,
      estado: lugar.estado,
      localizacao: lugar.localizacao,
      avaliacao: lugar.avaliacao,
      quantidadeAvaliacoes: lugar.quantidadeAvaliacoes,
      faixaPreco: lugar.faixaPreco,
      imagem: lugar.imagem,
      tags: lugar.tags,
      motivo: `${motivos.join(' e ')}.`,
      pontuacao,
    }
  })

  resultados.sort((a, b) => {
    if (b.pontuacao !== a.pontuacao) {
      return b.pontuacao - a.pontuacao
    }

    return b.avaliacao - a.avaliacao
  })

  return resultados
}

module.exports = {
  gerarRecomendacoes,
}