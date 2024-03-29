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
import Register from "./register/register.jsx";
import Exit from "./exit/exit.jsx";
import DevTools from '../utils/devTools';
import ProgressBar from './progressBar/progressBar.jsx'
// import "../styles/normalize.scss";
import "../styles/bootstrap.scss";
import "../styles/style.scss";
import doeQuestions from "../utils/v4Questions.js";
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

  doeStart: function () {
    this.startActivity(doeQuestions);
  },

  stateSpecificComponent: function () {
    if (this.props.user.name === undefined) {
      return (<Register dispatch={this.props.dispatch}/>)
    }
    else if (this.props.question.currentQuestion === undefined && this.props.question.answeredQuestions.length === 0) {
      return (<Welcome start={this.startActivity} bbl={this.bblStart} sat={this.satStart} doe={this.doeStart}/>)
    }
    else if (this.props.question.currentQuestion === undefined && this.props.question.unansweredQuestions.length === 0) {
      return (<Exit user={this.props.user} results={this.props.question.answeredQuestions} questionSet={this.props.question.questionSet} dispatch={this.props.dispatch}/>)
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
    const { dispatch, score, question, user} = this.props;



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
    question: state.question,
    score: state.score,
    user: state.user
  }
}


export default connect(select)(Root)
