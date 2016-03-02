import { SubmitActions } from '../actions'

const initialState = {}

function user(state = initialState, action) {
  switch (action.type) {
    case SubmitActions.REGISTERED:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

export default user
