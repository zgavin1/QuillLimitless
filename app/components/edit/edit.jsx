import React from "react";
import sentenceDiff from '../../libs/sentenceDiff';
import { nextQuestion } from '../../actions';

export default React.createClass({
  componentDidMount: function () {
    window.hi = this.refs.submission;
    this.refs.submission.blur()
    this.refs.submission.focus()
  },

  componentDidUpdate: function() {
    this.refs.submission.focus()
  },

  generateInput: function () {
    return (
      <p className="inputText" ref="submission" contentEditable="true">{this.props.question.prompt}</p>
    )
  },

  checkSubmission: function () {
    window.hi = this.refs.submission;
    console.log(this.refs.submission.textContent);
    const ans = new sentenceDiff(this.props.question.prompt,
                                 this.props.question.answer,
                                 this.refs.submission.textContent)
    this.setState({score: {found: ans.fractionScores().found,
    fixed: ans.fractionScores().fixed}})
  },

  stateSpecificComponent: function () {
    if (this.state) {
      return (<p autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">Score: Found {this.state.score.found} Errors, Fixed {this.state.score.fixed} errors</p>)
    }
  },

  panelClass: function () {
    var classy;
    if (this.props.question.correct === true) {
      classy = "panel-success"
    } else if (this.props.question.correct === false) {
      classy = "panel-danger";
    } else {
      classy = "panel-default";
    }
    return "panel " + classy;
  },

  nextQuestionComponent: function () {
    if (this.state ) {
      return (
        <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <a className="btn btn-default" onClick={this.nextQuestion}>Next Question</a>
        </div>
      )
    }
  },

  nextQuestion: function () {
    this.replaceState()
    this.props.dispatch(nextQuestion());
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {this.generateInput()}
            <button className="btn btn-default" onClick={this.checkSubmission}>Check Answer</button>
            {this.stateSpecificComponent()}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.nextQuestionComponent()}
          </div>
        </div>
      </div>
    )
  }

})
