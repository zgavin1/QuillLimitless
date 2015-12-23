import React from "react";
import ScoreBar from "./scorebar/scorebar.jsx";
import Question from "./question/question.jsx";

import "../styles/style.scss";

export default React.createClass({
  getInitialState: function(){
    this.state = {};
    this.state.score = 5;
    this.state.question = "Theirs no place I'd rather live than New York City.";
    return this.state;
  },

  updateScore: function(direction){
    switch (direction) {
      case "INCREMENT":
        this.setState({score: this.state.score + 1});
        break;
      case "DECREMENT":
        this.setState({score: this.state.score - 1});
        break;
      default:
        return
    }
  },

  render: function(){
    return (
      <div>
        <h1>Quill Limitless</h1>
        <ScoreBar data={this.state.score}/>
        <Question data={this.state.question} action={this.updateScore}/>
      </div>
    )
  }
});
