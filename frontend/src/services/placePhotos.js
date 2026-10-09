// Fotografias identificadas no Wikimedia Commons; créditos exibidos nos detalhes.
const license = 'https://creativecommons.org/licenses/by-sa/4.0/'
export const photos = {
  teatro: {url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Teatro_Amazonas_em_Manaus.JPG/960px-Teatro_Amazonas_em_Manaus.JPG',author:'Luciana R Araujo',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Teatro_Amazonas_em_Manaus.JPG'},
  ponta: {url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Ponta_Negra_-_Manaus_(Brasil).jpg/960px-Ponta_Negra_-_Manaus_(Brasil).jpg',author:'Nayaniteixeira',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Ponta_Negra_-_Manaus_(Brasil).jpg'},
  mercado: {url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Mercado_Municipal_Adolpho_Lisboa_-_1.jpg/500px-Mercado_Municipal_Adolpho_Lisboa_-_1.jpg',author:'Ajmcbarreto',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Mercado_Municipal_Adolpho_Lisboa_-_1.jpg'},
  largo: {url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Largo_de_São_Sebastião_01.jpg/960px-Largo_de_São_Sebastião_01.jpg',author:'Ajmcbarreto',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Largo_de_São_Sebastião_01.jpg'},
  palacete: {url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Palacete_Provincial_-_vista_externa.jpg/960px-Palacete_Provincial_-_vista_externa.jpg',author:'Ajmcbarreto',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Palacete_Provincial_-_vista_externa.jpg'},
}
export function testPlaceName(name) {
  return ['bora em auditoria','borai em auditoria','borai auditoria','bora auditoria'].includes(String(name || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim())
}
