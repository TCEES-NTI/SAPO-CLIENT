import { FetchApi } from '../utils/FetchApi'

export const PilarService = {
  getAll (token) {
    return FetchApi('pilar', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllWithParents (token) {
    return FetchApi('populate/parent/pilar', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(pilar => Object.assign(pilar, {pai: pilar.indicador.nome}))
      })
  }
}