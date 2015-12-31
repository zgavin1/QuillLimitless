import { SubmitActions } from '../actions';
import Question from '../libs/question';

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
  const question = new Question(state.prompt, state.answer);
  switch (action.type) {
    case SubmitActions.SUBMIT_FIND:
      return Object.assign(state, {
        found: question.checkFind(action.index),
        submittedFind: action.index
      })
    case SubmitActions.SUBMIT_FIX:
      return Object.assign(state, {
        fixed: question.checkFix(action.word),
        submittedFix: action.word
      })
    default:
      return state
  }
}

export default question
