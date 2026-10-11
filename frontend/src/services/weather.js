const MAX_AGE = 90 * 60 * 1000
export const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-3.119&longitude=-60.0217&current=temperature_2m,weather_code&timezone=America%2FManaus&timeformat=unixtime'
export function parseWeather(data, now = Date.now()) {
  const current = data?.current
  const time = typeof current?.time === 'number' ? current.time * 1000 : NaN
  if (!Number.isFinite(current?.temperature_2m) || !Number.isInteger(current?.weather_code) ||
      data?.current_units?.temperature_2m !== '°C' || !Number.isFinite(time) ||
      now - time > MAX_AGE || time - now > 15 * 60 * 1000) {
    throw new Error('Dados meteorológicos indisponíveis ou desatualizados.')
  }
  return {temperature:current.temperature_2m, code:current.weather_code, time}
}
export function weatherLabel(code) {
  if (code === 0) return 'Céu limpo'
  if ([1,2,3].includes(code)) return 'Céu com nuvens'
  if ([45,48].includes(code)) return 'Nevoeiro'
  if ([51,53,55,56,57].includes(code)) return 'Chuvisco'
  if ([61,63,65,66,67,80,81,82].includes(code)) return 'Chuva'
  if ([95,96,99].includes(code)) return 'Trovoadas'
  return 'Condições variáveis'
}
export async function fetchManausWeather({signal, fetchImpl = fetch} = {}) {
  const response = await fetchImpl(WEATHER_URL, {signal})
  if (!response.ok) throw new Error('Não foi possível consultar o clima.')
  return parseWeather(await response.json())
}
