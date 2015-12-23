import React from "react";

import "../../styles/question.scss";

export default React.createClass({
  updateScore: function (direction, index) {
    this.props.action(direction, index);
  },

  splitPrompt: function () {
    return this.props.data.question.question.prompt.split(" ");
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

  checkWord: function (index) {
    if (index === this.getTargetWord()) {
      this.updateScore("INCREMENT", index);
    } else {
      this.updateScore("DECREMENT", index);
    }
  },

  beforeAnsweringWordList: function () {
    const words = this.splitPrompt();
    this.getTargetWord();
    return words.map((word, index) => {
      const cb = (i) => {
        const ind = i;
        const call = () => {
          this.checkWord(ind);
        }
        return call;
      }
      return <span onClick={cb(index)}>{word.replace(/[{}]/g, "")} </span>
    });
  },

  answeredCorrectlyWordList: function () {
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

  answeredIncorrectlyWordList: function () {
    const words = this.splitPrompt();
    const correctIndex = this.getTargetWord();
    return words.map((word, index) => {
      if (index === correctIndex) {
        return <span className="correct">{word.replace(/[{}]/g, "")} </span>
      }
      else if (index === this.props.data.index) {
        return <span className="incorrect">{word.replace(/[{}]/g, "")} </span>
      }
      else {
        return <span>{word.replace(/[{}]/g, "")} </span>
      }

    });
  },

  generateWordList: function () {
    if (this.props.data.correct === true) {
      return this.answeredCorrectlyWordList();
    }
    else if (this.props.data.correct === false) {
      return this.answeredIncorrectlyWordList();
    } else {
      return this.beforeAnsweringWordList();
    }
  },

  stateSpecificComponent: function () {
    if (this.props.data.correct === true) {
      return <h4>Correct</h4>
    }
    else if (this.props.data.correct === false) {
      return <h4>Incorrect</h4>
    }
  },

  render: function () {
    return (
      <div>
        <h2>Question</h2>
        {this.stateSpecificComponent()}
        <p>{this.generateWordList()}</p>
      </div>
    )
  }
})
