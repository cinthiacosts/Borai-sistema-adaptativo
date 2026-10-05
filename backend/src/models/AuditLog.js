const mongoose = require('mongoose')

const auditLogSchema = new mongoose.Schema(
  {
    acao: {
      type: String,
      required: true,
      trim: true,
    },

    entidade: {
      type: String,
      required: true,
      trim: true,
    },

    entidadeId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    descricao: {
      type: String,
      required: true,
      trim: true,
    },

    dados: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('AuditLog', auditLogSchema)