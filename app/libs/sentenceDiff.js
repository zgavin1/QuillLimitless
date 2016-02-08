const jsdiff = require("diff")
import _ from "underscore"

export default class WordDiffer {
  constructor(prompt, answer, submission) {
    this.prompt = prompt;
    this.answer = answer;
    this.submission = submission;
  }

  genChangeObjects() {
    return jsdiff.diffWords(this.prompt, this.submission)
  }

  genExpectedChangeObjects() {
    return jsdiff.diffWords(this.prompt, this.answer)
  }

  formattedChangeObjects(changeObjects) {
    const additions = changeObjects.filter((obj) => {
      return obj.added
    })
    const deletions = changeObjects.filter((obj) => {
      return obj.removed
    })
    return {
      additions,
      deletions
    }
  }

  markSubmission() {
    const subs = this.formattedChangeObjects(this.genChangeObjects())
    const exp = this.formattedChangeObjects(this.genExpectedChangeObjects())
    return {
      additions: exp.additions.map((obj) => {
        if (_.findWhere(subs.additions, obj)) {
          obj.correct = true
        }
        return obj
      }),
      deletions: exp.deletions.map((obj) => {
        if (_.findWhere(subs.deletions, obj)) {
          obj.correct = true
        }
        return obj
      }),
      extraneous: subs.deletions.filter((obj) => {
        return !!(_.findWhere(exp.deletions, obj))
      })
    }
  }

  calcScores() {
    const results = this.markSubmission()
    return {
      found: _.where(results.deletions, {correct: true}).length,
      fixed: _.where(results.additions, {correct: true}).length,
      extra: results.extraneous.length
    }
  }

  fractionScores() {
    const results = this.markSubmission()
    return {
      found: _.where(results.deletions, {correct: true}).length + "/" + results.deletions.length,
      fixed: _.where(results.additions, {correct: true}).length + "/" + results.additions.length
    }
  }
}
