import 'babel-polyfill';
import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux'
import { submitFind, nextQuestion, loadData } from '../actions'
import ScoreBar from "./scorebar/scorebar.jsx";
import Question from "./question/question.jsx";
import Edit from "./edit/edit.jsx";
import TapNFix from './tapNFix/tapNFix.jsx'
import SATPrep from './satprep/satprep.jsx'
import Welcome from "./welcome/welcome.jsx";
import Exit from "./exit/exit.jsx";
import DevTools from '../utils/devTools';
import ProgressBar from './progressBar/progressBar.jsx'
// import "../styles/normalize.scss";
import "../styles/bootstrap.scss";
import "../styles/style.scss";
import satQuestions from "../utils/v5Questions.js";
import bblQuestions from "../utils/bblQuestions.js";

var Root = React.createClass({
  // select: function(state) {
  //   return {
  //     score: state.score,
  //     question: state.question
  //   }
  // },

  startActivity: function (questions) {
    const data = questions;
    const loadDataActions = loadData(data);
    this.props.dispatch(loadDataActions);
    const action = nextQuestion();
    this.props.dispatch(action);
  },

  bblStart: function () {
    this.startActivity(bblQuestions);
  },

  satStart: function () {
    this.startActivity(satQuestions);
  },

  stateSpecificComponent: function () {
    if (this.props.question.currentQuestion === undefined && this.props.question.answeredQuestions.length === 0) {
      return (<Welcome bbl={this.bblStart} sat={this.satStart} />)
    }
    else if (this.props.question.currentQuestion === undefined && this.props.question.unansweredQuestions.length === 0) {
      return (<Exit results={this.props.question.answeredQuestions} dispatch={this.props.dispatch}/>)
    }
    else {
      // return (
      //   <TapNFix
      //     question={this.props.question.currentQuestion}
      //     action={index =>
      //                 this.props.dispatch(submitFind(index))
      //               }
      //     dispatch={this.props.dispatch}
      //     >
      //
      //
      //   </TapNFix>
      // )
      // return (<Question
      //   question={this.props.question.currentQuestion}
      //   action={index =>
      //             this.props.dispatch(submitFind(index))
      //           }
      //   dispatch={this.props.dispatch}
      // />
      return (<SATPrep
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
        <ProgressBar questions={question} />
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
