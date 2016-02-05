import 'babel-polyfill';
import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux'
import { submitFind, nextQuestion } from '../actions'
import ScoreBar from "./scorebar/scorebar.jsx";
import Question from "./question/question.jsx";
import Welcome from "./welcome/welcome.jsx";
import Exit from "./exit/exit.jsx";
import DevTools from '../utils/devTools';

// import "../styles/normalize.scss";
import "../styles/bootstrap.scss";
import "../styles/style.scss";

var Root = React.createClass({
  // select: function(state) {
  //   return {
  //     score: state.score,
  //     question: state.question
  //   }
  // },

  startActivity: function () {
    const action = nextQuestion();
    this.props.dispatch(action);
  },

  stateSpecificComponent: function () {
    if (this.props.question.currentQuestion === undefined && this.props.question.answeredQuestions.length === 0) {
      return (<Welcome action={this.startActivity} />)
    }
    else if (this.props.question.currentQuestion === undefined && this.props.question.unansweredQuestions.length === 0) {
      return (<Exit results={this.props.question.answeredQuestions} dispatch={this.props.dispatch}/>)
    }
    else {
      return (<Question
        question={this.props.question.currentQuestion}
        action={index =>
                  this.props.dispatch(submitFind(index))
                }
        dispatch={this.props.dispatch}
      />)
    }
  },

  render(){
    console.log(this)
    const { dispatch, score, question} = this.props;



    return (
      <div>
        <ScoreBar answeredQuestions={question.answeredQuestions}/>
        {this.stateSpecificComponent()}
      </div>
    )
  }
});

function select(state) {
  return {
    score: state.score,
    question: state.question
  }
}


export default connect(select)(Root)
