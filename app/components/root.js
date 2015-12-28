import React from "react";
import ScoreBar from "./scorebar/scorebar.jsx";
import Question from "./question/question.jsx";

import "../styles/style.scss";

export default React.createClass({
  getInitialState: function(){
    this.state = {};
    this.state.score = 0;
    this.state.question = {
      concept: {
        name: "Than, Then",
        conceptName: "Than",
        standard: "4.1g. Commonly Confused Words,Jzw0qjQwbyM2twtkmW1"
      },
      question: {
        answer: "There are more {than} 300 million people in the United States.",
        prompt: "There are more {then} 300 million people in the United States."
      }
    };
    return this.state;
  },

  updateScore: function(direction, stage, index){
    switch (stage) {
      case 1:
        switch (direction) {
          case "INCREMENT":
            this.setState({
              score: this.state.score + 1,
              correct: true,
              index: index
            });
            break;
          case "DECREMENT":
            this.setState({
              score: this.state.score - 1,
              correct: false,
              index: index
            });
            break;
          default:
            return
        }
        break
      case 2:
        switch (direction) {
          case "INCREMENT":
            this.setState({
              score: this.state.score + 1,
              correct: true,
              index: index,
              finished: true
            });
            break;
          case "DECREMENT":
            this.setState({
              correct: false,
              index: index,
              finished: true
            });
            break;
          default:
            return
        }
    }
  },

  render: function(){
    return (
      <div>
        <h1>Quill Limitless</h1>
        <ScoreBar data={this.state.score}/>
        <Question data={this.state} action={this.updateScore}/>
      </div>
    )
  }
});
