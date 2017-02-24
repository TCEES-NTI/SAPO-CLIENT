import { FetchApi } from '../utils/FetchApi'

export const CriterioLegalService = {
  getAll (token) {
    return FetchApi('criterioLegal', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(criterio => Object.assign(criterio, {nome: criterio.descricao}))
      })
  },
  getAllWithParents (token) {
    return FetchApi('populate/parent/criterioLegal', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(criterio => Object.assign(criterio, {nome: criterio.descricao}))
      })
  }
}
