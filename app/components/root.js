import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux'
import { submitFind } from '../actions'
import ScoreBar from "./scorebar/scorebar.jsx";
import Question from "./question/question.jsx";
import DevTools from '../utils/devTools';

// import "../styles/normalize.scss";
import "../styles/bootstrap.scss";
import "../styles/style.scss";

class Root extends Component {

  render(){
    const { dispatch, score, question} = this.props;

    return (
      <div>
        <ScoreBar score={score}/>
        <Question
          question={question.currentQuestion}
          action={index =>
                    dispatch(submitFind(index))
                  }
          dispatch={dispatch}
        />
        <DevTools />
      </div>
    )
  }
};

function select(state) {
  return {
    score: state.score,
    question: state.question
  }
}


export default connect(select)(Root)
