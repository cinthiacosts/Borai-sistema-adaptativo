require('dotenv').config()

const conectarBanco = require('../config/database')
const Place = require('../models/Place')

// ======================================================
// BORAÍ - BASE INICIAL DE ESTABELECIMENTOS
// ======================================================

const places = [
  // ZONA NORTE
  {
    nome: 'Sumaúma Park Shopping',
    categoria: 'lazer',
    descricao:
      'Shopping com opções de compras, alimentação, entretenimento e serviços.',
    endereco: 'Avenida Noel Nutels, 1762',
    bairro: 'Cidade Nova',
    zona: 'norte',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['shopping', 'compras', 'gastronomia', 'cinema', 'família', 'lazer'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Shopping Manaus ViaNorte',
    categoria: 'lazer',
    descricao:
      'Shopping com opções de compras, alimentação, serviços e entretenimento.',
    endereco: 'Avenida Arquiteto José Henriques Bento Rodrigues, 3541',
    bairro: 'Santa Etelvina',
    zona: 'norte',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['shopping', 'compras', 'gastronomia', 'família', 'lazer'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Moema Café Regional',
    categoria: 'cafeteria',
    descricao:
      'Cafeteria com opções de café da manhã e gastronomia regional.',
    endereco: 'Avenida Irianeópolis, 50',
    bairro: 'Nova Cidade',
    zona: 'norte',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['cafeteria', 'café', 'regional', 'café da manhã', 'gastronomia'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },

  // ZONA SUL
  {
    nome: 'Mercado Municipal Adolpho Lisboa',
    categoria: 'lazer',
    descricao:
      'Mercado histórico e ponto turístico de Manaus, com comércio e gastronomia regional.',
    endereco: 'Rua dos Barés, 46',
    bairro: 'Centro',
    zona: 'sul',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.13995,
      longitude: -60.02355,
    },
    tags: ['cultura', 'gastronomia', 'turismo', 'história', 'regional', 'mercado'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Canto da Peixada',
    categoria: 'restaurante',
    descricao:
      'Restaurante tradicional de Manaus especializado em peixes e culinária regional.',
    endereco: 'Rua Emílio Moreira, 1677',
    bairro: 'Praça 14 de Janeiro',
    zona: 'sul',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.13148,
      longitude: -60.0151,
    },
    tags: ['restaurante', 'gastronomia', 'peixe', 'culinária regional', 'regional'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Caxiri Manaus',
    categoria: 'restaurante',
    descricao:
      'Restaurante com proposta gastronômica inspirada na culinária amazônica.',
    endereco: 'Rua 10 de Julho, 495',
    bairro: 'Centro',
    zona: 'sul',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['restaurante', 'gastronomia', 'amazônia', 'regional', 'turismo'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Palácio Rio Negro',
    categoria: 'lazer',
    descricao:
      'Espaço histórico e cultural localizado no Centro de Manaus.',
    endereco: 'Avenida Sete de Setembro, 1546',
    bairro: 'Centro',
    zona: 'sul',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.13506,
      longitude: -60.01677,
    },
    tags: ['cultura', 'história', 'turismo', 'patrimônio', 'passeio'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },

  // ZONA LESTE
  {
    nome: 'MUSA - Museu da Amazônia',
    categoria: 'lazer',
    descricao:
      'Espaço de visitação dedicado à natureza, biodiversidade e cultura amazônica.',
    endereco: 'Avenida Margarita, 6305',
    bairro: 'Cidade de Deus',
    zona: 'leste',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.007327,
      longitude: -59.93984,
    },
    tags: ['natureza', 'cultura', 'turismo', 'trilhas', 'museu', 'amazônia'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Sagrado Peixe - Cozinha Regional',
    categoria: 'restaurante',
    descricao:
      'Restaurante voltado à gastronomia regional e aos sabores amazônicos.',
    endereco: 'Avenida Cosme Ferreira, 1620',
    bairro: 'Coroado',
    zona: 'leste',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['restaurante', 'gastronomia', 'peixe', 'regional', 'amazônia'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },

  // ZONA OESTE
  {
    nome: 'Praia da Ponta Negra',
    categoria: 'lazer',
    descricao:
      'Complexo turístico e área pública de lazer às margens do Rio Negro.',
    endereco: 'Avenida Coronel Teixeira',
    bairro: 'Ponta Negra',
    zona: 'oeste',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.06247,
      longitude: -60.10375,
    },
    tags: ['praia', 'turismo', 'natureza', 'passeio', 'família', 'lazer'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Coco Bambu Manaus',
    categoria: 'restaurante',
    descricao:
      'Restaurante com opções de frutos do mar e gastronomia variada.',
    endereco: 'Avenida Coronel Teixeira, 5705',
    bairro: 'Ponta Negra',
    zona: 'oeste',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['restaurante', 'gastronomia', 'frutos do mar', 'família'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Tropical Executive Hotel',
    categoria: 'hotel',
    descricao:
      'Hotel localizado na região turística da Ponta Negra.',
    endereco: 'Avenida Coronel Teixeira, 1320 A',
    bairro: 'Ponta Negra',
    zona: 'oeste',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.064,
      longitude: -60.10722,
    },
    tags: ['hotel', 'hospedagem', 'turismo', 'ponta negra'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Ibis Manaus Aeroporto',
    categoria: 'hotel',
    descricao:
      'Hotel localizado na região do Aeroporto Internacional de Manaus.',
    endereco: 'Avenida do Turismo, 6751',
    bairro: 'Tarumã',
    zona: 'oeste',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.02482,
      longitude: -60.0573,
    },
    tags: ['hotel', 'hospedagem', 'aeroporto', 'turismo'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },

  // ZONA CENTRO-SUL
  {
    nome: 'Banzeiro Manaus',
    categoria: 'restaurante',
    descricao:
      'Restaurante especializado em gastronomia amazônica e ingredientes regionais.',
    endereco: 'Rua Libertador, 102',
    bairro: 'Nossa Senhora das Graças',
    zona: 'centro-sul',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['restaurante', 'gastronomia', 'amazônia', 'regional', 'culinária amazônica'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Quality Hotel Manaus',
    categoria: 'hotel',
    descricao:
      'Hotel localizado na região de Adrianópolis, em Manaus.',
    endereco: 'Avenida Mário Ypiranga, 1090',
    bairro: 'Adrianópolis',
    zona: 'centro-sul',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['hotel', 'hospedagem', 'turismo'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Parque Cidade da Criança',
    categoria: 'lazer',
    descricao:
      'Parque público voltado ao lazer infantil e às atividades em família.',
    endereco: 'Rua Castro Alves, 100',
    bairro: 'Aleixo',
    zona: 'centro-sul',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['parque', 'crianças', 'família', 'passeio', 'lazer'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Arena da Amazônia',
    categoria: 'lazer',
    descricao:
      'Estádio e espaço utilizado para eventos esportivos e culturais.',
    endereco: 'Avenida Constantino Nery, 5001',
    bairro: 'Flores',
    zona: 'centro-sul',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.08325,
      longitude: -60.02801,
    },
    tags: ['esporte', 'eventos', 'futebol', 'turismo', 'lazer'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Castelo das Delícias',
    categoria: 'cafeteria',
    descricao:
      'Estabelecimento local no Aleixo com opções de cafeteria e alimentação.',
    endereco: 'Rua Gabriel Gonçalves, 37A',
    bairro: 'Aleixo',
    zona: 'centro-sul',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['cafeteria', 'café', 'doces', 'alimentação', 'negócio local', 'aleixo'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Tchibum Chuá - Unidade Adrianópolis',
    categoria: 'lazer',
    descricao:
      'Espaço voltado à natação e atividades aquáticas para diferentes públicos.',
    endereco: 'Rua C 1, 1',
    bairro: 'Adrianópolis',
    zona: 'centro-sul',
    cidade: 'Manaus',
    estado: 'AM',
    tags: ['natação', 'atividade física', 'crianças', 'família', 'esporte', 'lazer'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },

  // ZONA CENTRO-OESTE
  {
    nome: 'Porão do Alemão',
    categoria: 'bar',
    descricao:
      'Bar e casa de entretenimento conhecida por apresentações musicais e programação noturna.',
    endereco: 'Travessa Ponta Negra, 1986',
    bairro: 'São Jorge',
    zona: 'centro-oeste',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.095205,
      longitude: -60.051182,
    },
    tags: ['bar', 'música', 'shows', 'vida noturna', 'entretenimento'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
  {
    nome: 'Parque dos Bilhares',
    categoria: 'lazer',
    descricao:
      'Parque urbano com espaços para caminhada, esporte, lazer e convivência.',
    endereco: 'Avenida Constantino Nery',
    bairro: 'Chapada',
    zona: 'centro-oeste',
    cidade: 'Manaus',
    estado: 'AM',
    localizacao: {
      latitude: -3.1025,
      longitude: -60.02817,
    },
    tags: ['parque', 'esporte', 'caminhada', 'família', 'lazer'],
    origem: 'plataforma',
    status: 'aprovado',
    ativo: true,
  },
]

// ======================================================
// GEOLOCALIZAÇÃO GRATUITA - OPENSTREETMAP
// ======================================================

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function buscarCoordenadas(place) {
  if (
    Number.isFinite(place.localizacao?.latitude) &&
    Number.isFinite(place.localizacao?.longitude)
  ) {
    return place.localizacao
  }

  const consultas = [
    `${place.nome}, ${place.endereco}, ${place.bairro}, Manaus, Amazonas, Brasil`,
    `${place.endereco}, ${place.bairro}, Manaus, Amazonas, Brasil`,
  ]

  for (const consulta of consultas) {
    try {
      const url =
        'https://nominatim.openstreetmap.org/search?' +
        new URLSearchParams({
          q: consulta,
          format: 'jsonv2',
          limit: '1',
          countrycodes: 'br',
        })

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Borai-Projeto-Academico/1.0',
          'Accept-Language': 'pt-BR,pt',
        },
      })

      if (!response.ok) {
        continue
      }

      const resultado = await response.json()

      if (resultado.length > 0) {
        const latitude = Number(resultado[0].lat)
        const longitude = Number(resultado[0].lon)

        if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
          return {
            latitude,
            longitude,
          }
        }
      }
    } catch (error) {
      console.log(`Falha ao localizar ${place.nome}: ${error.message}`)
    }

    await esperar(1100)
  }

  return null
}

// ======================================================
// EXECUÇÃO DO SEED
// ======================================================

async function executarSeed() {
  try {
    await conectarBanco()

    console.log('')
    console.log('========================================')
    console.log(' BORAÍ - CARGA DE ESTABELECIMENTOS')
    console.log('========================================')
    console.log('')

    let criados = 0
    let atualizados = 0
    let geolocalizados = 0
    let semCoordenadas = 0

    for (const placeOriginal of places) {
      const place = { ...placeOriginal }

      if (
        !Number.isFinite(place.localizacao?.latitude) ||
        !Number.isFinite(place.localizacao?.longitude)
      ) {
        console.log(`LOCALIZANDO  - ${place.nome}`)

        const coordenadas = await buscarCoordenadas(place)

        if (coordenadas) {
          place.localizacao = coordenadas
          geolocalizados += 1

          console.log(
            `COORDENADAS  - ${place.nome}: ${coordenadas.latitude}, ${coordenadas.longitude}`
          )
        } else {
          semCoordenadas += 1
          console.log(`SEM GPS      - ${place.nome}`)
        }

        await esperar(1100)
      }

      const existente = await Place.findOne({
        nome: place.nome,
      })

      if (existente) {
        await Place.findByIdAndUpdate(
          existente._id,
          {
            $set: place,
          },
          {
            returnDocument: 'after',
            runValidators: true,
          }
        )

        atualizados += 1
        console.log(`ATUALIZADO   - ${place.nome}`)
      } else {
        await Place.create(place)

        criados += 1
        console.log(`CRIADO       - ${place.nome}`)
      }
    }

    console.log('')
    console.log('========================================')
    console.log(' SEED CONCLUÍDO')
    console.log('========================================')
    console.log(`Total da base: ${places.length}`)
    console.log(`Criados: ${criados}`)
    console.log(`Atualizados: ${atualizados}`)
    console.log(`Geolocalizados agora: ${geolocalizados}`)
    console.log(`Sem coordenadas: ${semCoordenadas}`)
    console.log('')

    process.exit(0)
  } catch (error) {
    console.error('')
    console.error('ERRO AO EXECUTAR O SEED:')
    console.error(error)
    console.error('')

    process.exit(1)
  }
}

executarSeed()