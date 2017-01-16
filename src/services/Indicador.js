import { FetchApi } from '../utils/FetchApi'

export const IndicadorService = {
  get (token) {
    return FetchApi('indicador', {}, 'GET', token)
  }
}
