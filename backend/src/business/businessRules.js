/**
 * Boraí - Regras de Negócio
 * Responsável: Cínthia
 *
 * Este módulo reúne as principais regras de negócio do Boraí.
 * As regras são independentes da interface, do banco de dados
 * e da API para facilitar a integração com os outros módulos.
 */

const CATEGORIAS_VALIDAS = [
  "restaurante",
  "bar",
  "evento",
  "cinema",
  "teatro",
  "museu",
  "feira",
  "passeio",
  "shopping",
  "hotel"
];

/**
 * Verifica se uma categoria faz parte das categorias
 * trabalhadas pelo Boraí.
 */
function categoriaValida(categoria) {
  if (typeof categoria !== "string") {
    return false;
  }

  const categoriaNormalizada = categoria.trim().toLowerCase();

  return CATEGORIAS_VALIDAS.includes(categoriaNormalizada);
}

/**
 * Organiza o contexto atual utilizado pelo Boraí.
 */
function criarContexto({
  localizacao,
  horario,
  categoria,
  filtros = {}
}) {
  return {
    localizacao: localizacao || null,
    horario: horario || new Date().toISOString(),
    categoria:
      typeof categoria === "string"
        ? categoria.trim().toLowerCase()
        : null,
    filtros
  };
}

module.exports = {
  CATEGORIAS_VALIDAS,
  categoriaValida,
  criarContexto
};