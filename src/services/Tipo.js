import { FetchApi } from '../utils/FetchApi'

export const TipoService = {
  getAll (token) {
    return FetchApi('tipo', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllWithParents (token) {
    return FetchApi('populate/parent/tipo', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(tipo => Object.assign(tipo, {pai: tipo.pilar.nome}))
      })
  }
}
