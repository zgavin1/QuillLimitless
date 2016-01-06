import React from "react";

export default React.createClass({
  calculateScore: function () {
    return this.props.answeredQuestions.reduce(function(previous, current, index, array) {
      let score = 0;
      if (current.found) {score++};
      if (current.fixed) {score++};
      return previous + score;
    }, 0)
  },

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">
              <span>{"GrammarStack Score:" + this.calculateScore()}</span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
})
