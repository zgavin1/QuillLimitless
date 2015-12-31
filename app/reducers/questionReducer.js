import { SubmitActions } from '../actions'

const initialState = {
  concept: {
    name: "Than, Then",
    conceptName: "Than",
    standard: "4.1g. Commonly Confused Words"
  },
  answer: "There are more {than} 300 million people in the United States.",
  prompt: "There are more {then} 300 million people in the United States."
}

function question(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default question
