import config from '../config.json'

function urlEncode (data) {
  return Object.keys(data).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
  }).join('&')
}

export function FetchApi (url, payload, method, token) {
  console.log("Resquest", method, url)
  let requestPayload = {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept' : 'application/json; text/html; charset=utf-8'
    }
  }

  if (token) {
    requestPayload.headers.Authorization = 'Bearer ' + token
  }

  if (method !== 'GET') {
    requestPayload.body = urlEncode(payload)
  }
  return fetch(config.apiUrl + url, requestPayload)
    .then((res) => {
      setTimeout(() => null, 0)
      return res.url.indexOf('csv') !== -1 ? res.text() : res.json()
    })
    .then((res) => {
      if (res.message === 'Token has expired, please login again.') {
        alert('A sua sessão expirou, por favor, faça o login novamente.')
      } else {
        return res
      }
    })
    .catch(err => {
      console.log('Mensagem:', err.message)
      return FetchApi(url, payload, method, token)
    })
}
