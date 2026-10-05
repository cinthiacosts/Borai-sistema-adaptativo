const Place = require('../models/Place')

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

  const resultados = lugares.map((lugar) => {
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

    return {
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