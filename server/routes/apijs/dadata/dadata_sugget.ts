export default defineEventHandler(async (event) => {
  let query = getQuery(event)
  let url = ''
  const config = useRuntimeConfig()
  if (query.type === 'bank') {
    url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank"
  } else if (query.type === 'company') {
    url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party"
  } else if (query.type === 'address') {
    url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address"
  }

  let response: any = await $fetch(url, {
    params: {
      query: query.query,
    },
    headers: {
      Authorization: 'Token ' + config.public.dadataToken
    }
  }).catch((error) => error.data)
  return response.suggestions
})
