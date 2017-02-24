import { FetchApi } from '../utils/FetchApi'

export const SubnivelService = {
  getAll (token) {
    return FetchApi('subnivel', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllWithParents (token) {
    return FetchApi('populate/parent/subnivel', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(subnivel => Object.assign(subnivel, {pai: subnivel.nivel.nome}))
      })
  }
}
