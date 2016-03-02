import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

      return <span key={index} className={styling + " text"} onClick={cb(index)}>{word.text}</span>
    });
  },

  foundIncorrectlyWordList: function () {
    const words = removeBraces(this.props.question.answer);
    // this.getTargetWord();
    return words.map((word, index) => {
      let styley = {};
      if (word.correct) {
        styley = {color: "green", fontWeight: "boldest"}
      } else if (index === this.props.question.submittedFind) {
        styley = {color: "red", fontWeight: "boldest"}
      }

      return <span key={index} className="text" style={styley}>{word.text}</span>
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
      return <span key={index} className="text" style={styley}>{word.text}</span>
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
      return <span key={index} className="text" style={styley}>{word.text}</span>
    });
  },

  fixedCorrectlyWordList: function () {
    const words = removeBraces(this.props.question.answer);
    // this.getTargetWord();
    return words.map((word, index) => {
      let styley = {};
      if (word.correct) {
        styley = {color: "green", fontWeight: "boldest"}
      }
      return <span key={index} className="text" style={styley}>{word.text}</span>
    });
  },

  fixedIncorrectlyWordList: function () {
    const words = removeBraces(this.props.question.answer);
    // this.getTargetWord();
    return words.map((word, index) => {
      let styley = {};
      if (word.correct) {
        styley = {color: "red", fontWeight: "boldest"}
      }
      return <span key={index} className="text" style={styley}>{word.text}</span>
    });
  },

  generatePrompt: function () {
    if (this.props.question.fixed) {
      return this.fixedCorrectlyWordList();
    }
    else if (this.props.question.fixed === false) {
      return this.fixedIncorrectlyWordList();
    }
    else if (this.props.question.found && this.props.question.needsFixing) {
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
          <ReactCSSTransitionGroup transitionName="slide-left" transitionAppear={true} transitionAppearTimeout={0} transitionEnterTimeout={0} transitionExitTimeout={0} transitionLeaveTimeout={0}>
          <div key="found" className="btn-group btn-group-lg btn-group-justified next-question" role="group" aria-label="...">
            <a className={this.nextQuestionClass()} onClick={this.nextQuestion}>Next Question</a>
          </div>
          </ReactCSSTransitionGroup>
        )
      }
    } else if (this.props.question.needsFixing && (this.props.question.found === false || this.props.question.fixed !== undefined)) {
      return (
        <ReactCSSTransitionGroup transitionName="slide-left" transitionAppear={true} transitionAppearTimeout={0} transitionEnterTimeout={0} transitionExitTimeout={0} transitionLeaveTimeout={0}>
        <div key="fixed" className="btn-group btn-group-lg btn-group-justified next-question" role="group" aria-label="...">
          <a className={this.nextQuestionClass()} onClick={this.nextQuestion}>Next Question</a>
        </div>
      </ReactCSSTransitionGroup>
      )
    }
  },

  feedbackComponent: function () {
    if (this.props.question.found === true) {
      return (
        <ReactCSSTransitionGroup transitionName="height" transitionAppear={true} transitionAppearTimeout={0} transitionEnterTimeout={0} transitionExitTimeout={0} transitionLeaveTimeout={0}>
          <div className="row" style={{marginTop: 10}} key="correct">
            <div className="col-xs-12" >
              <p >{this.renderStar()}<span style={{ marginTop: '-10px',
      lineHeight: '32px'}}> Correct</span></p>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      )
    }
    else if (this.props.question.found === false) {
      return (
        <ReactCSSTransitionGroup transitionName="height" transitionAppear={true} transitionAppearTimeout={0} transitionEnterTimeout={0} transitionExitTimeout={0} transitionLeaveTimeout={0}>
          <div className="row" style={{marginTop: 10}}>
            <div className="col-xs-12" >
              <p >{this.renderCross()}<span style={{ marginTop: '-10px', lineHeight: '32px'}}> Incorrect</span></p>
            </div>
          </div>
        </ReactCSSTransitionGroup>)
    }
    else {
      return (
        <div className="btn-group btn-group-lg btn-group-justified no-error" role="group" aria-label="...">
          <a className="btn btn-default" onClick={this.submitNoError}>No Error</a>
        </div>
      )
    }
  },

  renderStar: function () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="nc-icon glyph" x="0px" y="50%" width="32px" height="32px" viewBox="0 0 32 32"><g>
<path fill="#5cb85c" d="M30.951,12.525c-0.118-0.362-0.431-0.626-0.807-0.681l-9.154-1.33L16.897,2.22  c-0.337-0.683-1.457-0.683-1.794,0l-4.093,8.294l-9.154,1.33c-0.376,0.055-0.689,0.319-0.807,0.681  c-0.118,0.362-0.02,0.759,0.253,1.025l6.624,6.456l-1.563,9.117c-0.064,0.375,0.09,0.754,0.398,0.978  c0.309,0.224,0.717,0.252,1.053,0.076L16,25.873l8.187,4.304c0.146,0.077,0.306,0.115,0.465,0.115c0.207,0,0.414-0.064,0.588-0.191  c0.308-0.224,0.462-0.603,0.398-0.978l-1.563-9.117l6.624-6.456C30.971,13.284,31.069,12.887,30.951,12.525z"/>
</g></svg>
    )
  },

  renderCross: function () {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"  className="nc-icon glyph" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32"><g>
<path fill="#d9534f" d="M16,0C7.2,0,0,7.2,0,16s7.2,16,16,16s16-7.2,16-16S24.8,0,16,0z M23.1,20.2c0.4,0.4,0.4,1,0,1.4l-1.4,1.4  c-0.4,0.4-1,0.4-1.4,0L16,18.8l-4.2,4.2c-0.4,0.4-1,0.4-1.4,0l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4l4.2-4.2l-4.2-4.2c-0.4-0.4-0.4-1,0-1.4  l1.4-1.4c0.4-0.4,1-0.4,1.4,0l4.2,4.2l4.2-4.2c0.4-0.4,1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4L18.8,16L23.1,20.2z"/>
</g></svg>
    )
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
              {this.feedbackComponent()}
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
