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
  }
}
