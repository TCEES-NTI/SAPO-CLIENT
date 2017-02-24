import { FetchApi } from '../utils/FetchApi'

export const NormaService = {
  getAll (token) {
    return FetchApi('norma', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  }
}
