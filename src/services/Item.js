import { FetchApi } from '../utils/FetchApi'

export const ItemService = {
  getPopulated (token, id) {
    return FetchApi('populate/item/' + id, {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllPopulated (token) {
    return FetchApi('populate/item', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAll (token) {
    return FetchApi('item', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllWithParents (token) {
    return FetchApi('populate/parent/item', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(item => Object.assign(item, {pai: item.subnivel.nome}))
      })
  },
  create (token, body) {
    let uri = 'item'
    let method = 'POST'
    if (body._id) {
      uri = uri.concat(`/${body._id}`)
      body._id = undefined
      method = 'PUT'
    }
    return FetchApi(uri, body, method, token)
      .then((res) => {
        return res
      })
      .catch((err) => console.log(err))
  }
}
