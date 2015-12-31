import { SubmitActions } from '../actions';
import Question from '../libs/question';

const initialState = {
  answeredQuestions: [],
  currentQuestion: {
    concept: {
      name: "Than, Then",
      conceptName: "Than",
      standard: "4.1g. Commonly Confused Words"
    },
    answer: "There are more {than} 300 million people in the United States.",
    prompt: "There are more {then} 300 million people in the United States."
  },
  unansweredQuestions: []
}

function question(state = initialState, action) {
  const question = new Question(state.currentQuestion.prompt, state.currentQuestion.answer);
  switch (action.type) {
    case SubmitActions.SUBMIT_FIND:
      return Object.assign({}, state, {
        currentQuestion: Object.assign({}, state.currentQuestion, {
          found: question.checkFind(action.index),
          submittedFind: action.index
        })
      })
      break
    case SubmitActions.SUBMIT_FIX:
      return Object.assign({}, state, {
        currentQuestion: Object.assign({}, state.currentQuestion, {
          fixed: question.checkFix(action.word),
          submittedFix: action.word
        })
      })
      break
    default:
      return state
  }
}

export default question
