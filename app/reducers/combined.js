import { combineReducers } from 'redux';
import { SubmitActions } from '../actions';
import score from './scoreReducer';
import question from './questionReducer';

const findAndFix = combineReducers({
  score,
  question
})

export default findAndFix
