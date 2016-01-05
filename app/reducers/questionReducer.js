import { SubmitActions } from '../actions';
import Question from '../libs/question';
import testQuestions from '../utils/testQuestions';

const initialState = {
  answeredQuestions: [],
  unansweredQuestions: testQuestions
}

function question(state = initialState, action) {
  switch (action.type) {
    case SubmitActions.SUBMIT_FIND:
     const question = new Question(state.currentQuestion.prompt, state.currentQuestion.answer);
      return Object.assign({}, state, {
        currentQuestion: Object.assign({}, state.currentQuestion, {
          found: question.checkFind(action.index),
          submittedFind: action.index
        })
      })
      break
    case SubmitActions.SUBMIT_FIX:
      const quest = new Question(state.currentQuestion.prompt, state.currentQuestion.answer);
      return Object.assign({}, state, {
        currentQuestion: Object.assign({}, state.currentQuestion, {
          fixed: quest.checkFix(action.word),
          submittedFix: action.word
        })
      })
      break
    case SubmitActions.NEXT_QUESTION:
      const changes = {};
      if (state.currentQuestion) {
        changes.answeredQuestions = state.answeredQuestions.concat([state.currentQuestion])
      }
      changes.currentQuestion = state.unansweredQuestions[0];
      if (state.unansweredQuestions.length > 0) {
        changes.unansweredQuestions = state.unansweredQuestions.slice(1);
      }
      return Object.assign({}, state, changes)
    default:
      return state
  }
}

export default question
