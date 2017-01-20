import { FetchApi } from '../utils/FetchApi'

export const EntidadeService = {
  getAll (token) {
    return FetchApi('entidade', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  }
}
