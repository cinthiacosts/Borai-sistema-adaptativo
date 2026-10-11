import {test} from 'node:test'
import assert from 'node:assert/strict'
import {parseWeather,fetchManausWeather,weatherLabel,WEATHER_URL} from '../src/services/weather.js'
const now=Date.now()
const data={current:{time:Math.floor(now/1000),temperature_2m:29.2,weather_code:61},current_units:{temperature_2m:'°C'}}
test('aceita apenas dados recentes com temperatura real em Celsius',()=>{
 assert.equal(parseWeather(data,now).temperature,29.2)
 for(const invalid of [null,{}, {...data,current:{...data.current,temperature_2m:null}},
  {...data,current:{...data.current,time:(now-91*60000)/1000}},
  {...data,current:{...data.current,time:(now+16*60000)/1000}},
  {...data,current_units:{temperature_2m:'°F'}}]) assert.throws(()=>parseWeather(invalid,now))
})
test('usa Manaus e preserva falhas HTTP, rede e respostas inválidas',async()=>{
 assert.match(WEATHER_URL,/latitude=-3.119&longitude=-60.0217/)
 assert.match(WEATHER_URL,/America%2FManaus/)
 const signal=new AbortController().signal
 const result=await fetchManausWeather({signal,fetchImpl:async(url,options)=>{
  assert.equal(url,WEATHER_URL);assert.equal(options.signal,signal)
  return {ok:true,json:async()=>data}
 }})
 assert.equal(result.temperature,29.2)
 await assert.rejects(fetchManausWeather({fetchImpl:async()=>({ok:false})}))
 await assert.rejects(fetchManausWeather({fetchImpl:async()=>{throw Error('offline')}}))
 await assert.rejects(fetchManausWeather({fetchImpl:async()=>({ok:true,json:async()=>({})})}))
})
test('descreve códigos meteorológicos sem inferir condições dos locais',()=>{
 assert.equal(weatherLabel(0),'Céu limpo')
 assert.equal(weatherLabel(61),'Chuva')
 assert.equal(weatherLabel(95),'Trovoadas')
 assert.equal(weatherLabel(999),'Condições variáveis')
})
