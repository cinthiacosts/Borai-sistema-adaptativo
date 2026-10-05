const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    categoria: {
      type: String,
      required: true,
      enum: [
        'restaurante',
        'cafeteria',
        'bar',
        'evento',
        'hotel',
        'lazer',
      ],
    },

    descricao: {
      type: String,
      trim: true,
      default: '',
    },

    endereco: {
      type: String,
      required: true,
      trim: true,
    },

    bairro: {
      type: String,
      trim: true,
      default: '',
    },

    zona: {
      type: String,
      enum: [
        'norte',
        'sul',
        'leste',
        'oeste',
        'centro-sul',
        'centro-oeste',
        'nao_informada',
      ],
      default: 'nao_informada',
    },

    cidade: {
      type: String,
      trim: true,
      default: 'Manaus',
    },

    estado: {
      type: String,
      trim: true,
      default: 'AM',
    },

    localizacao: {
      latitude: {
        type: Number,
        default: null,
      },

      longitude: {
        type: Number,
        default: null,
      },
    },

    avaliacao: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    quantidadeAvaliacoes: {
      type: Number,
      min: 0,
      default: 0,
    },

    faixaPreco: {
      type: String,
      enum: ['$', '$$', '$$$', '$$$$', 'nao_informado'],
      default: 'nao_informado',
    },

    imagem: {
      type: String,
      trim: true,
      default: '',
    },

    tags: {
      type: [String],
      default: [],
    },

    telefone: {
      type: String,
      trim: true,
      default: '',
    },

    site: {
      type: String,
      trim: true,
      default: '',
    },

    googleMapsUrl: {
      type: String,
      trim: true,
      default: '',
    },

    // Origem do estabelecimento dentro do Boraí
    origem: {
      type: String,
      enum: ['plataforma', 'usuario'],
      default: 'plataforma',
    },

    // Locais sugeridos por usuários podem aguardar validação.
    status: {
      type: String,
      enum: ['pendente', 'aprovado', 'rejeitado'],
      default: 'aprovado',
    },

    // Usuário responsável pela sugestão.
    // Fica vazio nos locais cadastrados pela plataforma.
    criadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // Check-ins voluntários realizados no estabelecimento.
    quantidadeCheckIns: {
      type: Number,
      min: 0,
      default: 0,
    },

    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Place', placeSchema)