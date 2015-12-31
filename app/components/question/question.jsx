import React from "react";
import "../../styles/question.scss";
import { submitFind } from '../../actions';

export default React.createClass({
  getInitialState: function () {
    return {submission: null};
  },

  updateScore: function (direction, index) {
    this.props.action(direction, index);
  },

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

  finishedCorrectlyWordList: function () {
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
    if (this.state.submission === this.getAnswer()) {
      console.log("you got it right");
      this.updateScore("INCREMENT", 2);
    }
    else {
      console.log("you got it wrong");
      this.updateScore("DECREMENT", 2);
    }
  },

  secondaryAnswerBox: function () {
    if (this.props.correct === true) {
      return (
        <div>
          <h4>What should the correct word be?</h4>
          <input placeholder="then" type="text" onChange={this.handleChange}/>
          <button onClick={this.checkWordSubmission}>Submit</button>
        </div>

      )
    }
  },

  render: function () {
    return (

      <div>
        <h2>Question</h2>
        {this.stateSpecificComponent()}
        <p>{this.generatePrompt()}</p>
        {this.secondaryAnswerBox()}
      </div>
    )
  }
})
