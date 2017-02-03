import { FetchApi } from '../utils/FetchApi'

export const AvaliacaoService = {
  create (token, data) {
    let test = Object.keys(data.entidades).reduce((result, actual) => {
        return result.concat(data.entidades[actual])
      }, []).join(',')
    data = Object.assign({}, data, {
      entidades: test,
      itens: data.itens.filter(item => item.selected).map((item) => item._id).join(','),
      usuarios: data.usuarios.join(',')
    })
    console.log(data)
    return FetchApi('create/avaliacao', {
        indicador: data.indicador,
        nome: data.nome,
        objetivos: data.objetivos,
        observacoes: data.observacoes,
        entidades: data.entidades,
        itens: data.itens,
        usuarios: data.usuarios
      }, "POST", token)
  },
  getAll (token) {
    return FetchApi('avaliacao', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAllPopulated (token) {
    return FetchApi('populate/avaliacao', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  }
}
