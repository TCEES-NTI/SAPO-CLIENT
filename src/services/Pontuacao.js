import { FetchApi } from '../utils/FetchApi'

export const PontuacaoService = {
  getAll (token) {
    return FetchApi('pontuacao', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(pontuacao => Object.assign(pontuacao, {nome: pontuacao.descricao}))
      })
  },
  getAllPopulatedCsv (token) {
    return FetchApi('/populate/pontuacao/csv', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllWithParents (token) {
    return FetchApi('populate/parent/pontuacao', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        console.log('AQUI', res)
        return res.map(pontuacao => Object.assign(pontuacao, {nome: pontuacao.descricao, pai: pontuacao.item ? pontuacao.item.nome : 'N/A'}))
      })
  }
}
