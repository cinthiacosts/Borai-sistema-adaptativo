import {createRequire} from 'node:module'
import {mkdir} from 'node:fs/promises'
import assert from 'node:assert/strict'
const require=createRequire(import.meta.url)
const {chromium}=require(process.env.BORAI_PLAYWRIGHT || 'playwright')
const browser=await chromium.launch({headless:true})
const out=new URL('../visual-review/',import.meta.url)
await mkdir(out,{recursive:true})
const fixtureUser={id:'visual-test',nome:'Pessoa de teste',email:'visual@example.test',preferencias:['cultura']}
const place={_id:'venue-test',nome:'Espaço de teste visual',categoria:'cafeteria',bairro:'Centro',status:'aprovado',tags:[]}
const errors=[]
async function inspect(page,label,width){
 const result=await page.evaluate(()=>{
  const w=window.innerWidth
  const overflow=[...document.querySelectorAll('body *')].filter(e=>{
    const r=e.getBoundingClientRect(),s=getComputedStyle(e)
    return r.width && s.position!=='absolute' && !e.closest('.chips') && (r.right>w+1 || r.left < -1)
  }).map(e=>e.tagName+'.'+e.className).slice(0,10)
  return {viewport:w,scroll:document.documentElement.scrollWidth,overflow}
 })
 assert.ok(result.scroll<=width+1,label+' horizontal overflow '+JSON.stringify(result))
 await page.screenshot({path:new URL(label+'-'+width+'.png',out).pathname.replace(/^\/([A-Z]:)/,'$1'),fullPage:true})
 console.log(label,width,JSON.stringify(result))
}
try{
 for(const width of [360,390,768,1024,1440]){
  const context=await browser.newContext({viewport:{width,height:900}})
  const page=await context.newPage()
  let emptyRecommendations=false
  const writes=[]
  page.on('pageerror',e=>errors.push(e.message))
  await page.route('**/api/**',async route=>{
   const url=new URL(route.request().url())
   if(route.request().method()!=='GET') writes.push(url.pathname)
   let data={}
   if(url.pathname.endsWith('/places')) data={estabelecimentos:[place]}
   else if(url.pathname.includes('/recommendations')) data={recomendacoes:emptyRecommendations?[]:[{id:place._id,motivo:'Preferências de teste visual'}]}
   else if(url.pathname.includes('/audit')) data={auditorias:[{_id:'a',acao:'aprovou',entidade:'decisao',createdAt:new Date().toISOString(),descricao:'Escolha de teste visual',dados:{nome:place.nome,motivo:'Registro de teste'}}]}
   else data={...fixtureUser,descobertas:{favorites:['db-venue-test'],history:[],ratings:{},avatar:'',versao:1}}
   await route.fulfill({json:data})
  })
  // Falha intencional de clima: nunca usar temperatura simulada como atual.
  await page.route('https://api.open-meteo.com/**',r=>r.abort())
  await page.route(/https:\/\/(thumb|upload)\.wikimedia\.org\/.*/,r=>r.abort())
  await page.route('https://www.google.com/maps?**',r=>r.fulfill({contentType:'text/html',body:'<p>Mapa apenas para teste de interface</p>'}))
  await page.goto('http://127.0.0.1:5173')
  await page.getByRole('heading',{name:'Bem-vindo ao Boraí'}).waitFor()
  await inspect(page,'login',width)
  await page.getByRole('button',{name:'Esqueci minha senha',exact:true}).click()
  await page.getByRole('heading',{name:'Esqueci minha senha',exact:true}).waitFor()
  await inspect(page,'recuperacao',width)
  await page.getByRole('button',{name:/Voltar/}).click()
  await page.getByRole('button',{name:'Criar conta',exact:true}).first().click()
  await page.locator('#nomeCadastro').fill('Teste visual')
  await page.locator('#emailCadastro').fill('visual@example.test')
  await page.locator('#senhaCadastro').fill('test-only-password')
  await page.locator('#confirmarSenha').fill('test-only-password')
  await inspect(page,'cadastro',width)
  if(width<600) {
    await page.setViewportSize({width,height:420})
    await page.locator('#confirmarSenha').focus()
    await page.getByRole('button',{name:'Continuar',exact:true}).scrollIntoViewIfNeeded()
    assert.ok(await page.getByRole('button',{name:'Continuar',exact:true}).isVisible())
    await inspect(page,'cadastro-viewport-reduzido',width)
    await page.setViewportSize({width,height:900})
  }
  await page.getByRole('button',{name:'Continuar',exact:true}).click()
  await inspect(page,'interesses',width)
  assert.equal(await page.getByText(/Etapa \d de 2/).count(),0)
  await page.getByRole('button',{name:'Gastronomia'}).click()
  assert.equal(await page.getByRole('button',{name:'Gastronomia'}).getAttribute('aria-pressed'),'true')
  await page.evaluate(u=>{localStorage.setItem('borai_sessao','local-fixture-only');localStorage.setItem('borai_usuario',JSON.stringify(u))},fixtureUser)
  await page.reload()
  await page.getByRole('button',{name:'Remover Espaço de teste visual dos favoritos'}).waitFor()
  await inspect(page,'home',width)
  if(width<=900) {
    assert.equal(await page.locator('.bh-weather-desktop').isVisible(),false)
    const dock=page.locator('.bh-weather-dock')
    const nav=page.getByRole('navigation')
    const dockBox=await dock.boundingBox(),navBox=await nav.boundingBox()
    assert.ok(dockBox.y+dockBox.height<=navBox.y+1,'clima não cobre navegação')
    await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight))
    const footer=await page.locator('main footer').boundingBox()
    assert.ok(footer.y+footer.height<=dockBox.y,'conteúdo final não fica coberto')
    await page.getByRole('button',{name:'Clima',exact:true}).click()
    await page.getByRole('dialog',{name:'Clima em Manaus'}).waitFor()
  } else {
    await page.getByRole('heading',{name:'Rolê de hoje'}).waitFor()
    assert.equal(await page.getByRole('button',{name:'Clima',exact:true}).isVisible(),false)
  }
  const weatherSurface=width<=900?page.locator('#weather-panel'):page.locator('.bh-weather-desktop')
  await weatherSurface.getByText('Clima indisponível agora. Tente novamente.').waitFor()
  // Resposta controlada somente no navegador de teste, para conferir recuperação e atualização.
  await page.unroute('https://api.open-meteo.com/**')
  let releaseWeather
  let nextTemperature=29
  let weatherRequests=0
  const pendingWeather=new Promise(resolve=>{releaseWeather=resolve})
  await page.route('https://api.open-meteo.com/**',async route=>{
    weatherRequests++
    await pendingWeather
    await route.fulfill({json:{current_units:{temperature_2m:'°C'},current:{temperature_2m:nextTemperature,weather_code:2,time:Math.floor(Date.now()/1000)}}})
  })
  if(width<=900) {
    await inspect(page,'clima-erro',width)
  }
  await weatherSurface.getByRole('button',{name:'Tentar novamente'}).click()
  await weatherSurface.getByText('Consultando o clima…').waitFor()
  releaseWeather()
  await weatherSurface.getByText('29 °C',{exact:true}).waitFor()
  await weatherSurface.getByText('Céu com nuvens',{exact:true}).waitFor()
  assert.ok(await weatherSurface.locator('time').getAttribute('datetime'))
  assert.ok(await weatherSurface.getByRole('link',{name:/Open-Meteo/}).isVisible())
  nextTemperature=30
  await weatherSurface.getByRole('button',{name:'Atualizar clima'}).click()
  await weatherSurface.getByText('30 °C',{exact:true}).waitFor()
  assert.equal(weatherRequests,2)
  if(width<=900) {
    await inspect(page,'clima-dados-teste',width)
    await page.screenshot({path:new URL('clima-painel-'+width+'.png',out).pathname.replace(/^\/([A-Z]:)/,'$1')})
    assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden')
    if(width<600) {
      await page.setViewportSize({width,height:420})
      await weatherSurface.getByRole('button',{name:'Ver sugestões'}).scrollIntoViewIfNeeded()
      const suggestionBox=await weatherSurface.getByRole('button',{name:'Ver sugestões'}).boundingBox()
      assert.ok(suggestionBox.y>=0 && suggestionBox.y+suggestionBox.height<=420)
      await page.setViewportSize({width,height:900})
    }
    await page.getByRole('button',{name:'Fechar clima'}).click()
    assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden')
    assert.ok(await page.getByRole('button',{name:'Clima',exact:true}).evaluate(e=>e===document.activeElement))
    await page.getByRole('button',{name:'Clima',exact:true}).click()
    await page.keyboard.press('Escape')
    assert.equal(await page.locator('#weather-panel').isVisible(),false)
  }
  assert.equal(await page.locator('main .leaflet-container').count(),0)
  const chips=page.locator('.chips')
  assert.equal(await chips.evaluate(e=>getComputedStyle(e).flexWrap),'nowrap')
  if(width<600) {
    assert.ok(await chips.evaluate(e=>e.scrollWidth>e.clientWidth))
    assert.ok(await chips.evaluate(e=>{e.scrollLeft=100;return e.scrollLeft>0}))
    assert.ok(await page.getByRole('navigation').evaluate(e=>{const r=e.getBoundingClientRect();return r.bottom<=innerHeight && r.top>=0}))
  }
  await page.getByRole('button',{name:'Conhecer lugar'}).first().click()
  await page.getByRole('link',{name:'Ver no mapa',exact:true}).waitFor()
  await inspect(page,'detalhes',width)
  await page.getByRole('button',{name:'Fechar detalhes'}).click()
  if(width<600) assert.equal(await page.locator('.cards').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),1)
  if(width<=900) await page.getByRole('button',{name:'Clima',exact:true}).click()
  await weatherSurface.getByRole('button',{name:'Ver sugestões'}).click()
  assert.equal(await page.locator('#weather-panel').isVisible(),false)
  await page.getByRole('heading',{name:'Escolhidos para você.'}).waitFor()
  await inspect(page,'para-voce',width)
  emptyRecommendations=true
  await page.getByRole('button',{name:'Atualizar indicações'}).click()
  await page.getByText('Comece escolhendo alguns lugares em Explorar para o Boraí aprender seu estilo.',{exact:true}).waitFor()
  assert.ok(await page.locator('.bh-results').evaluate(e=>e.getBoundingClientRect().height>=280))
  await inspect(page,'para-voce-vazio',width)
  await page.getByRole('button',{name:'Explorar lugares',exact:true}).click()
  await page.getByRole('heading',{name:'Onde vamos hoje?'}).waitFor()
  await page.locator('.location').click()
  await page.getByRole('heading',{name:'Onde vamos hoje?'}).waitFor()
  const writesBeforeSuggestion=writes.length
  await page.getByRole('navigation').getByRole('button',{name:'Sugerir lugar'}).click()
  await page.getByRole('heading',{name:'Sugerir lugar',exact:true}).waitFor()
  assert.equal(await page.getByRole('button',{name:'Confirmar sugestão'}).count(),0)
  await page.getByLabel('Nome da pessoa',{exact:true}).fill('Ana')
  await page.getByLabel('Nome do lugar',{exact:true}).fill('Lugar da Mostra')
  await page.getByLabel('Endereço',{exact:true}).fill('Rua das Flores, 10')
  await page.getByLabel('CEP',{exact:true}).fill('69000-000')
  await page.getByRole('button',{name:'Pesquisar no mapa'}).click()
  const embed=new URL(await page.locator('.bh-suggest-preview iframe').getAttribute('src'))
  assert.equal(embed.origin,'https://www.google.com')
  assert.equal(embed.searchParams.get('q'),'Lugar da Mostra Rua das Flores, 10 69000-000 Manaus')
  assert.equal(embed.searchParams.get('output'),'embed')
  await page.getByRole('button',{name:'Confirmar sugestão'}).click()
  await page.getByRole('status').filter({hasText:'Valeu, Ana! Você é parceiro Boraí.'}).waitFor()
  assert.ok(await page.getByText('Status: Enviado para análise',{exact:true}).isVisible())
  assert.equal(writes.length,writesBeforeSuggestion,'sugestão não deve gravar na API')
  await inspect(page,'sugerir-confirmado',width)
  await page.getByLabel('Nome do lugar',{exact:true}).fill('Outra descoberta')
  assert.equal(await page.locator('.bh-suggestion-card').count(),0)
  assert.equal(await page.locator('.bh-suggest-preview iframe').count(),0)
  await page.getByRole('navigation').getByRole('button',{name:/Favoritos/}).click()
  await inspect(page,'favoritos',width)
  await page.getByRole('navigation').getByRole('button',{name:'Meu perfil'}).click()
  await inspect(page,'perfil',width)
  await page.getByRole('navigation').getByRole('button',{name:'Meu histórico'}).click()
  await page.getByRole('heading',{name:'Seu histórico de descobertas.'}).waitFor()
  await inspect(page,'historico',width)
  await page.locator('.bh-signout').click()
  await page.getByRole('heading',{name:'Bem-vindo ao Boraí'}).waitFor()
  assert.equal(await page.evaluate(()=>localStorage.getItem('borai_usuario')),null)
  await context.close()
 }
 assert.deepEqual(errors,[])
}finally{await browser.close()}
