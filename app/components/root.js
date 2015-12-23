import React from "react";
import ScoreBar from "./scorebar/scorebar.jsx";
import Question from "./question/question.jsx";

import "../styles/style.scss";

export default React.createClass({
  render(){
    return (
      <div>
        <h1>Quill Limitless</h1>
        <ScoreBar />
        <Question />
      </div>
    )
  }
});
