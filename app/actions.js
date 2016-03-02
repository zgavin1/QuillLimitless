/*
 * action types
 */

 export const SUBMIT_FIND = 'SUBMIT_FIND'
 export const SUBMIT_FIND_SAT = 'SUBMIT_FIND_SAT'
 export const SUBMIT_FIX = 'SUBMIT_FIX'
 export const NEXT_QUESTION = 'NEXT_QUESTION'
 export const LOAD_DATA = 'LOAD_DATA'
 export const REGISTERED = 'REGISTERED'

export const SubmitActions = {
  SUBMIT_FIND,
  SUBMIT_FIND_SAT,
  SUBMIT_FIX,
  NEXT_QUESTION,
  LOAD_DATA,
  REGISTERED
}

/*
 * action creators
 */

export function submitFind(index) {
  return { type: SUBMIT_FIND, index}
}

export function submitFindSAT(correct, index) {
  return { type: SUBMIT_FIND_SAT, correct, index}
}

export function submitFix(word) {
  return { type: SUBMIT_FIX, word}
}

export function nextQuestion() {
  return { type: NEXT_QUESTION}
}

export function loadData(data) {
  return { type: LOAD_DATA, data}
}

export function registered(data) {
  return { type: REGISTERED, data}
}
