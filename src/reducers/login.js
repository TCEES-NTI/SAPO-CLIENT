import { LOGIN } from '../utils/consts'

const initialState = {
  token: ''
}

export function loginReducer(state = initialState, action) {
  let modifications = {}
  if(action.type === LOGIN) {
    modifications = Object.assign(modifications, { token: action.value })
  }
  console.log(modifications)
  return Object.keys(modifications).length ? modifications : state
}