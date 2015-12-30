import {getTargetIndex, getTargetWord, sentenceSplitter} from './sentence.js'

export default class Question {
  constructor(prompt, answer) {
    this.prompt = prompt;
    this.answer = answer;
  }

  checkFind(index) {
    return getTargetIndex(this.prompt) === index;
  }

  submitFind(index) {
    this.found = this.checkFind(index);
    return this.found;
  }

  checkFix(submission) {
    return submission === getTargetWord(this.answer);
  }

  submitFix(submission) {
    this.fixed = this.checkFix(submission)
    return this.fixed;
  }
}
