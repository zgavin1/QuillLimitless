import { SubmitActions } from '../actions'

const initialState = {
  score: 0
}

function score(state = initialState, action) {
  switch (action.type) {
    case SubmitActions.SUBMIT_FIND:
      return Object.assign({}, state, {
        score: state.score + 1
      })
    case SubmitActions.SUBMIT_FIX:
      return Object.assign({}, state, {
        score: state.score + 1
      })
    default:
      return state
  }
}

export default score
