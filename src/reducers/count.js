import { INCREASE, DECREASE} from '../utils/consts'

const initialState = {
  number: 1
}

export function countReducer(state = initialState, action) {
  let modifications = {}
  if(action.type === INCREASE) {
    modifications = Object.assign(modifications, { number: state.number + action.amount })
  }
  else if(action.type === DECREASE) {
    modifications = Object.assign(modifications, { number: state.number - action.amount })
  }
  console.log(modifications)
  return Object.keys(modifications).length ? modifications : state
}