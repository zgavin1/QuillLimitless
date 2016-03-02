import { combineReducers } from 'redux';
import { SubmitActions } from '../actions';
import score from './scoreReducer';
import question from './questionReducer';
import user from './userReducer';

const findAndFix = combineReducers({
  score,
  question,
  user
})

export default findAndFix
