import { FetchApi } from '../utils/FetchApi'

export const IndicadorService = {
  getAll (token) {
    return FetchApi('indicador', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  }
}
