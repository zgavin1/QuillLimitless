import { SubmitActions } from '../actions'

const initialState = {
  score: 0,
  question: {
    concept: {
      name: "Than, Then",
      conceptName: "Than",
      standard: "4.1g. Commonly Confused Words"
    },
    question: {
      answer: "There are more {than} 300 million people in the United States.",
      prompt: "There are more {then} 300 million people in the United States."
    }
  }
}

function findAndFix(state = initialState, action) {
  switch (action.type) {
    case SubmitActions.SUBMIT_FIND:
      return Object.assign({}, state, {
        score: state.score += 1
      })
    default:
      return state
  }
}

export default findAndFix
