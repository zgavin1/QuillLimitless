import React from "react";

export default React.createClass({
  calculateProgress: function () {
    if (this.props.questions.answeredQuestions.length > 0) {
      return this.calculateOneQuestionWidth() * this.props.questions.answeredQuestions.length
    }
    else {
      return 0;
    }

  },

  calculateTotalNumberOfQuestions: function () {
    let count = this.props.questions.answeredQuestions.length + this.props.questions.unansweredQuestions.length
    if (this.props.questions.currentQuestion) {
      count +=1
    }
    return count
  },

  calculateOneQuestionWidth: function () {
    return 100 / this.calculateTotalNumberOfQuestions()
  },

  calculateCurrentQuestionWidth: function () {
    if (this.props.questions.currentQuestion) {
      return this.calculateOneQuestionWidth()
    } else {
      return 0
    }
  },


  render: function () {
    return (
      <div className="container" style={{marginTop: 20}}>
        <div className="progress">
          <div className="progress-bar progress-bar-success"
               style={{width: this.calculateProgress() + "%"}}>
            <span className="sr-only">35% Complete (success)</span>
          </div>
          <div className="progress-bar progress-bar-success"
               style={{width: this.calculateCurrentQuestionWidth() + "%"}}>
            <span className="sr-only">20% Complete (warning)</span>
          </div>
        </div>
      </div>
    )
  }
})
