import { FetchApi } from '../utils/FetchApi'

export const NotaService = {
  getPopulated (token, id) {
    return FetchApi(`populate/objetoAvaliacao/${id}/nota`, {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  setNota (token, id, data) {
    return FetchApi(`/nota/${id}`, data, 'PUT', token)
      .then((res) => {
        if (!res) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getPopulatedCsv (token, id) {
    return FetchApi(`populate/objetoAvaliacao/${id}/nota/csv`, {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
}
