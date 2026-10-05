const AuditLog = require('../models/AuditLog')

async function listarAuditorias(req, res) {
  try {
    const auditorias = await AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('usuarioId', 'nome email')

    return res.status(200).json({
      total: auditorias.length,
      auditorias,
    })
  } catch (error) {
    console.error('Erro ao listar auditorias:', error)

    return res.status(500).json({
      mensagem: 'Erro ao buscar a trilha de auditoria.',
    })
  }
}

module.exports = {
  listarAuditorias,
}