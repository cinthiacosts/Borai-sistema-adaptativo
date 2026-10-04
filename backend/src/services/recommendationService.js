const lugares = [
  {
    nome: 'Teatro Amazonas',
    categoria: 'teatro',
    localizacao: 'Centro, Manaus',
    tags: ['cultura', 'historia', 'arte']
  },
  {
    nome: 'Mercado Municipal Adolpho Lisboa',
    categoria: 'passeio',
    localizacao: 'Centro, Manaus',
    tags: ['cultura', 'gastronomia', 'historia']
  },
  {
    nome: 'Museu da Amazônia',
    categoria: 'museu',
    localizacao: 'Manaus',
    tags: ['natureza', 'cultura', 'passeio']
  },
  {
    nome: 'Restaurante Regional',
    categoria: 'restaurante',
    localizacao: 'Manaus',
    tags: ['gastronomia', 'regional']
  },
  {
    nome: 'Evento Cultural',
    categoria: 'evento',
    localizacao: 'Manaus',
    tags: ['cultura', 'arte', 'entretenimento']
  }
]

function gerarRecomendacoes({
  categoria,
  preferencias = [],
  historico = []
}) {
  const preferenciasNormalizadas = preferencias.map((preferencia) =>
    String(preferencia).trim().toLowerCase()
  )

  const historicoPositivo = historico.filter(
    (interacao) =>
      interacao.acao === 'aprovou' ||
      interacao.acao === 'salvou' ||
      (interacao.acao === 'avaliou' && interacao.avaliacao >= 4)
  )

  let resultados = lugares.filter(
    (lugar) => lugar.categoria === categoria
  )

  resultados = resultados.map((lugar) => {
    const interessesCompativeis = lugar.tags.filter((tag) =>
      preferenciasNormalizadas.includes(tag)
    )

    const categoriaAprovadaAntes = historicoPositivo.some(
      (interacao) => interacao.categoria === lugar.categoria
    )

    let pontuacao = interessesCompativeis.length

    if (categoriaAprovadaAntes) {
      pontuacao += 1
    }

    const motivos = []

    if (interessesCompativeis.length > 0) {
      motivos.push(
        `combina com suas preferências: ${interessesCompativeis.join(', ')}`
      )
    }

    if (categoriaAprovadaAntes) {
      motivos.push('considera interações positivas do seu histórico')
    }

    if (motivos.length === 0) {
      motivos.push(`combina com a categoria ${categoria}`)
    }

    return {
      nome: lugar.nome,
      categoria: lugar.categoria,
      localizacao: lugar.localizacao,
      motivo: `${motivos.join(' e ')}.`,
      pontuacao
    }
  })

  resultados.sort((a, b) => b.pontuacao - a.pontuacao)

  return resultados
}

module.exports = {
  gerarRecomendacoes
}