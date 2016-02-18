import React from "react";
import "../../styles/question.scss";
import { submitFindSAT, submitFix, nextQuestion } from '../../actions';

export default React.createClass({
  checkFind: function (ind) {
    if (this.props.question.prompt[ind].correct) {
      this.props.dispatch(submitFindSAT(true, ind));
    } else {
      this.props.dispatch(submitFindSAT(false, ind))
    }

  },

  initialWordList: function () {
    const words = this.props.question.prompt;
    // this.getTargetWord();
    return words.map((word, index) => {
      const cb = (i) => {
        const ind = i;
        const call = () => {
          this.checkFind(ind)
        }
        if (word.underline) {
          return call;
        }
      }

      var styling = ""
      if (word.underline) {
        styling = "underlineSpan"
      }

      return <span className={styling} onClick={cb(index)}>{word.text}</span>
    });
  },

  foundIncorrectlyWordList: function () {
    const words = this.props.question.prompt;
    // this.getTargetWord();
    return words.map((word, index) => {
      let styley = {};
      if (word.correct) {
        styley = {color: "green", fontWeight: "boldest"}
      } else if (index === this.props.question.submittedFind) {
        styley = {color: "red", fontWeight: "boldest"}
      }

      return <span style={styley}>{word.text}</span>
    });
  },

  foundCorrectlyWordList: function () {
    const words = this.props.question.prompt;
    // this.getTargetWord();
    return words.map((word, index) => {
      let styley = {};
      if (word.correct) {
        styley = {color: "green", fontWeight: "boldest"}
      }
      return <span style={styley}>{word.text}</span>
    });
  },

  generatePrompt: function () {
    if (this.props.question.found === true) {
      return this.foundCorrectlyWordList();
    }
    else if (this.props.question.found === false) {
      return this.foundIncorrectlyWordList();
    } else {
      return this.initialWordList();
    }
  },

  nextQuestion: function () {
    this.props.dispatch(nextQuestion());
  },

  nextQuestionClass: function () {
    var classy;
    if (this.props.question.found) {
      classy = "btn-success"
    } else {
      classy = "btn-danger";
    }
    return "btn " + classy;
  },

  nextQuestionComponent: function () {
    if (this.props.question.found !== undefined) {
      return (
        <div className="btn-group btn-group-lg btn-group-justified" role="group" aria-label="...">
          <a className={this.nextQuestionClass()} onClick={this.nextQuestion}>Next Question</a>
        </div>
      )
    }
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div>
              <div >
                {this.generatePrompt()}
              </div>
              <div className="btn-group btn-group-lg btn-group-justified" role="group" aria-label="...">
                <a className="btn btn-default" onClick={this.submitNoError}>No Error</a>
              </div>
            </div>
            <p></p>
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
