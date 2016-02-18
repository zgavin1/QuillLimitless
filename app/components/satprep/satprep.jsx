import React from "react";
import "../../styles/question.scss";
import {removeBraces, getTargetPhrase} from '../../libs/sentenceSplitterV3';
import { submitFindSAT, submitFix, nextQuestion } from '../../actions';

export default React.createClass({
  checkFind: function (ind) {
    if (removeBraces(this.props.question.prompt)[ind].correct) {
      this.props.dispatch(submitFindSAT(true, ind));
    } else {
      this.props.dispatch(submitFindSAT(false, ind))
    }

  },

  submitNoError: function () {
    const words = removeBraces(this.props.question.prompt);

    const nCorrectAnswers =  words.filter((word) => {return word.correct === true})
    if (nCorrectAnswers.length  === 0) {
      this.props.dispatch(submitFindSAT(true));
    } else {
      this.props.dispatch(submitFindSAT(false))
    }
  },

  initialWordList: function () {
    const words = removeBraces(this.props.question.prompt);
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
    const words = removeBraces(this.props.question.prompt);
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
    const words = removeBraces(this.props.question.answer);
    // this.getTargetWord();
    return words.map((word, index) => {
      let styley = {};
      if (word.correct) {
        styley = {color: "green", fontWeight: "boldest"}
      }
      return <span style={styley}>{word.text}</span>
    })
  },

  needsFixingWordList: function () {
    const words = removeBraces(this.props.question.prompt);
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
    if (this.props.question.found && this.props.question.needsFixing) {
      return this.needsFixingWordList();
    }
    else if (this.props.question.found === true) {
      return this.foundCorrectlyWordList();
    }
    else if (this.props.question.found === false) {
      return this.foundIncorrectlyWordList();
    } else {
      return this.initialWordList();
    }
  },

  getFound: function () {
    // const words = this.splitPrompt();
    // return words[this.getTargetWord()].replace(/[{}]/g, "")
    return getTargetPhrase(this.props.question.prompt)
  },

  handleInput: function(event) {
    if (event.keyCode === 13) {
      this.checkWordSubmission();
      this.refs.fixInput.blur()
    }
  },

  checkWordSubmission: function () {
    const action = submitFix(this.refs.fixInput.value);
    this.props.dispatch(action);

  },

  secondaryAnswerBox: function () {
    if (this.props.question.found === true && this.props.question.needsFixing) {
      return (
        <div >
          <div >
            <div className="input-group">
              <input type="text"
                autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
                className="form-control input-lg"
                autoFocus
                placeholder={"Correct \"" + this.getFound() + "\" to fix the sentence"}
                ref="fixInput"
                onKeyDown={this.handleInput}
                onChange={this.handleChange}
                />
              <span className="input-group-btn">
                <button className="btn btn-default btn-lg" type="button" onClick={this.checkWordSubmission}>Submit</button>
              </span>
            </div>
          </div>
          <br/>
        </div>
      )
    }
  },

  nextQuestion: function () {
    this.props.dispatch(nextQuestion());
  },

  nextQuestionClass: function () {
    var classy;
    if (this.props.question.found && this.props.question.fixed === false) {
      classy = "btn-warning"
    }
    else if (this.props.question.found) {
      classy = "btn-success"
    }
    else {
      classy = "btn-danger";
    }
    return "btn " + classy;
  },

  nextQuestionComponent: function () {
    if (!this.props.question.needsFixing) {
      if (this.props.question.found !== undefined) {
        return (
          <div className="btn-group btn-group-lg btn-group-justified next-question" role="group" aria-label="...">
            <a className={this.nextQuestionClass()} onClick={this.nextQuestion}>Next Question</a>
          </div>
        )
      }
    } else if (this.props.question.needsFixing && this.props.question.fixed !== undefined) {
      return (
        <div className="btn-group btn-group-lg btn-group-justified next-question" role="group" aria-label="...">
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
              <div className="btn-group btn-group-lg btn-group-justified no-error" role="group" aria-label="...">
                <a className="btn btn-default" onClick={this.submitNoError}>No Error</a>
              </div>
            </div>
            <p></p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.secondaryAnswerBox()}
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
