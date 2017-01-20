import { LOGIN, SET_LOGIN_ATTRIBUTE } from '../utils/consts'

const initialState = {
  token: '',
  registering: false,
  username: 'lucianopf',
  fullname: '',
  email: '',
  password: '123456',
  password2: ''
}

export function loginReducer(state = initialState, action) {
  let modifications = {}
  if(action.type === LOGIN) {
    modifications = Object.assign(modifications, { token: action.value })
  } else if (action.type === SET_LOGIN_ATTRIBUTE) {
    var mutate = {}
    mutate[action.attributeName] = action.value
    modifications = Object.assign(modifications, mutate)
  }
  return Object.keys(modifications).length ? Object.assign({}, state, modifications) : state
}