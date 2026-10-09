const mongoose = require('mongoose')

const interactionSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },

    categoria: {
      type: String,
      required: true,
    },

    acao: {
      type: String,
      enum: [
        'visualizou',
        'salvou',
        'aprovou',
        'rejeitou',
        'avaliou',
      ],
      required: true,
    },

    avaliacao: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    auditoria: {type: mongoose.Schema.Types.Mixed, default: null},

    data: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
)

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    senha: {
      type: String,
      default: null,
      select: false,
    },

    senhaVersao: {type:Number, default:0, select:false},
    recuperacaoHash: {type:String, select:false},
    recuperacaoExpira: {type:Date, select:false},

    preferencias: {
      type: [String],
      default: [],
    },

    contextoAtual: {
      localizacao: {
        type: String,
        default: null,
      },

      categoria: {
        type: String,
        default: null,
      },

      atualizadoEm: {
        type: Date,
        default: Date.now,
      },
    },

    descobertas: {type: mongoose.Schema.Types.Mixed, default: null},

    historico: {
      type: [interactionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)