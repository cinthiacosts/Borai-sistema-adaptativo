// Fotografias identificadas no Wikimedia Commons; créditos exibidos nos detalhes.
import musa from '../assets/musa.jpg'
import arena from '../assets/arena-amazonia.jpg'
import banzeiro from '../assets/banzeiro.jpg'
import canto from '../assets/canto-peixada.jpg'
import castelo from '../assets/castelo-delicias.jpg'
import caxiri from '../assets/caxiri.jpg'
import coco from '../assets/coco-bambu.jpg'
import ibis from '../assets/ibis-aeroporto.jpg'
import moema from '../assets/moema-cafe.png'
import palacio from '../assets/palacio-rio-negro.jpg'
import crianca from '../assets/parque-cidade-crianca.png'
import bilhares from '../assets/parque-bilhares.jpeg'
import porao from '../assets/porao-alemao.png'
import quality from '../assets/quality-hotel.jpg'
import sagrado from '../assets/sagrado-peixe.jpeg'
import vianorte from '../assets/shopping-vianorte.jpg'
import sumauma from '../assets/sumauma-shopping.jpg'
import tchibum from '../assets/tchibum-adrianopolis.jpg'
import tropical from '../assets/tropical-executive.jpg'

const license = 'https://creativecommons.org/licenses/by-sa/4.0/'
export const photos = {
  musa: {url:musa},
  teatro: {url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Teatro_Amazonas_em_Manaus.JPG/960px-Teatro_Amazonas_em_Manaus.JPG',author:'Luciana R Araujo',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Teatro_Amazonas_em_Manaus.JPG'},
  ponta: {url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Ponta_Negra_-_Manaus_(Brasil).jpg/960px-Ponta_Negra_-_Manaus_(Brasil).jpg',author:'Nayaniteixeira',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Ponta_Negra_-_Manaus_(Brasil).jpg'},
  mercado: {url:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Mercado_Municipal_Adolpho_Lisboa_-_1.jpg/500px-Mercado_Municipal_Adolpho_Lisboa_-_1.jpg',author:'Ajmcbarreto',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Mercado_Municipal_Adolpho_Lisboa_-_1.jpg'},
  largo: {url:'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Largo_de_São_Sebastião_01.jpg/960px-Largo_de_São_Sebastião_01.jpg',author:'Ajmcbarreto',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Largo_de_São_Sebastião_01.jpg'},
  palacete: {url:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Palacete_Provincial_-_vista_externa.jpg/960px-Palacete_Provincial_-_vista_externa.jpg',author:'Ajmcbarreto',license,label:'CC BY-SA 4.0',page:'https://commons.wikimedia.org/wiki/File:Palacete_Provincial_-_vista_externa.jpg'},
}
// Fotos fornecidas no projeto, associadas ao nome sem alterar IDs ou categorias.
// Inclui os nomes usados pela API para os dois estabelecimentos com variações.
export const localPhotosByName = {
  'arena da amazonia': {url:arena},
  'banzeiro manaus': {url:banzeiro},
  'canto da peixada': {url:canto},
  'castelo das delicias': {url:castelo},
  'caxiri manaus': {url:caxiri},
  'coco bambu manaus': {url:coco},
  'ibis manaus aeroporto': {url:ibis},
  'moema cafe regional': {url:moema},
  'palacio rio negro': {url:palacio},
  'parque cidade da crianca': {url:crianca},
  'parque dos bilhares': {url:bilhares},
  'porao do alemao': {url:porao},
  'quality hotel manaus': {url:quality},
  'sagrado peixe': {url:sagrado},
  'sagrado peixe - cozinha regional': {url:sagrado},
  'shopping manaus vianorte': {url:vianorte},
  'sumauma park shopping': {url:sumauma},
  'tchibum chua adrianopolis': {url:tchibum},
  'tchibum chua - unidade adrianopolis': {url:tchibum},
  'tropical executive hotel': {url:tropical},
}
export function testPlaceName(name) {
  return ['bora em auditoria','borai em auditoria','borai auditoria','bora auditoria'].includes(String(name || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim())
}
