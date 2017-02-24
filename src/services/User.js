import { FetchApi } from '../utils/FetchApi'

export const UserService = {
  login (data) {
    return FetchApi('login', {
        username: data.username,
        password: data.password  
      }, "POST")
  },
  signup (data) {
    return FetchApi('singup', {
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password
      }, "POST")
  },
  getAllUsername (token) {
    return FetchApi('username', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res
      })
  },
  getAll (token) {
    return FetchApi('username', {}, 'GET', token)
      .then((res) => {
        if (!res.length) {
          throw new Error('Não há token ou não existem indicadores')
        }
        return res.map(user => {
          return {
            _id: user._id,
            nome: user.name,
            username: user.username
          }
        })
      })
  }
}
