import { FetchApi } from '../utils/FetchApi'

export const NivelService = {
  getAll (token) {
    return FetchApi('nivel', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllWithParents (token) {
    return FetchApi('populate/parent/nivel', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(nivel => Object.assign(nivel, {pai: nivel.tipo.nome}))
      })
  }
}
