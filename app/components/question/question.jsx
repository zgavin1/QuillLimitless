import React from "react";
import "../../styles/question.scss";
import { submitFind, submitFix, nextQuestion } from '../../actions';

export default React.createClass({
  splitPrompt: function () {
    return this.props.question.prompt.split(" ");
  },

  splitAnswer: function () {
    return this.props.question.answer.split(" ");
  },

  getTargetWord: function () {
    const words = this.splitPrompt();
    let j = 0;
    for (let i = 0; i < words.length; i++) {
      if (words[i][0] === "{") {
        j = i;
        break;
      }
    }
    return j;
  },

  getAnswer: function () {
    const words = this.splitAnswer();
    return words[this.getTargetWord()].replace(/[{}]/g, "")
  },

  checkWord: function (index) {
    if (index === this.getTargetWord()) {
      this.updateScore("INCREMENT", 1, index);
    } else {
      this.updateScore("DECREMENT", 1, index);
    }
  },

  initialWordList: function () {
    const words = this.splitPrompt();
    // this.getTargetWord();
    return words.map((word, index) => {
      const cb = (i) => {
        const ind = i;
        const call = () => {
          this.props.dispatch(submitFind(ind));
        }
        return call;
      }
      return <span onClick={cb(index)}>{word.replace(/[{}]/g, "")} </span>
    });
  },

  foundCorrectlyWordList: function () {
    const words = this.splitPrompt();
    const correctIndex = this.getTargetWord();
    return words.map((word, index) => {
      if (index === correctIndex) {
        return <span className="correct">{word.replace(/[{}]/g, "")} </span>
      } else {
        return <span>{word.replace(/[{}]/g, "")} </span>
      }

    });
  },

  fixedCorrectlyWordList: function () {
    const words = this.splitAnswer();
    const correctIndex = this.getTargetWord();
    return words.map((word, index) => {
      if (index === correctIndex) {
        return <span className="correct">{word.replace(/[{}]/g, "")} </span>
      } else {
        return <span>{word.replace(/[{}]/g, "")} </span>
      }
    });
  },

  foundIncorrectlyWordList: function () {
    const words = this.splitPrompt();
    const correctIndex = this.getTargetWord();
    return words.map((word, index) => {
      if (index === correctIndex) {
        return <span className="correct">{word.replace(/[{}]/g, "")} </span>
      }
      else if (index === this.props.question.submittedFind) {
        return <span className="incorrect">{word.replace(/[{}]/g, "")} </span>
      }
      else {
        return <span>{word.replace(/[{}]/g, "")} </span>
      }

    });
  },

  generatePrompt: function () {
    if (this.props.question.fixed === true) {
      return this.fixedCorrectlyWordList();
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

  stateSpecificComponent: function () {
    if (this.props.question.found === true) {
      return <h4>Correct</h4>
    }
    else if (this.props.question.found === false) {
      return <h4>Incorrect</h4>
    }
    else {
      return
    }
  },

  handleChange: function(event) {
    this.setState({submission: event.target.value}, function () {
      console.log(this.state.submission);
    });

  },

  checkWordSubmission: function () {
    const action = submitFix(this.refs.fixInput.value);
    this.props.dispatch(action);
  },

  secondaryAnswerBox: function () {
    if (this.props.question.found === true) {
      return (
        <div className={this.fixPanelClass()}>
          <div className="panel-heading">
            <h3 className="panel-title">What should the correct word be?</h3>
          </div>
          <div className="panel-body">
            <div className="input-group">
              <input type="text"
                autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                className="form-control"
                placeholder="then"
                ref="fixInput"
                onChange={this.handleChange}/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.checkWordSubmission}>Submit</button>
              </span>
            </div>
          </div>
        </div>
      )
    }
  },

  nextQuestion: function () {
    this.props.dispatch(nextQuestion());
  },

  nextQuestionClass: function () {
    var classy;
    console.log(this.props.question.found === true && this.props.question.fixed === true);
    if (this.props.question.found && this.props.question.fixed) {
      classy = "btn-success"
    } else {
      classy = "btn-danger";
    }
    return "btn " + classy;
  },

  nextQuestionComponent: function () {
    if (this.props.question.found === false || (this.props.question.found === true && typeof this.props.question.fixed !== 'undefined')) {
      return (
        <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <a className={this.nextQuestionClass()} onClick={this.nextQuestion}>Next Question</a>
        </div>
      )
    }
  },

  findPanelClass: function () {
    var classy;
    if (this.props.question.found === true) {
      classy = "panel-success"
    } else if (this.props.question.found === false) {
      classy = "panel-danger";
    } else {
      classy = "panel-default";
    }
    return "panel " + classy;
  },

  fixPanelClass: function () {
    var classy;
    if (this.props.question.fixed === true) {
      classy = "panel-success"
    } else if (this.props.question.fixed === false) {
      classy = "panel-danger";
    } else {
      classy = "panel-default";
    }
    return "panel " + classy;
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h4>{this.props.question.concept.standard}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className={this.findPanelClass()}>
              <div className="panel-heading">
                <h3 className="panel-title">Click the word that is incorrect</h3>
              </div>
              <div className="panel-body">
                {this.generatePrompt()}
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
