import { FetchApi } from '../utils/FetchApi'

export const ObjetoAvaliacaoService = {
  getPopulated (token, id) {
    return FetchApi(`populate/avaliacao/${id}/objetoAvaliacao`, {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
}
