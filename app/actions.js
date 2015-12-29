/*
 * action types
 */

 export const SUBMIT_FIND = 'SUBMIT_FIND'
 export const SUBMIT_FIX = 'SUBMIT_FIX'

export const SubmitActions = {
  SUBMIT_FIND,
  SUBMIT_FIX
}

/*
 * action creators
 */

export function submitFind(index) {
  return { type: SUBMIT_FIND, index}
}

export function submitFix(word) {
  return { type: SUBMIT_FIX, word}
}
